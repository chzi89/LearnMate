import Link from "next/link";
import StudentSidebar from "../../components/StudentSidebar";
import OverviewStat from "../../components/OverviewStat";
import LearningModuleCard from "../../components/LearningModuleCard";
import QuizActivity from "../../components/QuizActivity";
import NextStepsPanel from "../../components/NextStepsPanel";
import "./dashboard.css";

export const metadata = {
  title: "Dashboard | LearnMate AI",
  description: "A learning overview with lessons, practice, and suggested next steps.",
};

const modules = [
  {
    subject: "Mathematics",
    title: "Quadratic equations",
    description: "Explore roots, factoring, and the quadratic formula.",
    progress: 65,
    action: "Continue with tutor",
    href: "/learn",
    icon: "∑",
  },
  {
    subject: "Biology",
    title: "Cells & energy",
    description: "Discover how cells store and use energy.",
    progress: 85,
    action: "Continue with tutor",
    href: "/learn",
    icon: "✿",
  },
  {
    subject: "Physics",
    title: "Forces & motion",
    description: "Build intuition for motion, force, and momentum.",
    progress: 40,
    action: "Review with tutor",
    href: "/learn",
    icon: "↗",
  },
  {
    subject: "English",
    title: "Figurative language",
    description: "Recognize imagery, metaphor, and poetic devices.",
    progress: 90,
    action: "Review progress",
    href: "/progress",
    icon: "Aa",
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-shell">
      <StudentSidebar />
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb">
            <span>My learning</span>
            <span aria-hidden="true">/</span>
            <strong>Dashboard</strong>
          </div>
          <div className="dashboard-topbar-actions">
            <span className="preview-indicator"><i />Preview data</span>
            <Link className="dashboard-primary-link" href="/learn">
              <span aria-hidden="true">✦</span> Ask your tutor
            </Link>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-kicker">YOUR LEARNING OVERVIEW</p>
              <h1>Welcome back, <span>learner.</span></h1>
              <p>Here’s a little inspiration for what to explore next.</p>
            </div>
            <div className="welcome-streak">
              <span aria-hidden="true">✧</span>
              <div><strong>Keep showing up</strong><small>Every question is progress.</small></div>
            </div>
          </section>

          <section className="overview-grid" aria-label="Learning overview example statistics">
            <OverviewStat
              label="Study goal"
              value="45 min"
              detail="A little more time to explore today"
              icon="◷"
              progress="75%"
            />
            <OverviewStat
              label="Practice sessions"
              value="18"
              detail="Sample sessions in this preview"
              icon="✓"
            />
            <OverviewStat
              label="Concepts explored"
              value="34"
              detail="Explore at your own pace"
              icon="✧"
              progress="81%"
            />
            <OverviewStat
              label="Tutor conversations"
              value="12"
              detail="Ask a question whenever you need"
              icon="☏"
            />
          </section>

          <section className="module-section">
            <div className="section-heading">
              <div>
                <p className="dashboard-kicker">PICK UP WHERE YOU LEFT OFF</p>
                <h2>Continue learning</h2>
              </div>
              <span className="section-count">4 sample topics</span>
            </div>
            <div className="module-grid">
              {modules.map((module) => (
                <LearningModuleCard key={module.title} {...module} />
              ))}
            </div>
          </section>

          <div className="dashboard-lower-grid">
            <QuizActivity />
            <NextStepsPanel />
          </div>

          <footer className="dashboard-disclaimer">
            <span aria-hidden="true">ⓘ</span>
            <p>
              This dashboard uses example learning data for demonstration.
              LearnMate does not save your progress in this preview.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
