'use client'

import { motion } from 'framer-motion'

export default function AnnotationLine({
  text,
  delay,
  direction = 'left',
}: {
  text: string
  delay: number
  direction?: 'left' | 'right'
}) {
  return (
    <motion.div
      className={`flex items-center gap-2 mb-2 ${direction === 'right' ? 'justify-end' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      {direction === 'right' && (
        <span className="text-[8px] tracking-[0.12em] text-accent/70 uppercase whitespace-nowrap">
          {text}
        </span>
      )}
      <svg width="48" height="12" viewBox="0 0 48 12" fill="none" className="shrink-0">
        <motion.line
          x1={direction === 'left' ? 0 : 48}
          y1="6"
          x2={direction === 'left' ? 40 : 8}
          y2="6"
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        />
        <motion.circle
          cx={direction === 'left' ? 44 : 4}
          cy="6"
          r="3"
          fill="var(--color-accent)"
          fillOpacity="0.6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
        />
      </svg>
      {direction === 'left' && (
        <span className="text-[8px] tracking-[0.12em] text-accent/70 uppercase whitespace-nowrap">
          {text}
        </span>
      )}
    </motion.div>
  )
}
