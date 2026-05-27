import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const disclosures = [
  {
    id: "regulatory-status",
    title: "Regulatory Status",
    body: [
      "Aurion Capital Group LLC (the \"Company\") is not registered as an investment adviser under the Investment Advisers Act of 1940, as amended, and does not hold itself out as providing investment advisory services to the public. The Company operates pursuant to applicable exemptions from registration.",
      "Securities offered through the Aurion Capital Group platform are offered in reliance on exemptions from registration under the Securities Act of 1933, as amended, including but not limited to Regulation D, Rule 506(b) and Rule 506(c). Such securities have not been registered with the U.S. Securities and Exchange Commission (\"SEC\") or any state securities regulatory authority, nor has the SEC or any state authority passed upon or endorsed the merits of any offering made available through the platform.",
      "The Company is not a broker-dealer registered under Section 15 of the Securities Exchange Act of 1934, as amended, and does not act as a broker-dealer in connection with any securities transactions on the platform.",
    ],
  },
  {
    id: "no-investment-advice",
    title: "No Investment Advice",
    body: [
      "Nothing contained on this platform, in any offering materials, in any communications from the Company, or in any other content made available by Aurion Capital Group constitutes investment advice, financial advice, trading advice, legal advice, tax advice, or any other form of professional advice.",
      "The Company does not recommend or endorse any particular investment, investment strategy, security, or financial product. All information provided is for informational purposes only and should not be construed as a recommendation to purchase, sell, or hold any security.",
      "Before making any investment decision, prospective investors are strongly encouraged to consult with their own legal counsel, tax advisers, financial advisers, and other professionals regarding the suitability of any investment in light of their individual financial circumstances, investment objectives, tax situation, and risk tolerance.",
    ],
  },
  {
    id: "risk-disclosure",
    title: "Risk Disclosure",
    body: [
      "All investments involve risk, including the possible loss of the entire amount invested. Private securities and alternative investments are speculative and involve a high degree of risk. Investors could lose all or a substantial portion of their investment.",
      "Past performance is not indicative of future results. Projected returns, target yields, and historical performance metrics presented on the platform are not guarantees of future performance and may not be achieved. Actual results may differ materially from any forward-looking projections.",
      "Private securities are generally illiquid investments. There is no established trading market for such securities, and investors should be prepared to hold their investment for an extended period — potentially the entire term of the investment — without the ability to liquidate their position. Transferability may be further restricted by applicable securities laws and the terms of the governing documents.",
      "Investments in real estate, private credit, infrastructure, and other alternative asset classes are subject to risks including, but not limited to, market risk, credit risk, liquidity risk, interest rate risk, operational risk, regulatory risk, and macroeconomic risk. The value of investments may fluctuate and may be affected by factors outside the Company's control.",
    ],
  },
  {
    id: "accredited-investors",
    title: "Accredited Investors Only",
    body: [
      "Access to investment opportunities on this platform is restricted exclusively to \"accredited investors\" as that term is defined under Rule 501(a) of Regulation D promulgated under the Securities Act of 1933. Prospective investors must satisfy the applicable accreditation criteria and may be required to provide documentation to verify their status.",
      "Accredited investor status under Rule 501(a) includes, among others: individuals with a net worth (or joint net worth with a spouse or spousal equivalent) exceeding $1,000,000, excluding the value of the primary residence; individuals with income exceeding $200,000 in each of the two most recent years (or joint income exceeding $300,000) with a reasonable expectation of the same in the current year; and certain entities meeting applicable asset or ownership thresholds.",
      "By accessing investment materials on this platform, each user represents and warrants that they qualify as an accredited investor and are not accessing the platform in a jurisdiction where the offering or sale of securities is prohibited. The Company reserves the right to verify accredited investor status and to restrict access to any person who does not qualify.",
    ],
  },
  {
    id: "forward-looking-statements",
    title: "Forward-Looking Statements",
    body: [
      "Certain statements, projections, estimates, and other information contained on this platform and in offering materials may constitute \"forward-looking statements\" within the meaning of applicable securities laws. These include, without limitation, projected returns, target IRRs, estimated timelines, expected distributions, and performance forecasts.",
      "Forward-looking statements are based on assumptions and estimates that the Company believes to be reasonable at the time of preparation but are inherently uncertain and subject to change. Such statements are not guarantees of future performance and actual results, events, and conditions may differ materially from those anticipated.",
      "Factors that could cause actual results to differ materially include changes in market conditions, economic downturns, changes in applicable laws or regulations, competition, the availability and cost of financing, the performance of underlying portfolio companies or assets, and other risks described in the applicable offering documents. Investors are cautioned not to place undue reliance on any forward-looking statement.",
    ],
  },
  {
    id: "anti-money-laundering",
    title: "Anti-Money Laundering",
    body: [
      "The Company is committed to full compliance with the Bank Secrecy Act (BSA), the USA PATRIOT Act, and all applicable anti-money laundering (AML) laws and regulations. The Company has established and maintains an AML compliance program that includes, at a minimum, written policies and procedures, a designated compliance officer, ongoing employee training, and independent testing.",
      "All prospective investors are subject to Know Your Customer (KYC) and AML screening prior to being permitted to invest. The Company collects and verifies identification information for all investors and conducts screening against applicable sanctions lists maintained by the U.S. Department of the Treasury's Office of Foreign Assets Control (OFAC) and other relevant authorities.",
      "The Company reserves the right to decline or terminate any investment relationship where it has reason to believe that an investor's funds may be derived from or connected to illegal activity, or where an investor fails to provide satisfactory KYC/AML documentation. The Company may be required to report suspicious activity to relevant authorities pursuant to applicable law.",
    ],
  },
  {
    id: "finra-sipc",
    title: "FINRA / SIPC",
    body: [
      "Aurion Capital Group LLC is not a member of the Financial Industry Regulatory Authority (FINRA) or the Securities Investor Protection Corporation (SIPC). Securities offered through the platform are not covered by SIPC protection.",
      "SIPC protects customers of FINRA-member broker-dealers against the loss of cash and securities in the event of a firm's financial failure. Because the Company is not a FINRA member and is not a registered broker-dealer, investors on the platform do not have access to SIPC protection with respect to securities acquired through the platform.",
      "Investors are encouraged to independently verify the registration status of any financial professional or entity through FINRA BrokerCheck (www.finra.org/brokercheck) and the SEC's Investment Adviser Public Disclosure database (www.adviserinfo.sec.gov) before engaging in any investment activity.",
    ],
  },
];

export default function DisclosuresPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Legal"
          heading="Regulatory Disclosures"
          subheading="Important information regarding Aurion Capital Group's regulatory status, investor protections, and the risks associated with private securities offerings on this platform."
        />

        {/* Effective date + nav strip */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">Effective Date:</span>{" "}
                January 1, 2026
              </p>
              <nav
                aria-label="Disclosure sections"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {disclosures.map((d) => (
                  <a
                    key={d.id}
                    href={`#${d.id}`}
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
                  >
                    {d.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Disclosure sections */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {disclosures.map((disclosure, index) => (
                <div
                  key={disclosure.id}
                  id={disclosure.id}
                  className={`${index !== 0 ? "mt-16 border-t border-border pt-16" : ""}`}
                >
                  {/* Section heading */}
                  <div className="mb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                      {disclosure.title}
                    </h2>
                  </div>

                  {/* Body paragraphs */}
                  <div className="space-y-4">
                    {disclosure.body.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="leading-relaxed text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General disclaimer box */}
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-lg border border-border p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                General Disclaimer
              </p>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Please Read This Notice Carefully
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                The information contained on this platform is provided for general informational
                purposes only and does not constitute an offer to sell or the solicitation of an
                offer to purchase any security. Any such offer or solicitation will be made only
                by means of the applicable confidential offering memorandum and subscription
                documents, which should be read in their entirety before making any investment
                decision.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                This platform is intended solely for use by persons who qualify as accredited
                investors under applicable U.S. federal securities laws. By accessing this
                platform you confirm that you qualify as an accredited investor and acknowledge
                that the securities offered herein have not been registered under the Securities
                Act of 1933, as amended, or any state securities laws, and may not be resold or
                transferred without registration or an applicable exemption therefrom.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                These disclosures are subject to change without notice. Aurion Capital Group
                reserves the right to update this page at any time. Continued use of the
                platform constitutes acceptance of the most current version of these disclosures.
                For questions regarding these disclosures please contact{" "}
                <a
                  href="mailto:legal@aurioncapital.com"
                  className="text-gold underline-offset-2 transition-colors hover:underline"
                >
                  legal@aurioncapital.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Questions About Our Legal Framework?"
          subheading="Our compliance and investor relations teams are available to answer questions about the regulatory structure of the platform."
        />
      </main>
      <Footer />
    </>
  );
}
