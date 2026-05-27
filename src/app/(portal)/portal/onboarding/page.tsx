"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  BarChart2,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  Building2,
  PieChart,
  Briefcase,
  ChevronRight,
} from "lucide-react";

interface Company {
  _id: string;
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  baseValuation: number;
  totalShares: number;
  sharesRemaining: number;
  minInvestment: number;
}

interface User {
  name: string;
  firm?: string;
  onboardingComplete: boolean;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

const SECTOR_COLORS: Record<string, string> = {
  Infrastructure: "#1a3a5c",
  "Real Estate": "#c9a84c",
  "Private Credit": "#2d6a9f",
  "Multi-Asset": "#64748b",
};

// ─── Step components ────────────────────────────────────────────────────────

function StepWelcome({ user }: { user: User | null }) {
  const firstName = user?.name?.split(" ")[0] ?? "there";

  const pillars = [
    { icon: Building2, title: "Curated Listings", desc: "Hand-selected private companies across infrastructure, real estate, credit, and more." },
    { icon: Shield, title: "Admin-Gated", desc: "Every investment is reviewed and approved by Aurion before any money moves." },
    { icon: BarChart2, title: "Portfolio Tracking", desc: "Track your holdings, returns, and documents — all in one place." },
  ];

  return (
    <div className="text-center max-w-xl mx-auto">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #c9a84c22, #c9a84c44)" }}
      >
        <svg width="36" height="36" viewBox="0 0 512 512" fill="none" aria-hidden="true">
          <polygon points="256,74 70,446 118,446" fill="#0a0f1e" />
          <polygon points="256,74 442,446 394,446" fill="#0a0f1e" />
          <rect x="46" y="434" width="96" height="14" rx="5" fill="#0a0f1e" />
          <rect x="370" y="434" width="96" height="14" rx="5" fill="#0a0f1e" />
          <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c" />
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-xs uppercase tracking-[0.25em] mb-3"
        style={{ color: "#c9a84c" }}
      >
        Welcome to Aurion
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-4xl font-bold mb-4"
        style={{ color: "var(--foreground)" }}
      >
        Hello, {firstName}.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="text-base leading-relaxed mb-10"
        style={{ color: "var(--muted)" }}
      >
        You now have access to Aurion Capital Group's private investment platform — a curated
        marketplace of institutional-grade opportunities normally reserved for the world's largest funds.
        {user?.firm && ` We're glad to have ${user.firm} on board.`}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
      >
        {pillars.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="p-4 rounded-sm border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center mb-3"
              style={{ background: "rgba(201,168,76,0.1)" }}
            >
              <Icon size={16} style={{ color: "#c9a84c" }} />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>{title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function StepPortfolio() {
  const sections = [
    {
      icon: PieChart,
      label: "Dashboard",
      href: "/portal",
      color: "#c9a84c",
      desc: "Your portfolio summary — total invested, current value, overall return, and recent activity.",
    },
    {
      icon: TrendingUp,
      label: "Performance",
      href: "/portal/performance",
      color: "#2d6a9f",
      desc: "Track how your investments have grown over time with historical charts.",
    },
    {
      icon: FileText,
      label: "Documents",
      href: "/portal/documents",
      color: "#22c55e",
      desc: "All your subscription agreements and share certificates — ready to sign and download.",
    },
    {
      icon: Briefcase,
      label: "Portfolio",
      href: "/portal/portfolio",
      color: "#a855f7",
      desc: "A breakdown of each company you hold shares in, updated when Aurion revises valuations.",
    },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#c9a84c" }}>Your Portal</p>
        <h2 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
          Everything in one place.
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Your investor portal has four sections. They start empty — they fill up as you make investments.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map(({ icon: Icon, label, href, color, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-sm border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{label}</span>
                <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{href}</span>
              </div>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
            </div>
            <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: "var(--muted)" }} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-sm border-l-2 text-sm"
        style={{ borderLeftColor: "#c9a84c", background: "rgba(201,168,76,0.05)", color: "var(--muted)" }}
      >
        Everything updates automatically when Aurion approves your application, confirms payment, or revises a company valuation.
      </motion.div>
    </div>
  );
}

function StepHowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Building2,
      title: "Browse & Apply",
      desc: "Browse active listings, choose an investment tier ($5K–$100K), complete the 4-step application form.",
      color: "#c9a84c",
    },
    {
      num: "02",
      icon: Shield,
      title: "Aurion Reviews",
      desc: "Our team reviews every application within 2 business days. You'll receive an email with the outcome.",
      color: "#2d6a9f",
    },
    {
      num: "03",
      icon: DollarSign,
      title: "Send Payment",
      desc: "If approved, you'll receive a secure payment link. Send funds via crypto or wire transfer.",
      color: "#22c55e",
    },
    {
      num: "04",
      icon: FileText,
      title: "Sign & Hold",
      desc: "We generate your subscription agreement and share certificate. Sign digitally. Shares are yours.",
      color: "#a855f7",
    },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#c9a84c" }}>The Process</p>
        <h2 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
          How investing works.
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Four steps from application to share ownership. Every investment requires Aurion's approval — no automated transactions.
        </p>
      </div>

      <div className="relative">
        {/* Connector line */}
        <div
          className="absolute left-[28px] top-10 bottom-10 w-px"
          style={{ background: "linear-gradient(to bottom, #c9a84c40, #a855f740)" }}
        />

        <div className="space-y-4">
          {steps.map(({ num, icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-start gap-4 pl-0"
            >
              <div
                className="w-14 h-14 rounded-sm flex items-center justify-center shrink-0 relative z-10 border-2"
                style={{
                  background: "var(--surface)",
                  borderColor: color,
                }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div
                className="flex-1 p-4 rounded-sm border"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold" style={{ color }}>STEP {num}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCompanies({ companies }: { companies: Company[] }) {
  const preview = companies.slice(0, 3);

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#c9a84c" }}>Live Listings</p>
        <h2 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
          Active opportunities.
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {preview.length > 0
            ? `${preview.length} investment opportunit${preview.length === 1 ? "y is" : "ies are"} open right now. You can apply to any of them after completing this walkthrough.`
            : "New investment opportunities are added regularly. Check back soon."}
        </p>
      </div>

      {preview.length > 0 ? (
        <div className="space-y-3">
          {preview.map((co, i) => {
            const pctSold = Math.round(((co.totalShares - co.sharesRemaining) / co.totalShares) * 100);
            const sectorColor = SECTOR_COLORS[co.sector] ?? "#64748b";

            return (
              <motion.div
                key={co._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-sm border overflow-hidden"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="h-0.5" style={{ background: sectorColor }} />
                <div className="p-4 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: `${sectorColor}18` }}
                  >
                    <Building2 size={18} style={{ color: sectorColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>
                        {co.name}
                      </span>
                      <span className="text-xs font-bold shrink-0" style={{ color: "#c9a84c" }}>
                        {fmt(co.baseValuation)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                        style={{ background: `${sectorColor}18`, color: sectorColor }}
                      >
                        {co.sector}
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                        From {fmt(co.minInvestment)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${pctSold}%`, background: "#c9a84c" }} />
                      </div>
                      <span className="text-[10px] shrink-0" style={{ color: "var(--muted)" }}>{pctSold}% allocated</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div
          className="rounded-sm border p-8 text-center"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <Building2 size={32} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
          <p className="text-sm" style={{ color: "var(--muted)" }}>New listings coming soon.</p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-4 text-center"
      >
        <Link
          href="/invest"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#e4c76b]"
          style={{ color: "#c9a84c" }}
        >
          View all listings <ArrowRight size={13} />
        </Link>
      </motion.div>
    </div>
  );
}

function StepReady({ onComplete, userName }: { onComplete: () => void; userName: string }) {
  const firstName = userName.split(" ")[0];

  const nextSteps = [
    { icon: Building2, text: "Browse the active investment listings", href: "/invest", cta: "Browse listings" },
    { icon: PieChart, text: "Explore your portal dashboard", href: "/portal", cta: "View dashboard" },
    { icon: FileText, text: "Keep an eye on documents after your first investment", href: "/portal/documents", cta: "Documents" },
  ];

  return (
    <div className="max-w-xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ background: "rgba(34,197,94,0.12)" }}
      >
        <CheckCircle size={36} style={{ color: "#22c55e" }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-serif text-4xl font-bold mb-3"
        style={{ color: "var(--foreground)" }}
      >
        You&apos;re all set, {firstName}.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-base mb-10 leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        Your investor account is active. Here&apos;s what you can do right now:
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 text-left mb-10"
      >
        {nextSteps.map(({ icon: Icon, text, href, cta }, i) => (
          <div
            key={href}
            className="flex items-center gap-4 p-4 rounded-sm border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
              style={{ background: "rgba(201,168,76,0.1)" }}
            >
              <Icon size={16} style={{ color: "#c9a84c" }} />
            </div>
            <span className="flex-1 text-sm" style={{ color: "var(--foreground)" }}>{text}</span>
            <Link
              href={href}
              className="shrink-0 text-xs font-semibold transition-colors hover:text-[#e4c76b]"
              style={{ color: "#c9a84c" }}
              onClick={onComplete}
            >
              {cta} →
            </Link>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        onClick={onComplete}
        className="w-full py-4 text-sm font-semibold uppercase tracking-[0.1em] rounded-sm transition-colors"
        style={{ background: "#c9a84c", color: "#0a0f1e" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e4c76b")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9a84c")}
      >
        Enter My Portal
      </motion.button>
    </div>
  );
}

// ─── Main wizard ─────────────────────────────────────────────────────────────

const STEP_COUNT = 5;

const STEP_LABELS = [
  "Welcome",
  "Your Portal",
  "How It Works",
  "Opportunities",
  "Ready",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/companies", { credentials: "include" }).then((r) => r.json()),
    ]).then(([authData, companyData]) => {
      if (!authData.user) { window.location.href = "/login"; return; }
      if (authData.user.onboardingComplete) { router.push("/portal"); return; }
      if (authData.user.isAdmin) { router.push("/admin"); return; }
      setUser(authData.user);
      setCompanies(companyData.companies ?? []);
    });
  }, [router]);

  async function complete() {
    if (completing) return;
    setCompleting(true);
    await fetch("/api/user/onboarding", { method: "POST" });
    router.push("/portal");
  }

  function next() {
    if (step < STEP_COUNT - 1) setStep((s) => s + 1);
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
      </div>
    );
  }

  const isLast = step === STEP_COUNT - 1;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Top progress bar */}
      <div className="h-1 w-full" style={{ background: "var(--border)" }}>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #c9a84c, #e4c76b)" }}
          animate={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step labels */}
      <div
        className="flex items-center justify-center gap-0 py-4 border-b overflow-x-auto"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center">
            <button
              onClick={() => i < step && setStep(i)}
              className="flex items-center gap-1.5 px-3 py-1 text-xs transition-colors"
              style={{
                color: i === step ? "var(--foreground)" : i < step ? "#c9a84c" : "var(--muted)",
                fontWeight: i === step ? 600 : 400,
                cursor: i < step ? "pointer" : "default",
              }}
            >
              {i < step ? (
                <CheckCircle size={11} style={{ color: "#c9a84c" }} />
              ) : (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{
                    background: i === step ? "#c9a84c" : "var(--border)",
                    color: i === step ? "#0a0f1e" : "var(--muted)",
                  }}
                >
                  {i + 1}
                </span>
              )}
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < STEP_LABELS.length - 1 && (
              <ChevronRight size={12} style={{ color: "var(--border)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            {step === 0 && <StepWelcome user={user} />}
            {step === 1 && <StepPortfolio />}
            {step === 2 && <StepHowItWorks />}
            {step === 3 && <StepCompanies companies={companies} />}
            {step === 4 && <StepReady onComplete={complete} userName={user.name} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      {!isLast && (
        <div
          className="flex items-center justify-between px-8 py-5 border-t"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <button
            onClick={prev}
            className="text-sm transition-colors hover:text-[#c9a84c]"
            style={{ color: step === 0 ? "transparent" : "var(--muted)", pointerEvents: step === 0 ? "none" : "auto" }}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 20 : 6,
                  height: 6,
                  background: i === step ? "#c9a84c" : i < step ? "#c9a84c60" : "var(--border)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex items-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-sm transition-colors"
            style={{ background: "#c9a84c", color: "#0a0f1e" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e4c76b")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9a84c")}
          >
            {step === STEP_COUNT - 2 ? "Almost done" : "Continue"} <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Skip link */}
      {!isLast && (
        <div className="text-center pb-4">
          <button
            onClick={complete}
            className="text-xs transition-colors hover:text-[#c9a84c]"
            style={{ color: "var(--muted)" }}
          >
            Skip walkthrough
          </button>
        </div>
      )}
    </div>
  );
}
