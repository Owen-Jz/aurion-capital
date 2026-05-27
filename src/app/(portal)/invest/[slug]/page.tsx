"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  AlertTriangle,
  Users,
  BarChart2,
  PieChart,
  TrendingUp,
  Shield,
} from "lucide-react";

interface Tier {
  _id: string;
  name: string;
  price: number;
  shares: number;
  order: number;
  available: boolean;
}

interface Highlight {
  stat: string;
  label: string;
  sub?: string;
}

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  initials: string;
}

interface FundUse {
  label: string;
  pct: number;
  color: string;
  description: string;
}

interface Metric {
  label: string;
  value: string;
  trend?: string;
}

interface Risk {
  title: string;
  body: string;
}

interface Company {
  _id: string;
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  description: string;
  baseValuation: number;
  totalShares: number;
  sharesRemaining: number;
  minInvestment: number;
  tiers: Tier[];
  highlights: Highlight[];
  team: TeamMember[];
  useOfFunds: FundUse[];
  metrics: Metric[];
  risks: Risk[];
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

function SectionHeading({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <Icon size={15} style={{ color: "#c9a84c" }} />
      <h2 className="font-serif text-lg font-semibold" style={{ color: "var(--foreground)" }}>
        {label}
      </h2>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function RiskAccordion({ risks }: { risks: Risk[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {risks.map((risk, i) => (
        <div
          key={i}
          className="rounded-sm border overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left"
            style={{ background: open === i ? "rgba(201,168,76,0.04)" : "transparent" }}
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle
                size={13}
                style={{ color: open === i ? "#c9a84c" : "var(--muted)", flexShrink: 0 }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {risk.title}
              </span>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: "var(--muted)",
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                flexShrink: 0,
              }}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <p className="px-4 pb-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {risk.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function CompanyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  useEffect(() => {
    fetch(`/api/companies/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.company) {
          setCompany(d.company);
          const sorted = [...(d.company.tiers ?? [])].sort(
            (a: Tier, b: Tier) => a.order - b.order
          );
          setSelectedTier(sorted[0] ?? null);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className="w-6 h-6 rounded-full border-2 animate-spin"
          style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }}
        />
      </div>
    );
  }

  if (notFound || !company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          Listing not found.
        </p>
        <Link href="/invest" className="text-sm" style={{ color: "#c9a84c" }}>
          ← Back to listings
        </Link>
      </div>
    );
  }

  const pctSold = Math.round(
    ((company.totalShares - company.sharesRemaining) / company.totalShares) * 100
  );
  const paragraphs = company.description.split("\n\n");
  const sectorColor = SECTOR_COLORS[company.sector] ?? "#64748b";
  const sortedTiers = [...company.tiers].sort((a, b) => a.order - b.order);

  return (
    <div>
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/invest"
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#c9a84c]"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft size={14} />
          Back to Listings
        </Link>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-sm border overflow-hidden mb-8"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="h-1" style={{ background: sectorColor }} />
        <div className="p-6 lg:p-8">
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-3"
            style={{ background: `${sectorColor}18`, color: sectorColor }}
          >
            {company.sector}
          </span>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            {company.name}
          </h1>
          <p className="mt-2 text-base leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
            {company.tagline}
          </p>

          {/* Highlights strip */}
          {company.highlights?.length > 0 && (
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {company.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                  className="p-4 rounded-sm border"
                  style={{ borderColor: "var(--border)", background: "var(--background)" }}
                >
                  <p className="font-serif text-2xl font-bold" style={{ color: "#c9a84c" }}>
                    {h.stat}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>
                    {h.label}
                  </p>
                  {h.sub && (
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                      {h.sub}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: all detail sections */}
        <div className="lg:col-span-2 space-y-10">

          {/* About */}
          <section>
            <SectionHeading icon={BarChart2} label="About This Opportunity" />
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-[1.8]" style={{ color: "var(--muted)" }}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Key Metrics */}
          {company.metrics?.length > 0 && (
            <section>
              <SectionHeading icon={TrendingUp} label="Key Metrics" />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {company.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-sm border"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <p
                      className="text-[10px] uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {m.label}
                    </p>
                    <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                      {m.value}
                    </p>
                    {m.trend && (
                      <p className="text-[10px] mt-1 font-medium" style={{ color: "#c9a84c" }}>
                        {m.trend}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership Team */}
          {company.team?.length > 0 && (
            <section>
              <SectionHeading icon={Users} label="Leadership Team" />
              <div className="grid gap-4 md:grid-cols-3">
                {company.team.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="p-5 rounded-sm border"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                      style={{ background: "rgba(201,168,76,0.12)" }}
                    >
                      <span className="text-sm font-bold" style={{ color: "#c9a84c" }}>
                        {member.initials}
                      </span>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {member.name}
                    </p>
                    <p className="text-[11px] mb-3" style={{ color: "#c9a84c" }}>
                      {member.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                      {member.bio}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Use of Funds */}
          {company.useOfFunds?.length > 0 && (
            <section>
              <SectionHeading icon={PieChart} label="Use of Funds" />
              <div className="space-y-5">
                {company.useOfFunds.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: item.color }}
                        />
                        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold tabular-nums" style={{ color: "var(--foreground)" }}>
                        {item.pct}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden mb-1.5"
                      style={{ background: "var(--border)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Allocation progress */}
          <section>
            <SectionHeading icon={BarChart2} label="Allocation Progress" />
            <div
              className="p-5 rounded-sm border"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Shares Allocated
                </span>
                <span className="text-lg font-bold" style={{ color: "#c9a84c" }}>
                  {pctSold}%
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #c9a84c, #e4c76b)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pctSold}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: "var(--muted)" }}>
                <span>
                  {(company.totalShares - company.sharesRemaining).toLocaleString()} allocated
                </span>
                <span>
                  {company.sharesRemaining.toLocaleString()} of{" "}
                  {company.totalShares.toLocaleString()} remaining
                </span>
              </div>
            </div>
          </section>

          {/* Risk Factors */}
          {company.risks?.length > 0 && (
            <section>
              <SectionHeading icon={Shield} label="Risk Factors" />
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
                All investments carry risk. Please review the following factors carefully before proceeding with your application.
              </p>
              <RiskAccordion risks={company.risks} />
            </section>
          )}
        </div>

        {/* Right column: sticky investment sidebar */}
        <div>
          <div className="sticky top-6 space-y-4">
            {/* Tiers card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-sm border overflow-hidden"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  Minimum Investment
                </p>
                <p
                  className="font-serif text-2xl font-bold mt-0.5"
                  style={{ color: "var(--foreground)" }}
                >
                  {fmt(company.minInvestment)}
                </p>
              </div>

              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "var(--muted)" }}
                >
                  Select a Tier
                </p>
                <div className="space-y-2">
                  {sortedTiers.map((tier) => {
                    const isSelected = selectedTier?._id === tier._id;
                    return (
                      <button
                        key={tier._id}
                        onClick={() => setSelectedTier(tier)}
                        className="w-full p-3 rounded-sm border text-left transition-all duration-150"
                        style={{
                          borderColor: isSelected ? "#c9a84c" : "var(--border)",
                          background: isSelected ? "rgba(201,168,76,0.06)" : "transparent",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--foreground)" }}
                          >
                            {tier.name}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: isSelected ? "#c9a84c" : "var(--foreground)" }}
                          >
                            ${tier.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                          {tier.shares.toLocaleString()} shares ·{" "}
                          {((tier.shares / company.totalShares) * 100).toFixed(3)}% equity
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4">
                <button
                  onClick={() => router.push(`/invest/${slug}/apply`)}
                  className="w-full py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm transition-colors active:scale-[0.98]"
                  style={{ background: "#c9a84c", color: "#0a0f1e" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background = "#e4c76b")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background = "#c9a84c")
                  }
                >
                  Apply to Invest
                </button>
                <div className="mt-3 flex items-start gap-2">
                  <CheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: "#c9a84c" }} />
                  <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    Applications are reviewed by Aurion Capital Group. You will not be charged until your application is approved.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Summary stats card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="rounded-sm border p-4"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Valuation", value: fmt(company.baseValuation) },
                  { label: "Total Shares", value: company.totalShares.toLocaleString() },
                  { label: "Shares Left", value: company.sharesRemaining.toLocaleString() },
                  { label: "Allocated", value: `${pctSold}%`, gold: true },
                ].map(({ label, value, gold }) => (
                  <div key={label}>
                    <p
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "var(--muted)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-base font-bold"
                      style={{ color: gold ? "#c9a84c" : "var(--foreground)" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
