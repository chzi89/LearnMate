import Link from "next/link";

const activities = [
  {
    title: "Algebra practice",
    tag: "9 / 10",
    note: "Nice work spotting the key steps in the problems.",
    icon: "＋",
    result: "Strong result",
  },
  {
    title: "Plant biology check",
    tag: "8 / 10",
    note: "Review how plants capture and use light energy.",
    icon: "✿",
    result: "Keep practising",
  },
];

export default function QuizActivity() {
  return (
    <section className="dashboard-panel quiz-activity">
      <div className="panel-heading">
        <div>
          <p className="dashboard-kicker">PRACTICE</p>
          <h2>Recent quiz activity</h2>
        </div>
        <Link href="/quiz" className="text-link">All quizzes <span aria-hidden="true">→</span></Link>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <article className="activity-item" key={activity.title}>
            <span className="activity-icon" aria-hidden="true">{activity.icon}</span>
            <div className="activity-copy">
              <div className="activity-title-row">
                <h3>{activity.title}</h3>
                <span className="activity-score">{activity.tag}</span>
              </div>
              <p>{activity.note}</p>
            </div>
            <span className="activity-result">{activity.result}</span>
          </article>
        ))}
      </div>
      <p className="demo-caption">Example activity for preview only. Results are not saved.</p>
    </section>
  );
}
