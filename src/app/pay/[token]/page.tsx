"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, CheckCircle, Upload, AlertCircle } from "lucide-react";

interface ApplicationData {
  application: {
    _id: string;
    tierName: string;
    tierPrice: number;
    tierShares: number;
    amount: number;
    userId: { name: string; email: string };
  };
  company: { name: string; sector: string };
}

const CRYPTO_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9D35Dde8a5f1";
const WIRE_DETAILS = {
  "Bank Name": "JP Morgan Chase",
  "Account Name": "Aurion Capital Group LLC",
  "Account Number": "****4821",
  "Routing Number": "021000021",
  "SWIFT / BIC": "CHASUS33",
  "Reference": "Include your full name and application ID",
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

  async function handleSubmitPayment() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/pay/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, proofUrl: proofUrl || undefined }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error ?? "Submission failed."); return; }
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

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--background)" }}>
        <AlertCircle size={40} style={{ color: "#ef4444" }} />
        <h1 className="font-serif text-xl font-bold mt-4" style={{ color: "var(--foreground)" }}>
          Invalid Payment Link
        </h1>
        <p className="mt-2 text-sm text-center max-w-sm" style={{ color: "var(--muted)" }}>
          {error || "This payment link is invalid or has expired. Please contact Aurion Capital Group."}
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.12)" }}>
            <CheckCircle size={32} style={{ color: "#c9a84c" }} />
          </div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Payment Received</h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Your payment submission has been recorded. Our team will verify your payment and send your documents within 24 hours.
          </p>
          <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
            Questions? Email <a href="mailto:invest@aurioncapital.com" className="underline hover:text-[#c9a84c]" style={{ color: "var(--accent)" }}>invest@aurioncapital.com</a>
          </p>
        </motion.div>
      </div>
    );
  }

  const { application, company } = data;

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#c9a84c" }}>
            Complete Your Investment
          </p>
          <h1 className="font-serif text-3xl font-bold" style={{ color: "var(--foreground)" }}>
            Payment Instructions
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Hi {application.userId.name} — your application for <strong>{company.name}</strong> has been approved.
          </p>
        </div>

        {/* Investment summary */}
        <div
          className="rounded-sm border p-5 mb-6"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
            Investment Summary
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Company", value: company.name },
              { label: "Tier", value: application.tierName },
              { label: "Shares", value: application.tierShares.toLocaleString() },
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
        </div>

        {/* Method tabs */}
        <div className="flex gap-1 p-1 rounded-sm mb-6" style={{ background: "var(--border)" }}>
          {(["crypto", "wire"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className="flex-1 py-2 text-sm font-medium rounded-sm transition-all capitalize"
              style={{
                background: method === m ? "var(--surface)" : "transparent",
                color: method === m ? "var(--foreground)" : "var(--muted)",
              }}
            >
              {m === "crypto" ? "Cryptocurrency" : "Wire Transfer"}
            </button>
          ))}
        </div>

        {/* Payment details */}
        <motion.div
          key={method}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-sm border p-5 mb-6"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {method === "crypto" ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
                Send USDC / ETH / BTC to this address
              </p>
              <div
                className="flex items-center gap-3 p-4 rounded-sm font-mono text-sm"
                style={{ background: "var(--background)", borderColor: "var(--border)", border: "1px solid var(--border)" }}
              >
                <span className="flex-1 break-all" style={{ color: "var(--foreground)" }}>{CRYPTO_ADDRESS}</span>
                <button
                  onClick={copyAddress}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                  style={{ background: copied ? "rgba(34,197,94,0.1)" : "rgba(201,168,76,0.1)", color: copied ? "#22c55e" : "#c9a84c" }}
                >
                  {copied ? <><CheckCircle size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>
                Send exactly <strong style={{ color: "var(--foreground)" }}>${application.amount.toLocaleString()} USDC equivalent</strong>. Include your name in the memo/reference if possible.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
                Wire Transfer Details
              </p>
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

        {/* Proof upload */}
        <div
          className="rounded-sm border p-5 mb-6"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
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

        {/* Submit */}
        <button
          onClick={handleSubmitPayment}
          disabled={submitting}
          className="w-full py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "#c9a84c", color: "#0a0f1e" }}
        >
          {submitting ? (
            <><span className="w-4 h-4 rounded-full border-2 border-[#0a0f1e]/20 border-t-[#0a0f1e] animate-spin" /> Processing…</>
          ) : (
            "I've Made Payment"
          )}
        </button>

        <p className="mt-4 text-xs text-center" style={{ color: "var(--muted)" }}>
          Your shares will be issued once payment is verified. Documents will be sent within 24 hours.
        </p>
      </div>
    </div>
  );
}
