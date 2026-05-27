"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  Bell,
  Briefcase,
} from "lucide-react";

interface Session {
  name: string;
  firm?: string;
  email: string;
  isAdmin?: boolean;
  onboardingComplete?: boolean;
}

const navLinks = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "Invest", href: "/invest", icon: Briefcase },
  { label: "Portfolio", href: "/portal/portfolio", icon: PieChart },
  { label: "Performance", href: "/portal/performance", icon: TrendingUp },
  { label: "Documents", href: "/portal/documents", icon: FileText },
  { label: "Settings", href: "/portal/settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/portal": "Dashboard",
  "/invest": "Investment Opportunities",
  "/portal/portfolio": "Portfolio",
  "/portal/performance": "Performance",
  "/portal/documents": "Documents",
  "/portal/settings": "Settings",
};

function AurionMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points="256,74 70,446 118,446" fill="white" />
      <polygon points="256,74 442,446 394,446" fill="white" />
      <rect x="46" y="434" width="96" height="14" rx="5" fill="white" />
      <rect x="370" y="434" width="96" height="14" rx="5" fill="white" />
      <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c" />
    </svg>
  );
}

function Sidebar({ user, onLogout }: { user: Session | null; onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-60 flex flex-col z-20"
      style={{
        background: "#0a0f1e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        className="p-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <AurionMark />
          <div>
            <div className="font-serif text-sm font-bold text-white tracking-[0.12em]">
              AURION
            </div>
            <div
              className="text-[9px] text-white/40 tracking-wider"
              style={{ letterSpacing: "0.1em" }}
            >
              Capital Group
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 px-3 mb-2 mt-6">
          Investor Portal
        </p>
        <ul className="space-y-1">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/invest"
              ? pathname === "/invest" || pathname.startsWith("/invest/")
              : pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    color: isActive ? "white" : "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.8)";
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom user section */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,168,76,0.2)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>
              {user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? "AU"}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-white/80 truncate">
              {user?.name ?? ""}
            </div>
            <div className="text-[10px] text-white/40 truncate">{user?.firm ?? ""}</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-3 w-full flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

function TopBar({ user }: { user: Session | null }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? (pathname.startsWith("/invest/") ? "Opportunity Details" : "Portal");

  return (
    <header
      className="h-14 sticky top-0 z-10 flex items-center px-6 lg:px-8 justify-between"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span className="text-base font-semibold text-foreground">{title}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          Updated May 23, 2026
        </span>
        <Bell
          size={18}
          strokeWidth={1.5}
          className="cursor-pointer transition-colors"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as SVGElement).style.color = "var(--foreground)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as SVGElement).style.color = "var(--muted)")
          }
        />
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(201,168,76,0.2)" }}
        >
          <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>
            AP
          </span>
        </div>
      </div>
    </header>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) { router.push("/login"); return; }
        setUser(data.user);
        // Redirect new users to onboarding unless they're already there
        if (!data.user.onboardingComplete && !pathname.startsWith("/portal/onboarding")) {
          router.push("/portal/onboarding");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setChecking(false));
  }, [router, pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#e2e8f0", borderTopColor: "#c9a84c" }}
        />
      </div>
    );
  }

  // Onboarding is a full-screen experience — no sidebar/topbar
  if (pathname.startsWith("/portal/onboarding")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col lg:ml-60">
        <TopBar user={user} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
