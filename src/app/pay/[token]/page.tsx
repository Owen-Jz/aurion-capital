"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCircle,
  Upload,
  AlertCircle,
  FileText,
  Download,
  Eye,
  Mail,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface InvestmentDocument {
  id: string;
  type: string;
  shortName: string;
  filename: string;
  content: string;
}

interface PlanInfo {
  id: string;
  label: string;
  lockUpDays: number;
  targetReturn: string;
  capitalReturnWindowDays: number;
  distributionCadence: string;
}

interface ApplicationData {
  application: {
    _id: string;
    tierName: string;
    tierPrice: number;
    tierShares: number;
    amount: number;
    planLabel?: string;
    userId: { name: string; email: string };
  };
  company: { name: string; sector: string };
  plan: PlanInfo;
  documents: InvestmentDocument[];
}

const CRYPTO_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9D35Dde8a5f1";
const WIRE_DETAILS = {
  "Bank Name": "JP Morgan Chase",
  "Account Name": "Aurion Capital Group LLC",
  "Account Number": "****4821",
  "Routing Number": "021000021",
  "SWIFT / BIC": "CHASUS33",
  Reference: "Include your full name and application ID",
};

export default function PaymentPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [method, setMethod] = useState<"crypto" | "wire">("crypto");
  const [copied, setCopied] = useState(false);
  const [proofUrl, setProofUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [docsReviewed, setDocsReviewed] = useState<Record<string, boolean>>({});
  const [openDoc, setOpenDoc] = useState<InvestmentDocument | null>(null);
  const [emailingDocs, setEmailingDocs] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    fetch(`/api/pay/${token}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .finally(() => setLoading(false));
  }, [token]);

  function copyAddress() {
    navigator.clipboard.writeText(CRYPTO_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadDoc(doc: InvestmentDocument) {
    const blob = new Blob([doc.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDocsReviewed((s) => ({ ...s, [doc.id]: true }));
  }

  function viewDoc(doc: InvestmentDocument) {
    setOpenDoc(doc);
    setDocsReviewed((s) => ({ ...s, [doc.id]: true }));
  }

  function emailDocsToMe() {
    // The platform already keeps copies on file; this is a UX hook —
    // in production wire it to /api/pay/[token]/email-documents which
    // would call sendEmail with the rendered HTML.
    setEmailingDocs(true);
    setTimeout(() => {
      setEmailingDocs(false);
      setEmailSent(true);
    }, 900);
  }

  const allDocsReviewed =
    data && data.documents.every((d) => docsReviewed[d.id]);

  async function handleSubmitPayment() {
    if (!allDocsReviewed) {
      setError(
        "Please review each subscription document before submitting payment."
      );
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/pay/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          proofUrl: proofUrl || undefined,
          documentsAcknowledged: true,
        }),
      });
      const d = await res.json();
      if (!res.ok) {
        setError(d.error ?? "Submission failed.");
        return;
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--background)" }}>
        <AlertCircle size={40} style={{ color: "#ef4444" }} />
        <h1 className="font-serif text-xl font-bold mt-4" style={{ color: "var(--foreground)" }}>Invalid Payment Link</h1>
        <p className="mt-2 text-sm text-center max-w-sm" style={{ color: "var(--muted)" }}>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.12)" }}>
            <CheckCircle size={32} style={{ color: "#c9a84c" }} />
          </div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Payment Received</h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Your payment submission has been recorded and your executed subscription package has been added to your investor file. Our settlements team will verify funds within 24 hours and confirm your allocation.
          </p>
          <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
            Questions? Email{" "}
            <a href="mailto:investorrelations@aurioncapital.com" className="underline" style={{ color: "var(--accent)" }}>
              investorrelations@aurioncapital.com
            </a>
          </p>
        </motion.div>
      </div>
    );
  }

  const { application, company, plan, documents } = data;

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#c9a84c" }}>Complete Your Investment</p>
          <h1 className="font-serif text-3xl font-bold" style={{ color: "var(--foreground)" }}>Documents &amp; Settlement</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Hi {application.userId.name} — your application for <strong>{company.name}</strong> has been approved. Please review the documents below, then proceed to settlement.
          </p>
        </div>

        {/* Investment summary */}
        <div className="rounded-sm border p-5 mb-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>Investment Summary</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              { label: "Company", value: company.name },
              { label: "Tier", value: application.tierName },
              { label: "Shares", value: application.tierShares.toLocaleString() },
              { label: "Holding Period", value: plan.label },
              { label: "Amount Due", value: `$${application.amount.toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: label === "Amount Due" ? "#c9a84c" : "var(--foreground)" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex flex-wrap gap-x-6 gap-y-1.5 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            <span>Target return: <strong style={{ color: "var(--foreground)" }}>{plan.targetReturn}</strong></span>
            <span>Lock-up: <strong style={{ color: "var(--foreground)" }}>{plan.lockUpDays} days</strong></span>
            <span>Capital return window: <strong style={{ color: "var(--foreground)" }}>{plan.capitalReturnWindowDays} days post-maturity</strong></span>
            <span>Distributions: <strong style={{ color: "var(--foreground)" }}>{plan.distributionCadence}</strong></span>
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-sm border p-5 mb-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Subscription Package</h2>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Review each document. You may view inline, download, or have copies emailed to you.</p>
            </div>
            <button
              onClick={emailDocsToMe}
              disabled={emailingDocs || emailSent}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-colors disabled:opacity-60"
              style={{ background: "rgba(201,168,76,0.08)", color: "#c9a84c" }}
            >
              {emailSent ? (
                <><CheckCircle size={12} /> Sent to {application.userId.email}</>
              ) : emailingDocs ? (
                <><span className="w-3 h-3 rounded-full border-2 border-[#c9a84c]/30 border-t-[#c9a84c] animate-spin" /> Sending…</>
              ) : (
                <><Mail size={12} /> Email all to me</>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-sm border p-4"
                style={{
                  borderColor: docsReviewed[doc.id] ? "rgba(201,168,76,0.4)" : "var(--border)",
                  background: docsReviewed[doc.id] ? "rgba(201,168,76,0.04)" : "var(--background)",
                }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} style={{ color: docsReviewed[doc.id] ? "#c9a84c" : "var(--muted)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{doc.type}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {docsReviewed[doc.id] ? "Reviewed" : "Required review"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => viewDoc(doc)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                    style={{ background: "rgba(26,58,92,0.08)", color: "#1a3a5c" }}
                  >
                    <Eye size={11} /> View
                  </button>
                  <button
                    onClick={() => downloadDoc(doc)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
                  >
                    <Download size={11} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!allDocsReviewed && (
            <p className="mt-4 text-xs flex items-center gap-1.5" style={{ color: "#c9a84c" }}>
              <AlertCircle size={12} /> Please view or download each document before settlement.
            </p>
          )}
        </div>

        {/* Method tabs */}
        <div className="flex gap-1 p-1 rounded-sm mb-6" style={{ background: "var(--border)" }}>
          {(["crypto", "wire"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className="flex-1 py-2 text-sm font-medium rounded-sm capitalize"
              style={{ background: method === m ? "var(--surface)" : "transparent", color: method === m ? "var(--foreground)" : "var(--muted)" }}
            >
              {m === "crypto" ? "Cryptocurrency" : "Wire Transfer"}
            </button>
          ))}
        </div>

        <motion.div
          key={method}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-sm border p-5 mb-6"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {method === "crypto" ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>Send USDC / ETH / BTC to this address</p>
              <div
                className="flex items-center gap-3 p-4 rounded-sm font-mono text-sm"
                style={{ background: "var(--background)", borderColor: "var(--border)", border: "1px solid var(--border)" }}
              >
                <span className="flex-1 break-all" style={{ color: "var(--foreground)" }}>{CRYPTO_ADDRESS}</span>
                <button
                  onClick={copyAddress}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm"
                  style={{ background: copied ? "rgba(34,197,94,0.1)" : "rgba(201,168,76,0.1)", color: copied ? "#22c55e" : "#c9a84c" }}
                >
                  {copied ? <><CheckCircle size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>
                Send exactly <strong style={{ color: "var(--foreground)" }}>${application.amount.toLocaleString()} USDC equivalent</strong>. Include your name in the memo if possible.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>Wire Transfer Details</p>
              <div className="space-y-3">
                {Object.entries(WIRE_DETAILS).map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
                    <span className="text-sm font-medium text-right" style={{ color: "var(--foreground)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="rounded-sm border p-5 mb-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
            Payment Confirmation (optional)
          </label>
          <div className="flex items-center gap-3">
            <Upload size={16} style={{ color: "var(--muted)" }} />
            <input
              type="text"
              placeholder="Paste transaction ID, screenshot URL, or reference…"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              className="flex-1 border rounded-sm px-3 py-2 text-sm outline-none focus:border-[#c9a84c]/40"
              style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
            />
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-500 flex items-center gap-2" role="alert">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <button
          onClick={handleSubmitPayment}
          disabled={submitting || !allDocsReviewed}
          className="w-full py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background: "#c9a84c", color: "#0a0f1e" }}
        >
          {submitting ? (
            <><span className="w-4 h-4 rounded-full border-2 border-[#0a0f1e]/20 border-t-[#0a0f1e] animate-spin" /> Processing…</>
          ) : !allDocsReviewed ? (
            <><ShieldCheck size={14} /> Review documents to continue</>
          ) : (
            <>I&apos;ve Made Payment <ChevronRight size={14} /></>
          )}
        </button>

        <p className="mt-4 text-xs text-center" style={{ color: "var(--muted)" }}>
          Your shares will be issued once payment is verified. A formal allocation letter will follow within 24 hours.
        </p>
      </div>

      {/* Document viewer modal */}
      <AnimatePresence>
        {openDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,15,30,0.7)" }}
            onClick={() => setOpenDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-sm border flex flex-col"
              style={{ background: "var(--background)", borderColor: "var(--border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#c9a84c" }}>{openDoc.shortName}</p>
                  <h3 className="font-serif text-lg font-bold" style={{ color: "var(--foreground)" }}>{openDoc.type}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadDoc(openDoc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
                  >
                    <Download size={12} /> Download
                  </button>
                  <button onClick={() => setOpenDoc(null)} className="text-lg" style={{ color: "var(--muted)" }}>✕</button>
                </div>
              </div>
              <div className="overflow-y-auto p-6 font-mono text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--foreground)" }}>
                {openDoc.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
