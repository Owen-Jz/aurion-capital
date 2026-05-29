import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { Investment } from "@/lib/models/Investment";
import { Payment } from "@/lib/models/Payment";
import { Company } from "@/lib/models/Company";
import { getCurrentUser } from "@/lib/auth";
import mongoose from "mongoose";

// Reference Company so the import isn't tree-shaken — Mongoose populate
// requires the schema to be registered before the populate call runs.
void Company;

/**
 * Returns everything the investor portal needs to render the
 * dashboard and portfolio pages — for the currently signed-in user.
 */
export async function GET() {
  const user = (await getCurrentUser()) as
    | { _id: string | mongoose.Types.ObjectId; name: string; email: string; firm?: string }
    | null;
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  await connectDB();
  const userId = new mongoose.Types.ObjectId(user._id.toString());

  // Applications — everything the user has ever submitted, newest first.
  const applications = await Application.find({ userId })
    .populate("companyId", "name sector slug")
    .sort({ createdAt: -1 })
    .lean();

  // Investments — only created once payment is verified by admin. These are
  // the "real" holdings.
  const investmentDocs = await Investment.find({ userId })
    .populate("companyId", "name sector slug")
    .lean();

  // Payments — to surface "pending verification" state on the dashboard.
  const appIds = applications.map((a) => a._id);
  const payments = await Payment.find({ applicationId: { $in: appIds } }).lean();
  const paymentByApp = new Map(
    payments.map((p) => [p.applicationId.toString(), p])
  );

  // Aggregate the portfolio.
  type CompanyRef = { _id: mongoose.Types.ObjectId; name: string; sector: string; slug: string };
  type InvWithCompany = {
    _id: mongoose.Types.ObjectId;
    companyId: CompanyRef;
    sharesHeld: number;
    purchasePrice: number;
    currentValue: number;
    purchasedAt: Date;
  };
  const investments = investmentDocs as unknown as InvWithCompany[];

  const totalInvested = investments.reduce((s, i) => s + i.purchasePrice, 0);
  const totalValue = investments.reduce((s, i) => s + i.currentValue, 0);
  const unrealisedGain = totalValue - totalInvested;
  const unrealisedGainPct = totalInvested > 0 ? (unrealisedGain / totalInvested) * 100 : 0;

  // Allocation breakdown by sector.
  const allocation: Record<string, { value: number; pct: number; color: string }> = {};
  const sectorColors: Record<string, string> = {
    "AI Infrastructure": "#76b900",
    "AI & Electric Mobility": "#c9a84c",
    "Artificial Intelligence": "#1a3a5c",
    "Cloud & Enterprise AI": "#0078d4",
    "Consumer Technology": "#a2aaad",
    "AI, Search & Cloud": "#4285f4",
    "Social, AI & Reality Labs": "#0866ff",
    "E-Commerce & Cloud": "#ff9900",
    "Private Credit": "#2d6a9f",
    "Real Estate": "#b8933e",
    Infrastructure: "#64748b",
  };
  for (const inv of investments) {
    const sector = inv.companyId?.sector ?? "Other";
    if (!allocation[sector]) {
      allocation[sector] = { value: 0, pct: 0, color: sectorColors[sector] ?? "#64748b" };
    }
    allocation[sector].value += inv.currentValue;
  }
  for (const key of Object.keys(allocation)) {
    allocation[key].pct = totalValue > 0 ? (allocation[key].value / totalValue) * 100 : 0;
  }

  // Holdings — one row per investment with computed return %.
  const holdings = investments.map((i) => {
    const ret = i.purchasePrice > 0 ? ((i.currentValue - i.purchasePrice) / i.purchasePrice) * 100 : 0;
    return {
      _id: i._id.toString(),
      companyName: i.companyId?.name ?? "Unknown",
      companySlug: i.companyId?.slug ?? "",
      sector: i.companyId?.sector ?? "Other",
      sectorColor: sectorColors[i.companyId?.sector ?? ""] ?? "#64748b",
      shares: i.sharesHeld,
      invested: i.purchasePrice,
      value: i.currentValue,
      returnPct: ret,
      purchasedAt: i.purchasedAt,
    };
  });

  // Activity feed — synthesises events from applications + payments + investments.
  type ActivityRow = {
    date: string;
    type: string;
    description: string;
    amount: number | null;
    status: "completed" | "pending" | "approved" | "settled" | "rejected" | "info";
  };
  const activity: ActivityRow[] = [];

  for (const app of applications) {
    const company = (app.companyId as unknown as CompanyRef | null);
    const companyName = company?.name ?? "Unknown company";
    activity.push({
      date: app.createdAt.toISOString(),
      type: "Application",
      description: `Applied to ${companyName} — ${app.tierName} (${app.planLabel ?? "1 year"})`,
      amount: -app.amount,
      status: app.status === "approved" || app.status === "payment_submitted" ? "approved" : app.status === "rejected" ? "rejected" : "pending",
    });

    const pay = paymentByApp.get(app._id.toString());
    if (pay) {
      activity.push({
        date: (pay.createdAt as Date).toISOString(),
        type: "Payment",
        description: `Payment submitted for ${companyName}`,
        amount: -app.amount,
        status: pay.status === "verified" ? "settled" : "pending",
      });
    }
  }

  for (const inv of investments) {
    activity.push({
      date: inv.purchasedAt.toISOString(),
      type: "Allocation",
      description: `${inv.sharesHeld.toLocaleString()} shares of ${inv.companyId?.name ?? "Unknown"} allocated`,
      amount: inv.purchasePrice,
      status: "completed",
    });
  }

  activity.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      firm: user.firm ?? null,
    },
    totals: {
      invested: totalInvested,
      value: totalValue,
      unrealisedGain,
      unrealisedGainPct,
      activeStrategies: Object.keys(allocation).length,
      holdingsCount: holdings.length,
      activeApplications: applications.filter((a) => a.status === "pending" || a.status === "approved" || a.status === "payment_submitted").length,
    },
    allocation: Object.entries(allocation).map(([strategy, v]) => ({
      strategy,
      pct: v.pct,
      value: v.value,
      color: v.color,
    })),
    holdings,
    applications: applications.map((a) => {
      const company = a.companyId as unknown as CompanyRef | null;
      return {
        _id: a._id.toString(),
        companyName: company?.name ?? "Unknown",
        companySlug: company?.slug ?? "",
        sector: company?.sector ?? "Other",
        tierName: a.tierName,
        amount: a.amount,
        shares: a.tierShares,
        planLabel: a.planLabel,
        status: a.status,
        paymentToken: a.paymentToken,
        createdAt: a.createdAt,
      };
    }),
    activity: activity.slice(0, 10),
  });
}
