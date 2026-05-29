import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { Payment } from "@/lib/models/Payment";
import { Company } from "@/lib/models/Company";
import { getPlan } from "@/lib/plans";
import {
  ndaDocument,
  subscriptionAgreement,
  privatePlacementMemorandum,
} from "@/lib/documents";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  await connectDB();

  const application = await Application.findOne({ paymentToken: token })
    .populate("userId", "name email firm")
    .lean();

  if (!application) {
    return NextResponse.json({ error: "Invalid or expired payment link" }, { status: 404 });
  }

  if ((application as { status: string }).status !== "approved") {
    return NextResponse.json({ error: "Application not approved" }, { status: 400 });
  }

  const company = await Company.findById((application as { companyId: string }).companyId)
    .select("name sector")
    .lean();

  const app = application as unknown as {
    _id: { toString(): string };
    tierName: string;
    tierShares: number;
    amount: number;
    planId?: string;
    createdAt: Date;
    userId: { name: string };
  };
  const plan = getPlan(app.planId);
  const userName = app.userId?.name ?? "Investor";

  const docArgs = {
    investorName: userName,
    companyName: (company as { name: string } | null)?.name ?? "Company",
    tierName: app.tierName,
    amount: app.amount,
    shares: app.tierShares,
    plan,
    applicationDate: app.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };

  const documents = [
    {
      id: "nda",
      type: "Non-Disclosure & Investment Return Agreement",
      shortName: "NDA",
      filename: `Aurion-NDA-${docArgs.companyName.replace(/\s+/g, "_")}.md`,
      content: ndaDocument(docArgs),
    },
    {
      id: "subscription",
      type: "Subscription Agreement",
      shortName: "Subscription",
      filename: `Aurion-Subscription-${docArgs.companyName.replace(/\s+/g, "_")}.md`,
      content: subscriptionAgreement(docArgs),
    },
    {
      id: "ppm",
      type: "Private Placement Memorandum",
      shortName: "PPM",
      filename: `Aurion-PPM-${docArgs.companyName.replace(/\s+/g, "_")}.md`,
      content: privatePlacementMemorandum(docArgs),
    },
  ];

  return NextResponse.json({
    application,
    company,
    plan,
    documents,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await request.json();
  const { method, proofUrl, documentsAcknowledged } = body;

  if (!documentsAcknowledged) {
    return NextResponse.json(
      { error: "You must review the subscription documents before submitting payment." },
      { status: 400 }
    );
  }

  await connectDB();

  const application = await Application.findOne({ paymentToken: token });
  if (!application || (application as { status: string }).status !== "approved") {
    return NextResponse.json({ error: "Invalid application" }, { status: 400 });
  }

  const existing = await Payment.findOne({ applicationId: application._id });
  if (existing) {
    return NextResponse.json({ error: "Payment already submitted" }, { status: 409 });
  }

  const payment = await Payment.create({
    applicationId: application._id,
    method: method || "crypto",
    proofUrl: proofUrl || null,
    status: "pending",
  });

  await Application.findByIdAndUpdate(application._id, { status: "payment_submitted" });

  return NextResponse.json({ payment }, { status: 201 });
}
