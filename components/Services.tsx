// Architected and built by Classy.
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/site-links";

const services = [
  {
    id: "01",
    title: "Synthesia Engine",
    desc: "Mesin NLP klinis real-time yang mentransformasi narasi pasien tidak terstruktur — keluhan, riwayat penyakit, catatan dokter — menjadi entitas medis terstruktur. Melakukan ekstraksi entitas, normalisasi terminologi medis, dan menyintesis input mentah menjadi bahasa klinis standar yang siap diproses oleh modul diagnostik selanjutnya.",
  },
  {
    id: "02",
    title: "Bayesian Algorithm",
    desc: "Mesin probabilitas posterior yang menghitung diagnosis diferensial berdasarkan rasio likelihood gejala, prevalensi klinis, dan faktor risiko spesifik pasien. Menghasilkan hipotesis diagnostik terurut dengan interval kepercayaan untuk validasi dokter.",
  },
  {
    id: "03",
    title: "Clinical Trajectory",
    desc: "Pemetaan trajectory pasien longitudinal yang memvisualisasikan progresi penyakit lintas kunjungan. Mendeteksi anomali tren, memprediksi jendela deteriorasi, dan memungkinkan intervensi klinis dengan presisi waktu yang tepat.",
  },
  {
    id: "04",
    title: "Optical Character Recognition",
    desc: "Kecerdasan dokumen tingkat medis yang mengekstrak data terstruktur dari rekam fisik — hasil laboratorium, radiograf, resep — dengan skor kepercayaan per field. Menghilangkan transkripsi manual sambil mempertahankan akurasi tingkat forensik.",
  },
  {
    id: "05",
    title: "Artificial Intelligence Powered Pharmaceutical",
    desc: "Lapisan farmakovigilans otomatis yang mencocok-silangkan profil medikasi pasien terhadap basis data interaksi obat-obat, rekam alergi, dan kontraindikasi komorbiditas. Menghasilkan peringatan keamanan real-time sebelum finalisasi resep.",
  },
  {
    id: "06",
    title: "Smart Referral & Auto Documentation",
    desc: "Mesin sintesis rujukan cerdas dan dokumentasi klinis otomatis. Menghasilkan ringkasan pemulangan terstandarisasi, surat rujukan, dan catatan kunjungan — mengurangi beban administratif dokter hingga 40%.",
  },
  {
    id: "07",
    title: "Clinical Prognosis",
    desc: "Pemodelan prediktif outcome yang menyintesis data trajectory pasien, profil komorbiditas, dan pola respons terapi untuk menghasilkan asesmen prognostik berbasis evidens. Mendukung pengambilan keputusan klinis dengan timeline terstratifikasi risiko dan proyeksi dampak intervensi.",
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section id="services" className="py-24 border-b border-muted/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-bold tracking-widest text-accent uppercase font-jakarta">Our Service</p>
            <h2 className="text-[32px] md:text-[45px] font-bold text-foreground leading-[1.2] font-jakarta uppercase">
              Introducing the Protocols 7
            </h2>
          </div>
          <div className="flex flex-col gap-10">
            <p className="text-lg text-muted leading-relaxed">
              Sentra menggunakan arsitektur Artificial Intelligence modular yang dirancang khusus untuk alur kerja klinis. Setiap protokol beroperasi sebagai lapisan komputasi independen — dari sintesis bahasa alami dan inferensi Bayesian hingga prognosis prediktif — dirancang untuk mengaugmentasi pengambilan keputusan dokter tanpa mengganggu standar klinis yang berlaku.
            </p>
          </div>
        </div>

        {/* Service List */}
        <div className="flex flex-col border-t border-muted/20">
          {services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <motion.article
                key={service.id}
                layout
                className={`flex flex-col md:flex-row justify-between p-8 border-b border-muted/20 transition-colors duration-500 ${
                  isActive ? "bg-accent" : "hover:bg-muted/5"
                }`}
              >
                <button
                  type="button"
                  aria-controls={`service-panel-${service.id}`}
                  aria-expanded={isActive}
                  onClick={() => setActiveId(isActive ? null : service.id)}
                  className="flex-1 flex flex-col gap-4 text-left"
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-2xl md:text-3xl font-bold font-jakarta transition-colors duration-300 ${
                      isActive ? "text-background" : "text-foreground"
                    }`}>
                      {service.title}
                    </h3>
                    <span className={`text-xl font-bold font-jakarta transition-colors duration-300 ${
                      isActive ? "text-background" : "text-foreground"
                    }`}>
                      {service.id}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        id={`service-panel-${service.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-background text-lg max-w-[800px] leading-relaxed mt-4 overflow-hidden"
                      >
                        {service.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>

                <div className="flex items-start justify-end mt-6 md:mt-0 md:pl-12">
                  <Link
                    href={siteLinks.contact}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                      isActive
                        ? "bg-background text-foreground border-transparent hover:scale-105"
                        : "border-muted text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">Active</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      isActive ? "border-foreground/20" : "border-muted/20"
                    }`}>
                      <ArrowUpRight size={16} />
                    </div>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
