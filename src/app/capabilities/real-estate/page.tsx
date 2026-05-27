"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ease = [0.25, 0.4, 0.25, 1] as const;

const principles = [
  {
    label: "Supply Constraints",
    description: "Markets where new development is limited by land, zoning, or cost",
  },
  {
    label: "Demand Durability",
    description: "Assets that serve needs that don't disappear in a downturn",
  },
  {
    label: "Operational Upside",
    description: "Situations where active management unlocks value a passive owner misses",
  },
  {
    label: "Capital Structure Flexibility",
    description:
      "Ability to invest as equity, preferred, or senior debt depending on risk/return",
  },
  {
    label: "Exit Clarity",
    description: "Multiple exit paths (sale, recap, IPO) visible at entry",
  },
];

const steps = [
  {
    number: "01",
    title: "Market Selection",
    body: "We enter markets based on structural thesis, not momentum. A market that's rising because of fundamentals is different from one rising because of capital flows.",
  },
  {
    number: "02",
    title: "Asset Underwriting",
    body: "Every acquisition begins with a 10-year discounted cash flow built from actual leases, not market rents. We stress-test cap rate expansion, vacancy, and capex before we model the upside.",
  },
  {
    number: "03",
    title: "Active Asset Management",
    body: "Post-acquisition, we run a 100-day plan covering leasing, capex, and governance. We track every asset monthly against plan and make operational decisions accordingly.",
  },
  {
    number: "04",
    title: "Value Creation",
    body: "Lease-up, repositioning, renovation, or development. The specific path depends on the asset. The goal is always the same: improve the cash flow durability before we consider exit.",
  },
  {
    number: "05",
    title: "Exit Optimization",
    body: "We don't sell into a deadline. We sell when the thesis is realized and the forward return is no longer compelling relative to reinvestment alternatives.",
  },
];

const investments = [
  {
    name: "European Logistics Portfolio",
    location: "Germany, France, Netherlands",
    description:
      "40-asset industrial logistics portfolio acquired in 2019 at 15% discount to replacement cost. Leased to 12 pan-European e-commerce operators on 7-12 year terms.",
    outcome: "2.8x MOIC, 24% IRR",
  },
  {
    name: "Manhattan Office Recapitalization",
    location: "New York, USA",
    description:
      "Preferred equity investment in a Class A midtown office tower undergoing a capital structure restructure. Senior debt refinanced; preferred equity provided bridge to recapitalization.",
    outcome: "Realized. 16% yield",
  },
  {
    name: "Australian Residential Land Bank",
    location: "Sydney & Melbourne",
    description:
      "Land banking strategy targeting residential development land in supply-constrained inner-ring suburbs. 12-site portfolio assembled 2021-2023 for staged development.",
    outcome: "Unrealized. On plan.",
  },
];

export default function RealEstatePage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Investment Capabilities"
          heading="Real Estate"
          subheading="We buy assets where supply is structurally constrained and hold them through cycles others exit."
          stats={[
            { value: "$9.1B", label: "Deployed" },
            { value: "14", label: "Countries" },
            { value: "200+", label: "Assets" },
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
                  Global Real Estate Equity and Debt
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  We invest across the capital structure in commercial and residential real estate
                  markets worldwide. Our focus is on assets where structural supply constraints —
                  geographic, regulatory, or physical — create pricing power that endures across
                  economic cycles.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  We are not passive investors. Every asset we own has an Aurion professional
                  involved in its governance. We make operational decisions that a passive REIT never
                  would — and that's where the returns come from.
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
                  What We Look For
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
                Select Real Estate Investments
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
          heading="Invest in Real Assets"
          subheading="Our real estate team is available to discuss portfolio construction and direct investment opportunities."
        />
      </main>
      <Footer />
    </>
  );
}
