"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Our Firm",
    href: "/our-firm",
    children: [
      {
        label: "About Us",
        href: "/our-firm/about",
        description: "Our history, mission, and values",
      },
      {
        label: "Leadership",
        href: "/our-firm/leadership",
        description: "Meet our senior leadership team",
      },
      {
        label: "Our Process",
        href: "/our-firm/process",
        description: "How we create long-term value",
      },
      {
        label: "Track Record",
        href: "/our-firm/track-record",
        description: "Proven performance across cycles",
      },
    ],
  },
  {
    label: "Investment Capabilities",
    href: "/capabilities",
    children: [
      {
        label: "Real Estate",
        href: "/capabilities/real-estate",
        description: "Global real estate equity and debt",
      },
      {
        label: "Infrastructure",
        href: "/capabilities/infrastructure",
        description: "Essential assets for modern economies",
      },
      {
        label: "Private Credit",
        href: "/capabilities/private-credit",
        description: "Flexible lending across the capital structure",
      },
      {
        label: "Insurance Solutions",
        href: "/capabilities/insurance-solutions",
        description: "Tailored portfolios for insurers",
      },
      {
        label: "Multi-Asset Solutions",
        href: "/capabilities/multi-asset",
        description: "Diversified strategies for total return",
      },
      {
        label: "AI Investments",
        href: "/ai-investments",
        description: "Tesla, NVIDIA, xAI and the AI growth basket",
      },
    ],
  },
  {
    label: "Our Impact",
    href: "/impact",
    children: [
      {
        label: "ESG Framework",
        href: "/impact/esg",
        description: "Integrating sustainability into investing",
      },
      {
        label: "Responsible Investing",
        href: "/impact/responsible-investing",
        description: "Our commitment to responsible capital",
      },
      {
        label: "Diversity & Inclusion",
        href: "/impact/diversity-inclusion",
        description: "Building a more inclusive industry",
      },
      {
        label: "Community",
        href: "/impact/community",
        description: "Giving back to the communities we serve",
      },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "Partnerships",
    href: "/partnerships",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* -------------------------------------------------------------------------- */
/*  Animation Variants                                                        */
/* -------------------------------------------------------------------------- */

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.96,
    transition: { duration: 0.15, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.98,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 * i, duration: 0.3, ease: "easeOut" },
  }),
};

const mobileChildVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* ---- Scroll listener ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Lock body scroll when mobile menu open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- Close mobile menu on resize to desktop ---- */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileAccordion(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---- Desktop dropdown handlers with small delay for UX ---- */
  const openDropdown = useCallback((label: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  }, []);

  /* ---- Close dropdown on outside click ---- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---- Keyboard: close dropdown on Escape ---- */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_32px_rgba(0,0,0,0.04)] border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 shrink-0"
            aria-label="Aurion Capital Group home"
          >
            {/* Icon mark */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0 transition-opacity duration-300 group-hover:opacity-80"
            >
              <rect width="512" height="512" rx="96" fill="#0a0f1e"/>
              <rect width="512" height="512" rx="96" fill="url(#nav-bg-grad)"/>
              <defs>
                <radialGradient id="nav-bg-grad" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#1a3a5c"/>
                  <stop offset="100%" stopColor="#0a0f1e"/>
                </radialGradient>
              </defs>
              <rect width="512" height="512" rx="96" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="3"/>
              <polygon points="256,74 70,446 118,446" fill="#f0ece2"/>
              <polygon points="256,74 442,446 394,446" fill="#f0ece2"/>
              <rect x="46" y="434" width="96" height="14" rx="5" fill="#f0ece2"/>
              <rect x="370" y="434" width="96" height="14" rx="5" fill="#f0ece2"/>
              <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c"/>
            </svg>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className={`font-serif text-xl font-bold tracking-[0.12em] transition-colors duration-300 group-hover:text-gold ${scrolled ? "text-foreground" : "text-white"}`}>
                AURION
              </span>
              <span className={`font-serif text-[10px] font-light tracking-[0.22em] uppercase mt-0.5 transition-colors duration-300 ${scrolled ? "text-muted" : "text-white/60"}`}>
                Capital Group
              </span>
            </div>

            {/* Subtle gold underline on hover */}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children ? openDropdown(item.label) : undefined
                }
                onMouseLeave={() =>
                  item.children ? closeDropdown() : undefined
                }
              >
                {/* Top-level link / trigger */}
                {item.children ? (
                  <button
                    type="button"
                    className={`group flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                      activeDropdown === item.label
                        ? scrolled ? "text-accent" : "text-gold"
                        : scrolled
                          ? "text-foreground/80 hover:text-accent"
                          : "text-white/80 hover:text-white"
                    }`}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      )
                    }
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={1.5}
                      className={`transition-transform duration-300 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                      scrolled
                        ? "text-foreground/80 hover:text-accent"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Desktop Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-1/2 top-full pt-3"
                      style={{ transform: "translateX(-50%)" }}
                    >
                      <div className="min-w-[280px] rounded-xl border border-border/80 bg-white/95 backdrop-blur-xl p-2 shadow-[0_12px_48px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]">
                        {/* Subtle top accent line */}
                        <div className="mx-3 mb-2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="group flex flex-col gap-0.5 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-accent/[0.04]"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted/80 transition-colors duration-200 group-hover:text-muted">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ---- Right side: CTA + Hamburger ---- */}
          <div className="flex items-center gap-4">
            {/* Client Portal button */}
            <Link
              href="/portal"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_2px_12px_rgba(201,168,76,0.25)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] active:scale-[0.97]"
            >
              Client Portal
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 lg:hidden ${
                scrolled
                  ? "text-foreground hover:bg-accent/5"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ---- Mobile Menu Overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-20 z-40 bg-white/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex flex-col px-6 py-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={index}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-border/40"
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-5 text-lg font-medium tracking-wide text-foreground transition-colors duration-200 hover:text-accent"
                          onClick={() =>
                            setMobileAccordion(
                              mobileAccordion === item.label
                                ? null
                                : item.label
                            )
                          }
                          aria-expanded={mobileAccordion === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            size={18}
                            strokeWidth={1.5}
                            className={`text-muted transition-transform duration-300 ${
                              mobileAccordion === item.label
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileAccordion === item.label && (
                            <motion.div
                              variants={mobileChildVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-4 pl-4">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className="group rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-accent/[0.04]"
                                    onClick={() => {
                                      setMobileOpen(false);
                                      setMobileAccordion(null);
                                    }}
                                  >
                                    <span className="block text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-accent">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="block mt-0.5 text-xs text-muted/70">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-5 text-lg font-medium tracking-wide text-foreground transition-colors duration-200 hover:text-accent"
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileAccordion(null);
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto px-6 pb-10">
                <Link
                  href="/portal"
                  className="flex w-full items-center justify-center rounded-full bg-gold py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_2px_12px_rgba(201,168,76,0.25)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] active:scale-[0.97]"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileAccordion(null);
                  }}
                >
                  Client Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
