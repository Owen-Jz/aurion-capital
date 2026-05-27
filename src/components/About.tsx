"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease, delay: 0.15 },
  },
};

export default function About() {
  return (
    <section
      className="relative overflow-hidden bg-background py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left column: Text content */}
          <div className="flex flex-col">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              custom={0}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Our Philosophy
            </motion.p>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              custom={0.1}
              className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            >
              Built on Conviction.
              <br />
              Driven by Research.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              custom={0.2}
              className="mt-8 space-y-5"
            >
              <p className="text-base leading-[1.8] text-muted sm:text-[1.0625rem]">
                At Aurion, we&rsquo;ve operated assets &mdash; not just owned
                them &mdash; since 2008. We sit on boards, work alongside
                management teams, and make decisions that compound over decades,
                not quarters. Disciplined value investing is the framework.
                Owner-operator discipline is what makes it real.
              </p>
              <p className="text-base leading-[1.8] text-muted sm:text-[1.0625rem]">
                We&rsquo;ve been through the 2008 financial crisis, the 2020
                collapse, and the 2022 rate shock. Each cycle tested our
                conviction and sharpened our process. That experience &mdash;
                not a model or a mandate &mdash; is the real edge we bring to
                every allocation.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              custom={0.35}
              className="mt-10"
            >
              <a
                href="/our-firm/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent transition-colors duration-300 hover:text-gold"
              >
                Learn More About Us
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>

          {/* Right column: Image with quote overlay */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            className="relative overflow-hidden rounded-lg lg:pt-8"
            style={{ minHeight: "420px" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg" style={{ minHeight: "420px" }}>
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                alt="New York financial district skyline at night"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,15,30,0.15) 0%, rgba(10,15,30,0.55) 55%, rgba(10,15,30,0.92) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute left-6 top-6 h-12 w-12 opacity-60" aria-hidden="true">
                <div className="absolute left-0 top-0 h-px w-8 bg-gold" />
                <div className="absolute left-0 top-0 h-8 w-px bg-gold" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <blockquote className="border-l-2 border-gold pl-5">
                  <p className="font-serif text-lg font-medium italic leading-relaxed text-white/95 sm:text-xl">
                    &ldquo;The best time to buy is when the thesis is unpopular.
                    We&rsquo;ve built a firm that can wait.&rdquo;
                  </p>
                </blockquote>
                <div className="mt-5 flex items-center gap-3 pl-5">
                  <span className="inline-block h-px w-5 bg-gold/60" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-white">James Harrington</p>
                    <p className="mt-0.5 text-xs tracking-wide text-white/50">Founder &amp; CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
