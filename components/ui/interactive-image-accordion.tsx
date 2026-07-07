// Architected and built by Classy.
'use client'

import Image from 'next/image'
import { useState } from 'react'

// --- Types ---
interface AccordionItemData {
  id: number
  title: string
  imageUrl: string
}

interface AccordionItemProps {
  item: AccordionItemData
  isActive: boolean
  onMouseEnter: () => void
}

// --- Data for the image accordion ---
const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Sentra Clinical Decision Support',
    imageUrl: '/fit1.png',
  },
  {
    id: 2,
    title: 'Roster & Hub',
    imageUrl: '/fit2.png',
  },
  {
    id: 3,
    title: 'Audrey Clinical Consultation',
    imageUrl: '/fit3.png',
  },
  {
    id: 4,
    title: 'Telemedicine',
    imageUrl: '/fit4.png',
  },
  {
    id: 5,
    title: 'ACARS',
    imageUrl: '/fit5.png',
  },
]

// --- Accordion Item Component ---
function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'flex-[4]' : 'flex-[0.5]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${isActive ? 'bg-black/30' : 'bg-black/50'}`}
      />

      {/* Number badge */}
      <span
        className={`
          absolute top-4 left-4 font-jakarta font-bold text-white/80
          transition-all duration-500
          ${isActive ? 'text-5xl' : 'text-lg'}
        `}
      >
        {String(item.id).padStart(2, '0')}
      </span>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-bold font-jakarta whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-6 rotate-0 opacity-100 text-xl'
              : 'bottom-20 left-1/2 -translate-x-1/2 -rotate-90 origin-center opacity-70 text-sm'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  )
}

// --- Main Exported Component ---
export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex items-center justify-center gap-3 h-[450px]">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}
