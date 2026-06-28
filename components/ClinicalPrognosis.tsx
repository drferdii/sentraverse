// Architected and built by Classy.
"use client";

import React from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════
// DEMO DATA — Clinical Prognosis Showcase
// ═══════════════════════════════════════════════════

const KPI_CARDS = [
  { label: "URGENSI KLINIS", value: "Urgent <6 Jam", color: "#F97316" },
  { label: "MORTALITAS PROXY", value: "Menengah", color: "#E8A838" },
  { label: "CONFIDENCE", value: "72%", color: "var(--sentra-fg)" },
  { label: "TIER REVIEW", value: "HIGH", color: "#F97316" },
];

const SIGNAL_BARS = [
  { label: "Mortalitas", value: 52 },
  { label: "Deteriorasi", value: 64 },
  { label: "Krisis HTN", value: 72 },
  { label: "Glikemik", value: 45 },
  { label: "Sepsis", value: 12 },
  { label: "Syok", value: 8 },
  { label: "Stroke/ACS", value: 58 },
];

const RADAR_DATA = [
  { label: "Hemodinamik", value: 72 },
  { label: "Infeksi", value: 12 },
  { label: "Metabolik", value: 58 },
  { label: "Neuro/ACS", value: 45 },
  { label: "Deteriorasi", value: 64 },
  { label: "Warning", value: 38 },
];

const SURVIVAL_DATA = [
  { label: "24 jam", prob: 91.2, lower: 83.2, upper: 99.2 },
  { label: "72 jam", prob: 84.8, lower: 76.8, upper: 92.8 },
  { label: "7 hari", prob: 76.4, lower: 68.4, upper: 84.4 },
  { label: "30 hari", prob: 68.1, lower: 60.1, upper: 76.1 },
];

const DOUGHNUT_SEGMENTS = [
  { label: "Cadangan stabil", value: 38, color: "rgba(120,168,132,0.88)" },
  { label: "Perlu review", value: 28, color: "rgba(232,168,56,0.9)" },
  { label: "Tekanan risiko", value: 34, color: "rgba(222,130,104,0.92)" },
];

const HEATMAP = [
  { label: "Hemodinamik", score: 72, note: "TD, nadi, perfusi, dan potensi dekompensasi sirkulasi." },
  { label: "Infeksi / Sistemik", score: 12, note: "Demam, napas, dan pola sepsis-like hari ini." },
  { label: "Metabolik", score: 58, note: "Glukosa, potensi krisis metabolik, dan stabilitas umum." },
  { label: "Neuro / ACS", score: 45, note: "Sinyal stroke atau sindrom koroner akut." },
  { label: "Deteriorasi Global", score: 64, note: "Kecenderungan kondisi saat ini memburuk." },
  { label: "Beban Warning", score: 38, note: "Akumulasi breach warning dan volatilitas." },
];

const JOURNEY = [
  { title: "Triase selesai", detail: "Data keluhan dan TTV hari ini sudah masuk ke engine.", state: "done" as const },
  { title: "Dx kerja I11.9", detail: "Hipertensi esensial + DM Tipe 2 tidak terkontrol.", state: "done" as const },
  { title: "Review prognosis AI", detail: "Window review 6 jam dengan urgensi urgent.", state: "active" as const },
  { title: "Arah tindak lanjut", detail: "Observasi ketat dan review ulang prioritas.", state: "next" as const },
];

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════

function scoreColor(v: number): string {
  if (v >= 75) return "rgba(239,68,68,0.9)";
  if (v >= 50) return "rgba(249,115,22,0.88)";
  if (v >= 25) return "rgba(234,179,8,0.84)";
  return "rgba(16,185,129,0.84)";
}

function solidScoreColor(v: number): string {
  if (v >= 75) return "#ef4444";
  if (v >= 50) return "#f97316";
  if (v >= 25) return "#eab308";
  return "#10b981";
}

function survivalColor(p: number): string {
  if (p <= 55) return "#ef4444";
  if (p <= 72) return "#f97316";
  if (p <= 85) return "#eab308";
  return "rgba(120,168,132,0.9)";
}

// Radar SVG polygon helper
function radarPolygon(
  values: number[],
  cx: number,
  cy: number,
  maxR: number,
): string {
  const n = values.length;
  return values
    .map((val, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = (val / 100) * maxR;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

// Radar axis endpoint
function radarAxis(
  cx: number,
  cy: number,
  maxR: number,
  index: number,
  total: number,
): [number, number] {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return [cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle)];
}

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

export default function ClinicalPrognosis() {
  const radarCx = 150;
  const radarCy = 150;
  const radarR = 110;
  const radarN = RADAR_DATA.length;

  // Doughnut calculations
  const doughnutR = 60;
  const circumference = 2 * Math.PI * doughnutR;

  // Survival curve coordinates
  const svW = 380;
  const svH = 160;
  const svPad = 30;
  const svYmin = 30;
  const svYmax = 100;
  const mapX = (i: number) => svPad + (i / 3) * (svW - svPad * 2);
  const mapY = (v: number) =>
    svPad + (svH - svPad * 2) * (1 - (v - svYmin) / (svYmax - svYmin));

  // Band polygon
  const bandUpper = SURVIVAL_DATA.map((d, i) => `${mapX(i)},${mapY(d.upper)}`).join(" ");
  const bandLower = [...SURVIVAL_DATA]
    .reverse()
    .map((d, i) => `${mapX(3 - i)},${mapY(d.lower)}`)
    .join(" ");
  const bandPolygon = `${bandUpper} ${bandLower}`;

  // Main survival line
  const survivalLine = SURVIVAL_DATA.map((d, i) => `${mapX(i)},${mapY(d.prob)}`).join(" ");

  // Guide lines
  const guideY85 = mapY(85);
  const guideY70 = mapY(70);
  const guideY55 = mapY(55);

  return (
    <div
      className="rounded-2xl border border-muted/10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* ═══ 2-COLUMN HORIZONTAL LAYOUT ═══ */}
      <div className="grid lg:grid-cols-[38%_62%]">
        {/* ════════════ LEFT COLUMN — Title + Overview ════════════ */}
        <div
          className="p-5 flex flex-col gap-4 border-r border-muted/10"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          {/* Title header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-[0.14em] text-muted uppercase">
                ◈ PROGNOSIS LANJUTAN
              </span>
              <span
                className="text-[8px] font-bold tracking-[0.1em] px-2 py-0.5 rounded"
                style={{
                  color: "#F97316",
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid #F97316",
                }}
              >
                HIGH
              </span>
            </div>
            <span className="text-[9px] text-muted block">
              Dx: <span className="text-foreground/80">Hipertensi Stage 2 + DM Tipe 2</span>
            </span>
            <span className="text-[9px] tracking-[0.1em] text-muted uppercase mt-0.5 block">
              Demo
            </span>
          </div>

          {/* KPI Cards — 2×2 */}
          <div className="grid grid-cols-2 gap-2">
            {KPI_CARDS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-md p-2.5"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-[8px] tracking-[0.12em] text-muted block mb-1.5">
                  {kpi.label}
                </span>
                <span
                  className="text-base font-semibold"
                  style={{ color: kpi.color }}
                >
                  {kpi.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Doughnut Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg p-4"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase block mb-3"
              style={{ color: "var(--sentra-accent)" }}
            >
              Snapshot Prognosis
            </span>
            <div className="flex items-center gap-4">
              <div className="relative" style={{ width: 110, height: 110 }}>
                <svg viewBox="0 0 140 140" className="w-full h-full">
                  {(() => {
                    const offsets = DOUGHNUT_SEGMENTS.reduce<number[]>((acc, seg, i) => {
                      acc.push(i === 0 ? 0 : acc[i - 1] + (DOUGHNUT_SEGMENTS[i - 1].value / 100) * circumference);
                      return acc;
                    }, []);
                    return DOUGHNUT_SEGMENTS.map((seg, i) => {
                      const len = (seg.value / 100) * circumference;
                      const dash = `${len} ${circumference - len}`;
                      const dashOff = -offsets[i];
                      return (
                        <circle
                          key={seg.label}
                          cx="70"
                          cy="70"
                          r={doughnutR}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="16"
                          strokeDasharray={dash}
                          strokeDashoffset={dashOff}
                          transform="rotate(-90 70 70)"
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-muted tracking-[0.12em]">
                    7 HARI
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: survivalColor(76.4) }}
                  >
                    76.4%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {DOUGHNUT_SEGMENTS.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm inline-block shrink-0"
                      style={{ background: seg.color }}
                    />
                    <span className="text-[9px] text-muted flex-1">
                      {seg.label}
                    </span>
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: seg.color }}
                    >
                      {seg.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Journey Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-lg p-4"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase block mb-3"
              style={{ color: "var(--sentra-accent)" }}
            >
              Patient Journey
            </span>
            <div className="flex flex-col gap-0">
              {JOURNEY.map((m, i) => (
                <div
                  key={m.title}
                  className="grid gap-2"
                  style={{ gridTemplateColumns: "18px 1fr" }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="rounded-full"
                      style={{
                        width: 8,
                        height: 8,
                        marginTop: 3,
                        background:
                          m.state === "done"
                            ? "var(--sentra-accent)"
                            : m.state === "active"
                              ? "#E8A838"
                              : "rgba(255,255,255,0.18)",
                        boxShadow:
                          m.state !== "next"
                            ? "0 0 0 3px rgba(235,89,57,0.08)"
                            : "none",
                      }}
                    />
                    {i < JOURNEY.length - 1 && (
                      <div
                        className="flex-1"
                        style={{
                          width: 1,
                          minHeight: 20,
                          background: "rgba(255,255,255,0.08)",
                        }}
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <span className="text-[10px] font-semibold text-foreground/80">
                      {m.title}
                    </span>
                    <p className="text-[9px] text-muted mt-0.5 m-0 leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-md p-3"
            style={{
              border: "1px solid var(--sentra-muted-line)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span className="text-[8px] tracking-[0.1em] text-muted block mb-1">
              PROGNOSIS SUMMARY
            </span>
            <p className="text-[10px] text-muted italic m-0 leading-relaxed">
              Pasien dengan hipertensi stage 2 dan DM tipe 2 menunjukkan profil risiko
              multi-domain yang memerlukan review ketat. Proyeksi stabilitas 7 hari di
              76.4% dengan confidence 72%. Rekomendasi: evaluasi end-organ damage,
              kontrol glikemik, dan EKG untuk menyingkirkan iskemia.
            </p>
          </motion.div>
        </div>

        {/* ════════════ RIGHT COLUMN — Charts ════════════ */}
        <div className="p-5 flex flex-col gap-4">
          {/* Signal Risk Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg p-4"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase block mb-4"
              style={{ color: "var(--sentra-accent)" }}
            >
              Signal Prognosis — 7 Kategori
            </span>
            <div className="flex items-end gap-2" style={{ height: 160 }}>
              {SIGNAL_BARS.map((bar, i) => (
                <div
                  key={bar.label}
                  className="flex flex-col items-center flex-1 h-full justify-end"
                >
                  <span
                    className="text-[9px] font-bold mb-1"
                    style={{ color: solidScoreColor(bar.value) }}
                  >
                    {bar.value}
                  </span>
                  <motion.div
                    className="w-full rounded-t"
                    style={{ background: scoreColor(bar.value) }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${bar.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
                  />
                  <span className="text-[7px] text-muted mt-1.5 text-center leading-tight">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap mt-3 text-[9px] text-muted">
              <span className="inline-flex items-center gap-1">
                <span
                  className="w-3 inline-block"
                  style={{ borderTop: "2px dashed rgba(16,185,129,0.7)" }}
                />
                &lt;25
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  className="w-3 inline-block"
                  style={{ borderTop: "2px dashed rgba(234,179,8,0.7)" }}
                />
                25-49
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  className="w-3 inline-block"
                  style={{ borderTop: "2px dashed rgba(249,115,22,0.7)" }}
                />
                50-74
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  className="w-3 inline-block"
                  style={{ borderTop: "2px dashed rgba(239,68,68,0.7)" }}
                />
                &ge;75
              </span>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-lg p-4"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase block mb-2"
              style={{ color: "var(--sentra-accent)" }}
            >
              Radar Multi-Faktor
            </span>
            <svg viewBox="0 0 300 300" className="w-full" style={{ maxHeight: 220 }}>
              {[25, 50, 75, 100].map((pct) => (
                <polygon
                  key={pct}
                  points={radarPolygon(
                    Array(radarN).fill(pct),
                    radarCx,
                    radarCy,
                    radarR,
                  )}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              ))}
              {RADAR_DATA.map((_, i) => {
                const [ex, ey] = radarAxis(radarCx, radarCy, radarR, i, radarN);
                return (
                  <line
                    key={i}
                    x1={radarCx}
                    y1={radarCy}
                    x2={ex}
                    y2={ey}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                );
              })}
              <polygon
                points={radarPolygon(
                  RADAR_DATA.map((d) => d.value),
                  radarCx,
                  radarCy,
                  radarR,
                )}
                fill="rgba(255,82,190,0.12)"
                stroke="rgba(255,82,190,0.96)"
                strokeWidth="2"
              />
              {RADAR_DATA.map((d, i) => {
                const angle = (Math.PI * 2 * i) / radarN - Math.PI / 2;
                const r = (d.value / 100) * radarR;
                const px = radarCx + r * Math.cos(angle);
                const py = radarCy + r * Math.sin(angle);
                const [lx, ly] = radarAxis(radarCx, radarCy, radarR + 18, i, radarN);
                return (
                  <g key={d.label}>
                    <circle
                      cx={px}
                      cy={py}
                      r="3"
                      fill={solidScoreColor(d.value)}
                      stroke="rgba(13,13,13,0.8)"
                      strokeWidth="1"
                    />
                    <text
                      x={lx}
                      y={ly}
                      fill="rgba(255,255,255,0.5)"
                      fontSize="9"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="text-[9px] text-muted mt-1 leading-relaxed">
              Semakin melebar area radar, semakin banyak domain yang perlu perhatian
              klinis aktif.
            </p>
          </motion.div>

          {/* Survival Curve */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-lg p-4"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span
                className="text-[10px] tracking-[0.14em] uppercase"
                style={{ color: "var(--sentra-accent)" }}
              >
                Kurva Kelangsungan Hidup Probabilistik
              </span>
              <div className="flex gap-3 text-[9px] text-muted">
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-0.5 rounded inline-block"
                    style={{ background: "rgba(255,82,190,0.96)" }}
                  />{" "}
                  Proyeksi
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-2 rounded-sm inline-block"
                    style={{ background: "rgba(142,156,184,0.14)" }}
                  />{" "}
                  Band
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-3">
              {SURVIVAL_DATA.map((d) => (
                <div
                  key={d.label}
                  className="rounded p-2"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-[8px] tracking-[0.1em] text-muted block">
                    {d.label.toUpperCase()}
                  </span>
                  <span
                    className="text-lg font-semibold"
                    style={{ color: survivalColor(d.prob) }}
                  >
                    {d.prob}%
                  </span>
                </div>
              ))}
            </div>

            <svg
              viewBox={`0 0 ${svW} ${svH}`}
              className="w-full"
              style={{ height: 140 }}
              aria-label="Survival probability curve"
            >
              <line
                x1={svPad}
                y1={guideY85}
                x2={svW - svPad}
                y2={guideY85}
                stroke="rgba(120,168,132,0.4)"
                strokeWidth="1"
                strokeDasharray="4,8"
              />
              <text
                x={svW - svPad + 4}
                y={guideY85 + 3}
                fill="rgba(120,168,132,0.5)"
                fontSize="8"
              >
                85%
              </text>
              <line
                x1={svPad}
                y1={guideY70}
                x2={svW - svPad}
                y2={guideY70}
                stroke="rgba(166,178,198,0.4)"
                strokeWidth="1"
                strokeDasharray="4,8"
              />
              <text
                x={svW - svPad + 4}
                y={guideY70 + 3}
                fill="rgba(166,178,198,0.4)"
                fontSize="8"
              >
                70%
              </text>
              <line
                x1={svPad}
                y1={guideY55}
                x2={svW - svPad}
                y2={guideY55}
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
                strokeDasharray="4,8"
              />
              <text
                x={svW - svPad + 4}
                y={guideY55 + 3}
                fill="rgba(239,68,68,0.4)"
                fontSize="8"
              >
                55%
              </text>

              <polygon
                points={bandPolygon}
                fill="rgba(142,156,184,0.14)"
                stroke="rgba(170,184,210,0.24)"
                strokeWidth="1"
              />

              <polyline
                points={survivalLine}
                fill="none"
                stroke="rgba(255,82,190,0.96)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {SURVIVAL_DATA.map((d, i) => (
                <g key={d.label}>
                  <circle
                    cx={mapX(i)}
                    cy={mapY(d.prob)}
                    r="3.5"
                    fill="var(--sentra-bg)"
                    stroke="rgba(255,82,190,0.96)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={mapX(i)}
                    y={svH - 4}
                    fill="rgba(255,255,255,0.5)"
                    fontSize="9"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {d.label}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Risk Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-lg p-4"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase block mb-3"
              style={{ color: "var(--sentra-accent)" }}
            >
              Peta Panas Risiko
            </span>
            <div className="flex flex-col">
              {HEATMAP.map((item, i) => (
                <div
                  key={item.label}
                  className="grid items-center gap-3 py-2"
                  style={{
                    gridTemplateColumns: "110px 1fr 36px",
                    borderTop: i > 0 ? `1px solid ${scoreColor(item.score)}30` : "none",
                  }}
                >
                  <span className="text-[9px] text-foreground/80 tracking-[0.04em]">
                    {item.label}
                  </span>
                  <div>
                    <div className="h-1.5 rounded-full bg-muted/10 relative">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: scoreColor(item.score) }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.7 + i * 0.06 }}
                      />
                    </div>
                    <span className="text-[7px] text-muted mt-0.5 block leading-tight">
                      {item.note}
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-semibold text-right"
                    style={{ color: solidScoreColor(item.score) }}
                  >
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
