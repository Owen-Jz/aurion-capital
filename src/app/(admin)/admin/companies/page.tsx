"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Building2, TrendingUp, CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";

interface Company {
  _id: string;
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  baseValuation: number;
  totalShares: number;
  sharesRemaining: number;
  minInvestment: number;
  status: string;
  tiers: { name: string; price: number }[];
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  draft: { label: "Draft", color: "#c9a84c", bg: "rgba(201,168,76,0.1)" },
  closed: { label: "Closed", color: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

const inputCls = "w-full border rounded-sm px-3 py-2 text-sm outline-none focus:border-[#c9a84c]/40 transition-colors";
const inputStyle = { borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" };
const SECTORS = ["Infrastructure", "Real Estate", "Private Credit", "Multi-Asset", "Technology", "Healthcare", "Energy"];

export default function AdminCompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", sector: "", tagline: "", description: "",
    baseValuation: "", totalShares: "", minInvestment: "5000",
  });

  useEffect(() => {
    fetch("/api/admin/companies")
      .then((r) => r.json())
      .then((d) => setCompanies(d.companies ?? []))
      .finally(() => setLoading(false));
  }, []);

  function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function openNew() {
    setForm({ name: "", slug: "", sector: "", tagline: "", description: "", baseValuation: "", totalShares: "", minInvestment: "5000" });
    setShowForm(true);
  }

  async function handleCreate() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Save failed."); return; }
      setCompanies((prev) => [data.company, ...prev]);
      setShowForm(false);
      // Navigate straight to full editor
      router.push(`/admin/companies/${data.company._id}`);
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(co: Company) {
    const newStatus = co.status === "active" ? "draft" : "active";
    const res = await fetch("/api/admin/companies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: co._id, status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) setCompanies((prev) => prev.map((c) => c._id === co._id ? { ...c, status: data.company.status } : c));
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/companies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget._id }),
      });
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        const d = await res.json();
        alert(d.error ?? "Delete failed.");
      }
    } finally {
      setDeleting(false);
    }
  }

  const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Company Listings</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Manage investment opportunities on the platform.</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-sm transition-colors"
          style={{ background: "#c9a84c", color: "#0a0f1e" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e4c76b")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9a84c")}
        >
          <Plus size={15} /> New Listing
        </button>
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
                {["Company", "Sector", "Valuation", "Shares", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {companies.map((co) => {
                const cfg = STATUS_CONFIG[co.status] ?? STATUS_CONFIG.draft;
                const pctSold = Math.round(((co.totalShares - co.sharesRemaining) / co.totalShares) * 100);
                return (
                  <tr key={co._id} style={{ background: "var(--surface)" }}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <Building2 size={16} style={{ color: "var(--muted)" }} />
                        <div>
                          <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{co.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{co.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>{co.sector}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{fmt(co.baseValuation)}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Min {fmt(co.minInvestment)}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm" style={{ color: "var(--foreground)" }}>
                        {co.sharesRemaining.toLocaleString()} left
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)", maxWidth: 80 }}>
                          <div className="h-full rounded-full" style={{ width: `${pctSold}%`, background: "#c9a84c" }} />
                        </div>
                        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{pctSold}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => router.push(`/admin/companies/${co._id}`)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors"
                          style={{ background: "rgba(100,116,139,0.1)", color: "var(--muted)" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(100,116,139,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
                        >
                          <Edit2 size={11} /> Edit
                        </button>
                        <button
                          onClick={() => toggleStatus(co)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors"
                          style={{
                            background: co.status === "active" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                            color: co.status === "active" ? "#ef4444" : "#22c55e",
                          }}
                        >
                          {co.status === "active" ? <><XCircle size={11} /> Unpublish</> : <><CheckCircle size={11} /> Publish</>}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(co)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors"
                          style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.18)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)")}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {companies.length === 0 && (
            <div className="text-center py-16">
              <TrendingUp size={32} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
              <p style={{ color: "var(--muted)" }}>No listings yet. Create the first one.</p>
            </div>
          )}
        </div>
      )}

      {/* New listing modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-sm border w-full max-w-lg"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
                <h3 className="font-semibold text-base" style={{ color: "var(--foreground)" }}>New Listing</h3>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Basic details — you can add rich content in the full editor after creation.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Company Name *</label>
                    <input className={inputCls} style={inputStyle} value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))}
                      placeholder="NexGen Logistics" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Slug *</label>
                    <input className={inputCls} style={inputStyle} value={form.slug}
                      onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                      placeholder="nexgen-logistics" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Sector *</label>
                  <select className={inputCls} style={inputStyle} value={form.sector}
                    onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))}>
                    <option value="">Select sector</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Tagline</label>
                  <input className={inputCls} style={inputStyle} value={form.tagline}
                    onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                    placeholder="One-line summary of the opportunity" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Valuation ($) *</label>
                    <input type="number" className={inputCls} style={inputStyle} value={form.baseValuation}
                      onChange={(e) => setForm((f) => ({ ...f, baseValuation: e.target.value }))}
                      placeholder="42000000" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Total Shares *</label>
                    <input type="number" className={inputCls} style={inputStyle} value={form.totalShares}
                      onChange={(e) => setForm((f) => ({ ...f, totalShares: e.target.value }))}
                      placeholder="420000" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Min Invest ($)</label>
                    <input type="number" className={inputCls} style={inputStyle} value={form.minInvestment}
                      onChange={(e) => setForm((f) => ({ ...f, minInvestment: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-6 pt-0">
                <button onClick={() => setShowForm(false)}
                  className="flex-1 py-2 text-sm rounded-sm border transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                  Cancel
                </button>
                <button onClick={handleCreate} disabled={saving || !form.name || !form.slug || !form.sector || !form.baseValuation || !form.totalShares}
                  className="flex-1 py-2 text-sm font-semibold rounded-sm transition-colors disabled:opacity-50"
                  style={{ background: "#c9a84c", color: "#0a0f1e" }}>
                  {saving ? "Creating…" : "Create & Edit"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-sm border w-full max-w-md p-6"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <Trash2 size={16} style={{ color: "#ef4444" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Delete Listing</h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                Are you sure you want to permanently delete <strong style={{ color: "var(--foreground)" }}>{deleteTarget.name}</strong>?
                All associated data will be removed.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2 text-sm rounded-sm border transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={deleting}
                  className="flex-1 py-2 text-sm font-semibold rounded-sm transition-colors disabled:opacity-60"
                  style={{ background: "#ef4444", color: "white" }}>
                  {deleting ? "Deleting…" : "Delete Listing"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
