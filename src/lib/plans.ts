/**
 * Investment plan duration catalogue.
 *
 * Plans range from short-term (1 month) liquidity windows to long-duration
 * (10 year) compounding strategies. Each plan defines the holding period,
 * lock-up, target return profile, and distribution cadence — these flow
 * into the NDA, Subscription Agreement and PPM rendered on the payment page.
 */

export interface InvestmentPlan {
  id: string;
  label: string;
  months: number;
  lockUpDays: number;
  targetReturn: string;
  annualisedIrr: string;
  distributionCadence: string;
  capitalReturnWindowDays: number;
  tier: "short" | "medium" | "long" | "ultra-long";
  description: string;
}

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: "1m",
    label: "1 month",
    months: 1,
    lockUpDays: 30,
    targetReturn: "1.6%–2.2%",
    annualisedIrr: "19%–26%",
    distributionCadence: "Single distribution at maturity",
    capitalReturnWindowDays: 7,
    tier: "short",
    description:
      "Short-duration liquidity strategy. Capital is deployed into yield-bearing instruments with a 30-day maturity. Suited to investors warehousing cash awaiting a larger allocation.",
  },
  {
    id: "2m",
    label: "2 months",
    months: 2,
    lockUpDays: 60,
    targetReturn: "3.5%–4.8%",
    annualisedIrr: "21%–28%",
    distributionCadence: "Single distribution at maturity",
    capitalReturnWindowDays: 7,
    tier: "short",
    description:
      "Extended short-duration position with marginally improved yield versus the 30-day window.",
  },
  {
    id: "6m",
    label: "6 months",
    months: 6,
    lockUpDays: 180,
    targetReturn: "9%–13%",
    annualisedIrr: "18%–26%",
    distributionCadence: "Single distribution at maturity",
    capitalReturnWindowDays: 14,
    tier: "short",
    description:
      "Half-year bridge strategy targeting current income from private credit and structured products.",
  },
  {
    id: "1y",
    label: "1 year",
    months: 12,
    lockUpDays: 365,
    targetReturn: "18%–26%",
    annualisedIrr: "18%–26%",
    distributionCadence: "Semi-annual",
    capitalReturnWindowDays: 21,
    tier: "medium",
    description:
      "Twelve-month growth allocation. Suited to investors balancing yield and capital appreciation.",
  },
  {
    id: "2y",
    label: "2 years",
    months: 24,
    lockUpDays: 730,
    targetReturn: "42%–58%",
    annualisedIrr: "19%–26%",
    distributionCadence: "Semi-annual",
    capitalReturnWindowDays: 30,
    tier: "medium",
    description:
      "Medium-term commitment with capital appreciation as the primary return driver.",
  },
  {
    id: "4y",
    label: "4 years",
    months: 48,
    lockUpDays: 1460,
    targetReturn: "110%–180%",
    annualisedIrr: "20%–29%",
    distributionCadence: "Annual",
    capitalReturnWindowDays: 45,
    tier: "long",
    description:
      "Long-duration commitment aligned to the typical operating cycle of growth-stage AI, robotics and infrastructure platforms.",
  },
  {
    id: "7y",
    label: "7 years",
    months: 84,
    lockUpDays: 2555,
    targetReturn: "260%–430%",
    annualisedIrr: "20%–27%",
    distributionCadence: "Annual",
    capitalReturnWindowDays: 60,
    tier: "long",
    description:
      "Full-cycle vintage exposure mirroring institutional private-equity fund durations.",
  },
  {
    id: "10y",
    label: "10 years",
    months: 120,
    lockUpDays: 3650,
    targetReturn: "520%–860%",
    annualisedIrr: "20%–24%",
    distributionCadence: "Annual",
    capitalReturnWindowDays: 90,
    tier: "ultra-long",
    description:
      "Generational compounding strategy. Designed for family-office and endowment capital with multi-decade investment horizons.",
  },
];

export function getPlan(id: string | undefined): InvestmentPlan {
  if (!id) return INVESTMENT_PLANS[3]; // default to 1y
  return INVESTMENT_PLANS.find((p) => p.id === id) ?? INVESTMENT_PLANS[3];
}

export function planOptionsForSelect() {
  return INVESTMENT_PLANS.map((p) => ({
    value: p.id,
    label: `${p.label} — ${p.targetReturn} target`,
  }));
}
