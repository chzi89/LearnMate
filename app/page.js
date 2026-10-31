"use client";

import React from "react";
import Link from "next/link";
import AcademicLevels from "@/components/AcademicLevels";
import { schoolData } from "@/lib/school-data";

const features = [
  {
    title: "Quality Education",
    description:
      "A structured academic programme that builds strong foundations at every stage.",
    icon: "⭐",
  },
  {
    title: "Character Building",
    description:
      "Instilling discipline, integrity, and Islamic values in every student we teach.",
    icon: "🛡️",
  },
  {
    title: "Dedicated Teachers",
    description:
      "Caring teachers who guide students through each stage of their learning.",
    icon: "👨‍🏫",
  },
  {
    title: "Supportive Environment",
    description:
      "A welcoming school community where students feel encouraged to learn and grow.",
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              From First Steps <br />
              <span className="text-pphs-gold">to Matric Success</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Providing a strong educational foundation from Playgroup to Class
              10, helping students grow in knowledge, character, and confidence.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/admissions"
                className="bg-pphs-gold text-pphs-navy font-bold px-10 py-4 rounded-full hover:bg-white transition-all shadow-lg focus:ring-4 focus:ring-amber-300 outline-none"
              >
                Enquire About Admissions
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-pphs-navy transition-all focus:ring-4 focus:ring-blue-400 outline-none"
              >
                Explore Our School
              </Link>
            </div>
            <p className="mt-5 text-sm text-blue-100">
              Want to try the study assistant?{" "}
              <Link href="/learn" className="font-semibold text-amber-300 underline underline-offset-4 hover:text-white transition-colors">
                Open the AI tutor
              </Link>
            </p>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-full aspect-square bg-blue-800/30 rounded-3xl border-2 border-pphs-gold/30 flex items-center justify-center relative overflow-hidden">
              <img
                src="/school-event-1.jpg"
                alt="Students of Punjab Public High School on an educational trip"
                className="absolute inset-0 h-full w-full object-cover"
              />
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
            of a child&apos;s development.
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
                  src="/hifz-class.jpg"
                  alt="Students at a Hifz class assembly at Punjab Public High School"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden translate-y-8">
                <img
                  src="/school-event-3.jpg"
                  alt="Students gathered outdoors during a school learning session"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Faculty Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-2">
              Our People
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-pphs-navy mb-4">
              School Leadership
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The team guiding Punjab Public High School from Playgroup to
              Matric.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolData.leadership.map((leader) => (
              <div
                key={leader.name}
                className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-full bg-pphs-navy text-pphs-gold mx-auto mb-4 flex items-center justify-center overflow-hidden text-xl font-bold">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.role}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    leader.name.split(" ").map((part) => part[0]).join("")
                  )}
                </div>
                <h3 className="font-bold text-pphs-navy">{leader.name}</h3>
                <p className="text-sm text-blue-900 font-medium">
                  {leader.role}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {leader.qualification}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/about"
              className="text-pphs-navy font-bold underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-600 transition-colors"
            >
              Meet our teachers
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Preview */}
      <section className="py-16 px-6 bg-pphs-navy text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-2">
              {schoolData.achievers.board} — {schoolData.achievers.grade}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Celebrating Our Achievers
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Recognising the top position holders who have set a benchmark of
              success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {schoolData.achievers.students.map((student) => (
              <div
                key={student.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <span className="inline-block mb-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase text-pphs-navy">
                  {student.position} Position
                </span>
                <p className="text-lg font-bold">{student.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/results"
              className="inline-block rounded-full border-2 border-amber-400 px-6 py-3 text-sm font-bold text-amber-300 hover:bg-amber-400 hover:text-pphs-navy transition-colors"
            >
              View all results
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-2">
                School Life
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-pphs-navy">
                Inside Our School
              </h2>
            </div>
            <Link
              href="/gallery"
              className="font-bold text-pphs-navy hover:text-amber-600 transition-colors"
            >
              View gallery →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Educational Trips",
                src: "/school-event-1.jpg",
                alt: "Students on an educational trip",
              },
              {
                label: "Events",
                src: "/fearwell.jpg",
                alt: "Students and teachers at a farewell gathering",
              },
              {
                label: "Hifz Class",
                src: "/hifz-class.jpg",
                alt: "Students at a Hifz class assembly",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href="/gallery"
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-pphs-navy/85 px-4 py-1.5 text-xs font-semibold text-white">
                  {item.label}
                </span>
              </Link>
            ))}
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
