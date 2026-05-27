import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const principles = [
  {
    number: "1",
    title: "Do No Harm First",
    description:
      "Before we ask what returns an investment will generate, we ask what harm it could cause. We exclude tobacco, cluster munitions, and thermal coal extraction categorically.",
  },
  {
    number: "2",
    title: "Stakeholder Capitalism",
    description:
      "Returns to our investors are the goal. But the people who work in our portfolio companies, live near our assets, and depend on our infrastructure are also stakeholders. Their outcomes matter.",
  },
  {
    number: "3",
    title: "Long-Term Accountability",
    description:
      "Short-term extraction destroys long-term value. We hold assets for 7+ years on average because we are accountable for what they become, not just what they sold for.",
  },
  {
    number: "4",
    title: "Active Ownership",
    description:
      "Voting rights and board representation are not formalities. We use them. On governance, labor standards, and climate risk, we take positions and hold them.",
  },
  {
    number: "5",
    title: "Honest Reporting",
    description:
      "We report ESG failures alongside ESG successes. A firm that only reports the good is not a firm that takes responsible investing seriously.",
  },
];

const exclusions = [
  "Tobacco manufacturing",
  "Cluster munitions and landmines",
  "Thermal coal extraction and coal power generation",
  "Predatory lending and payday lending",
  "Private prison operations",
  "Gambling — casinos and online gambling operations",
  "Adult entertainment",
  "Unregulated cryptocurrency operations",
];

const commitments = [
  {
    org: "UN Principles for Responsible Investment",
    since: "Since 2014",
    description:
      "Signatory to the PRI, the world's leading responsible investment initiative. Annual assessment: A rating.",
  },
  {
    org: "Paris Agreement Alignment",
    since: "Since 2021",
    description:
      "Committed to aligning our portfolio with the Paris Agreement's 1.5°C pathway by 2030 across all Scope 1 and 2 emissions.",
  },
  {
    org: "Task Force on Climate-related Disclosures",
    since: "Since 2020",
    description:
      "Full TCFD adoption across all reporting, including scenario analysis for climate-related financial risks.",
  },
  {
    org: "Net Zero Asset Managers",
    since: "Since 2022",
    description:
      "Member of the NZAM initiative, committing to net-zero emissions across our portfolio by 2050 at the latest.",
  },
];

export default function ResponsibleInvestingPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Impact"
          heading="Responsible Investing"
          subheading="Capital directed responsibly compounds differently. We believe that good investment practice and good citizenship are the same thing."
        />

        {/* Section 1: Our Principles */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Guiding Principles
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              How We Think About Responsible Capital
            </h2>

            <div className="mt-14">
              {principles.map((principle) => (
                <div
                  key={principle.number}
                  className="grid grid-cols-[3rem_1fr] border-b border-border py-8"
                >
                  <p
                    className="font-mono text-xl font-semibold pt-0.5"
                    style={{ color: "rgba(201,168,76,0.5)" }}
                  >
                    {principle.number}
                  </p>
                  <div>
                    <p className="font-serif text-lg font-bold text-foreground">
                      {principle.title}
                    </p>
                    <p className="mt-2 leading-relaxed text-muted">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Exclusions */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Exclusions
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              What We Don&apos;t Invest In
            </h2>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted">
              Our exclusion policy is reviewed annually by our ESG Committee and approved by our
              Investment Committee. The following activities are categorically excluded regardless
              of financial returns.
            </p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {exclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <span
                    className="mt-0.5 shrink-0 font-semibold"
                    style={{ color: "rgba(248,113,113,0.6)" }}
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: Commitments */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Commitments
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              What We&apos;ve Signed
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <div
                  key={commitment.org}
                  className="rounded-xl border border-border p-8"
                >
                  <div
                    className="h-8 w-8 rounded"
                    style={{ background: "rgba(201,168,76,0.1)" }}
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-semibold text-foreground">{commitment.org}</p>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--gold)" }}
                  >
                    {commitment.since}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {commitment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Responsible Capital at Work"
          subheading="Contact our ESG team to discuss our responsible investment practices and reporting."
        />
      </main>
      <Footer />
    </>
  );
}
