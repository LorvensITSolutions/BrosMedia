// Vite port of Framer Cursor Animations
// https://framer.com/m/Cursor-Animations-Df5N.js@aTQHfQLHloAu1z6wD2ej

import { useCallback, useEffect, useRef, useState } from 'react'

function parseColor(color) {
  const fallback = { r: 223, g: 255, b: 0 }
  if (!color) return fallback

  if (color.startsWith('#')) {
    let hex = color.slice(1)
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('')
    if (hex.length === 8) hex = hex.slice(0, 6)
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    }
  }

  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    }
  }

  return fallback
}

export default function CursorAnimations({
  trailStyle = 'constellation',
  trailColor = '#dfff00',
  particleSize = 6,
  trailIntensity = 6,
  fadeSpeed = 0.4,
  flowSpeed = 0.6,
  backgroundColor = 'transparent',
  zIndex = 20,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const trailPointsRef = useRef([])
  const cometSparksRef = useRef([])
  const bubblesRef = useRef([])
  const animationFrameRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 })
  const isVisibleRef = useRef(true)
  const reducedMotionRef = useRef(false)
  const rgbRef = useRef(parseColor(trailColor))
  const trailColorRef = useRef(trailColor)
  const trailStyleRef = useRef(trailStyle)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(media.matches && !motion.matches)
    update()
    media.addEventListener('change', update)
    motion.addEventListener('change', update)
    return () => {
      media.removeEventListener('change', update)
      motion.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    rgbRef.current = parseColor(trailColor)
    trailColorRef.current = trailColor
  }, [trailColor])

  useEffect(() => {
    trailStyleRef.current = trailStyle
    particlesRef.current = []
    trailPointsRef.current = []
    cometSparksRef.current = []
    bubblesRef.current = []
  }, [trailStyle])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mediaQuery.matches
    const handleChange = (e) => {
      reducedMotionRef.current = e.matches
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!enabled || !containerRef.current) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting
      },
      { threshold: 0 },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [enabled])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!enabled || !canvas || !container) return undefined

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [enabled])

  const spawnParticles = useCallback(
    (x, y, vx, vy) => {
      const now = performance.now()
      const count = Math.min(trailIntensity, 8)
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2
        const spread = particleSize * 0.2
        particlesRef.current.push({
          x: x + Math.cos(angle) * spread * Math.random(),
          y: y + Math.sin(angle) * spread * Math.random(),
          size: particleSize * (0.8 + Math.random() * 0.4),
          opacity: 1,
          birth: now,
          vx: vx * flowSpeed * 0.1 + (Math.random() - 0.5) * 8,
          vy: vy * flowSpeed * 0.1 + (Math.random() - 0.5) * 8,
        })
      }
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100)
      }
    },
    [trailIntensity, particleSize, flowSpeed],
  )

  const handlePointer = useCallback(
    (x, y, lastTimeRef) => {
      const now = performance.now()
      const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001)
      lastTimeRef.current = now
      const vx = (x - mouseRef.current.lastX) / dt
      const vy = (y - mouseRef.current.lastY) / dt
      mouseRef.current = { x, y, lastX: x, lastY: y }
      const dist = Math.sqrt(vx * vx + vy * vy) * dt
      if (dist <= 1.5) return

      const style = trailStyleRef.current
      if (style === 'constellation') {
        spawnParticles(x, y, vx, vy)
      } else if (style === 'ribbon') {
        trailPointsRef.current.push({ x, y, time: now })
        const maxPoints = Math.floor(trailIntensity * 15)
        if (trailPointsRef.current.length > maxPoints) {
          trailPointsRef.current = trailPointsRef.current.slice(-maxPoints)
        }
      } else if (style === 'comet') {
        const sparkCount = Math.floor(trailIntensity * 0.6)
        for (let i = 0; i < sparkCount; i += 1) {
          const angle = Math.atan2(vy, vx) + Math.PI + (Math.random() - 0.5) * 1.2
          const speed = Math.random() * 2 + 0.5
          cometSparksRef.current.push({
            x: x + (Math.random() - 0.5) * 6,
            y: y + (Math.random() - 0.5) * 6,
            size: particleSize * (0.2 + Math.random() * 0.5),
            opacity: 0.8 + Math.random() * 0.2,
            birth: now,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: Math.random() * Math.PI * 2,
            twinkle: Math.random() * Math.PI * 2,
          })
        }
        if (cometSparksRef.current.length > 120) {
          cometSparksRef.current = cometSparksRef.current.slice(-120)
        }
      } else if (style === 'bubbles') {
        const bubbleCount = Math.floor(trailIntensity * 0.4)
        for (let i = 0; i < bubbleCount; i += 1) {
          bubblesRef.current.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            size: particleSize * (0.6 + Math.random() * 1.2),
            opacity: 0.4 + Math.random() * 0.3,
            birth: now,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 0.5,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.03 + Math.random() * 0.04,
          })
        }
        if (bubblesRef.current.length > 80) {
          bubblesRef.current = bubblesRef.current.slice(-80)
        }
      }
    },
    [spawnParticles, trailIntensity, particleSize],
  )

  useEffect(() => {
    if (!enabled) return undefined
    const container = containerRef.current
    if (!container) return undefined

    const lastTimeRef = { current: performance.now() }
    const rect = container.getBoundingClientRect()
    mouseRef.current = {
      x: rect.width / 2,
      y: rect.height / 2,
      lastX: rect.width / 2,
      lastY: rect.height / 2,
    }

    const handleMouseMove = (e) => {
      const bounds = container.getBoundingClientRect()
      handlePointer(e.clientX - bounds.left, e.clientY - bounds.top, lastTimeRef)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled, handlePointer])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!enabled || !canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const maxAge = fadeSpeed * 1000

    const drawRibbon = (points, now) => {
      if (points.length < 2) return
      const rgb = rgbRef.current
      const baseWidth = particleSize * 2
      const activePoints = points.filter((p) => now - p.time < maxAge)
      trailPointsRef.current = activePoints
      if (activePoints.length < 2) return

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (let i = 1; i < activePoints.length; i += 1) {
        const p0 = activePoints[i - 1]
        const p1 = activePoints[i]
        const age0 = (now - p0.time) / maxAge
        const age1 = (now - p1.time) / maxAge
        const opacity = (1 - age1) ** 2 * 0.85
        const width = baseWidth * (1 - age1 * 0.7)
        if (width < 0.5) continue

        const gradient = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y)
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(1 - age0) ** 2 * 0.85})`)
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        if (i < activePoints.length - 1) {
          const p2 = activePoints[i + 1]
          ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
        } else {
          ctx.lineTo(p1.x, p1.y)
        }
        ctx.stroke()
      }
    }

    const drawConstellation = (now) => {
      const rgb = rgbRef.current
      const newParticles = []

      for (const particle of particlesRef.current) {
        const age = now - particle.birth
        if (age > maxAge) continue
        particle.vx *= 0.96
        particle.vy *= 0.96
        particle.x += particle.vx * 0.016
        particle.y += particle.vy * 0.016
        particle.opacity = (1 - age / maxAge) ** 1.5
        const size = particle.size * (1 - (age / maxAge) * 0.2)

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size)
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`)
        gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        newParticles.push(particle)
      }

      const connectLimit = Math.min(newParticles.length, 40)
      ctx.lineWidth = 1
      for (let i = 0; i < connectLimit; i += 1) {
        const p1 = newParticles[i]
        for (let j = i + 1; j < Math.min(i + 5, connectLimit); j += 1) {
          const p2 = newParticles[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < particleSize * 5) {
            const opacity = (1 - dist / (particleSize * 5)) * p1.opacity * p2.opacity * 0.5
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      particlesRef.current = newParticles

      const cursorSize = particleSize * 1.5
      const glowGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        cursorSize * 2.5,
      )
      glowGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`)
      glowGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorSize * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      const coreGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        cursorSize,
      )
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      coreGradient.addColorStop(0.3, trailColorRef.current)
      coreGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`)
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorSize, 0, Math.PI * 2)
      ctx.fillStyle = coreGradient
      ctx.fill()
    }

    const drawComet = (now) => {
      const rgb = rgbRef.current
      const newSparks = []
      for (const spark of cometSparksRef.current) {
        const age = now - spark.birth
        if (age > maxAge) continue
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vx *= 0.98
        spark.vy *= 0.98
        spark.twinkle += 0.15
        const normalizedAge = age / maxAge
        spark.opacity = (1 - normalizedAge) ** 2 * (0.7 + 0.3 * Math.sin(spark.twinkle))
        const size = spark.size * (1 - normalizedAge * 0.5)
        if (size < 0.5) continue

        ctx.save()
        ctx.translate(spark.x, spark.y)
        ctx.rotate(spark.rotation + normalizedAge * 2)
        const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5)
        innerGlow.addColorStop(0, `rgba(255, 255, 255, ${spark.opacity * 0.9})`)
        innerGlow.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${spark.opacity * 0.7})`)
        innerGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
        ctx.beginPath()
        ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = innerGlow
        ctx.fill()
        ctx.strokeStyle = `rgba(255, 255, 255, ${spark.opacity * 0.6})`
        ctx.lineWidth = size * 0.3
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(-size * 1.2, 0)
        ctx.lineTo(size * 1.2, 0)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, -size * 1.2)
        ctx.lineTo(0, size * 1.2)
        ctx.stroke()
        ctx.restore()
        newSparks.push(spark)
      }
      cometSparksRef.current = newSparks

      const headX = mouseRef.current.x
      const headY = mouseRef.current.y
      const headSize = particleSize * 1.2
      const outerGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, headSize * 3)
      outerGlow.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`)
      outerGlow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
      ctx.beginPath()
      ctx.arc(headX, headY, headSize * 3, 0, Math.PI * 2)
      ctx.fillStyle = outerGlow
      ctx.fill()
    }

    const drawBubbles = (now) => {
      const rgb = rgbRef.current
      const newBubbles = []
      for (const bubble of bubblesRef.current) {
        const age = now - bubble.birth
        if (age > maxAge * 1.5) continue
        bubble.wobble += bubble.wobbleSpeed
        bubble.x += bubble.vx + Math.sin(bubble.wobble) * 0.5
        bubble.y += bubble.vy
        bubble.vy *= 0.995
        bubble.vx *= 0.98
        const normalizedAge = age / (maxAge * 1.5)
        const fadeOut = normalizedAge > 0.7 ? 1 - (normalizedAge - 0.7) / 0.3 : 1
        bubble.opacity *= fadeOut
        const size = bubble.size * (1 + normalizedAge * 0.3)
        if (bubble.opacity < 0.05) continue

        ctx.save()
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, size, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bubble.opacity * 0.6})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
        newBubbles.push(bubble)
      }
      bubblesRef.current = newBubbles
    }

    const animate = () => {
      if (!isVisibleRef.current || reducedMotionRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const now = performance.now()
      const rect = containerRef.current?.getBoundingClientRect()
      const width = rect?.width || window.innerWidth
      const height = rect?.height || window.innerHeight
      ctx.clearRect(0, 0, width, height)

      const style = trailStyleRef.current
      if (style === 'ribbon') drawRibbon(trailPointsRef.current, now)
      else if (style === 'comet') drawComet(now)
      else if (style === 'bubbles') drawBubbles(now)
      else drawConstellation(now)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [enabled, fadeSpeed, particleSize])

  if (!enabled) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex,
        backgroundColor,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  )
}
