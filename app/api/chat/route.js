import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (typeof question !== "string" || !question.trim()) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY .env.local mein missing hai" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
      systemInstruction:
        "You are LearnMate, a friendly AI tutor. Explain concepts simply with clear examples for beginners.",
    });

    let result;

    // Temporary service errors par maximum 2 retries
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        result = await model.generateContent(question);
        break;
      } catch (error) {
        const status = error.status;

        if (status !== 503 || attempt === 2) {
          throw error;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1)),
        );
      }
    }

    const answer = result.response.text();

    return Response.json({ answer });
  } catch (error) {
    console.error("Gemini API error:", error);

    const status = error.status === 503 ? 503 : 500;

    return Response.json(
      {
        error:
          status === 503
            ? "Gemini service busy hai. Kuch dair baad dobara try karo."
            : "AI request fail hui. Terminal mein error check karo.",
      },
      { status },
    );
  }
}
