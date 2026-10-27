import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    setServerError("");
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.post(`${API_URL}/api/login`, {
        email: form.email.trim(),
        password: form.password,
      });
      localStorage.setItem("lenus_token", data.token);
      localStorage.setItem("lenus_user", JSON.stringify(data.user));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.response) {
        setServerError(err.response.data?.message || "Login failed. Please try again.");
      } else {
        setServerError("Cannot reach the server. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <section className="auth__brand" aria-hidden="true">
        <div className="logo">
          <span className="logo__mark">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <circle cx="16" cy="16" r="6" fill="#fff" />
              <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6.1 6.1l2.8 2.8M23.1 23.1l2.8 2.8M6.1 25.9l2.8-2.8M23.1 8.9l2.8-2.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="logo__name">LENUS</span>
        </div>
        <h2>Light up your workday.</h2>
        <p>Plan, track and share progress with your team — all in one calm, focused space.</p>
        <div className="orb orb--1" />
        <div className="orb orb--2" />
      </section>

      <section className="auth__panel">
        <form className="card" onSubmit={handleSubmit} noValidate>
          <h1>Welcome back</h1>
          <p className="card__sub">Sign in to continue to Lenus.</p>
          {serverError && <div className="alert" role="alert">{serverError}</div>}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={errors.email ? "invalid" : ""} />
            {errors.email && <span className="field__error">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="field__password">
              <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" value={form.password} onChange={handleChange} className={errors.password ? "invalid" : ""} />
              <button type="button" className="toggle" onClick={() => setShowPassword((s) => !s)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
            {errors.password && <span className="field__error">{errors.password}</span>}
          </div>
          <button className="btn" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          <p className="hint">Demo account: <code>demo@lenus.dev</code> / <code>Lenus@123</code></p>
        </form>
      </section>
    </main>
  );
}