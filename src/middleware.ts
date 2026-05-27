import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "aurion_session";
const PORTAL_PREFIX = "/portal";
const ADMIN_PREFIX = "/admin";
const AUTH_PATHS = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  const isPortal = pathname.startsWith(PORTAL_PREFIX);
  const isAdmin = pathname.startsWith(ADMIN_PREFIX);
  const isInvest = pathname.startsWith("/invest");
  const isAuth = AUTH_PATHS.includes(pathname);

  if ((isPortal || isAdmin || isInvest) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuth && token) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/invest/:path*", "/invest", "/login", "/signup"],
};
