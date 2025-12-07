// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.login(form);
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-card">
  <h2 className="login-title">Login</h2>

  <form onSubmit={handleSubmit} className="login-form">
    <div className="login-field">
      <label className="login-label">Email</label>
      <input
        className="login-input"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="login-field">
      <label className="login-label">Password</label>
      <input
        className="login-input"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
    </div>

    {error && <p className="login-error">{error}</p>}

    <button type="submit" className="login-btn">
      Login
    </button>
  </form>

  <p className="login-footer">
    Don't have an account? <Link to="/signup">Sign up</Link>
  </p>
</div>

  );
}

export default Login;
