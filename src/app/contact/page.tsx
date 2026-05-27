"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type EnquiryType =
  | ""
  | "General Enquiry"
  | "Investor Relations"
  | "Media Enquiry"
  | "Partnership"
  | "Careers";

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  enquiryType: EnquiryType;
  message: string;
}

/* -------------------------------------------------------------------------- */
/*  Shared input class                                                         */
/* -------------------------------------------------------------------------- */

const inputClass =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-all focus:border-gold/40 focus:ring-2 focus:ring-gold/10";

/* -------------------------------------------------------------------------- */
/*  Office data                                                                */
/* -------------------------------------------------------------------------- */

interface Office {
  name: string;
  lines: string[];
  phone?: string;
  email?: string;
}

const OFFICES: Office[] = [
  {
    name: "New York (Headquarters)",
    lines: [
      "200 Park Avenue, 42nd Floor",
      "New York, NY 10166",
      "United States",
    ],
    phone: "+1 (212) 555-0100",
    email: "newyork@aurioncapital.com",
  },
  {
    name: "London",
    lines: ["30 St Mary Axe, 15th Floor", "London EC3A 8BF", "United Kingdom"],
    phone: "+44 (20) 7946-0100",
  },
  {
    name: "Dubai",
    lines: [
      "DIFC Gate Building, Level 8",
      "P.O. Box 506578",
      "Dubai, United Arab Emirates",
    ],
  },
  {
    name: "Singapore",
    lines: [
      "One Raffles Quay, North Tower",
      "Level 25",
      "Singapore 048583",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact Form                                                               */
/* -------------------------------------------------------------------------- */

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    enquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-start gap-4 py-12"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle
          className="text-gold"
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="font-serif text-xl font-bold text-foreground">
          Thank you. We'll be in touch within two business days.
        </p>
        <p className="text-sm text-muted">
          A member of our team will review your message and respond shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* First + Last name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-medium text-foreground/70 mb-1.5"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="Jane"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-medium text-foreground/70 mb-1.5"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Smith"
              className={inputClass}
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-medium text-foreground/70 mb-1.5"
          >
            Company / Institution
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Acme Pension Fund"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-foreground/70 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane.smith@example.com"
            className={inputClass}
          />
        </div>

        {/* Enquiry type */}
        <div>
          <label
            htmlFor="enquiryType"
            className="block text-xs font-medium text-foreground/70 mb-1.5"
          >
            Enquiry Type
          </label>
          <select
            id="enquiryType"
            required
            value={form.enquiryType}
            onChange={(e) => update("enquiryType", e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select an enquiry type
            </option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Investor Relations">Investor Relations</option>
            <option value="Media Enquiry">Media Enquiry</option>
            <option value="Partnership">Partnership</option>
            <option value="Careers">Careers</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-medium text-foreground/70 mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us how we can help..."
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-gold text-foreground py-4 text-sm font-semibold uppercase tracking-[0.08em] rounded-sm hover:bg-gold-light transition-colors"
          >
            Submit
          </button>
          <p className="text-xs text-muted mt-3">
            By submitting this form, you agree to our Privacy Policy. We will
            never share your information with third parties.
          </p>
        </div>
      </form>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Office Locations                                                           */
/* -------------------------------------------------------------------------- */

function OfficeLocations() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
        Our Offices
      </h2>

      <ul className="space-y-8" role="list">
        {OFFICES.map((office) => (
          <li key={office.name}>
            <p className="text-sm font-semibold text-foreground">{office.name}</p>
            <div
              className="w-8 h-px mt-1 mb-3"
              style={{ background: "rgba(201,168,76,0.4)" }}
              aria-hidden="true"
            />
            <address className="not-italic text-sm text-muted leading-relaxed">
              {office.lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < office.lines.length - 1 && <br />}
                </span>
              ))}
              {office.phone && (
                <>
                  <br />
                  <a
                    href={`tel:${office.phone.replace(/\s|\(|\)|-/g, "")}`}
                    className="hover:text-foreground transition-colors"
                  >
                    Tel: {office.phone}
                  </a>
                </>
              )}
              {office.email && (
                <>
                  <br />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-accent hover:text-gold transition-colors"
                  >
                    {office.email}
                  </a>
                </>
              )}
            </address>
          </li>
        ))}
      </ul>

      {/* Enquiry contacts */}
      <div className="mt-10 space-y-2">
        <p className="text-sm text-muted">
          For investor relations enquiries:{" "}
          <a
            href="mailto:ir@aurioncapital.com"
            className="text-accent hover:text-gold transition-colors"
          >
            ir@aurioncapital.com
          </a>
        </p>
        <p className="text-sm text-muted">
          For media enquiries:{" "}
          <a
            href="mailto:press@aurioncapital.com"
            className="text-accent hover:text-gold transition-colors"
          >
            press@aurioncapital.com
          </a>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          eyebrow="Contact"
          heading="Let's Talk"
          subheading="Whether you're an institutional investor, a prospective partner, or a media professional — we want to hear from you."
        />

        {/* Main split section */}
        <section className="bg-background py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-20 lg:grid-cols-[1.4fr_1fr]">
              {/* Left: form */}
              <div>
                <ContactForm />
              </div>

              {/* Right: offices */}
              <div>
                <OfficeLocations />
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory notice */}
        <section
          className="bg-surface border-t border-border py-12 px-6"
          aria-label="Regulatory disclaimer"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs text-muted leading-relaxed">
              This website is for informational purposes only and does not
              constitute an offer to sell or solicitation of an offer to buy any
              securities. Past performance is not indicative of future results.
              All investments involve risk, including possible loss of principal.
              Investment advisory services are offered through Aurion Capital
              Group LLC, a registered investment adviser. Registration does not
              imply a certain level of skill or training.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
