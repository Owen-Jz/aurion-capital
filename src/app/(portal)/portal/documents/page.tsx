"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Download,
  PenLine,
  CheckCircle2,
  X,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { DOCUMENTS, InvestorDocument } from "./content";

type Category = "All" | "Agreement" | "Disclosure" | "Platform Policy";
const CATEGORIES: Category[] = ["All", "Agreement", "Disclosure", "Platform Policy"];

type SignRecord = { name: string; date: string; timestamp: number };

function categoryColor(cat: InvestorDocument["category"]) {
  if (cat === "Agreement") return { bg: "rgba(201,168,76,0.12)", color: "var(--gold)" };
  if (cat === "Disclosure") return { bg: "rgba(100,160,230,0.12)", color: "#5a9fd4" };
  return { bg: "rgba(120,200,140,0.12)", color: "#68c07a" };
}

function downloadDocument(doc: InvestorDocument, signRecord?: SignRecord) {
  const sectionHtml = doc.sections
    .map((s) => {
      let html = "";
      if (s.heading) html += `<h3 class="section-heading">${s.heading}</h3>`;
      if (s.body) html += `<p class="section-body">${s.body}</p>`;
      if (s.items?.length) {
        html += `<ul class="section-list">`;
        s.items.forEach((item) => {
          html += `<li>${item}</li>`;
        });
        html += `</ul>`;
      }
      if (s.note) {
        html += `<div class="section-note">${s.note}</div>`;
      }
      return html;
    })
    .join("");

  const investorSig = signRecord
    ? `<div class="sig-col">
        <p class="sig-col-label">Investor</p>
        <p class="sig-name">${signRecord.name}</p>
        <p class="sig-field-label">Signature (Electronic)</p>
        <p class="sig-detail">${signRecord.date}</p>
        <p class="sig-detail" style="color:#aaa;">Ref: ${new Date(signRecord.timestamp).toISOString()}</p>
      </div>`
    : `<div class="sig-col">
        <p class="sig-col-label">Investor</p>
        <div class="sig-line"></div>
        <p class="sig-field-label">Signature</p>
        <div class="sig-line" style="margin-top:1.4em;"></div>
        <p class="sig-field-label">Printed Name</p>
        <div class="sig-line" style="margin-top:1.4em;"></div>
        <p class="sig-field-label">Date</p>
      </div>`;

  const signBlock = `<div class="sign-section">
    <p class="sign-section-title">Signatures</p>
    <div class="sig-row">
      ${investorSig}
      <div class="sig-divider"></div>
      <div class="sig-col">
        <p class="sig-col-label">Aurion Capital Group LLC</p>
        <div class="sig-line"></div>
        <p class="sig-field-label">Authorised Signatory</p>
        <div class="sig-line" style="margin-top:1.4em;"></div>
        <p class="sig-field-label">Printed Name &amp; Title</p>
        <div class="sig-line" style="margin-top:1.4em;"></div>
        <p class="sig-field-label">Date</p>
      </div>
    </div>
  </div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>${doc.title}</title>
<style>
  @page { size: A4; margin: 2.2cm 2.5cm; }
  * { box-sizing: border-box; }
  body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10.5pt;
    line-height: 1.7;
    color: #0a0f1e;
    margin: 0;
    padding: 0;
  }
  .doc-header {
    border-bottom: 2px solid #c9a84c;
    padding-bottom: 1.4em;
    margin-bottom: 2em;
  }
  .firm-name {
    font-family: Arial, sans-serif;
    font-size: 7.5pt;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: #c9a84c;
    text-transform: uppercase;
    margin: 0 0 0.6em;
  }
  h1 {
    font-size: 18pt;
    font-weight: 700;
    margin: 0 0 0.25em;
    line-height: 1.25;
  }
  .doc-subtitle {
    font-size: 10pt;
    font-style: italic;
    color: #555;
    margin: 0 0 0.5em;
  }
  .doc-meta {
    font-family: Arial, sans-serif;
    font-size: 8pt;
    color: #888;
    margin: 0;
  }
  .section-heading {
    font-size: 10.5pt;
    font-weight: 700;
    color: #0a0f1e;
    margin: 1.6em 0 0.45em;
    page-break-after: avoid;
  }
  .section-body {
    margin: 0 0 0.8em;
    color: #1e2a3a;
    text-align: justify;
  }
  .section-list {
    margin: 0 0 0.9em;
    padding-left: 1.6em;
  }
  .section-list li {
    margin-bottom: 0.5em;
    color: #1e2a3a;
  }
  .section-note {
    margin: 1.6em 0;
    padding: 0.9em 1.1em;
    background: #fdf9f0;
    border-left: 3px solid #c9a84c;
    font-size: 8.5pt;
    font-weight: 700;
    font-family: Arial, sans-serif;
    color: #7a5c10;
    line-height: 1.6;
    page-break-inside: avoid;
  }
  .sign-section {
    margin-top: 3.5em;
    padding: 1.4em 1.6em;
    border: 1px solid #d4c08a;
    border-radius: 6px;
    background: #fdfaf2;
    page-break-inside: avoid;
  }
  .sign-section-title {
    font-family: Arial, sans-serif;
    font-size: 7.5pt;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c9a84c;
    margin: 0 0 1.2em;
  }
  .sig-row {
    display: flex;
    gap: 0;
    align-items: flex-start;
  }
  .sig-col {
    flex: 1;
  }
  .sig-divider {
    width: 1px;
    background: #ddd;
    margin: 0 2em;
    align-self: stretch;
  }
  .sig-col-label {
    font-family: Arial, sans-serif;
    font-size: 8.5pt;
    font-weight: 700;
    color: #0a0f1e;
    margin: 0 0 1.2em;
  }
  .sig-line {
    border-bottom: 1px solid #0a0f1e;
    margin-bottom: 0.25em;
    height: 2.2em;
  }
  .sig-field-label {
    font-family: Arial, sans-serif;
    font-size: 7.5pt;
    color: #888;
    margin: 0 0 0;
  }
  .sig-name {
    font-family: Georgia, serif;
    font-size: 13pt;
    font-style: italic;
    color: #0a0f1e;
    margin: 0 0 0.15em;
    line-height: 1.2;
  }
  .sig-detail {
    font-family: Arial, sans-serif;
    font-size: 7.5pt;
    color: #666;
    margin: 0.1em 0 0;
  }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="doc-header">
  <p class="firm-name">Aurion Capital Group</p>
  <h1>${doc.title}</h1>
  <p class="doc-subtitle">${doc.subtitle}</p>
  <p class="doc-meta">Effective Date: ${doc.effectiveDate} &nbsp;&middot;&nbsp; ${doc.category}</p>
</div>
${sectionHtml}
${signBlock}
<script>window.onload=function(){window.print();}<\/script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

// ─── Viewer Modal ────────────────────────────────────────────────────────────

function ViewerModal({
  doc,
  signRecord,
  onClose,
  onSign,
}: {
  doc: InvestorDocument;
  signRecord?: SignRecord;
  onClose: () => void;
  onSign: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const catStyle = categoryColor(doc.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,20,0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.22 }}
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="min-w-0">
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2"
              style={{ background: catStyle.bg, color: catStyle.color }}
            >
              {doc.category}
            </span>
            <h2 className="font-serif text-xl font-bold text-foreground leading-snug">{doc.title}</h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{doc.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <button
              onClick={() => downloadDocument(doc, signRecord)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
            >
              <Download size={12} /> Download
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--border)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="overflow-y-auto flex-1 px-6 py-5 space-y-5 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
          <p style={{ color: "var(--muted)", fontStyle: "italic" }}>{doc.description}</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Effective Date: {doc.effectiveDate}</p>

          {doc.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h3 className="font-semibold text-foreground mb-2" style={{ fontSize: "0.875rem" }}>{section.heading}</h3>
              )}
              {section.body && (
                <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: section.items?.length ? "0.75rem" : 0 }}>
                  {section.body}
                </p>
              )}
              {section.items && section.items.length > 0 && (
                <ul className="space-y-2 pl-0">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5" style={{ color: "var(--muted)" }}>
                      <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
                      <span style={{ lineHeight: 1.75 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <div
                  className="mt-4 p-4 rounded-lg text-xs font-semibold leading-relaxed"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", color: "var(--gold)" }}
                >
                  <AlertTriangle size={13} className="inline mr-1.5 mb-0.5" />
                  {section.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          {signRecord ? (
            <div className="flex items-center gap-2 text-sm" style={{ color: "#68c07a" }}>
              <CheckCircle2 size={15} />
              <span>Signed by <strong>{signRecord.name}</strong> on {signRecord.date}</span>
            </div>
          ) : (
            <p className="text-xs" style={{ color: "var(--muted)" }}>This document has not been signed yet.</p>
          )}

          {!signRecord && (
            <button
              onClick={onSign}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: "var(--gold)", color: "#0a0f1e" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <PenLine size={14} /> Sign Document
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Sign Modal ──────────────────────────────────────────────────────────────

function SignModal({
  doc,
  onClose,
  onComplete,
}: {
  doc: InvestorDocument;
  onClose: () => void;
  onComplete: (record: SignRecord) => void;
}) {
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSign() {
    if (!name.trim() || !agreed) return;
    const today = new Date();
    const record: SignRecord = {
      name: name.trim(),
      date: today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      timestamp: today.getTime(),
    };
    setSubmitted(true);
    setTimeout(() => onComplete(record), 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,20,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {submitted ? (
          <div className="py-6 text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300 }}>
              <CheckCircle2 size={48} className="mx-auto mb-3" style={{ color: "#68c07a" }} />
            </motion.div>
            <p className="font-semibold text-foreground text-lg">Document Signed</p>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Your signature has been recorded.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-lg font-bold text-foreground">Electronic Signature</h3>
              <button onClick={onClose} className="p-1 rounded" style={{ color: "var(--muted)" }}>
                <X size={16} />
              </button>
            </div>

            <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
              You are signing: <span className="font-medium text-foreground">{doc.title}</span>
            </p>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name exactly as it appears on your ID"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
                style={{
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px rgba(201,168,76,0.12)"; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              />
            </div>

            {name.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 rounded-lg text-center font-serif italic"
                style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--gold)", fontSize: "1.1rem" }}
              >
                {name.trim()}
              </motion.div>
            )}

            <label className="flex items-start gap-2.5 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                By checking this box and clicking Sign, I confirm that I have read and understood this document in its entirety, and I agree that my electronic signature has the same legal force and effect as a handwritten signature.
              </span>
            </label>

            <button
              onClick={handleSign}
              disabled={!name.trim() || !agreed}
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: name.trim() && agreed ? "var(--gold)" : "var(--border)",
                color: name.trim() && agreed ? "#0a0f1e" : "var(--muted)",
                cursor: name.trim() && agreed ? "pointer" : "not-allowed",
              }}
            >
              Sign Document
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [viewing, setViewing] = useState<InvestorDocument | null>(null);
  const [signing, setSigning] = useState<InvestorDocument | null>(null);
  const [signatures, setSignatures] = useState<Record<string, SignRecord>>({});

  useEffect(() => {
    const loaded: Record<string, SignRecord> = {};
    DOCUMENTS.forEach((doc) => {
      const raw = localStorage.getItem(`aurion_signed_${doc.id}`);
      if (raw) {
        try { loaded[doc.id] = JSON.parse(raw); } catch {}
      }
    });
    setSignatures(loaded);
  }, []);

  function handleSignComplete(doc: InvestorDocument, record: SignRecord) {
    localStorage.setItem(`aurion_signed_${doc.id}`, JSON.stringify(record));
    setSignatures((prev) => ({ ...prev, [doc.id]: record }));
    setSigning(null);
  }

  const filtered = DOCUMENTS.filter(
    (doc) => activeTab === "All" || doc.category === activeTab
  );

  const needSig = DOCUMENTS.filter((d) => !signatures[d.id]).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Review and sign your investor agreements and disclosures.
          </p>
        </div>
        {needSig > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "var(--gold)" }}
          >
            <AlertTriangle size={13} />
            {needSig} document{needSig > 1 ? "s" : ""} awaiting signature
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
              style={{
                background: isActive ? "var(--foreground)" : "transparent",
                color: isActive ? "white" : "var(--muted)",
                border: isActive ? "1px solid transparent" : "1px solid var(--border)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Document Cards */}
      <div className="grid gap-4">
        {filtered.map((doc) => {
          const signed = signatures[doc.id];
          const catStyle = categoryColor(doc.category);

          return (
            <div
              key={doc.id}
              className="rounded-xl p-5 transition-all duration-200"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: catStyle.bg }}
                >
                  <FileText size={18} style={{ color: catStyle.color }} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: catStyle.bg, color: catStyle.color }}
                    >
                      {doc.category}
                    </span>
                    {signed ? (
                      <span
                        className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(104,192,122,0.12)", color: "#68c07a" }}
                      >
                        <CheckCircle2 size={10} /> Signed
                      </span>
                    ) : (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)" }}
                      >
                        Awaiting Signature
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-foreground">{doc.title}</h3>
                  <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>{doc.subtitle}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", opacity: 0.85 }}>{doc.description}</p>

                  {signed && (
                    <p className="text-xs mt-2" style={{ color: "#68c07a", opacity: 0.85 }}>
                      Signed by {signed.name} · {signed.date}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex flex-col gap-2 items-end">
                  <button
                    onClick={() => setViewing(doc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => downloadDocument(doc, signed)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                  >
                    <Download size={12} /> Download
                  </button>
                  {!signed && (
                    <button
                      onClick={() => setSigning(doc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: "var(--gold)", color: "#0a0f1e" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >
                      <PenLine size={12} /> Sign
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {viewing && (
          <ViewerModal
            key="viewer"
            doc={viewing}
            signRecord={signatures[viewing.id]}
            onClose={() => setViewing(null)}
            onSign={() => { setSigning(viewing); setViewing(null); }}
          />
        )}
        {signing && (
          <SignModal
            key="sign"
            doc={signing}
            onClose={() => setSigning(null)}
            onComplete={(record) => handleSignComplete(signing, record)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
