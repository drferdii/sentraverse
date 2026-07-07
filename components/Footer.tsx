// Architected and built by Classy.
'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Reveal } from '@/components/ui/reveal'
import { siteLinks } from '@/lib/site-links'

// Intentional brand anomaly (approved 2026-07-07): acid-yellow plate footer,
// replacing the former white footer. Hardcoded — identical in light & dark.
const INK = '#111111'
const PLATE = '#e9fb5b'

const CONTACT_LINES = [
  {
    label: 'Email',
    value: 'drferdiiskandar@melinda.co.id',
    href: 'mailto:drferdiiskandar@melinda.co.id',
  },
  { label: 'Instagram', value: '@sentraai', href: 'https://instagram.com/sentraai' },
  { label: 'LinkedIn', value: 'sentra-ai', href: 'https://linkedin.com/company/sentra-ai' },
  {
    label: 'Alamat',
    value: 'Laboratorium Technology RSIA Melinda DHAI, Kediri, Jawa Timur',
  },
]

/** Blocky geometric "S" monogram, echoing the plate's constructivist language. */
function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill={INK}>
      <rect x="0" y="0" width="100" height="17" />
      <rect x="0" y="21" width="17" height="20" />
      <rect x="0" y="41" width="100" height="17" />
      <rect x="83" y="58" width="17" height="21" />
      <rect x="0" y="83" width="100" height="17" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')

  const waitingListHref = `mailto:drferdiiskandar@melinda.co.id?subject=${encodeURIComponent(
    'Join Waiting List — Sentra Test Pilot'
  )}${email.trim() ? `&body=${encodeURIComponent(`Email: ${email.trim()}`)}` : ''}`

  return (
    <footer
      id="contact"
      className="overflow-hidden"
      style={{
        background: PLATE,
        color: INK,
        fontFamily:
          'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      {/* ═══ Giant Brand Name — full width, top of plate ═══ */}
      <Reveal y={40}>
        <span
          className="block px-2 pt-2 text-center text-[30.5vw] font-black leading-[0.8] tracking-[-0.06em] select-none"
          aria-hidden="true"
        >
          Sentra
        </span>
      </Reveal>
      <span className="sr-only">Sentra Healthcare Solutions</span>

      {/* ═══ Plate body: vast breathing room, then monogram + info column ═══ */}
      <div className="px-6 md:px-12 mt-24 md:mt-[13vw]">
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-[1fr_460px] lg:items-end">
          {/* Monogram — bottom-left, like a printer's mark */}
          <Monogram className="w-40 md:w-64 lg:w-80 lg:mb-2" />

          {/* Info column */}
          <div className="flex min-w-0 w-full flex-col gap-10 max-w-[460px]">
            {/* Contact */}
            <div className="border-t pt-4" style={{ borderColor: INK }}>
              <ul className="flex flex-col gap-0.5 text-[15px] font-semibold leading-relaxed">
                {CONTACT_LINES.map((line) => (
                  <li key={line.label}>
                    {line.label}:{' '}
                    {line.href ? (
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {line.value}
                      </a>
                    ) : (
                      line.value
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Waiting list */}
            <div>
              <p className="text-[15px] font-semibold mb-3">
                Gabung waiting list Test Pilot Season:
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat Email"
                  aria-label="Alamat email untuk waiting list"
                  className="min-w-0 flex-1 border bg-transparent px-3 py-2.5 text-[15px] font-semibold placeholder:opacity-60"
                  style={{ borderColor: INK, color: INK }}
                />
                <a
                  href={waitingListHref}
                  className="shrink-0 border px-4 py-2.5 text-[15px] font-semibold whitespace-nowrap transition-colors hover:bg-[#111111] hover:text-[#e9fb5b]"
                  style={{ borderColor: INK }}
                >
                  Join Waiting List
                </a>
              </div>
            </div>

            {/* Stewardship statement */}
            <div className="border-t pt-4" style={{ borderColor: INK }}>
              <p className="text-[15px] font-semibold leading-relaxed">
                Sentra dibangun di lingkungan klinis RSIA Melinda DHAI, Kediri, dengan satu prinsip
                yang tidak bisa ditawar: Human as the Pilot, AI as the Copilot. Keputusan medis
                final selalu berada di tangan tenaga medis yang berwenang.
              </p>
            </div>
          </div>
        </div>

        {/* ═══ Bottom row ═══ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 pt-16 pb-6 text-[14px] font-semibold">
          <div className="flex flex-wrap items-center gap-x-2">
            <Link href="https://melinda.co.id/" target="_blank" className="hover:underline">
              Part of RSIA Melinda DHAI
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={siteLinks.privacy} className="hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={siteLinks.terms} className="hover:underline">
              Terms of Service
            </Link>
          </div>
          <p>Sentra &copy; 2026</p>
        </div>
      </div>
    </footer>
  )
}
