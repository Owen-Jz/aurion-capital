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
  accountStatus: { type: String, default: "pending_review" },
  onboardingComplete: { type: Boolean, default: false },
  otpEnabled: { type: Boolean, default: false },
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

// Retail-friendly tiers used for Tesla, NVIDIA and consumer-tech listings.
const retailTiers = [
  { name: "Starter", price: 500, shares: 2, order: 1 },
  { name: "Standard", price: 1000, shares: 4, order: 2 },
  { name: "Growth", price: 5000, shares: 20, order: 3 },
  { name: "Premium", price: 25000, shares: 100, order: 4 },
  { name: "Institutional", price: 100000, shares: 400, order: 5 },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const User = mongoose.models.User ?? mongoose.model("User", UserSchema);
  const Company = mongoose.models.Company ?? mongoose.model("Company", CompanySchema);

  // ── Demo users ──────────────────────────────────────────────────────
  await User.findOneAndUpdate(
    { email: "admin@aurioncapital.com" },
    {
      name: "Aurion Admin", email: "admin@aurioncapital.com",
      password: hashPassword("Admin@2026!"),
      isAdmin: true,
      investorType: "institutional",
      kycStatus: "approved",
      accountStatus: "approved",
      onboardingComplete: true,
      otpEnabled: false,
    },
    { upsert: true, returnDocument: "after" }
  );
  await User.findOneAndUpdate(
    { email: "demo@investor.com" },
    {
      name: "Alexandra Pemberton", email: "demo@investor.com",
      password: hashPassword("Demo@2026!"),
      firm: "Pemberton Family Office",
      investorType: "institutional",
      kycStatus: "approved",
      accountStatus: "approved",
      onboardingComplete: true,
      otpEnabled: false,
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  ELON MUSK / TESLA — featured offering with $500 + $1,000 retail tiers
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "tesla-elon-musk" },
    {
      slug: "tesla-elon-musk",
      name: "Tesla, Inc.",
      sector: "AI & Electric Mobility",
      tagline: "Pre-IPO style access to a Tesla / xAI tracker basket led by Elon Musk",
      description: `This offering provides accredited investors with structured exposure to Tesla, Inc. (NASDAQ: TSLA) alongside a Musk-affiliated growth basket including xAI, The Boring Company and SpaceX secondary positions.

The strategy is built around Elon Musk's integrated industrial portfolio — vertically integrated AI, robotics, energy, autonomous mobility and orbital infrastructure. Aurion has secured a structured note arrangement that mirrors the economic performance of a curated Musk-led portfolio with weekly mark-to-market and quarterly distributions.

Tesla remains the world's most valuable automaker by market capitalisation and is the only Western OEM with full-stack control of its AI training infrastructure (Dojo), humanoid robotics platform (Optimus), and global energy distribution network. The basket extends this exposure into xAI's frontier-model platform and SpaceX's Starlink revenue base.`,
      baseValuation: 920_000_000_000,
      totalShares: 5_000_000,
      sharesRemaining: 2_800_000,
      minInvestment: 500,
      status: "active",
      tiers: retailTiers,
      highlights: [
        { stat: "$500", label: "Minimum Entry", sub: "Retail-accessible starting allocation" },
        { stat: "$1,000", label: "Standard Tier", sub: "4 fractional Tesla-equivalent shares" },
        { stat: "47%", label: "Trailing 1-Year", sub: "Basket performance" },
        { stat: "Weekly", label: "Mark-to-Market", sub: "Transparent pricing" },
      ],
      team: [
        { name: "Elon Musk", title: "Founder & CEO, Tesla / xAI / SpaceX", bio: "Founder of Tesla, SpaceX, The Boring Company, Neuralink and xAI. Architect of the world's most influential industrial AI portfolio.", initials: "EM" },
        { name: "Vaibhav Taneja", title: "Chief Financial Officer, Tesla", bio: "Tesla CFO since 2023. Previously Tesla's Chief Accounting Officer and Corporate Controller. Oversees capital structure across $1T+ enterprise value.", initials: "VT" },
        { name: "Tom Zhu", title: "SVP, Automotive Operations", bio: "Runs global production and Gigafactory expansion. Architect of Tesla's manufacturing scale-up across Shanghai, Berlin and Texas.", initials: "TZ" },
      ],
      useOfFunds: [
        { label: "Tesla Common Equity", pct: 60, color: "#c9a84c", description: "Direct economic exposure to Tesla, Inc. (NASDAQ: TSLA) public equity" },
        { label: "xAI Secondary Position", pct: 18, color: "#1a3a5c", description: "Tracker exposure to xAI Series C secondary at most recent round price" },
        { label: "SpaceX Secondary", pct: 14, color: "#2d6a9f", description: "Indirect exposure via Aurion-held SpaceX secondary block" },
        { label: "Optionality Reserve", pct: 8, color: "#64748b", description: "Capital reserved for additional Musk-affiliated allocations (Neuralink, Boring Co.)" },
      ],
      metrics: [
        { label: "Tesla Market Cap", value: "$920B", trend: "S&P 500 component" },
        { label: "Trailing 12-Month Return", value: "+47%", trend: "Basket weighted" },
        { label: "xAI Last Round", value: "$80B", trend: "Series C, late 2025" },
        { label: "Optimus Production", value: "Ramping", trend: "Bot V3 expected 2026" },
        { label: "Energy Storage Deployed", value: "78 GWh", trend: "+89% YoY" },
        { label: "Founded", value: "2003 (Tesla)", trend: "Public since 2010" },
      ],
      risks: [
        { title: "Key-person concentration", body: "The basket's value is highly correlated with Elon Musk's continued leadership and brand. Departure, prolonged absence, or reputational events could materially impact valuations." },
        { title: "Public-market volatility", body: "Tesla equity is highly volatile and historically subject to 30–50% drawdowns. Investors must be comfortable with substantial mark-to-market swings." },
        { title: "Private secondary illiquidity", body: "The xAI and SpaceX components are private secondary positions. Aurion may be unable to exit at quoted last-round valuations on a forced-sale basis." },
        { title: "AI competitive landscape", body: "Frontier-model competition from OpenAI, Anthropic, Google and Meta could compress xAI's commercial trajectory." },
        { title: "Regulatory scrutiny", body: "Tesla and xAI face ongoing regulatory action across autonomy, securities disclosure and AI safety jurisdictions globally." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  NVIDIA — AI infrastructure backbone
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "nvidia" },
    {
      slug: "nvidia",
      name: "NVIDIA Corporation",
      sector: "AI Infrastructure",
      tagline: "Foundation exposure to the compute backbone of the AI era",
      description: `NVIDIA (NASDAQ: NVDA) is the unrivalled supplier of accelerated computing hardware powering the global artificial intelligence build-out. Every major frontier-model lab, hyperscaler and sovereign AI programme runs on NVIDIA GPUs, CUDA, and the Networking + Software stack.

This offering provides accredited investors with structured Aurion exposure to NVDA common equity through a quarterly-rebalanced tracker note, supplemented by a small allocation to private-market secondary positions in NVIDIA-backed companies (CoreWeave, Together AI, and selected portfolio names).

The investment thesis is straightforward: AI compute demand is doubling every six to nine months, capex from the largest seven AI buyers exceeds $400B annually, and NVIDIA captures the majority of that spend through its full-stack moat.`,
      baseValuation: 3_400_000_000_000,
      totalShares: 8_000_000,
      sharesRemaining: 4_500_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "$3.4T", label: "Market Cap", sub: "Among the world's most valuable" },
        { stat: "78%", label: "Trailing 1-Year", sub: "NVDA equity return" },
        { stat: "92%", label: "AI Training Share", sub: "Frontier-lab GPU market" },
        { stat: "Quarterly", label: "Rebalance", sub: "Tracker note structure" },
      ],
      team: [
        { name: "Jensen Huang", title: "Founder & CEO, NVIDIA", bio: "Co-founded NVIDIA in 1993. Architect of CUDA and the company's transition from gaming GPU manufacturer to dominant AI infrastructure platform. Widely regarded as the defining technology executive of the AI era.", initials: "JH" },
        { name: "Colette Kress", title: "Executive Vice President & CFO", bio: "CFO since 2013. Oversees NVIDIA's capital allocation, M&A and investor relations during the company's run from $7B to $3.4T market capitalisation.", initials: "CK" },
        { name: "Bill Dally", title: "Chief Scientist & SVP Research", bio: "Led NVIDIA Research since 2009. Former Chairman of Computer Science at Stanford. Holds over 120 patents in parallel computing.", initials: "BD" },
      ],
      useOfFunds: [
        { label: "NVDA Common Equity", pct: 75, color: "#76b900", description: "Direct economic tracker exposure to NVIDIA common stock" },
        { label: "CoreWeave Secondary", pct: 12, color: "#1a3a5c", description: "Aurion-held secondary position in NVIDIA-backed AI cloud infrastructure provider" },
        { label: "AI Portfolio Basket", pct: 9, color: "#2d6a9f", description: "Curated allocation to NVIDIA NVentures portfolio companies" },
        { label: "Liquidity Reserve", pct: 4, color: "#64748b", description: "Rebalancing reserve" },
      ],
      metrics: [
        { label: "Data Centre Revenue", value: "$48.4B/qtr", trend: "+154% YoY" },
        { label: "Gross Margin", value: "75%", trend: "Premium pricing power" },
        { label: "AI Training GPU Share", value: "~92%", trend: "Frontier labs" },
        { label: "Blackwell Backlog", value: ">12 months", trend: "Demand-constrained" },
        { label: "R&D Investment", value: "$13B/yr", trend: "AI stack leadership" },
        { label: "Founded", value: "1993", trend: "Public since 1999" },
      ],
      risks: [
        { title: "Customer concentration", body: "Approximately 40% of data-centre revenue is concentrated in the four largest hyperscalers. Slowdown in any one materially impacts results." },
        { title: "Competitive displacement", body: "AMD MI300, Google TPU, and custom hyperscaler silicon (Trainium, Maia) represent a credible long-term threat to NVDA's training dominance." },
        { title: "Export controls", body: "U.S. semiconductor export controls limit NVIDIA's access to the Chinese market, historically 20–25% of data-centre revenue." },
        { title: "AI capex cycle", body: "If global AI training spend plateaus or contracts, NVIDIA earnings are exposed to a cyclical downturn." },
        { title: "Valuation", body: "NVDA trades at premium multiples to historical norms. Multiple compression could impact returns even with continued operational growth." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  AURION AI GROWTH FUND — diversified AI/robotics basket
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "aurion-ai-growth-fund" },
    {
      slug: "aurion-ai-growth-fund",
      name: "Aurion AI Growth Fund",
      sector: "Artificial Intelligence",
      tagline: "Diversified exposure to the world's most consequential AI companies",
      description: `The Aurion AI Growth Fund is a discretionary, actively managed basket of public and private AI investments. The fund spans the full AI value chain: foundational compute (NVIDIA, AMD, TSMC), frontier-model laboratories (OpenAI secondaries, Anthropic, xAI), application-layer leaders (Palantir, ServiceNow, Microsoft Copilot exposure), robotics platforms (Tesla Optimus, Figure, Agility), and the long-tail of AI-native private growth companies.

The portfolio is rebalanced quarterly by the Aurion AI Investment Committee, chaired by former senior leadership from Sequoia AI Practice and Andreessen Horowitz's American Dynamism fund. The fund's mandate is to capture the once-in-a-generation capital cycle around general-purpose AI, while managing concentration and beta to any single name.`,
      baseValuation: 480_000_000,
      totalShares: 1_200_000,
      sharesRemaining: 720_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers,
      highlights: [
        { stat: "32", label: "Holdings", sub: "Public + private blend" },
        { stat: "+61%", label: "Inception Return", sub: "Since launch 2024" },
        { stat: "44%", label: "Private Allocation", sub: "Pre-IPO secondaries" },
        { stat: "Quarterly", label: "Rebalance", sub: "Active management" },
      ],
      team: [
        { name: "Dr. Priyanka Ravi", title: "Portfolio Manager", bio: "Former General Partner at Sequoia AI Practice. Led early investments in OpenAI, Hugging Face and Anthropic. PhD in Machine Learning from Stanford.", initials: "PR" },
        { name: "Marcus Wei", title: "Head of Public AI", bio: "Former Senior Analyst at Tiger Global covering AI software. 14 years in public-market technology investing.", initials: "MW" },
        { name: "Hannah Okonjo", title: "Head of AI Risk", bio: "Former Risk Officer at Citadel's Surveyor Capital. Builds the fund's concentration, factor and scenario framework.", initials: "HO" },
      ],
      useOfFunds: [
        { label: "AI Compute & Semiconductors", pct: 38, color: "#c9a84c", description: "NVIDIA, AMD, TSMC, ASML, Broadcom — foundation-layer exposure" },
        { label: "Frontier-Model Labs (Private)", pct: 26, color: "#1a3a5c", description: "OpenAI, Anthropic, xAI, Mistral secondaries" },
        { label: "AI Applications", pct: 18, color: "#2d6a9f", description: "Palantir, ServiceNow, Microsoft, Salesforce, Adobe" },
        { label: "Robotics & Embodied AI", pct: 12, color: "#76b900", description: "Tesla Optimus exposure, Figure AI, Agility Robotics" },
        { label: "AI Cloud Infrastructure", pct: 6, color: "#64748b", description: "CoreWeave, Together AI, Lambda Labs" },
      ],
      metrics: [
        { label: "Inception Return", value: "+61%", trend: "Since Jan 2024" },
        { label: "Public / Private Mix", value: "56 / 44", trend: "Targeting 60/40" },
        { label: "Concentration", value: "<8% per name", trend: "Risk-managed" },
        { label: "Sharpe Ratio", value: "1.84", trend: "Trailing 12M" },
        { label: "Top 10 Weight", value: "62%", trend: "Concentrated conviction" },
        { label: "Vintage", value: "2024", trend: "Open-ended fund" },
      ],
      risks: [
        { title: "AI thesis risk", body: "If the broad AI capex cycle decelerates, the fund's beta to AI-themed equities and private valuations could result in sustained drawdowns." },
        { title: "Private mark uncertainty", body: "44% of NAV is private secondary positions marked quarterly. Public-market repricing of AI may flow through to private marks with a lag." },
        { title: "Concentration in compute", body: "38% of the portfolio is concentrated in semiconductor and compute infrastructure. A cyclical correction would materially impact NAV." },
        { title: "Regulatory & safety risk", body: "Frontier-AI regulation, content liability, and AI safety incidents could compress portfolio company multiples." },
        { title: "Liquidity timing", body: "Redemptions of private positions may be gated or processed over an extended window during stressed conditions." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  APPLE — consumer tech blue-chip
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "apple" },
    {
      slug: "apple",
      name: "Apple Inc.",
      sector: "Consumer Technology",
      tagline: "Defensive blue-chip technology exposure with AI services upside",
      description: `Apple Inc. (NASDAQ: AAPL) remains the most valuable consumer technology franchise globally, with 2.3 billion active devices, $385B in annual revenue, and the highest gross margin profile among the mega-cap technology peers.

This Aurion-managed tracker note provides structured exposure to AAPL equity with quarterly distribution of dividends. Apple Intelligence — the company's foundation-model layer integrated across iOS, macOS and the upcoming Vision Pro generation — represents the principal growth catalyst.`,
      baseValuation: 3_100_000_000_000,
      totalShares: 6_000_000,
      sharesRemaining: 3_900_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "$3.1T", label: "Market Cap", sub: "Largest US listed company" },
        { stat: "2.3B", label: "Active Devices", sub: "Global installed base" },
        { stat: "23%", label: "Trailing 1-Year", sub: "AAPL equity return" },
        { stat: "$96B", label: "Services Revenue", sub: "ARR-like recurring" },
      ],
      team: [
        { name: "Tim Cook", title: "Chief Executive Officer", bio: "CEO of Apple since 2011. Architect of Apple's transition into services and silicon-vertical-integration.", initials: "TC" },
        { name: "Luca Maestri", title: "Chief Financial Officer", bio: "CFO of Apple since 2014. Oversees capital return programmes totalling >$700B since inception.", initials: "LM" },
      ],
      useOfFunds: [
        { label: "AAPL Common Equity", pct: 95, color: "#c9a84c", description: "Direct tracker exposure to Apple common stock" },
        { label: "Liquidity Reserve", pct: 5, color: "#64748b", description: "Rebalancing buffer" },
      ],
      metrics: [
        { label: "Revenue", value: "$385B/yr", trend: "Stable mega-cap" },
        { label: "Gross Margin", value: "46%", trend: "Premium pricing" },
        { label: "Services Growth", value: "+14% YoY", trend: "ARR-like" },
        { label: "Buyback Programme", value: "$110B", trend: "Largest in history" },
        { label: "Founded", value: "1976", trend: "Public since 1980" },
      ],
      risks: [
        { title: "China exposure", body: "China represents approximately 20% of revenue and is concentrated in iPhone hardware. Geopolitical or competitive headwinds could impact results." },
        { title: "iPhone cycle", body: "Approximately 50% of revenue depends on iPhone refresh cycles. A muted cycle materially impacts top-line." },
        { title: "AI execution", body: "Apple Intelligence rollout is behind frontier-lab peers. Delayed monetisation could compress services multiple expansion." },
        { title: "Regulatory risk", body: "App Store antitrust litigation in EU, US and UK could compress services margin." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  MICROSOFT — AI/cloud leader
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "microsoft" },
    {
      slug: "microsoft",
      name: "Microsoft Corporation",
      sector: "Cloud & Enterprise AI",
      tagline: "Hyperscale cloud and the deepest enterprise AI distribution",
      description: `Microsoft (NASDAQ: MSFT) is the largest enterprise software franchise in the world, the principal commercial partner to OpenAI, and operator of the Azure hyperscaler — the second-largest cloud platform globally.

The Aurion tracker note provides structured exposure to MSFT common equity. Investment thesis centres on Microsoft's monetisation of generative AI through Copilot, Azure OpenAI Service, and embedded AI features across Office, GitHub, Dynamics and the developer tooling stack.`,
      baseValuation: 3_050_000_000_000,
      totalShares: 6_000_000,
      sharesRemaining: 3_600_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "$3.05T", label: "Market Cap", sub: "Among world's largest" },
        { stat: "+31%", label: "Trailing 1-Year", sub: "MSFT equity return" },
        { stat: "$245B", label: "Annual Revenue", sub: "FY 2025" },
        { stat: "30%+", label: "Azure Growth", sub: "Constant currency" },
      ],
      team: [
        { name: "Satya Nadella", title: "Chairman & CEO", bio: "CEO since 2014. Architect of Microsoft's cloud and AI transformation; engineered the OpenAI commercial partnership.", initials: "SN" },
        { name: "Amy Hood", title: "Chief Financial Officer", bio: "CFO of Microsoft since 2013. Recognised industry leader in cloud-economics disclosure and capital allocation.", initials: "AH" },
      ],
      useOfFunds: [
        { label: "MSFT Common Equity", pct: 95, color: "#c9a84c", description: "Direct tracker exposure to Microsoft" },
        { label: "Liquidity Reserve", pct: 5, color: "#64748b", description: "Rebalancing buffer" },
      ],
      metrics: [
        { label: "Azure Revenue", value: "$80B+/yr", trend: "+30% YoY" },
        { label: "Office Commercial", value: "$60B+/yr", trend: "Copilot-driven" },
        { label: "Operating Margin", value: "44%", trend: "Best-in-class" },
        { label: "OpenAI Partnership", value: "Strategic", trend: "Exclusive cloud" },
        { label: "Founded", value: "1975", trend: "Public since 1986" },
      ],
      risks: [
        { title: "AI capex pressure", body: "Azure AI infrastructure capex is materially above historical norms. If utilisation lags, margins compress." },
        { title: "OpenAI dependency", body: "The commercial partnership with OpenAI is mutually beneficial but introduces concentration risk." },
        { title: "Cloud competition", body: "AWS retains scale lead and Google Cloud is closing the gap. Pricing pressure could weigh on margins." },
        { title: "Regulatory scrutiny", body: "Activision acquisition and AI bundling practices face ongoing antitrust review." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  AMAZON — e-commerce + AWS + AI
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "amazon" },
    {
      slug: "amazon",
      name: "Amazon.com, Inc.",
      sector: "E-Commerce & Cloud",
      tagline: "Hyperscale logistics, cloud, and AI distribution in a single franchise",
      description: `Amazon (NASDAQ: AMZN) operates the world's largest e-commerce platform and AWS — the largest cloud infrastructure provider globally. The Aurion tracker note offers structured exposure to AMZN common equity with quarterly mark-to-market.

The investment thesis centres on AWS's Bedrock generative AI platform, the Anthropic strategic partnership, accelerating retail margin expansion, and the embedded option value of Amazon's logistics network as an AI-augmented service business.`,
      baseValuation: 2_400_000_000_000,
      totalShares: 5_000_000,
      sharesRemaining: 3_100_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "$2.4T", label: "Market Cap", sub: "Diversified mega-cap" },
        { stat: "+38%", label: "Trailing 1-Year", sub: "AMZN equity return" },
        { stat: "$108B", label: "AWS Revenue", sub: "Run-rate" },
        { stat: "$8B", label: "Anthropic Invest", sub: "Strategic AI stake" },
      ],
      team: [
        { name: "Andy Jassy", title: "President & CEO", bio: "CEO of Amazon since 2021. Architect of AWS from inception. Drove Amazon's enterprise AI strategy including the $8B Anthropic investment.", initials: "AJ" },
        { name: "Brian Olsavsky", title: "Chief Financial Officer", bio: "CFO of Amazon since 2015. Oversees disciplined capital allocation across retail, AWS and emerging-bets.", initials: "BO" },
      ],
      useOfFunds: [
        { label: "AMZN Common Equity", pct: 95, color: "#c9a84c", description: "Direct tracker exposure to Amazon" },
        { label: "Liquidity Reserve", pct: 5, color: "#64748b", description: "Rebalancing buffer" },
      ],
      metrics: [
        { label: "AWS Revenue", value: "$108B/yr", trend: "+19% YoY" },
        { label: "Retail Operating Margin", value: "5.8%", trend: "Expanding" },
        { label: "Anthropic Stake", value: "$8B", trend: "Strategic AI" },
        { label: "Founded", value: "1994", trend: "Public since 1997" },
      ],
      risks: [
        { title: "Retail margin volatility", body: "Retail margins compress under freight, wage, and competitive pressure." },
        { title: "AWS competition", body: "Azure and Google Cloud growth accelerating; AWS share gains may slow." },
        { title: "Regulatory", body: "FTC antitrust action targeting marketplace practices remains an overhang." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  META — Reality Labs + Llama
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "meta" },
    {
      slug: "meta",
      name: "Meta Platforms, Inc.",
      sector: "Social, AI & Reality Labs",
      tagline: "Operator of Llama, the world's most-downloaded open foundation model",
      description: `Meta Platforms (NASDAQ: META) operates Facebook, Instagram, WhatsApp and Threads — the largest social graph in the world with 3.9 billion monthly users — alongside Reality Labs (Quest, Ray-Ban Meta) and the Llama foundation-model programme.

The Aurion tracker note provides structured exposure to META common equity. The investment case is dominated by AI-driven ad ranking improvements (Andromeda), the open-source Llama distribution moat, and operating leverage from the 'Year of Efficiency'.`,
      baseValuation: 1_500_000_000_000,
      totalShares: 4_000_000,
      sharesRemaining: 2_400_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "$1.5T", label: "Market Cap", sub: "Top-10 listed equity" },
        { stat: "+52%", label: "Trailing 1-Year", sub: "META equity return" },
        { stat: "3.9B", label: "MAUs", sub: "Across Family of Apps" },
        { stat: "Open", label: "Llama Models", sub: "Frontier open-weight" },
      ],
      team: [
        { name: "Mark Zuckerberg", title: "Founder, Chairman & CEO", bio: "Founded Meta (Facebook) in 2004. Drives Meta's AI and Reality Labs strategy.", initials: "MZ" },
        { name: "Susan Li", title: "Chief Financial Officer", bio: "CFO of Meta since 2022. Architect of Meta's operating discipline transformation since 2022.", initials: "SL" },
      ],
      useOfFunds: [
        { label: "META Common Equity", pct: 95, color: "#c9a84c", description: "Direct tracker exposure to Meta Platforms" },
        { label: "Liquidity Reserve", pct: 5, color: "#64748b", description: "Rebalancing buffer" },
      ],
      metrics: [
        { label: "Annual Revenue", value: "$165B/yr", trend: "+22% YoY" },
        { label: "Operating Margin", value: "42%", trend: "Expanding" },
        { label: "Reality Labs Loss", value: "-$18B", trend: "Investment phase" },
        { label: "Llama Downloads", value: ">650M", trend: "Open-source leader" },
      ],
      risks: [
        { title: "Reality Labs drag", body: "Reality Labs losses continue to weigh on consolidated margins." },
        { title: "Ad market cyclicality", body: "Ad revenue is sensitive to macro conditions and platform changes." },
        { title: "Regulatory headwinds", body: "EU DMA, FTC, and child-safety legislation create ongoing compliance overhead." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  ALPHABET / GOOGLE
   * ════════════════════════════════════════════════════════════════════*/
  await Company.findOneAndUpdate(
    { slug: "alphabet" },
    {
      slug: "alphabet",
      name: "Alphabet Inc. (Google)",
      sector: "AI, Search & Cloud",
      tagline: "Operator of Gemini, Google Cloud and the world's leading search platform",
      description: `Alphabet (NASDAQ: GOOGL) is the parent of Google, YouTube, Android, Google Cloud, Waymo and DeepMind. The Aurion tracker note offers structured exposure to GOOGL common equity. The investment case centres on the Gemini foundation-model family, Google Cloud's accelerating AI workload share, and Waymo's emerging autonomous-mobility franchise.`,
      baseValuation: 2_200_000_000_000,
      totalShares: 5_000_000,
      sharesRemaining: 3_000_000,
      minInvestment: 1000,
      status: "active",
      tiers: retailTiers.filter((t) => t.order >= 2),
      highlights: [
        { stat: "$2.2T", label: "Market Cap", sub: "Top-5 listed equity" },
        { stat: "+27%", label: "Trailing 1-Year", sub: "GOOGL equity return" },
        { stat: "Gemini", label: "Frontier Model", sub: "Native multimodal" },
        { stat: "Waymo", label: "AV Leader", sub: "10M+ paid trips/yr" },
      ],
      team: [
        { name: "Sundar Pichai", title: "CEO, Alphabet & Google", bio: "CEO since 2015 (Google) and 2019 (Alphabet). Architect of Google's AI-first strategy.", initials: "SP" },
        { name: "Anat Ashkenazi", title: "Chief Financial Officer", bio: "CFO of Alphabet since 2024. Previously CFO of Eli Lilly.", initials: "AA" },
      ],
      useOfFunds: [
        { label: "GOOGL Common Equity", pct: 95, color: "#c9a84c", description: "Direct tracker exposure to Alphabet" },
        { label: "Liquidity Reserve", pct: 5, color: "#64748b", description: "Rebalancing buffer" },
      ],
      metrics: [
        { label: "Annual Revenue", value: "$355B/yr", trend: "+13% YoY" },
        { label: "Google Cloud", value: "+30% YoY", trend: "Accelerating" },
        { label: "YouTube Revenue", value: "$40B+/yr", trend: "Stable" },
        { label: "Waymo Trips", value: "10M+/yr", trend: "Scaling" },
      ],
      risks: [
        { title: "Search disruption", body: "Generative AI assistants threaten to disintermediate Google's core search query funnel." },
        { title: "DOJ antitrust", body: "Active US DOJ antitrust action targeting search distribution remains unresolved." },
        { title: "AI capex", body: "AI infrastructure capex elevated to defend market share." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  /* ════════════════════════════════════════════════════════════════════
   *  Retain existing offerings — NexGen Logistics, Solara, Meridian
   * ════════════════════════════════════════════════════════════════════*/

  await Company.findOneAndUpdate(
    { slug: "nexgen-logistics" },
    {
      slug: "nexgen-logistics",
      name: "NexGen Logistics",
      sector: "Infrastructure",
      tagline: "Redefining last-mile delivery infrastructure across North America",
      description: `NexGen Logistics is building the next generation of urban distribution infrastructure. With proprietary micro-fulfillment technology and a rapidly expanding network of 47 fulfilment nodes across 12 major metros, NexGen is positioned to capture 4% of the $800B North American logistics market by 2028.

Founded in 2019 by former Amazon operations executives, the company has achieved 340% revenue growth over three years and secured long-term contracts with three Fortune 500 retailers.`,
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
        { name: "Marcus Chen", title: "Chief Executive Officer", bio: "Former VP of Operations at Amazon Logistics.", initials: "MC" },
        { name: "Priya Nair", title: "Chief Technology Officer", bio: "Previously led routing algorithm development at FedEx.", initials: "PN" },
        { name: "James Okafor", title: "Chief Financial Officer", bio: "15 years in infrastructure finance.", initials: "JO" },
      ],
      useOfFunds: [
        { label: "New Fulfilment Nodes", pct: 58, color: "#c9a84c", description: "Construction of 23 new distribution centres" },
        { label: "Technology Infrastructure", pct: 22, color: "#1a3a5c", description: "Routing platform and IoT" },
        { label: "Working Capital", pct: 12, color: "#2d6a9f", description: "Ramp-up runway" },
        { label: "Sales & Enterprise", pct: 8, color: "#64748b", description: "Enterprise sales expansion" },
      ],
      metrics: [
        { label: "Annual Revenue", value: "$18.4M", trend: "+127% YoY" },
        { label: "EBITDA Margin", value: "34%", trend: "Expanding" },
        { label: "Enterprise Clients", value: "12", trend: "+4 this year" },
      ],
      risks: [
        { title: "Concentration risk", body: "Three clients represent approximately 48% of contracted revenue." },
        { title: "Real estate market", body: "Industrial lease rates have risen 22% since 2022." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  await Company.findOneAndUpdate(
    { slug: "solara-energy" },
    {
      slug: "solara-energy",
      name: "Solara Energy",
      sector: "Real Estate",
      tagline: "Commercial solar infrastructure with embedded long-term lease agreements",
      description: `Solara Energy acquires and develops commercial rooftop solar installations across the Sun Belt, securing 20-year power purchase agreements with credit-rated tenants.`,
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
      ],
      team: [
        { name: "Sarah Okonkwo", title: "Chief Executive Officer", bio: "Former Managing Director at SunPower's commercial division.", initials: "SO" },
      ],
      useOfFunds: [
        { label: "Portfolio Acquisition", pct: 62, color: "#c9a84c", description: "14-site portfolio at 22% discount" },
        { label: "New Installations", pct: 24, color: "#1a3a5c", description: "Equipment for 18 new properties" },
        { label: "Grid Interconnection", pct: 9, color: "#2d6a9f", description: "Utility interconnection fees" },
        { label: "Operations Reserve", pct: 5, color: "#64748b", description: "Maintenance reserves" },
      ],
      metrics: [
        { label: "Contracted Revenue", value: "$3.2M/yr", trend: "100% locked" },
        { label: "Portfolio DSCR", value: "1.84x", trend: "Strong coverage" },
      ],
      risks: [
        { title: "Tenant default", body: "Tenant default ceases revenue until replacement is secured." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  await Company.findOneAndUpdate(
    { slug: "meridian-credit" },
    {
      slug: "meridian-credit",
      name: "Meridian Credit Partners",
      sector: "Private Credit",
      tagline: "Senior secured lending to mid-market healthcare and professional services",
      description: `Meridian Credit Partners provides senior secured term loans to mid-market healthcare, dental and veterinary platforms. Portfolio average LTV 58%, weighted yield 13.2%, zero losses since 2021.`,
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
      ],
      team: [
        { name: "Robert Kimani", title: "Managing Partner", bio: "Former Head of Healthcare Lending at Golub Capital.", initials: "RK" },
      ],
      useOfFunds: [
        { label: "New Loan Originations", pct: 78, color: "#c9a84c", description: "Active pipeline funding" },
        { label: "Reserve Capital", pct: 14, color: "#1a3a5c", description: "Six-month liquidity reserve" },
        { label: "Deal Pipeline", pct: 8, color: "#2d6a9f", description: "Origination costs" },
      ],
      metrics: [
        { label: "Portfolio Size", value: "$12.4M", trend: "Fully deployed" },
        { label: "Active Borrowers", value: "15", trend: "Healthcare focus" },
      ],
      risks: [
        { title: "Credit concentration", body: "15 active borrowers; default of any single borrower above 8% impacts returns." },
      ],
    },
    { upsert: true, returnDocument: "after" }
  );

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err); process.exit(1); });
