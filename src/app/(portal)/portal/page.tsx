"use client";

import { useState } from "react";

const client = {
  name: "Alexandra Pemberton",
  firm: "Pemberton Family Office",
  totalAUM: 4250000,
  ytdReturn: 8.4,
  ytdGain: 328745,
  inceptionReturn: 61.2,
  inceptionDate: "March 2019",
  lastUpdated: "May 23, 2026",
};

const allocation = [
  { strategy: "Real Estate", pct: 35, value: 1487500, color: "#c9a84c" },
  { strategy: "Infrastructure", pct: 28, value: 1190000, color: "#1a3a5c" },
  { strategy: "Private Credit", pct: 22, value: 935000, color: "#2d6a9f" },
  { strategy: "Multi-Asset", pct: 15, value: 637500, color: "#64748b" },
];

const performanceData = [
  { month: "Jun '25", value: 3921430 },
  { month: "Jul '25", value: 3967844 },
  { month: "Aug '25", value: 3951920 },
  { month: "Sep '25", value: 3983439 },
  { month: "Oct '25", value: 4027283 },
  { month: "Nov '25", value: 4063556 },
  { month: "Dec '25", value: 4083201 },
  { month: "Jan '26", value: 4136455 },
  { month: "Feb '26", value: 4161433 },
  { month: "Mar '26", value: 4152788 },
  { month: "Apr '26", value: 4193816 },
  { month: "May '26", value: 4250000 },
];

const activityRows = [
  {
    date: "May 15, 2026",
    type: "Distribution",
    description: "Q1 2026 Infrastructure Distribution",
    amount: "+$18,400",
    amountType: "positive",
    status: "Completed",
    statusType: "completed",
  },
  {
    date: "Apr 30, 2026",
    type: "Statement",
    description: "Q1 2026 Quarterly Statement Available",
    amount: "—",
    amountType: "neutral",
    status: "View",
    statusType: "view",
  },
  {
    date: "Mar 15, 2026",
    type: "Capital Call",
    description: "Aurion Real Estate Fund IV — Capital Call",
    amount: "-$250,000",
    amountType: "negative",
    status: "Settled",
    statusType: "settled",
  },
  {
    date: "Feb 28, 2026",
    type: "Distribution",
    description: "2025 Annual Interest — Private Credit",
    amount: "+$42,180",
    amountType: "positive",
    status: "Completed",
    statusType: "completed",
  },
  {
    date: "Jan 10, 2026",
    type: "Report",
    description: "2025 Annual Report Available",
    amount: "—",
    amountType: "neutral",
    status: "View",
    statusType: "view",
  },
];

function formatUSD(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function formatMillions(n: number) {
  return "$" + (n / 1_000_000).toFixed(1) + "M";
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const t = 0.25;
    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function PerformanceChart() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const minVal = Math.min(...performanceData.map((d) => d.value));
  const maxVal = Math.max(...performanceData.map((d) => d.value));
  const padMin = minVal - (maxVal - minVal) * 0.18;
  const padMax = maxVal + (maxVal - minVal) * 0.08;
  const range = padMax - padMin;

  const W = 500;
  const H = 170;
  const PAD_L = 46;
  const PAD_R = 12;
  const PAD_T = 12;
  const PAD_B = 24;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const points = performanceData.map((d, i) => ({
    x: PAD_L + (i / (performanceData.length - 1)) * chartW,
    y: PAD_T + chartH - ((d.value - padMin) / range) * chartH,
    month: d.month,
    value: d.value,
  }));

  const linePath = smoothPath(points);
  const areaPath = linePath +
    ` L ${points[points.length - 1].x},${PAD_T + chartH}` +
    ` L ${points[0].x},${PAD_T + chartH} Z`;

  const yTicks = [0, 0.33, 0.67, 1].map((t) => padMin + t * range);
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  function handleSvgMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let nearestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - mouseX);
      if (d < nearestDist) { nearestDist = d; nearest = i; }
    });
    setHoverIndex(nearest);
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        onMouseMove={handleSvgMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
        aria-label="Portfolio value over 12 months"
        role="img"
        style={{ cursor: "crosshair" }}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(201,168,76,0.18)" />
            <stop offset="75%" stopColor="rgba(201,168,76,0.04)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8933e" />
            <stop offset="100%" stopColor="#e4c76b" />
          </linearGradient>
          <filter id="glowDot">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {yTicks.map((val, i) => {
          const y = PAD_T + chartH - ((val - padMin) / range) * chartH;
          return (
            <line key={i} x1={PAD_L} y1={y} x2={W - PAD_R} y2={y}
              stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="3 4" />
          );
        })}

        {/* Y labels */}
        {yTicks.map((val, i) => {
          const y = PAD_T + chartH - ((val - padMin) / range) * chartH;
          return (
            <text key={i} x={PAD_L - 4} y={y + 3.5}
              textAnchor="end" fontSize="8.5" fill="#94a3b8" fontFamily="ui-monospace,monospace">
              {formatMillions(val)}
            </text>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGrad)" />

        {/* Hover crosshair */}
        {hovered && (
          <line x1={hovered.x} y1={PAD_T} x2={hovered.x} y2={PAD_T + chartH}
            stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeDasharray="3 3" />
        )}

        {/* Line */}
        <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5"
          strokeLinejoin="round" strokeLinecap="round" />

        {/* End dot glow */}
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y}
          r="6" fill="rgba(201,168,76,0.15)" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y}
          r="3.5" fill="#c9a84c" />

        {/* Hover dot */}
        {hovered && hoverIndex !== points.length - 1 && (
          <>
            <circle cx={hovered.x} cy={hovered.y} r="5.5" fill="rgba(201,168,76,0.15)" />
            <circle cx={hovered.x} cy={hovered.y} r="3" fill="#c9a84c" />
          </>
        )}

        {/* X labels — every 3rd */}
        {points.map((p, i) =>
          i % 3 === 0 ? (
            <text key={i} x={p.x} y={H - 4} textAnchor="middle"
              fontSize="8.5" fill={hoverIndex === i ? "#c9a84c" : "#94a3b8"}
              fontFamily="ui-sans-serif,system-ui">
              {p.month}
            </text>
          ) : null
        )}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute pointer-events-none z-10 px-2.5 py-1.5 rounded-sm shadow-lg text-xs"
          style={{
            left: `${(hovered.x / W) * 100}%`,
            top: `${(hovered.y / H) * 100}%`,
            transform: `translate(${hoverIndex === 0 ? "4px" : hoverIndex! >= points.length - 2 ? "calc(-100% - 4px)" : "-50%"}, -110%)`,
            background: "#0a0f1e",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <div className="font-medium" style={{ color: "#c9a84c" }}>{hovered.month}</div>
          <div className="font-semibold tabular-nums" style={{ color: "white" }}>
            ${(hovered.value / 1_000_000).toFixed(3)}M
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div>
      {/* Row 1: Welcome */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Good morning, Alexandra.
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Your portfolio overview as of May 23, 2026.
        </p>
      </div>

      {/* Row 2: KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Total AUM */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.12em] font-medium"
            style={{ color: "var(--muted)" }}
          >
            Total AUM
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            {formatUSD(client.totalAUM)}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            {client.firm}
          </p>
        </div>

        {/* YTD Return */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.12em] font-medium"
            style={{ color: "var(--muted)" }}
          >
            YTD Return
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-green-600">
            +{client.ytdReturn}%
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            +{formatUSD(client.ytdGain)} this year
          </p>
        </div>

        {/* Since Inception */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.12em] font-medium"
            style={{ color: "var(--muted)" }}
          >
            Since Inception
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-green-600">
            +{client.inceptionReturn}%
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Since {client.inceptionDate}
          </p>
        </div>

        {/* Last Capital Call */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.12em] font-medium"
            style={{ color: "var(--muted)" }}
          >
            Last Capital Call
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            $250,000
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            March 15, 2026
          </p>
        </div>
      </div>

      {/* Row 3: Chart + Allocation */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mt-6">
        {/* Performance Chart */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-foreground">
              Portfolio Value
            </span>
            <span
              className="text-xs ml-auto"
              style={{ color: "var(--muted)" }}
            >
              12-Month Trailing
            </span>
          </div>
          <PerformanceChart />
        </div>

        {/* Allocation */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="text-sm font-semibold text-foreground">
            Asset Allocation
          </span>
          <div className="space-y-4 mt-4">
            {allocation.map((item) => (
              <div key={item.strategy}>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-foreground">
                    {item.strategy}
                  </span>
                  <span className="text-sm font-bold text-foreground ml-auto">
                    {item.pct}%
                  </span>
                </div>
                <div className="flex items-center mt-0.5">
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {formatUSD(item.value)}
                  </span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full mt-2"
                  style={{ background: "var(--border)" }}
                >
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${item.pct}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Activity */}
      <div
        className="rounded-xl p-6 mt-6"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: "var(--border)" }}
            >
              {["Date", "Type", "Description", "Amount", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="text-left text-xs uppercase tracking-[0.1em] pb-3 font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {activityRows.map((row, i) => (
              <tr
                key={i}
                className="border-b last:border-0"
                style={{ borderColor: "rgba(226,232,240,0.5)" }}
              >
                <td
                  className="py-4 text-xs font-mono"
                  style={{ color: "var(--muted)" }}
                >
                  {row.date}
                </td>
                <td
                  className="py-4 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {row.type}
                </td>
                <td className="py-4 text-sm text-foreground pr-4">
                  {row.description}
                </td>
                <td className="py-4 text-sm font-medium">
                  <span
                    className={
                      row.amountType === "positive"
                        ? "text-green-600"
                        : row.amountType === "negative"
                        ? "text-red-500"
                        : ""
                    }
                    style={
                      row.amountType === "neutral"
                        ? { color: "var(--muted)" }
                        : undefined
                    }
                  >
                    {row.amount}
                  </span>
                </td>
                <td className="py-4">
                  {row.statusType === "completed" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                      {row.status}
                    </span>
                  )}
                  {row.statusType === "settled" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {row.status}
                    </span>
                  )}
                  {row.statusType === "view" && (
                    <button
                      className="text-xs transition-colors"
                      style={{ color: "var(--accent)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.color =
                          "var(--gold)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.color =
                          "var(--accent)")
                      }
                    >
                      {row.status}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
