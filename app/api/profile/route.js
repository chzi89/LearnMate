import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import { getAuthToken, verifyToken } from "@/lib/session";

export async function GET() {
  try {
    const token = await getAuthToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    await dbConnect();
    const student = await Student.findById(payload.id).select("-passwordHash");
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const token = await getAuthToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    const body = await req.json();
    const { name, grade, preferredLanguage, bio, avatar, interests } = body;

    // Validation: Ensure we don't update sensitive fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (grade !== undefined) updateData.grade = grade;
    if (preferredLanguage !== undefined) updateData.preferredLanguage = preferredLanguage;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (interests !== undefined) updateData.interests = interests;

    await dbConnect();
    const student = await Student.findByIdAndUpdate(
      payload.id,
      { $set: updateData },
      { new: true }
    ).select("-passwordHash");

    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
