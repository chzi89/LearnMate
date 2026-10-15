import Link from "next/link";

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-10 text-on-surface sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Learning progress</p>
        <h1 className="mt-3 text-3xl font-bold">Your growth snapshot</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Concept mastery", "78%", "Up 9% this week"],
            ["Quiz accuracy", "84%", "Strong in biology"],
            ["Streak", "6 days", "Keep the rhythm going"],
          ].map(([label, value, note]) => (
            <div key={label} className="rounded-2xl border border-surface-container bg-surface-container-lowest p-5 shadow-sm">
              <p className="text-sm text-on-surface-variant">{label}</p>
              <p className="mt-3 text-3xl font-bold text-primary">{value}</p>
              <p className="mt-2 text-sm text-on-surface-variant">{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Link href="/learn" className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary">Continue lesson</Link>
          <Link href="/dashboard" className="rounded-xl bg-surface-container px-4 py-2 text-sm font-semibold text-on-surface">Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
