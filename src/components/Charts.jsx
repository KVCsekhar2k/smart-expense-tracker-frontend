// frontend/src/components/Charts.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import "../styles/charts.css";


const COLORS = ["#2563eb", "#10b981", "#f97316", "#ec4899", "#facc15", "#14b8a6"];

function Charts({ byCategory, byMonth }) {
  return (
    <div className="charts-section">
  {/* Category Pie Chart */}
  <div className="chart-card">
    <h3 className="chart-title">Spending by Category</h3>

    {byCategory && byCategory.length ? (
      <div className="chart-wrapper">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="total"
              nameKey="category"
              outerRadius={80}
              label
            >
              {byCategory.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <p className="chart-empty">No data yet.</p>
    )}
  </div>

  {/* Monthly Bar Chart */}
  <div className="chart-card">
    <h3 className="chart-title">Monthly Spending</h3>

    {byMonth && byMonth.length ? (
      <div className="chart-wrapper">
        <ResponsiveContainer>
          <BarChart data={byMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <p className="chart-empty">No data yet.</p>
    )}
  </div>
</div>

  );
}

export default Charts;
