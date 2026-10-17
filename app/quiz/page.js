"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { storage } from "@/lib/storage";

export default function QuizPage() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateQuickQuiz() {
    setLoading(true);
    setError(null);
    try {
      const profile = storage.getProfile();
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "General Knowledge",
          grade: profile.grade || "Grade 9",
          language: "English",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load quiz");
      setQuizData(data.quiz);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
            Practice Center
          </p>
          <h1 className="mt-3 text-3xl font-bold">Knowledge Check</h1>
          <p className="mt-2 text-slate-600">
            Test your understanding with a dynamic AI-generated quiz.
          </p>
        </header>

        {!quizData ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600">
              🎯
            </div>
            <h2 className="text-xl font-bold">Ready for a challenge?</h2>
            <p className="mt-2 mb-8 text-slate-600">
              Generate a quick quiz based on your current grade level.
            </p>
            <button
              onClick={generateQuickQuiz}
              disabled={loading}
              className="inline-flex rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95"
            >
              {loading ? "Generating..." : "Start Quick Quiz"}
            </button>
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            {quizData.map((q, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-400 mb-2">Question {index + 1}</p>
                <h3 className="text-lg font-semibold mb-4">{q.question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      className="text-left rounded-xl border border-slate-200 p-3 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                      onClick={() => alert(`Correct answer: ${q.correctAnswer}\n\n${q.explanation}`)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center pt-6">
              <button 
                onClick={() => setQuizData(null)}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2 font-semibold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Try Another Quiz
              </button>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center">
          <Link
            href="/learn"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            ← Back to AI Tutor
          </Link>
        </footer>
      </div>
    </main>
  );
}
