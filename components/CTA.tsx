// Architected and built by Classy.
'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { siteLinks } from '@/lib/site-links'

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative min-h-[600px] flex items-center overflow-hidden border-b border-muted/20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/join.jpg"
          alt="Tim dokter Indonesia bergabung dengan Sentra"
          fill
          className="object-cover opacity-20 brightness-50"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-10">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-bold tracking-widest text-accent uppercase font-jakarta">
            Test Pilot Season
          </p>
          <h2 className="text-[32px] md:text-[56px] font-bold text-foreground leading-[1.1] max-w-[800px] font-jakarta">
            3 Bulan. Target Akurasi 92%. Buktikan Bersama Kami.
          </h2>
          <p className="text-lg text-muted max-w-[600px] mx-auto leading-relaxed">
            Sentra membuka test pilot season untuk fasilitas kesehatan terpilih — dari Puskesmas
            hingga rumah sakit rujukan. Validasi klinis nyata, bukan sekadar demo. Bergabunglah ke
            waiting list kami.
          </p>
        </div>

        <Link
          href={siteLinks.contact}
          className="flex items-center gap-4 bg-accent px-10 py-5 rounded-full hover:shadow-[var(--sentra-shadow-accent)] hover:-translate-y-1 transition-all"
        >
          <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background">
            <ArrowUpRight size={24} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-background">
            Join Waiting List
          </span>
        </Link>
      </div>
    </section>
  )
}
