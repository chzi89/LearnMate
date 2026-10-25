"use client";

import React from "react";
import Link from "next/link";
import AcademicLevels from "@/components/AcademicLevels";

const features = [
  {
    title: "Quality Education",
    description:
      "A rigorous academic curriculum aligned with board standards to ensure student success.",
    icon: "⭐",
  },
  {
    title: "Character Building",
    description:
      "Instilling discipline, integrity, and Islamic values in every student we teach.",
    icon: "🛡️",
  },
  {
    title: "Expert Faculty",
    description:
      "Dedicated teachers with advanced degrees and a passion for pedagogical excellence.",
    icon: "👨‍🏫",
  },
  {
    title: "Modern Facilities",
    description:
      "Providing a safe, clean, and resource-rich environment for optimal learning.",
    icon: "🏫",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}

      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-pphs-navy text-white">
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4">
              Welcome to Punjab Public High School
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              From First Steps <br />
              <span className="text-pphs-gold">to Matric Success</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Providing a strong educational foundation from Playgroup to Class
              10, helping students grow in knowledge, character, and confidence.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/learn"
                className="bg-pphs-gold text-pphs-navy font-bold px-10 py-4 rounded-full hover:bg-white transition-all shadow-lg focus:ring-4 focus:ring-amber-300 outline-none"
              >
                Learning
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-pphs-navy transition-all focus:ring-4 focus:ring-blue-400 outline-none"
              >
                Explore School
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-full aspect-square bg-blue-800/30 rounded-3xl border-2 border-pphs-gold/30 flex items-center justify-center relative">
              <span className="text-9xl opacity-20">🎓</span>
              <div className="absolute -top-6 -right-6 bg-white text-pphs-navy p-6 rounded-2xl shadow-xl">
                <p className="font-bold text-2xl">Playgroup</p>
                <p className="text-sm text-slate-500">to</p>
                <p className="font-bold text-2xl">Class 10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Stages Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-pphs-navy mb-4">
            Our Educational Pathway
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A structured progression designed to nurture growth at every stage
            of a child's development.
          </p>
        </div>
        <AcademicLevels />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-pphs-navy mb-6 leading-tight">
                Why Punjab Public <br />
                <span className="text-amber-600">High School?</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 mx-auto lg:mx-0">
                We combine academic rigor with a supportive environment,
                ensuring that every student receives the attention they need to
                thrive. Our focus extends beyond textbooks to cultivate
                leadership and ethics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {features.map((f, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <h4 className="font-bold text-pphs-navy">{f.title}</h4>
                      <p className="text-sm text-slate-500">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden">
                <img
                  src="/api/placeholder/400/400"
                  alt="School Life"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden translate-y-8">
                <img
                  src="/api/placeholder/400/400"
                  alt="Student Success"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-6 text-center bg-pphs-navy text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Join a community dedicated to academic excellence and noble
            character.
          </p>
          <Link
            href="/admissions"
            className="bg-pphs-gold text-pphs-navy font-bold px-10 py-4 rounded-full hover:bg-white transition-all shadow-lg inline-block"
          >
            Enquire About Admissions
          </Link>
        </div>
      </section>
    </main>
  );
}
