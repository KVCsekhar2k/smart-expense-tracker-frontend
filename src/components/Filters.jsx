// frontend/src/components/Filters.jsx
import React from "react";
import "../styles/filters.css";


function Filters({
  search,
  setSearch,
  category,
  setCategory,
  month,
  setMonth,
  onSearch,
  onFilter,
  onSortAmount,
}) {
  return (
    <div className="filters-card">

  {/* Inputs Row */}
  <div className="filters-row">
    {/* Search */}
    <div className="filter-field flex-1">
      <label className="filter-label">Search</label>
      <input
        className="filter-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search title/description"
      />
    </div>

    {/* Category */}
    <div className="filter-field filter-small">
      <label className="filter-label">Category</label>
      <select
        className="filter-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="bills">Bills</option>
        <option value="shopping">Shopping</option>
        <option value="salary">Salary</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Month */}
    <div className="filter-field filter-small">
      <label className="filter-label">Month</label>
      <input
        className="filter-input"
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
    </div>
  </div>

  {/* Buttons Row */}
  <div className="filters-actions">
    <button className="filter-btn" onClick={onSearch}>
      Search
    </button>

    <button className="filter-btn secondary" onClick={onFilter}>
      Apply Filter
    </button>

    <button className="filter-btn secondary" onClick={onSortAmount}>
      Sort by Amount
    </button>
  </div>
</div>

  );
}

export default Filters;
