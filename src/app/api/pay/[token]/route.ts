import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { Payment } from "@/lib/models/Payment";
import { Company } from "@/lib/models/Company";

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

  return NextResponse.json({ application, company });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await request.json();
  const { method, proofUrl } = body;

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
