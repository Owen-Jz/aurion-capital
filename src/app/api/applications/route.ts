import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { Company } from "@/lib/models/Company";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser() as { _id: string } | null;
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { companyId, tierId } = body;

  if (!companyId || !tierId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const company = await Company.findById(companyId);
  if (!company || company.status !== "active") {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  const tier = company.tiers.find((t: { _id?: { toString(): string }; available: boolean; name: string; price: number; shares: number }) => t._id?.toString() === tierId);
  if (!tier || !tier.available) {
    return NextResponse.json({ error: "Tier not available" }, { status: 400 });
  }

  const existing = await Application.findOne({
    userId: user._id,
    companyId,
    status: { $in: ["pending", "approved"] },
  });
  if (existing) {
    return NextResponse.json({ error: "You already have an active application for this company" }, { status: 409 });
  }

  const application = await Application.create({
    userId: user._id,
    companyId,
    tierId,
    tierName: tier.name,
    tierPrice: tier.price,
    tierShares: tier.shares,
    amount: tier.price,
  });

  return NextResponse.json({ application }, { status: 201 });
}

export async function GET() {
  const user = await getCurrentUser() as { _id: string } | null;
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  await connectDB();
  const applications = await Application.find({ userId: user._id })
    .populate("companyId", "name sector slug")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ applications });
}
