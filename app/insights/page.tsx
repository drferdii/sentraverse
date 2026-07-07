import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import { Newsreader } from 'next/font/google'
import Link from 'next/link'

import { articles, formatDate } from './data'

import { Reveal } from '@/components/ui/reveal'

// Editorial serif scoped to this page only — global brand typography untouched.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

const serif = { fontFamily: 'var(--font-newsreader), Georgia, serif' }

const mediumProfileHref = 'https://medium.com/@drferdiiskandar'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Daftar tulisan asli Dr. Ferdi Iskandar yang dipublikasikan di Medium, mencakup clinical trajectory, hypothesis building, dan AI kesehatan.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights — Sentra Healthcare AI',
    description:
      'Daftar tulisan asli Dr. Ferdi Iskandar di Medium tentang AI kesehatan, trajectory klinis, dan kerangka hipotesis.',
    url: 'https://sentrahai.com/insights',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sentra Healthcare AI insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights — Sentra Healthcare AI',
    description:
      'Daftar tulisan asli Dr. Ferdi Iskandar di Medium tentang AI kesehatan, trajectory klinis, dan kerangka hipotesis.',
    images: ['/opengraph-image'],
  },
}

export default function InsightsPage() {
  const [lead, ...columnStories] = articles

  return (
    <main className={`${newsreader.variable} min-h-screen bg-background text-foreground font-sans`}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-14 md:py-20">
        {/* Top strip */}
        <div className="flex items-center justify-between gap-4 border-b border-foreground pb-3 text-[11px] uppercase tracking-[0.2em] text-muted">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:text-accent transition-colors"
          >
            <ArrowLeft size={13} />
            Kembali ke Beranda
          </Link>
          <span className="hidden sm:block">Arsip Medium — Dr. Ferdi Iskandar</span>
          <span>Edisi {formatDate(lead.date)}</span>
        </div>

        {/* Masthead */}
        <Reveal>
          <h1
            className="py-8 md:py-12 text-center font-bold tracking-tight leading-[0.95] text-[52px] sm:text-[76px] md:text-[112px]"
            style={serif}
          >
            Sentra Insights
          </h1>
        </Reveal>

        {/* Double rule + dateline */}
        <div className="border-t-4 border-foreground" />
        <div className="mt-[3px] border-t border-foreground" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-muted/30 py-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
          <span>Hipotesis Klinis</span>
          <span className="hidden md:block">Trajectory &amp; Prognosis</span>
          <span className="hidden sm:block">AI Kesehatan Indonesia</span>
          <span className="text-accent">Seluruh artikel tayang penuh di Medium</span>
        </div>

        {/* Lead story */}
        <Reveal>
          <article className="group grid gap-8 border-b border-muted/30 py-10 md:py-14 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                {lead.category}
              </p>
              <Link href={lead.href} target="_blank" rel="noopener noreferrer">
                <h2
                  className="text-[34px] leading-[1.05] font-bold tracking-tight transition-colors group-hover:text-accent md:text-[54px]"
                  style={serif}
                >
                  {lead.title}
                </h2>
              </Link>
              <p
                className="mt-6 max-w-[640px] text-xl leading-relaxed text-muted italic md:text-2xl"
                style={serif}
              >
                {lead.description}
              </p>
            </div>
            <div className="flex flex-col justify-end gap-3 border-t border-muted/30 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                Oleh Dr. Ferdi Iskandar
                <br />
                {formatDate(lead.date)} · {lead.source}
              </p>
              <Link
                href={lead.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
              >
                Baca di Medium
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        </Reveal>

        {/* Column stories */}
        <div className="grid border-b border-muted/30 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-muted/20">
          {columnStories.map((article, index) => (
            <Reveal
              key={article.slug}
              delay={Math.min(index * 0.06, 0.18)}
              className="py-8 md:py-10 lg:px-7 lg:first:pl-0 lg:last:pr-0"
            >
              <article className="group flex h-full flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  {article.category}
                </p>
                <Link href={article.href} target="_blank" rel="noopener noreferrer">
                  <h3
                    className="text-[22px] leading-snug font-bold tracking-tight transition-colors group-hover:text-accent"
                    style={serif}
                  >
                    {article.title}
                  </h3>
                </Link>
                <p className="text-[14px] leading-relaxed text-muted">{article.description}</p>
                <p className="mt-auto pt-2 text-[10px] uppercase tracking-[0.2em] text-muted opacity-70">
                  {formatDate(article.date)} · {article.source}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Colophon */}
        <div className="flex justify-center py-10">
          <Link
            href={mediumProfileHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
          >
            Lihat Semua Tulisan di Medium
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  )
}
