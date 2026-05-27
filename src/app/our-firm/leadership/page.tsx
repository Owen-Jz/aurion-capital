import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const leaders = [
  {
    name: "James Harrington",
    title: "Founder & CEO",
    bio: "Thirty years in alternative assets across three continents. Previously Managing Director at Goldman Sachs Real Estate. Led $14B in direct investments since founding Aurion in 2008.",
    initial: "J",
  },
  {
    name: "Sarah Chen",
    title: "President & CIO",
    bio: "Former head of alternatives at CalPERS. Built Aurion's infrastructure platform from $0 to $6.3B. Board member, Global Infrastructure Hub.",
    initial: "S",
  },
  {
    name: "Michael Torres",
    title: "Managing Director, Real Estate",
    bio: "Led development and acquisition of over 200 properties across 14 countries. Previously at Brookfield Asset Management for twelve years.",
    initial: "M",
  },
  {
    name: "Priya Kapoor",
    title: "Managing Director, Private Credit",
    bio: "Structured over $8B in direct lending and mezzanine transactions. Background in leveraged finance at JPMorgan before joining Aurion in 2013.",
    initial: "P",
  },
  {
    name: "David Okafor",
    title: "Managing Director, Insurance Solutions",
    bio: "Built Aurion's insurance solutions practice from inception. Former CIO at a major European reinsurer. Fluent in NAIC, Solvency II, and Bermuda Form.",
    initial: "D",
  },
  {
    name: "Claire Beaumont",
    title: "CFO & COO",
    bio: "Oversees finance, operations, risk, and compliance across all Aurion funds and entities. Previously CFO of a $15B credit-focused alternative manager.",
    initial: "C",
  },
  {
    name: "Wei Zhang",
    title: "Managing Director, Asia Pacific",
    bio: "Based in Singapore. Leads Aurion's APAC strategy across real estate and infrastructure. Previously with GIC and Temasek Holdings.",
    initial: "W",
  },
  {
    name: "Elena Marchetti",
    title: "General Counsel",
    bio: "Oversees all legal, regulatory, and compliance matters globally. Former partner at Skadden, Arps, Slate, Meagher & Flom.",
    initial: "E",
  },
];

const advisors = [
  {
    name: "Lord Jonathan Templeton",
    title: "Senior Advisor, European Markets",
    institution: "Former Bank of England",
  },
  {
    name: "Dr. Amara Diallo",
    title: "Advisor, Emerging Markets",
    institution: "Former World Bank",
  },
  {
    name: "Robert Nakamura",
    title: "Advisor, Japan & Korea",
    institution: "Former Minister of Finance",
  },
  {
    name: "Susan Griffith",
    title: "Advisor, ESG & Governance",
    institution: "Former UN Principles for Responsible Investment",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Firm"
          heading="The Team Behind Aurion"
          subheading="Senior professionals with decades of experience across alternative assets, operations, and capital markets."
        />

        {/* Leadership Team */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Senior Leadership
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Partners &amp; Managing Directors
            </h2>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((person) => (
                <div key={person.name}>
                  {/* Image placeholder */}
                  <div
                    className="relative w-full overflow-hidden rounded-lg"
                    style={{
                      aspectRatio: "3/4",
                      background: "linear-gradient(to bottom right, #1a2a4a, #0a0f1e)",
                    }}
                  >
                    <span
                      className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-bold select-none"
                      style={{ color: "rgba(201,168,76,0.3)" }}
                      aria-hidden="true"
                    >
                      {person.initial}
                    </span>
                  </div>

                  <p className="mt-4 font-serif text-lg font-bold text-foreground">{person.name}</p>
                  <p className="mt-1 text-sm uppercase tracking-wide text-gold">{person.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
                  <a
                    href="#"
                    className="mt-3 inline-block text-xs text-accent-light transition-colors hover:text-gold"
                    aria-label={`LinkedIn profile for ${person.name}`}
                  >
                    LinkedIn &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory Board */}
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Advisory Board
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {advisors.map((advisor) => (
                <div key={advisor.name}>
                  <p className="font-semibold text-foreground">{advisor.name}</p>
                  <p className="mt-1 text-sm text-muted">{advisor.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-gold">
                    {advisor.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
