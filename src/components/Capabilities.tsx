"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface Capability {
  number: string;
  title: string;
  tagline: string;
  stat: string;
  description: string;
  href: string;
}

const capabilities: Capability[] = [
  {
    number: "01",
    title: "Real Estate",
    tagline: "Where supply is constrained, we have conviction.",
    stat: "$9.1B deployed",
    description:
      "We buy commercial and residential assets in markets where supply is structurally limited, then operate them directly. 14 countries, 200+ assets, held through cycles others exit.",
    href: "/capabilities/real-estate",
  },
  {
    number: "02",
    title: "Infrastructure",
    tagline: "Essential assets for modern economies.",
    stat: "$6.3B deployed",
    description:
      "Energy transition, digital infrastructure, transport. We own assets that entire economies depend on — and we build them to last across political and rate cycles.",
    href: "/capabilities/infrastructure",
  },
  {
    number: "03",
    title: "Private Credit",
    tagline: "First lien to mezzanine. We lend where banks retreated.",
    stat: "$4.8B deployed",
    description:
      "Direct lending, second lien, mezzanine. We underwrite the actual risk — not a ratings agency's opinion of it — and price accordingly across the full capital structure.",
    href: "/capabilities/private-credit",
  },
  {
    number: "04",
    title: "Insurance Solutions",
    tagline: "Liability-aware portfolio construction.",
    stat: "18 carrier partnerships",
    description:
      "We build bespoke investment portfolios for insurers that match liability duration, meet regulatory capital requirements, and generate risk-adjusted excess returns.",
    href: "/capabilities/insurance-solutions",
  },
  {
    number: "05",
    title: "Multi-Asset Solutions",
    tagline: "Diversification with a view.",
    stat: "$3.2B in mandates",
    description:
      "Not a passive allocation — an active multi-asset strategy that adjusts exposure based on macro signals, liquidity conditions, and long-term structural themes.",
    href: "/capabilities/multi-asset",
  },
];

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="bg-background py-24 px-6 sm:py-32"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            What We Do
          </p>
          <h2
            id="capabilities-heading"
            className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mt-3"
          >
            Investment Capabilities
          </h2>
          <div className="w-12 mt-6" style={{ height: "1px", backgroundColor: "rgba(201,168,76,0.4)" }} />
        </div>

        {/* Full-width image panel */}
        <div className="relative mb-16 overflow-hidden rounded-lg" style={{ height: "320px" }}>
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80"
            alt="Modern investment office interior"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.4) 60%, rgba(10,15,30,0.2) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-3">
              Across 5 Asset Classes
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-lg leading-snug">
              $24B deployed across real assets, credit, and multi-asset mandates since 2008.
            </p>
          </div>
          {/* Bottom-right decorative corner */}
          <div className="absolute bottom-6 right-6 opacity-30" aria-hidden="true">
            <div className="h-px w-10 bg-gold mb-1" />
            <div className="h-px w-6 bg-gold" />
          </div>
        </div>

        {/* Rows */}
        <div className="border-t border-border">
          {capabilities.map((cap, i) => (
            <div
              key={cap.number}
              className="border-b border-border cursor-default transition-colors duration-300"
              style={{
                backgroundColor:
                  hoveredIndex === i
                    ? "rgba(201,168,76,0.02)"
                    : "transparent",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="grid grid-cols-[3rem_1fr_auto] lg:grid-cols-[4rem_1fr_auto] items-start gap-6 lg:gap-10 py-6 lg:py-8">
                {/* Column 1: number */}
                <span
                  className={`font-mono text-2xl lg:text-3xl font-light transition-colors duration-300 ${
                    hoveredIndex === i ? "text-gold/60" : "text-gold/30"
                  }`}
                >
                  {cap.number}
                </span>

                {/* Column 2: text content */}
                <div>
                  <h3 className="font-serif text-xl lg:text-2xl font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">{cap.tagline}</p>

                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="text-sm text-muted leading-relaxed mt-3 max-w-xl">
                          {cap.description}
                        </p>
                        <Link
                          href={cap.href}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent mt-3 hover:text-gold transition-colors duration-200"
                        >
                          Explore
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Column 3: stat */}
                <span className="font-mono text-xs lg:text-sm text-gold/70 tracking-wide uppercase whitespace-nowrap pt-1">
                  {cap.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-16 text-center">
          <Link
            href="/capabilities/real-estate"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors duration-200"
          >
            Explore our full investment platform
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
