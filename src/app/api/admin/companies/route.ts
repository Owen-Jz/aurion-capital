import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Company } from "@/lib/models/Company";
import { getCurrentUser } from "@/lib/auth";

async function requireAdmin() {
  const user = await getCurrentUser() as { isAdmin: boolean } | null;
  if (!user?.isAdmin) return null;
  return user;
}

export async function GET(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const company = await Company.findById(id).lean();
    if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ company });
  }
  const companies = await Company.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ companies });
}

export async function POST(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { name, slug, sector, tagline, description, baseValuation, totalShares, minInvestment } = body;

  if (!name || !slug || !sector || !baseValuation || !totalShares) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();

  const existing = await Company.findOne({ slug });
  if (existing) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });

  const standardTiers = [
    { name: "Entry", price: 5000, shares: 50, order: 1 },
    { name: "Growth", price: 10000, shares: 100, order: 2 },
    { name: "Premium", price: 25000, shares: 250, order: 3 },
    { name: "Institutional", price: 50000, shares: 500, order: 4 },
    { name: "Anchor", price: 100000, shares: 1000, order: 5 },
  ];

  const company = await Company.create({
    name, slug, sector,
    tagline: tagline || "",
    description: description || "",
    baseValuation: Number(baseValuation),
    totalShares: Number(totalShares),
    sharesRemaining: Number(totalShares),
    minInvestment: Number(minInvestment || 5000),
    status: "draft",
    tiers: standardTiers,
  });

  return NextResponse.json({ company }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Coerce numeric fields
  const update: Record<string, unknown> = { ...fields };
  if (fields.baseValuation !== undefined) update.baseValuation = Number(fields.baseValuation);
  if (fields.totalShares !== undefined) update.totalShares = Number(fields.totalShares);
  if (fields.sharesRemaining !== undefined) update.sharesRemaining = Number(fields.sharesRemaining);
  if (fields.minInvestment !== undefined) update.minInvestment = Number(fields.minInvestment);

  // Coerce tier numeric fields
  if (Array.isArray(fields.tiers)) {
    update.tiers = fields.tiers.map((t: Record<string, unknown>) => ({
      ...t,
      price: Number(t.price),
      shares: Number(t.shares),
      order: Number(t.order),
    }));
  }

  await connectDB();
  const company = await Company.findByIdAndUpdate(id, update, { new: true });
  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ company });
}

export async function DELETE(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await connectDB();
  const company = await Company.findByIdAndDelete(id);
  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
