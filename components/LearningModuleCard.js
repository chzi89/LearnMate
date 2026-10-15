import Link from "next/link";

export default function LearningModuleCard({
  subject,
  title,
  description,
  progress,
  action,
  href,
  icon,
}) {
  const mastered = progress >= 90;

  return (
    <article className="module-card">
      <div className="module-card-content">
        <div className="module-card-meta">
          <span className="module-subject">{subject}</span>
          <strong>{progress}%</strong>
        </div>
        <div className="module-card-title">
          <span className="module-icon" aria-hidden="true">{icon}</span>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
      <div className="module-card-action">
        <div className="module-progress" aria-label={`${progress}% complete`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        {mastered ? (
          <span className="module-mastered">✓ Concept mastered</span>
        ) : (
          <Link className="module-link" href={href}>
            {action}<span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
