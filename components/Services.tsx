// Architected and built by Classy.
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Reveal } from '@/components/ui/reveal'
import { layoutGovernance } from '@/lib/design-governance'
import { siteLinks } from '@/lib/site-links'

const services = [
  {
    id: '01',
    title: 'Synthesia Engine',
    formula: 'P(yᵢ | x) = softmax(Wh + b)ᵢ',
    desc: 'Mesin NLP klinis real-time yang mentransformasi narasi pasien tidak terstruktur — keluhan, riwayat penyakit, catatan dokter — menjadi entitas medis terstruktur. Melakukan ekstraksi entitas, normalisasi terminologi medis, dan menyintesis input mentah menjadi bahasa klinis standar yang siap diproses oleh modul diagnostik selanjutnya.',
  },
  {
    id: '02',
    title: 'Bayesian Algorithm',
    formula: 'P(D|S) = P(S|D) · P(D) / P(S)',
    desc: 'Mesin probabilitas posterior yang menghitung diagnosis diferensial berdasarkan rasio likelihood gejala, prevalensi klinis, dan faktor risiko spesifik pasien. Menghasilkan hipotesis diagnostik terurut dengan interval kepercayaan untuk validasi dokter.',
  },
  {
    id: '03',
    title: 'Clinical Trajectory',
    formula: 'dx/dt = f(x, t, θ) + ε,  x(t₀) = x₀',
    desc: 'Pemetaan trajectory pasien longitudinal yang memvisualisasikan progresi penyakit lintas kunjungan. Mendeteksi anomali tren, memprediksi jendela deteriorasi, dan memungkinkan intervensi klinis dengan presisi waktu yang tepat.',
  },
  {
    id: '04',
    title: 'Optical Character Recognition',
    formula: 'WER = (S + D + I) / N',
    desc: 'Kecerdasan dokumen tingkat medis yang mengekstrak data terstruktur dari rekam fisik — hasil laboratorium, radiograf, resep — dengan skor kepercayaan per field. Menghilangkan transkripsi manual sambil mempertahankan akurasi tingkat forensik.',
  },
  {
    id: '05',
    title: 'Artificial Intelligence Powered Pharmaceutical',
    formula: 'v = Vmax · [S] / (Km + [S])',
    desc: 'Lapisan farmakovigilans otomatis yang mencocok-silangkan profil medikasi pasien terhadap basis data interaksi obat-obat, rekam alergi, dan kontraindikasi komorbiditas. Menghasilkan peringatan keamanan real-time sebelum finalisasi resep.',
  },
  {
    id: '06',
    title: 'Smart Referral & Auto Documentation',
    formula: 'η = 1 − T_auto / T_manual',
    desc: 'Mesin sintesis rujukan cerdas dan dokumentasi klinis otomatis. Menghasilkan ringkasan pemulangan terstandarisasi, surat rujukan, dan catatan kunjungan — mengurangi beban administratif dokter hingga 40%.',
  },
  {
    id: '07',
    title: 'Clinical Prognosis',
    formula: 'h(t|x) = h₀(t) · exp(β₁x₁ + β₂x₂ + ··· + βₙxₙ)',
    desc: 'Pemodelan prediktif outcome yang menyintesis data trajectory pasien, profil komorbiditas, dan pola respons terapi untuk menghasilkan asesmen prognostik berbasis evidens. Mendukung pengambilan keputusan klinis dengan timeline terstratifikasi risiko dan proyeksi dampak intervensi.',
  },
]

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>('01')

  return (
    <section
      id="services"
      className={`${layoutGovernance.sectionY.spacious} border-b border-muted/20`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          <div className="flex flex-col gap-4">
            <Reveal>
              <p className="text-[10px] font-bold tracking-widest text-accent uppercase font-jakarta">
                Our Service
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-[22px] md:text-[32px] font-bold text-foreground leading-[1.15] font-jakarta uppercase">
                Introducing the Protocols 7
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-8">
            <Reveal delay={0.14}>
              <p className="text-sm text-muted leading-relaxed">
                Sentra menggunakan arsitektur Artificial Intelligence modular yang dirancang khusus
                untuk alur kerja klinis. Setiap protokol beroperasi sebagai lapisan komputasi
                independen — dari sintesis bahasa alami dan inferensi Bayesian hingga prognosis
                prediktif — dirancang untuk mengaugmentasi pengambilan keputusan dokter tanpa
                mengganggu standar klinis yang berlaku.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Service List */}
        <div className="flex flex-col border-t border-muted/20">
          {services.map((service, index) => {
            const isActive = activeId === service.id

            return (
              <Reveal key={service.id} delay={Math.min(index * 0.06, 0.18)}>
                <div
                  className={`flex flex-col md:flex-row justify-between p-5 border-b border-muted/20 transition-colors duration-300 ${
                    isActive ? 'bg-accent' : 'hover:bg-muted/5'
                  }`}
                >
                  <button
                    type="button"
                    aria-controls={`service-panel-${service.id}`}
                    aria-expanded={isActive}
                    onClick={() => setActiveId(isActive ? null : service.id)}
                    className="flex-1 flex flex-col gap-3 text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <h3
                          className={`text-base md:text-lg font-bold font-jakarta tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-background' : 'text-foreground'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <code
                          className={`text-[10px] font-mono tracking-wide transition-colors duration-300 ${
                            isActive ? 'text-background/60' : 'text-accent/70'
                          }`}
                        >
                          {service.formula}
                        </code>
                      </div>
                      <span
                        className={`text-xs font-bold font-jakarta tracking-widest transition-colors duration-300 ${
                          isActive ? 'text-background' : 'text-muted'
                        }`}
                      >
                        {service.id}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          id={`service-panel-${service.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="text-background text-sm max-w-[800px] leading-relaxed mt-2 overflow-hidden"
                        >
                          {service.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>

                  <div className="flex items-start justify-end mt-4 md:mt-0 md:pl-10">
                    <Link
                      href={siteLinks.contact}
                      className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                        isActive
                          ? 'bg-background text-foreground border-transparent hover:scale-105'
                          : 'border-muted text-muted hover:border-accent hover:text-accent'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
                      <div
                        className={`w-6 h-6 flex items-center justify-center border ${
                          isActive ? 'border-foreground/20' : 'border-muted/20'
                        }`}
                      >
                        <ArrowUpRight size={12} />
                      </div>
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
