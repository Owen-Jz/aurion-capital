"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

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
  tiers: { name: string; price: number; shares: number }[];
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

export default function InvestPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((d) => setCompanies(d.companies ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "#c9a84c" }}
          >
            Investment Opportunities
          </p>
          <h1
            className="font-serif text-4xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Active Listings
          </h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: "var(--muted)" }}>
            Curated private investment opportunities reviewed and approved by Aurion Capital Group. Each listing is open to accredited investors only.
          </p>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div
              className="w-6 h-6 rounded-full border-2 animate-spin"
              style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }}
            />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((co, i) => {
              const pctSold = Math.round(
                ((co.totalShares - co.sharesRemaining) / co.totalShares) * 100
              );
              const sectorColor = SECTOR_COLORS[co.sector] ?? "#64748b";

              return (
                <motion.div
                  key={co._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link href={`/invest/${co.slug}`} className="block h-full group">
                    <div
                      className="h-full rounded-sm border flex flex-col transition-shadow duration-300 group-hover:shadow-lg"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface)",
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-1 rounded-t-sm"
                        style={{ background: sectorColor }}
                      />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Sector tag */}
                        <span
                          className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full self-start"
                          style={{
                            background: `${sectorColor}18`,
                            color: sectorColor,
                          }}
                        >
                          {co.sector}
                        </span>

                        {/* Name + tagline */}
                        <h2
                          className="font-serif text-xl font-bold mt-4 group-hover:text-[#c9a84c] transition-colors duration-200"
                          style={{ color: "var(--foreground)" }}
                        >
                          {co.name}
                        </h2>
                        <p
                          className="text-sm mt-1.5 leading-relaxed line-clamp-2 flex-1"
                          style={{ color: "var(--muted)" }}
                        >
                          {co.tagline}
                        </p>

                        {/* Stats */}
                        <div className="mt-5 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                              Valuation
                            </p>
                            <p className="text-lg font-bold mt-0.5" style={{ color: "var(--foreground)" }}>
                              {fmt(co.baseValuation)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                              Min. Investment
                            </p>
                            <p className="text-lg font-bold mt-0.5" style={{ color: "var(--foreground)" }}>
                              {fmt(co.minInvestment)}
                            </p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-5">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                              Shares Allocated
                            </span>
                            <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                              {pctSold}%
                            </span>
                          </div>
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ background: "var(--border)" }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${pctSold}%`, background: "#c9a84c" }}
                            />
                          </div>
                        </div>

                        {/* CTA */}
                        <div
                          className="mt-5 pt-4 flex items-center justify-between"
                          style={{ borderTop: "1px solid var(--border)" }}
                        >
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                            <TrendingUp size={12} />
                            {co.tiers.length} investment tiers
                          </div>
                          <span
                            className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-200"
                            style={{ color: "#c9a84c" }}
                          >
                            View & Invest <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && companies.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: "var(--muted)" }}>No active listings at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
