import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import { getAuthToken, verifyToken } from "@/lib/session";

const QUESTION_BANK = {
  "Grade 6": [
    { id: "g6-1", q: "What is 12 x 12?", o: ["124", "144", "164", "184"], a: "144" },
    { id: "g6-2", q: "Which is a prime number?", o: ["4", "6", "7", "9"], a: "7" },
    { id: "g6-3", q: "What is the square root of 64?", o: ["6", "7", "8", "9"], a: "8" },
    { id: "g6-4", q: "Which planet is known as the Red Planet?", o: ["Venus", "Mars", "Jupiter", "Saturn"], a: "Mars" },
    { id: "g6-5", q: "What is the capital of France?", o: ["Berlin", "Madrid", "Rome", "Paris"], a: "Paris" },
    { id: "g6-6", q: "Which gas do plants absorb from the atmosphere?", o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], a: "Carbon Dioxide" },
    { id: "g6-7", q: "How many continents are there?", o: ["5", "6", "7", "8"], a: "7" },
    { id: "g6-8", q: "What is the smallest unit of life?", o: ["Tissue", "Organ", "Cell", "Atom"], a: "Cell" },
    { id: "g6-9", q: "Which is the largest ocean on Earth?", o: ["Atlantic", "Indian", "Arctic", "Pacific"], a: "Pacific" },
    { id: "g6-10", q: "Who wrote 'Romeo and Juliet'?", o: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], a: "William Shakespeare" },
  ],
  "Grade 9": [
    { id: "g9-1", q: "What is the value of (a+b)²?", o: ["a²+b²", "a²+2ab+b²", "a²-2ab+b²", "a²+ab+b²"], a: "a²+2ab+b²" },
    { id: "g9-2", q: "Which organelle is the powerhouse of the cell?", o: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], a: "Mitochondria" },
    { id: "g9-3", q: "What is the chemical symbol for Gold?", o: ["Ag", "Fe", "Au", "Pb"], a: "Au" },
    { id: "g9-4", q: "In physics, what is the unit of Force?", o: ["Joule", "Watt", "Newton", "Pascal"], a: "Newton" },
    { id: "g9-5", q: "Who is known as the Father of Geometry?", o: ["Pythagoras", "Euclid", "Archimedes", "Aristotle"], a: "Euclid" },
    { id: "g9-6", q: "What is the pH of pure water?", o: ["5", "6", "7", "8"], a: "7" },
    { id: "g9-7", q: "Which layer of the atmosphere contains the ozone layer?", o: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], a: "Stratosphere" },
    { id: "g9-8", q: "What is the square of 15?", o: ["215", "225", "235", "245"], a: "225" },
    { id: "g9-9", q: "Which element has the atomic number 1?", o: ["Helium", "Oxygen", "Hydrogen", "Carbon"], a: "Hydrogen" },
    { id: "g9-10", q: "What is the process of water turning into vapor called?", o: ["Condensation", "Sublimation", "Evaporation", "Freezing"], a: "Evaporation" },
  ],
  "default": [
    { id: "def-1", q: "What is 5 + 7?", o: ["10", "11", "12", "13"], a: "12" },
    { id: "def-2", q: "Which is the largest animal?", o: ["Elephant", "Blue Whale", "Giraffe", "Shark"], a: "Blue Whale" },
    { id: "def-3", q: "What is the capital of Japan?", o: ["Seoul", "Beijing", "Bangkok", "Tokyo"], a: "Tokyo" },
    { id: "def-4", q: "How many colors are in a rainbow?", o: ["5", "6", "7", "8"], a: "7" },
    { id: "def-5", q: "Which is the fastest land animal?", o: ["Lion", "Tiger", "Cheetah", "Horse"], a: "Cheetah" },
    { id: "def-6", q: "What is 100 divided by 4?", o: ["20", "25", "30", "35"], a: "25" },
    { id: "def-7", q: "Which planet is closest to the Sun?", o: ["Venus", "Earth", "Mars", "Mercury"], a: "Mercury" },
    { id: "def-8", q: "What is the freezing point of water?", o: ["0°C", "10°C", "32°C", "-10°C"], a: "0°C" },
    { id: "def-9", q: "Who painted the Mona Lisa?", o: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], a: "Da Vinci" },
    { id: "def-10", q: "What is the capital of UK?", o: ["Paris", "London", "Berlin", "Rome"], a: "London" },
  ],
};

export async function GET() {
  try {
    const token = await getAuthToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    await dbConnect();
    const student = await Student.findById(payload.id);
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

    const questions = QUESTION_BANK[student.grade] || QUESTION_BANK["default"];
    
    // Remove correct answers before sending to client
    const sanitizedQuestions = questions.map(({ a, ...rest }) => rest);

    return NextResponse.json({ 
      questions: sanitizedQuestions, 
      studentGrade: student.grade 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
