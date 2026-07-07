// Architected and built by Classy.
'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { siteLinks } from '@/lib/site-links'

const news = [
  {
    id: 1,
    category: 'Transformation',
    date: '16 March 2026',
    title: 'Peran Generative AI dalam Reduksi Beban Administrasi Medis',
    image: 'https://cdn-images-1.medium.com/max/1024/1*OPoHojwDZDADu9lQhthO9w.png',
    href: 'https://medium.com/@classy.id/peran-generative-ai-dalam-reduksi-beban-administrasi-medis-243ea04f69b4',
  },
  {
    id: 2,
    category: 'Medical AI',
    date: '13 March 2026',
    title: 'MedGemma 27B & CDDS: Masa Depan AI Multimodal untuk Praktik Kedokteran Modern',
    image: 'https://cdn-images-1.medium.com/max/1024/1*WVhbwJ_h31y6BjY_yBTjWg.png',
    href: 'https://medium.com/@classy.id/medgemma-27b-cdds-masa-depan-ai-multimodal-untuk-praktik-kedokteran-modern-9629d17b08d9',
  },
  {
    id: 3,
    category: 'Research',
    date: '9 March 2026',
    title:
      "Menyelaraskan Visi dan Implementasi: Refleksi CEO dan Peneliti atas 'Modeling Medical Diagnosis'",
    image: 'https://framerusercontent.com/images/HsYaZwcOjsAR48C6Ud92zHaB7k.jpg',
    href: 'https://medium.com/@classy.id/menyelaraskan-visi-dan-implementasi-refleksi-ceo-dan-peneliti-atas-modeling-medical-diagnosis-5a3532a0af7e',
  },
  {
    id: 4,
    category: 'Clinical',
    date: '8 March 2026',
    title:
      'Di Balik Layar Algoritma: Artificial Intelligence dan Masa Depan Empati Dokter di Indonesia',
    image: 'https://cdn-images-1.medium.com/max/1024/1*3A3LRBTiH5JQHSZRu9QqaQ.png',
    href: 'https://medium.com/@classy.id/di-balik-layar-algoritma-ai-dan-masa-depan-empati-dokter-di-indonesia-8fb3943b22d9',
  },
]

export default function News() {
  return (
    <section id="insights" className="py-24 border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-bold tracking-widest text-accent uppercase">Insights</p>
            <h2 className="text-[32px] md:text-[45px] font-bold text-foreground">
              Research & Engineering
            </h2>
          </div>
          <p className="text-lg text-muted max-w-[400px] leading-relaxed">
            Telusuri keputusan engineering kami, metode validasi klinis, dan sains komputasional di
            balik arsitektur diagnostik Sentra.
          </p>
        </div>

        <div className="flex flex-col border-t border-muted/20">
          {news.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row justify-between items-center py-10 border-b border-muted/20 transition-all hover:bg-muted/5 px-4"
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted">
                  <span>{item.category}</span>
                  <div className="w-1 h-1 rounded-full bg-muted/20" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors max-w-[800px]">
                  {item.title}
                </h3>
              </div>

              <div className="relative w-full md:w-[134px] aspect-square rounded-lg overflow-hidden mt-6 md:mt-0 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 rotate-[10deg] group-hover:rotate-0 transition-all duration-500">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href={siteLinks.insights} className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-all">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-muted group-hover:text-accent transition-all">
              View All Insights
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
