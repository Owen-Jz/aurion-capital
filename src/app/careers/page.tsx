import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const openRoles = [
  {
    title: "Senior Investment Analyst",
    department: "Investments",
    location: "New York",
    description:
      "Lead quantitative and qualitative due diligence on prospective acquisitions across our core asset classes. You will work directly with senior portfolio managers to evaluate risk-adjusted returns and structure investment recommendations for the Investment Committee.",
  },
  {
    title: "Infrastructure Associate",
    department: "Infrastructure",
    location: "New York",
    description:
      "Support origination, underwriting, and ongoing asset management across Aurion's infrastructure portfolio, with a focus on digital infrastructure and energy transition assets. The role requires strong financial modelling capability and prior exposure to long-dated, capital-intensive assets.",
  },
  {
    title: "Portfolio Manager — Real Estate",
    department: "Real Estate",
    location: "New York",
    description:
      "Own the performance of a multi-asset real estate portfolio spanning core-plus and value-add strategies across the Americas. You will drive asset-level strategy, capital deployment decisions, and investor reporting for one of our flagship funds.",
  },
  {
    title: "Head of Investor Relations",
    department: "Investor Relations",
    location: "New York",
    description:
      "Serve as the primary relationship manager for a global LP base including sovereign wealth funds, endowments, and family offices. This senior role owns fundraising strategy, LP communications, and the annual investor conference across all Aurion vehicles.",
  },
  {
    title: "Compliance Officer",
    department: "Legal & Compliance",
    location: "New York",
    description:
      "Maintain and enhance Aurion's compliance programme across SEC-registered entities, ensuring adherence to applicable regulations and firm policies. You will partner closely with investment, legal, and operations teams to manage regulatory filings, training, and internal controls.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Careers"
          heading="Build Something That Lasts"
          subheading="Join a team of investment professionals who believe that disciplined ownership, long-term thinking, and intellectual honesty are the foundations of enduring returns."
        />

        {/* Open Roles */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Open Positions
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Current Opportunities
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              We hire selectively and retain rigorously. Every role at Aurion is an invitation to do
              the best work of your career alongside people who have the same standard.
            </p>

            <div className="mt-14 flex flex-col gap-6">
              {openRoles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-lg border border-border bg-surface p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {role.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="inline-block rounded-sm border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                          {role.department}
                        </span>
                        <span className="text-xs text-muted">{role.location}</span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex shrink-0 items-center justify-center rounded-sm border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/70 transition-all duration-300 hover:border-gold/40 hover:text-foreground"
                    >
                      Apply
                    </Link>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Aurion */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Why Aurion
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              An Environment Built for Exceptional Work
            </h2>

            <div className="mt-14">
              {[
                {
                  title: "Meritocracy Without Politics",
                  description:
                    "Promotion and compensation at Aurion are driven entirely by contribution. We have no legacy titles and no entitlement culture — only outcomes that speak for themselves.",
                },
                {
                  title: "Access Across the Firm",
                  description:
                    "Junior professionals sit alongside senior partners in deal meetings and LP calls. There are no siloed hierarchies — every team member is expected to form and defend a view.",
                },
                {
                  title: "Long-Term Orientation",
                  description:
                    "Our carry structures and retention programmes are designed for decades, not years. We want people who are building a career here, and we compensate accordingly.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="grid gap-12 border-b border-border py-8 grid-cols-1 lg:grid-cols-[1fr_2fr]"
                >
                  <p className="font-serif text-xl font-bold text-foreground">{item.title}</p>
                  <p className="leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* No Suitable Role */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-lg border border-border p-8 sm:p-10 lg:p-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Don&apos;t See the Right Fit?
              </p>
              <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                We&apos;re Always Looking for Exceptional People
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                If you don&apos;t see a role that matches your background, we still want to hear from
                you. Send us a brief note outlining your experience and what you are looking for —
                our talent team reviews every message.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-foreground shadow-[0_2px_12px_rgba(201,168,76,0.25)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] active:scale-[0.97]"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Invest in the Right Team"
          subheading="The strength of our portfolio starts with the strength of our people. We'd welcome the opportunity to tell you more."
        />
      </main>
      <Footer />
    </>
  );
}
