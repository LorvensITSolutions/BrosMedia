import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function HeroCinematicBackground() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 28 })
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 28 })

  const glowX = useTransform(smoothX, [0, 1], [-18, 18])
  const glowY = useTransform(smoothY, [0, 1], [-12, 12])
  const gridX = useTransform(smoothX, [0, 1], [-6, 6])
  const gridY = useTransform(smoothY, [0, 1], [-4, 4])

  useEffect(() => {
    const el = containerRef.current?.closest('#hero')
    if (!el) return undefined

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return undefined

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((event.clientX - rect.left) / rect.width)
      mouseY.set((event.clientY - rect.top) / rect.height)
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-cinematic-base absolute inset-0" />

      <motion.div
        className="hero-cinematic-glow-green absolute inset-0"
        style={{ x: glowX, y: glowY }}
      />
      <motion.div
        className="hero-cinematic-glow-blue absolute inset-0"
        style={{ x: glowX, y: glowY }}
      />

      <motion.div
        className="hero-cinematic-grid absolute inset-0"
        style={{ x: gridX, y: gridY }}
      />

      <div className="hero-cinematic-haze absolute inset-0" />
      <div className="hero-cinematic-vignette absolute inset-0" />
      <div className="hero-cinematic-center-clear absolute inset-0" />
      <div className="hero-cinematic-grain absolute inset-0" />
    </div>
  )
}
