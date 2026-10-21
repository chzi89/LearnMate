import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import AssessmentResult from "@/models/AssessmentResult";
import { getAuthToken, verifyToken } from "@/lib/session";

// In a real app, these would be in a database. For now, they mirror the API's bank.
const ANSWER_KEY = {
  "g6-1": "144", "g6-2": "7", "g6-3": "8", "g6-4": "Mars", "g6-5": "Paris",
  "g6-6": "Carbon Dioxide", "g6-7": "7", "g6-8": "Cell", "g6-9": "Pacific", "g6-10": "William Shakespeare",
  "g9-1": "a²+2ab+b²", "g9-2": "Mitochondria", "g9-3": "Au", "g9-4": "Newton", "g9-5": "Euclid",
  "g9-6": "7", "g9-7": "Stratosphere", "g9-8": "225", "g9-9": "Hydrogen", "g9-10": "Evaporation",
  "def-1": "12", "def-2": "Blue Whale", "def-3": "Tokyo", "def-4": "7", "def-5": "Cheetah",
  "def-6": "25", "def-7": "Mercury", "def-8": "0°C", "def-9": "Da Vinci", "def-10": "London",
};

export async function POST(req) {
  try {
    const token = await getAuthToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    const { answers, subject = "General Knowledge" } = await req.json();
    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid answers format" }, { status: 400 });
    }

    await dbConnect();
    
    let correctCount = 0;
    const detailedAnswers = Object.entries(answers).map(([qId, selected]) => {
      const isCorrect = ANSWER_KEY[qId] === selected;
      if (isCorrect) correctCount++;
      return { questionId: qId, selectedOption: selected, isCorrect };
    });

    const total = detailedAnswers.length;
    const percentage = (correctCount / total) * 100;

    let level = "Beginner";
    if (percentage >= 80) level = "Advanced";
    else if (percentage >= 50) level = "Intermediate";

    const result = await AssessmentResult.create({
      studentId: payload.id,
      subject,
      answers: detailedAnswers,
      score: correctCount,
      totalQuestions: total,
      percentage,
      learningLevel: level,
    });

    // Update Student profile
    await Student.findByIdAndUpdate(payload.id, {
      hasCompletedEntryQuiz: true,
      currentLearningLevel: level,
    });

    return NextResponse.json({
      score: correctCount,
      total,
      percentage,
      level,
      resultId: result._id,
    }, { status: 200 });
  } catch (error) {
    console.error("Quiz Submit Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
