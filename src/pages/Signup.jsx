// frontend/src/pages/Signup.jsx
import React, { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.signup(form);
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-card">
  <h2 className="signup-title">Sign Up</h2>

  <form onSubmit={handleSubmit} className="signup-form">
    <div className="signup-field">
      <label className="signup-label">Name</label>
      <input
        className="signup-input"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="signup-field">
      <label className="signup-label">Email</label>
      <input
        className="signup-input"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="signup-field">
      <label className="signup-label">Password</label>
      <input
        className="signup-input"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
    </div>

    {error && <p className="signup-error">{error}</p>}

    <button type="submit" className="signup-btn">
      Create Account
    </button>
  </form>

  <p className="signup-footer">
    Already have an account? <Link to="/login">Login</Link>
  </p>
</div>

  );
}

export default Signup;
