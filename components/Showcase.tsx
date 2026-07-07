// Architected and built by Classy.
'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { InteractiveImageAccordion } from '@/components/ui/interactive-image-accordion'
import { Reveal } from '@/components/ui/reveal'
import { siteLinks } from '@/lib/site-links'

export default function Showcase() {
  return (
    <section className="py-24 border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <Reveal>
              <p className="text-xs font-bold tracking-widest text-accent uppercase font-jakarta mb-6">
                Protokol Klinis
              </p>
              <h2 className="text-[32px] md:text-[45px] font-bold text-foreground leading-[1.2] font-jakarta">
                Akselerasi Keputusan Klinis dengan{' '}
                <span className="text-accent">Artificial Intelligence</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Setiap protokol Sentra dirancang sebagai lapisan komputasi independen — dari
                ekstraksi bahasa klinis hingga prediksi prognostik — yang bekerja bersama dokter
                untuk presisi diagnostik real-time.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <Link
                href={siteLinks.contact}
                className="inline-flex items-center gap-3 mt-8 px-8 py-3 rounded-full bg-accent text-background text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
              >
                Hubungi Kami
                <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-7/12">
            <InteractiveImageAccordion />
          </div>
        </div>
      </div>
    </section>
  )
}
