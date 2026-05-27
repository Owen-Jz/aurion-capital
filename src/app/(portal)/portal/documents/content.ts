export interface DocSection {
  heading?: string;
  body?: string;
  items?: string[];
  note?: string;
}

export interface InvestorDocument {
  id: string;
  title: string;
  subtitle: string;
  category: "Agreement" | "Disclosure" | "Platform Policy";
  effectiveDate: string;
  requiresSignature: boolean;
  description: string;
  sections: DocSection[];
}

export const DOCUMENTS: InvestorDocument[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // 1. SUBSCRIPTION AGREEMENT
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: "subscription-agreement",
    title: "Investor Subscription Agreement",
    subtitle: "Aurion Capital Group — Private Placement Subscription",
    category: "Agreement",
    effectiveDate: "1 January 2026",
    requiresSignature: true,
    description:
      "The binding agreement under which you subscribe for securities offered through the Aurion Capital platform. Must be signed before any investment is processed.",
    sections: [
      {
        heading: "1. Parties",
        body: "This Investor Subscription Agreement (“Agreement”) is entered into between Aurion Capital Group LLC, a Delaware limited liability company (“Company”), and the undersigned investor (“Investor”). By signing this Agreement, Investor agrees to subscribe for securities in an investment opportunity made available through the Aurion Capital investor portal (the “Platform”) on the terms set out herein.",
      },
      {
        heading: "2. Subscription",
        body: "Investor hereby subscribes for the number of shares or units (“Securities”) corresponding to the investment tier selected through the Platform. The subscription price is the total amount displayed and confirmed by the Investor at the time of application (the “Subscription Amount”). This Agreement is not binding on the Company until it has been reviewed, accepted, and countersigned by an authorised representative of Aurion Capital Group.",
      },
      {
        heading: "3. Payment",
        body: "The Subscription Amount is payable in full upon the Company's acceptance of this Agreement. Payment instructions, including accepted currencies (USD, USDC, USDT, and wire transfer) and the applicable wallet or bank account details, will be provided to the Investor via the Platform within five (5) business days of acceptance. Securities will not be issued or registered until cleared funds are received in full.",
      },
      {
        heading: "4. Investor Representations and Warranties",
        body: "The Investor represents, warrants, and covenants to the Company as of the date of this Agreement and as of the date of closing that:",
        items: [
          "The Investor is an accredited investor as defined under Rule 501 of Regulation D promulgated under the U.S. Securities Act of 1933, as amended, or an equivalent classification under the laws of the Investor's jurisdiction of residence.",
          "The Investor is acquiring the Securities for the Investor's own account, for investment purposes only, and not with a view to, or for resale in connection with, any distribution or public offering of the Securities.",
          "The Investor has sufficient knowledge and experience in financial and business matters to be capable of evaluating the merits and risks of this investment, and has had the opportunity to ask questions of, and receive answers from, the Company regarding the offering.",
          "The Investor acknowledges that the Securities are not registered under the Securities Act of 1933 or any state securities laws, and that there is no established public trading market for the Securities.",
          "The Investor has the legal capacity and authority to enter into this Agreement, and this Agreement constitutes a valid and legally binding obligation of the Investor.",
          "The Investor has reviewed and understands the Risk Disclosure Statement provided by the Company, and accepts the risks described therein.",
          "All information provided by the Investor to the Company through the Platform, including KYC documentation and identity verification materials, is true, accurate, and complete.",
        ],
      },
      {
        heading: "5. Transfer Restrictions",
        body: "The Securities acquired pursuant to this Agreement are subject to restrictions on transfer. Investor may not sell, transfer, assign, pledge, or otherwise dispose of any Securities without the prior written consent of the Company and compliance with all applicable securities laws. Any purported transfer in violation of this Section shall be void and of no effect.",
      },
      {
        heading: "6. No Guarantee of Returns",
        body: "The Investor acknowledges that no representation has been made by the Company or any of its officers, directors, employees, or agents regarding the future performance of the investment or the amount of any return. The Investor understands that the value of the Securities may increase or decrease, and that the Investor may lose all or part of the Subscription Amount.",
      },
      {
        heading: "7. Confidentiality",
        body: "The Investor agrees to keep confidential all non-public information relating to the Company and its portfolio companies, the terms of any investment opportunity, and any information provided through the Platform that is not otherwise publicly available. This obligation survives the termination of this Agreement.",
      },
      {
        heading: "8. Electronic Execution",
        body: "The Investor agrees that an electronic signature applied through the Platform has the same legal force and effect as a handwritten signature. By applying an electronic signature, the Investor confirms having read, understood, and agreed to all terms and conditions of this Agreement. The Company may rely on electronic signatures as evidence of the Investor's agreement.",
      },
      {
        heading: "9. Governing Law and Dispute Resolution",
        body: "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any dispute arising out of or in connection with this Agreement shall be submitted to binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The place of arbitration shall be New York, New York.",
      },
      {
        heading: "10. Entire Agreement",
        body: "This Agreement, together with the Risk Disclosure Statement and the Accredited Investor Certification, constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior discussions, understandings, and agreements. No amendment or modification of this Agreement shall be valid unless made in writing and signed by both parties.",
      },
      {
        note: "BY SIGNING THIS AGREEMENT, THE INVESTOR ACKNOWLEDGES THAT THEY HAVE READ AND UNDERSTOOD ALL OF THE TERMS SET OUT ABOVE AND AGREE TO BE LEGALLY BOUND BY THEM.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 2. ACCREDITED INVESTOR CERTIFICATION
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: "accredited-investor-certification",
    title: "Accredited Investor Certification",
    subtitle: "Investor Suitability & Qualification Declaration",
    category: "Disclosure",
    effectiveDate: "1 January 2026",
    requiresSignature: true,
    description:
      "Federal securities law requires all investors in private placements to certify their accredited investor status. This document must be signed before accessing investment opportunities.",
    sections: [
      {
        heading: "Purpose of This Document",
        body: "Securities offered through the Aurion Capital platform are offered exclusively to \“accredited investors\” pursuant to an exemption from registration under Regulation D of the U.S. Securities Act of 1933. This Certification is required by law and must be completed truthfully and in full. Providing false information in this Certification may constitute a federal offence.",
      },
      {
        heading: "Definition of Accredited Investor",
        body: "Under Rule 501(a) of Regulation D, an \“accredited investor\” includes, among others, the following categories of natural persons and entities. By signing this Certification, the Investor confirms that they meet at least one of the following criteria:",
        items: [
          "INDIVIDUAL INCOME: The Investor has had individual income exceeding $200,000 in each of the two most recent calendar years, or joint income with a spouse or spousal equivalent exceeding $300,000 in each of those years, and has a reasonable expectation of reaching the same income level in the current year.",
          "NET WORTH: The Investor has an individual net worth, or joint net worth with a spouse or spousal equivalent, exceeding $1,000,000 at the time of this certification, excluding the value of the Investor's primary residence.",
          "PROFESSIONAL CERTIFICATION: The Investor holds in good standing a Series 7, Series 65, or Series 82 licence, or any other credential designated by the SEC as qualifying the holder as a knowledgeable, sophisticated investor.",
          "INSTITUTIONAL INVESTOR: The Investor is a bank, registered broker-dealer, insurance company, registered investment company, business development company, small business investment company, or rural business investment company.",
          "FAMILY OFFICE: The Investor is a family office with at least $5,000,000 in assets under management that is not formed for the specific purpose of acquiring the offered securities, and whose investment is directed by a person with such knowledge and experience in financial and business matters that such family office is capable of evaluating the merits and risks of the prospective investment.",
          "TRUST: The Investor is a trust with total assets exceeding $5,000,000, not formed for the specific purpose of acquiring the securities, whose purchase is directed by a sophisticated person who has such knowledge and experience in financial and business matters that they are capable of evaluating the merits and risks.",
          "ENTITY: The Investor is an entity in which all of the equity owners are accredited investors.",
        ],
      },
      {
        heading: "Investor Suitability",
        body: "In addition to accreditation status, the Investor certifies that:",
        items: [
          "The Investor has reviewed the investment materials provided through the Platform and has had the opportunity to ask questions of and receive answers from Aurion Capital Group.",
          "The Investor is aware that private securities investments are illiquid, carry significant risk of loss, and are suitable only for investors who can afford to lose their entire investment.",
          "The Investor's investment in any single offering through the Platform does not exceed 10% of the greater of the Investor's annual income or net worth (unless the Investor is a legal entity).",
          "The Investor is not making this investment based on any representation, promise, or guarantee of return made by Aurion Capital Group or any of its representatives.",
          "The Investor's financial situation and needs have been considered in making this investment decision, and this investment is consistent with the Investor's investment objectives.",
        ],
      },
      {
        heading: "Consequences of False Certification",
        body: "The Investor acknowledges that providing false or misleading information in this Certification is a serious matter. It may constitute fraud under applicable federal and state laws, result in rescission of any investment made on the basis of this Certification, expose the Investor to civil liability and potential criminal prosecution, and result in the Investor being permanently barred from the Platform.",
      },
      {
        heading: "Annual Renewal",
        body: "This Certification remains in effect for twelve (12) months from the date of signing. The Investor agrees to promptly notify Aurion Capital Group in writing if their accredited investor status changes at any time. Aurion Capital Group may require renewal of this Certification at any time upon reasonable notice.",
      },
      {
        note: "BY SIGNING THIS CERTIFICATION, THE INVESTOR CONFIRMS UNDER PENALTY OF PERJURY THAT ALL INFORMATION PROVIDED IS TRUE, COMPLETE, AND ACCURATE, AND THAT THE INVESTOR QUALIFIES AS AN ACCREDITED INVESTOR UNDER AT LEAST ONE OF THE CATEGORIES LISTED ABOVE.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 3. PLATFORM DISCLOSURE & INVESTMENT POLICY
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: "platform-disclosure",
    title: "Platform Disclosure & Investment Policy",
    subtitle: "How Aurion Capital Group Operates and Invests",
    category: "Platform Policy",
    effectiveDate: "1 January 2026",
    requiresSignature: false,
    description:
      "An overview of Aurion Capital Group's investment mandate, asset class focus, fee structure, conflict of interest policy, and how the platform operates on behalf of investors.",
    sections: [
      {
        heading: "About Aurion Capital Group",
        body: "Aurion Capital Group LLC is a private investment platform headquartered in New York, New York. We identify, structure, and present curated private investment opportunities across real estate, infrastructure, private credit, and multi-asset strategies to a community of accredited and institutional investors. Aurion acts as a placement agent and deal administrator — we do not provide investment advice, and participation in any offering is always at the investor's sole discretion.",
      },
      {
        heading: "Investment Mandate",
        body: "Aurion Capital Group focuses exclusively on hard-asset-backed and cash-flow-generating private market investments. Every opportunity presented on the Platform must meet our internal due diligence criteria before being made available to investors. Our mandate is grounded in three principles: capital preservation, income generation, and long-term value creation. We do not offer speculative early-stage ventures, cryptocurrencies, or publicly traded securities.",
      },
      {
        heading: "Asset Class Focus",
        body: "Current investment verticals on the Platform include:",
        items: [
          "REAL ESTATE: Commercial, industrial, and logistics property — including sale-leasebacks, net-lease assets, and development projects with contracted income. Deals are selected for their asset quality, tenant credit, and income visibility.",
          "INFRASTRUCTURE: Mid-market infrastructure assets including logistics networks, energy distribution, and digital infrastructure. Emphasis on long-term contracted revenues, essential service characteristics, and inflation-linked cash flows.",
          "PRIVATE CREDIT: Senior secured lending to established mid-market businesses, primarily in healthcare services, professional services, and asset-heavy sectors. All loans are first-lien, require minimum 1.25x DSCR at close, and carry personal guarantees.",
          "MULTI-ASSET: Diversified co-investment opportunities that blend two or more of the above asset classes in a single vehicle for risk-adjusted income generation.",
        ],
      },
      {
        heading: "Due Diligence Process",
        body: "Before any opportunity is listed on the Platform, Aurion Capital Group conducts a proprietary due diligence review that includes: review of audited or management-prepared financial statements; independent review of legal structure, titles, and encumbrances; reference checks on management teams; market comparables and valuation benchmarking; regulatory compliance review; and internal Investment Committee approval. Not all reviewed opportunities are approved for the Platform. Investors should note that our due diligence does not eliminate investment risk and does not constitute an endorsement or guarantee of any investment.",
      },
      {
        heading: "Fee Structure",
        body: "Aurion Capital Group charges fees at two levels. Platform fees are charged to issuers, not to investors, and cover deal origination, legal structuring, and platform administration. Carried interest or performance fees, where applicable, are disclosed in full in the individual offering documents for each listing. Current standard terms are:",
        items: [
          "MANAGEMENT FEE: 1.5% per annum on committed capital, charged to the investment vehicle. This fee covers ongoing monitoring, investor reporting, distribution management, and regulatory compliance.",
          "PERFORMANCE FEE (CARRY): 15% of net profits above an 8% preferred return hurdle. Carry is only payable after investors have received full return of committed capital plus the 8% preferred return.",
          "NO UPFRONT FEES: Aurion Capital Group does not charge investors an upfront subscription fee, placement fee, or advisory fee in connection with any listing on the Platform.",
        ],
      },
      {
        heading: "Investor Reporting",
        body: "Investors receive quarterly reports covering portfolio valuation, income distributions, key operational updates, and any material changes to the investment. Annual audited financial statements are provided for all investment vehicles within 90 days of each fiscal year end. Investors have continuous access to portfolio data through the Platform dashboard.",
      },
      {
        heading: "Conflicts of Interest",
        body: "Aurion Capital Group may from time to time have interests that conflict with those of investors. Material conflicts are disclosed as follows:",
        items: [
          "Aurion Capital Group personnel may invest their own capital alongside Platform investors in the same offerings, subject to internal compliance policies.",
          "The Company receives compensation from issuers in connection with listings. This compensation creates an incentive for the Company to present investments favourably. Investors should conduct their own independent assessment.",
          "Aurion Capital Group may serve as both placement agent and administrator for a single offering, which may limit independent oversight. Investors are advised to seek independent legal or financial advice where appropriate.",
        ],
      },
      {
        heading: "Regulatory Status and Compliance",
        body: "Aurion Capital Group operates in compliance with applicable U.S. federal and state securities laws. The Platform conducts identity verification (KYC) and anti-money-laundering (AML) screening on all registered investors pursuant to the Bank Secrecy Act and FinCEN requirements. The Company maintains records of all investor transactions and may be required to disclose investor information to regulatory authorities upon lawful request.",
      },
      {
        heading: "Platform Technology and Data",
        body: "The Platform is operated with 256-bit SSL encryption. Investor data is stored securely and is not sold or shared with third parties except as required to administer investments or comply with legal obligations. The Platform uses session-based authentication and requires two-factor verification for sensitive account actions, including withdrawals and document signing.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 4. RISK DISCLOSURE STATEMENT
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: "risk-disclosure",
    title: "Risk Disclosure Statement",
    subtitle: "Material Risks of Private Investment Securities",
    category: "Disclosure",
    effectiveDate: "1 January 2026",
    requiresSignature: true,
    description:
      "A comprehensive disclosure of the material risks associated with investing in private securities through the Aurion Capital platform. All investors must read and sign this statement before their first investment.",
    sections: [
      {
        heading: "Introduction",
        body: "This Risk Disclosure Statement describes material risks associated with investments offered through the Aurion Capital Group platform. This statement does not describe all possible risks; it identifies those considered most significant for investors in private market securities. Investors should read this document carefully in its entirety. If any of these risks are not acceptable to you, you should not invest. Past performance of any investment described on the Platform is not indicative of future results.",
      },
      {
        heading: "1. Risk of Total Loss",
        body: "Investments in private securities carry a significant risk of loss, including the total loss of the amount invested. Unlike publicly traded securities, private investments have no established market, and there is no assurance that any return of capital will occur. Investors should only invest amounts they can afford to lose entirely. The Company makes no guarantee, representation, or warranty regarding the preservation of capital.",
      },
      {
        heading: "2. Illiquidity Risk",
        body: "Securities offered through the Platform are illiquid. There is no public market for these securities, and no secondary market is currently provided by Aurion Capital Group. Investors must be prepared to hold their investment for the full expected investment period, which may range from three (3) to ten (10) years or longer. Early exit may not be possible, and if a secondary transfer is permitted, it may only be achievable at a significant discount to the original subscription price.",
      },
      {
        heading: "3. No Registration — Limited Regulatory Protections",
        body: "Securities offered on the Platform are not registered under the Securities Act of 1933 and are offered in reliance on exemptions from registration. As a result, investors do not have access to the full protections afforded by registered offerings, including the right to receive a prospectus meeting SEC requirements. Investors may have limited recourse in the event of fraud or misrepresentation.",
      },
      {
        heading: "4. Dilution Risk",
        body: "The issuing company may, in the future, issue additional securities to raise capital. Such issuances may dilute the ownership percentage represented by the Investor's Securities, potentially reducing the proportionate economic rights and voting power of existing investors. Investors have no right to participate in future capital raises unless expressly stated in the offering documents.",
      },
      {
        heading: "5. Management and Key Person Risk",
        body: "The success of any investment presented on the Platform depends substantially on the skills, judgment, and experience of the management team of the underlying company or fund. The loss of one or more key individuals through resignation, incapacity, or death could have a materially adverse effect on the investment. There is no guarantee that suitable replacements could be found or that performance would be maintained.",
      },
      {
        heading: "6. Market and Economic Risk",
        body: "The performance of investments on the Platform may be adversely affected by general economic conditions, interest rate changes, inflation, currency fluctuations, changes in government policy, geopolitical events, and other macro factors outside the control of the issuer or Aurion Capital Group. A prolonged economic downturn could materially reduce asset values, revenue, and the ability of issuers to service debt or distribute income.",
      },
      {
        heading: "7. Real Estate Specific Risks",
        body: "Investments in real estate assets are subject to additional risks, including:",
        items: [
          "Vacancy and tenant default: reduction in occupancy or failure of tenants to pay rent can materially reduce income from real estate assets.",
          "Property value decline: property values can decline due to local market conditions, oversupply, changes in zoning or land use regulations, or environmental factors.",
          "Capital expenditure requirements: real estate assets may require significant unplanned capital investment for maintenance, renovation, or compliance with changing regulations.",
          "Financing risk: changes in interest rates or credit availability may affect the ability to refinance existing debt on favourable terms at maturity.",
        ],
      },
      {
        heading: "8. Private Credit Specific Risks",
        body: "Investments in private credit vehicles are subject to additional risks, including:",
        items: [
          "Borrower default: borrowers may fail to repay principal or interest when due. Even with first-lien security, recoveries in default may be less than the outstanding loan balance.",
          "Prepayment risk: borrowers may prepay loans earlier than anticipated, reducing the total interest income earned by investors.",
          "Covenant breach: while loans include financial covenants, enforcement may be delayed or result in restructuring rather than immediate recovery of capital.",
          "Concentration risk: a portfolio with a limited number of borrowers is more susceptible to the failure of a single counterparty.",
        ],
      },
      {
        heading: "9. Regulatory and Legal Risk",
        body: "Changes in applicable laws and regulations, including tax laws, securities laws, environmental regulations, and industry-specific regulations, may adversely affect the value of investments or the ability of issuers to conduct their business as planned. Regulatory approvals required for specific projects or transactions may be delayed, conditioned, or denied.",
      },
      {
        heading: "10. Reliance on Platform and Technology Risk",
        body: "The Platform relies on technology systems for investment management, record-keeping, distribution, and communication. System failures, cybersecurity incidents, data breaches, or disruptions in service could delay or impair the Investor's ability to access their account, receive distributions, or communicate with the Company. Aurion Capital Group maintains security and redundancy measures but cannot guarantee uninterrupted service.",
      },
      {
        heading: "11. No Investment Advice",
        body: "Aurion Capital Group is not a registered investment adviser under the Investment Advisers Act of 1940 and does not provide personalised investment advice. Nothing on the Platform or in any communication from the Company constitutes investment advice or a recommendation to invest. Investors are strongly encouraged to seek independent legal, financial, and tax advice before making any investment decision.",
      },
      {
        note: "BY SIGNING THIS RISK DISCLOSURE STATEMENT, THE INVESTOR CONFIRMS THAT THEY HAVE READ AND UNDERSTOOD ALL RISK FACTORS DESCRIBED HEREIN, THAT THEY HAVE HAD THE OPPORTUNITY TO SEEK INDEPENDENT ADVICE, AND THAT THEY ACCEPT THESE RISKS AS A CONDITION OF INVESTING THROUGH THE AURION CAPITAL GROUP PLATFORM.",
      },
    ],
  },
];
