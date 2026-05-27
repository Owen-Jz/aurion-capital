import { Mail, MapPin, Phone } from "lucide-react";

const firmLinks = [
  { label: "About Us", href: "/our-firm/about" },
  { label: "Leadership", href: "/our-firm/leadership" },
  { label: "Our Process", href: "/our-firm/process" },
  { label: "Track Record", href: "/our-firm/track-record" },
  { label: "Careers", href: "/careers" },
];

const capabilityLinks = [
  { label: "Real Estate", href: "/capabilities/real-estate" },
  { label: "Infrastructure", href: "/capabilities/infrastructure" },
  { label: "Private Credit", href: "/capabilities/private-credit" },
  { label: "Insurance Solutions", href: "/capabilities/insurance-solutions" },
  { label: "Multi-Asset", href: "/capabilities/multi-asset" },
];

const connectLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Client Portal", href: "/login" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Media Inquiries", href: "/contact" },
  { label: "Offices", href: "/our-firm/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclosures", href: "/disclosures" },
  { label: "Cookie Policy", href: "/privacy" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1e]" role="contentinfo">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-3 group" aria-label="Aurion Capital Group home">
              <svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="512" height="512" rx="96" fill="#0d1117"/>
                <rect width="512" height="512" rx="96" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="3"/>
                <polygon points="256,74 70,446 118,446" fill="#f0ece2"/>
                <polygon points="256,74 442,446 394,446" fill="#f0ece2"/>
                <rect x="46" y="434" width="96" height="14" rx="5" fill="#f0ece2"/>
                <rect x="370" y="434" width="96" height="14" rx="5" fill="#f0ece2"/>
                <rect x="154" y="261" width="204" height="28" rx="7" fill="#c9a84c"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold tracking-[0.12em] text-white group-hover:text-gold transition-colors duration-300">
                  AURION
                </span>
                <span className="font-serif text-[10px] font-light tracking-[0.22em] uppercase text-white/50 mt-0.5">
                  Capital Group
                </span>
              </div>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              A premier global alternative asset manager creating long-term
              value through disciplined investing across real estate,
              infrastructure, credit, and multi-asset solutions.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-200 hover:border-gold/40 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-200 hover:border-gold/40 hover:text-white"
                aria-label="X (formerly Twitter)"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:info@aurioncapital.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-200 hover:border-gold/40 hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

            {/* Contact info */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm text-gray-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-600" />
                <span>200 Park Avenue, 42nd Floor<br />New York, NY 10166</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <Phone className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                <a
                  href="tel:+12125550100"
                  className="transition-colors duration-200 hover:text-gray-300"
                >
                  +1 (212) 555-0100
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkColumn title="Our Firm" links={firmLinks} />
          <FooterLinkColumn title="Capabilities" links={capabilityLinks} />
          <FooterLinkColumn title="Connect" links={connectLinks} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              &copy; 2025 Aurion Capital Group. All rights reserved.
            </p>

            {/* Legal links */}
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center justify-center gap-x-1 text-sm text-gray-500" role="list">
                {legalLinks.map((link, index) => (
                  <li key={link.label} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-2 text-gray-700" aria-hidden="true">|</span>
                    )}
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-gray-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal disclaimer */}
          <p className="mt-6 text-xs leading-relaxed text-gray-600">
            This website is for informational purposes only and does not
            constitute an offer to sell or solicitation of an offer to buy any
            securities. Past performance is not indicative of future results. All
            investments involve risk, including possible loss of principal.
            Investment advisory services are offered through Aurion Capital Group
            LLC, a registered investment adviser. Registration does not imply a
            certain level of skill or training.
          </p>
        </div>
      </div>
    </footer>
  );
}
