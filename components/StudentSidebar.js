"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: "▦" },
  { label: "AI tutor", href: "/learn", icon: "✧" },
  { label: "Practice quizzes", href: "/quiz", icon: "✓" },
  { label: "Learning progress", href: "/progress", icon: "↗" },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <Link className="dashboard-brand" href="/dashboard">
        <span className="dashboard-brand-mark" aria-hidden="true">✦</span>
        <span>LearnMate <span className="dashboard-brand-ai">AI</span></span>
      </Link>

      <div className="dashboard-student">
        <span className="dashboard-student-avatar" aria-hidden="true">S</span>
        <span className="dashboard-student-copy">
          <strong>Demo learner</strong>
          <span>Grade 9 · Learning space</span>
        </span>
        <span className="dashboard-chevron" aria-hidden="true">⌄</span>
      </div>

      <p className="dashboard-nav-label">LEARNING SPACE</p>
      <nav className="dashboard-nav" aria-label="Learning navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-nav-link${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="dashboard-nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.label === "AI tutor" && (
                <span className="dashboard-nav-dot" aria-label="Tutor available" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="dashboard-sidebar-footer">
        <div className="dashboard-streak">
          <span className="dashboard-streak-icon" aria-hidden="true">✧</span>
          <span><strong>Daily learning</strong><small>One step at a time</small></span>
        </div>
        <p><span aria-hidden="true">◇</span> Your learning stays yours.</p>
      </div>
    </aside>
  );
}
