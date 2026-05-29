import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Application } from "@/lib/models/Application";
import { getCurrentUser } from "@/lib/auth";
import { emailAccountApproved, emailAccountRejected } from "@/lib/email";

export async function GET() {
  const user = (await getCurrentUser()) as { isAdmin: boolean } | null;
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const users = await User.find({ isAdmin: false })
    .select("-password -otpSecret -otpBackupCodes")
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
  const currentUser = (await getCurrentUser()) as
    | { _id: { toString(): string }; isAdmin: boolean; email: string }
    | null;
  if (!currentUser?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, accountStatus, kycStatus, rejectionReason } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await connectDB();

  const update: Record<string, unknown> = {};
  if (kycStatus) update.kycStatus = kycStatus;
  if (rejectionReason !== undefined) update.rejectionReason = rejectionReason;

  if (accountStatus) {
    update.accountStatus = accountStatus;
    if (accountStatus === "approved") {
      update.kycStatus = kycStatus ?? "approved";
      update.approvedAt = new Date();
      update.approvedBy = currentUser.email;
      update.onboardingComplete = true;
    }
  }

  const updated = await User.findByIdAndUpdate(id, update, { new: true })
    .select("-password -otpSecret -otpBackupCodes");
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Trigger lifecycle emails — fire-and-forget so the API stays responsive.
  if (accountStatus === "approved") {
    emailAccountApproved({ to: updated.email, name: updated.name }).catch((err) =>
      console.error("[admin/users] approve email failed:", err)
    );
  } else if (accountStatus === "rejected") {
    emailAccountRejected({
      to: updated.email,
      name: updated.name,
      reason: rejectionReason,
    }).catch((err) =>
      console.error("[admin/users] reject email failed:", err)
    );
  }

  return NextResponse.json({ user: updated });
}
