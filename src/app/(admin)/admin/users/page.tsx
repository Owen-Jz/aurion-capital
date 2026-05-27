"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle, Clock, XCircle } from "lucide-react";

interface Investor {
  _id: string;
  name: string;
  email: string;
  firm?: string;
  investorType: string;
  kycStatus: string;
  applicationCount: number;
  totalInvested: number;
  createdAt: string;
}

const KYC_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  approved: { label: "Approved", color: "#22c55e", bg: "rgba(34,197,94,0.1)", icon: CheckCircle },
  pending: { label: "Pending", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", icon: Clock },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: XCircle },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function updateKyc(id: string, kycStatus: string) {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, kycStatus }),
      });
      const data = await res.json();
      if (res.ok) setUsers((prev) => prev.map((u) => u._id === id ? { ...u, kycStatus: data.user.kycStatus } : u));
    } finally {
      setUpdating(null);
    }
  }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.firm ?? "").toLowerCase().includes(q);
  });

  const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Investors</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {users.length} registered investor{users.length !== 1 ? "s" : ""}
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

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
        </div>
      ) : (
        <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Investor", "Type", "Applications", "Total Invested", "KYC Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filtered.map((u) => {
                const kyc = KYC_CONFIG[u.kycStatus] ?? KYC_CONFIG.pending;
                const KycIcon = kyc.icon;
                return (
                  <tr key={u._id} style={{ background: "var(--surface)" }}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                          style={{ background: "rgba(201,168,76,0.12)", color: "#c9a84c" }}
                        >
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
                        {u.investorType.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {u.applicationCount}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold" style={{ color: u.totalInvested > 0 ? "#c9a84c" : "var(--muted)" }}>
                        {u.totalInvested > 0 ? fmt(u.totalInvested) : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: kyc.bg, color: kyc.color }}
                      >
                        <KycIcon size={10} />
                        {kyc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {u.kycStatus !== "approved" && (
                        <button
                          onClick={() => updateKyc(u._id, "approved")}
                          disabled={updating === u._id}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-50"
                          style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                        >
                          <CheckCircle size={11} />
                          {updating === u._id ? "Updating…" : "Approve KYC"}
                        </button>
                      )}
                      {u.kycStatus === "approved" && (
                        <button
                          onClick={() => updateKyc(u._id, "pending")}
                          disabled={updating === u._id}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-50"
                          style={{ background: "rgba(100,116,139,0.1)", color: "var(--muted)" }}
                        >
                          Revoke KYC
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Users size={32} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
              <p style={{ color: "var(--muted)" }}>{search ? "No investors match your search." : "No investors yet."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
