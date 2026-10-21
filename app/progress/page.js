"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { storage } from "@/lib/storage";

export default function ProgressPage() {
  const progressSnapshot = useSyncExternalStore(
    storage.subscribeToProgress,
    storage.getProgressSnapshot,
    () => null,
  );
  const progress = useMemo(
    () => (progressSnapshot ? JSON.parse(progressSnapshot) : {}),
    [progressSnapshot],
  );
  const isLoading = progressSnapshot === null;

  const topics = Object.entries(progress);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
            Learning Analytics
          </p>
          <h1 className="mt-3 text-3xl font-bold">Your Progress Journey</h1>
          <p className="mt-2 text-slate-600">
            Track your mastery across different subjects and topics.
          </p>
        </header>

        {isLoading ? (
          <div className="text-center py-20">Loading your progress...</div>
        ) : topics.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
              📈
            </div>
            <h2 className="text-xl font-bold">No progress recorded yet</h2>
            <p className="mt-2 mb-8 text-slate-600">
              Start learning with your AI tutor and taking quizzes to see your stats here.
            </p>
            <Link
              href="/learn"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition-all"
            >
              Start Learning Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(([topic, stats]) => (
              <div key={topic} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-indigo-100 text-indigo-600">
                    {stats.subject}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(stats.completedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{topic}</h3>
                <div className="flex items-center justify-between py-4 border-y border-slate-50 my-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase font-medium">Best Score</p>
                    <p className="text-xl font-bold text-indigo-600">{stats.bestScore}%</p>
                  </div>
                  <div className="text-center border-x border-slate-100 px-6">
                    <p className="text-xs text-slate-400 uppercase font-medium">Attempts</p>
                    <p className="text-xl font-bold">{stats.attempts}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase font-medium">Last</p>
                    <p className="text-xl font-bold">{stats.lastScore}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full transition-all duration-500" 
                    style={{ width: `${stats.bestScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-12 flex justify-center gap-4">
          <Link
            href="/learn"
            className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Tutor Workspace
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-all"
          >
            View Dashboard
          </Link>
        </footer>
      </div>
    </main>
  );
}
