import { NextResponse } from "next/server";

export async function middleware(request) {
  // AUTH DISABLED TEMPORARILY
  // Allow all requests to pass through without authentication checks
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/learn/:path*",
    "/profile/:path*",
    "/quiz/:path*",
    "/progress/:path*",
    "/settings/:path*",
  ],
};
