import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export const TOKEN_COOKIE = "token";

export function tokenCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  };
}

export async function getAdminUser() {
  const h = await headers();
  const userId = h.get("x-user-id");
  const role = h.get("x-user-role");
  if (userId && (role === "ADMIN" || role === "EDITOR")) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) return user;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) return null;
  return prisma.user.findUnique({ where: { id: payload.sub } });
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
