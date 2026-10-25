"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdmissionsPage() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFormError("");

    // Demo delay to simulate processing
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-pphs-navy text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Admissions Open
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            We welcome aspiring learners from Playgroup to Class 10. Join a
            tradition of excellence, discipline, and academic achievement.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Panel */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-pphs-navy mb-4">
                Admission Process
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Submit an enquiry form to start the process. Our administration
                team will contact you for a visit and entry assessment.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
              <h3 className="font-bold text-amber-800 mb-2">
                Required Documents
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Birth Certificate</li>
                <li>• Previous School Record</li>
                <li>• Passport Photos (2)</li>
                <li>• Parent CNIC Copy</li>
              </ul>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-pphs-navy mb-2">
                  Enquiry Sent!
                </h3>
                <p className="text-slate-600 mb-8">
                  Thank you for your interest. Our admissions office will
                  contact you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-pphs-navy font-bold underline hover:text-amber-600"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Parent / Guardian Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pphs-navy outline-none transition-all"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pphs-navy outline-none transition-all"
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Desired Class for Admission
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pphs-navy outline-none transition-all bg-white"
                  >
                    <option value="">Select a class</option>
                    <option>Playgroup</option>
                    <option>Nursery</option>
                    <option>KG</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pphs-navy outline-none transition-all"
                    placeholder="Tell us more about your child's needs..."
                  ></textarea>
                </div>

                {formError && (
                  <p className="text-red-500 text-sm font-medium">
                    {formError}
                  </p>
                )}

                <button
                  disabled={status === "loading"}
                  className="w-full bg-pphs-navy text-white font-bold py-4 rounded-xl hover:bg-pphs-gold hover:text-pphs-navy transition-all shadow-lg disabled:bg-slate-400"
                >
                  {status === "loading"
                    ? "Sending Enquiry..."
                    : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
