import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    grade: {
      type: String,
      required: [true, "Grade or class is required"],
    },
    interests: [String],
    preferredLanguage: {
      type: String,
      default: "English",
    },
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceed 500 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    hasCompletedEntryQuiz: {
      type: Boolean,
      default: false,
    },
    currentLearningLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Not Assessed"],
      default: "Not Assessed",
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast email lookups during login
StudentSchema.index({ email: 1 });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
