"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { storage } from "@/lib/storage";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    grade: "Grade 9",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = storage.getProfile();
    setProfile({
      name: savedProfile.name || session?.user?.name || "",
      grade: savedProfile.grade || "Grade 9",
    });
  }, [session]);

  const handleSave = () => {
    storage.saveProfile(profile);
    setIsEditing(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
              My Profile
            </p>
            <h1 className="mt-3 text-3xl font-bold">Student Account</h1>
          </div>
          <Link
            href="/learn"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Back to Tutor
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Identity Card */}
          <section className="md:col-span-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600 shadow-inner">
                {profile.name ? profile.name[0].toUpperCase() : session?.user?.name?.[0]?.toUpperCase() || "L"}
              </div>
              <h2 className="text-xl font-bold">{profile.name || session?.user?.name || "Student"}</h2>
              <p className="text-sm text-slate-500 mb-6">{profile.grade}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-green-600">Active Learner</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm">
                  <span className="text-slate-500">Account</span>
                  <span className="font-semibold text-slate-700">Google Auth</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Details & Settings */}
          <section className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Account Details</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
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
                        <input 
                          type="text" 
                          value={profile.name} 
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="border-b border-indigo-300 outline-none py-1"
                        />
                      ) : (
                        <p className="font-semibold">{profile.name || session?.user?.name || "Not set"}</p>
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
                        <select 
                          value={profile.grade} 
                          onChange={(e) => setProfile({...profile, grade: e.target.value})}
                          className="border-b border-indigo-300 outline-none py-1"
                        >
                          <option>Grade 6</option>
                          <option>Grade 7</option>
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12</option>
                        </select>
                      ) : (
                        <p className="font-semibold">{profile.grade}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button 
                    onClick={handleSave}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-3xl border border-red-100 bg-red-50 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-600 mb-6">
                Once you sign out, you will need to authenticate again to access your progress.
              </p>
              <button 
                onClick={() => signOut()}
                className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
              >
                Sign Out of Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
