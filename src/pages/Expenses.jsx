// frontend/src/pages/Expenses.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/expenses.css";


function Expenses() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadAll = async () => {
    const res = await api.getExpenses(token);
    setExpenses(res);
  };

  useEffect(() => {
    loadAll();
  }, [token]);

  const handleCreateOrUpdate = async (formData) => {
    if (editing) {
      const updated = await api.updateExpense(editing.id, formData, token);
      setExpenses((prev) =>
        prev.map((e) => (e.id === editing.id ? updated : e))
      );
      setEditing(null);
    } else {
      const created = await api.createExpense(formData, token);
      setExpenses((prev) => [created, ...prev]);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      loadAll();
      return;
    }
    const res = await api.searchExpenses(search, token);
    setExpenses(res);
  };

  const handleFilter = async () => {
    const res = await api.filterExpenses(category, month, token);
    setExpenses(res);
  };

  const handleSortAmount = async () => {
    const res = await api.sortExpenses("amount", "asc", token);
    setExpenses(res);
  };

  const handleDeleteExpense = async () => {
    if (!confirmDelete) return;
    await api.deleteExpense(confirmDelete.id, token);
    setExpenses((prev) => prev.filter((e) => e.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const handleDeleteAll = async () => {
    await api.deleteAllExpenses(token);
    setExpenses([]);
    setDeleteAllOpen(false);
  };

  return (
    <div className="expenses-page">
  <h2 className="expenses-title">Expenses</h2>

  <Filters
    search={search}
    setSearch={setSearch}
    category={category}
    setCategory={setCategory}
    month={month}
    setMonth={setMonth}
    onSearch={handleSearch}
    onFilter={handleFilter}
    onSortAmount={handleSortAmount}
  />

  <div className="expense-card">
    <div className="expense-card-header">
      <h3 className="expense-card-title">
        {editing ? "Edit Expense" : "Add Expense"}
      </h3>

      {expenses.length > 0 && (
        <button
          className="expense-reset-btn"
          onClick={() => setDeleteAllOpen(true)}
        >
          Reset (Delete All)
        </button>
      )}
    </div>

    <ExpenseForm
      onSubmit={handleCreateOrUpdate}
      editingExpense={editing}
    />
  </div>

  <ExpenseList
    expenses={expenses}
    onEdit={setEditing}
    onDelete={(exp) => setConfirmDelete(exp)}
  />

  <ConfirmModal
    open={!!confirmDelete}
    title="Delete Expense"
    message={`Are you sure you want to delete "${confirmDelete?.title}"?`}
    onConfirm={handleDeleteExpense}
    onCancel={() => setConfirmDelete(null)}
  />

  <ConfirmModal
    open={deleteAllOpen}
    title="Delete All Expenses"
    message="This will delete all your expenses. Are you sure?"
    onConfirm={handleDeleteAll}
    onCancel={() => setDeleteAllOpen(false)}
  />
</div>

  );
}

export default Expenses;
