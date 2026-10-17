import { GoogleGenAI } from "@google/genai";

const MAX_BODY_BYTES = 16 * 1024;
const REQUEST_TIMEOUT_MS = 30_000;

const systemInstruction = 
  "You are LearnMate, an educational analyst. " +
  "Your goal is to analyze a student's quiz results and provide a supportive, actionable summary. " +
  "Return the response strictly as a JSON object. Do not include markdown formatting. " +
  "The JSON structure must be: " +
  "{ \"summary\": \"...\", \"weakAreas\": [\"...\", \"...\"], \"nextStep\": \"...\", \"encouragement\": \"...\" } " +
  "Analyze the correct vs incorrect answers and suggest whether the student should: " +
  "1. Review the basics (if score < 50%) " +
  "2. Practice more intermediate questions (if score 50-80%) " +
  "3. Move to a harder topic or advanced challenge (if score > 80%)";

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

  const { quizResults, topic, grade } = body;
  if (!quizResults || !Array.isArray(quizResults)) {
    return errorResponse("Quiz results are required as an array.", 400);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ 
      mode: "demo",
      summary: "You've completed the quiz! You have a good grasp of the basics.",
      weakAreas: ["Some conceptual gaps in the core logic"],
      nextStep: "Try a few more practice questions to solidify your knowledge.",
      encouragement: "Keep going! Every mistake is a learning opportunity."
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create(
      {
        model: "gemini-3.8-flash",
        input: `Topic: ${topic}\nGrade: ${grade}\nResults: ${JSON.stringify(quizResults)}\nAnalyze these results and provide a summary.`,
        system_instruction: systemInstruction,
        generation_config: { response_mime_type: "application/json" },
        store: false,
      },
      { timeout: REQUEST_TIMEOUT_MS, maxRetries: 0 },
    );

    const answer = interaction.output_text;
    if (!answer) {
      return errorResponse("The AI could not analyze the results.", 502);
    }

    return Response.json({ mode: "ai", ...JSON.parse(answer) });
  } catch (error) {
    console.error("Progress analysis failed:", error);
    return errorResponse("Failed to analyze progress. Please try again.", 500);
  }
}
