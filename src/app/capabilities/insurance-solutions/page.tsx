"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ease = [0.25, 0.4, 0.25, 1] as const;

const principles = [
  {
    label: "Asset-Liability Management",
    description: "Duration-matched portfolios aligned to liability profiles",
  },
  {
    label: "Regulatory Capital Optimization",
    description: "Portfolios structured to minimize RBC, SCR, or BMA capital charges",
  },
  {
    label: "Private Asset Allocation",
    description: "Access to private credit and real assets within regulatory constraints",
  },
  {
    label: "Reporting & Compliance",
    description: "Full statutory and GAAP reporting across all jurisdictions",
  },
  {
    label: "Strategic Consulting",
    description: "Advising insurance boards and CIOs on investment policy and governance",
  },
];

const steps = [
  {
    number: "01",
    title: "Liability Analysis",
    body: "Before we buy a single asset, we model the liability. Duration, currency, optionality, and tail risk are all inputs to the investment policy.",
  },
  {
    number: "02",
    title: "Regulatory Mapping",
    body: "Every investment decision is mapped against the applicable regulatory capital framework. We optimize for total return per unit of regulatory capital, not just yield.",
  },
  {
    number: "03",
    title: "Portfolio Construction",
    body: "We build the core in investment-grade fixed income, then add private credit and real assets within the headroom that the regulatory framework allows.",
  },
  {
    number: "04",
    title: "Ongoing Management",
    body: "Insurance portfolios require continuous management. Asset maturities, liability changes, and regulatory updates all require active portfolio adjustment.",
  },
  {
    number: "05",
    title: "Reporting",
    body: "We produce all required regulatory reports — NAIC Schedule D, Solvency II QRT, and custom board-level reporting — directly from our systems.",
  },
];

const investments = [
  {
    name: "US Life Insurer SMA",
    location: "United States",
    description:
      "Separately managed account for a $4B US life insurer. Core allocation in IG corporate credit; sleeve of direct lending and infrastructure debt within NAIC risk-based capital limits.",
    outcome: "$1.1B AUM. Full mandate.",
  },
  {
    name: "Bermuda Reinsurer Portfolio",
    location: "Bermuda",
    description:
      "Investment management mandate for a Bermuda Form reinsurer. Structured to minimize BMA ECR capital charges while maximizing total return from private credit.",
    outcome: "Active. Outperforming benchmark by 180bps",
  },
  {
    name: "European P&C Insurer",
    location: "Germany",
    description:
      "Solvency II-compliant portfolio for a German P&C insurer. Duration-matched to €800M of motor and property liabilities with 8% allocation to illiquid alternatives.",
    outcome: "3-year mandate, renewed.",
  },
];

export default function InsuranceSolutionsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Investment Capabilities"
          heading="Insurance Solutions"
          subheading="Liability-aware portfolio construction for insurers who need more than fixed income can deliver."
          stats={[
            { value: "18", label: "Carrier Partners" },
            { value: "$2.1B", label: "AUM" },
            { value: "12", label: "Countries" },
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
                  Purpose-Built for Insurance Balance Sheets
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  Insurance portfolios have unique constraints that most asset managers don't
                  understand. Capital charges, duration matching, liquidity requirements, regulatory
                  capital frameworks — these are not footnotes. They are the portfolio.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  We design and manage investment portfolios specifically for insurance companies.
                  Our team has managed money at insurers, advised regulators, and structured
                  transactions across NAIC, Solvency II, and Bermuda Form frameworks.
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
                  What We Offer Insurers
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
                Select Insurance Mandates
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
          heading="Insurance Portfolio Solutions"
          subheading="Speak to our insurance solutions team about a customized investment mandate."
        />
      </main>
      <Footer />
    </>
  );
}
