"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { storage } from "@/lib/storage";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    grade: "Grade 9",
    subject: "Biology",
    language: "English",
  });

  useEffect(() => {
    const savedProfile = storage.getProfile();
    setProfile((prev) => ({
      ...prev,
      name: savedProfile.name || "",
      grade: savedProfile.grade || "Grade 9",
    }));
  }, []);

  const handleSave = () => {
    storage.saveProfile(profile);
    alert("Settings saved successfully!");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
            Account
          </p>
          <h1 className="mt-3 text-3xl font-bold">Learning Preferences</h1>
          <p className="mt-2 text-slate-600">
            Adjust your profile to get the most personalized experience from your AI tutor.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Default Grade</label>
              <select
                value={profile.grade}
                onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              >
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/learn"
                className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                className="rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
