"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Clock } from "lucide-react";
import { INVESTMENT_PLANS } from "@/lib/plans";

interface Tier {
  _id: string;
  name: string;
  price: number;
  shares: number;
  order: number;
}

interface Company {
  _id: string;
  slug: string;
  name: string;
  sector: string;
  totalShares: number;
  tiers: Tier[];
}

interface UserProfile {
  name: string;
  email: string;
  firm?: string;
}

const STEPS = ["Select Tier", "Holding Period", "Your Details", "Declaration", "Review & Submit"];

const DECLARATIONS = [
  "I am an accredited investor as defined under applicable securities laws.",
  "I understand this investment is illiquid for the duration of the chosen holding period and may not be redeemable before maturity.",
  "I have read and understood the company information provided on this listing.",
  "I understand the risks associated with private market investments, including possible total loss of capital.",
  "I agree to Aurion Capital Group's Terms of Investment and Privacy Policy.",
];

export default function ApplyPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [company, setCompany] = useState<Company | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("1y");
  const [declarations, setDeclarations] = useState<boolean[]>(DECLARATIONS.map(() => false));

  const selectedPlan = INVESTMENT_PLANS.find((p) => p.id === selectedPlanId) ?? INVESTMENT_PLANS[3];

  useEffect(() => {
    Promise.all([
      fetch(`/api/companies/${slug}`).then((r) => r.json()),
      fetch("/api/auth/me").then((r) => r.json()),
    ])
      .then(([companyData, authData]) => {
        if (companyData.company) setCompany(companyData.company);
        if (authData.user) setUser(authData.user);
        else router.push(`/login?return=/invest/${slug}/apply`);
      })
      .finally(() => setLoading(false));
  }, [slug, router]);

  const allDeclared = declarations.every(Boolean);

  async function handleSubmit() {
    if (!company || !selectedTier) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: company._id,
          tierId: selectedTier._id,
          planId: selectedPlanId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.12)" }}>
            <CheckCircle size={32} style={{ color: "#c9a84c" }} />
          </div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Application Submitted</h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Your application for <strong>{company?.name}</strong> — {selectedTier?.name} tier, {selectedPlan.label} holding period — has been received. You will receive subscription documents within 2 business days.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/portal" className="inline-block py-3 px-8 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm text-center" style={{ background: "#c9a84c", color: "#0a0f1e" }}>
              Go to Portal
            </Link>
            <Link href="/invest" className="text-sm transition-colors hover:text-[#c9a84c]" style={{ color: "var(--muted)" }}>
              Browse more listings
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/invest/${slug}`} className="inline-flex items-center gap-1.5 text-sm hover:text-[#c9a84c]" style={{ color: "var(--muted)" }}>
            <ArrowLeft size={14} /> {company?.name ?? ""}
          </Link>
          <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Investment Application</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: i < step ? "#c9a84c" : i === step ? "#0a0f1e" : "var(--border)",
                    color: i < step ? "#0a0f1e" : i === step ? "white" : "var(--muted)",
                    border: i === step ? "2px solid #c9a84c" : "none",
                  }}
                >
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className="text-[9px] uppercase tracking-wider mt-1.5 hidden sm:block" style={{ color: i <= step ? "var(--foreground)" : "var(--muted)" }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2" style={{ background: i < step ? "#c9a84c" : "var(--border)" }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {/* Step 0: Tier */}
            {step === 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Select your investment tier</h2>
                <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Choose the investment amount that suits your objectives.</p>
                <div className="space-y-3">
                  {(company?.tiers ?? []).sort((a, b) => a.order - b.order).map((tier) => (
                    <button
                      key={tier._id}
                      onClick={() => setSelectedTier(tier)}
                      className="w-full text-left rounded-sm border p-5 transition-all duration-200"
                      style={{
                        borderColor: selectedTier?._id === tier._id ? "#c9a84c" : "var(--border)",
                        background: selectedTier?._id === tier._id ? "rgba(201,168,76,0.05)" : "var(--surface)",
                        boxShadow: selectedTier?._id === tier._id ? "0 0 0 1px #c9a84c20" : "none",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold" style={{ color: "var(--foreground)" }}>{tier.name}</span>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                            {tier.shares} shares · {company ? ((tier.shares / company.totalShares) * 100).toFixed(4) : 0}% stake
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold" style={{ color: "#c9a84c" }}>${tier.price.toLocaleString()}</span>
                          {selectedTier?._id === tier._id && (
                            <div className="flex justify-end mt-0.5">
                              <Check size={14} style={{ color: "#c9a84c" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Plan / holding period */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Choose your holding period</h2>
                <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
                  The selected plan determines your lock-up, distribution cadence and target return. These terms are written into your Non-Disclosure Agreement and Subscription Agreement before settlement.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {INVESTMENT_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className="text-left rounded-sm border p-5 transition-all"
                      style={{
                        borderColor: selectedPlanId === plan.id ? "#c9a84c" : "var(--border)",
                        background: selectedPlanId === plan.id ? "rgba(201,168,76,0.05)" : "var(--surface)",
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#c9a84c" }}>{plan.tier.toUpperCase()}</p>
                          <p className="font-serif text-xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{plan.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                            Lock-up: {plan.lockUpDays} days
                          </p>
                        </div>
                        {selectedPlanId === plan.id && <Check size={16} style={{ color: "#c9a84c" }} />}
                      </div>
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: "var(--muted)" }}>Target return</span>
                          <span style={{ color: "var(--foreground)" }}><strong>{plan.targetReturn}</strong></span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span style={{ color: "var(--muted)" }}>Distribution</span>
                          <span style={{ color: "var(--foreground)" }}>{plan.distributionCadence.replace("Single distribution at maturity", "At maturity")}</span>
                        </div>
                      </div>
                      <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>{plan.description}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-sm border p-4" style={{ borderColor: "rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.04)" }}>
                  <Clock size={16} style={{ color: "#c9a84c", marginTop: 2 }} />
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    Capital and final distribution are returned within <strong>{selectedPlan.capitalReturnWindowDays} days</strong> of the {selectedPlan.label} maturity. Target returns reflect Aurion&apos;s good-faith expectation and are not guaranteed.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Confirm your details</h2>
                <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Your details are pre-filled from your account.</p>
                <div className="rounded-sm border p-6 space-y-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  {[
                    { label: "Full Name", value: user?.name ?? "" },
                    { label: "Email Address", value: user?.email ?? "" },
                    { label: "Firm / Institution", value: user?.firm ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
                  Need to update your details?{" "}
                  <Link href="/portal/settings" className="underline" style={{ color: "var(--accent)" }}>Edit in Settings</Link>
                </p>
              </div>
            )}

            {/* Step 3: Declaration */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Investor Declaration</h2>
                <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Please read and confirm each statement.</p>
                <div className="space-y-4">
                  {DECLARATIONS.map((text, i) => (
                    <label
                      key={i}
                      className="flex items-start gap-3 cursor-pointer p-4 rounded-sm border transition-colors"
                      style={{
                        borderColor: declarations[i] ? "#c9a84c40" : "var(--border)",
                        background: declarations[i] ? "rgba(201,168,76,0.04)" : "var(--surface)",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: declarations[i] ? "#c9a84c" : "transparent",
                          border: `2px solid ${declarations[i] ? "#c9a84c" : "var(--border)"}`,
                        }}
                        onClick={() => {
                          const next = [...declarations];
                          next[i] = !next[i];
                          setDeclarations(next);
                        }}
                      >
                        {declarations[i] && <Check size={11} color="#0a0f1e" />}
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{text}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Review & Submit</h2>
                <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Please review your application.</p>
                <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                  <div className="p-5 border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                    <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Application Summary</h3>
                  </div>
                  <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {[
                      { label: "Company", value: company?.name },
                      { label: "Sector", value: company?.sector },
                      { label: "Investor", value: user?.name },
                      { label: "Email", value: user?.email },
                      { label: "Tier", value: selectedTier?.name },
                      { label: "Investment Amount", value: selectedTier ? `$${selectedTier.price.toLocaleString()}` : "" },
                      { label: "Shares", value: selectedTier ? `${selectedTier.shares.toLocaleString()} shares` : "" },
                      { label: "Holding Period", value: selectedPlan.label },
                      { label: "Lock-up", value: `${selectedPlan.lockUpDays} days` },
                      { label: "Target Return", value: selectedPlan.targetReturn },
                      { label: "Capital Return", value: `Within ${selectedPlan.capitalReturnWindowDays} days of maturity` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between px-5 py-3" style={{ background: "var(--surface)" }}>
                        <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
                        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

                <p className="mt-6 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  By submitting, you authorise Aurion Capital Group to review your application and prepare the corresponding subscription package. No funds will be collected until your application is approved and payment instructions are issued.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => (step > 0 ? setStep(step - 1) : router.push(`/invest/${slug}`))}
            className="flex items-center gap-2 text-sm hover:text-[#c9a84c]"
            style={{ color: "var(--muted)" }}
          >
            <ArrowLeft size={14} />
            {step === 0 ? "Back to Listing" : "Previous"}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={(step === 0 && !selectedTier) || (step === 3 && !allDeclared)}
              className="flex items-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#c9a84c", color: "#0a0f1e" }}
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-sm disabled:opacity-60"
              style={{ background: "#c9a84c", color: "#0a0f1e" }}
            >
              {submitting ? (
                <><span className="w-4 h-4 rounded-full border-2 border-[#0a0f1e]/20 border-t-[#0a0f1e] animate-spin" /> Submitting…</>
              ) : (
                <>Submit Application <CheckCircle size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
