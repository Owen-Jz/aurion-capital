import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Application } from "@/lib/models/Application";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser() as { isAdmin: boolean } | null;
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const users = await User.find({ isAdmin: false })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  const userIds = users.map((u) => u._id);
  const appCounts = await Application.aggregate([
    { $match: { userId: { $in: userIds } } },
    { $group: { _id: "$userId", count: { $sum: 1 }, totalInvested: { $sum: "$amount" } } },
  ]);

  const countMap = Object.fromEntries(appCounts.map((a) => [a._id.toString(), a]));

  const enriched = users.map((u) => ({
    ...u,
    applicationCount: countMap[u._id.toString()]?.count ?? 0,
    totalInvested: countMap[u._id.toString()]?.totalInvested ?? 0,
  }));

  return NextResponse.json({ users: enriched });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser() as { isAdmin: boolean } | null;
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, kycStatus } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await connectDB();
  const updated = await User.findByIdAndUpdate(id, { kycStatus }, { new: true }).select("-password");
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ user: updated });
}
