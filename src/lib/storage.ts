// Generic S3-compatible object storage with local-FS fallback.
// Works with Cloudflare R2, Hetzner Object Storage, AWS S3, Backblaze B2,
// MinIO, etc. Backend is chosen at runtime from env vars:
//
//   S3_ENDPOINT          e.g. https://<account>.r2.cloudflarestorage.com
//                              https://nbg1.your-objectstorage.com
//                              https://s3.amazonaws.com
//   S3_REGION            e.g. "auto" (R2), "eu-central-1", "us-east-1"
//   S3_ACCESS_KEY_ID
//   S3_SECRET_ACCESS_KEY
//   S3_BUCKET
//   S3_PUBLIC_URL        public URL prefix (CDN, custom domain, or
//                        path-style bucket URL). No trailing slash.
//   S3_FORCE_PATH_STYLE  "true" for MinIO / some Hetzner setups
//
// If S3_* vars are unset, falls back to public/uploads/ on local FS
// (dev or single-instance VPS with persistent volume).

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { logger } from "@/lib/logger";

const S3_ENDPOINT = process.env.S3_ENDPOINT;
const S3_REGION = process.env.S3_REGION || "auto";
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
const S3_FORCE_PATH_STYLE = process.env.S3_FORCE_PATH_STYLE === "true";

const s3Configured = !!(
  S3_ENDPOINT && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY && S3_BUCKET && S3_PUBLIC_URL
);

let client: S3Client | null = null;
function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: S3_REGION,
      endpoint: S3_ENDPOINT!,
      forcePathStyle: S3_FORCE_PATH_STYLE,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID!,
        secretAccessKey: S3_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

export const storageBackend: "s3" | "local" = s3Configured ? "s3" : "local";

export type PutResult = { url: string; key: string };

export async function putObject(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<PutResult> {
  if (s3Configured) {
    await getClient().send(
      new PutObjectCommand({
        Bucket: S3_BUCKET!,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    return { url: `${S3_PUBLIC_URL}/${key}`, key };
  }

  // Local fallback — works fine on single-instance VPS with persistent volume.
  const absPath = path.join(process.cwd(), "public", "uploads", key);
  await mkdir(path.dirname(absPath), { recursive: true });
  await writeFile(absPath, body);
  return { url: `/uploads/${key}`, key };
}

// `urlOrKey` may be a full public URL (S3) or a local relative path (/uploads/...).
export async function deleteObject(urlOrKey: string): Promise<void> {
  if (s3Configured) {
    let key = urlOrKey;
    if (S3_PUBLIC_URL && urlOrKey.startsWith(S3_PUBLIC_URL + "/")) {
      key = urlOrKey.slice(S3_PUBLIC_URL.length + 1);
    }
    try {
      await getClient().send(new DeleteObjectCommand({ Bucket: S3_BUCKET!, Key: key }));
    } catch (err) {
      logger.warn("storage: delete failed", { key, err: err instanceof Error ? err.message : String(err) });
    }
    return;
  }

  try {
    const rel = urlOrKey.replace(/^\/+/, "");
    await unlink(path.join(process.cwd(), "public", rel));
  } catch {
    // ignore missing files
  }
}
