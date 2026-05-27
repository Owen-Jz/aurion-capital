"use client";

import { useState } from "react";

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

const benchmarkValues = [
  3821430, 3849280, 3867920, 3891255, 3924183, 3951876, 3981201, 4012455,
  4038433, 4031788, 4068816, 4103000,
];

const annualReturns = [
  { year: "2019 (partial)", portfolio: "+4.1%", benchmark: "+2.8%", outperformance: "+1.3%", outType: "positive" },
  { year: "2020", portfolio: "+12.3%", benchmark: "-4.2%", outperformance: "+16.5%", outType: "positive" },
  { year: "2021", portfolio: "+18.7%", benchmark: "+18.4%", outperformance: "+0.3%", outType: "positive" },
  { year: "2022", portfolio: "-3.2%", benchmark: "-16.1%", outperformance: "+12.9%", outType: "positive" },
  { year: "2023", portfolio: "+14.8%", benchmark: "+15.2%", outperformance: "-0.4%", outType: "negative" },
  { year: "2024", portfolio: "+11.4%", benchmark: "+9.8%", outperformance: "+1.6%", outType: "positive" },
  { year: "2025", portfolio: "+9.7%", benchmark: "+6.2%", outperformance: "+3.5%", outType: "positive" },
  { year: "2026 YTD", portfolio: "+8.4%", benchmark: "+5.1%", outperformance: "+3.3%", outType: "positive" },
];

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

function LargePerformanceChart() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const allValues = [
    ...performanceData.map((d) => d.value),
    ...benchmarkValues,
  ];
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const padMin = minVal - (maxVal - minVal) * 0.12;
  const padMax = maxVal + (maxVal - minVal) * 0.08;
  const range = padMax - padMin;

  const W = 500;
  const H = 260;
  const PAD_L = 50;
  const PAD_R = 12;
  const PAD_T = 14;
  const PAD_B = 28;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const portfolioPoints = performanceData.map((d, i) => ({
    x: PAD_L + (i / (performanceData.length - 1)) * chartW,
    y: PAD_T + chartH - ((d.value - padMin) / range) * chartH,
    month: d.month,
    value: d.value,
  }));

  const benchmarkPoints = benchmarkValues.map((v, i) => ({
    x: PAD_L + (i / (benchmarkValues.length - 1)) * chartW,
    y: PAD_T + chartH - ((v - padMin) / range) * chartH,
    value: v,
  }));

  const portfolioLinePath = smoothPath(portfolioPoints);
  const benchmarkLinePath = smoothPath(benchmarkPoints);
  const areaPath =
    portfolioLinePath +
    ` L ${portfolioPoints[portfolioPoints.length - 1].x},${PAD_T + chartH}` +
    ` L ${portfolioPoints[0].x},${PAD_T + chartH} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => padMin + t * range);
  const hovered = hoverIndex !== null ? portfolioPoints[hoverIndex] : null;
  const hoveredBench = hoverIndex !== null ? benchmarkPoints[hoverIndex] : null;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let nearestDist = Infinity;
    portfolioPoints.forEach((p, i) => {
      const dist = Math.abs(p.x - mouseX);
      if (dist < nearestDist) { nearestDist = dist; nearest = i; }
    });
    setHoverIndex(nearest);
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
        aria-label="Portfolio performance vs benchmark over 12 months"
        role="img"
        style={{ cursor: "crosshair" }}
      >
        <defs>
          <linearGradient id="areaGradLarge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(201,168,76,0.18)" />
            <stop offset="70%" stopColor="rgba(201,168,76,0.04)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </linearGradient>
          <linearGradient id="portfolioLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8933e" />
            <stop offset="100%" stopColor="#e4c76b" />
          </linearGradient>
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
              textAnchor="end" fontSize="8.5" fill="#94a3b8"
              fontFamily="ui-monospace,monospace">
              {formatMillions(val)}
            </text>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGradLarge)" />

        {/* Hover crosshair */}
        {hovered && (
          <line x1={hovered.x} y1={PAD_T} x2={hovered.x} y2={PAD_T + chartH}
            stroke="rgba(201,168,76,0.22)" strokeWidth="1" strokeDasharray="3 3" />
        )}

        {/* Benchmark line (smooth dashed) */}
        <path d={benchmarkLinePath} fill="none" stroke="#94a3b8"
          strokeWidth="1.5" strokeDasharray="5 3"
          strokeLinejoin="round" strokeLinecap="round" />

        {/* Portfolio line */}
        <path d={portfolioLinePath} fill="none" stroke="url(#portfolioLineGrad)"
          strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* End dot */}
        <circle cx={portfolioPoints[portfolioPoints.length - 1].x}
          cy={portfolioPoints[portfolioPoints.length - 1].y}
          r="6" fill="rgba(201,168,76,0.15)" />
        <circle cx={portfolioPoints[portfolioPoints.length - 1].x}
          cy={portfolioPoints[portfolioPoints.length - 1].y}
          r="3.5" fill="#c9a84c" />

        {/* Hover dots */}
        {hovered && hoverIndex !== portfolioPoints.length - 1 && (
          <>
            <circle cx={hovered.x} cy={hovered.y} r="5.5" fill="rgba(201,168,76,0.15)" />
            <circle cx={hovered.x} cy={hovered.y} r="3" fill="#c9a84c" />
          </>
        )}
        {hoveredBench && (
          <circle cx={hoveredBench.x} cy={hoveredBench.y} r="3" fill="#94a3b8" />
        )}

        {/* X labels */}
        {portfolioPoints.map((p, i) => (
          <text key={i} x={p.x} y={H - 6} textAnchor="middle"
            fontSize="8.5" fill={hoverIndex === i ? "#c9a84c" : "#94a3b8"}
            fontFamily="ui-sans-serif,system-ui">
            {p.month}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {hovered && hoveredBench && (
        <div
          className="absolute pointer-events-none z-10 px-3 py-2 rounded-sm shadow-lg text-xs"
          style={{
            left: `${(hovered.x / W) * 100}%`,
            top: `${(hovered.y / H) * 100}%`,
            transform: `translate(${hoverIndex === 0 ? "4px" : hoverIndex! >= portfolioPoints.length - 2 ? "calc(-100% - 4px)" : "-50%"}, -115%)`,
            background: "#0a0f1e",
            border: "1px solid rgba(201,168,76,0.25)",
            minWidth: "110px",
          }}
        >
          <div className="font-medium mb-1.5" style={{ color: "#c9a84c" }}>
            {hovered.month}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Portfolio</span>
            <span className="font-semibold tabular-nums" style={{ color: "white" }}>
              ${(hovered.value / 1_000_000).toFixed(3)}M
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 mt-0.5">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Benchmark</span>
            <span className="tabular-nums" style={{ color: "#94a3b8" }}>
              ${(hoveredBench.value / 1_000_000).toFixed(3)}M
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PerformancePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Performance
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Net of fees · Since inception March 2019
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            Net IRR
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            14.2%
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Since inception
          </p>
        </div>
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
            Net MOIC
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            1.61x
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Total value multiple
          </p>
        </div>
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
            YTD Net Return
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-green-600">
            +8.4%
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Jan 1 – May 23, 2026
          </p>
        </div>
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
            Benchmark
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            +5.1%
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            60/40 blended benchmark
          </p>
        </div>
      </div>

      {/* Large chart */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center mb-4">
          <span className="text-sm font-semibold text-foreground">
            Portfolio Value — Trailing 12 Months
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-0.5 rounded-full"
                style={{ background: "#c9a84c" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                Portfolio
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="24" height="4" aria-hidden="true">
                <line
                  x1="0"
                  y1="2"
                  x2="24"
                  y2="2"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </svg>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                Benchmark
              </span>
            </div>
          </div>
        </div>
        <LargePerformanceChart />
      </div>

      {/* Annual returns table */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Annual Net Returns
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{
                background: "#fafafa",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {[
                "Year",
                "Portfolio Return",
                "Benchmark",
                "Outperformance",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left text-xs uppercase tracking-[0.1em] py-3 px-4 font-medium first:rounded-tl-lg last:rounded-tr-lg"
                  style={{ color: "var(--muted)" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {annualReturns.map((row, i) => (
              <tr
                key={i}
                className="border-b last:border-0"
                style={{ borderColor: "rgba(226,232,240,0.5)" }}
              >
                <td
                  className="py-3.5 px-4 text-sm font-medium text-foreground"
                >
                  {row.year}
                </td>
                <td className="py-3.5 px-4 text-sm font-mono text-foreground">
                  {row.portfolio}
                </td>
                <td
                  className="py-3.5 px-4 text-sm font-mono"
                  style={{ color: "var(--muted)" }}
                >
                  {row.benchmark}
                </td>
                <td
                  className={`py-3.5 px-4 text-sm font-mono font-medium ${
                    row.outType === "positive"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {row.outperformance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
