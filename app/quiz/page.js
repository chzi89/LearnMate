export default function QuizPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-10 text-on-surface sm:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Practice quizzes</p>
        <h1 className="mt-3 text-3xl font-bold">Ready for a quick challenge?</h1>
        <div className="mt-8 rounded-2xl border border-surface-container bg-surface-container-lowest p-6 shadow-sm">
          <p className="text-lg font-semibold">Photosynthesis quick check</p>
          <p className="mt-2 text-on-surface-variant">Review the core idea, then test your understanding with a short set of questions.</p>
          <button type="button" className="mt-6 rounded-lg bg-secondary px-4 py-2 font-semibold text-on-secondary">Start quiz</button>
        </div>
      </div>
    </main>
  );
}
