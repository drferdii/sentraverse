// Architected and built by Classy.
// [APPROVED]
"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/site-links";

export default function About() {
  return (
    <section id="about" className="py-24 border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-20">
        {/* Title Side */}
        <div className="flex flex-col gap-6">
          <p className="text-xs font-bold tracking-widest text-accent uppercase">Tentang Sentra</p>
          <h2 className="text-[32px] md:text-[45px] font-bold text-foreground leading-[1.2]">
            Kami membangun <span className="text-accent">infrastruktur kecerdasan klinis</span> yang mentransformasi data pasien terfragmentasi menjadi kejelasan diagnostik real-time bagi dokter garis depan.
          </h2>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-muted/20 self-stretch" />

        {/* Content Side */}
        <div className="flex flex-col gap-8">
          <h4 className="text-xl md:text-2xl font-bold text-foreground">
            Arsitektur Konvergensi Human-AI: Sentra
          </h4>
          <div className="text-lg text-muted leading-relaxed flex flex-col gap-5">
            <p>
              Sentra adalah manifestasi dari visi strategis Dr. Ferdi Iskandar&mdash;seorang physician-technologist yang mengintegrasikan Artificial Intelligence sebagai mitra co-engineering sejak fase inisiasi. Platform ini tidak sekadar menggunakan teknologi; ia lahir dari sintesa antara intuisi medis dan kecerdasan komputasional.
            </p>
            <ul className="list-none p-0 flex flex-col gap-3">
              <li className="flex gap-3">
                <span className="text-accent font-bold shrink-0">&bull;</span>
                <span><strong className="text-foreground">Spektrum Manusia:</strong> Memegang kendali atas konteks klinis, penalaran etis (ethical reasoning), dan akuntabilitas mutlak.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold shrink-0">&bull;</span>
                <span><strong className="text-foreground">Kapabilitas AI:</strong> Menyediakan kecepatan iteratif, presisi struktural, serta kedalaman analisis data yang melampaui batas kognitif konvensional.</span>
              </li>
            </ul>
            <p>
              Di Sentra, kami tidak membiarkan teknologi memimpin tanpa arah, namun kami juga tidak membiarkan keterbatasan manusia menghambat inovasi. Kami beroperasi dalam harmoni yang terukur:
            </p>
            <p className="text-foreground font-bold italic text-xl">
              &ldquo;Human as the Pilot. AI as the Copilot.&rdquo;
            </p>
          </div>

          <Link
            href={siteLinks.about}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-all">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-muted group-hover:text-accent transition-all">
              Selengkapnya
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
