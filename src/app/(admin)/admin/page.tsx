"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Users, TrendingUp, Building2, ArrowRight } from "lucide-react";

interface Stats {
  pendingApplications: number;
  totalApplications: number;
  totalInvestors: number;
  activeCompanies: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ pendingApplications: 0, totalApplications: 0, totalInvestors: 0, activeCompanies: 0 });

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then((d) => {
      if (d.stats) setStats(d.stats);
    }).catch(() => {});
  }, []);

  const cards = [
    { icon: FileText, label: "Pending Applications", value: stats.pendingApplications, href: "/admin/applications", color: "#c9a84c" },
    { icon: TrendingUp, label: "Total Applications", value: stats.totalApplications, href: "/admin/applications", color: "#2d6a9f" },
    { icon: Users, label: "Registered Investors", value: stats.totalInvestors, href: "/admin/users", color: "#22c55e" },
    { icon: Building2, label: "Active Listings", value: stats.activeCompanies, href: "/admin/companies", color: "#a855f7" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--foreground)" }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Overview of platform activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ icon: Icon, label, value, href, color }) => (
          <Link
            key={label}
            href={href}
            className="block rounded-sm border p-5 transition-shadow hover:shadow-md"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={18} style={{ color }} />
              <ArrowRight size={14} style={{ color: "var(--muted)" }} />
            </div>
            <div className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>{value}</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-sm border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--foreground)" }}>Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Review Pending Applications", href: "/admin/applications", note: `${stats.pendingApplications} awaiting` },
              { label: "Manage Company Listings", href: "/admin/companies", note: `${stats.activeCompanies} active` },
              { label: "View All Investors", href: "/admin/users", note: `${stats.totalInvestors} registered` },
            ].map(({ label, href, note }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between p-3 rounded-sm transition-colors hover:bg-black/5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{note}</span>
                  <ArrowRight size={13} style={{ color: "var(--muted)" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
