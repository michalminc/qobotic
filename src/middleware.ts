import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-dev-secret");

async function verifyJwt(token: string): Promise<{ sub: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { sub: payload.sub as string, role: payload.role as string };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // ─── API routes: return 401 JSON ───

  if (pathname.startsWith("/api/partner/")) {
    if (!token) return jsonUnauthorized();
    const payload = await verifyJwt(token);
    if (!payload || (payload.role !== "PARTNER" && payload.role !== "ADMIN")) {
      return jsonUnauthorized();
    }
    return withUserHeaders(req, payload);
  }

  if (pathname.startsWith("/api/customer/")) {
    if (!token) return jsonUnauthorized();
    const payload = await verifyJwt(token);
    if (!payload) return jsonUnauthorized();
    return withUserHeaders(req, payload);
  }

  if ((pathname === "/api/orders" || pathname === "/api/upload") && req.method === "POST") {
    if (!token) return jsonUnauthorized();
    const payload = await verifyJwt(token);
    if (!payload) return jsonUnauthorized();
    return withUserHeaders(req, payload);
  }

  // ─── Partner pages: redirect to /partner/login ───

  if (pathname.startsWith("/partner") && pathname !== "/partner/login") {
    if (!token) return NextResponse.redirect(new URL("/partner/login", req.url));
    const payload = await verifyJwt(token);
    if (!payload || (payload.role !== "PARTNER" && payload.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/partner/login", req.url));
    }
    return withUserHeaders(req, payload);
  }

  // ─── Customer pages: redirect to /signin ───

  if (pathname.startsWith("/dashboard") || pathname === "/checkout") {
    if (!token) return NextResponse.redirect(new URL("/signin", req.url));
    const payload = await verifyJwt(token);
    if (!payload) return NextResponse.redirect(new URL("/signin", req.url));
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
  matcher: [
    "/partner/:path*",
    "/dashboard/:path*",
    "/checkout",
    "/api/partner/:path*",
    "/api/customer/:path*",
    "/api/orders",
    "/api/upload",
  ],
};
