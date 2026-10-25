"use client";

import React from "react";
import Link from "next/link";
import { schoolData } from "@/lib/school-data";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-pphs-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Academic Excellence</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Celebrating the outstanding achievements of our students in the board examinations. 
            Your hard work and dedication are our greatest pride.
          </p>
        </div>
      </section>

      {/* Wall of Fame */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-2">
            {schoolData.achievers.board} — {schoolData.achievers.grade}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-pphs-navy mb-4">
            Wall of Fame
          </h2>
          <p className="text-slate-600">
            Recognizing the top position holders who have set a benchmark of success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {schoolData.achievers.students.map((student, idx) => {
            const isFirst = student.position === "1st";
            return (
              <div 
                key={idx} 
                className={`relative p-8 rounded-3xl text-center transition-all duration-300 ${
                  isFirst 
                    ? "bg-white border-2 border-amber-400 shadow-xl scale-110 z-10" 
                    : "bg-white border border-slate-100 shadow-sm"
                }`}
              >
                {isFirst && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-pphs-navy font-bold px-4 py-1 rounded-full text-sm uppercase">
                    Top Position
                  </div>
                )}
                <div className={`w-24 h-24 ${isFirst ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'} rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold`}>
                  {student.name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${isFirst ? 'text-amber-600' : 'text-slate-400'}`}>
                  {student.position} Position
                </p>
                <h3 className="text-2xl font-bold text-pphs-navy">{student.name}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-20 px-6 bg-slate-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-pphs-navy mb-4">Striving for More</h3>
          <p className="text-slate-600 leading-relaxed mb-8">
            We believe every student has the potential to excel. Our dedicated faculty 
            provides the guidance and resources necessary to turn ambition into achievement.
          </p>
          <Link 
            href="/admissions" 
            className="bg-pphs-navy text-white px-8 py-3 rounded-full font-bold hover:bg-pphs-gold hover:text-pphs-navy transition-all"
          >
            Secure Your Child's Future
          </Link>
        </div>
      </section>
    </main>
  );
}
