"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Rocket } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

/**
 * Homepage spotlight: AI investments + the Musk basket + explainer video.
 *
 * Positioned between Capabilities and Impact so the AI thesis lands after
 * investors have understood the firm's capabilities, but before the
 * impact / ESG narrative.
 */
export default function FeaturedAI() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fefbf3 0%, #f4f1ea 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "#c9a84c" }}>
            New · Aurion AI Strategy
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight" style={{ color: "var(--foreground)" }}>
            Capital aligned with the architects of artificial intelligence.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base" style={{ color: "var(--muted)" }}>
            Aurion now offers accredited investors structured access to Tesla, xAI, NVIDIA, OpenAI, Anthropic and the diversified Aurion AI Growth Fund.
          </p>
        </div>

        {/* Two-column: video + Musk feature */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <VideoPlayer
              src="https://www.youtube.com/embed/0KSOMA3QBU0"
              poster="/video-poster-ai.svg"
              title="What is Aurion Capital Group?"
              duration="3:48"
              eyebrow="Introduction"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link
              href="/invest/tesla-elon-musk"
              className="block relative overflow-hidden rounded-sm border group"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/elon-musk-action.svg"
                  alt="The Aurion Musk basket: Tesla, xAI, SpaceX exposure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,15,30,0) 50%, rgba(10,15,30,0.85) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[10px] uppercase tracking-[0.22em] px-2 py-1 mb-3" style={{ background: "#c9a84c", color: "#0a0f1e" }}>
                    Featured Basket
                  </span>
                  <p className="font-serif text-2xl font-bold text-white">The Musk Portfolio</p>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>Tesla · xAI · SpaceX · Neuralink — from $500</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold transition-all group-hover:gap-2" style={{ color: "#c9a84c" }}>
                    Open the basket <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* AI pillar strip */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "Frontier-Model Labs", body: "OpenAI · Anthropic · xAI secondaries at most recent round" },
            { icon: Sparkles, title: "AI Applications", body: "Microsoft · Alphabet · Meta · Palantir · ServiceNow" },
            { icon: Rocket, title: "Compute & Robotics", body: "NVIDIA · Tesla Optimus · Figure · Agility · CoreWeave" },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-sm border p-6"
                style={{ borderColor: "var(--border)", background: "var(--background)" }}
              >
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <Icon size={22} style={{ color: "#c9a84c" }} />
                </div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>{p.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{p.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/ai-investments"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm"
            style={{ background: "#c9a84c", color: "#0a0f1e" }}
          >
            Explore the AI Strategy <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
