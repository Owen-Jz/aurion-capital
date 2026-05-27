import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const sections = [
  {
    eyebrow: "01",
    heading: "Information We Collect",
    subsections: [
      {
        title: "Identity & KYC Data",
        body: "When you register as an investor or submit an application, we collect government-issued identification, proof of accredited investor status, tax identification numbers, beneficial ownership information, and other documentation required by applicable anti-money laundering and know-your-customer regulations. This data is collected directly from you and, where applicable, from third-party verification providers.",
      },
      {
        title: "Usage & Platform Data",
        body: "We collect information about how you interact with the Platform, including pages visited, documents accessed, investment activities, session timestamps, and feature usage. This data is collected automatically through server logs and first-party analytics.",
      },
      {
        title: "Device & Technical Data",
        body: "We collect IP addresses, browser type and version, operating system, device identifiers, and cookie data. This information is used to maintain security, detect unauthorized access, and optimize the Platform experience.",
      },
    ],
  },
  {
    eyebrow: "02",
    heading: "How We Use Your Information",
    subsections: [
      {
        title: "Investment Administration",
        body: "We use your personal data to onboard you as an investor, process subscriptions and redemptions, maintain investor registers, calculate and distribute returns, and fulfill all obligations arising from your investment relationship with Aurion Capital Group LLC.",
      },
      {
        title: "Regulatory Compliance",
        body: "We are required by law to collect, verify, retain, and in some cases report certain investor data under the Bank Secrecy Act, USA PATRIOT Act, FATCA, CRS, and other applicable federal and state regulations. We will use your data to the extent required to satisfy these obligations.",
      },
      {
        title: "Communications",
        body: "We use your contact information to send capital call notices, distribution notices, quarterly reports, tax documents, and material updates relating to your investments. We may also send you information about new investment opportunities. You may opt out of marketing communications at any time by contacting us at privacy@aurioncapital.com.",
      },
    ],
  },
  {
    eyebrow: "03",
    heading: "Data Sharing",
    subsections: [
      {
        title: "Service Providers",
        body: "We share investor data with vetted third-party service providers who perform services on our behalf, including fund administrators, custodians, transfer agents, tax advisors, legal counsel, IT service providers, and identity verification platforms. These providers are contractually prohibited from using your data for any purpose other than performing services for Aurion.",
      },
      {
        title: "Regulatory & Legal Disclosures",
        body: "We may disclose your personal data to regulators, law enforcement agencies, courts, or other government authorities where required by applicable law, court order, or regulatory request. We will notify you of such disclosures where legally permitted to do so.",
      },
      {
        title: "We Never Sell Your Data",
        body: "Aurion Capital Group does not sell, rent, or trade personal data to third parties for their own marketing or commercial purposes. Your data is used solely in connection with your investment relationship with us and the administration of the Platform.",
      },
    ],
  },
  {
    eyebrow: "04",
    heading: "Data Security",
    subsections: [
      {
        title: "Technical Safeguards",
        body: "All data transmitted to or from the Platform is encrypted using 256-bit SSL/TLS. Data at rest is encrypted using AES-256. We employ multi-factor authentication for all privileged access to investor data systems.",
      },
      {
        title: "Access Controls",
        body: "Access to personal data is restricted to Aurion personnel and authorized service providers who require access to perform their job functions. All access is governed by role-based permissions and logged for audit purposes. We conduct periodic access reviews and revoke access promptly upon employee departure.",
      },
    ],
  },
  {
    eyebrow: "05",
    heading: "Your Rights",
    subsections: [
      {
        title: "Access & Correction",
        body: "You have the right to request a copy of the personal data we hold about you and to request correction of any inaccurate or incomplete information. Requests may be submitted to privacy@aurioncapital.com. We will respond within 30 days.",
      },
      {
        title: "Deletion & Restriction",
        body: "You may request deletion of your personal data or restriction of its processing where we are not legally required to retain it. Note that certain data must be retained for periods mandated by law (including AML records for a minimum of five years) and cannot be deleted upon request during that period.",
      },
      {
        title: "Residents of California",
        body: "California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know, the right to delete, and the right to opt out of the sale of personal information. We do not sell personal information. To submit a CCPA request, contact privacy@aurioncapital.com.",
      },
    ],
  },
];

export const metadata = {
  title: "Privacy Policy — Aurion Capital Group",
  description:
    "How Aurion Capital Group collects, uses, and protects investor data on the Aurion Platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Legal"
          heading="Privacy Policy"
          subheading="This policy describes how Aurion Capital Group LLC collects, uses, shares, and protects personal data in connection with the Aurion investor platform. Effective January 1, 2026."
        />

        {/* Introduction */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Overview
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Your Privacy Is a Fiduciary Matter
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                Aurion Capital Group LLC (&ldquo;Aurion,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Aurion investor platform (the &ldquo;Platform&rdquo;) for use by qualified and accredited investors. We handle personal data with the same discipline we apply to capital allocation: deliberately, with documented controls, and with a clear understanding of our obligations to the individuals whose data we hold.
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                This Privacy Policy applies to all personal data collected through the Platform, our website at aurioncapital.com, and any written or digital communications with Aurion. By accessing the Platform, you acknowledge that you have read and understood this policy.
              </p>
              <p className="mt-5 text-sm text-muted">
                <span className="text-foreground font-medium">Effective Date:</span> January 1, 2026 &nbsp;&middot;&nbsp;
                <span className="text-foreground font-medium">Last Updated:</span> January 1, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Main sections */}
        {sections.map((section, sIdx) => (
          <section
            key={section.eyebrow}
            className={`border-t border-border py-20 ${sIdx % 2 === 0 ? "bg-surface" : "bg-background"}`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
                {/* Left: section label */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                </div>

                {/* Right: subsections */}
                <div className="flex flex-col gap-10">
                  {section.subsections.map((sub) => (
                    <div key={sub.title}>
                      <p className="font-serif text-lg font-bold text-foreground">{sub.title}</p>
                      <div
                        className="mt-2 mb-4 h-px w-8"
                        style={{ background: "rgba(201,168,76,0.35)" }}
                        aria-hidden="true"
                      />
                      <p className="leading-relaxed text-muted">{sub.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Retention & Cookies */}
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">06</p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Retention & Cookies
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                <div>
                  <p className="font-serif text-lg font-bold text-foreground">Data Retention</p>
                  <div
                    className="mt-2 mb-4 h-px w-8"
                    style={{ background: "rgba(201,168,76,0.35)" }}
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-muted">
                    We retain personal data for as long as your investor account remains active and for as long thereafter as required by law or necessary to fulfill legitimate business purposes. AML and KYC records are retained for a minimum of five years following the closure of an account, consistent with federal requirements. Tax records are retained for seven years. You may request information about the specific retention schedule applicable to your data by contacting us at privacy@aurioncapital.com.
                  </p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-foreground">Cookies</p>
                  <div
                    className="mt-2 mb-4 h-px w-8"
                    style={{ background: "rgba(201,168,76,0.35)" }}
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-muted">
                    The Platform uses strictly necessary session cookies to maintain authenticated sessions. We do not use third-party advertising cookies or behavioral tracking cookies. Analytics data is collected using first-party methods only. You may disable cookies in your browser settings; however, doing so will prevent you from logging in to the Platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for privacy */}
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">07</p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Privacy Contact
                </h2>
              </div>
              <div>
                <p className="leading-relaxed text-muted">
                  Questions, requests, or complaints relating to this Privacy Policy should be directed to our Privacy Officer:
                </p>
                <div className="mt-6 rounded-lg border border-border bg-surface p-6">
                  <p className="font-semibold text-foreground">Privacy Officer</p>
                  <p className="mt-1 text-sm text-muted">Aurion Capital Group LLC</p>
                  <p className="mt-1 text-sm text-muted">200 Park Avenue, 42nd Floor</p>
                  <p className="mt-1 text-sm text-muted">New York, NY 10166</p>
                  <p className="mt-3 text-sm">
                    <a
                      href="mailto:privacy@aurioncapital.com"
                      className="text-gold hover:underline transition-colors"
                    >
                      privacy@aurioncapital.com
                    </a>
                  </p>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  We reserve the right to update this Privacy Policy at any time. Material changes will be communicated to registered investors via the Platform or by email. Continued use of the Platform following notice of changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Questions About Your Data?"
          subheading="Our Privacy Officer is available to address questions about how your personal information is handled."
        />
      </main>
      <Footer />
    </>
  );
}
