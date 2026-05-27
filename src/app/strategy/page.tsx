import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const principles = [
  {
    number: "01",
    title: "Capital Preservation First",
    body: "Every investment decision begins with a single question: how much can we lose? We size positions, structure deals, and select assets with downside protection as the primary criterion. Returns are the product of not losing — not the other way around.",
  },
  {
    number: "02",
    title: "Hard-Asset Backing",
    body: "We do not invest in cash-flow projections detached from physical reality. Every opportunity on our platform is backed by tangible assets — land, buildings, infrastructure, contracted receivables — whose intrinsic value provides a floor that financial engineering cannot replicate.",
  },
  {
    number: "03",
    title: "Income Before Appreciation",
    body: "We require that investments generate current income from day one. Appreciation is welcome but never assumed. This discipline eliminates speculative bets and ensures our investors receive distributions even in flat or declining markets.",
  },
  {
    number: "04",
    title: "Operator Proximity",
    body: "We take board seats. We review monthly management accounts. We know the CFO's name. Passive ownership invites surprises. Active stewardship creates compounding advantage over time.",
  },
];

const process = [
  {
    phase: "Origination",
    heading: "Proprietary Deal Flow",
    body: "The majority of opportunities we invest in are never publicly marketed. We source through 17 years of relationships with operators, banks, family offices, and corporate finance advisers. When a deal hits the market broadly, the best terms are already gone.",
  },
  {
    phase: "Diligence",
    heading: "Six-Week Deep Review",
    body: "Every opportunity undergoes financial, legal, operational, and market diligence by our internal team. We review audited financials, stress-test projections under three economic scenarios, inspect physical assets, and interview management. An independent legal review confirms title and structure.",
  },
  {
    phase: "Investment Committee",
    heading: "Unanimous Approval Required",
    body: "A deal only advances to the platform if all five members of our Investment Committee vote to approve it. Any member may veto without giving reasons. This structure means we pass on many attractive deals — and miss very few disasters.",
  },
  {
    phase: "Structuring",
    heading: "Investor-First Terms",
    body: "We negotiate terms with the issuer after IC approval, with investor protection as the non-negotiable starting point. First-lien positions, personal guarantees, DSCR covenants, and redemption triggers are standard. Carry is only earned after investors receive capital back plus the preferred return.",
  },
  {
    phase: "Monitoring",
    heading: "Active Quarterly Oversight",
    body: "Post-close, each investment is assigned a dedicated portfolio manager who reviews KPIs monthly, attends quarterly board meetings, and escalates material changes to the IC. Investors receive formal quarterly reports and have continuous access to portfolio data through the platform.",
  },
];

const assetClasses = [
  {
    name: "Real Estate",
    allocation: "40%",
    description: "Commercial, industrial, and logistics assets with contracted tenant income. We prefer net-lease structures where the tenant bears operating costs, delivering clean, predictable cash flow to investors.",
    metrics: ["7.2yr avg hold", "8–12% target yield", "First-lien only"],
  },
  {
    name: "Infrastructure",
    allocation: "25%",
    description: "Essential-service assets — logistics networks, energy distribution, digital infrastructure — with long-term contracted revenues and inflation-linked pricing. The most durable cash flows in private markets.",
    metrics: ["15+ yr contracts", "CPI-linked income", "Investment grade counterparties"],
  },
  {
    name: "Private Credit",
    allocation: "25%",
    description: "Senior secured loans to established mid-market businesses. First-lien only, minimum 1.25x DSCR at close, personal guarantees required. We do not participate in junior debt, mezzanine, or distressed credit.",
    metrics: ["First-lien secured", "1.25x min DSCR", "10–14% target return"],
  },
  {
    name: "Multi-Asset",
    allocation: "10%",
    description: "Co-investment vehicles blending two or more asset classes in a single structure. Designed for investors seeking diversified exposure with a single subscription and simplified reporting.",
    metrics: ["2–3 asset blend", "Quarterly distributions", "Single SPV structure"],
  },
];

const riskControls = [
  {
    control: "Concentration Limits",
    detail: "No single investment may represent more than 15% of total platform AUM at the time of close.",
  },
  {
    control: "Geographic Diversification",
    detail: "No single jurisdiction may represent more than 40% of deployed capital. Correlation between markets is assessed before each new commitment.",
  },
  {
    control: "Leverage Caps",
    detail: "Real estate and infrastructure deals are capped at 65% LTV. Private credit deals carry zero leverage at the vehicle level — the underlying loan IS the asset.",
  },
  {
    control: "Liquidity Reserve",
    detail: "All vehicles maintain a minimum 5% cash reserve for capital calls, distributions, and unexpected operating costs, eliminating the need for forced asset sales.",
  },
  {
    control: "IC Veto Power",
    detail: "Any IC member may block an investment at any point through close. No investment proceeds over a single objection, regardless of timeline or sunk cost.",
  },
];

export default function StrategyPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Investment Strategy"
          heading={"Disciplined by Design.\nDurable by Intent."}
          subheading="Our strategy is not a marketing document. It is the operating logic behind every investment decision we make — consistent since 2008, refined by 17 years of deployment."
          stats={[
            { value: "$24B+", label: "Assets Deployed" },
            { value: "94%", label: "Capital Preservation Rate" },
            { value: "11.4%", label: "Net IRR Since Inception" },
          ]}
        />

        {/* ── Section 1: Core Principles ─────────────────────────────── */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Core Principles
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Four Beliefs That Shape Every Decision
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              These are not aspirations. They are constraints. Any opportunity that violates
              one of these principles is declined, regardless of projected return.
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              {principles.map((p) => (
                <div
                  key={p.number}
                  className="rounded-lg border border-border p-8"
                  style={{ background: "var(--surface)" }}
                >
                  <p
                    className="mb-4 font-mono text-3xl font-bold"
                    style={{ color: "rgba(201,168,76,0.25)" }}
                  >
                    {p.number}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Investment Process ──────────────────────────── */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Investment Process
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              From Sourcing to Stewardship
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              Every investment we present to investors has passed through five sequential stages.
              There are no shortcuts.
            </p>

            <div className="mt-16 relative pl-8" style={{ borderLeft: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="flex flex-col gap-12">
                {process.map((step, i) => (
                  <div key={step.phase} className="relative">
                    <div
                      className="absolute -left-[2.125rem] top-1.5 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        color: "var(--gold)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-1">
                      {step.phase}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-foreground">{step.heading}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Asset Class Allocation ──────────────────────── */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Asset Allocation
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Four Verticals. One Mandate.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              Each asset class is managed by a dedicated team with deep sector expertise.
              Target allocations are maintained across the portfolio, not within individual vehicles.
            </p>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {assetClasses.map((ac) => (
                <div
                  key={ac.name}
                  className="rounded-lg border border-border p-7"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">{ac.name}</h3>
                    <span
                      className="text-2xl font-bold font-mono"
                      style={{ color: "var(--gold)" }}
                    >
                      {ac.allocation}
                    </span>
                  </div>
                  <p className="leading-relaxed text-muted text-sm mb-5">{ac.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: "rgba(201,168,76,0.08)",
                          border: "1px solid rgba(201,168,76,0.2)",
                          color: "var(--gold)",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Risk Controls ────────────────────────────────── */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Risk Management
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Controls That Cannot Be Overridden
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              Risk management at Aurion is structural, not discretionary. The following
              controls are embedded in our investment policy and apply to every vehicle
              on the platform without exception.
            </p>

            <div className="mt-12">
              {riskControls.map((item) => (
                <div
                  key={item.control}
                  className="grid gap-6 border-b border-border py-7 lg:grid-cols-[280px_1fr]"
                >
                  <p className="font-serif text-lg font-bold text-foreground">{item.control}</p>
                  <p className="leading-relaxed text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Ready to Review Our Current Offerings?"
          subheading="Qualified investors can access active deal listings, detailed offering memoranda, and financial data through the Aurion investor portal."
        />
      </main>
      <Footer />
    </>
  );
}
