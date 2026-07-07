// Architected and built by Classy.
'use client'

import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

import { Reveal } from '@/components/ui/reveal'

const FAQ_ITEMS = [
  {
    q: 'Apa itu Sentra AI dan bagaimana cara kerjanya?',
    a: 'Sentra AI adalah platform Clinical Decision Support berbasis kecerdasan buatan yang membantu dokter dan tenaga kesehatan membuat keputusan klinis lebih cepat dan akurat. Sistem ini memproses data pasien secara real-time menggunakan 7 protokol klinis — mulai dari sintesis NLP anamnesis, algoritma Bayesian untuk probabilitas diagnosis, hingga pemodelan prognosis — dan menyajikan rekomendasi berbasis bukti dalam hitungan detik.',
  },
  {
    q: 'Apakah Sentra AI menggantikan peran dokter?',
    a: 'Tidak. Sentra AI adalah alat bantu keputusan klinis (co-pilot), bukan pengganti dokter. Tanggung jawab akhir atas setiap keputusan medis tetap berada sepenuhnya pada tenaga medis yang berwenang. Sistem ini dirancang untuk mengurangi beban kognitif dokter, bukan mengambil alih penilaian klinis mereka.',
  },
  {
    q: 'Siapa yang bisa menggunakan Sentra AI?',
    a: 'Sentra AI ditujukan untuk dokter, perawat, bidan, dan tenaga kesehatan berlisensi yang bekerja di fasilitas kesehatan — mulai dari Puskesmas, klinik pratama, hingga rumah sakit. Platform ini dirancang untuk lingkungan klinis Indonesia dengan antarmuka dalam Bahasa Indonesia dan pemahaman konteks medis lokal.',
  },
  {
    q: 'Bagaimana Sentra AI melindungi data pasien?',
    a: 'Sentra menerapkan kebijakan Zero PHI in Logs — data pasien tidak pernah muncul dalam log sistem atau analytics. Setiap interaksi klinis dilindungi oleh audit trail immutable dengan retensi 10 tahun. Infrastruktur kami menggunakan enkripsi HTTPS dengan HSTS preload, Content Security Policy ketat, dan edge server di Asia Tenggara.',
  },
  {
    q: 'Berapa akurasi sistem Sentra AI?',
    a: 'Berdasarkan validasi di pilot sites kami (RSIA Melinda DHAI dan Puskesmas Balowerti, Kediri), Sentra mencapai 97,2% akurasi triase emergensi, 40% penurunan tingkat misdiagnosis, dan mempercepat pengambilan keputusan klinis hingga 3× lebih cepat dibanding workflow konvensional.',
  },
  {
    q: 'Apakah Sentra AI dapat diintegrasikan dengan sistem EMR yang sudah ada?',
    a: 'Ya. Sentra dirancang modular dan dapat diintegrasikan dengan sistem EMR yang sudah ada di fasilitas kesehatan Anda. Sistem juga dapat berjalan secara standalone untuk fasilitas yang belum memiliki EMR. Tim kami akan memandu proses integrasi sesuai infrastruktur yang ada.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <section id="faq" className="relative overflow-hidden py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Decorative hairlines in the empty right band — non-interactive, behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-10 right-[9%] z-0 hidden lg:block"
      >
        <div className="relative h-full w-px overflow-hidden bg-muted/10">
          <span className="sentra-scan absolute left-0 top-0 block h-[10%] w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-20 right-[17%] z-0 hidden lg:block"
      >
        <div className="relative h-full w-px overflow-hidden bg-muted/10">
          <span className="sentra-scan sentra-scan--alt absolute left-0 top-0 block h-[10%] w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="max-w-[600px] mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Pertanyaan Umum</p>
          <h2 className="text-4xl md:text-5xl font-bold font-jakarta tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>

        {/* Items */}
        <div className="max-w-[800px] divide-y divide-[--sentra-muted-subtle]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                <button
                  className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-medium leading-snug group-hover:text-accent transition-colors">
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-muted group-hover:text-accent transition-colors">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && <p className="pb-6 text-muted leading-relaxed text-[15px]">{item.a}</p>}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
