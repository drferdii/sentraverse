// Architected and built by Classy.
"use client"

import type React from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MagneticTextProps {
  text: string
  hoverText?: string
  className?: string
}

export function MagneticText({ text = "CREATIVE", hoverText = "EXPLORE", className }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const innerTextRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15)

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePos.current = { x, y }
    currentPos.current = { x, y }
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-flex items-center justify-center cursor-none select-none", className)}
    >
      <span className="text-5xl font-bold tracking-tighter tracking-wide">{text}</span>

      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full overflow-hidden"
        style={{
          width: isHovered ? 150 : 0,
          height: isHovered ? 150 : 0,
          background: "#1a1a1a",
          transition: "width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform, width, height",
        }}
      >
        <div
          ref={innerTextRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          <span className="text-5xl font-bold tracking-tighter whitespace-nowrap tracking-wide" style={{ color: "#ffffff" }}>
            {hoverText}
          </span>
        </div>
      </div>
    </div>
  )
}
