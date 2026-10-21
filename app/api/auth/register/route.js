import { NextResponse } from "next/server";
import { registerStudent } from "@/lib/auth-service";
import { verifyToken, getAuthToken } from "@/lib/session";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword, grade, interests } = body;

    if (!name || !email || !password || !confirmPassword || !grade) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const student = await registerStudent({
      name,
      email,
      password,
      grade,
      interests: Array.isArray(interests) ? interests : [],
    });

    return NextResponse.json(
      { message: "Student registered successfully", student },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred during registration" },
      { status: 400 }
    );
  }
}
