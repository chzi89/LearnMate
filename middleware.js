import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export async function middleware(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  return null;
}

export const config = {
  matcher: ["/learn", "/dashboard", "/progress"],
};
