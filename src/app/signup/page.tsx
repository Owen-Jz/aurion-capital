"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Mail,
  Clock,
} from "lucide-react";

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
  "Individual",
  "High Net Worth Individual",
  "Family Office",
  "Institutional Investor",
  "Endowment / Foundation",
  "Sovereign Wealth Fund",
] as const;

const INCOME_BANDS = [
  "Below $50,000",
  "$50,000 – $99,999",
  "$100,000 – $249,999",
  "$250,000 – $499,999",
  "$500,000 – $999,999",
  "$1,000,000 – $4,999,999",
  "$5,000,000 +",
] as const;

const NET_WORTH_BANDS = [
  "Below $250,000",
  "$250,000 – $999,999",
  "$1,000,000 – $4,999,999",
  "$5,000,000 – $24,999,999",
  "$25,000,000 – $99,999,999",
  "$100,000,000 +",
] as const;

const SOURCE_OF_FUNDS = [
  "Employment income / salary",
  "Business ownership",
  "Investment returns",
  "Inheritance",
  "Sale of property or business",
  "Pension or retirement",
  "Other",
] as const;

const EMPLOYMENT = [
  "Employed",
  "Self-employed",
  "Business owner",
  "Retired",
  "Student",
  "Unemployed",
] as const;

const EXPERIENCE = [
  "No prior private market experience",
  "1 – 3 years",
  "3 – 7 years",
  "7 – 15 years",
  "15 + years",
] as const;

const RISK_TOLERANCE = [
  "Conservative — capital preservation is the priority",
  "Moderate — balanced income and growth",
  "Growth — comfortable with mid-cycle drawdowns",
  "Aggressive — pursuing maximum long-term return",
] as const;

const INVEST_SIZE = [
  "Under $5,000",
  "$5,000 – $25,000",
  "$25,000 – $100,000",
  "$100,000 – $500,000",
  "$500,000 – $2,500,000",
  "$2,500,000 +",
] as const;

const OBJECTIVES = [
  "Long-term capital appreciation",
  "Current income / yield",
  "Diversification away from public markets",
  "Inflation protection",
  "Access to AI, tech and growth themes",
] as const;

const STEPS = [
  "Account",
  "Profile",
  "Financial Suitability",
  "Security",
  "Review",
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  investorType: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  // Profile
  dateOfBirth: string;
  taxResidency: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // Financial
  annualIncome: string;
  netWorth: string;
  liquidNetWorth: string;
  sourceOfFunds: string;
  employmentStatus: string;
  employer: string;
  occupation: string;
  investmentExperience: string;
  investmentObjectives: string;
  riskTolerance: string;
  expectedInvestmentSize: string;
  isAccredited: boolean;
  isPep: boolean;
  // OTP
  enableOtp: boolean;
};

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    investorType: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    dateOfBirth: "",
    taxResidency: "United States",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    annualIncome: "",
    netWorth: "",
    liquidNetWorth: "",
    sourceOfFunds: "",
    employmentStatus: "",
    employer: "",
    occupation: "",
    investmentExperience: "",
    investmentObjectives: "",
    riskTolerance: "",
    expectedInvestmentSize: "",
    isAccredited: false,
    isPep: false,
    enableOtp: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateStep(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.firstName.trim()) e.firstName = "First name is required.";
      if (!form.lastName.trim()) e.lastName = "Last name is required.";
      if (!form.email.trim()) e.email = "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Please enter a valid email address.";
      if (!form.password) e.password = "Password is required.";
      if (form.password && form.password.length < 8)
        e.password = "Password must be at least 8 characters.";
      if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match.";
      if (!form.termsAccepted) e.terms = "You must accept the terms.";
    }
    if (s === 1) {
      if (!form.investorType) e.investorType = "Please select your investor type.";
      if (!form.dateOfBirth) e.dateOfBirth = "Date of birth is required.";
      if (!form.addressLine1.trim()) e.addressLine1 = "Address is required.";
      if (!form.city.trim()) e.city = "City is required.";
      if (!form.country.trim()) e.country = "Country is required.";
    }
    if (s === 2) {
      if (!form.annualIncome) e.annualIncome = "Required.";
      if (!form.netWorth) e.netWorth = "Required.";
      if (!form.sourceOfFunds) e.sourceOfFunds = "Required.";
      if (!form.employmentStatus) e.employmentStatus = "Required.";
      if (!form.investmentExperience) e.investmentExperience = "Required.";
      if (!form.riskTolerance) e.riskTolerance = "Required.";
      if (!form.expectedInvestmentSize) e.expectedInvestmentSize = "Required.";
    }
    return e;
  }

  function nextStep() {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
  }

  async function handleSubmit() {
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
          firm: form.company || undefined,
          phone: form.phone || undefined,
          investorType: form.investorType,
          otpEnabled: form.enableOtp,
          questionnaire: {
            annualIncome: form.annualIncome,
            netWorth: form.netWorth,
            liquidNetWorth: form.liquidNetWorth,
            sourceOfFunds: form.sourceOfFunds,
            employmentStatus: form.employmentStatus,
            employer: form.employer,
            occupation: form.occupation,
            investmentExperience: form.investmentExperience,
            investmentObjectives: form.investmentObjectives,
            riskTolerance: form.riskTolerance,
            expectedInvestmentSize: form.expectedInvestmentSize,
            isAccredited: form.isAccredited,
            isPep: form.isPep,
            dateOfBirth: form.dateOfBirth,
            taxResidency: form.taxResidency,
            address: {
              line1: form.addressLine1,
              line2: form.addressLine2,
              city: form.city,
              state: form.state,
              postalCode: form.postalCode,
              country: form.country,
            },
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ submit: data.error ?? "Registration failed." });
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  /* ───── Success / Pending Review screen ───── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--background)" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full"
        >
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(201,168,76,0.12)" }}
            >
              <Clock size={36} style={{ color: "#c9a84c" }} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.32em] mb-3" style={{ color: "#c9a84c" }}>
              Application Received
            </p>
            <h1 className="font-serif text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Thank you, {form.firstName}.
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted)" }}>
              Your application has been forwarded to the Aurion Compliance Committee. <strong>Your account is currently on hold</strong> while our team verifies your file. We expect to issue a definitive decision within <strong>one to three business days</strong>.
            </p>
          </div>

          <div
            className="mt-10 rounded-sm border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: "var(--muted)" }}>
              What happens next
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Confirmation email sent",
                  body: `A formal acknowledgement of your submission has been sent to ${form.email}.`,
                },
                {
                  icon: ShieldCheck,
                  title: "Compliance review (1–3 business days)",
                  body: "Our team will verify your identity, accredited-investor status, and source of funds.",
                },
                {
                  icon: CheckCircle,
                  title: "Welcome email & portal activation",
                  body: "On approval you will receive a welcome email and may log in to access your portfolio.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <Icon size={14} style={{ color: "#c9a84c" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-xs" style={{ color: "var(--muted)" }}>
            Questions in the meantime? Email{" "}
            <a href="mailto:investorrelations@aurioncapital.com" className="underline" style={{ color: "#c9a84c" }}>
              investorrelations@aurioncapital.com
            </a>
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#c9a84c]"
              style={{ color: "var(--muted)" }}
            >
              <ArrowLeft size={14} /> Return to homepage
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      <div className="flex-1 flex items-start justify-center px-8 py-12 overflow-y-auto">
        <motion.div
          className="max-w-xl mx-auto w-full"
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

          {/* Step indicator */}
          <div className="mt-8 mb-2 flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
                    style={{
                      background: i < step ? "#c9a84c" : i === step ? "#0a0f1e" : "var(--border)",
                      color: i < step ? "#0a0f1e" : i === step ? "white" : "var(--muted)",
                    }}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-wider mt-1 text-center hidden sm:block"
                    style={{ color: i <= step ? "var(--foreground)" : "var(--muted)" }}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px flex-1"
                    style={{ background: i < step ? "#c9a84c" : "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl font-bold mt-8" style={{ color: "var(--foreground)" }}>
            {step === 0 && "Create your account."}
            {step === 1 && "Tell us about yourself."}
            {step === 2 && "Financial suitability."}
            {step === 3 && "Secure your account."}
            {step === 4 && "Review and submit."}
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
            {step === 0 && "Step 1 of 5 · Basic account information."}
            {step === 1 && "Step 2 of 5 · Required for identity verification."}
            {step === 2 && "Step 3 of 5 · Used to assess accredited-investor status."}
            {step === 3 && "Step 4 of 5 · Two-factor authentication setup."}
            {step === 4 && "Step 5 of 5 · Confirm and submit for compliance review."}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="mt-8 space-y-4"
            >
              {/* ──────────────── Step 0: Account ──────────────── */}
              {step === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First name" error={errors.firstName}>
                      <input
                        className={inputClass}
                        placeholder="Alexandra"
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                        autoComplete="given-name"
                      />
                    </Field>
                    <Field label="Last name" error={errors.lastName}>
                      <input
                        className={inputClass}
                        placeholder="Pemberton"
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                        autoComplete="family-name"
                      />
                    </Field>
                  </div>

                  <Field label="Email address" error={errors.email}>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Phone number">
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+1 555 555 0114"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label="Password" error={errors.password}>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`${inputClass} pr-11`}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => set("password", e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </Field>

                  <Field label="Confirm password" error={errors.confirmPassword}>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`${inputClass} pr-11`}
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={(e) => set("confirmPassword", e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </Field>

                  <div className="flex items-start gap-3 mt-2">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={(e) => set("termsAccepted", e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 accent-[#c9a84c] cursor-pointer shrink-0"
                    />
                    <label htmlFor="terms" className="text-xs leading-relaxed cursor-pointer select-none" style={{ color: "var(--muted)" }}>
                      I agree to Aurion&apos;s{" "}
                      <Link href="/terms" className="underline" style={{ color: "var(--accent)" }}>Terms of Use</Link> and{" "}
                      <Link href="/privacy" className="underline" style={{ color: "var(--accent)" }}>Privacy Policy</Link>, and consent to a compliance review of my application.
                    </label>
                  </div>
                  {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
                </>
              )}

              {/* ──────────────── Step 1: Profile ──────────────── */}
              {step === 1 && (
                <>
                  <Field label="Investor type" error={errors.investorType}>
                    <Select value={form.investorType} onChange={(v) => set("investorType", v)} options={[...INVESTOR_TYPES]} placeholder="Select investor type" />
                  </Field>

                  <Field label="Company / Institution (optional)">
                    <input
                      className={inputClass}
                      placeholder="Pemberton Family Office"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Date of birth" error={errors.dateOfBirth}>
                      <input
                        type="date"
                        className={inputClass}
                        value={form.dateOfBirth}
                        onChange={(e) => set("dateOfBirth", e.target.value)}
                      />
                    </Field>
                    <Field label="Tax residency">
                      <input
                        className={inputClass}
                        placeholder="United States"
                        value={form.taxResidency}
                        onChange={(e) => set("taxResidency", e.target.value)}
                      />
                    </Field>
                  </div>

                  <Field label="Residential address" error={errors.addressLine1}>
                    <input
                      className={inputClass}
                      placeholder="Street address"
                      value={form.addressLine1}
                      onChange={(e) => set("addressLine1", e.target.value)}
                    />
                  </Field>
                  <Field label="Address line 2 (optional)">
                    <input
                      className={inputClass}
                      placeholder="Apt, suite, etc."
                      value={form.addressLine2}
                      onChange={(e) => set("addressLine2", e.target.value)}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" error={errors.city}>
                      <input className={inputClass} value={form.city} onChange={(e) => set("city", e.target.value)} />
                    </Field>
                    <Field label="State / Region">
                      <input className={inputClass} value={form.state} onChange={(e) => set("state", e.target.value)} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Postal code">
                      <input className={inputClass} value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} />
                    </Field>
                    <Field label="Country" error={errors.country}>
                      <input className={inputClass} value={form.country} onChange={(e) => set("country", e.target.value)} />
                    </Field>
                  </div>
                </>
              )}

              {/* ──────────────── Step 2: Financial ──────────────── */}
              {step === 2 && (
                <>
                  <Field label="Annual income (most recent year)" error={errors.annualIncome}>
                    <Select value={form.annualIncome} onChange={(v) => set("annualIncome", v)} options={[...INCOME_BANDS]} placeholder="Select your annual income" />
                  </Field>

                  <Field label="Total net worth (excluding primary residence)" error={errors.netWorth}>
                    <Select value={form.netWorth} onChange={(v) => set("netWorth", v)} options={[...NET_WORTH_BANDS]} placeholder="Select your net worth band" />
                  </Field>

                  <Field label="Liquid net worth (investable)">
                    <Select value={form.liquidNetWorth} onChange={(v) => set("liquidNetWorth", v)} options={[...NET_WORTH_BANDS]} placeholder="Select your liquid net worth" />
                  </Field>

                  <Field label="Source of funds" error={errors.sourceOfFunds}>
                    <Select value={form.sourceOfFunds} onChange={(v) => set("sourceOfFunds", v)} options={[...SOURCE_OF_FUNDS]} placeholder="How did you acquire the funds you plan to invest?" />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Employment status" error={errors.employmentStatus}>
                      <Select value={form.employmentStatus} onChange={(v) => set("employmentStatus", v)} options={[...EMPLOYMENT]} placeholder="Select" />
                    </Field>
                    <Field label="Occupation">
                      <input className={inputClass} placeholder="e.g. Portfolio Manager" value={form.occupation} onChange={(e) => set("occupation", e.target.value)} />
                    </Field>
                  </div>

                  <Field label="Employer / Firm (optional)">
                    <input className={inputClass} value={form.employer} onChange={(e) => set("employer", e.target.value)} />
                  </Field>

                  <Field label="Private market experience" error={errors.investmentExperience}>
                    <Select value={form.investmentExperience} onChange={(v) => set("investmentExperience", v)} options={[...EXPERIENCE]} placeholder="Select" />
                  </Field>

                  <Field label="Risk tolerance" error={errors.riskTolerance}>
                    <Select value={form.riskTolerance} onChange={(v) => set("riskTolerance", v)} options={[...RISK_TOLERANCE]} placeholder="Select" />
                  </Field>

                  <Field label="Primary investment objective">
                    <Select value={form.investmentObjectives} onChange={(v) => set("investmentObjectives", v)} options={[...OBJECTIVES]} placeholder="Select" />
                  </Field>

                  <Field label="Expected first-year investment size" error={errors.expectedInvestmentSize}>
                    <Select value={form.expectedInvestmentSize} onChange={(v) => set("expectedInvestmentSize", v)} options={[...INVEST_SIZE]} placeholder="Select" />
                  </Field>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isAccredited}
                        onChange={(e) => set("isAccredited", e.target.checked)}
                        className="mt-1 accent-[#c9a84c]"
                      />
                      <span className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>
                        I am an <strong>accredited investor</strong> as defined under Rule 501(a) of Regulation D, or qualify as an institutional / qualified purchaser under applicable jurisdiction.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isPep}
                        onChange={(e) => set("isPep", e.target.checked)}
                        className="mt-1 accent-[#c9a84c]"
                      />
                      <span className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>
                        I, or an immediate family member, am a <strong>politically exposed person (PEP)</strong> as defined under FATF guidelines.
                      </span>
                    </label>
                  </div>
                </>
              )}

              {/* ──────────────── Step 3: OTP ──────────────── */}
              {step === 3 && (
                <>
                  <div className="rounded-sm border p-6" style={{ borderColor: "rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.04)" }}>
                    <div className="flex items-start gap-4">
                      <ShieldCheck size={28} style={{ color: "#c9a84c" }} />
                      <div>
                        <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                          Two-factor authentication (Required)
                        </p>
                        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                          For every Aurion account we require an additional layer of protection. When you sign in, we send a six-digit verification code to your email address. This protects your portfolio even if your password is compromised.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-sm border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.enableOtp}
                          onChange={(e) => set("enableOtp", e.target.checked)}
                          className="accent-[#c9a84c]"
                        />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                            Enable email OTP for all sign-ins
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                            We will send a one-time code to <strong>{form.email || "your email"}</strong> on every login.
                          </p>
                        </div>
                      </label>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                      Hardware-key (FIDO2 / WebAuthn) and authenticator-app (TOTP) options will be available from your portal Security settings once your account is approved.
                    </p>
                  </div>
                </>
              )}

              {/* ──────────────── Step 4: Review ──────────────── */}
              {step === 4 && (
                <>
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                    <ReviewSection title="Account">
                      <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                      <ReviewRow label="Email" value={form.email} />
                      <ReviewRow label="Phone" value={form.phone || "—"} />
                    </ReviewSection>
                    <ReviewSection title="Profile">
                      <ReviewRow label="Investor type" value={form.investorType} />
                      <ReviewRow label="Date of birth" value={form.dateOfBirth} />
                      <ReviewRow label="Tax residency" value={form.taxResidency} />
                      <ReviewRow label="Address" value={`${form.addressLine1}, ${form.city}, ${form.country}`} />
                    </ReviewSection>
                    <ReviewSection title="Financial Suitability">
                      <ReviewRow label="Annual income" value={form.annualIncome} />
                      <ReviewRow label="Net worth" value={form.netWorth} />
                      <ReviewRow label="Source of funds" value={form.sourceOfFunds} />
                      <ReviewRow label="Employment" value={form.employmentStatus} />
                      <ReviewRow label="Experience" value={form.investmentExperience} />
                      <ReviewRow label="Risk tolerance" value={form.riskTolerance} />
                      <ReviewRow label="Expected first-year size" value={form.expectedInvestmentSize} />
                      <ReviewRow label="Accredited investor" value={form.isAccredited ? "Yes" : "No"} />
                    </ReviewSection>
                    <ReviewSection title="Security">
                      <ReviewRow label="Email OTP" value={form.enableOtp ? "Enabled" : "Disabled"} />
                    </ReviewSection>
                  </div>

                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    By submitting, you confirm the information above is true and complete to the best of your knowledge. Your account will be placed on hold pending review by the Aurion Compliance Committee. You will receive a confirmation email shortly and a final decision within <strong>1–3 business days</strong>.
                  </p>

                  {errors.submit && (
                    <p className="text-sm text-red-500">{errors.submit}</p>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <button
              type="button"
              onClick={() => (step > 0 ? setStep(step - 1) : null)}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm transition-colors disabled:opacity-40"
              style={{ color: "var(--muted)" }}
            >
              <ArrowLeft size={14} /> Previous
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-sm"
                style={{ background: "#c9a84c", color: "#0a0f1e" }}
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-sm disabled:opacity-60"
                style={{ background: "#c9a84c", color: "#0a0f1e" }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#0a0f1e]/20 border-t-[#0a0f1e] animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>Submit for Review <CheckCircle size={14} /></>
                )}
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium transition-colors hover:text-[#c9a84c]" style={{ color: "var(--accent)" }}>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right pane */}
      <div
        className="hidden lg:flex w-[40%] relative overflow-hidden flex-col"
        style={{ background: "linear-gradient(160deg,#0a0f1e 0%,#1a2a4a 50%,#0d1117 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,58,92,0.5) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(201,168,76,0.7)" }}>
              Institutional Onboarding
            </p>
            <blockquote
              className="font-serif text-2xl font-medium italic leading-relaxed mt-6"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              &ldquo;Compliance is not paperwork — it is the architecture of trust between an investor and a custodian.&rdquo;
            </blockquote>
            <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              — Aurion Compliance Charter
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              "Bank-grade encryption at rest and in transit",
              "Verified accredited-investor compliance",
              "Two-factor authentication required",
              "SOC 2 Type II · FINRA member firm",
            ].map((badge) => (
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

/* ─────────────────── Small presentational helpers ─────────────────── */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
        style={{ color: value === "" ? "rgba(100,116,139,0.5)" : "var(--foreground)" }}
      >
        <option value="" disabled>
          {placeholder ?? "Select"}
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ color: "var(--foreground)" }}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--muted)" }} />
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      <div className="px-5 py-2.5" style={{ background: "var(--surface)" }}>
        <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--muted)" }}>
          {title}
        </p>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
        {children}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-5 py-2.5">
      <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-sm font-medium text-right" style={{ color: "var(--foreground)" }}>{value || "—"}</span>
    </div>
  );
}
