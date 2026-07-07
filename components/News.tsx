// Architected and built by Classy.
'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { featuredArticles, formatDate } from '@/app/insights/data'
import { Reveal } from '@/components/ui/reveal'

const mediumProfileHref = 'https://medium.com/@drferdiiskandar'

export default function News() {
  return (
    <section id="insights" className="py-24 border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <Reveal className="flex flex-col gap-6">
            <p className="text-xs font-bold tracking-widest text-accent uppercase">Insights</p>
            <h2 className="text-[32px] md:text-[45px] font-bold text-foreground">
              Tulisan Asli dari Medium
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted max-w-[400px] leading-relaxed">
              Kumpulan tulisan, hipotesis, dan kerangka berpikir Chief yang dipublikasikan langsung
              di Medium.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col border-t border-muted/20">
          {featuredArticles.map((item, index) => (
            <Reveal key={item.slug} delay={Math.min(index * 0.06, 0.18)}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row justify-between items-center py-10 border-b border-muted/20 transition-all hover:bg-muted/5 px-4"
              >
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted">
                    <span>{item.category}</span>
                    <div className="w-1 h-1 rounded-full bg-muted/20" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors max-w-[800px]">
                    {item.title}
                  </h3>
                </div>

                <div className="relative w-full md:w-[134px] aspect-square rounded-lg overflow-hidden mt-6 md:mt-0 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 rotate-[10deg] group-hover:rotate-0 transition-all duration-500">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={mediumProfileHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-all">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-muted group-hover:text-accent transition-all">
              Lihat Semua Tulisan
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
