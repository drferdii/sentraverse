// Architected and built by Classy.
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { type ReactNode, useEffect, useState } from 'react'

// Phase durations (ms) — each phase shows then transitions
const PHASE_TIMES = [9500, 16500, 24000] // P1→P2, P2→P3, P3→P4

// Header config per phase
const PHASE_HEADERS: Record<number, { label: string; color: string; tag: string }> = {
  1: { label: 'Audrey · Puskesmas', color: 'var(--sentra-audrey)', tag: 'live' },
  2: { label: 'Audrey · Konsul Sp.JP', color: 'var(--sentra-audrey-teal)', tag: 'Sp.JP' },
  3: { label: 'Audrey · Konfirmasi EKG', color: 'var(--sentra-audrey)', tag: 'dr. Rian' },
  4: { label: 'Audrey · Rujukan RS', color: 'var(--sentra-accent)', tag: 'IGD' },
}

// Shared bubble styles — tuned for dark bg #0d0d0d
const audreyBubble =
  'px-4 py-3 rounded-xl rounded-bl-sm border border-[rgb(var(--sentra-audrey-rgb)/0.20)] bg-[rgb(var(--sentra-audrey-rgb)/0.10)]'
const dokterBubble =
  'px-4 py-2.5 rounded-xl rounded-br-sm border border-foreground/12 bg-foreground/[0.06]'
const tealBubble =
  'px-4 py-3 rounded-xl rounded-br-sm border border-[rgb(var(--sentra-audrey-teal-rgb)/0.22)] bg-[rgb(var(--sentra-audrey-teal-rgb)/0.10)]'

// Reusable animated message
function Msg({
  delay,
  align = 'left',
  className = '',
  children,
}: {
  delay: number
  align?: 'left' | 'right'
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={align === 'right' ? 'flex justify-end' : ''}
    >
      <div className={`max-w-[90%] ${className}`}>{children}</div>
    </motion.div>
  )
}

function AudreyLabel({ text = 'Audrey' }: { text?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--sentra-audrey)]" />
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--sentra-audrey-muted)]">
        {text}
      </span>
    </div>
  )
}

function LoadingDots({ delay, text }: { delay: number; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2 px-1 pt-1"
    >
      <div className="flex gap-1">
        {[0, 200, 400].map((d) => (
          <div
            key={d}
            className="w-1.5 h-1.5 rounded-full bg-[var(--sentra-audrey)]/50 animate-pulse"
            style={{ animationDelay: `${d}ms` }}
          />
        ))}
      </div>
      <span className="text-xs text-muted/40 font-jakarta">{text}</span>
    </motion.div>
  )
}

function Divider({ text, color = 'var(--sentra-audrey-teal)' }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div
        className="flex-1 h-px"
        style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}
      />
      <span
        className="text-xs font-jakarta whitespace-nowrap"
        style={{ color: `color-mix(in srgb, ${color} 50%, transparent)` }}
      >
        {text}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}
      />
    </div>
  )
}

// --- Konsultasi Card: 4-phase clinical flow ---
function KonsultasiCard() {
  const [phase, setPhase] = useState(1)

  useEffect(() => {
    const timers = PHASE_TIMES.map((ms, i) => setTimeout(() => setPhase(i + 2), ms))
    return () => timers.forEach(clearTimeout)
  }, [])

  const h = PHASE_HEADERS[phase]

  return (
    <div className="relative w-full rounded-2xl border border-[var(--sentra-audrey-accent-border)] bg-gradient-to-b from-[var(--sentra-canvas)] to-[var(--sentra-bg)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[var(--sentra-audrey-feature-divider)]">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full transition-colors duration-700"
            style={{ background: h.color }}
          />
          <span
            className="text-sm font-bold uppercase tracking-widest font-jakarta transition-colors duration-700"
            style={{ color: h.color }}
          >
            {h.label}
          </span>
        </div>
        <div className="ml-auto">
          <span className="text-xs text-muted/30 font-jakarta">{h.tag}</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="p-5 min-h-[420px]">
        <AnimatePresence mode="wait">
          {/* ── PHASE 1: Konsultasi PKM ── */}
          {phase === 1 && (
            <motion.div
              key="p1"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3"
            >
              <Msg delay={1.2} align="right" className={dokterBubble}>
                <p className="text-sm text-foreground/80 leading-relaxed font-jakarta m-0">
                  Pasien laki-laki, 52 thn, nyeri dada kiri seperti ditekan, menjalar ke lengan kiri
                  dan rahang sejak 1 jam
                </p>
              </Msg>
              <Msg delay={2.8} className={audreyBubble}>
                <AudreyLabel text="Analisis" />
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Suspek{' '}
                  <span className="text-[var(--sentra-critical)] font-semibold">
                    Angina Pektoris Tidak Stabil
                  </span>
                  . Triase: EMERGENCY. Rekomendasi: EKG 12-lead, Troponin I, Aspirin 320mg loading.
                </p>
              </Msg>
              <Msg delay={4.4} className={audreyBubble}>
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Dok ijin,{' '}
                  <span className="text-[var(--sentra-audrey)] font-semibold">
                    anda yang konsul ke dokter spesialis atau saya?
                  </span>
                </p>
              </Msg>
              <Msg delay={5.8} align="right" className={`${dokterBubble} !max-w-[60%]`}>
                <p className="text-sm text-foreground/80 leading-relaxed font-jakarta m-0">
                  Kamu aja Audrey
                </p>
              </Msg>
              <Msg delay={7.0} className={audreyBubble}>
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Baik dok, saya konsulkan ke{' '}
                  <span className="text-[var(--sentra-audrey)] font-semibold">Sp.JP</span> sekarang.
                </p>
              </Msg>
              <LoadingDots delay={8.2} text="Menghubungi Sp. Jantung..." />
            </motion.div>
          )}

          {/* ── PHASE 2: Konsul Sp.JP ── */}
          {phase === 2 && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Divider text="Terhubung dengan dr. Sp.JP" />
              <Msg delay={0.8} className={audreyBubble}>
                <AudreyLabel />
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Selamat malam dokter, saya{' '}
                  <span className="text-[var(--sentra-audrey)] font-semibold">Audrey</span>, atas
                  persetujuan <span className="text-foreground/80 font-semibold">dr. Rian</span>{' '}
                  dari Puskesmas, ijin konsul mengenai pasien Tn. Ahmad, 52 thn.{' '}
                  <span className="text-[var(--sentra-critical)] font-semibold">Dx kerja: UAP</span>
                  . Sudah loading Aspirin 320mg. Mohon advis tatalaksana lanjutan, apakah dokter
                  berkenan?
                </p>
              </Msg>
              <Msg delay={2.6} align="right" className={tealBubble}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--sentra-audrey-teal)]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--sentra-audrey-teal)]/60">
                    dr. Sp.JP
                  </span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Baik Audrey, lanjutkan DAPT — tambahkan Clopidogrel 300mg loading. Pasang monitor,{' '}
                  <span className="text-[var(--sentra-critical)] font-semibold">
                    siapkan rujuk ke RS jika EKG ada ST elevasi
                  </span>
                  . Saya standby.
                </p>
              </Msg>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.0, duration: 0.5 }}
                className="flex gap-2"
              >
                <div className="flex-1 px-3 py-2.5 rounded-lg border border-[var(--sentra-audrey-teal-faint)] bg-[var(--sentra-audrey-teal-faint)]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--sentra-audrey-teal)] block mb-0.5">
                    Status
                  </span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-[var(--sentra-audrey-teal)]"
                    >
                      <path
                        d="M13.3 4.3L6 11.6 2.7 8.3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-[var(--sentra-audrey-teal)] font-jakarta">
                      Advis Diterima
                    </span>
                  </div>
                </div>
                <div className="flex-1 px-3 py-2.5 rounded-lg border border-accent/15 bg-accent/[0.03]">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent/60 block mb-0.5">
                    Tindakan
                  </span>
                  <span className="text-sm font-semibold text-accent/80 font-jakarta">
                    + Clopidogrel 300mg
                  </span>
                </div>
              </motion.div>
              <LoadingDots delay={5.5} text="Kembali ke dr. Rian..." />
            </motion.div>
          )}

          {/* ── PHASE 3: Konfirmasi EKG dengan dr. Rian ── */}
          {phase === 3 && (
            <motion.div
              key="p3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Divider text="Kembali ke dr. Rian" color="var(--sentra-audrey)" />
              <Msg delay={0.8} className={audreyBubble}>
                <AudreyLabel />
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Dok Rian, advis dari Sp.JP sudah diterima. Clopidogrel 300mg sudah diberikan.
                  Sp.JP juga pesan:{' '}
                  <span className="text-[var(--sentra-critical)] font-semibold">
                    rujuk ke RS jika EKG ada ST elevasi
                  </span>
                  . Bagaimana hasil EKG nya, dok? Ijin saya bantu analisa.
                </p>
              </Msg>
              <Msg delay={2.4} align="right" className={dokterBubble}>
                <p className="text-sm text-foreground/80 leading-relaxed font-jakarta m-0">
                  EKG sudah keluar. ST elevasi di lead II, III, aVF.
                </p>
              </Msg>
              <Msg delay={3.8} className={audreyBubble}>
                <AudreyLabel text="Analisis EKG" />
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Konfirmasi: tampak{' '}
                  <span className="text-[var(--sentra-critical)] font-semibold">
                    ST Elevasi di lead II, III, aVF
                  </span>
                  . Kesan:{' '}
                  <span className="text-[var(--sentra-critical)] font-bold">STEMI Inferior</span>.
                  Sesuai advis Sp.JP — pasien harus segera dirujuk ke RS. Ijin saya hubungi RS, dok?
                </p>
              </Msg>
              <Msg delay={5.4} align="right" className={dokterBubble}>
                <p className="text-sm text-foreground/80 leading-relaxed font-jakarta m-0">
                  Sepakat, segera rujuk. Hubungi RS sekarang Audrey.
                </p>
              </Msg>
              <LoadingDots delay={6.4} text="Menghubungi IGD Rumah Sakit..." />
            </motion.div>
          )}

          {/* ── PHASE 4: Audrey contact RS ── */}
          {phase === 4 && (
            <motion.div
              key="p4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Divider text="Terhubung dengan IGD RS" color="var(--sentra-accent)" />
              <Msg delay={0.8} className={audreyBubble}>
                <AudreyLabel text="Audrey → IGD RS" />
                <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                  Selamat malam, saya{' '}
                  <span className="text-[var(--sentra-audrey)] font-semibold">Audrey</span>, atas
                  persetujuan <span className="text-foreground/80 font-semibold">dr. Rian</span>{' '}
                  dari Puskesmas. Ijin mengirim pasien Tn. Ahmad, 52 thn, dengan diagnosis{' '}
                  <span className="text-[var(--sentra-critical)] font-bold">STEMI Inferior</span>.
                  Sudah diberikan DAPT (Aspirin 320mg + Clopidogrel 300mg). Mohon penerimaan untuk
                  tatalaksana lanjutan.
                </p>
              </Msg>
              <Msg delay={2.8} align="right">
                <div className={`${tealBubble} !border-accent/15 !bg-accent/[0.03]`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-accent/60">
                      IGD RS
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed font-jakarta m-0">
                    Baik Audrey, pasien kami terima. Tim Cath Lab sudah standby. Silakan kirim
                    segera.
                  </p>
                </div>
              </Msg>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.5 }}
                className="flex gap-2"
              >
                <div className="flex-1 px-3 py-2.5 rounded-lg border border-[var(--sentra-audrey-teal-faint)] bg-[var(--sentra-audrey-teal-faint)]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--sentra-audrey-teal)] block mb-0.5">
                    Rujukan
                  </span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-[var(--sentra-audrey-teal)]"
                    >
                      <path
                        d="M13.3 4.3L6 11.6 2.7 8.3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-[var(--sentra-audrey-teal)] font-jakarta">
                      Diterima
                    </span>
                  </div>
                </div>
                <div className="flex-1 px-3 py-2.5 rounded-lg border border-accent/15 bg-accent/[0.03]">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent/60 block mb-0.5">
                    Cath Lab
                  </span>
                  <span className="text-sm font-semibold text-accent/80 font-jakarta">Standby</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[var(--sentra-audrey-corner-border)] rounded-tl" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[var(--sentra-audrey-corner-border)] rounded-tr" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[var(--sentra-audrey-corner-border)] rounded-bl" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[var(--sentra-audrey-corner-border)] rounded-br" />
      </div>
    </div>
  )
}

// --- Main Hero Component ---
export default function Hero() {
  const pilotLoginHref = process.env.NEXT_PUBLIC_PILOT_LOGIN_URL?.trim() || '/dashboard'
  const pilotLoginExternal = /^https?:\/\//i.test(pilotLoginHref)

  return (
    <section className="relative pt-32 pb-20 overflow-hidden border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-start">
          {/* Left Side — Text */}
          <div className="flex flex-col gap-12">
            {/* 01, 02, 03 Points */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {[
                { id: '01', text: 'Patient Safety Net Real-Time' },
                { id: '02', text: 'Specializing in clinical intelligence' },
                { id: '03', text: 'Immutable Audit Trail + Human Authority' },
              ].map((point) => (
                <div key={point.id} className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest text-accent font-jakarta">
                    {point.id}
                  </span>
                  <p className="text-xs font-medium tracking-widest text-muted uppercase max-w-[180px]">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Title — static DOM (no motion) so headline never depends on Framer hydration */}
            <div className="flex flex-col gap-6">
              <h1 className="text-[40px] md:text-[80px] lg:text-[100px] leading-[1] font-bold font-jakarta tracking-tighter text-foreground">
                <span className="sr-only">
                  COMING SOON 2026 — Clinical Decision Support berbasis AI untuk Layanan Kesehatan
                  Indonesia
                </span>
                <span aria-hidden="true">
                  COMING SOON <br />
                  2026
                </span>
              </h1>
              <p className="text-lg text-muted max-w-[600px] leading-relaxed">
                Sentra mentransformasi layanan kesehatan dengan kecerdasan klinis terintegrasi yang
                memberdayakan tenaga medis untuk mengambil keputusan secara lebih cepat, akurat, dan
                berbasis data.
              </p>
            </div>

            {/* CTA — Baca Cerita Kami + Tes Pilot Login */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
              <Link
                href="/story"
                className="group inline-flex items-center justify-center gap-3 border border-muted/30 rounded-full px-8 py-4 hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-muted group-hover:text-accent transition-colors">
                  Baca Cerita Kami
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted group-hover:text-accent transition-colors"
                />
              </Link>
              <Link
                href={pilotLoginHref}
                {...(pilotLoginExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group inline-flex items-center justify-center gap-3 border border-accent/30 rounded-full px-8 py-4 hover:border-accent/60 hover:bg-accent/10 transition-all"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-accent/90 group-hover:text-accent transition-colors">
                  Tes Pilot Login
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-accent/70 group-hover:text-accent transition-colors"
                />
              </Link>
            </div>
          </div>

          {/* Right Side — Konsultasi Card */}
          <div className="hidden lg:block sticky top-32">
            <KonsultasiCard />
          </div>
        </div>
      </div>
    </section>
  )
}
