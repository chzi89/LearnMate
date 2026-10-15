export default function OverviewStat({ label, value, detail, icon, progress }) {
  return (
    <article className="overview-stat">
      <div className="overview-stat-top">
        <span className="overview-stat-label">{label}</span>
        <span className="overview-stat-icon" aria-hidden="true">{icon}</span>
      </div>
      <div className="overview-stat-value">
        <strong>{value}</strong>
        {progress && <span>{progress}</span>}
      </div>
      {progress && (
        <div className="overview-progress" aria-label={`${progress} progress`}>
          <span style={{ width: progress }} />
        </div>
      )}
      <p>{detail}</p>
    </article>
  );
}
