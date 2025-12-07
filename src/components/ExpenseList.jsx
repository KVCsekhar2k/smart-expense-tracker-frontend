// frontend/src/components/ExpenseList.jsx
import React from "react";
import { FaPlane, FaShoppingBag } from "react-icons/fa";
import { MdFastfood, MdElectricBolt } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import "../styles/expenseList.css";


function getCategoryIcon(category) {
  switch (category) {
    case "food":
      return <MdFastfood />;
    case "travel":
      return <FaPlane />;
    case "bills":
      return <MdElectricBolt />;
    case "shopping":
      return <FaShoppingBag />;
    default:
      return <AiOutlineQuestionCircle />;
  }
}

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) return <p>No expenses yet.</p>;

  return (
   <div className="expense-list">
  {expenses.map((exp) => (
    <div key={exp.id} className="expense-item">

      <div className="expense-left">
        <div className="expense-title-row">
          <span className="expense-icon">{getCategoryIcon(exp.category)}</span>
          <strong className="expense-title">{exp.title}</strong>
        </div>

        <p className="expense-description">{exp.description}</p>

        <p className="expense-meta">
          {exp.date} • {exp.category} • {exp.type}
        </p>
      </div>

      <div className="expense-right">
        <div
          className={`expense-amount ${
            exp.type === "income" ? "income" : "expense"
          }`}
        >
          {exp.type === "income" ? "+" : "-"}₹{exp.amount}
        </div>

        <div className="expense-actions">
          <button className="expense-btn secondary" onClick={() => onEdit(exp)}>
            Edit
          </button>

          <button className="expense-btn danger" onClick={() => onDelete(exp)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default ExpenseList;
