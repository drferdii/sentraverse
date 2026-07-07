// Architected and built by Classy.
'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/ui/reveal'

// Layout adapted from an engineering-catalog reference (sticky plate + decimal-numbered
// ledger). All colors/typography come from existing Sentraverse tokens; all copy is original.
const PILLARS = [
  {
    id: '1.0',
    title: 'Persepsi Klinis',
    image: '/assist1.png',
    alt: 'Antarmuka Sentra Assist menampilkan hasil ekstraksi data klinis terstruktur dari narasi pasien',
    body: 'Setiap kasus dimulai dari narasi — keluhan pasien, riwayat penyakit, catatan dokter. Sentra membaca bahasa alami tersebut dan mengubahnya menjadi entitas medis terstruktur: gejala, temuan, dan faktor risiko yang siap dianalisis dalam hitungan detik.',
  },
  {
    id: '2.0',
    title: 'Penalaran Probabilistik',
    image: '/assist2.jpg',
    alt: 'Panel diagnosis diferensial Sentra Assist dengan peringkat hipotesis dan tingkat kepercayaan',
    body: 'Dari entitas terstruktur, mesin inferensi Bayesian menyusun diagnosis diferensial berbasis evidence — setiap hipotesis disertai tingkat kepercayaan dan alur penalaran yang dapat ditelusuri, bukan kotak hitam.',
  },
  {
    id: '3.0',
    title: 'Dokter sebagai Otoritas Akhir',
    image: '/assist3.png',
    alt: 'Tampilan validasi dokter pada Sentra Assist dengan rekomendasi klinis yang menunggu persetujuan',
    body: 'Sentra tidak pernah memutuskan sendiri. Setiap rekomendasi berhenti di tangan dokter — divalidasi, dikoreksi, atau ditolak — dan setiap langkah terekam dalam audit trail. Human as the Pilot, AI as the Copilot.',
  },
]

/** Viewfinder corner marks — decorative only, colored by the existing accent token. */
function CornerFrames() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute top-0 left-0 h-10 w-10 border-t border-l border-accent" />
      <span className="absolute top-0 right-0 h-10 w-10 border-t border-r border-accent" />
      <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-accent" />
      <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-accent" />
    </span>
  )
}

type PillarItemProps = {
  pillar: (typeof PILLARS)[number]
  index: number
  onActive: (index: number) => void
}

function PillarItem({ pillar, index, onActive }: PillarItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Item counts as "active" while it crosses the middle band of the viewport.
  const isCentered = useInView(ref, { margin: '-40% 0px -40% 0px' })

  useEffect(() => {
    if (isCentered) onActive(index)
  }, [isCentered, index, onActive])

  return (
    <div ref={ref} className="border-b border-muted/20 py-10 lg:py-14">
      <Reveal>
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-2xl md:text-[34px] font-bold text-foreground leading-[1.15] font-jakarta">
            {pillar.title}
          </h3>
          <span className="shrink-0 pt-2 text-sm font-medium tracking-[0.18em] text-accent font-inter">
            {pillar.id}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="relative mt-6 overflow-hidden rounded-lg border border-muted/20 lg:hidden">
          <Image
            src={pillar.image}
            alt={pillar.alt}
            width={1672}
            height={941}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <p className="mt-6 text-lg text-muted leading-relaxed">{pillar.body}</p>
      </Reveal>
    </div>
  )
}

export default function SentraBlueprint() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="blueprint" className="py-24 border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="relative grid gap-12 p-8 md:p-10 lg:grid-cols-2 mb-20">
          <CornerFrames />
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="text-xs font-bold tracking-widest text-accent uppercase font-jakarta">
                Under the Hood
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-[32px] md:text-[45px] font-bold text-foreground leading-[1.2] font-jakarta uppercase">
                Di Balik Simulasi
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="text-lg text-muted leading-relaxed">
              Simulasi yang baru saja Anda lihat bukan skrip. Setiap kasus melewati tiga lapisan
              komputasi yang bekerja berurutan — persepsi, penalaran, dan keputusan — dengan dokter
              sebagai pemegang kendali di setiap tahap.
            </p>
          </Reveal>
        </div>

        {/* Sticky plate + numbered ledger */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-start">
          <div className="relative hidden lg:block lg:sticky lg:top-28 p-4">
            <CornerFrames />
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-muted/20">
              {PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-t border-muted/20">
            {PILLARS.map((pillar, index) => (
              <PillarItem key={pillar.id} pillar={pillar} index={index} onActive={setActiveIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
