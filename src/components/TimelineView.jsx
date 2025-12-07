// frontend/src/components/TimelineView.jsx
import React from "react";
import { Chrono } from "react-chrono";
import "../styles/timeline.css";


function TimelineView({ expenses }) {
  if (!expenses.length) return <p>No expenses for timeline.</p>;

  const items = expenses.slice(0, 10).map((exp) => ({
    title: exp.date,
    cardTitle: exp.title,
    cardSubtitle: `${exp.category} • ${exp.type} • ₹${exp.amount}`,
    cardDetailedText: exp.description || "",
  }));

  return (
    <div className="timeline-card">
  <h3 className="timeline-title">Recent Expense Timeline</h3>

  <div className="timeline-container">
    <Chrono items={items} mode="VERTICAL" />
  </div>
</div>

  );
}

export default TimelineView;
