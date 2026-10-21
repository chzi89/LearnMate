import mongoose from "mongoose";

const AssessmentResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    answers: [
      {
        questionId: String,
        selectedOption: String,
        isCorrect: Boolean,
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    learningLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for retrieving a student's history
AssessmentResultSchema.index({ studentId: 1, completedAt: -1 });

export default mongoose.models.AssessmentResult || mongoose.model("AssessmentResult", AssessmentResultSchema);
