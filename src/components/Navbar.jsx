import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";


export default function Navbar({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <strong className="navbar-logo">Smart Expense Tracker</strong>
      </div>

      {/* Mobile Toggle Button */}
      {user && (
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {user ? (
          <>
            <NavLink className="nav-item" to="/dashboard">Dashboard</NavLink>
            <NavLink className="nav-item" to="/expenses">Expenses</NavLink>
            <NavLink className="nav-item" to="/analytics">Analytics</NavLink>

            <button className="nav-btn logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="nav-item" to="/onboarding">Onboarding</NavLink>
            <NavLink className="nav-item" to="/login">Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
