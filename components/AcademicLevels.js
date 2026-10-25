"use client";

import Link from "next/link";

const levels = [
  {
    title: "Early Years",
    classes: "Playgroup, Nursery, and Kindergarten",
    description: "A nurturing environment where the youngest learners develop foundational social, emotional, and cognitive skills through play and discovery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    link: "/admissions",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Primary & Middle School",
    classes: "Classes 1 to 8",
    description: "Building strong academic foundations across core subjects, fostering critical thinking and a lifelong love for learning.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    link: "/admissions",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    title: "Secondary Education",
    classes: "Classes 9 and 10 (Matric)",
    description: "Intensive focus on subject mastery and rigorous examination preparation to ensure exceptional success in Matriculation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    link: "/admissions",
    color: "text-indigo-900",
    bgColor: "bg-indigo-50",
  },
];

export default function AcademicLevels() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-3">
            Academic Excellence
          </p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Learning Pathways from <span className="text-blue-900">Playgroup to Matric</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Punjab Public High School provides a structured educational journey, 
            tailored to every developmental stage of a student's growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level) => (
            <div 
              key={level.title} 
              className="group relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${level.bgColor} ${level.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                {level.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{level.title}</h3>
              <p className="text-amber-600 font-medium mb-4">{level.classes}</p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {level.description}
              </p>
              <Link 
                href={level.link} 
                className="inline-flex items-center font-semibold text-blue-900 hover:text-blue-700 transition-colors"
              >
                Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
