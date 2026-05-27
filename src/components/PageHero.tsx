"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  stats?: StatItem[];
}

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function PageHero({ eyebrow, heading, subheading, stats }: PageHeroProps) {
  return (
    <section
      className="relative flex items-end overflow-hidden pb-20 pt-40"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #1a2a4a 50%, #0d1117 100%)" }}
      aria-label={heading}
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(26,58,92,0.5) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,15,30,0.3))",
        }}
        aria-hidden="true"
      />

      {/* Horizontal accent line */}
      <div
        className="pointer-events-none absolute left-0 right-0"
        style={{
          bottom: "5rem",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.08) 30%, rgba(201,168,76,0.12) 50%, rgba(201,168,76,0.08) 70%, transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold/80">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            {subheading}
          </p>
        </motion.div>

        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mt-14 flex flex-wrap gap-12 border-t border-white/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-bold text-gold">{stat.value}</p>
                <p className="mt-1 text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
