// Architected and built by Classy.
'use client'

import Image from 'next/image'

const images = [
  { src: '/hero-medassist-1.png', alt: 'Sentra Assist clinical intake interface on tablet' },
  {
    src: '/hero-medassist-2.png',
    alt: 'Sentra Assist landing interface on tablet',
    position: 'center 60%',
  },
  { src: '/hero-medassist-3.png', alt: 'Sentra Assist clinical trajectory interface on tablet' },
]

export default function ProjectSlider() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="grid w-full gap-4 px-4 md:grid-cols-3">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-2xl">
            <Image
              src={img.src}
              alt={img.alt}
              width={1122}
              height={1402}
              unoptimized
              priority={i === 0}
              className="h-[500px] w-full object-cover"
              style={img.position ? { objectPosition: img.position } : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
