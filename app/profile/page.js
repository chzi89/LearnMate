"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load profile");
        setStudent(data.student);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setDraft({ ...student });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      
      setStudent(data.student);
      setIsEditing(false);
      setSaveMessage("Profile updated successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-600">{error}</div>;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">My Profile</p>
            <h1 className="mt-3 text-3xl font-bold">Student Account</h1>
          </div>
          <Link href="/learn" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
            Back to Tutor
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section className="md:col-span-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600 shadow-inner">
                {student.name ? student.name[0].toUpperCase() : "S"}
              </div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-slate-500 mb-6">{student.grade}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm">
                  <span className="text-slate-500">Skill Level</span>
                  <span className="font-semibold text-indigo-600">{student.currentLearningLevel}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm">
                  <span className="text-slate-500">Joined</span>
                  <span className="font-semibold text-slate-700">{new Date(student.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Account Details</h3>
                <button onClick={handleEdit} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">👤</div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">Full Name</p>
                      {isEditing ? (
                        <input type="text" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="border-b border-indigo-300 outline-none py-1" />
                      ) : (
                        <p className="font-semibold">{student.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">🎓</div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">Education Level</p>
                      {isEditing ? (
                        <select value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: e.target.value })} className="border-b border-indigo-300 outline-none py-1">
                          <option>Grade 6</option>
                          <option>Grade 7</option>
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12</option>
                        </select>
                      ) : (
                        <p className="font-semibold">{student.grade}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">🌐</div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">Preferred Language</p>
                      {isEditing ? (
                        <select value={draft.preferredLanguage} onChange={(e) => setDraft({ ...draft, preferredLanguage: e.target.value })} className="border-b border-indigo-300 outline-none py-1">
                          <option>English</option>
                          <option>Roman Urdu</option>
                        </select>
                      ) : (
                        <p className="font-semibold">{student.preferredLanguage}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">📝</div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 uppercase font-bold">Short Bio</p>
                      {isEditing ? (
                        <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} className="w-full border-b border-indigo-300 outline-none py-1 resize-none" rows="2" />
                      ) : (
                        <p className="font-semibold">{student.bio || "No bio added yet."}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button onClick={handleSave} disabled={saveLoading} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md disabled:bg-indigo-400">
                    {saveLoading ? "Saving..." : "Save Changes"}
                  </button>
                )}
                {saveMessage && <p className="text-center text-sm font-medium text-green-600">{saveMessage}</p>}
              </div>
            </div>

            <div className="rounded-3xl border border-red-100 bg-red-50 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-red-700 mb-2">Account Security</h3>
              <p className="text-sm text-red-600 mb-6">Manage your password to keep your account secure.</p>
              <Link href="/settings" className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all">
                Change Password
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
