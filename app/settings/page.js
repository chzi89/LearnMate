import Link from "next/link";

export const metadata = {
  title: "Settings",
  description: "LearnMate preview settings availability.",
};

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-bold">Personal settings are not available yet</h1>
        <p className="mt-4 leading-7 text-slate-600">
          This preview does not have student accounts or saved preferences.
          Your learning choices apply only while you use the tutor.
        </p>
        <Link
          className="mt-7 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          href="/learn"
        >
          Return to your tutor
        </Link>
      </section>
    </main>
  );
}
