import Link from "next/link";

const recommendations = [
  {
    number: "01",
    title: "Review one tricky idea",
    detail: "Ask your tutor to explain it with a fresh example.",
    href: "/learn",
    action: "Open tutor",
  },
  {
    number: "02",
    title: "Try a short practice quiz",
    detail: "Use a quick question to check what you remember.",
    href: "/quiz",
    action: "Start practice",
  },
  {
    number: "03",
    title: "Reflect on your learning",
    detail: "See a sample view of your learning progress.",
    href: "/progress",
    action: "View progress",
  },
];

export default function NextStepsPanel() {
  return (
    <section className="dashboard-panel next-steps">
      <div className="panel-heading">
        <div>
          <p className="dashboard-kicker">A GOOD NEXT STEP</p>
          <h2>Keep your momentum</h2>
        </div>
        <span className="next-steps-spark" aria-hidden="true">✦</span>
      </div>
      <div className="recommendations">
        {recommendations.map((item) => (
          <Link className="recommendation" href={item.href} key={item.number}>
            <span className="recommendation-number">{item.number}</span>
            <span className="recommendation-copy">
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
            <span className="recommendation-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <div className="next-steps-note">
        <span aria-hidden="true">✧</span>
        <p>Pick one small action. You don’t have to do it all at once.</p>
      </div>
    </section>
  );
}
