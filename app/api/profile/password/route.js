import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import { getAuthToken, verifyToken } from "@/lib/session";

export async function PATCH(req) {
  try {
    const token = await getAuthToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Both current and new passwords are required" }, { status: 400 });
    }

    await dbConnect();
    const student = await Student.findById(payload.id).select("+passwordHash");
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(currentPassword, student.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    await Student.findByIdAndUpdate(payload.id, { passwordHash: newPasswordHash });

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
