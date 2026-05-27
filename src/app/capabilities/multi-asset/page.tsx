"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ease = [0.25, 0.4, 0.25, 1] as const;

const principles = [
  {
    label: "Strategic Asset Allocation",
    description:
      "Long-horizon risk-return optimization for endowments, pension funds, and family offices",
  },
  {
    label: "Tactical Overlay",
    description: "Active risk management across liquid markets to manage drawdowns",
  },
  {
    label: "Real Assets Blended",
    description: "Combination of real estate, infrastructure, and credit in a single mandate",
  },
  {
    label: "Liquid Alternatives",
    description: "Hedge fund replication, risk premia, and factor-based liquid alternatives",
  },
  {
    label: "Custom Mandates",
    description:
      "Fully bespoke strategies built to client-specific return targets, risk budgets, and constraints",
  },
];

const steps = [
  {
    number: "01",
    title: "Client Objectives",
    body: "We start with what the client actually needs — a net return target, a liability they're trying to match, or a drawdown limit they can't breach. The portfolio flows from that.",
  },
  {
    number: "02",
    title: "Risk Factor Analysis",
    body: "We decompose every portfolio into underlying risk factors: equity beta, duration, credit spread, inflation, currency, and liquidity. We manage to these factors, not to asset class labels.",
  },
  {
    number: "03",
    title: "Portfolio Construction",
    body: "Strategic weights are set using long-horizon expected return and risk estimates. Tactical tilts are made based on valuation signals, momentum, and macro regime.",
  },
  {
    number: "04",
    title: "Rebalancing & Risk Management",
    body: "We rebalance when risk factor exposures drift materially from targets. We don't rebalance on calendar dates regardless of market conditions.",
  },
  {
    number: "05",
    title: "Reporting",
    body: "Clients receive monthly attribution reports showing returns by risk factor, asset class, and strategy. No black boxes.",
  },
];

const investments = [
  {
    name: "University Endowment",
    location: "United States",
    description:
      "Global multi-asset mandate for a $2.1B university endowment. Blend of liquid markets (60%), real assets (25%), and private credit (15%). Target: CPI+5% net over a full cycle.",
    outcome: "7-year relationship. 9.1% net annualized",
  },
  {
    name: "Sovereign Wealth Fund Allocation",
    location: "Gulf Region",
    description:
      "Real assets blended mandate combining real estate equity, infrastructure debt, and private credit. Structured to minimize correlation to the fund's existing equity-heavy portfolio.",
    outcome: "$800M mandate. Active.",
  },
  {
    name: "Family Office — Diversified",
    location: "Europe",
    description:
      "Bespoke multi-generational wealth mandate for a European single-family office. Blends core equity, private credit, and real estate with a long/short liquid overlay.",
    outcome: "$240M. 12% net IRR to date",
  },
];

export default function MultiAssetPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Investment Capabilities"
          heading="Multi-Asset Solutions"
          subheading="Not a passive allocation. An active strategy that adjusts to what markets are actually doing."
          stats={[
            { value: "$3.2B", label: "In Mandates" },
            { value: "12", label: "Strategies" },
            { value: "8.4%", label: "Avg Net Return" },
          ]}
        />

        {/* Strategy Overview */}
        <section className="py-24" style={{ background: "var(--background)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Left column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <h2 className="font-serif text-3xl font-bold leading-snug tracking-tight text-foreground sm:text-4xl">
                  Diversification With a Macro View
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  Most multi-asset strategies are diversified by label but correlated in practice.
                  When equity markets fell 20% in 2022, most 60/40 portfolios fell with them. We
                  build portfolios that are diversified by risk factor, not just by asset class name.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Our multi-asset platform runs liquid and illiquid strategies, active and passive
                  exposures, and long-only and long/short overlays. The mix depends on the client's
                  objective — not on what's easiest to manage.
                </p>
              </motion.div>

              {/* Right column — key principles */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.15 }}
              >
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Multi-Asset Capabilities
                </p>
                <ol className="space-y-5">
                  {principles.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-foreground"
                        style={{ background: "var(--gold)" }}
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        <span className="font-semibold text-foreground">{item.label}</span>
                        {" — "}
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section
          className="border-t py-24"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-16"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                How We Work
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Approach
              </h2>
            </motion.div>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  className="grid gap-6 border-t py-10 lg:grid-cols-[80px_1fr_2fr] lg:gap-12"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="font-mono text-sm font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Representative Investments */}
        <section className="py-24" style={{ background: "var(--background)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-16"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Track Record
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Select Multi-Asset Mandates
              </h2>
            </motion.div>

            <div>
              {investments.map((inv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="grid gap-4 border-b py-8 lg:grid-cols-[1fr_1fr_auto] lg:gap-12"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <p className="font-semibold text-foreground">{inv.name}</p>
                    <p className="mt-1 text-sm" style={{ color: "var(--gold)" }}>
                      {inv.location}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{inv.description}</p>
                  <p
                    className="whitespace-nowrap font-mono text-xs"
                    style={{ color: "rgba(201,168,76,0.8)" }}
                  >
                    {inv.outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Explore Multi-Asset Strategies"
          subheading="Our portfolio construction team works with institutional investors and family offices on tailored mandates."
        />
      </main>
      <Footer />
    </>
  );
}
