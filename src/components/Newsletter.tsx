"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Newsletter subscription"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-[#142d4a] to-[#0d1b2e]" />

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-[100px]" />
      </div>

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 px-6 py-20 sm:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Heading */}
          <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Stay Ahead of the Market
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg sm:mt-5">
            Subscribe to receive our latest investment insights, market analysis,
            and strategic perspectives.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10"
            aria-label="Newsletter signup"
          >
            {submitted ? (
              <motion.div
                className="flex items-center justify-center gap-3 rounded-xl bg-white/10 px-6 py-4 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium text-white sm:text-base">
                  Thank you for subscribing. We&rsquo;ll be in touch.
                </span>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 rounded-lg bg-white px-5 py-3.5 text-sm text-foreground placeholder:text-gray-400 outline-none ring-1 ring-transparent transition-shadow focus:ring-2 focus:ring-gold/50 sm:rounded-r-none sm:text-base"
                  aria-required="true"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98] sm:rounded-l-none sm:text-base"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </form>

          {/* Privacy note */}
          <p className="mt-5 text-xs leading-relaxed text-white/40 sm:text-sm">
            By subscribing, you agree to our{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2 transition-colors hover:text-white/60"
            >
              Privacy Policy
            </a>
            . We respect your privacy.
          </p>
        </motion.div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
