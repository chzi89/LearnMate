import bcrypt from "bcryptjs";
import dbConnect from "./db";
import Student from "../models/Student";
import { signToken, setAuthCookie } from "./session";

export async function registerStudent(data) {
  await dbConnect();

  const existingStudent = await Student.findOne({ email: data.email });
  if (existingStudent) {
    throw new Error("A student with this email already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const student = await Student.create({
    ...data,
    passwordHash,
  });

  // Remove password from returned object
  const studentObj = student.toObject();
  delete studentObj.passwordHash;

  // Auto-login after registration
  const token = await signToken({ id: student._id, email: student.email });
  await setAuthCookie(token);

  return { student: studentObj, token };
}

export async function loginStudent(email, password) {
  await dbConnect();

  const student = await Student.findOne({ email }).select("+passwordHash");
  if (!student) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, student.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = await signToken({ id: student._id, email: student.email });
  await setAuthCookie(token);

  return { 
    student: { 
      id: student._id, 
      name: student.name, 
      email: student.email, 
      grade: student.grade 
    }, 
    token 
  };
}
