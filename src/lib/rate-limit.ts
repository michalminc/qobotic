// Sliding-window rate limiter. Uses Redis when REDIS_URL is set
// (multi-instance safe); falls back to per-process in-memory Map.

import Redis from "ioredis";
import { logger } from "@/lib/logger";

export type RateLimitResult = { ok: boolean; remaining: number; resetAt: number };

// ── In-memory backend ────────────────────────────────────────────────
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

function gcMemory(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function memoryLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  gcMemory(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }
  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

// ── Redis backend ────────────────────────────────────────────────────
let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    redis = new Redis(url, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      lazyConnect: false,
    });
    redis.on("error", (err) => logger.warn("redis error", { err: err.message }));
    return redis;
  } catch (err) {
    logger.warn("redis init failed, falling back to in-memory", { err: err instanceof Error ? err.message : String(err) });
    return null;
  }
}

async function redisLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const client = getRedis();
  if (!client) return memoryLimit(key, limit, windowMs);
  try {
    const fullKey = `rl:${key}`;
    // Atomic INCR + EXPIRE-on-first-hit pattern via pipeline.
    const pipeline = client.multi();
    pipeline.incr(fullKey);
    pipeline.pttl(fullKey);
    const result = await pipeline.exec();
    if (!result) throw new Error("pipeline returned null");
    const count = result[0]?.[1] as number;
    let pttl = result[1]?.[1] as number;
    if (pttl < 0) {
      await client.pexpire(fullKey, windowMs);
      pttl = windowMs;
    }
    const resetAt = Date.now() + pttl;
    if (count > limit) {
      return { ok: false, remaining: 0, resetAt };
    }
    return { ok: true, remaining: Math.max(0, limit - count), resetAt };
  } catch (err) {
    logger.warn("rate-limit: redis failed, falling back to in-memory", {
      err: err instanceof Error ? err.message : String(err),
    });
    return memoryLimit(key, limit, windowMs);
  }
}

// ── Public API ───────────────────────────────────────────────────────
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  if (process.env.REDIS_URL) return redisLimit(key, limit, windowMs);
  return memoryLimit(key, limit, windowMs);
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
