import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Keep in sync with `ADMIN_SESSION_COOKIE` in lib/admin/auth-session.ts */
const ADMIN_SESSION_COOKIE = "ak-admin-session";

function safeAdminNext(next: string | null): string {
  if (!next) return "/admin";
  if (!next.startsWith("/admin")) return "/admin";
  if (next.startsWith("/admin/login")) return "/admin";
  return next;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  // Already signed in → leave login, preserve intended destination
  if (pathname === "/admin/login") {
    if (hasSession) {
      const next = safeAdminNext(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin") && !hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
