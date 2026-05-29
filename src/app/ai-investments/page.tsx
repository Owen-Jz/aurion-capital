"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Rocket,
  Brain,
  Bot,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";

const aiCompanies = [
  {
    slug: "tesla-elon-musk",
    name: "Tesla / xAI / SpaceX Basket",
    figurehead: "Elon Musk",
    sector: "AI · Mobility · Orbital",
    target: "47% trailing 12-month",
    min: 500,
    description:
      "Integrated exposure to the world's most influential AI-led industrial portfolio: Tesla, xAI, SpaceX secondaries and Optimus robotics.",
    tags: ["xAI", "Optimus", "Starlink", "Dojo"],
  },
  {
    slug: "nvidia",
    name: "NVIDIA Corporation",
    figurehead: "Jensen Huang",
    sector: "AI Infrastructure",
    target: "78% trailing 12-month",
    min: 1000,
    description:
      "The compute backbone of the AI era. CUDA, H100/H200/Blackwell GPUs, Networking and the AI Enterprise stack.",
    tags: ["GPU", "CUDA", "CoreWeave", "Frontier Labs"],
  },
  {
    slug: "aurion-ai-growth-fund",
    name: "Aurion AI Growth Fund",
    figurehead: "Dr. Priyanka Ravi",
    sector: "Diversified AI",
    target: "+61% since inception",
    min: 1000,
    description:
      "Discretionary basket spanning frontier-model labs (OpenAI, Anthropic, xAI), compute (NVDA, AMD, TSMC), applications and robotics.",
    tags: ["OpenAI", "Anthropic", "Robotics", "Multi-Asset"],
  },
  {
    slug: "microsoft",
    name: "Microsoft Corporation",
    figurehead: "Satya Nadella",
    sector: "Cloud + Enterprise AI",
    target: "31% trailing 12-month",
    min: 1000,
    description:
      "Azure hyperscaler, OpenAI commercial partnership, Copilot distribution embedded across Office, GitHub and the developer stack.",
    tags: ["Azure", "OpenAI", "Copilot", "GitHub"],
  },
  {
    slug: "alphabet",
    name: "Alphabet (Google)",
    figurehead: "Sundar Pichai",
    sector: "AI + Cloud + Autonomy",
    target: "27% trailing 12-month",
    min: 1000,
    description:
      "Gemini foundation models, Google Cloud AI workloads, DeepMind research, and Waymo autonomous mobility leadership.",
    tags: ["Gemini", "Waymo", "DeepMind", "TPU"],
  },
  {
    slug: "meta",
    name: "Meta Platforms",
    figurehead: "Mark Zuckerberg",
    sector: "Social + Open AI",
    target: "52% trailing 12-month",
    min: 1000,
    description:
      "Operator of Llama, the world's most-downloaded open foundation-model family. AI ad-ranking driving accelerating monetisation.",
    tags: ["Llama", "Reality Labs", "Ad Ranking"],
  },
];

const aiPillars = [
  {
    icon: Cpu,
    title: "Foundation Compute",
    body: "GPUs, custom silicon, and the AI cloud infrastructure that powers every frontier model.",
    weight: "38%",
  },
  {
    icon: Brain,
    title: "Frontier-Model Labs",
    body: "Secondary positions in OpenAI, Anthropic, xAI and Mistral at most recent round valuations.",
    weight: "26%",
  },
  {
    icon: Sparkles,
    title: "AI Applications",
    body: "Public-market leaders monetising AI features at scale across enterprise software.",
    weight: "18%",
  },
  {
    icon: Bot,
    title: "Robotics & Embodied AI",
    body: "Tesla Optimus exposure plus humanoid robotics platforms Figure and Agility.",
    weight: "12%",
  },
  {
    icon: Rocket,
    title: "AI Cloud Infrastructure",
    body: "Specialist GPU clouds: CoreWeave, Together AI, Lambda Labs.",
    weight: "6%",
  },
];

export default function AIInvestmentsPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ───────────────────────────── Hero ───────────────────────────── */}
        <section
          className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #1a2a4a 60%, #0d1117 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="max-w-7xl mx-auto relative grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] mb-4" style={{ color: "#c9a84c" }}>
                Aurion · AI Strategy
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white">
                Capital aligned with the{" "}
                <span style={{
                  background: "linear-gradient(90deg, #c9a84c, #e4c76b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  defining technology
                </span>{" "}
                of the century.
              </h1>
              <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.7)" }}>
                The Aurion AI Strategy gives accredited investors structured exposure to the companies, founders and infrastructure shaping artificial intelligence — from Elon Musk&apos;s xAI and Tesla, to NVIDIA&apos;s compute monopoly, to the frontier labs reshaping global productivity.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/invest"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm"
                  style={{ background: "#c9a84c", color: "#0a0f1e" }}
                >
                  Browse AI Offerings <ArrowRight size={16} />
                </Link>
                <Link
                  href="#video"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm border"
                  style={{ borderColor: "rgba(201,168,76,0.5)", color: "#c9a84c" }}
                >
                  Watch the Explainer
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-sm overflow-hidden border" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
                <Image
                  src="/elon-musk-action.svg"
                  alt="Editorial reference: Tesla, xAI and SpaceX portfolio under the leadership of Elon Musk"
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Featured strategy — exposure to the Musk-led industrial portfolio: Tesla, xAI, SpaceX, Neuralink and The Boring Company. Editorial reference image; not a likeness in any official capacity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───────────────────────────── KPI band ───────────────────────────── */}
        <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: "$2.4T", label: "Combined AI Market Cap Tracked", sub: "Public + private" },
              { stat: "+61%", label: "Aurion AI Fund Return", sub: "Since Jan 2024" },
              { stat: "32", label: "Underlying Holdings", sub: "Active management" },
              { stat: "$500", label: "Minimum Entry", sub: "Tesla starter tier" },
            ].map((k) => (
              <div key={k.label}>
                <p className="font-serif text-3xl font-bold" style={{ color: "#c9a84c" }}>{k.stat}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: "var(--foreground)" }}>{k.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{k.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────── Video section ───────────────────────────── */}
        <section id="video" className="py-24 px-6" style={{ background: "var(--background)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "#c9a84c" }}>Watch</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
                Understand the strategy in four minutes.
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-sm" style={{ color: "var(--muted)" }}>
                Three short films walk you through Aurion&apos;s AI investment philosophy, our portfolio construction, and how to onboard as an accredited investor.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <VideoPlayer
                src="https://www.youtube.com/embed/0KSOMA3QBU0"
                poster="/video-poster-ai.svg"
                title="The Aurion AI Strategy"
                duration="4:12"
                eyebrow="Strategy"
              />
              <VideoPlayer
                src="https://www.youtube.com/embed/Ueg_xoMaPVo"
                poster="/elon-musk-action.svg"
                title="Why we built the Musk Basket"
                duration="3:45"
                eyebrow="Featured"
              />
              <VideoPlayer
                src="https://www.youtube.com/embed/9bZkp7q19f0"
                poster="/ai-datacenter.svg"
                title="How accredited investors onboard"
                duration="2:18"
                eyebrow="Onboarding"
              />
            </div>
          </div>
        </section>

        {/* ───────────────────────────── Portfolio pillars ───────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "var(--surface)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
              <div>
                <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "#c9a84c" }}>How the Strategy is Built</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 leading-tight" style={{ color: "var(--foreground)" }}>
                  Five pillars across the AI value chain.
                </h2>
                <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  Aurion&apos;s AI exposure is constructed across the full value chain, from foundational compute up through the application layer and into embodied robotics. The result is diversified participation in the AI capex cycle without concentrated dependence on any single name.
                </p>
                <div className="mt-8 rounded-sm border p-5" style={{ borderColor: "rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.04)" }}>
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} style={{ color: "#c9a84c", marginTop: 2 }} />
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                      Quarterly rebalanced by the Aurion AI Investment Committee, chaired by senior leadership from Sequoia AI Practice and a16z American Dynamism.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {aiPillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="flex items-center gap-5 rounded-sm border p-5"
                      style={{ borderColor: "var(--border)", background: "var(--background)" }}
                    >
                      <div className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0" style={{ background: "rgba(201,168,76,0.1)" }}>
                        <Icon size={22} style={{ color: "#c9a84c" }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold" style={{ color: "var(--foreground)" }}>{p.title}</p>
                          <span className="text-sm font-bold" style={{ color: "#c9a84c" }}>{p.weight}</span>
                        </div>
                        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{p.body}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── Featured offerings ───────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "var(--background)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "#c9a84c" }}>Available Offerings</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
                  AI &amp; growth allocations.
                </h2>
              </div>
              <Link href="/invest" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
                View all listings <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCompanies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/invest/${c.slug}`}
                  className="group rounded-sm border p-6 transition-all hover:shadow-lg"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "#c9a84c" }}>{c.sector}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                      Active
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{c.name}</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Led by {c.figurehead}</p>
                  <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>{c.description}</p>

                  <div className="mt-4 pt-4 border-t flex justify-between items-end" style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Performance</p>
                      <p className="text-sm font-bold" style={{ color: "#22c55e" }}>{c.target}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Min. entry</p>
                      <p className="text-sm font-bold" style={{ color: "#c9a84c" }}>${c.min.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--border)", color: "var(--muted)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold transition-colors group-hover:gap-2" style={{ color: "var(--accent)" }}>
                    View opportunity <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────────── Featured: Musk portfolio ───────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0d1322 100%)" }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div className="relative">
              <Image
                src="/elon-musk-portrait.svg"
                alt="Reference portrait: the Aurion Musk-led basket figurehead Elon Musk"
                width={400}
                height={500}
                className="w-full h-auto rounded-sm border"
                style={{ borderColor: "rgba(201,168,76,0.2)" }}
              />
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-sm" style={{ background: "#c9a84c", color: "#0a0f1e" }}>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Featured Basket</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "#c9a84c" }}>
                Spotlight · The Musk Portfolio
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 leading-tight text-white">
                The most ambitious industrial AI portfolio of the era.
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Tesla. xAI. SpaceX. Neuralink. The Boring Company. Five companies — one founder — and a network of operational and capital synergies that no public-market index reflects. Aurion offers structured exposure to this basket with a retail-accessible <strong className="text-white">$500</strong> starting tier and a <strong className="text-white">$1,000</strong> standard tier.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { icon: TrendingUp, label: "Trailing 12-month basket return", value: "+47%" },
                  { icon: Brain, label: "xAI last secondary valuation", value: "$80B" },
                  { icon: Bot, label: "Tesla Optimus production ramp", value: "Bot V3 · 2026" },
                  { icon: Rocket, label: "SpaceX Starlink ARR", value: ">$10B" },
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label} className="flex items-center gap-4 py-2 border-b" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                      <Icon size={16} style={{ color: "#c9a84c" }} />
                      <span className="text-sm flex-1" style={{ color: "rgba(255,255,255,0.75)" }}>{row.label}</span>
                      <span className="text-sm font-bold text-white">{row.value}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/invest/tesla-elon-musk"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm"
                style={{ background: "#c9a84c", color: "#0a0f1e" }}
              >
                Open the Tesla Basket <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── CTA ───────────────────────────── */}
        <section className="py-24 px-6" style={{ background: "var(--surface)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "#c9a84c" }}>Get Started</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
              Begin your accreditation today.
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Approval typically takes 1–3 business days. Once your file is reviewed, your investor portal is unlocked and you may subscribe to any active AI offering.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm" style={{ background: "#c9a84c", color: "#0a0f1e" }}>
                Open Account <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                Speak with Aurion
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
