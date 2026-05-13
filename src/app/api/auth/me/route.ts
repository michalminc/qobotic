import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    const res = NextResponse.json({ user: null });
    res.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" });
    return res;
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    const res = NextResponse.json({ user: null });
    res.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" });
    return res;
  }

  return NextResponse.json({
    user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, company: user.company, avatar: user.avatar, role: user.role },
  });
}
