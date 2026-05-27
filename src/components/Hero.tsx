"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Floating geometric shapes — subtle golden accents in the backdrop  */
/* ------------------------------------------------------------------ */

interface FloatingShapeProps {
  /** CSS width/height */
  size: number;
  /** Starting x position as viewport percentage */
  x: string;
  /** Starting y position as viewport percentage */
  y: string;
  /** Animation duration in seconds */
  duration: number;
  /** Delay before animation starts */
  delay?: number;
  /** Shape variant */
  variant: "circle" | "ring" | "line" | "diamond" | "cross";
}

function FloatingShape({
  size,
  x,
  y,
  duration,
  delay = 0,
  variant,
}: FloatingShapeProps) {
  const sharedMotion = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.15, 0.08, 0.15, 0],
      y: [0, -30, -15, -40, 0],
      x: [0, 10, -8, 5, 0],
      rotate: variant === "diamond" ? [0, 90, 180, 270, 360] : [0, 5, -5, 3, 0],
    },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const position: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
  };

  switch (variant) {
    case "circle":
      return (
        <motion.div
          {...sharedMotion}
          style={{
            ...position,
            width: size,
            height: size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0) 70%)",
          }}
        />
      );

    case "ring":
      return (
        <motion.div
          {...sharedMotion}
          style={{
            ...position,
            width: size,
            height: size,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.2)",
            background: "transparent",
          }}
        />
      );

    case "line":
      return (
        <motion.div
          {...sharedMotion}
          style={{
            ...position,
            width: size * 2.5,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 50%, transparent 100%)",
          }}
        />
      );

    case "diamond":
      return (
        <motion.div
          {...sharedMotion}
          style={{
            ...position,
            width: size * 0.6,
            height: size * 0.6,
            border: "1px solid rgba(201,168,76,0.15)",
            background: "transparent",
            transform: "rotate(45deg)",
          }}
        />
      );

    case "cross":
      return (
        <motion.div
          {...sharedMotion}
          style={{
            ...position,
            width: size * 0.8,
            height: size * 0.8,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)",
            }}
          />
        </motion.div>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Static shape data — defined outside the component to avoid        */
/*  recreating on every render.                                       */
/* ------------------------------------------------------------------ */

const floatingShapes: FloatingShapeProps[] = [
  { size: 120, x: "10%", y: "15%", duration: 20, delay: 0, variant: "ring" },
  { size: 80, x: "75%", y: "20%", duration: 25, delay: 2, variant: "circle" },
  { size: 60, x: "85%", y: "60%", duration: 18, delay: 4, variant: "diamond" },
  { size: 100, x: "5%", y: "70%", duration: 22, delay: 1, variant: "line" },
  { size: 90, x: "50%", y: "80%", duration: 24, delay: 3, variant: "ring" },
  { size: 40, x: "30%", y: "10%", duration: 19, delay: 5, variant: "cross" },
  { size: 70, x: "65%", y: "45%", duration: 21, delay: 2.5, variant: "line" },
  { size: 50, x: "20%", y: "50%", duration: 23, delay: 6, variant: "circle" },
  { size: 110, x: "90%", y: "35%", duration: 26, delay: 1.5, variant: "diamond" },
  { size: 55, x: "45%", y: "25%", duration: 17, delay: 3.5, variant: "cross" },
];

/* ------------------------------------------------------------------ */
/*  Stagger animation orchestration                                   */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Hero Component                                                    */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax: content drifts upward as user scrolls */
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      aria-label="Hero"
    >
      {/* ---- Background layers ---- */}

      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0a0f1e 0%, #1a2a4a 40%, #0d1117 100%)",
        }}
      />

      {/* Radial depth overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(26,58,92,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Secondary vignette for depth at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(10,15,30,0.8) 0%, transparent 50%)",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal accent line — very subtle horizon */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "62%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.08) 30%, rgba(201,168,76,0.12) 50%, rgba(201,168,76,0.08) 70%, transparent 95%)",
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {floatingShapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </div>

      {/* ---- Content ---- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={childVariants}
            className="uppercase tracking-[0.35em] text-gold/70 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          >
            Aurion Capital Group
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={childVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6 sm:mb-8"
          >
            Pioneering the{" "}
            <span className="gradient-text">Future</span>
            <br className="hidden sm:block" />{" "}
            of Alternative Investment
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            variants={childVariants}
            className="flex items-center gap-3 mb-6 sm:mb-8"
          >
            <span className="block w-8 sm:w-12 h-px bg-gold/30" />
            <span className="block w-1.5 h-1.5 rotate-45 border border-gold/40" />
            <span className="block w-8 sm:w-12 h-px bg-gold/30" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 sm:mb-14 font-light"
          >
            We take a disciplined, research-driven approach to investing
            &mdash; creating enduring value and delivering consistent,
            risk-adjusted returns across every market cycle.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={buttonContainerVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
          >
            {/* Primary CTA */}
            <motion.a
              variants={buttonVariants}
              href="/strategy"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-sm text-sm sm:text-base font-semibold tracking-wide overflow-hidden transition-colors duration-300"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0a0f1e",
              }}
            >
              {/* Hover shimmer overlay */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
              <span className="relative">Explore Our Strategy</span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              variants={buttonVariants}
              href="/login"
              whileHover={{
                scale: 1.04,
                y: -2,
                backgroundColor: "rgba(201,168,76,0.12)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-sm text-sm sm:text-base font-semibold tracking-wide border transition-all duration-300"
              style={{
                borderColor: "rgba(201,168,76,0.5)",
                color: "#c9a84c",
                backgroundColor: "transparent",
              }}
            >
              Client Portal
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-5 h-5 text-gold/40" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
