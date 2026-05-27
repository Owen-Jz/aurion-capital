import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const timelineMilestones = [
  {
    year: "2008",
    title: "Founded",
    description: "Established in New York with $180M seed capital from three founding partners.",
  },
  {
    year: "2010",
    title: "First Fund Close",
    description: "Raised $2.1B for Aurion Real Estate Fund I, deploying into post-crisis dislocations.",
  },
  {
    year: "2013",
    title: "Infrastructure Launch",
    description: "Expanded into infrastructure with a $1.4B mandate from two sovereign wealth funds.",
  },
  {
    year: "2016",
    title: "European Expansion",
    description: "Opened London and Frankfurt offices; closed first pan-European credit fund.",
  },
  {
    year: "2019",
    title: "$10B Milestone",
    description: "Crossed $10B AUM. Added insurance solutions and multi-asset capabilities.",
  },
  {
    year: "2022",
    title: "Global Presence",
    description: "35+ countries. Offices in New York, London, Dubai, Singapore, Sydney.",
  },
  {
    year: "2025",
    title: "$24B AUM",
    description: "Continued expansion across all five asset classes.",
  },
];

const values = [
  {
    title: "Owner-Operator Discipline",
    description:
      "We don't manage assets from a distance. We sit on boards, work alongside management, and bear the same consequences as the businesses we own.",
  },
  {
    title: "Long-Term Conviction",
    description:
      "Our average hold period is 7.2 years. We don't optimize for quarterly marks. We optimize for what the asset is worth in a full cycle.",
  },
  {
    title: "Radical Transparency",
    description:
      "We tell our investors what isn't working, not just what is. Trust is built in the bad quarters, not the good ones.",
  },
];

const offices = [
  {
    city: "New York",
    region: "Headquarters",
    address: "200 Park Avenue\n42nd Floor\nNew York, NY 10166",
  },
  {
    city: "London",
    region: "Europe",
    address: "30 St Mary Axe\n15th Floor\nLondon EC3A 8BF",
  },
  {
    city: "Dubai",
    region: "Middle East",
    address: "DIFC, Gate Building\nLevel 8\nDubai, UAE",
  },
  {
    city: "Singapore",
    region: "Asia Pacific",
    address: "One Raffles Quay\nNorth Tower, Level 25\nSingapore 048583",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Firm"
          heading={"A Disciplined Firm\nBuilt to Last"}
          subheading="Founded in 2008 on the conviction that alternative assets, owned and operated with care, outperform across every cycle."
          stats={[
            { value: "$24B+", label: "Assets Under Management" },
            { value: "35+", label: "Countries" },
            { value: "17+", label: "Years as Owner-Operators" },
          ]}
        />

        {/* Section 1: Founding Story */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Left: Story text */}
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Story
                </p>
                <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  Born in Crisis. Proven by Time.
                </h2>
                <p className="mt-6 leading-relaxed text-muted">
                  Aurion was founded in March 2008 — six months before Lehman Brothers collapsed.
                  While most firms were retreating, we were building. That timing wasn't
                  coincidence; it was thesis. We believed dislocated markets would create a
                  generation of extraordinary asset-buying opportunities for investors with capital,
                  patience, and operating expertise.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  Seventeen years later, we manage $24 billion across five asset classes in 35
                  countries. The thesis has held. The process has evolved. The discipline hasn't
                  changed.
                </p>
              </div>

              {/* Right: Timeline */}
              <div className="relative pl-6" style={{ borderLeft: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="flex flex-col gap-8">
                  {timelineMilestones.map((item) => (
                    <div key={item.year} className="relative">
                      {/* Gold dot on the timeline line */}
                      <div
                        className="absolute -left-[1.625rem] top-1 h-2 w-2 rounded-full"
                        style={{ background: "var(--gold)", opacity: 0.6 }}
                        aria-hidden="true"
                      />
                      <p className="font-mono text-sm font-semibold text-gold">{item.year}</p>
                      <p className="mt-0.5 font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Values */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Principles That Don&apos;t Change With Markets
            </h2>

            <div className="mt-14">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="grid gap-12 border-b border-border py-8 grid-cols-1 lg:grid-cols-[1fr_2fr]"
                >
                  <p className="font-serif text-xl font-bold text-foreground">{value.title}</p>
                  <p className="leading-relaxed text-muted">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Global Offices */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Where We Operate
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Present Across Five Continents
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="rounded-lg border border-border p-6"
                >
                  <p className="font-serif text-xl font-bold text-foreground">{office.city}</p>
                  <p className="mt-1 text-sm uppercase tracking-wide text-gold">{office.region}</p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Explore How We Work"
          subheading="Our investment process is designed for institutional partners who share our long-term perspective."
        />
      </main>
      <Footer />
    </>
  );
}
