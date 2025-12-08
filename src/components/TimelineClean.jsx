import "../styles/timeclean.css"
export default function TimelineClean({ expenses }) {
  return (
    <div className="analytics-card timeline-card">
  <h3 className="analytics-card-title">Recent Expense Timeline</h3>

  <div className="timeline-list">
    {expenses.map((e) => (
      <div key={e.id} className="timeline-item">
        <div className="timeline-dot" />

        <div className="timeline-content">
          <p className="timeline-date">{e.date}</p>
          <strong className="timeline-title">{e.title}</strong>
          <p className="timeline-details">
            {e.category} • {e.type} • ₹{e.amount}
          </p>
          {e.description && (
            <p className="timeline-description">{e.description}</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
