// Architected and built by Classy.
import { ArrowUpRight } from 'lucide-react'
import { Newsreader } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { articles, formatDate, substackUrl } from '@/app/insights/data'
import { Reveal } from '@/components/ui/reveal'

// Editorial serif for article headlines only — global brand typography untouched.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader-news',
})

const serif = { fontFamily: 'var(--font-newsreader-news), Georgia, serif' }

export default function News() {
  const [featured, ...rest] = articles
  const sideArticles = rest.slice(0, 2)

  return (
    <section id="insights" className={`${newsreader.variable} py-24 border-b border-muted/20`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Publication masthead — Substack-style */}
        <Reveal>
          <p className="text-xs font-bold tracking-widest text-accent uppercase">Insights</p>
          <div className="mt-6 pb-8 border-b border-foreground flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="text-[32px] md:text-[45px] font-bold text-foreground tracking-tight"
                style={serif}
              >
                Ferdi Iskandar Mind &amp; Memory
              </h2>
              <p className="mt-2 text-base md:text-lg text-muted max-w-[560px] leading-relaxed">
                Newsletter di persimpangan AI, operasional kesehatan, dan neurosains — kini terbit
                di Substack.
              </p>
            </div>
            <Link
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start md:self-auto shrink-0 bg-foreground text-background hover:bg-accent hover:text-white transition-colors text-xs font-bold px-4 py-2.5 rounded-full"
            >
              <span>Ikuti di Substack</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        {/* Front-page grid: side cards | featured | most popular */}
        <div className="mt-10 grid gap-10 lg:gap-0 lg:grid-cols-[280px_1fr_300px] items-start">
          {/* Side column — two mini cards */}
          <div className="flex flex-col gap-10 lg:pr-8 lg:border-r lg:border-muted/20">
            {sideArticles.map((article, index) => (
              <Reveal key={article.slug} delay={0.1 + index * 0.08}>
                <Link
                  href={article.substackHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-muted/20">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <h3
                    className="mt-4 text-xl font-bold leading-snug text-foreground group-hover:text-accent transition-colors"
                    style={serif}
                  >
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
                    {formatDate(article.date)} • Dr Ferdi Iskandar
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Featured story — center, headline rata tengah */}
          <Reveal className="order-first lg:order-none lg:px-10">
            <Link
              href={featured.substackHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-center"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-muted/20">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <h3
                className="mt-8 text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-foreground group-hover:text-accent transition-colors mx-auto max-w-[560px]"
                style={serif}
              >
                {featured.title}
              </h3>
              <p className="mt-4 text-base md:text-lg text-muted leading-relaxed mx-auto max-w-[520px]">
                {featured.description}
              </p>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                {formatDate(featured.date)} • Dr Ferdi Iskandar
              </p>
            </Link>
          </Reveal>

          {/* Most popular rail */}
          <aside className="lg:pl-8 lg:border-l lg:border-muted/20">
            <Reveal delay={0.15}>
              <div className="flex items-center justify-between pb-4 border-b border-muted/20">
                <h3 className="text-sm font-bold text-foreground" style={serif}>
                  Paling Populer
                </h3>
                <Link
                  href="/insights"
                  className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
                >
                  Lihat Semua
                </Link>
              </div>
              <div className="flex flex-col">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={article.substackHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[1fr_56px] gap-4 py-4 border-b border-muted/20 last:border-b-0 items-start"
                  >
                    <div>
                      <h4
                        className="text-sm font-bold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-3"
                        style={serif}
                      >
                        {article.title}
                      </h4>
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                        {formatDate(article.date)}
                      </p>
                    </div>
                    <div className="relative aspect-square w-full overflow-hidden rounded border border-muted/20">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Arsip internal */}
        <div className="mt-16 flex justify-center">
          <Link href="/insights" className="flex items-center gap-4 group">
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
