import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const focusAreas = [
  {
    name: "Workforce Development",
    description:
      "In every geography where we have significant employment, we partner with community colleges, vocational training programs, and workforce development agencies to develop the next generation of workers in our industries. 3,200 workers trained since 2018.",
  },
  {
    name: "Local Supply Chain",
    description:
      "When we acquire a business or asset, we audit its supply chain for local procurement opportunities. We set targets for local supplier engagement and report on progress annually. $120M directed to local suppliers in 2024.",
  },
  {
    name: "Strategic Philanthropy",
    description:
      "The Aurion Foundation directs 1% of Aurion management fees annually to philanthropic initiatives, with a focus on financial literacy and economic mobility programs in the communities where we operate. 47 organizations funded in 2024.",
  },
];

const impactMetrics = [
  { value: "1,400", label: "net new jobs created" },
  { value: "$48M", label: "total community investment" },
  { value: "$120M", label: "directed to local suppliers" },
  { value: "3,200", label: "workers trained" },
  { value: "47", label: "organizations funded" },
  { value: "35", label: "countries with active community programs" },
];

export default function CommunityPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Impact"
          heading="Community"
          subheading="The communities where our assets are located are not external stakeholders. They are part of the investment."
          stats={[
            { value: "12,000+", label: "Jobs created" },
            { value: "$48M", label: "Community investment" },
            { value: "35", label: "Countries" },
          ]}
        />

        {/* Section 1: Philosophy */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Our Approach
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Community Is Not a CSR Exercise
            </h2>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted">
              A commercial real estate asset in a declining neighborhood is worth less than the
              same asset in a thriving one. An infrastructure concession in a community that views
              us as an extractive foreign investor is more operationally and politically fragile
              than one where we&apos;ve built genuine relationships. Community engagement is not
              altruism — it&apos;s risk management and value creation.
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted">
              Aurion&apos;s community program focuses on three areas: job creation and workforce
              development, local supply chain development, and strategic philanthropy focused on
              education and financial literacy. In 2024 alone, Aurion portfolio companies created
              1,400 net new jobs in the communities where we operate.
            </p>
          </div>
        </section>

        {/* Section 2: Areas of Focus */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Focus Areas
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Where We Invest in Communities
            </h2>

            <div className="mt-14">
              {focusAreas.map((area) => (
                <div
                  key={area.name}
                  className="grid gap-16 border-b border-border py-10 lg:grid-cols-[1fr_2fr]"
                >
                  <p className="font-serif text-xl font-bold text-foreground">{area.name}</p>
                  <p className="leading-relaxed text-muted">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: 2024 Community Impact */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              By the Numbers
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              2024 Community Impact
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {impactMetrics.map((metric) => (
                <div key={metric.label}>
                  <p className="gradient-text font-serif text-4xl font-bold sm:text-5xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Partner With Us"
          subheading="We work with community organizations, governments, and development agencies in every market where we invest."
        />
      </main>
      <Footer />
    </>
  );
}
