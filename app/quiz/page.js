import Link from "next/link";

export const metadata = {
  title: "Practice",
  description: "Try a sample practice question in the LearnMate tutor.",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
          Practice quizzes
        </p>
        <h1 className="mt-3 text-3xl font-bold">Ready for a quick challenge?</h1>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold">Try the sample knowledge check</p>
          <p className="mt-2 leading-7 text-slate-600">
            The tutor workspace includes a short, subject-based sample question.
            Quiz generation and saved results are not available in this preview.
          </p>
          <Link
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            href="/learn"
          >
            Open tutor and practice
          </Link>
        </div>
      </div>
    </main>
  );
}
