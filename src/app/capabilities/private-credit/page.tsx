"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ease = [0.25, 0.4, 0.25, 1] as const;

const principles = [
  {
    label: "Direct Lending",
    description:
      "First and second lien loans to sponsor-backed and independent middle-market companies",
  },
  {
    label: "Real Estate Credit",
    description: "Senior and mezzanine construction and bridge loans on institutional-quality properties",
  },
  {
    label: "Infrastructure Debt",
    description: "Long-duration loans to operational infrastructure assets with contracted revenues",
  },
  {
    label: "Opportunistic Credit",
    description: "Special situations, distressed debt, and rescue financing",
  },
  {
    label: "CLO Management",
    description: "Actively managed pools of broadly syndicated and middle-market loans",
  },
];

const steps = [
  {
    number: "01",
    title: "Credit Selection",
    body: "We don't use third-party credit ratings as a primary input. We build our own credit models, stress-test them under multiple scenarios, and arrive at our own view of default probability and recovery.",
  },
  {
    number: "02",
    title: "Structural Protections",
    body: "Covenants, call protection, equity cures, and collateral packages matter. We negotiate hard on structure because structure determines recovery when things go wrong.",
  },
  {
    number: "03",
    title: "Ongoing Monitoring",
    body: "We review every credit monthly. We don't wait for a covenant breach to know something is wrong. Early intervention is how you protect capital.",
  },
  {
    number: "04",
    title: "Workout Expertise",
    body: "If a credit deteriorates, we have an internal restructuring team that has worked through defaults across multiple cycles. We don't outsource this.",
  },
  {
    number: "05",
    title: "Portfolio Construction",
    body: "We limit single-name concentration, sector concentration, and vintage concentration. Credit portfolios fail through correlation, not individual defaults.",
  },
];

const investments = [
  {
    name: "Healthcare Services First Lien",
    location: "United States",
    description:
      "$340M first-lien term loan to a regional healthcare services business undergoing operational turnaround. Priced at SOFR+475 with 1% OID and quarterly maintenance covenants.",
    outcome: "Repaid 2024. 13.8% yield",
  },
  {
    name: "European Logistics Mezz",
    location: "Germany",
    description:
      "$180M mezzanine tranche on a 12-asset logistics portfolio acquisition. 4-year term with a 14% PIK option. Subordinate to €420M of senior debt.",
    outcome: "Current. Performing to plan",
  },
  {
    name: "Tech-Enabled Business Services",
    location: "UK & Ireland",
    description:
      "$95M second-lien facility to a PE-backed B2B software company with €240M of recurring revenue. Priced at SONIA+550.",
    outcome: "Refinanced at par. 11.2% yield",
  },
];

export default function PrivateCreditPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Investment Capabilities"
          heading="Private Credit"
          subheading="We lend where banks have retreated — at terms that reflect the risk we actually underwrite."
          stats={[
            { value: "$4.8B", label: "Deployed" },
            { value: "85+", label: "Credits" },
            { value: "0", label: "Realized Losses" },
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
                  Direct Lending Across the Capital Structure
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  The retreat of banks from middle-market and large corporate lending has created a
                  permanent opportunity for non-bank lenders with capital, underwriting expertise,
                  and the ability to move quickly. We have all three.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  We lend first lien, second lien, and mezzanine across corporate, real estate, and
                  infrastructure credit. Our underwriting starts with the downside — what happens to
                  our recovery if this credit defaults — and works backward to structuring.
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
                  Our Credit Strategies
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
                Select Private Credit Investments
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
          heading="Access Private Credit Returns"
          subheading="Floating-rate, senior-secured exposure to the private credit opportunity."
        />
      </main>
      <Footer />
    </>
  );
}
