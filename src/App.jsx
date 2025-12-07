// frontend/src/App.jsx
import React from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import Onboarding from "./pages/Onboarding";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <div>
          <strong>Smart Expense Tracker</strong>
        </div>
        <div>
          {user && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/expenses">Expenses</NavLink>
              <NavLink to="/analytics">Analytics</NavLink>
              <button
                style={{ marginLeft: "12px" }}
                className="secondary"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/onboarding">Onboarding</NavLink>
              <NavLink to="/login" style={{ marginLeft: "12px" }}>
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
