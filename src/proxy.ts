import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const PUBLIC_API_ADMIN = new Set(["/api/admin/login", "/api/admin/logout"]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (pathname.startsWith("/api/admin/") && !PUBLIC_API_ADMIN.has(pathname)) {
    if (!token) return jsonUnauthorized();
    const payload = await verifyToken(token);
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
      return jsonUnauthorized();
    }
    return withUserHeaders(req, payload);
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
    const payload = await verifyToken(token);
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return withUserHeaders(req, payload);
  }

  return NextResponse.next();
}

function jsonUnauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function withUserHeaders(req: NextRequest, payload: { sub: string; role: string }) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", payload.sub);
  requestHeaders.set("x-user-role", payload.role);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
