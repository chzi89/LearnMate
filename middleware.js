import { NextResponse } from "next/server";
import { getAuthToken, verifyToken } from "@/lib/session";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

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
      const payload = await verifyToken(token);
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

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Entry Quiz Logic - Check if student has completed the assessment
  // We exclude the entry-quiz route itself to avoid infinite redirect
  if (pathname !== "/entry-quiz") {
    try {
      await dbConnect();
      const student = await Student.findById(payload.id);
      
      if (!student) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (!student.hasCompletedEntryQuiz) {
        return NextResponse.redirect(new URL("/entry-quiz", request.url));
      }
    } catch (error) {
      console.error("Middleware DB Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

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
