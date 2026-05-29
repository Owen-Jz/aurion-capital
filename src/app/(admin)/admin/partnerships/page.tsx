"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Eye,
  EyeOff,
  Star,
  Trash2,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";

interface PartnershipRecord {
  _id: string;
  partnerName: string;
  partnerRole?: string;
  partnerOrganization?: string;
  relationshipType: string;
  summary: string;
  announcedAt: string;
  documentPath: string;
  documentMime: string;
  documentName: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  order: number;
  createdAt: string;
  uploadedByEmail?: string;
}

const RELATIONSHIP_TYPES = [
  "Strategic Partnership",
  "Advisory Engagement",
  "Press Release",
  "Service Agreement",
  "Licensing Agreement",
  "Joint Venture",
  "Letter of Intent",
  "Memorandum of Understanding",
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  draft: { bg: "rgba(100,116,139,0.12)", color: "#64748b", label: "Draft" },
  published: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Published" },
  archived: { bg: "rgba(239,68,68,0.1)", color: "#ef4444", label: "Archived" },
};

export default function AdminPartnershipsPage() {
  const [items, setItems] = useState<PartnershipRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  /* Form state */
  const [partnerName, setPartnerName] = useState("");
  const [partnerRole, setPartnerRole] = useState("");
  const [partnerOrganization, setPartnerOrganization] = useState("");
  const [relationshipType, setRelationshipType] = useState(RELATIONSHIP_TYPES[0]);
  const [summary, setSummary] = useState("");
  const [announcedAt, setAnnouncedAt] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  function load() {
    setLoading(true);
    fetch("/api/admin/partnerships")
      .then((r) => r.json())
      .then((d) => setItems(d.partnerships ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setPartnerName("");
    setPartnerRole("");
    setPartnerOrganization("");
    setRelationshipType(RELATIONSHIP_TYPES[0]);
    setSummary("");
    setAnnouncedAt(new Date().toISOString().slice(0, 10));
    setFeatured(false);
    setFile(null);
    setStatus("draft");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please attach the executed partnership document (PDF or image).");
      return;
    }

    const fd = new FormData();
    fd.append("document", file);
    fd.append("partnerName", partnerName);
    fd.append("partnerRole", partnerRole);
    fd.append("partnerOrganization", partnerOrganization);
    fd.append("relationshipType", relationshipType);
    fd.append("summary", summary);
    fd.append("announcedAt", announcedAt);
    fd.append("featured", String(featured));
    fd.append("status", status);

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/partnerships", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      resetForm();
      setShowForm(false);
      load();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function patchOne(id: string, patch: Partial<PartnershipRecord>) {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/partnerships", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      if (res.ok) load();
    } finally {
      setUpdating(null);
    }
  }

  async function deleteOne(id: string) {
    if (!confirm("Delete this partnership record? The uploaded file will remain on disk.")) return;
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/partnerships?id=${id}`, { method: "DELETE" });
      if (res.ok) load();
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Partnerships &amp; Press
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Manage official partnership documents that appear on the public Partnerships page.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-sm"
          style={{ background: "#c9a84c", color: "#0a0f1e" }}
        >
          <Plus size={14} /> {showForm ? "Cancel" : "Upload Partnership"}
        </button>
      </div>

      {/* Compliance notice */}
      <div
        className="rounded-sm border p-4 mb-6 flex items-start gap-3"
        style={{ borderColor: "rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.04)" }}
      >
        <AlertCircle size={16} style={{ color: "#c9a84c", marginTop: 2 }} />
        <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            Upload-only · No template generation
          </p>
          Every record on this page corresponds to a document <strong>executed by an authorised counterparty</strong> and supplied to Aurion through its legal team. Aurion never fabricates or signs documents on behalf of third parties. Uploading a misleading or fabricated document may constitute securities fraud, identity misuse and false endorsement.
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-sm border p-6 mb-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
            New partnership record
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Partner name (person or organisation)">
              <input
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Acme Capital Partners"
                className={inputClass}
                required
              />
            </Field>
            <Field label="Counterparty signatory role (optional)">
              <input
                value={partnerRole}
                onChange={(e) => setPartnerRole(e.target.value)}
                placeholder="e.g. Managing Partner"
                className={inputClass}
              />
            </Field>
            <Field label="Counterparty organisation (optional)">
              <input
                value={partnerOrganization}
                onChange={(e) => setPartnerOrganization(e.target.value)}
                placeholder="e.g. Acme Holdings, LLC"
                className={inputClass}
              />
            </Field>
            <Field label="Relationship type">
              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className={inputClass}
              >
                {RELATIONSHIP_TYPES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Date announced">
              <input
                type="date"
                value={announcedAt}
                onChange={(e) => setAnnouncedAt(e.target.value)}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Status on publication">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className={inputClass}
              >
                <option value="draft">Draft (not visible publicly)</option>
                <option value="published">Published (visible on /partnerships)</option>
              </select>
            </Field>
          </div>

          <Field label="Public summary">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="One paragraph describing the partnership. This will appear on the public card."
              className={inputClass}
              required
            />
          </Field>

          <Field label="Executed document (PDF, PNG, JPEG or WebP · max 10 MB)">
            <div
              className="rounded-sm border-2 border-dashed p-6 text-center cursor-pointer transition-colors"
              style={{ borderColor: file ? "#c9a84c" : "var(--border)", background: "var(--background)" }}
              onClick={() => document.getElementById("doc-input")?.click()}
            >
              <input
                id="doc-input"
                type="file"
                accept="application/pdf,image/png,image/jpeg,image/webp"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle size={16} style={{ color: "#22c55e" }} />
                  <span style={{ color: "var(--foreground)" }}>{file.name}</span>
                  <span style={{ color: "var(--muted)" }}>
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
              ) : (
                <div>
                  <Upload size={20} className="mx-auto mb-2" style={{ color: "var(--muted)" }} />
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Click to upload the executed PDF or image
                  </p>
                </div>
              )}
            </div>
          </Field>

          <label className="flex items-center gap-2 cursor-pointer mt-4">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-[#c9a84c]"
            />
            <span className="text-sm" style={{ color: "var(--foreground)" }}>
              Feature at top of public partnerships page
            </span>
          </label>

          {error && (
            <p className="mt-4 text-sm text-red-500 flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-sm font-semibold rounded-sm disabled:opacity-60"
              style={{ background: "#c9a84c", color: "#0a0f1e" }}
            >
              {submitting ? "Uploading…" : "Save partnership"}
            </button>
            <button
              type="button"
              onClick={() => { resetForm(); setShowForm(false); }}
              className="px-6 py-2.5 text-sm rounded-sm"
              style={{ background: "var(--border)", color: "var(--foreground)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <FileText size={36} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
          <p style={{ color: "var(--muted)" }}>No partnership records yet.</p>
          <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            Upload an executed partnership document to publish it on the public page.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((p) => {
            const s = STATUS_STYLES[p.status];
            return (
              <div
                key={p._id}
                className="rounded-sm border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {p.featured && <Star size={12} style={{ color: "#c9a84c" }} fill="#c9a84c" />}
                      <span className="font-serif text-lg font-bold" style={{ color: "var(--foreground)" }}>
                        {p.partnerName}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted)" }}>
                        · {p.relationshipType}
                      </span>
                    </div>
                    {(p.partnerRole || p.partnerOrganization) && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {[p.partnerRole, p.partnerOrganization].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>{p.summary}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: "var(--muted)" }}>
                      <span>Announced {new Date(p.announcedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                      <a href={p.documentPath} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>
                        {p.documentName}
                      </a>
                      {p.uploadedByEmail && <span>Uploaded by {p.uploadedByEmail}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    {p.status === "published" ? (
                      <button
                        onClick={() => patchOne(p._id, { status: "draft" })}
                        disabled={updating === p._id}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-sm"
                        style={{ background: "rgba(100,116,139,0.1)", color: "var(--muted)" }}
                      >
                        <EyeOff size={11} /> Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => patchOne(p._id, { status: "published" })}
                        disabled={updating === p._id}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-sm"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                      >
                        <Eye size={11} /> Publish
                      </button>
                    )}
                    <button
                      onClick={() => patchOne(p._id, { featured: !p.featured })}
                      disabled={updating === p._id}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-sm"
                      style={{ background: p.featured ? "rgba(201,168,76,0.15)" : "var(--border)", color: p.featured ? "#c9a84c" : "var(--muted)" }}
                    >
                      <Star size={11} fill={p.featured ? "#c9a84c" : "none"} />
                      {p.featured ? "Featured" : "Feature"}
                    </button>
                    <button
                      onClick={() => deleteOne(p._id)}
                      disabled={updating === p._id}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-sm"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                    >
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full border rounded-sm px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c]/40 bg-background text-foreground";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
