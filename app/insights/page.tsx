import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { articles, formatDate } from './data'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Perspektif mendalam tentang AI kesehatan, Clinical Decision Support, dan transformasi digital healthcare Indonesia dari tim Sentra.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights — Sentra Healthcare AI',
    description:
      'Perspektif mendalam tentang AI kesehatan dan transformasi digital healthcare Indonesia.',
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
      'Perspektif mendalam tentang AI kesehatan dan transformasi digital healthcare Indonesia.',
    images: ['/opengraph-image'],
  },
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
            Research &amp; Perspectives
          </p>
          <h1 className="text-5xl md:text-6xl font-bold font-jakarta tracking-tight">Insights</h1>
        </div>

        {/* Article List */}
        <div className="divide-y divide-[--sentra-muted-subtle]">
          {articles.map((article, i) => (
            <article key={article.slug} className="py-10 group">
              <Link href={`/insights/${article.slug}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-widest text-accent">
                        {article.category}
                      </span>
                      <span className="text-muted opacity-40">·</span>
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold font-jakarta mb-3 group-hover:text-accent transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted leading-relaxed text-[15px]">{article.description}</p>
                    <p className="text-xs text-muted opacity-60 mt-4">{formatDate(article.date)}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowUpRight
                      size={20}
                      className="text-muted group-hover:text-accent transition-colors mt-1"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
