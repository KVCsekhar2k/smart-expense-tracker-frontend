// frontend/src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import Charts from "../components/Charts";
import TimelineView from "../components/TimelineView";
import TimelineClean from "../components/TimelineClean";
import "../styles/analytics.css";


function Analytics() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ byCategory: [], byMonth: [] });
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const s = await api.getStatistics(token);
        setStats(s);
        const all = await api.getExpenses(token);
        setExpenses(all);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [token]);

  return (
    <div className="analytics-page">
  <h2 className="analytics-title">Analytics</h2>

  <div className="analytics-grid">
    <Charts byCategory={stats.byCategory} byMonth={stats.byMonth} />
  </div>

  <TimelineClean expenses={expenses} />
</div>


  );
}

export default Analytics;
