"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type Category =
  | "All"
  | "Real Estate"
  | "Infrastructure"
  | "Private Credit"
  | "Multi-Asset"
  | "ESG";

const CATEGORIES: Category[] = [
  "All",
  "Real Estate",
  "Infrastructure",
  "Private Credit",
  "Multi-Asset",
  "ESG",
];

interface Article {
  category: Exclude<Category, "All">;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

const ARTICLES: Article[] = [
  {
    category: "Real Estate",
    title: "The Case for European Logistics After the E-Commerce Pullback",
    excerpt:
      "The post-pandemic correction in e-commerce growth has created a mis-pricing in logistics real estate that we believe is temporary. Here's why we're adding, not reducing.",
    author: "Aurion Research",
    date: "March 2025",
    readTime: "8 min read",
  },
  {
    category: "Private Credit",
    title:
      "Why Middle-Market Direct Lending Is Structurally More Attractive Than Leveraged Loans",
    excerpt:
      "The syndicated loan market is efficient. The middle-market direct lending market is not. That inefficiency is the opportunity — and it's unlikely to arbitrage away quickly.",
    author: "Priya Kapoor",
    date: "February 2025",
    readTime: "6 min read",
  },
  {
    category: "Infrastructure",
    title: "The Data Center Boom: Infrastructure or Technology?",
    excerpt:
      "Hyperscale data centers are increasingly being underwritten as infrastructure. We agree — with caveats. The technology stack changes faster than the concession life suggests.",
    author: "Sarah Chen",
    date: "February 2025",
    readTime: "10 min read",
  },
  {
    category: "ESG",
    title: "Net Zero by 2050: What It Actually Requires of an Asset Manager",
    excerpt:
      "The commitments are easy to make. The operational changes required to meet them are not. We walk through what net-zero really means for an alternatives portfolio.",
    author: "Aurion ESG Team",
    date: "January 2025",
    readTime: "12 min read",
  },
  {
    category: "Multi-Asset",
    title: "The 60/40 Portfolio Is Not Dead. It's Just More Expensive.",
    excerpt:
      "The correlation between equities and bonds that made 60/40 work for thirty years is not permanent. But abandoning the framework entirely is also not the answer.",
    author: "Aurion Research",
    date: "January 2025",
    readTime: "7 min read",
  },
  {
    category: "Real Estate",
    title: "Office Real Estate: What the Recovery Actually Looks Like",
    excerpt:
      "Demand is recovering — but not uniformly. Grade A space in CBDs is performing well. Everything else is under permanent structural pressure. The divergence is the story.",
    author: "Michael Torres",
    date: "December 2024",
    readTime: "9 min read",
  },
  {
    category: "Private Credit",
    title: "Default Cycles and Recovery Rates: What History Actually Shows",
    excerpt:
      "Default rates are rising. That's not surprising. What matters is recovery — and recovery rates in direct lending have historically outperformed syndicated loan recoveries significantly.",
    author: "Priya Kapoor",
    date: "December 2024",
    readTime: "11 min read",
  },
  {
    category: "Infrastructure",
    title: "Offshore Wind: The Economics After the Subsidies",
    excerpt:
      "The cost of offshore wind has fallen 70% in fifteen years. At current economics, offshore wind is competitive with gas peakers without subsidy in most European markets. What that means for investors.",
    author: "Wei Zhang",
    date: "November 2024",
    readTime: "8 min read",
  },
];

/* -------------------------------------------------------------------------- */
/*  Article Card                                                               */
/* -------------------------------------------------------------------------- */

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
        {article.category}
      </p>
      <h2 className="font-serif text-lg font-bold text-foreground leading-snug hover:text-accent transition-colors cursor-pointer">
        {article.title}
      </h2>
      <p className="text-sm text-muted leading-relaxed mt-2">{article.excerpt}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs font-medium text-foreground/70">{article.author}</span>
        <span className="text-muted" aria-hidden="true">&middot;</span>
        <span className="text-xs text-muted">{article.date}</span>
        <span className="text-muted" aria-hidden="true">&middot;</span>
        <span className="text-xs text-muted">{article.readTime}</span>
      </div>
      <div className="mt-6 border-b border-border" aria-hidden="true" />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Newsletter Band                                                            */
/* -------------------------------------------------------------------------- */

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section
      className="bg-surface border-t border-border py-16"
      aria-label="Newsletter subscription"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Stay Informed
        </h2>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Subscribe to receive our latest research and market perspectives
          directly.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm font-medium text-accent">
            Thank you for subscribing. We'll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            aria-label="Newsletter sign-up"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="rounded-lg bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/30 w-full sm:w-80 text-foreground placeholder:text-muted/60 transition-all"
            />
            <button
              type="submit"
              className="bg-gold text-foreground px-6 py-3 text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Insights"
          heading="Perspectives on Alternatives"
          subheading="Research, analysis, and commentary from Aurion's investment teams across real estate, infrastructure, credit, and multi-asset."
        />

        {/* Article section */}
        <section className="bg-background py-16 px-6">
          <div className="mx-auto max-w-7xl">
            {/* Category filter tabs */}
            <div
              className="mb-12 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
              role="tablist"
              aria-label="Filter articles by category"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      "rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                      isActive
                        ? "bg-foreground text-white"
                        : "border border-border text-muted hover:text-foreground",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Article grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard key={article.title} article={article} />
              ))}
            </div>
          </div>
        </section>

        <NewsletterBand />
      </main>
      <Footer />
    </>
  );
}
