import Link from "next/link";

interface ContactCTAProps {
  heading?: string;
  subheading?: string;
}

export default function ContactCTA({
  heading = "Ready to invest with us?",
  subheading = "Our team is available to discuss your investment objectives and how Aurion can help you achieve them.",
}: ContactCTAProps) {
  return (
    <section
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#0a0f1e" }}
      aria-label="Contact call to action"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(201,168,76,0.15) 40%, rgba(201,168,76,0.15) 60%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Get in Touch
        </p>
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem]">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/55">
          {subheading}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-foreground shadow-[0_2px_12px_rgba(201,168,76,0.25)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] active:scale-[0.97]"
          >
            Contact Us
          </Link>
          <Link
            href="/our-firm/about"
            className="inline-flex items-center justify-center rounded-sm border border-white/20 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            Learn About Our Firm
          </Link>
        </div>
      </div>
    </section>
  );
}
