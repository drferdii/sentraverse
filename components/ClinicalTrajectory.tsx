// Architected and built by Classy.
'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import ClinicalPrognosis from './ClinicalPrognosis'

import AnnotationLine from '@/components/clinical-trajectory/AnnotationLine'
import {
  ACUTE_RISKS,
  buildPolyline,
  DEMO_VISITS,
  DRIVERS,
  RECOMMENDATIONS,
  RISK_COLORS,
  riskBarColor,
  SLIDE_LABELS,
  VITAL_PARAMS,
} from '@/components/clinical-trajectory/data'

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

export default function ClinicalTrajectory() {
  const [activeSlide, setActiveSlide] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Auto-slide to prognosis after trajectory animations complete (~6s)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let timer: ReturnType<typeof setTimeout>
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setActiveSlide(1), 6000)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // Chart calculations
  const chartW = 480
  const chartH = 200
  const vMin = 60
  const vMax = 200
  const pad = 8
  const usableH = chartH - pad * 2

  const sbpLine = buildPolyline(
    DEMO_VISITS.map((v) => v.sbp),
    vMin,
    vMax,
    chartW,
    chartH
  )
  const dbpLine = buildPolyline(
    DEMO_VISITS.map((v) => v.dbp),
    vMin,
    vMax,
    chartW,
    chartH
  )
  const hrLine = buildPolyline(
    DEMO_VISITS.map((v) => v.hr),
    vMin,
    vMax,
    chartW,
    chartH
  )
  const y140 = pad + usableH - ((140 - vMin) / (vMax - vMin)) * usableH
  const y180 = pad + usableH - ((180 - vMin) / (vMax - vMin)) * usableH

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="py-20 border-b border-muted/20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Clinical Intelligence
            </span>
            <div className="h-px w-12 bg-accent/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl font-bold leading-[1.1] tracking-tighter text-foreground md:text-5xl"
          >
            Trajectory &amp; Prognosis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 max-w-[620px] text-base leading-relaxed text-muted"
          >
            Analisis trajektori klinis real-time dan prognosis komprehensif — memantau deteriorasi,
            memprediksi risiko, dan memberikan rekomendasi evidence-based.
          </motion.p>
        </div>

        {/* ═══ Slider Container ═══ */}
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            animate={{ x: `${-activeSlide * 100}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ─── Slide 1: Trajectory ─── */}
            <div className="min-w-full">
              <div
                className="rounded-2xl border border-muted/10 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              >
                {/* Panel header */}
                <div
                  className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-muted/10"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-[0.14em] text-muted uppercase">
                      ◈ CLINICAL TRAJECTORY
                    </span>
                    <span
                      className="text-[8px] font-bold tracking-[0.1em] px-2 py-0.5 rounded"
                      style={{
                        color: '#f97316',
                        background: 'rgba(249,115,22,0.1)',
                        border: '1px solid #f97316',
                      }}
                    >
                      URGENT &lt;6H
                    </span>
                    <span
                      className="text-[8px] font-bold tracking-[0.1em] px-2 py-0.5 rounded"
                      style={{
                        color: '#f97316',
                        border: '1px solid #f97316',
                        background: 'rgba(249,115,22,0.1)',
                      }}
                    >
                      MEMBURUK
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.1em] text-muted uppercase">
                    Demo — Data Simulasi
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-5">
                  {/* Vital Parameters Grid */}
                  <div>
                    <AnnotationLine text="Real-time vital monitoring & risk grading" delay={0.2} />
                    <span className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase block mb-3">
                      CLINICAL INTELLIGENCE — VITAL PARAMETERS
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {VITAL_PARAMS.map((vt, i) => (
                        <motion.div
                          key={vt.label}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                          className="rounded-md p-2.5"
                          style={{
                            border: `1px solid ${RISK_COLORS[vt.risk]}40`,
                            background: `${RISK_COLORS[vt.risk]}08`,
                          }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[8px] tracking-[0.08em] text-muted">
                              {vt.label}
                            </span>
                            <span
                              className="text-[7px] font-bold tracking-[0.08em] px-1 rounded"
                              style={{
                                color: RISK_COLORS[vt.risk],
                                border: `1px solid ${RISK_COLORS[vt.risk]}60`,
                              }}
                            >
                              {vt.risk.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span
                              className="text-xl font-light"
                              style={{ color: RISK_COLORS[vt.risk] }}
                            >
                              {vt.value}
                            </span>
                            <span className="text-[8px] text-muted">{vt.unit}</span>
                          </div>
                          <div className="text-[9px] text-muted italic mt-1 leading-tight">
                            {vt.note}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Two-column: Chart + Right panel */}
                  <div className="grid lg:grid-cols-[1fr_340px] gap-5">
                    {/* SVG Vital Trend Chart */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="rounded-lg p-4 relative"
                      style={{
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.025)',
                      }}
                    >
                      <AnnotationLine text="Analisis tren temporal multi-kunjungan" delay={0.35} />
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className="text-[10px] tracking-[0.14em] uppercase"
                          style={{ color: '#FFCC8C' }}
                        >
                          Vital Trend — 4 Kunjungan
                        </span>
                        <div className="flex gap-3">
                          <span className="text-[9px] flex items-center gap-1 text-foreground/70">
                            <span
                              className="w-3 h-0.5 rounded inline-block"
                              style={{ background: '#FFCC8C' }}
                            />{' '}
                            SBP
                          </span>
                          <span className="text-[9px] flex items-center gap-1 text-muted">
                            <span
                              className="w-3 h-0.5 rounded inline-block"
                              style={{ background: 'rgba(255,204,140,0.45)' }}
                            />{' '}
                            DBP
                          </span>
                          <span className="text-[9px] flex items-center gap-1 text-muted">
                            <span
                              className="w-3 h-0.5 rounded inline-block"
                              style={{ background: 'rgba(96,165,250,0.7)' }}
                            />{' '}
                            HR
                          </span>
                        </div>
                      </div>
                      <svg
                        viewBox={`0 0 ${chartW} ${chartH}`}
                        className="w-full"
                        style={{ height: 200 }}
                        aria-label="Vital sign trend chart"
                      >
                        <line
                          x1={pad}
                          y1={y140}
                          x2={chartW - pad}
                          y2={y140}
                          stroke="rgba(249,115,22,0.4)"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                        <text
                          x={chartW - 6}
                          y={y140 - 3}
                          fill="rgba(249,115,22,0.6)"
                          fontSize="8"
                          textAnchor="end"
                        >
                          140
                        </text>
                        <line
                          x1={pad}
                          y1={y180}
                          x2={chartW - pad}
                          y2={y180}
                          stroke="rgba(239,68,68,0.4)"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                        <text
                          x={chartW - 6}
                          y={y180 - 3}
                          fill="rgba(239,68,68,0.6)"
                          fontSize="8"
                          textAnchor="end"
                        >
                          180
                        </text>
                        <polyline
                          points={hrLine}
                          fill="none"
                          stroke="rgba(96,165,250,0.7)"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points={dbpLine}
                          fill="none"
                          stroke="rgba(255,204,140,0.45)"
                          strokeWidth="1.6"
                          strokeDasharray="4,3"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points={sbpLine}
                          fill="none"
                          stroke="#FFCC8C"
                          strokeWidth="2.4"
                          strokeLinejoin="round"
                        />
                        {DEMO_VISITS.map((v, i) => {
                          const x = pad + (i / (DEMO_VISITS.length - 1)) * (chartW - pad * 2)
                          const y = pad + usableH - ((v.sbp - vMin) / (vMax - vMin)) * usableH
                          return (
                            <g key={v.label}>
                              <circle
                                cx={x}
                                cy={y}
                                r="5"
                                fill="var(--sentra-bg)"
                                stroke="#FFCC8C"
                                strokeWidth="2"
                              />
                              <text
                                x={x}
                                y={chartH - 2}
                                fill="rgba(255,255,255,0.5)"
                                fontSize="9"
                                textAnchor="middle"
                                fontWeight="600"
                              >
                                {v.label}
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                      <div className="flex gap-4 flex-wrap mt-2 text-[10px] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-4 inline-block"
                            style={{ borderTop: '2px dashed rgba(249,115,22,0.7)' }}
                          />
                          SBP 140: batas hipertensi
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-4 inline-block"
                            style={{ borderTop: '2px dashed rgba(239,68,68,0.7)' }}
                          />
                          SBP 180: krisis hipertensi
                        </span>
                      </div>
                    </motion.div>

                    {/* Right column */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <AnnotationLine
                          text="Skor deteriorasi global"
                          delay={0.45}
                          direction="right"
                        />
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="rounded-lg p-3"
                          style={{
                            border: '1px solid rgba(249,115,22,0.3)',
                            background: 'rgba(249,115,22,0.05)',
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className="text-[9px] font-bold tracking-[0.1em]"
                              style={{ color: '#f97316' }}
                            >
                              GLOBAL DETERIORATION — MEMBURUK
                            </span>
                            <span className="text-sm" style={{ color: '#f97316' }}>
                              64<span className="text-[8px]">/100</span>
                            </span>
                          </div>
                          <div className="h-[3px] rounded-full bg-muted/20 mb-2">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: '#f97316' }}
                              initial={{ width: '0%' }}
                              whileInView={{ width: '64%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.8 }}
                            />
                          </div>
                          <p className="text-[10px] text-foreground/80 m-0">
                            Monitoring ketat — evaluasi risiko end-organ damage dalam 6 jam.
                          </p>
                        </motion.div>
                      </div>

                      <div>
                        <AnnotationLine
                          text="Probabilitas serangan akut 24 jam"
                          delay={0.55}
                          direction="right"
                        />
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <span className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase block mb-2">
                            ACUTE ATTACK RISK 24H
                          </span>
                          <div className="flex flex-col gap-2">
                            {ACUTE_RISKS.map((r, i) => (
                              <div key={r.label} className="flex items-center gap-2">
                                <span className="text-[9px] text-muted min-w-[120px]">
                                  {r.label}
                                </span>
                                <div className="flex-1 h-1 rounded-full bg-muted/15">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: riskBarColor(r.value) }}
                                    initial={{ width: '0%' }}
                                    whileInView={{ width: `${r.value}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
                                  />
                                </div>
                                <span
                                  className="text-[9px] font-bold min-w-[28px] text-right"
                                  style={{ color: riskBarColor(r.value) }}
                                >
                                  {r.value}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      <div>
                        <AnnotationLine
                          text="Estimasi waktu menuju kritis"
                          delay={0.65}
                          direction="right"
                        />
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="rounded-md p-2.5"
                          style={{
                            border: '1px solid rgba(249,115,22,0.3)',
                            background: 'rgba(249,115,22,0.04)',
                          }}
                        >
                          <span
                            className="text-[8px] font-bold tracking-[0.12em] block mb-2"
                            style={{ color: '#f97316' }}
                          >
                            TIME TO CRITICAL ESTIMATE
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className="text-[9px] px-2 py-0.5 rounded"
                              style={{
                                border: '1px solid rgba(249,115,22,0.25)',
                                color: 'var(--sentra-fg)',
                              }}
                            >
                              SBP kritis ~<strong>4h</strong>
                            </span>
                            <span
                              className="text-[9px] px-2 py-0.5 rounded"
                              style={{
                                border: '1px solid rgba(249,115,22,0.25)',
                                color: 'var(--sentra-fg)',
                              }}
                            >
                              GDS kritis ~<strong>6h</strong>
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_auto] gap-4">
                    <div>
                      <AnnotationLine text="Faktor pendorong risiko utama" delay={0.75} />
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <span className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase block mb-2">
                          CLINICAL RISK DRIVERS
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {DRIVERS.map((d, i) => (
                            <div key={i} className="flex gap-1.5 items-start">
                              <span
                                className="text-[9px] mt-0.5"
                                style={{ color: 'var(--sentra-accent)' }}
                              >
                                ▸
                              </span>
                              <span className="text-[10px] text-foreground/80">{d}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div>
                      <AnnotationLine text="Rekomendasi tindakan evidence-based" delay={0.85} />
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <span className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase block mb-2">
                          REKOMENDASI KLINIS
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {RECOMMENDATIONS.map((rec, i) => {
                            const c = rec.priority === 'high' ? '#ef4444' : '#f97316'
                            return (
                              <div
                                key={i}
                                className="rounded px-2.5 py-1.5"
                                style={{ borderLeft: `3px solid ${c}`, background: `${c}08` }}
                              >
                                <span
                                  className="text-[7px] font-bold tracking-[0.1em] mr-1.5"
                                  style={{ color: c }}
                                >
                                  {rec.priority.toUpperCase()}
                                </span>
                                <span className="text-[10px] text-foreground/80">{rec.text}</span>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    </div>

                    <div>
                      <AnnotationLine text="Metrik AI confidence" delay={0.95} direction="right" />
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        className="flex lg:flex-col gap-3"
                      >
                        <div
                          className="rounded-md p-2.5 flex-1"
                          style={{ border: '1px solid var(--sentra-muted-line)' }}
                        >
                          <span className="text-[7px] text-muted tracking-[0.1em] block mb-1">
                            CONFIDENCE
                          </span>
                          <span className="text-base font-light text-foreground">78%</span>
                        </div>
                        <div
                          className="rounded-md p-2.5 flex-1"
                          style={{ border: '1px solid var(--sentra-muted-line)' }}
                        >
                          <span className="text-[7px] text-muted tracking-[0.1em] block mb-1">
                            VOLATILITY
                          </span>
                          <span className="text-base font-light text-foreground">42</span>
                        </div>
                        <div
                          className="rounded-md p-2.5 flex-1"
                          style={{ border: '1px solid var(--sentra-muted-line)' }}
                        >
                          <span className="text-[7px] text-muted tracking-[0.1em] block mb-1">
                            STABILITY
                          </span>
                          <span className="text-xs text-foreground">MODERATELY UNSTABLE</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Trajectory Summary */}
                  <div>
                    <AnnotationLine text="Ringkasan AI trajectory analysis" delay={1.05} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      className="rounded-md p-3"
                      style={{
                        border: '1px solid var(--sentra-muted-line)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <span className="text-[8px] tracking-[0.1em] text-muted block mb-1">
                        TRAJECTORY SUMMARY
                      </span>
                      <p className="text-[10px] text-muted italic m-0 leading-relaxed">
                        Pasien menunjukkan tren deteriorasi progresif pada parameter hemodinamik dan
                        metabolik. SBP naik konsisten +28 mmHg dalam 3 kunjungan terakhir dengan GDS
                        tidak terkontrol. Diperlukan intervensi segera untuk mencegah krisis
                        hipertensi dan komplikasi kardiovaskular.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Slide 2: Prognosis ─── */}
            <div className="min-w-full">
              <ClinicalPrognosis />
            </div>
          </motion.div>
        </div>

        {/* ═══ Slide Navigation ═══ */}
        <div className="flex justify-center gap-3 mt-8">
          {SLIDE_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveSlide(i)}
              className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                i === activeSlide
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent text-muted border-muted/30 hover:border-muted/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
