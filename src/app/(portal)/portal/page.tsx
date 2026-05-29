"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

interface PortalOverview {
  user: { id: string; name: string; email: string; firm: string | null };
  totals: {
    invested: number;
    value: number;
    unrealisedGain: number;
    unrealisedGainPct: number;
    activeStrategies: number;
    holdingsCount: number;
    activeApplications: number;
  };
  allocation: { strategy: string; pct: number; value: number; color: string }[];
  holdings: unknown[];
  applications: {
    _id: string;
    companyName: string;
    companySlug: string;
    sector: string;
    tierName: string;
    amount: number;
    shares: number;
    planLabel: string;
    status: string;
    paymentToken?: string;
    createdAt: string;
  }[];
  activity: {
    date: string;
    type: string;
    description: string;
    amount: number | null;
    status: string;
  }[];
}

const STATUS_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: "rgba(201,168,76,0.12)", color: "#c9a84c", label: "Under review" },
  approved: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Approved" },
  payment_submitted: { bg: "rgba(45,106,159,0.12)", color: "#2d6a9f", label: "Payment received" },
  completed: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Completed" },
  rejected: { bg: "rgba(239,68,68,0.1)", color: "#ef4444", label: "Declined" },
  settled: { bg: "rgba(45,106,159,0.12)", color: "#2d6a9f", label: "Settled" },
  info: { bg: "rgba(100,116,139,0.1)", color: "#64748b", label: "Info" },
};

function fmtUsd(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtCompact(n: number) {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n)}`;
}

function greet(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [data, setData] = useState<PortalOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/overview")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-72 rounded-sm" style={{ background: "var(--border)" }} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
          ))}
        </div>
        <div className="h-64 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl p-8 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <AlertCircle size={28} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          We couldn&apos;t load your portfolio. Please refresh and try again.
        </p>
      </div>
    );
  }

  const firstName = data.user.name.split(" ")[0];
  const greeting = greet(new Date().getHours());
  const hasInvestments = data.totals.holdingsCount > 0;
  const hasApplications = data.applications.length > 0;

  /* ── Brand-new investor: empty state ─────────────────────────────── */
  if (!hasInvestments && !hasApplications) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          {greeting}, {firstName}.
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Welcome to your investor portal.
        </p>

        <div
          className="mt-8 rounded-xl p-10 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(201,168,76,0.12)" }}
          >
            <TrendingUp size={26} style={{ color: "#c9a84c" }} />
          </div>
          <h2 className="font-serif text-xl font-bold" style={{ color: "var(--foreground)" }}>
            Your portfolio is ready to begin.
          </h2>
          <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            Your account has been activated. Browse Aurion&apos;s active offerings and submit your first application to put capital to work.
          </p>
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm"
            style={{ background: "#c9a84c", color: "#0a0f1e" }}
          >
            Browse Active Offerings <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  /* ── Standard dashboard ──────────────────────────────────────────── */
  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          {greeting}, {firstName}.
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          {data.user.firm ? `${data.user.firm} · ` : ""}
          Portfolio as of{" "}
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <KpiCard label="Total Value" value={hasInvestments ? fmtUsd(data.totals.value) : "—"} sub={data.user.firm ?? "Investor account"} />
        <KpiCard
          label="Unrealised Gain"
          value={hasInvestments ? `${data.totals.unrealisedGain >= 0 ? "+" : ""}${fmtUsd(data.totals.unrealisedGain)}` : "—"}
          sub={hasInvestments ? `${data.totals.unrealisedGainPct >= 0 ? "+" : ""}${data.totals.unrealisedGainPct.toFixed(1)}% vs. invested` : "No holdings yet"}
          tone={data.totals.unrealisedGain >= 0 ? "positive" : "negative"}
        />
        <KpiCard label="Active Strategies" value={String(data.totals.activeStrategies)} sub={`${data.totals.holdingsCount} ${data.totals.holdingsCount === 1 ? "position" : "positions"}`} />
        <KpiCard label="Pending Applications" value={String(data.totals.activeApplications)} sub={data.totals.activeApplications === 0 ? "None in review" : "Across active deals"} />
      </div>

      {/* Allocation + Applications row */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mt-6">
        <div className="rounded-xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold text-foreground mb-1">Active Applications</h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
            Track every submission from review through settlement.
          </p>
          {data.applications.length === 0 ? (
            <div className="text-sm py-6 text-center" style={{ color: "var(--muted)" }}>
              No applications submitted yet.{" "}
              <Link href="/invest" className="underline" style={{ color: "var(--accent)" }}>Browse offerings</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {data.applications.slice(0, 6).map((app) => {
                const badge = STATUS_BADGE[app.status] ?? STATUS_BADGE.info;
                const showPayLink = app.status === "approved" && app.paymentToken;
                return (
                  <div
                    key={app._id}
                    className="flex items-center justify-between p-3 rounded-sm border"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                        {app.companyName}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {app.tierName} · {app.planLabel} · {fmtUsd(app.amount)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-3 shrink-0">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: badge.bg, color: badge.color }}>
                        {badge.label}
                      </span>
                      {showPayLink && (
                        <Link
                          href={`/pay/${app.paymentToken}`}
                          className="text-xs font-semibold flex items-center gap-1"
                          style={{ color: "#c9a84c" }}
                        >
                          Settle <ArrowRight size={11} />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Asset Allocation</h2>
          {data.allocation.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: "var(--muted)" }}>
              Allocation will appear here once your first position settles.
            </p>
          ) : (
            <div className="space-y-4">
              {data.allocation.map((a) => (
                <div key={a.strategy}>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-foreground">{a.strategy}</span>
                    <span className="text-sm font-bold text-foreground ml-auto">{a.pct.toFixed(0)}%</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{fmtCompact(a.value)}</div>
                  <div className="w-full h-1.5 rounded-full mt-2" style={{ background: "var(--border)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${a.pct}%`, background: a.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity feed */}
      <div className="rounded-xl p-6 mt-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h2>
        {data.activity.length === 0 ? (
          <p className="text-sm py-6 text-center" style={{ color: "var(--muted)" }}>
            Activity will appear here once you submit your first application.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                {["Date", "Type", "Description", "Amount", "Status"].map((col) => (
                  <th key={col} className="text-left text-xs uppercase tracking-[0.1em] pb-3 font-medium" style={{ color: "var(--muted)" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.activity.map((row, i) => {
                const badge = STATUS_BADGE[row.status] ?? STATUS_BADGE.info;
                const Icon = row.type === "Payment" ? CheckCircle : row.type === "Application" ? FileText : Clock;
                return (
                  <tr key={i} className="border-b last:border-0" style={{ borderColor: "rgba(226,232,240,0.5)" }}>
                    <td className="py-4 text-xs font-mono" style={{ color: "var(--muted)" }}>
                      {new Date(row.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="py-4 text-xs" style={{ color: "var(--muted)" }}>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon size={11} /> {row.type}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-foreground pr-4">{row.description}</td>
                    <td className="py-4 text-sm font-medium">
                      {row.amount === null ? (
                        <span style={{ color: "var(--muted)" }}>—</span>
                      ) : row.amount < 0 ? (
                        <span style={{ color: "var(--muted)" }}>{fmtUsd(row.amount)}</span>
                      ) : (
                        <span className="text-green-600">+{fmtUsd(row.amount)}</span>
                      )}
                    </td>
                    <td className="py-4">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color }}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "positive" | "negative";
}) {
  const valueColor = tone === "positive" ? "text-green-600" : tone === "negative" ? "text-red-500" : "text-foreground";
  return (
    <div className="rounded-xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <p className="text-xs uppercase tracking-[0.12em] font-medium" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className={`font-serif text-2xl font-bold mt-2 ${valueColor}`}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{sub}</p>
    </div>
  );
}
