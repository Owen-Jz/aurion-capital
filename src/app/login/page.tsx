"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle, ShieldCheck, Mail, Clock, ArrowLeft } from "lucide-react";

function AurionMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="256,74 70,446 118,446" fill="#0a0f1e" />
      <polygon points="256,74 442,446 394,446" fill="#0a0f1e" />
      <rect x="46" y="434" width="96" height="14" rx="5" fill="#0a0f1e" />
      <rect x="370" y="434" width="96" height="14" rx="5" fill="#0a0f1e" />
      <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c" />
    </svg>
  );
}

const inputClass =
  "w-full border border-border rounded-sm px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c]/40 transition-all bg-background text-foreground placeholder:text-muted/50";

const labelClass = "block text-xs font-medium text-foreground/70 mb-1.5 tracking-wide";

type Stage = "credentials" | "otp" | "pending" | "rejected";

export default function LoginPage() {
  const [stage, setStage] = useState<Stage>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (stage === "otp") otpRefs.current[0]?.focus();
  }, [stage]);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status === 403 && data.accountStatus === "pending_review") {
        setStage("pending");
        return;
      }
      if (res.status === 403 && data.accountStatus === "rejected") {
        setStage("rejected");
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      if (data.requiresOtp) {
        setStage("otp");
        return;
      }
      window.location.href = data.user.isAdmin ? "/admin" : "/portal";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(i: number, val: string) {
    const digits = val.replace(/[^0-9]/g, "");
    if (digits.length > 1) {
      // Paste
      const arr = digits.slice(0, 6).split("");
      const next = [...otpCode];
      for (let k = 0; k < arr.length; k++) next[k] = arr[k];
      setOtpCode(next);
      const lastIndex = Math.min(arr.length, 5);
      otpRefs.current[lastIndex]?.focus();
      return;
    }
    const next = [...otpCode];
    next[i] = digits;
    setOtpCode(next);
    if (digits && i < 5) otpRefs.current[i + 1]?.focus();
  }

  function handleOtpKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otpCode[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  }

  async function handleOtpSubmit() {
    const code = otpCode.join("");
    if (code.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Verification failed.");
        return;
      }
      window.location.href = data.user.isAdmin ? "/admin" : "/portal";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    setOtpCode(["", "", "", "", "", ""]);
    setError("");
    setLoading(true);
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          className="max-w-sm mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2.5">
            <AurionMark />
            <span className="font-serif text-lg font-bold tracking-[0.12em]" style={{ color: "var(--foreground)" }}>
              AURION
            </span>
          </div>

          <AnimatePresence mode="wait">
            {stage === "credentials" && (
              <motion.div key="creds" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <h1 className="font-serif text-3xl font-bold mt-10" style={{ color: "var(--foreground)" }}>
                  Welcome back.
                </h1>
                <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
                  Sign in to your investor portal.
                </p>

                <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-5" noValidate>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email address</label>
                    <input id="email" type="email" autoComplete="email" value={email}
                      onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
                  </div>

                  <div>
                    <label htmlFor="password" className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputClass} pr-11`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 accent-[#c9a84c]" />
                      <span className="text-xs" style={{ color: "var(--muted)" }}>Remember me</span>
                    </label>
                    <button type="button" className="text-xs transition-colors hover:text-[#c9a84c]" style={{ color: "var(--accent)" }}>
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    style={{ background: "var(--gold)", color: "var(--foreground)" }}
                  >
                    {loading ? (
                      <><span className="w-4 h-4 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" /> Signing in…</>
                    ) : "Sign In"}
                  </button>

                  {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </form>

                <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-medium" style={{ color: "var(--accent)" }}>Create account</Link>
                </p>

                <div className="mt-6 rounded-sm border p-4" style={{ borderColor: "rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.03)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(201,168,76,0.7)" }}>
                    Demo Accounts — Testing Only
                  </p>
                  <div className="space-y-2">
                    {[
                      { role: "Investor", email: "demo@investor.com", password: "Demo@2026!" },
                      { role: "Admin", email: "admin@aurioncapital.com", password: "Admin@2026!" },
                    ].map((account) => (
                      <button key={account.role} type="button"
                        onClick={() => { setEmail(account.email); setPassword(account.password); }}
                        className="w-full text-left rounded-sm px-3 py-2 transition-colors hover:bg-white/5 group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(201,168,76,0.6)" }}>{account.role}</span>
                          <span className="text-[10px] opacity-0 group-hover:opacity-100" style={{ color: "var(--muted)" }}>click to fill</span>
                        </div>
                        <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--foreground)", opacity: 0.7 }}>{account.email}</p>
                        <p className="text-xs font-mono" style={{ color: "var(--muted)", opacity: 0.6 }}>{account.password}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {stage === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <div className="mt-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.12)" }}>
                    <ShieldCheck size={18} style={{ color: "#c9a84c" }} />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                      Verify it&apos;s you.
                    </h1>
                  </div>
                </div>
                <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>
                  We sent a six-digit code to <strong>{email}</strong>. Enter it below to complete sign-in.
                </p>

                <div className="mt-8 flex gap-2 justify-center">
                  {otpCode.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-mono font-bold border rounded-sm outline-none focus:ring-2 focus:ring-[#c9a84c]/30 focus:border-[#c9a84c]/40"
                      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
                    />
                  ))}
                </div>

                {error && <p className="mt-4 text-xs text-red-500 text-center">{error}</p>}

                <button
                  onClick={handleOtpSubmit}
                  disabled={loading || otpCode.join("").length !== 6}
                  className="mt-6 w-full py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "#c9a84c", color: "#0a0f1e" }}
                >
                  {loading ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-[#0a0f1e]/20 border-t-[#0a0f1e] animate-spin" /> Verifying…</>
                  ) : "Verify & Sign In"}
                </button>

                <div className="mt-4 flex items-center justify-between">
                  <button onClick={() => setStage("credentials")} className="text-xs flex items-center gap-1" style={{ color: "var(--muted)" }}>
                    <ArrowLeft size={12} /> Back
                  </button>
                  <button onClick={resendOtp} disabled={loading} className="text-xs transition-colors hover:text-[#c9a84c]" style={{ color: "var(--accent)" }}>
                    Resend code
                  </button>
                </div>

                <p className="mt-8 text-xs leading-relaxed text-center" style={{ color: "var(--muted)", opacity: 0.7 }}>
                  Codes are valid for 10 minutes. Check your spam folder if you don&apos;t see it.
                </p>
              </motion.div>
            )}

            {stage === "pending" && (
              <motion.div key="pending" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mt-10 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: "rgba(201,168,76,0.12)" }}>
                    <Clock size={28} style={{ color: "#c9a84c" }} />
                  </div>
                  <h1 className="font-serif text-2xl font-bold mt-5" style={{ color: "var(--foreground)" }}>
                    Account under review.
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    Your application is currently being reviewed by the Aurion Compliance Committee. We will email you the moment your portfolio is activated — typically within <strong>1–3 business days</strong>.
                  </p>
                  <div className="mt-6 rounded-sm border p-4 flex items-start gap-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    <Mail size={16} style={{ color: "#c9a84c" }} />
                    <p className="text-xs text-left" style={{ color: "var(--muted)" }}>
                      A confirmation email was sent to <strong>{email}</strong>. Watch for our welcome email — once received, you can sign in immediately.
                    </p>
                  </div>
                  <button onClick={() => setStage("credentials")} className="mt-6 text-xs flex items-center gap-1 mx-auto" style={{ color: "var(--muted)" }}>
                    <ArrowLeft size={12} /> Back to sign in
                  </button>
                </div>
              </motion.div>
            )}

            {stage === "rejected" && (
              <motion.div key="rejected" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mt-10 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: "rgba(239,68,68,0.12)" }}>
                    <ShieldCheck size={28} style={{ color: "#ef4444" }} />
                  </div>
                  <h1 className="font-serif text-2xl font-bold mt-5" style={{ color: "var(--foreground)" }}>
                    Application not approved.
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    The Aurion Compliance Committee was unable to approve your application at this time. For further information or to appeal the decision, please contact our Investor Relations team.
                  </p>
                  <a href="mailto:investorrelations@aurioncapital.com" className="inline-block mt-6 py-2.5 px-6 text-sm font-semibold rounded-sm" style={{ background: "#c9a84c", color: "#0a0f1e" }}>
                    Contact Investor Relations
                  </a>
                  <button onClick={() => setStage("credentials")} className="mt-6 text-xs flex items-center gap-1 mx-auto" style={{ color: "var(--muted)" }}>
                    <ArrowLeft size={12} /> Back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-xs leading-relaxed text-center" style={{ color: "var(--muted)", opacity: 0.6 }}>
            This portal is for accredited investors and institutional clients only.
          </p>
        </motion.div>
      </div>

      {/* Right pane */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden flex-col"
        style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #1a2a4a 50%, #0d1117 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,58,92,0.5) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(201,168,76,0.7)" }}>Secure Investor Access</p>
            <blockquote className="font-serif text-2xl font-medium italic leading-relaxed mt-6" style={{ color: "rgba(255,255,255,0.9)" }}>
              &ldquo;The most important quality for an investor is temperament, not intellect.&rdquo;
            </blockquote>
            <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>— Warren Buffett</p>
          </div>

          <div className="flex flex-col gap-3">
            {["256-bit SSL encryption", "SOC 2 Type II certified", "FINRA member firm", "Two-factor authentication"].map((badge) => (
              <div key={badge} className="flex items-center gap-2.5">
                <CheckCircle size={14} style={{ color: "rgba(201,168,76,0.6)", flexShrink: 0 }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
