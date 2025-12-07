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

  return (
    <div className="dashboard-container">
  <h2 className="dashboard-welcome">Welcome, {user?.name}</h2>

  <div className="dashboard-grid">
    
    {/* Summary Card */}
    <div className="dashboard-card summary-card">
      <h3 className="dashboard-card-title">Summary</h3>

      {summary ? (
        <div className="summary-content">
          <p>Total Income: ₹{summary.totalIncome}</p>
          <p>Total Expense: ₹{summary.totalExpense}</p>
          <p>Balance: ₹{summary.balance}</p>
          <p>Transactions: {summary.totalTransactions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

    {/* Recent Expenses Card */}
    <div className="dashboard-card recent-card">
      <h3 className="dashboard-card-title">Recent Expenses</h3>

      {!recent.length && <p>No recent expenses.</p>}

      {recent.map((exp) => (
        <div key={exp.id} className="recent-item">
          <strong>{exp.title}</strong> – ₹{exp.amount} ({exp.type}) on {exp.date}
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Dashboard;
