"use client";

const strategyColors: Record<string, string> = {
  "Real Estate": "#c9a84c",
  Infrastructure: "#1a3a5c",
  "Private Credit": "#2d6a9f",
  "Multi-Asset": "#64748b",
};

const holdings = [
  {
    strategy: "Real Estate",
    fund: "Aurion Real Estate Fund IV",
    commitment: 1000000,
    called: 800000,
    value: 1087500,
    returnPct: "+35.9%",
    returnType: "positive",
    status: "Active",
  },
  {
    strategy: "Real Estate",
    fund: "Aurion RE Debt Fund II",
    commitment: 500000,
    called: 500000,
    value: 400000,
    returnPct: "-20.0%",
    returnType: "negative",
    status: "Harvesting",
  },
  {
    strategy: "Infrastructure",
    fund: "Aurion Infra Partners III",
    commitment: 750000,
    called: 600000,
    value: 840000,
    returnPct: "+40.0%",
    returnType: "positive",
    status: "Active",
  },
  {
    strategy: "Infrastructure",
    fund: "Aurion Digital Infra I",
    commitment: 500000,
    called: 350000,
    value: 350000,
    returnPct: "0%",
    returnType: "neutral",
    status: "Investing",
  },
  {
    strategy: "Private Credit",
    fund: "Aurion Direct Lending IV",
    commitment: 800000,
    called: 800000,
    value: 935000,
    returnPct: "+16.9%",
    returnType: "positive",
    status: "Active",
  },
  {
    strategy: "Multi-Asset",
    fund: "Aurion Multi-Asset II",
    commitment: 600000,
    called: 550000,
    value: 637500,
    returnPct: "+15.9%",
    returnType: "positive",
    status: "Active",
  },
];

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  Active: { bg: "bg-green-50", text: "text-green-700" },
  Harvesting: { bg: "bg-amber-50", text: "text-amber-700" },
  Investing: { bg: "bg-blue-50", text: "text-blue-700" },
};

export default function PortfolioPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Your Portfolio
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Pemberton Family Office · $4,250,000 AUM
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
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
            Active Strategies
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            4
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Across 3 asset classes
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
            Avg. Target Return
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            14.8%
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Gross IRR
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
            Vintage Range
          </p>
          <p className="font-serif text-2xl font-bold mt-2 text-foreground">
            2021–2024
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Fund vintage years
          </p>
        </div>
      </div>

      {/* Holdings table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="px-6 py-3"
          style={{
            background: "#fafafa",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="grid gap-4 text-xs uppercase tracking-[0.1em] font-medium" style={{ color: "var(--muted)", gridTemplateColumns: "1fr 1.8fr 1fr 1fr 1fr 0.8fr 0.8fr" }}>
            <span>Strategy</span>
            <span>Fund</span>
            <span>Commitment</span>
            <span>Called</span>
            <span>Value</span>
            <span>Return</span>
            <span>Status</span>
          </div>
        </div>
        <div>
          {holdings.map((h, i) => {
            const dotColor = strategyColors[h.strategy] ?? "#64748b";
            const statusStyle = statusStyles[h.status];
            return (
              <div
                key={i}
                className="px-6 py-4 border-b last:border-0 transition-colors"
                style={{
                  borderColor: "rgba(226,232,240,0.5)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "#fafafa")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "transparent")
                }
              >
                <div className="grid gap-4 items-center" style={{ gridTemplateColumns: "1fr 1.8fr 1fr 1fr 1fr 0.8fr 0.8fr" }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: dotColor }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {h.strategy}
                    </span>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {h.fund}
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {fmt(h.commitment)}
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {fmt(h.called)}
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {fmt(h.value)}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      h.returnType === "positive"
                        ? "text-green-600"
                        : h.returnType === "negative"
                        ? "text-red-500"
                        : ""
                    }`}
                    style={
                      h.returnType === "neutral"
                        ? { color: "var(--muted)" }
                        : undefined
                    }
                  >
                    {h.returnPct}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full inline-block ${statusStyle.bg} ${statusStyle.text}`}
                  >
                    {h.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
