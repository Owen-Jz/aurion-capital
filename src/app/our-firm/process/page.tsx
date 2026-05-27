import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const steps = [
  {
    number: "01",
    title: "Origination",
    description:
      "We source deals through proprietary networks, not competitive auctions. Roughly 70% of our investments come from relationships built over years — management teams, co-investors, and counterparties who know how we operate.",
    criteria: [
      "Proprietary sourcing preferred",
      "Relationship-driven deal flow",
      "Off-market or limited-process transactions",
    ],
  },
  {
    number: "02",
    title: "Fundamental Research",
    description:
      "Before we model returns, we understand the business. Every investment begins with an honest assessment of the underlying economics: what drives value, what destroys it, and whether the current price reflects reality.",
    criteria: [
      "Bottom-up fundamental analysis",
      "Sector deep-dives before macro overlay",
      "Stress-test against prior cycle data",
    ],
  },
  {
    number: "03",
    title: "Underwriting & Structuring",
    description:
      "We underwrite to downside, not to upside. Our base case is the case where things don't go as planned. Structuring decisions — leverage, covenants, preference stacks — are made with exit scenarios in mind before entry.",
    criteria: [
      "Conservative base case assumptions",
      "Structural protections where available",
      "Clear path to liquidity modeled upfront",
    ],
  },
  {
    number: "04",
    title: "Active Ownership",
    description:
      "We don't send quarterly letters. We send people. Aurion professionals sit on boards, work with management on 100-day plans, and maintain operating involvement through the hold period. We own assets the way owners do.",
    criteria: [
      "Board representation standard",
      "100-day operational plan on acquisition",
      "Annual strategic review with management",
    ],
  },
  {
    number: "05",
    title: "Exit & Return of Capital",
    description:
      "We exit on our timeline, not the market's. When we believe an asset has reached fair or full value, we sell — even if markets want us to hold. Capital returned to investors compounds; unrealized gains don't.",
    criteria: [
      "Value-driven exit timing",
      "Multiple exit paths evaluated before entry",
      "Full cycle return attribution to investors",
    ],
  },
];

const distinctions = [
  {
    title: "No FOMO Investing",
    description:
      "We pass on more deals than we do. A strong pipeline of rejections is a sign of discipline, not missed opportunity.",
  },
  {
    title: "No Leveraged Beta",
    description:
      "We don't buy assets at full value and add leverage to juice returns. That's not investing — it's financing. We buy value, then improve it.",
  },
  {
    title: "No Benchmark Hugging",
    description:
      "We are not measured against an index. We are measured against our investors' cost of capital. We manage money, not tracking error.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Firm"
          heading="How We Invest"
          subheading="A repeatable, research-driven process refined over seventeen years and multiple market cycles."
        />

        {/* Investment Process */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Our Methodology
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Five Stages. No Exceptions.
            </h2>

            <div className="mt-14">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-8 border-b border-border py-12"
                >
                  {/* Step number */}
                  <div className="w-24 shrink-0">
                    <span
                      className="font-mono text-5xl font-light leading-none select-none"
                      style={{ color: "rgba(201,168,76,0.2)" }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1" aria-label={`${step.title} criteria`}>
                      {step.criteria.map((criterion) => (
                        <li key={criterion} className="flex items-center gap-2 text-sm text-muted">
                          <span className="text-gold" aria-hidden="true">•</span>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              What Distinguishes Our Process
            </h2>

            <div className="mt-12 grid gap-12 grid-cols-1 lg:grid-cols-3">
              {distinctions.map((item) => (
                <div key={item.title}>
                  <p className="font-serif text-lg font-semibold text-foreground">{item.title}</p>
                  <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="See Our Track Record"
          subheading="The process above isn't theoretical. Seventeen years of data backs it up."
        />
      </main>
      <Footer />
    </>
  );
}
