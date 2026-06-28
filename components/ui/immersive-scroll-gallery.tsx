// Architected and built by Classy.
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

// --- Types ---
interface PictureData {
  src: string;
  scale: MotionValue<number>;
}

interface ImmersiveScrollGalleryProps {
  images?: { src: string }[];
  overlayText?: string;
  className?: string;
}

// --- Default images (local assets — fit6, fit7, fit8, fi9 not used in Showcase) ---
const DEFAULT_IMAGES = [
  { src: "/fit6.png" },
  { src: "/fit7.png" },
  { src: "/fit8.png" },
  { src: "/fi9.png" },
  { src: "/fit6.png" },
  { src: "/fit8.png" },
  { src: "/fit7.png" },
];

// --- Grid positions for the 7 images ---
const IMAGE_STYLES = [
  "w-[25vw] h-[25vh]",
  "w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
  "w-[20vw] h-[55vh] -top-[15vh] -left-[25vw]",
  "w-[25vw] h-[25vh] left-[27.5vw]",
  "w-[20vw] h-[30vh] top-[30vh] left-[5vw]",
  "w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
  "w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]",
];

const DEFAULT_OVERLAY_TEXT =
  "Sentra menghadirkan konvergensi antara kecerdasan klinis dan teknologi komputasional — membangun masa depan di mana setiap keputusan medis didukung oleh presisi data real-time, tanpa menggantikan penilaian dokter sebagai otoritas akhir.";

// --- Main Component ---
export default function ImmersiveScrollGallery({
  images = DEFAULT_IMAGES,
  overlayText = DEFAULT_OVERLAY_TEXT,
  className = "",
}: ImmersiveScrollGalleryProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Scale transforms — called at top level (not inside JSX)
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const opacityImage = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacityText = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const scaleText = useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const pictures: PictureData[] = images.map((img, index) => ({
    src: img.src,
    scale: scales[index % 7],
  }));

  return (
    <div ref={container} className={`relative h-[200vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* Zooming Images */}
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale, opacity: opacityImage }}
            className="absolute flex items-center justify-center w-full h-full top-0"
          >
            <div className={`relative ${IMAGE_STYLES[index]}`}>
              <Image
                src={src}
                alt={`Sentra feature ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="35vw"
              />
            </div>
          </motion.div>
        ))}

        {/* Overlay Text Section */}
        <motion.div
          style={{ opacity: opacityText, scale: scaleText }}
          className="w-full h-full flex items-center justify-center max-w-3xl mx-auto p-8 relative"
        >
          <h2
            className="text-foreground text-2xl md:text-4xl font-light font-jakarta leading-relaxed text-center"
          >
            {overlayText}
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
