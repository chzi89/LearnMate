import { GoogleGenAI } from "@google/genai";

const MAX_BODY_BYTES = 16 * 1024;
const REQUEST_TIMEOUT_MS = 30_000;

const systemInstruction = 
  "You are LearnMate, an expert educational assessment creator. " +
  "Your goal is to generate a short, high-quality quiz based on a specific topic and grade level. " +
  "Return the response strictly as a JSON object. Do not include markdown formatting like ```json. " +
  "The JSON structure must be: " +
  "{ \"quiz\": [ { \"question\": \"...\", \"options\": [\"A\", \"B\", \"C\", \"D\"], \"correctAnswer\": \"...\", \"explanation\": \"...\" } ] } " +
  "Generate 3 questions. Ensure options are plausible but only one is correct. " +
  "Adapt the language and difficulty to the student's grade level.";

function errorResponse(message, status) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return errorResponse("Request is too large.", 413);
  }

  let body;
  try {
    const rawBody = await request.text();
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("Request body must be valid JSON.", 400);
  }

  const { topic, grade, language } = body;
  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return errorResponse("Topic is required.", 400);
  }
  if (!grade || typeof grade !== "string") {
    return errorResponse("Grade is required.", 400);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ 
      mode: "demo", 
      quiz: [
        {
          question: "What is the primary source of energy for most life on Earth?",
          options: ["The Moon", "The Sun", "Wind", "Volcanoes"],
          correctAnswer: "The Sun",
          explanation: "The Sun provides light energy that plants use for photosynthesis."
        }
      ] 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create(
      {
        model: "gemini-3.8-flash",
        input: `Topic: ${topic}\nGrade: ${grade}\nLanguage: ${language}\nGenerate a 3-question multiple choice quiz.`,
        system_instruction: systemInstruction,
        generation_config: { response_mime_type: "application/json" },
        store: false,
      },
      { timeout: REQUEST_TIMEOUT_MS, maxRetries: 0 },
    );

    const answer = interaction.output_text;
    if (!answer) {
      return errorResponse("The AI could not generate a quiz.", 502);
    }

    return Response.json({ mode: "ai", ...JSON.parse(answer) });
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return errorResponse("Failed to generate quiz. Please try again.", 500);
  }
}
