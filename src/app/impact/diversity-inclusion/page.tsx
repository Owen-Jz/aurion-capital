import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const metrics = [
  { value: "47%", label: "Women", sublabel: "share of global workforce" },
  { value: "22", label: "Nationalities", sublabel: "represented across global offices" },
  { value: "38%", label: "Underrepresented ethnic groups", sublabel: "in the global workforce" },
  { value: "6 Women", label: "Senior Leadership", sublabel: "on 10-person senior leadership team" },
];

const programs = [
  {
    name: "Aurion Access Program",
    description:
      "A two-year rotational program for talented graduates from underrepresented backgrounds. Access provides mentorship, investment training, and a path to full-time employment. 18 analysts to date, 12 converted to full-time roles.",
  },
  {
    name: "Leadership Accelerator",
    description:
      "A structured 18-month development program for mid-career professionals from underrepresented groups targeting managing director promotion. Includes board exposure, external coaching, and peer network.",
  },
  {
    name: "Diverse Managers Program",
    description:
      "Aurion co-invests alongside diverse-owned asset managers as part of our deal sourcing strategy. We've invested alongside 6 diverse-owned managers since 2020, totaling $340M.",
  },
  {
    name: "Annual Pay Equity Audit",
    description:
      "We publish the results of our annual pay equity audit in our Impact Report. In 2024, the adjusted gender pay gap at Aurion was 1.8% — within our stated target of sub-2%.",
  },
];

const expectations = [
  {
    label: "Board Diversity Standard",
    description:
      "All Aurion portfolio companies are expected to have at least one woman and one person from an underrepresented group on their board within 24 months of acquisition.",
  },
  {
    label: "Pay Equity",
    description:
      "Annual pay equity reviews are required for all portfolio companies with 100+ employees.",
  },
  {
    label: "Inclusive Hiring Practices",
    description:
      "Portfolio companies receive Aurion's hiring practice guidelines, covering job description language, interview process design, and offer practices.",
  },
  {
    label: "Annual D&I Reporting",
    description:
      "Portfolio companies with 50+ employees report D&I metrics to Aurion annually. Results are aggregated in our Impact Report.",
  },
];

export default function DiversityInclusionPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Impact"
          heading="Diversity & Inclusion"
          subheading="We believe a firm that looks like the world it invests in makes better decisions. We're working toward that."
          stats={[
            { value: "47%", label: "Women in workforce" },
            { value: "38%", label: "Underrepresented groups" },
            { value: "22", label: "Nationalities represented" },
          ]}
        />

        {/* Section 1: Our Perspective */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Left: paragraphs */}
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Why It Matters
                </p>
                <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  Diversity Is an Investment Thesis
                </h2>
                <p className="mt-6 leading-relaxed text-muted">
                  Alternative investing is a cognitively demanding business. The firms that will
                  outperform over the next twenty years will be the ones that can access the best
                  talent, the broadest networks, and the most diverse perspectives. Homogeneity is
                  a performance risk.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  We don&apos;t talk about diversity and inclusion because it&apos;s good PR. We
                  talk about it because we&apos;ve seen it make our investment committees smarter,
                  our diligence more thorough, and our relationships with portfolio company
                  management teams more productive.
                </p>
              </div>

              {/* Right: metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border p-6"
                  >
                    <p className="font-serif text-2xl font-bold text-gold">{metric.value}</p>
                    <p className="mt-1 font-semibold text-foreground text-sm">{metric.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{metric.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Programs */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Programs & Initiatives
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              How We Work Toward It
            </h2>

            <div className="mt-14">
              {programs.map((program) => (
                <div
                  key={program.name}
                  className="grid gap-12 border-b border-border py-8 lg:grid-cols-[1fr_2fr]"
                >
                  <p className="font-serif text-xl font-bold text-foreground">{program.name}</p>
                  <p className="leading-relaxed text-muted">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Portfolio Engagement */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              In Our Portfolio
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Setting the Standard for Portfolio Companies
            </h2>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted">
              We expect the companies and assets we own to reflect our commitment to diversity and
              inclusion. This is a standard governance expectation, not an optional commitment.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              As part of our 100-day post-acquisition plan, all portfolio companies with more than
              50 employees are required to complete a diversity baseline assessment and establish
              annual diversity targets approved by their board.
            </p>

            <ul className="mt-10 flex flex-col gap-0">
              {expectations.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 border-b border-border py-6"
                >
                  <span
                    className="mt-1 shrink-0 text-sm"
                    style={{ color: "var(--gold)" }}
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <div>
                    <span className="font-semibold text-foreground">{item.label}</span>
                    <span className="text-muted"> — {item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactCTA
          heading="Join Our Team"
          subheading="We are always looking for talented professionals from diverse backgrounds. View our open roles."
        />
      </main>
      <Footer />
    </>
  );
}
