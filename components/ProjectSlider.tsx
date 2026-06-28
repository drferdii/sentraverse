// Architected and built by Classy.
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/hero.png", alt: "Sentra Clinical Dashboard - AI Healthcare UI" },
  { src: "/hero2.png", alt: "Sentra Patient Overview - Real-time Medical Tracking", position: "center 60%" },
  { src: "/hero3.png", alt: "Sentra Analytics - Prognosis Intelligence Dashboard" },
];

export default function ProjectSlider() {
  const [active, setActive] = React.useState(0);

  return (
    <section className="py-20 overflow-hidden">
      <div className="flex gap-4 h-[500px] w-full px-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative rounded-2xl overflow-hidden cursor-pointer"
            animate={{ flex: i === active ? 3 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={img.position ? { objectPosition: img.position } : undefined}
              priority={i === 0}
              unoptimized
            />
            {/* Overlay on inactive */}
            <motion.div
              className="absolute inset-0 bg-background"
              animate={{ opacity: i === active ? 0 : 0.5 }}
              transition={{ duration: 0.5 }}
            />
            {/* Dot indicators at bottom */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, j) => (
                <button
                  key={j}
                  type="button"
                  aria-label={`Tampilkan slide ${j + 1}`}
                  onClick={(e) => { e.stopPropagation(); setActive(j); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    j === active ? "bg-accent w-6" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
