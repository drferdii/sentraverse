// Architected and built by Classy.
'use client'

import gsap from 'gsap'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'

// --- Types ---
interface SentraKineticNavProps {
  isOpen: boolean
  onClose: () => void
}

// --- Menu Items ---
const menuItems = [
  { label: 'Our Story', href: '/story', shape: '1' },
  { label: 'Services', href: '#services', shape: '2' },
  { label: 'Audrey', href: '#audrey', shape: '3' },
  { label: 'Insights', href: '#insights', shape: '4' },
]

// --- Main Component ---
export function SentraKineticNav({ isOpen, onClose }: SentraKineticNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)

  // Stable onClose reference
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Initial Setup & Hover Effects (run once)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (!hasInitialized.current) {
      gsap.defaults({ ease: 'power2.out', duration: 0.7 })
      hasInitialized.current = true
    }

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll('[data-shape]')
      const shapesBox = container.querySelector('[data-shapes]')

      items.forEach((item) => {
        const idx = item.getAttribute('data-shape')
        const shape = shapesBox?.querySelector(`[data-shape-id="${idx}"]`)
        if (!shape) return

        const els = shape.querySelectorAll('[data-shape-el]')

        const onEnter = () => {
          shapesBox
            ?.querySelectorAll('[data-shape-id]')
            .forEach((s) => gsap.to(s, { opacity: 0, duration: 0.2 }))

          gsap.to(shape, { opacity: 1, duration: 0.3 })
          gsap.fromTo(
            els,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'back.out(1.7)',
              overwrite: 'auto',
            }
          )
        }

        const onLeave = () => {
          gsap.to(els, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            overwrite: 'auto',
          })
          gsap.to(shape, { opacity: 0, duration: 0.4, delay: 0.2 })
        }

        item.addEventListener('mouseenter', onEnter)
        item.addEventListener('mouseleave', onLeave)

        ;(item as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
          item.removeEventListener('mouseenter', onEnter)
          item.removeEventListener('mouseleave', onLeave)
        }
      })
    }, containerRef)

    return () => {
      ctx.revert()
      if (container) {
        container.querySelectorAll('[data-shape]').forEach((item) => {
          const el = item as HTMLElement & { _cleanup?: () => void }
          el._cleanup?.()
        })
      }
    }
  }, [])

  // Menu Open/Close Animation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const wrapper = container.querySelector('[data-nav-wrapper]')
      const panel = container.querySelector('[data-nav-panel]')
      const overlay = container.querySelector('[data-nav-overlay]')
      const backdrops = container.querySelectorAll('[data-backdrop]')
      const links = container.querySelectorAll('[data-nav-link]')
      const fadeEls = container.querySelectorAll('[data-fade]')
      const closeBtn = container.querySelector('[data-close-btn]')

      const tl = gsap.timeline()

      if (isOpen) {
        tl.set(wrapper, { display: 'block' })
          .set(panel, { x: 0 })
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
          .fromTo(backdrops, { x: '101%' }, { x: '0%', stagger: 0.12, duration: 0.575 }, '<')
          .fromTo(
            closeBtn,
            { autoAlpha: 0, rotate: -90 },
            { autoAlpha: 1, rotate: 0, duration: 0.4 },
            '<+=0.3'
          )
          .fromTo(
            links,
            { y: '140%', rotate: 10 },
            { y: '0%', rotate: 0, stagger: 0.06 },
            '<+=0.15'
          )

        if (fadeEls.length) {
          tl.fromTo(
            fadeEls,
            { autoAlpha: 0, y: '40%' },
            { autoAlpha: 1, y: '0%', stagger: 0.04, clearProps: 'all' },
            '<+=0.2'
          )
        }
      } else {
        tl.to(overlay, { autoAlpha: 0, duration: 0.4 })
          .to(panel, { x: '120%', duration: 0.5 }, '<')
          .to(closeBtn, { autoAlpha: 0, duration: 0.2 }, '<')
          .set(wrapper, { display: 'none' })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isOpen])

  // Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen])

  const handleLinkClick = useCallback(() => {
    onCloseRef.current()
  }, [])

  return (
    <div ref={containerRef}>
      {/* Wrapper — fixed fullscreen */}
      <div
        data-nav-wrapper
        className="fixed inset-0 z-[100] pointer-events-auto"
        style={{ display: 'none' }}
      >
        {/* Dark Overlay */}
        <div
          data-nav-overlay
          className="absolute inset-0 bg-black/65 backdrop-blur-md cursor-pointer invisible opacity-0"
          onClick={onClose}
        />

        {/* Slide-in Panel — inline transform so GSAP can control it */}
        <nav
          data-nav-panel
          className="absolute top-0 right-0 w-full max-w-[560px] h-full overflow-y-auto overflow-x-hidden sm:max-w-[560px]"
          style={{ transform: 'translateX(120%)' }}
        >
          {/* Layered Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              data-backdrop
              className="absolute inset-0"
              style={{ background: '#111110', transform: 'translateX(101%)' }}
            />
            <div
              data-backdrop
              className="absolute inset-0"
              style={{ background: '#17160f', transform: 'translateX(101%)' }}
            />
            <div
              data-backdrop
              className="absolute inset-0"
              style={{ background: '#1c1b17', transform: 'translateX(101%)' }}
            />

            {/* Ambient Shapes Container */}
            <div data-shapes className="absolute inset-0 pointer-events-none">
              {/* Shape 1: Coral circles */}
              <svg
                data-shape-id="1"
                className="absolute w-[85%] h-[85%] opacity-0"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle data-shape-el cx="80" cy="120" r="40" fill="rgba(235,89,57,0.15)" />
                <circle data-shape-el cx="300" cy="80" r="60" fill="rgba(183,171,152,0.1)" />
                <circle data-shape-el cx="200" cy="300" r="80" fill="rgba(235,89,57,0.08)" />
                <circle data-shape-el cx="350" cy="280" r="30" fill="rgba(183,171,152,0.12)" />
              </svg>

              {/* Shape 2: Waves */}
              <svg
                data-shape-id="2"
                className="absolute w-[85%] h-[85%] opacity-0"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                viewBox="0 0 400 400"
                fill="none"
              >
                <path
                  data-shape-el
                  d="M0 200 Q100 100, 200 200 T 400 200"
                  stroke="rgba(235,89,57,0.18)"
                  strokeWidth="60"
                  fill="none"
                />
                <path
                  data-shape-el
                  d="M0 280 Q100 180, 200 280 T 400 280"
                  stroke="rgba(183,171,152,0.1)"
                  strokeWidth="40"
                  fill="none"
                />
              </svg>

              {/* Shape 3: Grid dots */}
              <svg
                data-shape-id="3"
                className="absolute w-[85%] h-[85%] opacity-0"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle data-shape-el cx="50" cy="50" r="8" fill="rgba(235,89,57,0.25)" />
                <circle data-shape-el cx="150" cy="50" r="8" fill="rgba(183,171,152,0.2)" />
                <circle data-shape-el cx="250" cy="50" r="8" fill="rgba(235,89,57,0.2)" />
                <circle data-shape-el cx="350" cy="50" r="8" fill="rgba(183,171,152,0.25)" />
                <circle data-shape-el cx="100" cy="150" r="12" fill="rgba(235,89,57,0.15)" />
                <circle data-shape-el cx="200" cy="150" r="12" fill="rgba(183,171,152,0.15)" />
                <circle data-shape-el cx="300" cy="150" r="12" fill="rgba(235,89,57,0.18)" />
                <circle data-shape-el cx="50" cy="250" r="10" fill="rgba(183,171,152,0.2)" />
                <circle data-shape-el cx="150" cy="250" r="10" fill="rgba(235,89,57,0.2)" />
                <circle data-shape-el cx="250" cy="250" r="10" fill="rgba(183,171,152,0.18)" />
                <circle data-shape-el cx="350" cy="250" r="10" fill="rgba(235,89,57,0.15)" />
              </svg>

              {/* Shape 4: Organic blobs */}
              <svg
                data-shape-id="4"
                className="absolute w-[85%] h-[85%] opacity-0"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                viewBox="0 0 400 400"
                fill="none"
              >
                <path
                  data-shape-el
                  d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                  fill="rgba(235,89,57,0.1)"
                />
                <path
                  data-shape-el
                  d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                  fill="rgba(183,171,152,0.08)"
                />
              </svg>
            </div>
          </div>

          {/* Close Button */}
          <button
            data-close-btn
            className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-foreground/20 text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all cursor-pointer invisible opacity-0"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 pt-20 pb-8">
            {/* Links */}
            <ul className="list-none m-0 p-0 flex flex-col gap-1">
              {menuItems.map((item) => (
                <li key={item.label} className="overflow-hidden" data-shape={item.shape}>
                  <Link
                    href={item.href}
                    data-nav-link
                    className="block relative py-2 px-3 rounded-lg no-underline group"
                    onClick={handleLinkClick}
                  >
                    <span className="relative z-[2] block font-jakarta font-bold text-foreground group-hover:text-accent transition-colors duration-300 text-[clamp(2.5rem,5vw,4rem)] leading-[1.15]">
                      {item.label}
                    </span>
                    <div className="absolute inset-0 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="mt-auto pt-8" data-fade>
              <div className="flex flex-col gap-0.5 mb-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent m-0">
                  Email
                </p>
                <p className="text-sm text-muted m-0">drferdiiskandar@melinda.co.id</p>
              </div>
              <div className="flex flex-col gap-0.5 mb-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent m-0">
                  Lokasi
                </p>
                <p className="text-sm text-muted m-0">
                  Laboratorium Technology RSIA Melinda DHAI, Kediri, Jawa Timur, Indonesia
                </p>
              </div>
              <div className="h-px bg-foreground/10 my-5" />
              <p className="text-xs text-foreground/30 m-0">
                &copy;2026 Sentra Healthcare Solutions
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
