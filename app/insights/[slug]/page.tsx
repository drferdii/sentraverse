import { ArrowLeft, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, formatDate, getArticle } from '../data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: `${article.title} | Sentra Healthcare AI`,
      description: article.description,
      url: `https://sentrahai.com/insights/${slug}`,
      type: 'article',
      publishedTime: article.date,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Sentra Healthcare AI`,
      description: article.description,
      images: ['/opengraph-image'],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  // Render markdown-like content (simple paragraph + heading parsing)
  const paragraphs = article.content
    .split('\n\n')
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl font-bold font-jakarta mt-10 mb-4">
            {block.replace('## ', '')}
          </h2>
        )
      }
      if (block.startsWith('| ')) {
        const rows = block.split('\n').filter(r => !r.match(/^\|[-\s|]+\|$/))
        return (
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {rows.map((row, ri) => {
                  const cells = row
                    .split('|')
                    .filter(Boolean)
                    .map(c => c.trim())
                  const Tag = ri === 0 ? 'th' : 'td'
                  return (
                    <tr key={ri} className="border-b border-[--sentra-muted-subtle]">
                      {cells.map((cell, ci) => (
                        <Tag key={ci} className="py-2 pr-6 text-left text-foreground/80">
                          {cell}
                        </Tag>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter(l => l.startsWith('- '))
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 my-4">
            {items.map((item, li) => (
              <li key={li} className="text-foreground/85 leading-relaxed">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </li>
            ))}
          </ul>
        )
      }
      return (
        <p
          key={i}
          className="leading-relaxed text-foreground/85"
          dangerouslySetInnerHTML={{
            __html: block.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      )
    })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Article', 'MedicalWebPage'],
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: 'id-ID',
        author: {
          '@type': 'Person',
          name: 'Dr. Ferdi Iskandar',
          jobTitle: 'Founder & CEO',
          affiliation: 'Sentra Healthcare Solutions',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sentra Healthcare Solutions',
          logo: 'https://sentrahai.com/icon.png',
        },
        url: `https://sentrahai.com/insights/${article.slug}`,
        mainEntityOfPage: `https://sentrahai.com/insights/${article.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://sentrahai.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Insights',
            item: 'https://sentrahai.com/insights',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `https://sentrahai.com/insights/${article.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[720px] mx-auto px-6 md:px-12 py-32">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Semua Insights
        </Link>

        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-widest text-accent">
              {article.category}
            </span>
            <span className="text-muted opacity-40">·</span>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={12} />
              {article.readTime}
            </span>
            <span className="text-muted opacity-40">·</span>
            <span className="text-xs text-muted">{formatDate(article.date)}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-jakarta tracking-tight mb-6 leading-[1.1]">
            {article.title}
          </h1>

          <p className="text-xl text-muted leading-relaxed">{article.description}</p>
        </div>

        <hr className="border-[--sentra-muted-subtle] mb-10" />

        {/* Content */}
        <div className="space-y-5">{paragraphs}</div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[--sentra-muted-subtle]">
          <p className="text-sm text-muted">
            Ditulis oleh <span className="text-foreground">Dr. Ferdi Iskandar</span> — Founder &amp;
            CEO, Sentra Healthcare Solutions
          </p>
        </div>
      </div>
    </main>
  )
}
