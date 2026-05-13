import { NextRequest, NextResponse } from "next/server";

export function getAuthUser(req: NextRequest): { id: string; role: string } | null {
  const id = req.headers.get("x-user-id");
  const role = req.headers.get("x-user-role");
  if (!id || !role) return null;
  return { id, role };
}

export function requireAuth(req: NextRequest): { id: string; role: string } {
  const user = getAuthUser(req);
  if (!user) {
    throw jsonError("Unauthorized", 401);
  }
  return user;
}

export function requirePartner(req: NextRequest): { id: string; role: string } {
  const user = requireAuth(req);
  if (user.role !== "PARTNER" && user.role !== "ADMIN") {
    throw jsonError("Forbidden", 403);
  }
  return user;
}

export function requireCustomer(req: NextRequest): { id: string; role: string } {
  return requireAuth(req);
}

export function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

export function jsonSuccess(data: unknown, status: number = 200): NextResponse {
  return NextResponse.json(data, { status });
}

export function generateOrderNumber(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `QBT-${rand}`;
}
