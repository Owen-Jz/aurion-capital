"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, AlertCircle } from "lucide-react";

interface PortalOverview {
  user: { name: string; firm: string | null };
  totals: {
    invested: number;
    value: number;
    unrealisedGain: number;
    unrealisedGainPct: number;
    activeStrategies: number;
    holdingsCount: number;
  };
  holdings: {
    _id: string;
    companyName: string;
    companySlug: string;
    sector: string;
    sectorColor: string;
    shares: number;
    invested: number;
    value: number;
    returnPct: number;
    purchasedAt: string;
  }[];
  applications: {
    _id: string;
    companyName: string;
    tierName: string;
    amount: number;
    status: string;
    paymentToken?: string;
  }[];
}

function fmtUsd(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function PortfolioPage() {
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
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
          ))}
        </div>
        <div className="h-80 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
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

  const pendingApps = data.applications.filter((a) => a.status !== "completed" && a.status !== "rejected");
  const hasHoldings = data.holdings.length > 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">Your Portfolio</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          {data.user.firm ? `${data.user.firm} · ` : ""}
          {hasHoldings ? `${fmtUsd(data.totals.value)} total value` : "No active holdings"}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <SummaryCard
          label="Active Positions"
          value={String(data.totals.holdingsCount)}
          sub={`${data.totals.activeStrategies} ${data.totals.activeStrategies === 1 ? "strategy" : "strategies"}`}
        />
        <SummaryCard
          label="Total Invested"
          value={hasHoldings ? fmtUsd(data.totals.invested) : "—"}
          sub="Capital deployed"
        />
        <SummaryCard
          label="Unrealised Return"
          value={hasHoldings ? `${data.totals.unrealisedGainPct >= 0 ? "+" : ""}${data.totals.unrealisedGainPct.toFixed(1)}%` : "—"}
          sub={hasHoldings ? `${data.totals.unrealisedGain >= 0 ? "+" : ""}${fmtUsd(data.totals.unrealisedGain)} unrealised` : "Allocations pending"}
          tone={data.totals.unrealisedGain >= 0 ? "positive" : "negative"}
        />
      </div>

      {/* Holdings */}
      {hasHoldings ? (
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="px-6 py-3" style={{ background: "#fafafa", borderBottom: "1px solid var(--border)" }}>
            <div
              className="grid gap-4 text-xs uppercase tracking-[0.1em] font-medium"
              style={{ color: "var(--muted)", gridTemplateColumns: "1.2fr 1.8fr 0.8fr 1fr 1fr 0.8fr" }}
            >
              <span>Sector</span>
              <span>Position</span>
              <span>Shares</span>
              <span>Invested</span>
              <span>Value</span>
              <span>Return</span>
            </div>
          </div>
          <div>
            {data.holdings.map((h) => (
              <div
                key={h._id}
                className="px-6 py-4 border-b last:border-0"
                style={{ borderColor: "rgba(226,232,240,0.5)" }}
              >
                <div
                  className="grid gap-4 items-center"
                  style={{ gridTemplateColumns: "1.2fr 1.8fr 0.8fr 1fr 1fr 0.8fr" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: h.sectorColor }} />
                    <span className="text-sm font-medium text-foreground">{h.sector}</span>
                  </div>
                  <Link
                    href={`/invest/${h.companySlug}`}
                    className="text-sm transition-colors hover:text-[#c9a84c]"
                    style={{ color: "var(--muted)" }}
                  >
                    {h.companyName}
                  </Link>
                  <span className="font-mono text-sm text-foreground">{h.shares.toLocaleString()}</span>
                  <span className="font-mono text-sm text-foreground">{fmtUsd(h.invested)}</span>
                  <span className="font-mono text-sm text-foreground">{fmtUsd(h.value)}</span>
                  <span
                    className={`text-sm font-medium ${
                      h.returnPct > 0 ? "text-green-600" : h.returnPct < 0 ? "text-red-500" : ""
                    }`}
                    style={h.returnPct === 0 ? { color: "var(--muted)" } : undefined}
                  >
                    {h.returnPct > 0 ? "+" : ""}{h.returnPct.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl p-10 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(201,168,76,0.12)" }}>
            <TrendingUp size={26} style={{ color: "#c9a84c" }} />
          </div>
          <h2 className="font-serif text-xl font-bold" style={{ color: "var(--foreground)" }}>
            No active positions yet.
          </h2>
          <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            {pendingApps.length > 0
              ? "Holdings will appear here once your pending applications settle."
              : "Browse Aurion's active offerings to begin building your portfolio."}
          </p>
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm"
            style={{ background: "#c9a84c", color: "#0a0f1e" }}
          >
            Browse Offerings <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Pending applications */}
      {pendingApps.length > 0 && (
        <div className="mt-8 rounded-xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold text-foreground mb-1">Pending Applications</h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
            Positions in review or awaiting settlement.
          </p>
          <div className="space-y-2">
            {pendingApps.map((app) => (
              <div key={app._id} className="flex items-center justify-between p-3 rounded-sm border" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{app.companyName}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{app.tierName} · {fmtUsd(app.amount)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>{app.status.replace(/_/g, " ")}</span>
                  {app.status === "approved" && app.paymentToken && (
                    <Link href={`/pay/${app.paymentToken}`} className="text-xs font-semibold flex items-center gap-1" style={{ color: "#c9a84c" }}>
                      Settle <ArrowRight size={11} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
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
      <p className="text-xs uppercase tracking-[0.12em] font-medium" style={{ color: "var(--muted)" }}>{label}</p>
      <p className={`font-serif text-2xl font-bold mt-2 ${valueColor}`}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{sub}</p>
    </div>
  );
}
