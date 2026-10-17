import Link from "next/link";

export default function TutorSidebar({ grade }) {
  const navItems = [
    { label: "Tutor", icon: "✧", href: "/learn", active: true },
    { label: "My learning", icon: "▤", href: "/dashboard" },
    { label: "Practice", icon: "◉", href: "/quiz", badge: "1" },
    { label: "Progress", icon: "↗", href: "/progress" },
  ];

  return (
    <aside className="tutor-sidebar">
      <Link className="brand" href="/dashboard" aria-label="LearnMate home">
        <span className="brand-mark">✦</span>
        <span>learnmate<span className="brand-ai">.ai</span></span>
      </Link>

      <div className="student-card">
        <div className="student-avatar">D</div>
        <div className="student-info">
          <strong>Demo learner</strong>
          <span>{grade} learner</span>
        </div>
        <button className="icon-button student-menu" type="button" aria-label="Student profile">⌄</button>
      </div>

      <p className="sidebar-label">YOUR WORKSPACE</p>
      <nav className="side-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={`nav-item ${item.active ? "nav-item-active" : ""}`}
          >
            <span className="tutor-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="streak-card">
          <span className="streak-icon">✦</span>
          <div>
            <strong>Keep learning</strong>
            <span>One step at a time</span>
          </div>
          <span className="streak-spark">✦</span>
        </div>
        <div className="privacy-note">
          <span className="tutor-icon">◈</span>
          <span>Your learning stays yours.</span>
        </div>
      </div>
    </aside>
  );
}
