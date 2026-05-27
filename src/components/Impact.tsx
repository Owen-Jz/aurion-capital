"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const pillars = [
  {
    title: "ESG Integration",
    description:
      "Environmental, social, and governance factors embedded into every allocation decision — not as a checkbox but as a lens on risk.",
  },
  {
    title: "Diversity & Inclusion",
    description:
      "An inclusive culture we believe leads to sharper thinking and better outcomes across our portfolio and our firm.",
  },
  {
    title: "Community Impact",
    description:
      "Strategic philanthropy and operating partnerships in the communities where our assets are located.",
  },
];

interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  format: (n: number) => string;
}

const metrics: Metric[] = [
  {
    value: 2.4,
    prefix: "$",
    suffix: "B",
    label: "Deployed in sustainable projects",
    format: (n) => `$${n.toFixed(1)}B`,
  },
  {
    value: 48,
    prefix: "",
    suffix: "%",
    label: "Portfolio companies with net-zero targets",
    format: (n) => `${Math.floor(n)}%`,
  },
  {
    value: 12000,
    prefix: "",
    suffix: "+",
    label: "Jobs created in underserved communities",
    format: (n) => `${Math.floor(n).toLocaleString()}+`,
  },
];

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

function CountUp({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const [display, setDisplay] = useState(metric.format(0));
  const startedRef = useRef(false);

  // Also check immediately on mount in case element is already in viewport
  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  function startAnimation() {
    if (startedRef.current) return;
    startedRef.current = true;
    const duration = 2000;
    const startTime = performance.now();
    const target = metric.value;
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(metric.format(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return <span ref={ref}>{display}</span>;
}

export default function Impact() {
  return (
    <section
      id="impact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0a0f1e" }}
      aria-labelledby="impact-heading"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--gold-light) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--gold)" }}>
            Our Impact
          </p>
          <h2
            id="impact-heading"
            className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Investing Responsibly for a Better Tomorrow
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Every asset we own employs people, anchors communities, and moves
            energy or goods. Capital that ignores that isn&apos;t just
            irresponsible — it&apos;s incomplete.
          </p>
        </motion.div>

        {/* Two-column editorial split */}
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative pl-8">
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: "linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.6), transparent)",
                }}
                aria-hidden="true"
              />
              <blockquote className="font-serif text-xl lg:text-2xl font-medium italic leading-relaxed text-white/90">
                &ldquo;The best investments we&apos;ve made weren&apos;t obvious
                at the time. The worst ones were. We&apos;ve learned to
                distinguish conviction from consensus.&rdquo;
              </blockquote>
              <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                — James Harrington, Founder &amp; CEO
              </p>
            </div>

            <div className="mt-12 border-t border-white/10">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex items-start gap-6 border-b border-white/10 py-6">
                  <p className="text-sm font-semibold text-white tracking-wide w-36 shrink-0">{pillar.title}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — image card with metrics overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
            className="lg:col-span-2 relative overflow-hidden rounded-lg"
            style={{ minHeight: "420px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80"
              alt="Aerial city view representing global investment reach"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg, rgba(10,15,30,0.45) 0%, rgba(10,15,30,0.75) 100%)" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col justify-center gap-8 px-8 py-10">
              {metrics.map((metric) => (
                <div key={metric.label} className="border-l-2 pl-6" style={{ borderColor: "rgba(201,168,76,0.5)" }}>
                  <p className="gradient-text font-serif text-5xl lg:text-6xl font-bold drop-shadow-lg">
                    <CountUp metric={metric} />
                  </p>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
