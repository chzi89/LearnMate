import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/session";

export async function POST() {
  try {
    await removeAuthCookie();
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
