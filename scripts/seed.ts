import "dotenv/config";
import mongoose from "mongoose";
import crypto from "crypto";

const MONGODB_URI = process.env.MONGODB_URI!;

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

const UserSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true },
  password: String, firm: String, isAdmin: { type: Boolean, default: false },
  investorType: { type: String, default: "individual" },
  kycStatus: { type: String, default: "pending" },
  onboardingComplete: { type: Boolean, default: false },
}, { timestamps: true });

const ShareTierSchema = new mongoose.Schema({
  name: String, price: Number, shares: Number, order: Number, available: { type: Boolean, default: true },
});

const CompanySchema = new mongoose.Schema({
  slug: { type: String, unique: true }, name: String, sector: String,
  tagline: String, description: String, baseValuation: Number,
  totalShares: Number, sharesRemaining: Number, minInvestment: Number,
  status: { type: String, default: "draft" }, tiers: [ShareTierSchema],
  highlights: [{ stat: String, label: String, sub: String }],
  team: [{ name: String, title: String, bio: String, initials: String }],
  useOfFunds: [{ label: String, pct: Number, color: String, description: String }],
  metrics: [{ label: String, value: String, trend: String }],
  risks: [{ title: String, body: String }],
}, { timestamps: true });

const standardTiers = [
  { name: "Entry", price: 5000, shares: 50, order: 1 },
  { name: "Growth", price: 10000, shares: 100, order: 2 },
  { name: "Premium", price: 25000, shares: 250, order: 3 },
  { name: "Institutional", price: 50000, shares: 500, order: 4 },
  { name: "Anchor", price: 100000, shares: 1000, order: 5 },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const User = mongoose.models.User ?? mongoose.model("User", UserSchema);
  const Company = mongoose.models.Company ?? mongoose.model("Company", CompanySchema);

  // Users
  await User.findOneAndUpdate(
    { email: "admin@aurioncapital.com" },
    { name: "Aurion Admin", email: "admin@aurioncapital.com", password: hashPassword("Admin@2026!"), isAdmin: true, investorType: "institutional", kycStatus: "approved", onboardingComplete: true },
    { upsert: true, returnDocument: "after" }
  );
  await User.findOneAndUpdate(
    { email: "demo@investor.com" },
    { name: "Alexandra Pemberton", email: "demo@investor.com", password: hashPassword("Demo@2026!"), firm: "Pemberton Family Office", investorType: "institutional", kycStatus: "approved", onboardingComplete: true },
    { upsert: true, returnDocument: "after" }
  );

  // ── NexGen Logistics ────────────────────────────────────────────────────────
  await Company.findOneAndUpdate(
    { slug: "nexgen-logistics" },
    {
      slug: "nexgen-logistics",
      name: "NexGen Logistics",
      sector: "Infrastructure",
      tagline: "Redefining last-mile delivery infrastructure across North America",
      description: `NexGen Logistics is building the next generation of urban distribution infrastructure. With proprietary micro-fulfillment technology and a rapidly expanding network of 47 fulfilment nodes across 12 major metros, NexGen is positioned to capture 4% of the $800B North American logistics market by 2028.

Founded in 2019 by former Amazon operations executives, the company has achieved 340% revenue growth over three years and secured long-term contracts with three Fortune 500 retailers. The current raise funds a further 23 strategically located distribution centres, each averaging 80,000 sq ft, in markets including Chicago, Atlanta, Phoenix, and Seattle.

NexGen's competitive advantage lies in its hybrid model: owned infrastructure leased to enterprise clients on 5–10 year contracts, combined with a proprietary routing algorithm that reduces last-mile delivery cost by 31% versus incumbent carriers. The business is asset-heavy by design — each node represents a hard asset with independent cash flow.`,
      baseValuation: 42000000,
      totalShares: 420000,
      sharesRemaining: 210000,
      minInvestment: 5000,
      status: "active",
      tiers: standardTiers,
      highlights: [
        { stat: "340%", label: "Revenue Growth", sub: "3-year CAGR" },
        { stat: "47", label: "Fulfilment Nodes", sub: "12 metro areas" },
        { stat: "$800B", label: "Total Market", sub: "North America" },
        { stat: "31%", label: "Cost Reduction", sub: "vs. incumbents" },
      ],
      team: [
        {
          name: "Marcus Chen",
          title: "Chief Executive Officer",
          bio: "Former VP of Operations at Amazon Logistics, where he oversaw the expansion of 200+ last-mile facilities across North America. 18 years in supply chain infrastructure.",
          initials: "MC",
        },
        {
          name: "Priya Nair",
          title: "Chief Technology Officer",
          bio: "Previously led routing algorithm development at FedEx. Holds 4 patents in logistics optimisation. PhD in Operations Research from MIT.",
          initials: "PN",
        },
        {
          name: "James Okafor",
          title: "Chief Financial Officer",
          bio: "15 years in infrastructure finance including senior roles at Blackstone Infrastructure and Goldman Sachs. Structured over $2.1B in infrastructure transactions.",
          initials: "JO",
        },
      ],
      useOfFunds: [
        { label: "New Fulfilment Nodes", pct: 58, color: "#c9a84c", description: "Construction and fit-out of 23 new distribution centres across target metros" },
        { label: "Technology Infrastructure", pct: 22, color: "#1a3a5c", description: "Routing platform upgrades, IoT sensor networks, and automation integration" },
        { label: "Working Capital", pct: 12, color: "#2d6a9f", description: "Operational runway to support new site ramp-up periods" },
        { label: "Sales & Enterprise", pct: 8, color: "#64748b", description: "Enterprise sales team expansion and contract origination" },
      ],
      metrics: [
        { label: "Annual Revenue", value: "$18.4M", trend: "+127% YoY" },
        { label: "EBITDA Margin", value: "34%", trend: "Expanding" },
        { label: "Enterprise Clients", value: "12", trend: "+4 this year" },
        { label: "Avg Contract Length", value: "7.2 years", trend: "Locked in" },
        { label: "Node Occupancy Rate", value: "94%", trend: "Full utilisation" },
        { label: "Founded", value: "2019", trend: "Series B stage" },
      ],
      risks: [
        { title: "Concentration risk", body: "Three clients represent approximately 48% of contracted revenue. Loss of any one could materially impact cash flow during the ramp-up of replacement contracts." },
        { title: "Real estate market", body: "Construction costs and industrial lease rates in target metros have risen 22% since 2022. Further increases may compress node-level margins." },
        { title: "Technology obsolescence", body: "Advances in autonomous delivery could reduce demand for fixed last-mile infrastructure over a 10–15 year horizon." },
        { title: "Capital intensity", body: "The business model requires ongoing capital to fund new nodes. Inability to raise future rounds could slow expansion." },
        { title: "Regulatory environment", body: "Zoning approvals for urban fulfilment centres vary by municipality and can delay planned openings by 6–18 months." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  // ── Solara Energy ────────────────────────────────────────────────────────────
  await Company.findOneAndUpdate(
    { slug: "solara-energy" },
    {
      slug: "solara-energy",
      name: "Solara Energy",
      sector: "Real Estate",
      tagline: "Commercial solar infrastructure with embedded long-term lease agreements",
      description: `Solara Energy acquires and develops commercial rooftop solar installations across the Sun Belt, securing 20-year power purchase agreements with credit-rated tenants. The portfolio currently generates $3.2M in annual contracted revenue across 84 commercial properties.

The Solara model eliminates merchant power risk entirely — every megawatt sold before installation begins. The current raise funds expansion into the Southeast and acquisition of a 14-site institutional portfolio from a distressed seller at a 22% discount to replacement cost.

Solara's differentiated approach targets triple-net lease commercial properties — retail, light industrial, and logistics — where rooftop solar is structurally underserved. By embedding the PPA within the property lease, Solara creates dual layers of security: the tenant pays the solar bill as a utility expense, and the landlord has agreed to facilitate access for the installation term.`,
      baseValuation: 28000000,
      totalShares: 280000,
      sharesRemaining: 168000,
      minInvestment: 5000,
      status: "active",
      tiers: standardTiers,
      highlights: [
        { stat: "$3.2M", label: "Contracted Revenue", sub: "Annual, locked in" },
        { stat: "84", label: "Properties", sub: "Across Sun Belt" },
        { stat: "20yr", label: "Avg PPA Length", sub: "Fixed-rate contracts" },
        { stat: "22%", label: "Acquisition Discount", sub: "Below replacement cost" },
      ],
      team: [
        {
          name: "Sarah Okonkwo",
          title: "Chief Executive Officer",
          bio: "Former Managing Director at SunPower's commercial division. Structured over 280 commercial solar PPAs representing $420M in contracted revenue across 14 US states.",
          initials: "SO",
        },
        {
          name: "David Ramos",
          title: "Chief Investment Officer",
          bio: "Former real estate debt originator at KKR. Specialises in structuring real asset acquisitions with embedded long-term contracted income.",
          initials: "DR",
        },
        {
          name: "Lin Wei",
          title: "Head of Engineering",
          bio: "20 years in commercial solar design and installation. Led the technical buildout of 400+ MW of commercial rooftop capacity across the US and APAC markets.",
          initials: "LW",
        },
      ],
      useOfFunds: [
        { label: "Portfolio Acquisition", pct: 62, color: "#c9a84c", description: "Purchase of 14-site distressed portfolio at 22% discount to replacement cost" },
        { label: "New Installations", pct: 24, color: "#1a3a5c", description: "Equipment and installation for 18 new Sun Belt properties under executed LOIs" },
        { label: "Grid Interconnection", pct: 9, color: "#2d6a9f", description: "Utility interconnection fees and metering infrastructure" },
        { label: "Operations Reserve", pct: 5, color: "#64748b", description: "Equipment maintenance reserves and working capital" },
      ],
      metrics: [
        { label: "Contracted Revenue", value: "$3.2M/yr", trend: "100% locked" },
        { label: "Portfolio DSCR", value: "1.84x", trend: "Strong coverage" },
        { label: "Avg System Size", value: "214 kW", trend: "Commercial scale" },
        { label: "Tenant Credit Rating", value: "Investment grade", trend: "82% of portfolio" },
        { label: "Installed Capacity", value: "17.9 MW", trend: "Expanding to 26 MW" },
        { label: "Founded", value: "2018", trend: "Profitable since 2021" },
      ],
      risks: [
        { title: "Tenant default", body: "If a commercial tenant vacates or defaults, solar revenue from that site ceases until a replacement tenant is secured and a new PPA negotiated." },
        { title: "Policy and subsidy risk", body: "Federal and state solar incentives, including ITC, are subject to legislative change. Removal of incentives could impact IRR on future deployments." },
        { title: "Technology degradation", body: "Solar panels degrade approximately 0.5% per year. Actual performance may deviate from modelled output if degradation exceeds industry norms." },
        { title: "Interest rate environment", body: "The portfolio is financed with fixed-rate project debt. Higher long-term rates could increase refinancing costs at debt maturity." },
        { title: "Weather and catastrophe", body: "Severe weather events, including hail and hurricanes, could damage assets. The portfolio carries property insurance but outages during repairs impact revenue." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  // ── Meridian Credit Partners ─────────────────────────────────────────────────
  await Company.findOneAndUpdate(
    { slug: "meridian-credit" },
    {
      slug: "meridian-credit",
      name: "Meridian Credit Partners",
      sector: "Private Credit",
      tagline: "Senior secured lending to mid-market healthcare and professional services",
      description: `Meridian Credit Partners provides senior secured term loans to established mid-market businesses in healthcare services, dental platforms, and veterinary consolidators. The portfolio carries an average LTV of 58%, weighted average yield of 13.2%, and zero losses since inception in 2021.

Meridian's credit team has an average of 19 years of direct lending experience. The current raise builds dry powder for a pipeline of $18M in committed term sheets, all with personal guarantees and first-lien security over business assets.

Meridian targets recession-resistant sectors by design. Healthcare and professional services have demonstrated consistent payment behaviour through all recent credit cycles. The firm's proprietary underwriting framework prioritises cash flow coverage over asset values, and every loan requires 1.25x DSCR at close. The result is a portfolio that has never experienced a payment default.`,
      baseValuation: 19000000,
      totalShares: 190000,
      sharesRemaining: 133000,
      minInvestment: 10000,
      status: "active",
      tiers: standardTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "13.2%", label: "Weighted Avg Yield", sub: "Net of fees" },
        { stat: "58%", label: "Average LTV", sub: "Conservative coverage" },
        { stat: "$0", label: "Lifetime Losses", sub: "Since inception 2021" },
        { stat: "1.25x", label: "Min. DSCR", sub: "Required at close" },
      ],
      team: [
        {
          name: "Robert Kimani",
          title: "Managing Partner",
          bio: "Former Head of Healthcare Lending at Golub Capital where he originated $3.4B in direct loans. 22 years in private credit focused exclusively on healthcare and professional services.",
          initials: "RK",
        },
        {
          name: "Amanda Torres",
          title: "Partner, Credit & Underwriting",
          bio: "Previously Senior Credit Officer at Ares Capital. Led underwriting on 140+ transactions totalling $1.9B. CFA Charterholder, MBA from Wharton.",
          initials: "AT",
        },
        {
          name: "Neil Sharma",
          title: "Partner, Portfolio Management",
          bio: "17 years in loan portfolio management at Apollo Global and Antares Capital. Manages ongoing monitoring and covenant compliance across the entire loan book.",
          initials: "NS",
        },
      ],
      useOfFunds: [
        { label: "New Loan Originations", pct: 78, color: "#c9a84c", description: "Funding committed term sheets in the active pipeline of healthcare and professional services borrowers" },
        { label: "Reserve Capital", pct: 14, color: "#1a3a5c", description: "Liquidity reserve equal to 6 months of expected distributions" },
        { label: "Deal Pipeline", pct: 8, color: "#2d6a9f", description: "Due diligence and origination costs for the next 12 months of deal flow" },
      ],
      metrics: [
        { label: "Portfolio Size", value: "$12.4M", trend: "Fully deployed" },
        { label: "Weighted Avg Yield", value: "13.2%", trend: "Net of all fees" },
        { label: "Avg Loan Size", value: "$820K", trend: "Diversified book" },
        { label: "Active Borrowers", value: "15", trend: "Healthcare focus" },
        { label: "Avg Loan Term", value: "3.4 years", trend: "Medium duration" },
        { label: "Founded", value: "2021", trend: "Zero credit losses" },
      ],
      risks: [
        { title: "Credit concentration", body: "The portfolio has 15 active borrowers. Default by any single borrower representing more than 8% of book value would have a material impact on returns." },
        { title: "Sector-specific risk", body: "Regulatory changes to healthcare reimbursement, particularly Medicare and Medicaid rates, could impair borrowers' ability to service debt." },
        { title: "Refinancing risk", body: "If interest rates fall materially, borrowers may refinance at lower rates, compressing portfolio yield below projected levels." },
        { title: "Covenant enforcement", body: "Enforcing covenants requires active monitoring. Delays in detecting covenant breaches could increase loss severity on any defaulted loan." },
        { title: "Illiquidity of loans", body: "The firm's loans are not publicly traded. Investors requiring liquidity cannot sell their position in individual loans through a secondary market." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err); process.exit(1); });
