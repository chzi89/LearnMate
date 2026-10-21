import { NextResponse } from "next/server";
import { loginStudent } from "@/lib/auth-service";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await loginStudent(email, password);

    return NextResponse.json(
      { message: "Login successful", student: result.student },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Invalid credentials" },
      { status: 401 }
    );
  }
}
