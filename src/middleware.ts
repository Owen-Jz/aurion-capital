import { NextRequest, NextResponse } from "next/server";

const CLIENT_SESSION_COOKIE = "aurion_session";
const ADMIN_SESSION_COOKIE = "aurion_admin_session";

const ADMIN_LOGIN = "/admin/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientToken = request.cookies.get(CLIENT_SESSION_COOKIE)?.value;
  const adminToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  const isAdminLogin = pathname === ADMIN_LOGIN;
  const isAdminRoute = pathname.startsWith("/admin") && !isAdminLogin;
  const isPortal = pathname.startsWith("/portal");
  const isInvest = pathname.startsWith("/invest");
  const isClientAuth = pathname === "/login" || pathname === "/signup";

  // Admin routes — require admin session cookie
  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
  }

  // Admin login page — if already authenticated as admin, go to panel
  if (isAdminLogin && adminToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Client portal / invest — require client session cookie
  if ((isPortal || isInvest) && !clientToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Client auth pages — if already logged in as client, go to portal
  if (isClientAuth && clientToken) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/portal/:path*",
    "/invest/:path*",
    "/invest",
    "/admin/:path*",
    "/admin",
    "/login",
    "/signup",
  ],
};
