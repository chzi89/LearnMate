"use client";

import React, { useState } from "react";
import Link from "next/link";

const stages = [
  {
    title: "Early Years",
    range: "Playgroup, Nursery, Kindergarten",
    description: "A nurturing start focused on social, emotional, and cognitive development through play-based learning.",
    icon: "🎨",
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Primary School",
    range: "Classes 1–5",
    description: "Establishing strong foundations in core literacy and numeracy while fostering a curiosity for the world.",
    icon: "📚",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Middle School",
    range: "Classes 6–8",
    description: "Bridging the gap to advanced learning with a focus on critical thinking and subject specialization.",
    icon: "🔬",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Secondary Education",
    range: "Classes 9–10 (Matric)",
    description: "Rigorous academic preparation for BISE board examinations with a focus on subject mastery.",
    icon: "🎓",
    color: "bg-slate-100 text-slate-800",
  },
];

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-20 px-6 bg-pphs-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Academic Journey</h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed">
            A structured educational pathway designed to guide students from their 
            very first steps in Playgroup to their ultimate success in Matriculation.
          </p>
        </div>
      </section>

      {/* Stages Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stages.map((stage, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${stage.color} rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110`}>
                {stage.icon}
              </div>
              <h3 className="text-2xl font-bold text-pphs-navy mb-2">{stage.title}</h3>
              <p className="text-amber-600 font-semibold mb-4">{stage.range}</p>
              <p className="text-slate-600 leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-pphs-navy mb-6">Ready to Join Our Community?</h2>
          <p className="text-slate-600 mb-10 text-lg">
            We are accepting applications for all academic stages. Join us in building 
            a brighter future for your child.
          </p>
          <Link 
            href="/admissions" 
            className="bg-pphs-navy text-white px-10 py-4 rounded-full font-bold hover:bg-pphs-gold hover:text-pphs-navy transition-all shadow-lg inline-block"
          >
            Apply for Admission
          </Link>
        </div>
      </section>
    </main>
  );
}
