import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const sections = [
  {
    eyebrow: "01",
    heading: "Acceptance of Terms",
    body: [
      "By accessing or using the Aurion Capital Group investor platform (the \"Platform\"), you agree to be bound by these Terms of Use (\"Terms\") and all policies incorporated by reference, including the Privacy Policy. If you do not agree to these Terms, you must immediately cease using the Platform.",
      "These Terms constitute a binding legal agreement between you and Aurion Capital Group LLC, a Delaware limited liability company (\"Aurion,\" \"we,\" \"us,\" or \"our\"). Your use of the Platform does not create any partnership, joint venture, employment, or agency relationship between you and Aurion.",
      "We reserve the right to modify these Terms at any time. We will notify registered users of material changes via the Platform or by email. Continued use of the Platform following notice of changes constitutes your acceptance of the updated Terms. The version date at the top of this page indicates when these Terms were last revised.",
    ],
  },
  {
    eyebrow: "02",
    heading: "Use of the Platform",
    body: [
      "The Platform is made available exclusively to persons who qualify as \"accredited investors\" as defined under Rule 501(a) of Regulation D promulgated under the Securities Act of 1933, as amended, or who otherwise satisfy the eligibility criteria specified at registration. By registering, you represent and warrant that you meet the applicable eligibility requirements and will promptly notify Aurion if your status changes.",
      "You agree to use the Platform solely for lawful purposes and in accordance with these Terms. You shall not: (a) access or attempt to access any account or system other than your own; (b) reverse engineer, decompile, or otherwise attempt to derive source code from the Platform; (c) introduce viruses, malware, or other harmful code; (d) scrape, harvest, or systematically extract data from the Platform; (e) use automated tools (bots, spiders, crawlers) to access the Platform without our express written consent; or (f) take any action that unreasonably burdens or impairs the Platform's infrastructure.",
      "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to notify Aurion immediately at support@aurioncapital.com if you believe your account has been compromised. We are not liable for losses arising from unauthorized use of your credentials where you have failed to take reasonable precautions.",
    ],
  },
  {
    eyebrow: "03",
    heading: "Intellectual Property",
    body: [
      "All content on the Platform, including but not limited to text, graphics, logos, icons, images, data compilations, software, and the overall design and arrangement thereof, is the proprietary property of Aurion Capital Group LLC or its licensors and is protected by U.S. and international copyright, trademark, and other intellectual property laws.",
      "We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform solely for your personal investment-related purposes as contemplated by your investor agreement with Aurion. No other rights are granted. The \"Aurion,\" \"Aurion Capital,\" and \"Aurion Capital Group\" names and marks, and all associated logos, are registered trademarks of Aurion Capital Group LLC. Nothing in these Terms should be construed as granting any license or right to use any trademark without our prior written consent.",
      "If you provide feedback, suggestions, or other input regarding the Platform, you grant us a perpetual, irrevocable, royalty-free license to use and incorporate such input into the Platform or our services without obligation to you.",
    ],
  },
  {
    eyebrow: "04",
    heading: "No Investment Advice",
    body: [
      "The content available on the Platform, including investment opportunity descriptions, performance data, market commentary, and analytical tools, is provided for informational purposes only and does not constitute investment advice, a recommendation, or a solicitation to buy or sell any security or investment product.",
      "Past performance information presented on the Platform is not indicative of future results. All investments involve risk, including the possible loss of the entire principal invested. Private market investments are illiquid, speculative, and suitable only for investors who can bear the loss of their entire investment. Before making any investment decision, you should consult with your own legal, tax, and financial advisors.",
      "Registration as an investment adviser does not imply a certain level of skill or training. Aurion Capital Group LLC is a registered investment adviser with the U.S. Securities and Exchange Commission. Nothing on the Platform constitutes a guarantee of any specific return or outcome.",
    ],
  },
  {
    eyebrow: "05",
    heading: "Limitation of Liability",
    body: [
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, AURION AND ITS OFFICERS, DIRECTORS, EMPLOYEES, MEMBERS, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES — INCLUDING LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, SERVICE INTERRUPTION, SYSTEM FAILURE, OR THE COST OF SUBSTITUTE SERVICES — ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, OR INABILITY TO USE, THE PLATFORM, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      "IN NO EVENT SHALL AURION'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE PLATFORM EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU TO AURION IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM OR (B) ONE HUNDRED DOLLARS ($100). SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.",
      "You agree to indemnify, defend, and hold harmless Aurion and its affiliates from any claims, liabilities, damages, and expenses (including reasonable attorneys' fees) arising from your violation of these Terms, your use of the Platform, or any third-party claim relating to your conduct on the Platform.",
    ],
  },
  {
    eyebrow: "06",
    heading: "Governing Law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms or the Platform shall be resolved exclusively in the state or federal courts sitting in New Castle County, Delaware, and you hereby irrevocably consent to the personal jurisdiction and venue of those courts.",
      "Notwithstanding the foregoing, Aurion reserves the right to seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of Aurion's intellectual property rights or other proprietary rights.",
      "If any provision of these Terms is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
    ],
  },
  {
    eyebrow: "07",
    heading: "Changes to Terms",
    body: [
      "We may revise these Terms at any time in our sole discretion. When we make material changes, we will update the effective date at the top of this page and, where appropriate, notify registered investors via email or a notice posted within the Platform.",
      "Your continued access to or use of the Platform after the effective date of revised Terms constitutes your binding acceptance of the changes. If you do not agree to the revised Terms, you must stop using the Platform and may request account closure by contacting us at legal@aurioncapital.com.",
    ],
  },
];

export const metadata = {
  title: "Terms of Use — Aurion Capital Group",
  description:
    "Terms and conditions governing access to and use of the Aurion Capital Group investor platform.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Legal"
          heading="Terms of Use"
          subheading="These Terms govern your access to and use of the Aurion Capital Group investor platform. Please read them carefully before using the Platform. Effective January 1, 2026."
        />

        {/* Header notice */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Important Notice
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Read Before Accessing the Platform
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                This Platform is operated by Aurion Capital Group LLC and is intended solely for qualified persons who have completed Aurion&rsquo;s investor onboarding process. Unauthorized access is strictly prohibited. The information available on this Platform relates to private investment vehicles and is not suitable for the general public.
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                By registering for or accessing the Platform, you confirm that you are an accredited investor as defined under applicable U.S. securities law, that you are accessing this Platform in a jurisdiction where doing so is lawful, and that you have the legal capacity to enter into binding agreements.
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
                <span>
                  <span className="font-medium text-foreground">Effective Date:</span> January 1, 2026
                </span>
                <span>
                  <span className="font-medium text-foreground">Last Updated:</span> January 1, 2026
                </span>
                <span>
                  <span className="font-medium text-foreground">Governing Law:</span> State of Delaware
                </span>
              </div>
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

                {/* Right: paragraphs */}
                <div className="flex flex-col gap-5">
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Contact for legal */}
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">08</p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Contact
                </h2>
              </div>
              <div>
                <p className="leading-relaxed text-muted">
                  Questions or notices regarding these Terms should be directed to our Legal department:
                </p>
                <div className="mt-6 rounded-lg border border-border bg-background p-6">
                  <p className="font-semibold text-foreground">General Counsel</p>
                  <p className="mt-1 text-sm text-muted">Aurion Capital Group LLC</p>
                  <p className="mt-1 text-sm text-muted">200 Park Avenue, 42nd Floor</p>
                  <p className="mt-1 text-sm text-muted">New York, NY 10166</p>
                  <div className="mt-3 flex flex-col gap-1 text-sm">
                    <a
                      href="mailto:legal@aurioncapital.com"
                      className="text-gold hover:underline transition-colors"
                    >
                      legal@aurioncapital.com
                    </a>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  For privacy-related inquiries, please contact our Privacy Officer at{" "}
                  <a
                    href="mailto:privacy@aurioncapital.com"
                    className="text-gold hover:underline transition-colors"
                  >
                    privacy@aurioncapital.com
                  </a>
                  . For investor relations inquiries, contact{" "}
                  <a
                    href="mailto:ir@aurioncapital.com"
                    className="text-gold hover:underline transition-colors"
                  >
                    ir@aurioncapital.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Questions About Our Platform Terms?"
          subheading="Our legal and investor relations teams are available to address questions about your obligations and rights as an Aurion investor."
        />
      </main>
      <Footer />
    </>
  );
}
