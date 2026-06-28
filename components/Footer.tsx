// Architected and built by Classy.
"use client";

import React from "react";
import Link from "next/link";
import { siteLinks } from "@/lib/site-links";
import { MagneticText } from "@/components/ui/morphing-cursor";


const CAPABILITIES = [
  "Clinical Decision Support",
  "AI Diagnostic Engine",
  "Trajectory Analysis",
  "Prognosis Intelligence",
  "Patient Risk Scoring",
  "EMR Integration",
  "Clinical Audit Trail",
  "Real-time Monitoring",
  "Audrey Voice AI",
];

const NAV_LINKS = [
  { name: "Home", href: siteLinks.home },
  { name: "Services", href: siteLinks.services },
  { name: "About", href: siteLinks.about },
  { name: "Audrey", href: siteLinks.audrey },
  { name: "Insights", href: siteLinks.insights },
  { name: "Contact", href: siteLinks.contact },
];

const SOCIALS = [
  { name: "LinkedIn", href: "https://linkedin.com/company/sentra-ai" },
  { name: "GitHub", href: "https://github.com/sentraai" },
  { name: "X", href: "https://x.com/sentraai" },
  { name: "Instagram", href: "https://instagram.com/sentraai" },
];

export default function Footer() {
  return (
    <footer
      className="overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#1a1a1a",
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* ═══ Main Grid — 4 Columns ═══ */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-[300px_280px_180px_1fr] gap-10 lg:gap-8 pt-16 pb-48"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* Col 1: Magnetic Text + Company Info */}
          <div className="flex items-baseline gap-4 lg:col-span-4 mb-4">
            <MagneticText text="SENTRA" hoverText="ARTIFICIAL INTELLIGENCE" />
            <Link
              href="https://melinda.co.id/"
              target="_blank"
              className="text-5xl font-bold tracking-tighter tracking-wide transition-colors whitespace-nowrap"
              style={{ color: "#1a1a1a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#eb5939")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
            >
              PART OF RSIA MELINDA DHAI
            </Link>
          </div>

          {/* Col 1 row 2: Company Info */}
          <div className="flex flex-col gap-4 lg:border-r lg:pr-8" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            <p className="text-[20px] leading-relaxed" style={{ color: "#555" }}>
              Sentra Healthcare Solutions
              <br />
              Kediri, Jawa Timur, Indonesia
            </p>
          </div>

          {/* Col 2: Capabilities */}
          <div className="flex flex-col gap-2 lg:border-r lg:pr-8" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            {CAPABILITIES.map((cap) => (
              <Link
                key={cap}
                href={siteLinks.services}
                className="text-[20px] transition-colors"
                style={{ color: "#1a1a1a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#eb5939")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
              >
                {cap}
              </Link>
            ))}
          </div>

          {/* Col 3: Navigation */}
          <div className="flex flex-col gap-2 lg:border-r lg:pr-8" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[20px] transition-colors"
                style={{ color: "#1a1a1a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#eb5939")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Col 4: empty */}
          <div />
        </div>

        {/* ═══ Bottom Bar ═══ */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* Left: Copyright + Policies */}
          <div className="flex flex-wrap items-center gap-1.5 text-[20px]" style={{ color: "#999" }}>
            <span>&copy; Sentra 2026. All rights reserved</span>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:underline transition-colors" style={{ color: "#999" }}>Privacy Policy</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:underline transition-colors" style={{ color: "#999" }}>Terms of Service</Link>
          </div>

          {/* Right: Social links */}
          <div className="flex flex-wrap items-center gap-1.5 text-[20px]">
            {SOCIALS.map((social, i) => (
              <React.Fragment key={social.name}>
                {i > 0 && <span style={{ color: "#ccc" }}>&middot;</span>}
                <Link
                  href={social.href}
                  target="_blank"
                  className="transition-colors"
                  style={{ color: "#666" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#eb5939")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >
                  {social.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Giant Brand Name ═══ */}
      <div
        className="relative select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="block text-[20vw] font-black leading-[1] tracking-[-0.04em] uppercase text-center pb-4"
          style={{
            color: "#1a1a1a",
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          sentra
        </span>
      </div>
    </footer>
  );
}
