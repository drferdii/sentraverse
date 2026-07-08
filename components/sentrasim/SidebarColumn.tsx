'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import type { SeverityKey, SimulationState } from '@/components/sentrasim/types'

// CountUp component using requestAnimationFrame for smooth 60fps counting
function CountUp({
  to,
  duration = 1200,
  suffix = '',
}: {
  to: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const pct = Math.min(progress / duration, 1)
      setCount(Math.floor(pct * to))
      if (progress < duration) window.requestAnimationFrame(animate)
      else setCount(to)
    }
    const id = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(id)
  }, [to, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

type MedBoardCase = {
  vitalsText: string
  riskPercent: number
  status: string
  statusColor: string
  statusBg: string
  statusBorder: string
  barColor: string
  diagnoses: { name: string; percent: number }[]
  trajectory: string[]
  disposition: { recommendation: string; detail: string; color: string; bg: string; border: string }
}

const MEDBOARD_DATA: Record<SeverityKey, MedBoardCase> = {
  ringan: {
    vitalsText: 'SpO₂ 96%  ·  RR 20/mnt  ·  T 38.1°C',
    riskPercent: 15,
    status: 'low concern',
    statusColor: '#16a34a',
    statusBg: 'rgba(22,163,74,0.08)',
    statusBorder: 'rgba(22,163,74,0.25)',
    barColor: '#16a34a',
    diagnoses: [
      { name: 'ISPA Atas', percent: 45 },
      { name: 'Pneumonia Komunitas', percent: 35 },
      { name: 'Bronkitis Akut', percent: 15 },
      { name: 'Lainnya', percent: 5 },
    ],
    trajectory: [
      'T0: stabil awal',
      'T1: demam ringan',
      'T2: respirasi stabil',
      'T3: rawat jalan mandiri',
    ],
    disposition: {
      recommendation: 'Rawat Jalan',
      detail:
        'Edukasi kontrol 24–48 jam atau lebih cepat jika timbul sesak napas atau demam persisten.',
      color: '#16a34a',
      bg: 'rgba(22,163,74,0.06)',
      border: 'rgba(22,163,74,0.2)',
    },
  },
  sedang: {
    vitalsText: 'SpO₂ 94%  ·  RR 30/mnt  ·  T 38.4°C',
    riskPercent: 64,
    status: 'moderate concern',
    statusColor: '#d97706',
    statusBg: 'rgba(217,119,6,0.08)',
    statusBorder: 'rgba(217,119,6,0.25)',
    barColor: '#d97706',
    diagnoses: [
      { name: 'Pneumonia komunitas', percent: 72 },
      { name: 'ISPA bawah', percent: 18 },
      { name: 'Asma / bronchospasm', percent: 6 },
      { name: 'Lainnya', percent: 4 },
    ],
    trajectory: [
      'T0: stabil awal',
      'T1: demam dan takipnea',
      'T2: hipoksemia ringan',
      'T3: observasi ketat / eskalasi klinis',
    ],
    disposition: {
      recommendation: 'Observasi Ketat',
      detail:
        'Pertimbangkan rawat inap bila SpO₂ menurun, takipnea menetap, atau respons terapi tidak adekuat.',
      color: '#d97706',
      bg: 'rgba(217,119,6,0.06)',
      border: 'rgba(217,119,6,0.2)',
    },
  },
  berat: {
    vitalsText: 'SpO₂ 86%  ·  RR 32/mnt  ·  T 39.2°C',
    riskPercent: 91,
    status: 'critical concern',
    statusColor: '#dc2626',
    statusBg: 'rgba(220,38,38,0.08)',
    statusBorder: 'rgba(220,38,38,0.25)',
    barColor: '#dc2626',
    diagnoses: [
      { name: 'Pneumonia Komunitas Berat', percent: 88 },
      { name: 'Sepsis Fokus Paru', percent: 8 },
      { name: 'Gagal Napas Tipe 1', percent: 3 },
      { name: 'Lainnya', percent: 1 },
    ],
    trajectory: [
      'T0: takikardia & hipoksemia',
      'T1: asidosis laktat awal',
      'T2: distress napas berat',
      'T3: resusitasi & eskalasi ICU',
    ],
    disposition: {
      recommendation: 'Rawat Inap Intensif (ICU)',
      detail: 'Segera pasang HFNC atau NRM, mulai bundle sepsis, dan pindahkan ke ruang ICU.',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.06)',
      border: 'rgba(220,38,38,0.2)',
    },
  },
}

// Card shell — clean light panel matching the #d9d9d9 page background
function Card({
  children,
  pulse,
  pulseColor,
}: {
  children: React.ReactNode
  pulse?: boolean
  pulseColor?: string
}) {
  return (
    <motion.div
      animate={
        pulse
          ? {
              boxShadow: [
                `0 0 0 0px ${pulseColor}00`,
                `0 0 0 6px ${pulseColor}18`,
                `0 0 0 0px ${pulseColor}00`,
              ],
            }
          : {}
      }
      transition={pulse ? { repeat: Infinity, duration: 3.5, ease: 'easeInOut' } : {}}
      style={{
        background: '#f0f0f0',
        border: '1px solid #c8c8c8',
        borderRadius: 12,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {children}
    </motion.div>
  )
}

// Card label — matches fi-thinking-rubric strong: 10px, 400, tracking wide, uppercase
function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-jakarta), sans-serif',
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#888',
        display: 'block',
      }}
    >
      {children}
    </span>
  )
}

type SidebarColumnProps = {
  activeBranch?: unknown
  isDesktopLayout?: boolean
  selectedSeverity: SeverityKey
  simulation: SimulationState
  timelineMarkerClassName?: string
  visibleMedicationCount?: number
  visibleTherapyCount?: number
}

export function SidebarColumn({ selectedSeverity, simulation }: SidebarColumnProps) {
  const d = MEDBOARD_DATA[selectedSeverity]

  const showVitals = simulation.showVitalsAnomaly || simulation.isComplete
  const showDiagnosis = simulation.showDiagnosis || simulation.isComplete
  const showTrajectory = simulation.trajectoryOpen || simulation.isComplete
  const showDisposition = simulation.showManagement || simulation.isComplete

  return (
    <div
      style={{
        position: 'sticky',
        top: 128,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        textAlign: 'left',
        userSelect: 'none',
      }}
    >
      {/* ── Header — Thinking Stack editorial scale ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          paddingBottom: 24,
          borderBottom: '1px solid #b8b8b8',
        }}
      >
        {/* Tiny all-caps label — fi-thinking-section-mark span style */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--sentra-audrey-teal)',
              flexShrink: 0,
              animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--sentra-audrey-teal)',
            }}
          >
            Konsol Klinis
          </span>
        </div>

        {/* Large heading — fi-thinking-title scale: 400 weight, tight tracking */}
        <h3
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 'clamp(36px, 3.2vw, 52px)',
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: '-0.055em',
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          Sentra
          <br />
          MedBoard
        </h3>

        {/* Body — fi-thinking-pullquote style (smaller, 13px, 400) */}
        <p
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: 1.55,
            color: '#3a3a3a',
            margin: 0,
          }}
        >
          Konsol klinis untuk membaca tanda vital, probabilitas diagnosis, dan arah perburukan
          pasien secara real-time.
        </p>

        {/* Sub-text — muted, rubric-p style */}
        <p
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.55,
            color: '#777',
            margin: 0,
          }}
        >
          Sentra Assist mengubah input klinis menjadi peta risiko yang terstruktur: TTV, gejala,
          pemeriksaan fisik, probabilitas diagnosis, hingga rekomendasi eskalasi berbasis
          physician-supervised clinical reasoning.
        </p>
      </div>

      {/* ── Card 1: TTV Inference ── */}
      <Card pulse={showVitals} pulseColor={d.statusColor}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardLabel>TTV Inference</CardLabel>
          {showVitals && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: d.statusColor,
                background: d.statusBg,
                border: `1px solid ${d.statusBorder}`,
                borderRadius: 999,
                padding: '2px 8px',
              }}
            >
              {d.status}
            </motion.span>
          )}
        </div>

        {showVitals ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: 15,
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
              }}
            >
              {d.vitalsText}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: 12,
                fontWeight: 400,
                color: '#666',
              }}
            >
              Risiko gangguan respirasi:{' '}
              <span style={{ color: d.statusColor, fontWeight: 600 }}>
                <CountUp to={d.riskPercent} suffix="%" />
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              fontSize: 12,
              fontStyle: 'italic',
              color: '#aaa',
              padding: '6px 0',
            }}
          >
            Menunggu input tanda vital...
          </div>
        )}
      </Card>

      {/* ── Card 2: Probabilitas Diagnosis ── */}
      <Card>
        <CardLabel>Probabilitas Diagnosis</CardLabel>

        {showDiagnosis ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.diagnoses.map((diag, i) => (
              <div key={diag.name} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-jakarta), sans-serif',
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#2a2a2a',
                    }}
                  >
                    {diag.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: i === 0 ? d.barColor : '#555',
                    }}
                  >
                    <CountUp to={diag.percent} suffix="%" />
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 3,
                    borderRadius: 99,
                    background: '#d0d0d0',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${diag.percent}%` }}
                    transition={{ duration: 1.1, ease: 'easeOut', delay: i * 0.1 }}
                    style={{
                      height: '100%',
                      borderRadius: 99,
                      background: i === 0 ? d.barColor : '#999',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              fontSize: 12,
              fontStyle: 'italic',
              color: '#aaa',
              padding: '6px 0',
            }}
          >
            Menunggu hasil pemeriksaan klinis...
          </div>
        )}
      </Card>

      {/* ── Card 3: Trajectory T0→T3 ── */}
      <Card>
        <CardLabel>Trajectory T0→T3</CardLabel>

        <div
          style={{
            position: 'relative',
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 4,
          }}
        >
          {/* Background track */}
          <div
            style={{
              position: 'absolute',
              left: 4,
              top: 4,
              bottom: 4,
              width: 1.5,
              background: '#d0d0d0',
            }}
          />
          {/* Animated fill */}
          <motion.div
            initial={{ height: 0 }}
            animate={showTrajectory ? { height: '85%' } : { height: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: 4,
              top: 4,
              width: 1.5,
              background: 'var(--sentra-audrey-teal)',
              transformOrigin: 'top',
            }}
          />

          {d.trajectory.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.2, x: -3 }}
              animate={showTrajectory ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -3 }}
              transition={{ delay: idx * 0.3, duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}
            >
              {/* Node dot */}
              <motion.div
                initial={{ background: '#c8c8c8' }}
                animate={
                  showTrajectory
                    ? {
                        background: 'var(--sentra-audrey-teal)',
                        boxShadow: '0 0 6px rgba(0,209,178,0.5)',
                      }
                    : { background: '#c8c8c8' }
                }
                transition={{ delay: idx * 0.3, duration: 0.3 }}
                style={{
                  position: 'absolute',
                  left: -20,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  border: '1.5px solid #f0f0f0',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 11,
                  fontWeight: 400,
                  color: '#2a2a2a',
                  lineHeight: 1.3,
                }}
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* ── Card 4: Clinical Disposition ── */}
      <AnimatePresence>
        {showDisposition ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            style={{
              background: d.disposition.bg,
              border: `1px solid ${d.disposition.border}`,
              borderRadius: 12,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardLabel>Clinical Disposition</CardLabel>
              <span
                style={{
                  fontFamily: 'var(--font-jakarta), sans-serif',
                  fontSize: 9,
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: d.disposition.color,
                  border: `1px solid ${d.disposition.border}`,
                  borderRadius: 999,
                  padding: '2px 8px',
                }}
              >
                {d.disposition.recommendation}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 1.55,
                color: '#3a3a3a',
                margin: 0,
              }}
            >
              {d.disposition.detail}
            </p>
          </motion.div>
        ) : (
          <div
            style={{
              border: '1px dashed #c0c0c0',
              borderRadius: 12,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#b0b0b0',
              }}
            >
              Waiting for Clinical Decision Support...
            </span>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
