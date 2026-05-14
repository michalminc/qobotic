import { SignJWT, jwtVerify } from "jose";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be set in environment and be at least 32 characters long");
}
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(userId: string, role: string): Promise<string> {
  return new SignJWT({ sub: userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ sub: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { sub: payload.sub as string, role: payload.role as string };
  } catch {
    return null;
  }
}
