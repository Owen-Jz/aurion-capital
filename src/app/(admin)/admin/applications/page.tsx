"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

interface Application {
  _id: string;
  userId: { name: string; email: string; firm?: string };
  companyId: { name: string; sector: string; slug: string };
  tierName: string;
  tierPrice: number;
  tierShares: number;
  amount: number;
  status: string;
  adminNote?: string;
  paymentToken?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending Review", color: "#c9a84c", bg: "rgba(201,168,76,0.1)" },
  approved: { label: "Approved", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  payment_submitted: { label: "Payment Submitted", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
};

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<{ id: string; action: "approved" | "rejected" } | null>(null);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((r) => {
        if (r.status === 403) router.push("/login");
        return r.json();
      })
      .then((d) => setApplications(d.applications ?? []))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleAction(id: string, action: "approved" | "rejected", adminNote?: string) {
    setActionId(id);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: id, action, adminNote }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? { ...a, ...data.application } : a))
        );
      }
    } finally {
      setActionId(null);
      setNoteModal(null);
      setNote("");
    }
  }

  const filtered = applications.filter((a) => filter === "all" || a.status === filter);

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    payment_submitted: applications.filter((a) => a.status === "payment_submitted").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Investment Applications
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Review and action investor applications.
        </p>
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 p-1 rounded-sm mb-6 self-start inline-flex"
        style={{ background: "var(--border)" }}
      >
        {(["all", "pending", "approved", "rejected", "payment_submitted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 text-xs font-medium rounded-sm transition-all capitalize"
            style={{
              background: filter === f ? "var(--surface)" : "transparent",
              color: filter === f ? "var(--foreground)" : "var(--muted)",
            }}
          >
            {f === "all" ? "All" : STATUS_CONFIG[f]?.label ?? f} ({counts[f] ?? 0})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <Clock size={32} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
          <p style={{ color: "var(--muted)" }}>No applications in this category.</p>
        </div>
      ) : (
        <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Investor", "Company", "Tier / Amount", "Date", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filtered.map((app) => {
                const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.pending;
                return (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ background: "var(--surface)" }}
                  >
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {app.userId?.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {app.userId?.email}
                      </div>
                      {app.userId?.firm && (
                        <div className="text-xs" style={{ color: "var(--muted)" }}>
                          {app.userId.firm}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {app.companyId?.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {app.companyId?.sector}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        ${app.amount.toLocaleString()}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {app.tierName} · {app.tierShares} shares
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs" style={{ color: "var(--muted)" }}>
                        {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                      {app.paymentToken && (
                        <div className="mt-1">
                          <a
                            href={`/pay/${app.paymentToken}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] hover:text-[#c9a84c]"
                            style={{ color: "var(--muted)" }}
                          >
                            Payment link <ExternalLink size={10} />
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {app.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setNoteModal({ id: app._id, action: "approved" })}
                            disabled={actionId === app._id}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-50"
                            style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                          >
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button
                            onClick={() => setNoteModal({ id: app._id, action: "rejected" })}
                            disabled={actionId === app._id}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-50"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Note modal */}
      {noteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-sm border w-full max-w-md mx-4 p-6"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <h3 className="font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>
              {noteModal.action === "approved" ? "Approve Application" : "Reject Application"}
            </h3>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
              {noteModal.action === "approved"
                ? "Approving will generate a payment link for the investor."
                : "Please provide a reason for rejection."}
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={noteModal.action === "approved" ? "Optional note to investor…" : "Reason for rejection…"}
              rows={3}
              className="w-full border rounded-sm px-3 py-2 text-sm resize-none outline-none focus:border-[#c9a84c]/40"
              style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setNoteModal(null); setNote(""); }}
                className="flex-1 py-2 text-sm rounded-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(noteModal.id, noteModal.action, note || undefined)}
                className="flex-1 py-2 text-sm font-semibold rounded-sm transition-colors"
                style={{
                  background: noteModal.action === "approved" ? "#22c55e" : "#ef4444",
                  color: "white",
                }}
              >
                {noteModal.action === "approved" ? "Approve" : "Reject"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
