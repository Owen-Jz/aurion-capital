"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ease = [0.25, 0.4, 0.25, 1] as const;

const principles = [
  {
    label: "Energy Transition",
    description: "Renewables, storage, grid infrastructure supporting decarbonization",
  },
  {
    label: "Digital Infrastructure",
    description: "Data centers, fiber networks, towers",
  },
  {
    label: "Transport",
    description: "Ports, airports, toll roads with regulated or contracted revenues",
  },
  {
    label: "Water & Utilities",
    description: "Essential services with long concession lives and inflation linkage",
  },
  {
    label: "Social Infrastructure",
    description: "Schools, hospitals, government facilities under availability payments",
  },
];

const steps = [
  {
    number: "01",
    title: "Concession & Contract Analysis",
    body: "Infrastructure returns are only as good as the contract behind them. We analyze regulatory frameworks, concession terms, and offtake agreements before we model cash flows.",
  },
  {
    number: "02",
    title: "Regulatory Due Diligence",
    body: "Every jurisdiction has different rules for how infrastructure is priced, taxed, and allowed to earn returns. We employ local regulatory experts, not just financial analysts.",
  },
  {
    number: "03",
    title: "Technical Assessment",
    body: "We bring in independent engineers to assess asset condition, remaining useful life, and capex requirements. We don't rely on the seller's estimates.",
  },
  {
    number: "04",
    title: "Operational Improvement",
    body: "Post-acquisition, we benchmark our assets against global peers on cost, efficiency, and safety. Operational improvement is where infrastructure value is created.",
  },
  {
    number: "05",
    title: "ESG Integration",
    body: "Infrastructure assets sit at the center of the energy transition and social equity debates. We take environmental and social performance seriously — as a risk management discipline, not just a reporting exercise.",
  },
];

const investments = [
  {
    name: "North Sea Offshore Wind Farm",
    location: "United Kingdom",
    description:
      "600MW offshore wind development structured as a 30-year availability payment concession. Anchor investor alongside two Nordic pension funds.",
    outcome: "12% unlevered yield",
  },
  {
    name: "Southeast Asian Port Network",
    location: "Vietnam & Indonesia",
    description:
      "Majority stake in a 4-terminal port network serving container shipping routes in Southeast Asia. Revenue linked to trade volume growth.",
    outcome: "Unrealized. +18% EBITDA",
  },
  {
    name: "European Data Center Portfolio",
    location: "Netherlands & Ireland",
    description:
      "Three hyperscale data centers acquired in 2022 on 15-year triple-net leases to global cloud operators. Financed at 55% LTV.",
    outcome: "Realized. 2.2x MOIC",
  },
];

export default function InfrastructurePage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Investment Capabilities"
          heading="Infrastructure"
          subheading="Essential assets that modern economies depend on — owned, operated, and improved over decades."
          stats={[
            { value: "$6.3B", label: "Deployed" },
            { value: "22", label: "Assets" },
            { value: "8", label: "Countries" },
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
                  Core and Core-Plus Infrastructure
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  We invest in the infrastructure that supports daily life — energy generation and
                  distribution, digital connectivity, water treatment, transportation networks. These
                  assets have one thing in common: people can't live without them.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Our approach is long-duration and operational. We don't flip infrastructure. We
                  buy assets with 20-50 year concession lives, then spend the next decade improving
                  their efficiency, reducing their costs, and extending their contractual revenue
                  visibility.
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
                  Our Infrastructure Focus
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
                Select Infrastructure Investments
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
          heading="Build Infrastructure Exposure"
          subheading="Long-duration assets with inflation-linked returns for institutional portfolios."
        />
      </main>
      <Footer />
    </>
  );
}
