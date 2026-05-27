"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle, ChevronDown } from "lucide-react";

function AurionMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
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

const labelClass =
  "block text-xs font-medium text-foreground/70 mb-1.5 tracking-wide";

const INVESTOR_TYPES = [
  "Institutional Investor",
  "Family Office",
  "High Net Worth Individual",
  "Endowment / Foundation",
  "Sovereign Wealth Fund",
] as const;

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [investorType, setInvestorType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Inline errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim()) e.email = "Email address is required.";
    if (!password) e.password = "Password is required.";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password.";
    if (password && confirmPassword && password !== confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    if (!termsAccepted) e.terms = "You must accept the terms to continue.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          firm: company || undefined,
          investorType: investorType || "individual",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ submit: data.error ?? "Registration failed." });
        return;
      }
      router.push("/portal/onboarding");
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* ── Left panel ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          className="max-w-sm mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <AurionMark />
            <span
              className="font-serif text-lg font-bold tracking-[0.12em]"
              style={{ color: "var(--foreground)" }}
            >
              AURION
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-serif text-3xl font-bold mt-10"
            style={{ color: "var(--foreground)" }}
          >
            Create your account.
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
            Access Aurion&apos;s investor portal.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  placeholder="Alexandra"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  placeholder="Pemberton"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className={labelClass}>
                Company / Institution{" "}
                <span className="font-normal text-muted/60">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
                placeholder="Pemberton Family Office"
              />
            </div>

            {/* Investor type */}
            <div>
              <label htmlFor="investorType" className={labelClass}>
                Investor type
              </label>
              <div className="relative">
                <select
                  id="investorType"
                  value={investorType}
                  onChange={(e) => setInvestorType(e.target.value)}
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  style={{
                    color:
                      investorType === ""
                        ? "rgba(100,116,139,0.5)"
                        : "var(--foreground)",
                  }}
                >
                  <option value="" disabled>
                    Select investor type
                  </option>
                  {INVESTOR_TYPES.map((type) => (
                    <option key={type} value={type} style={{ color: "var(--foreground)" }}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-11`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClass} pr-11 ${
                    passwordMismatch
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                      : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {(passwordMismatch || errors.confirmPassword) && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.confirmPassword ?? "Passwords do not match."}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 mt-2">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 rounded-sm border-border accent-[#c9a84c] cursor-pointer shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-xs leading-relaxed cursor-pointer select-none"
                style={{ color: "var(--muted)" }}
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="underline underline-offset-2 hover:text-[#c9a84c] transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  Terms of Use
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="underline underline-offset-2 hover:text-[#c9a84c] transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  Privacy Policy
                </button>{" "}
                and confirm that I am an accredited investor or institutional
                client.
              </label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-500 -mt-2" role="alert">
                {errors.terms}
              </p>
            )}

            {errors.submit && (
              <p className="text-xs text-red-500" role="alert">{errors.submit}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              style={{
                background: "var(--gold)",
                color: "var(--foreground)",
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--gold)";
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium transition-colors hover:text-[#c9a84c]"
              style={{ color: "var(--accent)" }}
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── Right panel ── */}
      <div
        className="hidden lg:flex w-[45%] relative overflow-hidden flex-col"
        style={{
          background:
            "linear-gradient(160deg, #0a0f1e 0%, #1a2a4a 50%, #0d1117 100%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* Radial glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(26,58,92,0.5) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          {/* Quote section */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "rgba(201,168,76,0.7)" }}
            >
              Secure Investor Access
            </p>
            <blockquote
              className="font-serif text-2xl font-medium italic leading-relaxed mt-6"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              &ldquo;We don&apos;t have to be smarter than the rest. We have to be
              more disciplined than the rest.&rdquo;
            </blockquote>
            <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              — Warren Buffett
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-3">
            {[
              "256-bit SSL encryption",
              "SOC 2 Type II certified",
              "FINRA member firm",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2.5">
                <CheckCircle
                  size={14}
                  style={{ color: "rgba(201,168,76,0.6)", flexShrink: 0 }}
                />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
