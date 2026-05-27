"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, Plus, Trash2, GripVertical,
  Building2, Users, PieChart, TrendingUp, Shield, Layers,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Tier { _id?: string; name: string; price: string; shares: string; order: string; available: boolean }
interface Highlight { stat: string; label: string; sub: string }
interface TeamMember { name: string; title: string; bio: string; initials: string }
interface FundUse { label: string; pct: string; color: string; description: string }
interface Metric { label: string; value: string; trend: string }
interface Risk { title: string; body: string }

interface CompanyData {
  _id: string; name: string; slug: string; sector: string; tagline: string;
  description: string; baseValuation: string; totalShares: string;
  sharesRemaining: string; minInvestment: string; status: string;
  tiers: Tier[]; highlights: Highlight[]; team: TeamMember[];
  useOfFunds: FundUse[]; metrics: Metric[]; risks: Risk[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SECTORS = ["Infrastructure", "Real Estate", "Private Credit", "Multi-Asset", "Technology", "Healthcare", "Energy"];
const STATUSES = ["draft", "active", "closed"];
const FUND_COLORS = ["#c9a84c", "#1a3a5c", "#2d6a9f", "#64748b", "#22c55e", "#ef4444", "#8b5cf6"];

const inputCls = "w-full border rounded-sm px-3 py-2 text-sm outline-none focus:border-[#c9a84c]/50 transition-colors resize-none";
const inputStyle = { borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" };
const labelCls = "block text-xs font-medium mb-1.5" as const;

const TABS = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "tiers", label: "Inv. Tiers", icon: Layers },
  { id: "highlights", label: "Highlights", icon: TrendingUp },
  { id: "team", label: "Team", icon: Users },
  { id: "financials", label: "Financials", icon: PieChart },
  { id: "risks", label: "Risks", icon: Shield },
] as const;

type TabId = typeof TABS[number]["id"];

function emptyTier(): Tier { return { name: "", price: "", shares: "", order: "", available: true } }
function emptyHighlight(): Highlight { return { stat: "", label: "", sub: "" } }
function emptyMember(): TeamMember { return { name: "", title: "", bio: "", initials: "" } }
function emptyFund(): FundUse { return { label: "", pct: "", color: "#c9a84c", description: "" } }
function emptyMetric(): Metric { return { label: "", value: "", trend: "" } }
function emptyRisk(): Risk { return { title: "", body: "" } }

// ─── Field components ─────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls} style={{ color: "var(--muted)" }}>{label}</label>
      {children}
    </div>
  );
}

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-sm transition-colors"
      style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
    >
      <Plus size={12} /> {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 rounded-sm transition-colors shrink-0"
      style={{ color: "var(--muted)" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted)")}
    >
      <Trash2 size={13} />
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function EditCompanyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<TabId>("overview");
  const [data, setData] = useState<CompanyData | null>(null);

  useEffect(() => {
    fetch(`/api/admin/companies?id=${id}`)
      .then((r) => r.json())
      .then((d) => {
        const co = d.company ?? d.companies?.find((c: { _id: string }) => c._id === id);
        if (!co) return;
        setData({
          _id: co._id,
          name: co.name ?? "",
          slug: co.slug ?? "",
          sector: co.sector ?? "",
          tagline: co.tagline ?? "",
          description: co.description ?? "",
          baseValuation: String(co.baseValuation ?? ""),
          totalShares: String(co.totalShares ?? ""),
          sharesRemaining: String(co.sharesRemaining ?? ""),
          minInvestment: String(co.minInvestment ?? "5000"),
          status: co.status ?? "draft",
          tiers: (co.tiers ?? []).map((t: Record<string, unknown>) => ({
            _id: t._id as string,
            name: String(t.name ?? ""),
            price: String(t.price ?? ""),
            shares: String(t.shares ?? ""),
            order: String(t.order ?? ""),
            available: Boolean(t.available ?? true),
          })),
          highlights: (co.highlights ?? []).map((h: Record<string, unknown>) => ({
            stat: String(h.stat ?? ""), label: String(h.label ?? ""), sub: String(h.sub ?? ""),
          })),
          team: (co.team ?? []).map((m: Record<string, unknown>) => ({
            name: String(m.name ?? ""), title: String(m.title ?? ""),
            bio: String(m.bio ?? ""), initials: String(m.initials ?? ""),
          })),
          useOfFunds: (co.useOfFunds ?? []).map((f: Record<string, unknown>) => ({
            label: String(f.label ?? ""), pct: String(f.pct ?? ""),
            color: String(f.color ?? "#c9a84c"), description: String(f.description ?? ""),
          })),
          metrics: (co.metrics ?? []).map((m: Record<string, unknown>) => ({
            label: String(m.label ?? ""), value: String(m.value ?? ""), trend: String(m.trend ?? ""),
          })),
          risks: (co.risks ?? []).map((r: Record<string, unknown>) => ({
            title: String(r.title ?? ""), body: String(r.body ?? ""),
          })),
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  function set<K extends keyof CompanyData>(key: K, value: CompanyData[K]) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  function setArr<K extends keyof CompanyData>(key: K, index: number, value: CompanyData[K][number]) {
    setData((d) => {
      if (!d) return d;
      const arr = [...(d[key] as unknown[])] as CompanyData[K];
      (arr as unknown[])[index] = value;
      return { ...d, [key]: arr };
    });
  }

  function addArr<K extends keyof CompanyData>(key: K, empty: CompanyData[K][number]) {
    setData((d) => d ? { ...d, [key]: [...(d[key] as unknown[]), empty] as CompanyData[K] } : d);
  }

  function removeArr<K extends keyof CompanyData>(key: K, index: number) {
    setData((d) => {
      if (!d) return d;
      const arr = (d[key] as unknown[]).filter((_, i) => i !== index);
      return { ...d, [key]: arr as CompanyData[K] };
    });
  }

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/companies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data._id,
          name: data.name,
          slug: data.slug,
          sector: data.sector,
          tagline: data.tagline,
          description: data.description,
          baseValuation: data.baseValuation,
          totalShares: data.totalShares,
          sharesRemaining: data.sharesRemaining,
          minInvestment: data.minInvestment,
          status: data.status,
          tiers: data.tiers.map((t, i) => ({ ...t, order: t.order || String(i + 1) })),
          highlights: data.highlights,
          team: data.team,
          useOfFunds: data.useOfFunds,
          metrics: data.metrics,
          risks: data.risks,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const d = await res.json();
        alert(d.error ?? "Save failed.");
      }
    } finally {
      setSaving(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-60 gap-3">
        <p style={{ color: "var(--muted)" }}>Company not found.</p>
        <Link href="/admin/companies" className="text-sm" style={{ color: "#c9a84c" }}>← Back</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link
            href="/admin/companies"
            className="inline-flex items-center gap-1.5 text-xs mb-2 transition-colors hover:text-[#c9a84c]"
            style={{ color: "var(--muted)" }}
          >
            <ArrowLeft size={12} /> Back to Listings
          </Link>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {data.name || "Untitled Listing"}
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{data.slug}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-sm transition-all disabled:opacity-60"
          style={{
            background: saved ? "#22c55e" : "#c9a84c",
            color: "#0a0f1e",
          }}
        >
          <Save size={14} />
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map(({ id: tid, label, icon: Icon }) => (
          <button
            key={tid}
            onClick={() => setTab(tid)}
            className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors -mb-px border-b-2"
            style={{
              borderBottomColor: tab === tid ? "#c9a84c" : "transparent",
              color: tab === tid ? "#c9a84c" : "var(--muted)",
            }}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      {tab === "overview" && (
        <div className="space-y-5">
          <SectionCard title="Core Details">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Company Name *">
                <input className={inputCls} style={inputStyle} value={data.name}
                  onChange={(e) => set("name", e.target.value)} placeholder="NexGen Logistics" />
              </Field>
              <Field label="Slug *">
                <input className={inputCls} style={inputStyle} value={data.slug}
                  onChange={(e) => set("slug", e.target.value)} placeholder="nexgen-logistics" />
              </Field>
              <Field label="Sector *">
                <select className={inputCls} style={inputStyle} value={data.sector}
                  onChange={(e) => set("sector", e.target.value)}>
                  <option value="">Select sector</option>
                  {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select className={inputCls} style={inputStyle} value={data.status}
                  onChange={(e) => set("status", e.target.value)}>
                  {STATUSES.map((s) => <option key={s} value={s} style={{ textTransform: "capitalize" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Tagline">
                <input className={inputCls} style={inputStyle} value={data.tagline}
                  onChange={(e) => set("tagline", e.target.value)} placeholder="One-line summary" />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Description">
                <textarea rows={6} className={inputCls} style={inputStyle} value={data.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Full company description (separate paragraphs with a blank line)…" />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Financials">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Field label="Base Valuation ($) *">
                <input type="number" className={inputCls} style={inputStyle} value={data.baseValuation}
                  onChange={(e) => set("baseValuation", e.target.value)} placeholder="42000000" />
              </Field>
              <Field label="Total Shares *">
                <input type="number" className={inputCls} style={inputStyle} value={data.totalShares}
                  onChange={(e) => set("totalShares", e.target.value)} placeholder="420000" />
              </Field>
              <Field label="Shares Remaining">
                <input type="number" className={inputCls} style={inputStyle} value={data.sharesRemaining}
                  onChange={(e) => set("sharesRemaining", e.target.value)} placeholder="210000" />
              </Field>
              <Field label="Min Investment ($)">
                <input type="number" className={inputCls} style={inputStyle} value={data.minInvestment}
                  onChange={(e) => set("minInvestment", e.target.value)} placeholder="5000" />
              </Field>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── TIERS ─────────────────────────────────────────────────────────── */}
      {tab === "tiers" && (
        <SectionCard title="Investment Tiers"
          action={<AddButton onClick={() => addArr("tiers", emptyTier())} label="Add Tier" />}>
          {data.tiers.length === 0 && (
            <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>No tiers yet. Add one.</p>
          )}
          <div className="space-y-3">
            {data.tiers.map((tier, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                <GripVertical size={14} className="mt-2.5 shrink-0" style={{ color: "var(--muted)" }} />
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <Field label="Name">
                    <input className={inputCls} style={inputStyle} value={tier.name}
                      onChange={(e) => setArr("tiers", i, { ...tier, name: e.target.value })}
                      placeholder="Entry" />
                  </Field>
                  <Field label="Price ($)">
                    <input type="number" className={inputCls} style={inputStyle} value={tier.price}
                      onChange={(e) => setArr("tiers", i, { ...tier, price: e.target.value })}
                      placeholder="5000" />
                  </Field>
                  <Field label="Shares">
                    <input type="number" className={inputCls} style={inputStyle} value={tier.shares}
                      onChange={(e) => setArr("tiers", i, { ...tier, shares: e.target.value })}
                      placeholder="50" />
                  </Field>
                  <Field label="Order">
                    <input type="number" className={inputCls} style={inputStyle} value={tier.order}
                      onChange={(e) => setArr("tiers", i, { ...tier, order: e.target.value })}
                      placeholder={String(i + 1)} />
                  </Field>
                </div>
                <div className="flex flex-col items-center gap-2 pt-1">
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "var(--muted)" }}>
                    <input type="checkbox" checked={tier.available}
                      onChange={(e) => setArr("tiers", i, { ...tier, available: e.target.checked })}
                      className="accent-[#c9a84c]" />
                    Active
                  </label>
                  <RemoveButton onClick={() => removeArr("tiers", i)} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── HIGHLIGHTS ────────────────────────────────────────────────────── */}
      {tab === "highlights" && (
        <SectionCard title="Key Highlights (stat cards shown at top of listing)"
          action={<AddButton onClick={() => addArr("highlights", emptyHighlight())} label="Add Highlight" />}>
          {data.highlights.length === 0 && (
            <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>No highlights yet.</p>
          )}
          <div className="space-y-3">
            {data.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <Field label="Stat (e.g. 340%)">
                    <input className={inputCls} style={inputStyle} value={h.stat}
                      onChange={(e) => setArr("highlights", i, { ...h, stat: e.target.value })}
                      placeholder="340%" />
                  </Field>
                  <Field label="Label">
                    <input className={inputCls} style={inputStyle} value={h.label}
                      onChange={(e) => setArr("highlights", i, { ...h, label: e.target.value })}
                      placeholder="Revenue Growth" />
                  </Field>
                  <Field label="Sub-label (optional)">
                    <input className={inputCls} style={inputStyle} value={h.sub}
                      onChange={(e) => setArr("highlights", i, { ...h, sub: e.target.value })}
                      placeholder="3-year CAGR" />
                  </Field>
                </div>
                <RemoveButton onClick={() => removeArr("highlights", i)} />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      {tab === "team" && (
        <SectionCard title="Leadership Team"
          action={<AddButton onClick={() => addArr("team", emptyMember())} label="Add Member" />}>
          {data.team.length === 0 && (
            <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>No team members yet.</p>
          )}
          <div className="space-y-4">
            {data.team.map((m, i) => (
              <div key={i} className="p-4 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <Field label="Full Name">
                      <input className={inputCls} style={inputStyle} value={m.name}
                        onChange={(e) => setArr("team", i, { ...m, name: e.target.value })}
                        placeholder="Marcus Chen" />
                    </Field>
                    <Field label="Title">
                      <input className={inputCls} style={inputStyle} value={m.title}
                        onChange={(e) => setArr("team", i, { ...m, title: e.target.value })}
                        placeholder="Chief Executive Officer" />
                    </Field>
                    <Field label="Initials">
                      <input className={inputCls} style={inputStyle} value={m.initials}
                        onChange={(e) => setArr("team", i, { ...m, initials: e.target.value.toUpperCase().slice(0, 3) })}
                        placeholder="MC" maxLength={3} />
                    </Field>
                  </div>
                  <RemoveButton onClick={() => removeArr("team", i)} />
                </div>
                <Field label="Bio">
                  <textarea rows={3} className={inputCls} style={inputStyle} value={m.bio}
                    onChange={(e) => setArr("team", i, { ...m, bio: e.target.value })}
                    placeholder="Background and experience…" />
                </Field>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── FINANCIALS ────────────────────────────────────────────────────── */}
      {tab === "financials" && (
        <div className="space-y-5">
          {/* Use of Funds */}
          <SectionCard title="Use of Funds"
            action={<AddButton onClick={() => addArr("useOfFunds", emptyFund())} label="Add Bucket" />}>
            {data.useOfFunds.length === 0 && (
              <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>No allocation buckets yet.</p>
            )}
            <div className="space-y-3">
              {data.useOfFunds.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                  <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <Field label="Label">
                      <input className={inputCls} style={inputStyle} value={f.label}
                        onChange={(e) => setArr("useOfFunds", i, { ...f, label: e.target.value })}
                        placeholder="New Facilities" />
                    </Field>
                    <Field label="Percentage (%)">
                      <input type="number" min="0" max="100" className={inputCls} style={inputStyle} value={f.pct}
                        onChange={(e) => setArr("useOfFunds", i, { ...f, pct: e.target.value })}
                        placeholder="58" />
                    </Field>
                    <Field label="Color">
                      <div className="flex items-center gap-2">
                        <input type="color" value={f.color}
                          onChange={(e) => setArr("useOfFunds", i, { ...f, color: e.target.value })}
                          className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent p-0.5"
                          style={{ border: "1px solid var(--border)" }} />
                        <select className={`${inputCls} flex-1`} style={inputStyle} value={f.color}
                          onChange={(e) => setArr("useOfFunds", i, { ...f, color: e.target.value })}>
                          {FUND_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </Field>
                    <Field label="Description">
                      <input className={inputCls} style={inputStyle} value={f.description}
                        onChange={(e) => setArr("useOfFunds", i, { ...f, description: e.target.value })}
                        placeholder="Brief description…" />
                    </Field>
                  </div>
                  <RemoveButton onClick={() => removeArr("useOfFunds", i)} />
                </div>
              ))}
            </div>
            {data.useOfFunds.length > 0 && (
              <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
                Total: {data.useOfFunds.reduce((s, f) => s + (Number(f.pct) || 0), 0)}%
                {data.useOfFunds.reduce((s, f) => s + (Number(f.pct) || 0), 0) !== 100 && (
                  <span className="text-amber-500 ml-2">⚠ Should sum to 100%</span>
                )}
              </p>
            )}
          </SectionCard>

          {/* Key Metrics */}
          <SectionCard title="Key Metrics"
            action={<AddButton onClick={() => addArr("metrics", emptyMetric())} label="Add Metric" />}>
            {data.metrics.length === 0 && (
              <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>No metrics yet.</p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {data.metrics.map((m, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <Field label="Label">
                      <input className={inputCls} style={inputStyle} value={m.label}
                        onChange={(e) => setArr("metrics", i, { ...m, label: e.target.value })}
                        placeholder="Annual Revenue" />
                    </Field>
                    <Field label="Value">
                      <input className={inputCls} style={inputStyle} value={m.value}
                        onChange={(e) => setArr("metrics", i, { ...m, value: e.target.value })}
                        placeholder="$18.4M" />
                    </Field>
                    <Field label="Trend (optional)">
                      <input className={inputCls} style={inputStyle} value={m.trend}
                        onChange={(e) => setArr("metrics", i, { ...m, trend: e.target.value })}
                        placeholder="+127% YoY" />
                    </Field>
                  </div>
                  <RemoveButton onClick={() => removeArr("metrics", i)} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── RISKS ─────────────────────────────────────────────────────────── */}
      {tab === "risks" && (
        <SectionCard title="Risk Factors"
          action={<AddButton onClick={() => addArr("risks", emptyRisk())} label="Add Risk" />}>
          {data.risks.length === 0 && (
            <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>No risk factors yet.</p>
          )}
          <div className="space-y-4">
            {data.risks.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                <div className="flex-1 space-y-3">
                  <Field label="Risk Title">
                    <input className={inputCls} style={inputStyle} value={r.title}
                      onChange={(e) => setArr("risks", i, { ...r, title: e.target.value })}
                      placeholder="Concentration risk" />
                  </Field>
                  <Field label="Description">
                    <textarea rows={3} className={inputCls} style={inputStyle} value={r.body}
                      onChange={(e) => setArr("risks", i, { ...r, body: e.target.value })}
                      placeholder="Detailed description of the risk factor…" />
                  </Field>
                </div>
                <RemoveButton onClick={() => removeArr("risks", i)} />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Save bar */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-sm transition-all disabled:opacity-60"
          style={{ background: saved ? "#22c55e" : "#c9a84c", color: "#0a0f1e" }}
        >
          <Save size={14} />
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
