"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle, Clock, XCircle, ShieldCheck, AlertCircle } from "lucide-react";

interface Investor {
  _id: string;
  name: string;
  email: string;
  firm?: string;
  investorType: string;
  kycStatus: string;
  accountStatus: "pending_review" | "approved" | "rejected" | "suspended";
  applicationCount: number;
  totalInvested: number;
  createdAt: string;
  questionnaire?: {
    annualIncome?: string;
    netWorth?: string;
    sourceOfFunds?: string;
    investmentExperience?: string;
    riskTolerance?: string;
    expectedInvestmentSize?: string;
    isAccredited?: boolean;
    isPep?: boolean;
  };
  rejectionReason?: string;
}

const ACCOUNT_STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  approved: { label: "Approved", color: "#22c55e", bg: "rgba(34,197,94,0.1)", icon: CheckCircle },
  pending_review: { label: "Pending review", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", icon: Clock },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: XCircle },
  suspended: { label: "Suspended", color: "#64748b", bg: "rgba(100,116,139,0.1)", icon: AlertCircle },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending_review" | "approved" | "rejected">("all");
  const [openInvestor, setOpenInvestor] = useState<Investor | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, accountStatus: string, reason?: string) {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, accountStatus, rejectionReason: reason }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, accountStatus: data.user.accountStatus, kycStatus: data.user.kycStatus, rejectionReason: data.user.rejectionReason } : u
          )
        );
        setOpenInvestor(null);
        setRejectReason("");
      }
    } finally {
      setUpdating(null);
    }
  }

  // Legacy users created before accountStatus was added have it undefined —
  // treat them as pending review so they don't fall through the cracks.
  const statusOf = (u: Investor) => u.accountStatus ?? "pending_review";

  const filtered = users.filter((u) => {
    if (filter !== "all" && statusOf(u) !== filter) return false;
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.firm ?? "").toLowerCase().includes(q);
  });

  const pendingCount = users.filter((u) => statusOf(u) === "pending_review").length;

  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Investors</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {loading ? (
              <span className="inline-block h-3 w-48 rounded-sm align-middle" style={{ background: "var(--border)" }} />
            ) : (
              <>
                {users.length} registered · <strong style={{ color: "#c9a84c" }}>{pendingCount}</strong> awaiting approval
              </>
            )}
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by name, email, firm…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-sm px-3 py-2 text-sm outline-none focus:border-[#c9a84c]/40 w-64"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 rounded-sm mb-6 inline-flex" style={{ background: "var(--border)" }}>
        {[
          { id: "all", label: "All" },
          { id: "pending_review", label: loading ? "Pending" : `Pending (${pendingCount})` },
          { id: "approved", label: "Approved" },
          { id: "rejected", label: "Rejected" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className="px-4 py-1.5 text-xs font-medium rounded-sm transition-all"
            style={{
              background: filter === tab.id ? "var(--surface)" : "transparent",
              color: filter === tab.id ? "var(--foreground)" : "var(--muted)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
        </div>
      ) : (
        <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Investor", "Type", "Submitted", "Apps", "Total", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filtered.map((u) => {
                const status = ACCOUNT_STATUS_CONFIG[statusOf(u)] ?? ACCOUNT_STATUS_CONFIG.pending_review;
                const StatusIcon = status.icon;
                return (
                  <tr key={u._id} style={{ background: "var(--surface)" }}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: "rgba(201,168,76,0.12)", color: "#c9a84c" }}>
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{u.name}</div>
                          <div className="text-xs" style={{ color: "var(--muted)" }}>{u.email}</div>
                          {u.firm && <div className="text-xs" style={{ color: "var(--muted)" }}>{u.firm}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
                        {u.investorType?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs" style={{ color: "var(--muted)" }}>
                        {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{u.applicationCount}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold" style={{ color: u.totalInvested > 0 ? "#c9a84c" : "var(--muted)" }}>
                        {u.totalInvested > 0 ? fmt(u.totalInvested) : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: status.bg, color: status.color }}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => setOpenInvestor(u)}
                          className="text-xs underline transition-colors hover:text-[#c9a84c]"
                          style={{ color: "var(--accent)" }}
                        >
                          Review
                        </button>
                        {statusOf(u) === "pending_review" && (
                          <>
                            <button
                              onClick={() => updateStatus(u._id, "approved")}
                              disabled={updating === u._id}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-sm transition-colors disabled:opacity-50"
                              style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                            >
                              <CheckCircle size={11} />
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Users size={32} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
              <p style={{ color: "var(--muted)" }}>{search || filter !== "all" ? "No investors match your filter." : "No investors yet."}</p>
            </div>
          )}
        </div>
      )}

      {/* Review drawer */}
      {openInvestor && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(10,15,30,0.6)" }}
          onClick={() => setOpenInvestor(null)}
        >
          <div
            className="w-full max-w-2xl rounded-sm border max-h-[90vh] overflow-y-auto"
            style={{ background: "var(--background)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "#c9a84c" }}>Investor file</p>
                  <h2 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>{openInvestor.name}</h2>
                  <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{openInvestor.email} · {openInvestor.investorType}</p>
                </div>
                <button onClick={() => setOpenInvestor(null)} className="text-sm" style={{ color: "var(--muted)" }}>✕</button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <Section title="Compliance Snapshot">
                <Row label="Account status" value={ACCOUNT_STATUS_CONFIG[openInvestor.accountStatus]?.label ?? openInvestor.accountStatus} />
                <Row label="Submitted" value={new Date(openInvestor.createdAt).toLocaleString()} />
                <Row label="Accredited investor" value={openInvestor.questionnaire?.isAccredited ? "Yes" : "No"} />
                <Row label="PEP" value={openInvestor.questionnaire?.isPep ? "Yes — escalation required" : "No"} />
              </Section>

              <Section title="Financial Suitability">
                <Row label="Annual income" value={openInvestor.questionnaire?.annualIncome ?? "—"} />
                <Row label="Net worth" value={openInvestor.questionnaire?.netWorth ?? "—"} />
                <Row label="Source of funds" value={openInvestor.questionnaire?.sourceOfFunds ?? "—"} />
                <Row label="Experience" value={openInvestor.questionnaire?.investmentExperience ?? "—"} />
                <Row label="Risk tolerance" value={openInvestor.questionnaire?.riskTolerance ?? "—"} />
                <Row label="Expected first-year size" value={openInvestor.questionnaire?.expectedInvestmentSize ?? "—"} />
              </Section>

              {openInvestor.rejectionReason && (
                <Section title="Rejection Notes">
                  <p className="text-sm px-4 py-3 rounded-sm" style={{ background: "rgba(239,68,68,0.05)", color: "var(--foreground)" }}>
                    {openInvestor.rejectionReason}
                  </p>
                </Section>
              )}

              {openInvestor.accountStatus === "pending_review" && (
                <div className="rounded-sm border p-4 space-y-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Compliance decision</p>

                  <button
                    onClick={() => updateStatus(openInvestor._id, "approved")}
                    disabled={updating === openInvestor._id}
                    className="w-full py-2.5 text-sm font-semibold rounded-sm flex items-center justify-center gap-2"
                    style={{ background: "#22c55e", color: "white" }}
                  >
                    <ShieldCheck size={14} /> Approve & send welcome email
                  </button>

                  <textarea
                    placeholder="Optional rejection notes (sent in email to investor)…"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                    className="w-full border rounded-sm px-3 py-2 text-sm"
                    style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  />
                  <button
                    onClick={() => updateStatus(openInvestor._id, "rejected", rejectReason)}
                    disabled={updating === openInvestor._id}
                    className="w-full py-2.5 text-sm font-semibold rounded-sm flex items-center justify-center gap-2"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                  >
                    <XCircle size={14} /> Reject application
                  </button>
                </div>
              )}

              {openInvestor.accountStatus === "approved" && (
                <button
                  onClick={() => updateStatus(openInvestor._id, "suspended")}
                  disabled={updating === openInvestor._id}
                  className="w-full py-2.5 text-sm font-semibold rounded-sm"
                  style={{ background: "rgba(100,116,139,0.1)", color: "var(--muted)" }}
                >
                  Suspend account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "var(--muted)" }}>{title}</p>
      <div className="rounded-sm border divide-y" style={{ borderColor: "var(--border)" }}>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-2.5" style={{ background: "var(--surface)" }}>
      <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-sm font-medium text-right" style={{ color: "var(--foreground)" }}>{value}</span>
    </div>
  );
}
