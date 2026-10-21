import { NextResponse } from "next/server";
import { getAuthToken, verifyTokenEdge } from "@/lib/session";

export async function middleware(request) {
  const token = await getAuthToken();
  const { pathname } = request.nextUrl;

  // 1. Public Routes - Allow access to these regardless of auth state
  const isPublicRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/";

  if (isPublicRoute) {
    // If user is already logged in, redirect them away from auth pages
    if (token) {
      const payload = await verifyTokenEdge(token);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Protected Routes - Check for valid token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyTokenEdge(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // NOTE: Database checks (like hasCompletedEntryQuiz) must be handled 
  // in Server Components or API routes, NOT in the Edge Middleware.
  
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
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
