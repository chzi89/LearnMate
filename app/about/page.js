"use client";

import React from "react";
import Link from "next/link";
import { schoolData } from "@/lib/school-data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-pphs-navy text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-sm text-blue-200 mb-8 font-medium">
            <Link href="/" className="hover:text-pphs-gold transition-colors">Home</Link>
            <span className="text-blue-400">/</span>
            <span className="text-white">About Us</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About Punjab Public <br />
            <span className="text-pphs-gold">High School</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Building Knowledge, Character, and Bright Futures — From Playgroup to Matric.
          </p>
        </div>
      </section>

      {/* School Introduction */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/api/placeholder/800/600" 
                alt="Illustrative placeholder image of the school campus" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-pphs-gold text-pphs-navy p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="font-bold text-xl">Playgroup to Matric</p>
              <p className="text-sm font-medium opacity-80">Quality Education</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-pphs-navy leading-tight">
              Dedicated to Academic <br />
              <span className="text-amber-600">Excellence & Discipline</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Punjab Public High School is committed to providing a high-quality educational 
              experience that empowers students to achieve their full potential. We believe 
              that education is not just about academic scores, but about building a strong 
              foundation of knowledge and character.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our approach integrates rigorous academic standards with a deep emphasis on 
              discipline and Islamic values, ensuring our students grow into responsible, 
              capable, and ethical members of society.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-pphs-navy mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To support students in developing knowledge, confidence, discipline, 
                and strong learning habits that serve as a springboard for their future success.
              </p>
            </div>
            <div className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                👁️
              </div>
              <h3 className="text-2xl font-bold text-pphs-navy mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To help students become responsible, capable, and well-rounded individuals 
                who contribute positively to their community and lead with integrity.
              </p>
            </div>
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
              <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold group-hover:bg-pphs-navy group-hover:text-white transition-colors duration-300">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet Our Dedicated Teachers</h2>
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
                    ? "bg-white border-2 border-amber-400 shadow-xl md:scale-110 z-10"
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

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-pphs-navy text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Give Your Child a Strong Start</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Explore educational opportunities from Playgroup to Class 10 at Punjab Public High School.
          </p>
          <Link
            href="/admissions"
            className="bg-pphs-gold text-pphs-navy font-bold py-4 px-10 rounded-full hover:bg-white transition-all inline-block shadow-lg"
          >
            Enquire About Admissions
          </Link>
        </div>
      </section>
    </main>
  );
}
