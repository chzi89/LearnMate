import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const authMiddleware = withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

function hasAuthConfiguration() {
  return Boolean(
    process.env.NEXTAUTH_URL &&
      process.env.NEXTAUTH_SECRET &&
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET,
  );
}

export default function proxy(request, event) {
  if (!hasAuthConfiguration()) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("reason", "auth-not-configured");
    return NextResponse.redirect(signInUrl);
  }

  return authMiddleware(request, event);
}

export const config = {
  matcher: ["/learn", "/dashboard", "/progress", "/profile"],
};
