"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EntryQuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch("/api/entry-quiz");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load quiz");
        setQuestions(data.questions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, []);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [questions[currentIndex].id]: option });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitQuiz = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/entry-quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Quiz...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-600">{error}</div>;

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-4xl">🎉</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Assessment Complete!</h1>
          <p className="text-slate-500 mb-8">Your basic knowledge has been evaluated.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-500 uppercase font-bold mb-1">Score</p>
              <p className="text-3xl font-bold text-indigo-600">{result.score} / {result.total}</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-500 uppercase font-bold mb-1">Percentage</p>
              <p className="text-3xl font-bold text-indigo-600">{result.percentage}%</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-500 uppercase font-bold mb-1">Skill Level</p>
              <p className="text-3xl font-bold text-indigo-600">{result.level}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50 text-indigo-700 mb-10 border border-indigo-100">
            <p className="font-medium">
              {result.level === "Advanced" ? "Excellent! You have a strong foundation. Let's dive into more complex topics." : 
               result.level === "Intermediate" ? "Great job! You know the basics well. We'll focus on bridging the gaps." : 
               "Welcome! We'll start with the fundamental concepts to build your confidence."}
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md"
          >
            Enter Learning Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          <header className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Entry Assessment</p>
              <h1 className="text-2xl font-bold text-slate-900">Question {currentIndex + 1} of {questions.length}</h1>
            </div>
            <div className="text-sm font-medium text-slate-400">
              {Object.keys(answers).length} / {questions.length} answered
            </div>
          </header>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
              {questions[currentIndex].q}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {questions[currentIndex].o.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    answers[questions[currentIndex].id] === option 
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold" 
                      : "border-slate-100 hover:border-indigo-200 text-slate-600"
                  }`}
                >
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-xs font-bold mr-3 text-slate-500">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-6 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-30"
            >
              Previous
            </button>
            
            {currentIndex === questions.length - 1 ? (
              <button
                onClick={submitQuiz}
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md disabled:bg-indigo-400"
              >
                {submitting ? "Submitting..." : "Finish Assessment"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
