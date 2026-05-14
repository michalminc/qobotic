import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { TOKEN_COOKIE, tokenCookieOptions } from "@/lib/admin";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { withErrorHandling } from "@/lib/api-handler";

const LoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(200),
});

// Realistic bcrypt hash with the same cost factor as our real hashes (10 rounds),
// so compare() takes the same time whether the user exists or not.
const DUMMY_HASH = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

export const POST = withErrorHandling("admin/login:POST", async (req: NextRequest) => {
  const ip = getClientIp(req);
  const rl = await rateLimit(`login:${ip}`, 10, 15 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  const passwordHash = user?.password || DUMMY_HASH;
  const valid = await bcrypt.compare(password, passwordHash);

  if (!user || !valid || (user.role !== "ADMIN" && user.role !== "EDITOR")) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Burn the per-IP budget for failures only — on success, refund by clearing.
  // (Optional. Keeping simple: leave counter as-is; honest users won't hit 10/15min.)

  const token = await signToken(user.id, user.role);
  const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
  res.cookies.set(TOKEN_COOKIE, token, tokenCookieOptions());
  return res;
});
