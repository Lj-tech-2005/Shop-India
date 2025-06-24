import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;

  // Block access to /admin if no token
  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

// Applies middleware only to /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
