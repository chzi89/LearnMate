import Link from "next/link";

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
          Learning progress
        </p>
        <h1 className="mt-3 text-3xl font-bold">Progress is not saved yet</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          LearnMate is currently a preview without student accounts or progress
          storage. The sample activity on the dashboard is illustrative and
          does not represent your results.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Continue learning
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Preview dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
