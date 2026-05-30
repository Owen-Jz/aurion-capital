"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

function AurionMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="256,74 70,446 118,446" fill="white" />
      <polygon points="256,74 442,446 394,446" fill="white" />
      <rect x="46" y="434" width="96" height="14" rx="5" fill="white" />
      <rect x="370" y="434" width="96" height="14" rx="5" fill="white" />
      <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Authentication failed.");
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#060a14" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <AurionMark />
          <div>
            <div
              className="font-serif text-base font-bold tracking-[0.12em]"
              style={{ color: "white" }}
            >
              AURION
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
              Administration
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-sm border p-8"
          style={{ background: "#0a0f1e", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={14} style={{ color: "#c9a84c" }} />
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#c9a84c" }}>
                Restricted access
              </span>
            </div>
            <h1 className="font-serif text-xl font-bold" style={{ color: "white" }}>
              Admin sign in
            </h1>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Authorised personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium mb-1.5 tracking-wide"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                placeholder="admin@aurioncapital.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium mb-1.5 tracking-wide"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm px-4 py-3 pr-10 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="rounded-sm px-4 py-3 text-xs"
                style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold rounded-sm transition-opacity disabled:opacity-60"
              style={{ background: "#c9a84c", color: "#0a0f1e" }}
            >
              {loading ? "Authenticating…" : "Sign in to Admin Panel"}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
          Investor portal:{" "}
          <a href="/login" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>
            aurioncapital.com/login
          </a>
        </p>
      </div>
    </div>
  );
}
