// frontend/src/components/ExpenseForm.jsx
import React, { useState, useEffect } from "react";
import "../styles/expenseForm.css";


const initialState = {
  title: "",
  description: "",
  amount: "",
  category: "food",
  type: "expense",
  date: "",
};

function ExpenseForm({ onSubmit, editingExpense }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
        type: editingExpense.type,
        date: editingExpense.date,
      });
    } else {
      setForm(initialState);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;
    onSubmit({
      ...form,
      amount: parseFloat(form.amount),
    });
    if (!editingExpense) setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">

  {/* Row 1: Title + Amount */}
  <div className="expense-row">
    <div className="expense-field flex-1">
      <label className="expense-label">Title</label>
      <input
        className="expense-input"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
    </div>

    <div className="expense-field amount-field">
      <label className="expense-label">Amount</label>
      <input
        className="expense-input"
        name="amount"
        type="number"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Row 2: Category + Type + Date */}
  <div className="expense-row mt">
    <div className="expense-field flex-1">
      <label className="expense-label">Category</label>
      <select
        className="expense-input"
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="bills">Bills</option>
        <option value="shopping">Shopping</option>
        <option value="salary">Salary</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="expense-field select-small">
      <label className="expense-label">Type</label>
      <select
        className="expense-input"
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    </div>

    <div className="expense-field select-small">
      <label className="expense-label">Date</label>
      <input
        className="expense-input"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Description */}
  <div className="expense-field mt">
    <label className="expense-label">Description</label>
    <textarea
      className="expense-input textarea"
      name="description"
      rows={2}
      value={form.description}
      onChange={handleChange}
    />
  </div>

  <button className="expense-submit-btn mt">
    {editingExpense ? "Update Expense" : "Add Expense"}
  </button>
</form>

  );
}

export default ExpenseForm;
