// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

import "../styles/dashboard.css";


function Dashboard() {
  const { token, user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const s = await api.getSummary(token);
        setSummary(s);
        const all = await api.getExpenses(token);
        setRecent(all.slice(0, 5));
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [token]);
  
  
  const getCategoryIcon = (category) => {
  switch (category) {
    case "food":
      return "🍽️";
    case "travel":
      return "✈️";
    case "shopping":
      return "🛒";
    case "bills":
      return "💡";
    case "salary":
      return "💰";
    case "other":
      return "📦";
    default:
      return "📄";
  }
};


  return (
    <div className="dashboard-container">
  <h2 className="dashboard-welcome">Welcome, {user?.name}</h2>

  <div className="dashboard-grid">
  {/* Summary Card */}
  <div className="summary-card neo-summary-card">

  <h3 className="neo-title">Summary</h3>

  {summary ? (
    <div className="summary-grid">

  {/* Total Balance */}
  <div className="summary-card neo-card red-glow">
    <p className="summary-title">Total Balance</p>
    <p className="summary-amount red-text">₹{summary.balance}</p>

    <div className="icon-circle red-icon">
      <span>↓</span>
    </div>
  </div>

  {/* Total Income */}
  <div className="summary-card neo-card green-glow">
    <p className="summary-title">Total Income</p>
    <p className="summary-amount green-text">₹{summary.totalIncome}</p>

    <div className="icon-circle green-icon">
      <span>↑</span>
    </div>
  </div>

  {/* Total Expense */}
  <div className="summary-card neo-card red-glow">
    <p className="summary-title">Total Expense</p>
    <p className="summary-amount red-text">₹{summary.totalExpense}</p>

    <div className="icon-circle red-icon">
      <span>↓</span>
    </div>
  </div>

  {/* Transactions */}
  <div className="summary-card neo-card purple-glow">
    <p className="summary-title">Transactions</p>
    <p className="summary-amount grey-text">{summary.totalTransactions}</p>

    <div className="icon-circle purple-icon">
      <span>📄</span>
    </div>
  </div>

</div>

  ) : (
    <p>Loading...</p>
  )}

  <div className="summary-accent-bar neo-accent"></div>
</div>



  {/* Recent Expenses Card */}
  <div className="recent-card neo-recent-card">

  <h3 className="recent-title">Recent Expenses</h3>

  {!recent.length && <p className="no-exp">No recent expenses.</p>}

  {recent.map((exp) => (
    <div key={exp.id} className="recent-item frosted-item">

      {/* ICON */}
      <div className="recent-icon">
        {getCategoryIcon(exp.category)}
      </div>

      {/* TEXT SECTION */}
      <div className="recent-details">
        <p className="recent-name">{exp.title}</p>

        <p className="recent-amount">
          — ₹{exp.amount} ({exp.type})
        </p>

        <p className="recent-date">on {exp.date}</p>
      </div>

    </div>
  ))}
</div>



</div>

</div>

  );
}

export default Dashboard;
