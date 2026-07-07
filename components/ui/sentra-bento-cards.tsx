// Architected and built by Classy.
'use client'

import React from 'react'

import { CountUp } from '@/components/ui/count-up'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

// --- Card Data: Healthcare AI Statistics ---
const cardContents = [
  {
    stat: '40%',
    title: 'Reduksi Misdiagnosis',
    description:
      'Algoritma Artificial Intelligence Sentra mampu menurunkan tingkat kesalahan diagnostik hingga 40% melalui analisis diferensial berbasis bukti dan validasi silang multi-parameter klinis.',
  },
  {
    stat: '3×',
    title: 'Kecepatan Keputusan Klinis',
    description:
      'Dokter mengambil keputusan klinis 3 kali lebih cepat dengan dukungan Clinical Decision Support yang menganalisis ratusan parameter dalam hitungan detik.',
  },
  {
    stat: '97.2%',
    title: 'Akurasi Triase Darurat',
    description:
      'Sistem triase otomatis Sentra mencapai akurasi 97.2% dalam mengklasifikasikan tingkat kegawatan pasien — memastikan kasus kritis mendapat penanganan prioritas tanpa penundaan. Protokol traffic light terintegrasi secara real-time dengan modul Emergency untuk memberikan rekomendasi triage berbasis evidence yang konsisten, mengurangi variabilitas penilaian klinis antar tenaga medis, dan menghasilkan audit trail lengkap untuk setiap keputusan triase.',
  },
  {
    stat: '10 Th',
    title: 'Retensi Audit Trail',
    description:
      'Setiap keputusan klinis tercatat dalam audit trail immutable selama 10 tahun — memenuhi standar medikolegal dan akreditasi rumah sakit.',
  },
  {
    stat: '24/7',
    title: 'Monitoring Real-Time',
    description:
      'Analisis data pasien berjalan tanpa henti — mendeteksi perubahan kondisi kritis sebelum terlambat, dengan alert otomatis ke tim medis.',
  },
]

// --- Count-up mapping: final rendered text must stay identical to the static stat ---
const STAT_COUNTS: Record<string, { value: number; decimals?: number; suffix: string }> = {
  '40%': { value: 40, suffix: '%' },
  '3×': { value: 3, suffix: '×' },
  '97.2%': { value: 97.2, decimals: 1, suffix: '%' },
  '10 Th': { value: 10, suffix: ' Th' },
  // '24/7' is intentionally not counted — intermediate values would read as nonsense.
}

// --- Plus Card Component ---
const PlusCard: React.FC<{
  className?: string
  stat: string
  title: string
  description: string
  revealDelay?: number
}> = ({ className = '', stat, title, description, revealDelay = 0 }) => {
  const count = STAT_COUNTS[stat]

  return (
    <Reveal
      delay={revealDelay}
      className={cn(
        'relative border border-dashed border-muted/30 rounded-lg p-6 bg-background min-h-[200px]',
        'flex flex-col justify-between group/card hover:border-accent/40 transition-colors duration-500',
        className
      )}
    >
      <CornerPlusIcons />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <span className="text-4xl md:text-5xl font-bold text-accent font-jakarta">
          {count ? (
            <CountUp value={count.value} decimals={count.decimals ?? 0} suffix={count.suffix} />
          ) : (
            stat
          )}
        </span>
        <h3 className="text-xl font-bold text-foreground font-jakarta">{title}</h3>
        <p className="text-muted leading-relaxed">{description}</p>
      </div>
    </Reveal>
  )
}

// --- Corner Plus Icons ---
const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={cn(
      'size-6 text-muted/40 group-hover/card:text-accent/60 transition-colors duration-500',
      className
    )}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

// --- Main Bento Grid ---
export default function SentraBentoCards() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-24">
      {/* Section Header */}
      <Reveal className="flex flex-col gap-6 mb-16">
        <p className="text-xs font-bold tracking-widest text-accent uppercase">
          Prediksi & Statistik
        </p>
        <h2 className="text-[32px] md:text-[45px] font-bold text-foreground font-jakarta">
          Keunggulan Artificial Intelligence dalam Klinis
        </h2>
      </Reveal>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-5">
        <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" />
        <PlusCard {...cardContents[1]} className="lg:col-span-3 lg:row-span-2" revealDelay={0.08} />
        <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" revealDelay={0.16} />
        <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" revealDelay={0.24} />
        <PlusCard {...cardContents[4]} className="lg:col-span-2 lg:row-span-1" revealDelay={0.32} />
      </div>

      {/* Section Footer */}
      <Reveal className="max-w-2xl ml-auto text-right px-4 mt-8 lg:-mt-16">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground font-jakarta mb-4">
          Dibangun untuk presisi. Dirancang untuk keselamatan.
        </h2>
        <p className="text-muted text-lg leading-relaxed">
          Sentra memberikan perangkat Artificial Intelligence yang membantu dokter mengambil
          keputusan klinis lebih cepat dan akurat — tanpa menggantikan penilaian manusia sebagai
          otoritas akhir.
        </p>
      </Reveal>
    </div>
  )
}
