import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const pillars = [
  {
    letter: "E",
    title: "Environmental",
    description:
      "Energy efficiency, carbon footprint, water use, and biodiversity. We track Scope 1 and 2 emissions for all majority-owned assets and set annual reduction targets.",
  },
  {
    letter: "S",
    title: "Social",
    description:
      "Labor practices, community impact, health & safety, and supply chain standards. We apply IFC Performance Standards across all investments in emerging markets.",
  },
  {
    letter: "G",
    title: "Governance",
    description:
      "Board composition, anti-corruption, transparency, and alignment of interests. All Aurion portfolio companies are required to maintain an independent audit committee.",
  },
];

const stages = [
  {
    number: "01",
    title: "Pre-investment Screen",
    description:
      "Every opportunity is screened against our exclusion list and scored against 24 ESG factors before we proceed to full due diligence.",
  },
  {
    number: "02",
    title: "Due Diligence",
    description:
      "Environmental site assessments, governance reviews, labor audits, and stakeholder mapping are standard components of our investment due diligence.",
  },
  {
    number: "03",
    title: "100-Day ESG Plan",
    description:
      "Post-acquisition, we develop an ESG improvement plan with measurable targets. The plan is approved by the portfolio company board.",
  },
  {
    number: "04",
    title: "Annual Reporting",
    description:
      "All portfolio companies report ESG metrics annually. Results are published in our Impact Report and shared with limited partners.",
  },
];

const frameworks = [
  {
    name: "TCFD",
    description: "Task Force on Climate-related Financial Disclosures",
  },
  {
    name: "SASB",
    description: "Sustainability Accounting Standards Board",
  },
  {
    name: "UN PRI",
    description: "Principles for Responsible Investment (Signatory since 2014)",
  },
  {
    name: "SFDR",
    description: "Sustainable Finance Disclosure Regulation (Article 8 classification)",
  },
];

export default function ESGPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Impact"
          heading="ESG Framework"
          subheading="Environmental, social, and governance factors are not a layer on top of our investment process. They are the process."
          stats={[
            { value: "100%", label: "Investments ESG-scored" },
            { value: "2030", label: "Net-zero target" },
            { value: "12th year", label: "Of ESG reporting" },
          ]}
        />

        {/* Section 1: Framework Overview */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Left: text */}
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Approach
                </p>
                <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  Integrated, Not Appended
                </h2>
                <p className="mt-6 leading-relaxed text-muted">
                  ESG is not a separate analysis we add after we decide to invest. It is part of
                  how we assess risk, value assets, and make decisions. A company with poor
                  governance is a higher-risk credit. A property with poor energy efficiency is a
                  higher-cost asset. These are investment facts, not ethics.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  Since 2013, every Aurion investment has received an ESG score at acquisition and
                  is tracked annually against that baseline. We use that data to set priorities for
                  operational improvement and to measure progress.
                </p>
              </div>

              {/* Right: E, S, G pillar cards */}
              <div className="grid grid-cols-3 gap-4">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.letter}
                    className="rounded-xl border border-border p-8"
                  >
                    <p
                      className="font-serif text-5xl font-bold mb-4"
                      style={{ color: "rgba(201,168,76,0.2)" }}
                    >
                      {pillar.letter}
                    </p>
                    <p className="font-serif text-lg font-bold text-foreground">{pillar.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Integration Process */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              How It Works
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              ESG at Every Stage of Ownership
            </h2>

            <div className="mt-14 grid gap-8 sm:grid-cols-4">
              {stages.map((stage) => (
                <div key={stage.number}>
                  <p
                    className="font-mono text-3xl"
                    style={{ color: "rgba(201,168,76,0.3)" }}
                  >
                    {stage.number}
                  </p>
                  <p className="mt-2 font-semibold text-foreground">{stage.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Reporting */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Transparency
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Commitment to ESG Reporting
            </h2>

            <div className="mt-12 grid gap-16 lg:grid-cols-2">
              {/* Left: text */}
              <p className="leading-relaxed text-muted">
                We have published an annual Impact Report since 2013. The report covers ESG
                performance across all majority-owned portfolio companies, our firm-level diversity
                metrics, and progress against our 2030 net-zero commitment. We follow TCFD, SASB,
                and UN PRI reporting frameworks.
              </p>

              {/* Right: framework list */}
              <ul className="flex flex-col gap-5">
                {frameworks.map((fw) => (
                  <li key={fw.name} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 shrink-0 text-sm font-bold"
                      style={{ color: "var(--gold)" }}
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span className="text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-foreground">{fw.name}</span>{" "}
                      &mdash; {fw.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Our Latest Impact Report"
          subheading="Download our 2024 Annual Impact Report for full ESG performance data."
        />
      </main>
      <Footer />
    </>
  );
}
