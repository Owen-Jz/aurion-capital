import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const aumHistory = [
  { year: "2008", aum: "$0.2B", event: "Firm founded, seed capital raised" },
  { year: "2010", aum: "$2.3B", event: "Fund I closed" },
  { year: "2013", aum: "$4.1B", event: "Infrastructure launch" },
  { year: "2015", aum: "$6.5B", event: "European credit fund" },
  { year: "2018", aum: "$10.0B", event: "$10B milestone" },
  { year: "2020", aum: "$13.2B", event: "Pandemic deployment" },
  { year: "2022", aum: "$18.4B", event: "Rate cycle navigation" },
  { year: "2024", aum: "$22.1B", event: "Global expansion" },
  { year: "2025", aum: "$24B+", event: "Current" },
];

const strategies = [
  { name: "Real Estate", grossIrr: "18.4%", netMultiple: "2.1x", vintage: "2009–2024" },
  { name: "Infrastructure", grossIrr: "15.7%", netMultiple: "1.9x", vintage: "2013–2024" },
  { name: "Private Credit", grossIrr: "12.2%", netMultiple: "1.4x", vintage: "2015–2024" },
  { name: "Insurance Solutions", grossIrr: "11.8%", netMultiple: "1.3x", vintage: "2017–2024" },
  { name: "Multi-Asset", grossIrr: "14.3%", netMultiple: "1.7x", vintage: "2019–2024" },
];

const deals = [
  {
    asset: "Real Estate",
    name: "European Logistics Portfolio",
    description:
      "Acquired a 40-asset industrial logistics portfolio across Germany, France, and the Netherlands in 2019 at a 15% discount to replacement cost, in anticipation of e-commerce-driven demand.",
    outcome: "Sold 2023. 2.8x MOIC, 24% gross IRR.",
  },
  {
    asset: "Infrastructure",
    name: "North Sea Offshore Wind",
    description:
      "Anchor investor in a 600MW offshore wind development in UK waters, structured as a 30-year revenue-backed concession with index-linked tariffs.",
    outcome: "Operational since 2022. 12% unleveraged yield on invested capital.",
  },
  {
    asset: "Private Credit",
    name: "Healthcare Services Recap",
    description:
      "Provided $340M of first-lien term debt to a regional healthcare services business undergoing an operational turnaround. Priced at SOFR+475 with a 2% floor and 1% OID.",
    outcome: "Fully repaid 2024. 13.8% realized yield.",
  },
];

export default function TrackRecordPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Our Firm"
          heading="Proven Across Cycles"
          subheading="Consistent returns generated through 2008, 2020, and 2022 — across asset classes and geographies."
          stats={[
            { value: "$24B+", label: "AUM" },
            { value: "17+", label: "Years" },
            { value: "3", label: "Major Crises Navigated" },
          ]}
        />

        {/* AUM Growth */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Our Growth
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              $24 Billion in Assets Under Management
            </h2>

            <div className="mt-14 grid gap-16 lg:grid-cols-2">
              {/* Left: narrative */}
              <div>
                <p className="leading-relaxed text-muted">
                  Aurion has grown from $180M at founding in 2008 to $24B today. That growth was
                  not the result of a single large capital raise — it was earned over seventeen
                  years through performance, investor trust, and disciplined expansion into
                  adjacent strategies.
                </p>
              </div>

              {/* Right: AUM table */}
              <div>
                <table className="w-full text-sm" aria-label="AUM growth history">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left text-xs uppercase tracking-wider text-gold font-semibold">
                        Year
                      </th>
                      <th className="pb-3 text-left text-xs uppercase tracking-wider text-gold font-semibold">
                        AUM
                      </th>
                      <th className="pb-3 text-left text-xs uppercase tracking-wider text-gold font-semibold">
                        Key Event
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {aumHistory.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-border/50"
                        style={{ color: "rgba(10,15,30,0.8)" }}
                      >
                        <td className="py-3 font-mono font-semibold text-foreground">
                          {row.year}
                        </td>
                        <td className="py-3 font-semibold text-foreground">{row.aum}</td>
                        <td className="py-3 text-muted">{row.event}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Performance by Strategy */}
        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Strategy Performance
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Consistent Returns Across Asset Classes
            </h2>
            <p className="mt-4 text-xs italic text-muted">
              Past performance is not indicative of future results. Returns shown are net of fees
              and represent fund-level performance. Individual investor results may vary.
            </p>

            <div className="mt-10">
              {/* Header row */}
              <div className="grid gap-8 border-b border-border pb-3 grid-cols-[2fr_1fr_1fr_1fr]">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Strategy
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Gross IRR
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Net Multiple
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Vintage Years
                </span>
              </div>

              {/* Data rows */}
              {strategies.map((row) => (
                <div
                  key={row.name}
                  className="grid gap-8 border-b border-border py-6 grid-cols-[2fr_1fr_1fr_1fr]"
                >
                  <span className="font-semibold text-foreground">{row.name}</span>
                  <span className="font-mono font-semibold text-foreground">{row.grossIrr}</span>
                  <span className="font-mono font-semibold text-foreground">{row.netMultiple}</span>
                  <span className="text-muted">{row.vintage}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Select Investments */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Select Investments
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              A Few Deals That Define Our Approach
            </h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {deals.map((deal) => (
                <div key={deal.name} className="rounded-lg border border-border p-8">
                  <p className="text-xs uppercase tracking-wide text-gold">{deal.asset}</p>
                  <p className="mt-2 font-serif text-xl font-bold text-foreground">{deal.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{deal.description}</p>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide text-muted">Outcome</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{deal.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Discuss Our Track Record"
          subheading="Available for institutional investors and qualified professionals."
        />
      </main>
      <Footer />
    </>
  );
}
