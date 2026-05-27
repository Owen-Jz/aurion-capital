# Aurion Capital Group — Investment Platform
## Implementation Plan v1.0
**Date:** 2026-05-26  
**Status:** Draft — awaiting owner review

---

## 1. What This Platform Is

Aurion's investment platform allows accredited investors to purchase shares in curated companies listed by Aurion. It is **not** a public stock exchange. It is a **private, admin-gated investment marketplace** where:

- Companies are listed by Aurion with a stated valuation and available share pool
- Investors browse companies, select a share tier, and submit an investment application
- An admin reviews and approves every application before money moves
- Once approved, the investor receives a payment email with instructions
- After payment is confirmed, legal documents are generated and sent for e-signature
- The investor's portfolio updates to reflect their new holdings

Every investment requires human approval. No one can invest without Aurion's sign-off.

---

## 2. The Core User Journey (Step by Step)

```
1. Register / Sign In
        ↓
2. Browse Company Listings
        ↓
3. Select a Company + Choose Share Tier
        ↓
4. Fill Investment Application Form
   (personal info, investor declaration, amount)
        ↓
5. Application submitted → STATUS: "Pending Review"
        ↓
6. ADMIN: Reviews application in dashboard
        ↓
   [Rejected] → Investor gets rejection email with reason
        ↓
   [Approved] → Investor gets approval email
        ↓
7. Approval Email contains:
   - Congratulations message
   - Investment summary (company, shares, amount)
   - CTA button: "Complete Your Investment"
        ↓
8. CTA lands on: Payment Page
   - Shows exact amount due
   - Payment method: crypto wallet address (copy to clipboard)
     and/or bank wire instructions
   - Investor uploads payment proof / reference
        ↓
9. ADMIN: Confirms payment receipt
        ↓
10. System generates legal documents:
    - Subscription Agreement
    - Share Certificate
        ↓
11. Documents emailed to investor for e-signature
        ↓
12. Investor signs documents (DocuSign-style or in-platform)
        ↓
13. Shares added to investor's portfolio
    - Company valuation updates to reflect new investment
    - Portfolio dashboard reflects new holdings
```

---

## 3. Platform Sections

### 3.1 Public / Marketing Site (already built)
The existing landing page, capabilities pages, and contact page. The "Client Portal" button in the nav is the entry point.

### 3.2 Auth (already built — needs backend)
- `/login` — Email + password
- `/signup` — Registration with investor type selection

### 3.3 Investor Portal — Dashboard
After login, the investor sees:

| Section | What it shows |
|---|---|
| Portfolio Summary | Total invested, current value, overall return |
| Holdings | Table of each company they've invested in: shares held, current price per share, total value |
| Company Value Tracker | Visual showing how their investment moves the company's total valuation |
| Pending Applications | Applications awaiting admin approval |
| Recent Activity | Payments, document sends, approvals |
| AI Investment Suggestions | A curated list of recommended opportunities (see Section 5) |

### 3.4 Company Listings (Browse & Invest)
A marketplace-style page listing all active investment opportunities.

**Each company card shows:**
- Company name + sector
- Current total valuation
- Available shares remaining
- Minimum investment tier
- A "Invest Now" button

**Company detail page shows:**
- Full company description
- Founding team / key people
- Financials summary (revenue, growth, use of funds)
- Current cap table breakdown (how much Aurion holds, how much is investor-owned)
- Share price history chart
- Available investment tiers
- A clear "Apply to Invest" CTA

### 3.5 Investment Application Flow
When an investor clicks "Apply to Invest" on a company:

**Step 1 — Confirm your details**
Pre-filled from their profile. They verify name, address, investor type.

**Step 2 — Select your investment size**
Shares are sold in fixed tiers. Example tiers:

| Tier | Investment | Shares | % of Pool |
|---|---|---|---|
| Entry | $5,000 | 50 shares | 0.05% |
| Growth | $10,000 | 100 shares | 0.10% |
| Premium | $25,000 | 250 shares | 0.25% |
| Institutional | $50,000 | 500 shares | 0.50% |
| Anchor | $100,000 | 1,000 shares | 1.00% |

The tiers available per company are configured by the admin when listing the company.

**Step 3 — Investor Declaration**
A checkbox series confirming:
- They are an accredited investor
- They understand the investment is illiquid
- They have read the company information
- They agree to the terms

**Step 4 — Review & Submit**
Summary of everything. Submit sends the application.

**Confirmation page:** "Your application is under review. You'll hear from us within 2 business days."

### 3.6 Payment Page
Accessed only via the link in the approval email (tokenised URL — cannot be accessed without the email link).

**Shows:**
- Investment summary (company, tier, amount)
- Payment instructions:
  - **Crypto:** Wallet address with one-click copy button + QR code
  - **Wire transfer:** Bank name, account number, routing/SWIFT, reference code
- Upload field: "Upload payment confirmation" (screenshot or PDF)
- Submit button: "I've Made Payment"

After submission: "Payment received — we'll verify and send your documents within 24 hours."

### 3.7 Document Signing
After admin confirms payment, the system emails the investor:
- Subscription Agreement (pre-filled with their details)
- Share Certificate

**Signing flow options (two approaches — pick one):**
1. **In-platform signing:** Show the document in the portal, with a "Sign Document" button that records timestamp + IP as legal signature confirmation
2. **Third-party integration:** DocuSign or HelloSign API — more legally robust, easier compliance

Recommend: Start with in-platform signing for speed. Upgrade to DocuSign when scaling.

---

## 4. Admin Dashboard

The admin has a separate dashboard at `/admin` (already partially built from previous work).

### 4.1 Investment Applications Queue
A table of all pending, approved, and rejected applications.

Columns: Investor Name | Company | Tier | Amount | Date Submitted | Status | Actions

Actions per row:
- View full application
- Approve (triggers approval email)
- Reject (opens a reason field, triggers rejection email)
- Request more info (sends a message to the investor)

### 4.2 Company Management
Admin can create, edit, and unpublish company listings.

Fields per company:
- Company name, sector, description
- Total valuation
- Total share pool size
- Available investment tiers (which tiers to enable)
- Status: Draft | Active | Closed
- Upload: company pitch deck / financial summary PDF

### 4.3 Payment Confirmation Queue
After an investor submits payment proof, admin sees a queue to confirm.

Confirming payment triggers:
- Document generation
- Email with documents to investor

### 4.4 Investor Management
List of all registered investors with their:
- Profile and KYC status
- Total amount invested
- Holdings summary
- Application history

### 4.5 Portfolio Value Management
Admin can update the current share price for each company. When they do:
- All investors who hold shares in that company see their portfolio value update
- A notification is sent to affected investors

---

## 5. AI Investment Feature

A curated "Recommended for You" section inside the investor portal.

### What it does:
- Analyzes the investor's current portfolio (sectors, tiers, risk level)
- Suggests companies from the active listings that complement their holdings
- Shows a short rationale for each suggestion ("You have 60% in Real Estate — this Infrastructure deal diversifies your exposure")

### Implementation approach:
- **Phase 1 (Simple):** Rule-based logic. If investor has X in sector Y, recommend Z from available listings. No AI API needed. Fast to build.
- **Phase 2 (AI-powered):** Call Claude/OpenAI API with investor profile + available listings. API returns ranked suggestions with natural-language rationale. More compelling UX.

Recommend starting with Phase 1 and upgrading to Phase 2 in the next iteration.

---

## 6. How Share Purchases Affect Company Worth

This is a key visual mechanic on the platform.

**The logic:**
- Each company has a base valuation set by Aurion (e.g., $10,000,000)
- Total shares available: e.g., 100,000 shares → each share = $100 at base valuation
- As investors buy shares, the "investor-owned" portion of the company grows
- The platform displays: "X% investor-owned" and a live total of capital raised

**What changes when someone buys:**
- "Total Raised" counter increases
- "Shares Available" counter decreases
- The company's "investor ownership %" increases
- The investor's portfolio shows their % stake

**What does NOT change:** The company's base valuation does not go up just because people bought shares. The valuation is updated only by the admin. This prevents artificial inflation.

---

## 7. Email Notifications Required

| Trigger | Email to | Content |
|---|---|---|
| Application submitted | Investor | "Application received — under review" |
| Application submitted | Admin | "New application needs review" |
| Application approved | Investor | Approval + "Complete Your Investment" CTA button |
| Application rejected | Investor | Rejection + reason + "contact us" link |
| Payment submitted | Admin | "Payment proof submitted — confirm receipt" |
| Payment confirmed | Investor | "Payment confirmed — documents incoming" |
| Documents sent | Investor | Documents attached + "Sign Now" CTA |
| Documents signed | Admin | "Investor has signed — shares can be issued" |
| Shares issued | Investor | "Your shares have been issued — view your portfolio" |
| Company valuation updated | All holders | "Your portfolio value has been updated" |

---

## 8. Database Models (High-Level)

| Model | Key Fields |
|---|---|
| User | id, name, email, password, investorType, kycStatus, createdAt |
| Company | id, name, sector, description, baseValuation, totalShares, status |
| ShareTier | id, companyId, name, price, sharesIncluded, available |
| Application | id, userId, companyId, tierId, amount, status, adminNote, createdAt |
| Payment | id, applicationId, method, proofUrl, confirmedAt, confirmedBy |
| Investment | id, userId, companyId, sharesHeld, purchasePrice, purchasedAt |
| Document | id, investmentId, type, url, signedAt, signedByIp |
| Notification | id, userId, type, read, createdAt |

---

## 9. Tech Stack Recommendation

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js App Router (already in use) | Already built |
| Database | PostgreSQL via Prisma (already installed) | Already in package.json |
| Auth | NextAuth.js or custom JWT | Simple to add |
| Email | Resend or SendGrid | Simple API, great templates |
| File storage | Vercel Blob or AWS S3 | For payment proof uploads and documents |
| Document generation | pdf-lib or Puppeteer | Generate PDFs server-side |
| E-signature (Phase 1) | In-platform (custom) | Fast to build |
| E-signature (Phase 2) | DocuSign or HelloSign API | Compliance-grade |
| AI suggestions | Anthropic Claude API | Already on Anthropic stack |
| Payments | Crypto address (manual) + wire instructions | As per requirements |

---

## 10. Build Order (Recommended Phases)

### Phase 1 — Core Investment Flow (Priority)
1. Auth with real backend (NextAuth + Prisma + PostgreSQL)
2. Company listings page + company detail page
3. Investment application form (multi-step)
4. Admin: application review queue + approve/reject actions
5. Email on approval with tokenised payment link
6. Payment page (copy wallet address + upload proof)
7. Admin: confirm payment
8. In-platform document signing (basic)
9. Portfolio dashboard updates after shares issued

### Phase 2 — Polish & Scale
1. DocuSign integration replacing in-platform signing
2. AI investment suggestions (Claude API)
3. Company valuation update system + investor notifications
4. Admin: company management (create/edit/publish listings)
5. KYC verification flow (identity document upload)

### Phase 3 — Advanced
1. Secondary market (investor-to-investor share transfers)
2. Dividend / distribution tracking
3. Full audit log
4. Investor reporting (quarterly statements, tax documents)

---

## 11. Open Questions (Needs Owner Decision)

1. **Payment method:** Crypto only, wire only, or both? Which crypto? (ETH, USDC, BTC?)
2. **E-signature:** Start with in-platform basic signing, or integrate DocuSign from day one?
3. **KYC:** Does Aurion verify investor identity manually, or use an automated KYC API (Persona, Jumio)?
4. **Share price updates:** How often does the admin update company valuations? Is it manual or formula-driven?
5. **AI suggestions:** Phase 1 rule-based, or do you want Claude API from the start?
6. **Who is the "admin":** One person, or multiple admin roles (reviewer, finance team, legal)?

---

*This document represents the full scope of the investment platform as described. Review the open questions in Section 11 before Phase 1 begins.*
