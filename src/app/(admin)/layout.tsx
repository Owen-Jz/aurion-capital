"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, LogOut, Building2, ChevronRight, Handshake } from "lucide-react";

interface AdminUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Companies", href: "/admin/companies", icon: Building2 },
  { label: "Investors", href: "/admin/users", icon: Users },
  { label: "Partnerships", href: "/admin/partnerships", icon: Handshake },
];

function AurionMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="256,74 70,446 118,446" fill="white" />
      <polygon points="256,74 442,446 394,446" fill="white" />
      <rect x="46" y="434" width="96" height="14" rx="5" fill="white" />
      <rect x="370" y="434" width="96" height="14" rx="5" fill="white" />
      <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c" />
    </svg>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || !d.user.isAdmin) router.push("/login");
        else setUser(d.user);
      })
      .catch(() => router.push("/login"))
      .finally(() => setChecking(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#e2e8f0", borderTopColor: "#c9a84c" }} />
      </div>
    );
  }

  const breadcrumb = navLinks.find((l) => l.href === pathname)?.label ?? "Admin";

  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-56 flex flex-col z-20"
        style={{ background: "#0a0f1e", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <AurionMark />
            <div>
              <div className="font-serif text-sm font-bold text-white tracking-[0.12em]">AURION</div>
              <div className="text-[9px] text-white/40 tracking-wider">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 px-3 mb-2 mt-2">Management</p>
          <ul className="space-y-1">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                      color: isActive ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Icon size={15} strokeWidth={1.5} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-xs font-medium text-white/70 truncate">{user?.name}</div>
          <div className="text-[10px] text-white/35 truncate">{user?.email}</div>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col ml-56">
        {/* Top bar */}
        <header
          className="h-12 sticky top-0 z-10 flex items-center px-6 gap-2 text-xs"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", color: "var(--muted)" }}
        >
          <span>Admin</span>
          <ChevronRight size={12} />
          <span style={{ color: "var(--foreground)" }}>{breadcrumb}</span>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
