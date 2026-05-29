/**
 * Investment document content templates.
 *
 * Each function returns the body text rendered into the document viewer
 * on the payment page. The contracted return profile depends on the
 * investment plan duration the investor selected when applying.
 */

import type { InvestmentPlan } from "./plans";

export interface DocumentArgs {
  investorName: string;
  companyName: string;
  tierName: string;
  amount: number;
  shares: number;
  plan: InvestmentPlan;
  applicationDate: string; // ISO date
}

export function ndaDocument(args: DocumentArgs): string {
  const {
    investorName,
    companyName,
    tierName,
    amount,
    plan,
    applicationDate,
  } = args;
  const date = new Date(applicationDate);
  const dateFmt = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `# NON-DISCLOSURE AND INVESTMENT RETURN AGREEMENT

**Reference:** Aurion–${escapeId(companyName)}–${dateFmt}

This Non-Disclosure and Investment Return Agreement (this "Agreement") is entered into as of ${dateFmt} by and between:

**Aurion Capital Group, LLC** ("Aurion"), a Delaware limited liability company with principal offices at 200 Park Avenue, Suite 4200, New York, NY 10166; and

**${investorName}** (the "Investor"), in connection with a subscription for the ${tierName} tier of ${companyName} (the "Offering").

---

## 1. Confidential Information

In connection with the Offering, Aurion will furnish the Investor with certain non-public information including financial projections, capital structure, founder background, technology assets, customer pipelines, and proprietary risk analytics (collectively, "Confidential Information"). The Investor agrees to keep all Confidential Information strictly confidential and to use it solely for the purpose of evaluating and holding the investment.

## 2. Term

This Agreement shall remain in effect for **five (5) years** from the date first written above, irrespective of whether the Investor proceeds with the Offering.

## 3. Investment Holding Period and Return Profile

The Investor's commitment of **$${amount.toLocaleString()}** is contracted on the following return profile:

| Term | Specification |
|------|---------------|
| Holding Period | ${plan.label} (${plan.months} months) |
| Lock-Up Period | ${plan.lockUpDays} days from settlement |
| Target Gross Return | ${plan.targetReturn} over the holding period |
| Target Annualised IRR | ${plan.annualisedIrr} |
| Distribution Cadence | ${plan.distributionCadence} |
| Capital Return Window | Capital and final performance distribution shall be remitted within ${plan.capitalReturnWindowDays} days of the maturity date |

The above figures are targets only and do not constitute a guarantee of return. Actual performance is subject to the risk factors described in the Private Placement Memorandum.

## 4. Restrictions on Transfer

During the lock-up period the Investor may not assign, pledge, or otherwise transfer its interest in the Offering except (a) by operation of law, (b) with the prior written consent of Aurion, or (c) as permitted by the company's organisational documents.

## 5. Redemption

Following expiry of the lock-up period the Investor may submit a written redemption notice to Aurion. Redemptions shall be settled within ${plan.capitalReturnWindowDays} days of receipt, subject to available liquidity and the company's distribution waterfall.

## 6. Permitted Disclosures

The Investor may share Confidential Information with its professional advisers (legal, tax, accounting) who are bound by equivalent obligations of confidentiality.

## 7. Return of Information

Upon termination of this Agreement or written request, the Investor shall promptly return or destroy all Confidential Information in its possession or control.

## 8. Governing Law

This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict-of-law principles.

## 9. Counterparts and Electronic Execution

This Agreement may be executed electronically and in counterparts, each of which shall constitute an original.

---

**INVESTOR**

Signature: _____________________________________

Printed Name: ${investorName}

Date: ${dateFmt}

**FOR AURION CAPITAL GROUP, LLC**

Edward Hartwell, Managing Partner — Investor Relations
`;
}

export function subscriptionAgreement(args: DocumentArgs): string {
  const { investorName, companyName, tierName, amount, shares, plan, applicationDate } = args;
  const dateFmt = new Date(applicationDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `# SUBSCRIPTION AGREEMENT

**${companyName} — ${tierName} Tier**

This Subscription Agreement is made as of ${dateFmt} by **${investorName}** (the "Subscriber") in favour of **Aurion Capital Group, LLC** as agent for ${companyName} (the "Company").

## 1. Subscription

Subject to acceptance by the Company, the Subscriber irrevocably subscribes for and agrees to purchase ${shares.toLocaleString()} shares (the "Subscribed Securities") for an aggregate purchase price of $${amount.toLocaleString()} (the "Subscription Amount").

## 2. Settlement

The Subscription Amount shall be remitted in full via wire transfer or approved digital asset to the settlement accounts specified by Aurion within five (5) business days of execution.

## 3. Investor Representations

The Subscriber represents and warrants that it:
  (a) qualifies as an "accredited investor" within the meaning of Rule 501(a) under the Securities Act of 1933;
  (b) is acquiring the Subscribed Securities for its own account and not with a view to distribution;
  (c) has had an opportunity to review the Private Placement Memorandum and has consulted with such professional advisers as it deems necessary;
  (d) understands that the Subscribed Securities are illiquid, will be subject to a holding period of ${plan.label}, and that capital may not be redeemed prior to expiry of the ${plan.lockUpDays}-day lock-up.

## 4. Return Profile

The contracted return profile of this subscription is identical to that set out in the parallel Non-Disclosure and Investment Return Agreement: a target gross return of **${plan.targetReturn}** over the ${plan.label} holding period, with capital and final distribution remitted within ${plan.capitalReturnWindowDays} days of maturity.

## 5. Risk Acknowledgement

The Subscriber acknowledges that private market investments involve substantial risk including risk of total loss of capital. The full risk schedule is set out in the Private Placement Memorandum.

## 6. Anti-Money-Laundering

The Subscriber represents that the Subscription Amount has been derived from lawful sources and that the Subscriber is not a Specially Designated National or otherwise subject to sanctions administered by the U.S. Treasury Office of Foreign Assets Control.

## 7. Governing Law

This Agreement shall be governed by the laws of the State of New York.

---

**SUBSCRIBER**

Signature: _____________________________________

Printed Name: ${investorName}

Date: ${dateFmt}

**ACCEPTED FOR THE COMPANY**

By: Aurion Capital Group, LLC, as Authorised Agent
`;
}

export function privatePlacementMemorandum(args: DocumentArgs): string {
  const { companyName, tierName, amount, plan } = args;
  return `# PRIVATE PLACEMENT MEMORANDUM — EXTRACT

**${companyName}**

Distributed by Aurion Capital Group, LLC. This memorandum is supplied to qualified investors solely for the purpose of evaluating the ${tierName} tier of the ${companyName} offering. It is confidential and may not be reproduced or distributed.

## A. The Offering

The Company is raising growth capital through a Regulation D, Rule 506(c) private placement. The Subscriber's commitment of $${amount.toLocaleString()} corresponds to the ${tierName} tier with a ${plan.label} contractual holding period.

## B. Use of Proceeds

Proceeds will be deployed in accordance with the Company's stated capital plan, including operational expansion, product development, working capital, and selective M&A.

## C. Return Profile

  • Target gross return: ${plan.targetReturn} over the ${plan.label} period
  • Target annualised IRR: ${plan.annualisedIrr}
  • Distribution cadence: ${plan.distributionCadence}
  • Lock-up: ${plan.lockUpDays} days
  • Capital return window: ${plan.capitalReturnWindowDays} days post-maturity

## D. Risk Factors (Summary)

  1. Illiquidity — the Subscribed Securities are not traded on any public market.
  2. Capital loss — investors may lose the entire Subscription Amount.
  3. Execution risk — the Company's projections depend on successful operational execution.
  4. Macroeconomic risk — performance is sensitive to interest rates, inflation, and capital markets conditions.
  5. Regulatory risk — changes in tax or securities regulations may impact returns.
  6. Concentration risk — the Subscriber's portfolio may become concentrated in this position.

## E. Conflicts of Interest

Aurion Capital Group acts as placement agent and may receive a placement fee from the Company. Aurion and its affiliates may also hold positions in the Company alongside subscribers.

## F. Tax Treatment

The Company expects to issue Schedule K-1s annually. Investors should consult their own tax advisers.

## G. No Guarantee

Nothing in this memorandum constitutes a guarantee of return. Target returns reflect the Company's and Aurion's good-faith expectations based on currently available information.

---

*This extract is provided for review on the secure settlement page. A complete copy is filed with the Subscriber's investor record upon execution.*
`;
}

function escapeId(s: string): string {
  return s.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
}
