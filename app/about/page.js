"use client";

import React from "react";
import Link from "next/link";
import { schoolData } from "@/lib/school-data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Welcome to Punjab Public High School
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building Bright Futures, <br />
            <span className="text-amber-400">From Playgroup to Matric</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Dedicated to providing quality education that builds strong academic foundations, 
            develops noble character, and prepares our students for future success 
            through a blend of academic excellence, discipline, and Islamic values.
          </p>
          <div className="mt-10">
            <Link 
              href="/register" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 inline-block shadow-lg"
            >
              Enquire About Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">School Leadership</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schoolData.leadership.map((leader, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                {leader.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{leader.name}</h3>
              <p className="text-blue-900 font-medium mb-2">{leader.role}</p>
              <p className="text-slate-500 text-sm">{leader.qualification}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Dedicated Teaching Staff</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolData.faculty.map((member, idx) => (
              <div 
                key={idx} 
                className="flex items-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-amber-200 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full mr-4 flex items-center justify-center font-semibold text-sm group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{member.name}</h4>
                  <p className="text-slate-600 text-sm">{member.role}</p>
                  {member.qualification && (
                    <p className="text-slate-400 text-xs mt-1">{member.qualification}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievers Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-900 font-bold tracking-widest uppercase text-xs mb-2">
            {schoolData.achievers.board} — {schoolData.achievers.grade}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Celebrating Our Class 9 Achievers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Recognizing the dedication, hard work, and academic achievements of our students.
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
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 font-bold px-4 py-1 rounded-full text-sm uppercase">
                    Top Position
                  </div>
                )}
                <div className={`w-20 h-20 ${isFirst ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'} rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold`}>
                  {student.name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${isFirst ? 'text-amber-600' : 'text-slate-400'}`}>
                  {student.position} Position
                </p>
                <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-blue-100 mb-10 text-lg">
            We are currently welcoming new students from Playgroup to Class 10. 
            Start your child's journey towards excellence today.
          </p>
          <Link 
            href="/register" 
            className="bg-white text-blue-900 font-bold py-4 px-10 rounded-full hover:bg-amber-400 transition-all inline-block"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
