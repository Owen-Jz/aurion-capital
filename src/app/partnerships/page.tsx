"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Star, ShieldCheck, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PublicPartnership {
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
  featured: boolean;
}

export default function PartnershipsPage() {
  const [items, setItems] = useState<PublicPartnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partnerships")
      .then((r) => r.json())
      .then((d) => setItems(d.partnerships ?? []))
      .finally(() => setLoading(false));
  }, []);

  const featured = items.filter((p) => p.featured);
  const standard = items.filter((p) => !p.featured);

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          className="relative pt-32 pb-16 px-6 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #1a2a4a 60%, #0d1117 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="max-w-5xl mx-auto relative text-center">
            <p className="text-xs uppercase tracking-[0.32em] mb-4" style={{ color: "#c9a84c" }}>
              Aurion · Partnerships &amp; Press
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-[1.05] text-white">
              Official partnerships and executed agreements.
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Each partnership listed here corresponds to a document executed between Aurion Capital Group and the named counterparty. Copies of the executed agreements are available for download by qualified parties on request.
            </p>
          </div>
        </section>

        {/* Verification policy band */}
        <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="max-w-5xl mx-auto px-6 py-8 grid sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Executed documents", body: "Every record links to an executed PDF supplied by both parties' counsel." },
              { icon: FileText, title: "Verification on request", body: "Independent verification available through legal@aurioncapital.com." },
              { icon: Mail, title: "No fabricated endorsements", body: "Aurion never represents an affiliation that is not supported by an executed agreement." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <Icon size={18} style={{ color: "#c9a84c", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section className="py-20 px-6" style={{ background: "var(--background)" }}>
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "#c9a84c" }} />
              </div>
            ) : items.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {featured.length > 0 && (
                  <div className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.24em] mb-6" style={{ color: "#c9a84c" }}>Featured</p>
                    <div className="grid gap-6">
                      {featured.map((p, i) => <FeaturedCard key={p._id} p={p} delay={i * 0.08} />)}
                    </div>
                  </div>
                )}

                {standard.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] mb-6" style={{ color: "var(--muted)" }}>
                      {featured.length > 0 ? "Further records" : "Records"}
                    </p>
                    <div className="grid gap-4">
                      {standard.map((p, i) => <StandardCard key={p._id} p={p} delay={i * 0.05} />)}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Footer disclaimer */}
            <div
              className="mt-16 rounded-sm border p-5 text-xs leading-relaxed"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
            >
              <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>Verification &amp; counsel</p>
              For independent verification of any partnership listed on this page, please contact{" "}
              <a href="mailto:legal@aurioncapital.com" className="underline" style={{ color: "var(--accent)" }}>legal@aurioncapital.com</a>{" "}
              and we will arrange a counsel-to-counsel introduction. Aurion does not publish any document that has not been executed by the named counterparty.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <FileText size={36} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
      <h2 className="font-serif text-xl font-bold" style={{ color: "var(--foreground)" }}>
        No partnerships are currently published.
      </h2>
      <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
        When Aurion executes a partnership or press agreement, the executed document will be posted here. Press &amp; institutional enquiries:{" "}
        <a href="mailto:press@aurioncapital.com" className="underline" style={{ color: "var(--accent)" }}>press@aurioncapital.com</a>.
      </p>
    </div>
  );
}

function FeaturedCard({ p, delay }: { p: PublicPartnership; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-sm border overflow-hidden"
      style={{ borderColor: "rgba(201,168,76,0.3)", background: "var(--surface)" }}
    >
      <div className="grid md:grid-cols-[1fr_280px]">
        <div className="p-7">
          <div className="flex items-center gap-2 mb-3">
            <Star size={12} style={{ color: "#c9a84c" }} fill="#c9a84c" />
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "#c9a84c" }}>
              {p.relationshipType}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {p.partnerName}
          </h3>
          {(p.partnerRole || p.partnerOrganization) && (
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              {[p.partnerRole, p.partnerOrganization].filter(Boolean).join(" · ")}
            </p>
          )}
          <p className="text-base mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>{p.summary}</p>
          <p className="text-xs mt-5" style={{ color: "var(--muted)" }}>
            Announced{" "}
            {new Date(p.announcedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <DocumentPanel p={p} />
      </div>
    </motion.article>
  );
}

function StandardCard({ p, delay }: { p: PublicPartnership; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-sm border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif text-lg font-bold" style={{ color: "var(--foreground)" }}>{p.partnerName}</span>
          <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "#c9a84c" }}>· {p.relationshipType}</span>
        </div>
        {(p.partnerRole || p.partnerOrganization) && (
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {[p.partnerRole, p.partnerOrganization].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>{p.summary}</p>
        <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
          Announced{" "}
          {new Date(p.announcedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
      <a
        href={p.documentPath}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-sm"
        style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
      >
        <FileText size={12} /> View Document
      </a>
    </motion.article>
  );
}

function DocumentPanel({ p }: { p: PublicPartnership }) {
  const isImage = p.documentMime.startsWith("image/");
  return (
    <div className="border-l flex flex-col" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <div className="flex-1 relative" style={{ minHeight: 220 }}>
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.documentPath} alt={`${p.partnerName} executed document preview`} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <FileText size={40} style={{ color: "#c9a84c" }} />
            <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>Executed PDF</p>
            <p className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>{p.documentName}</p>
          </div>
        )}
      </div>
      <a
        href={p.documentPath}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-t"
        style={{ borderColor: "var(--border)", color: "#c9a84c" }}
      >
        View executed document <ExternalLink size={11} />
      </a>
    </div>
  );
}
