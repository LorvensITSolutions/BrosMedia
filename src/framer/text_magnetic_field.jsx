// Vite port of Framer TextMagneticField
// https://framer.com/m/TextMagneticField-VDT8Mb.js@rBbQ7GbmYidciAkhq3jM

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_FONT =
  "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

function parseColor(color) {
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i)
  if (hexMatch) {
    let hex = hexMatch[1]
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    }
  }

  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    }
  }

  return null
}

function lerpColor(colorA, colorB, t) {
  const a = parseColor(colorA) || { r: 255, g: 255, b: 255 }
  const b = parseColor(colorB) || { r: 200, g: 200, b: 200 }
  const clamped = Math.max(0, Math.min(1, t))
  const r = Math.round(a.r + (b.r - a.r) * clamped)
  const g = Math.round(a.g + (b.g - a.g) * clamped)
  const bl = Math.round(a.b + (b.b - a.b) * clamped)
  return `rgb(${r}, ${g}, ${bl})`
}

function buildCharData(lines) {
  let idx = 0
  const charsByLine = lines.map((line, lineIndex) =>
    line.split('').map((char) => {
      if (char === ' ') return { char, isSpace: true, waveIndex: -1, lineIndex }
      const info = { char, isSpace: false, waveIndex: idx, lineIndex }
      idx += 1
      return info
    }),
  )
  return { charsByLine, totalNonSpace: idx }
}

function computeMagnetic(charX, charY, mouseX, mouseY, radius, strength, rotationAmount, mode) {
  const distX = charX - mouseX
  const distY = charY - mouseY
  const dist = Math.sqrt(distX * distX + distY * distY)
  if (dist > radius || dist < 0.01) {
    return { dx: 0, dy: 0, rotate: 0, scale: 1, proximity: 0 }
  }

  const normalizedDist = dist / radius
  const falloff = 1 - normalizedDist * normalizedDist * normalizedDist
  const proximity = falloff
  const dirX = distX / dist
  const dirY = distY / dist
  let dx = 0
  let dy = 0
  let rotate = 0

  switch (mode) {
    case 'attract': {
      const force = falloff * strength * 0.6
      dx = -dirX * force
      dy = -dirY * force
      rotate = -dirX * falloff * rotationAmount * 0.4
      break
    }
    case 'vortex': {
      const force = falloff * strength * 0.8
      const perpX = -dirY
      const perpY = dirX
      dx = perpX * force + dirX * force * 0.15
      dy = perpY * force + dirY * force * 0.15
      rotate = Math.atan2(perpY, perpX) * (180 / Math.PI) * falloff * (rotationAmount / 20)
      break
    }
    default: {
      const force = falloff * strength
      dx = dirX * force
      dy = dirY * force
      rotate = dirX * falloff * rotationAmount * 0.5
    }
  }

  const scale = 1 + falloff * 0.08
  return { dx, dy, rotate, scale: Math.min(1.12, scale), proximity }
}

function computeIdleBreathing(charIndex, totalChars, time) {
  const normalizedIndex = totalChars > 1 ? charIndex / (totalChars - 1) : 0.5
  const wave1 = Math.sin(time * 0.8 + normalizedIndex * Math.PI * 2.5) * 0.55
  const wave2 = Math.sin(time * 1.4 + normalizedIndex * Math.PI * 4 + 1.5) * 0.25
  const wave3 = Math.sin(time * 0.45 + charIndex * 0.3 + 2.8) * 0.2
  const combined = wave1 + wave2 + wave3
  return { y: combined * 4, scale: 1 + combined * 0.015 }
}

function useResponsiveFontSize(desktop, mobile) {
  const [size, setSize] = useState(mobile)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)')
    const update = () => setSize(media.matches ? desktop : mobile)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [desktop, mobile])

  return size
}

export default function TextMagneticField({
  text = 'MAGNETIC\nFIELD',
  fontSize: fontSizeProp,
  desktopFontSize = 96,
  mobileFontSize = 52,
  letterSpacing = -2,
  lineHeight = 0.88,
  textAlign = 'center',
  uppercase = true,
  textColor = '#dfff00',
  wakeColorA = '#dfff00',
  wakeColorB = '#1e45ff',
  fieldMode = 'repel',
  fieldRadius = 150,
  fieldStrength = 25,
  fieldElasticity = 0.12,
  fieldRotation = 8,
  wakeEnabled = true,
  wakeIntensity = 0.8,
  wakeDecay = 0.92,
  idleAnimation = true,
  className = '',
  style,
}) {
  const responsiveFontSize = useResponsiveFontSize(desktopFontSize, mobileFontSize)
  const fontSize = fontSizeProp ?? responsiveFontSize

  const displayText = uppercase ? text.toUpperCase() : text
  const lines = useMemo(() => displayText.split('\n'), [displayText, uppercase])
  const { charsByLine, totalNonSpace } = useMemo(() => buildCharData(lines), [lines])
  const spaceWidth = fontSize * 0.3
  const justifyContent =
    textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center'

  const containerRef = useRef(null)
  const charRefsMap = useRef(new Map())
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const wakeTrailRef = useRef(new Float32Array(totalNonSpace))
  const rafRef = useRef(null)
  const timeRef = useRef(0)
  const lastTsRef = useRef(null)
  const positionCacheRef = useRef(new Map())
  const cacheInvalidatedRef = useRef(true)
  const currentPositions = useRef(
    Array.from({ length: totalNonSpace }, () => ({ dx: 0, dy: 0, rotate: 0, scale: 1 })),
  )
  const [isInView, setIsInView] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    wakeTrailRef.current = new Float32Array(totalNonSpace)
    currentPositions.current = Array.from({ length: totalNonSpace }, () => ({
      dx: 0,
      dy: 0,
      rotate: 0,
      scale: 1,
    }))
    positionCacheRef.current.clear()
    cacheInvalidatedRef.current = true
  }, [totalNonSpace])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return undefined

    const invalidate = () => {
      cacheInvalidatedRef.current = true
    }

    window.addEventListener('resize', invalidate)
    window.addEventListener('scroll', invalidate, true)
    return () => {
      window.removeEventListener('resize', invalidate)
      window.removeEventListener('scroll', invalidate, true)
    }
  }, [isInView])

  const handleMouseMove = useCallback((event) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false }
  }, [])

  const setCharRef = useCallback((waveIndex, el) => {
    if (el) charRefsMap.current.set(waveIndex, el)
    else charRefsMap.current.delete(waveIndex)
  }, [])

  const animate = useCallback(
    (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      timeRef.current += dt

      const container = containerRef.current
      if (!container) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const mouse = mouseRef.current
      const wakeTrail = wakeTrailRef.current
      const positions = currentPositions.current
      const time = timeRef.current
      const cache = positionCacheRef.current

      if (cacheInvalidatedRef.current) {
        const containerRect = container.getBoundingClientRect()
        charRefsMap.current.forEach((el, idx) => {
          const r = el.getBoundingClientRect()
          cache.set(idx, {
            cx: r.left - containerRect.left + r.width / 2,
            cy: r.top - containerRect.top + r.height / 2,
          })
        })
        cacheInvalidatedRef.current = false
      }

      charRefsMap.current.forEach((el, waveIndex) => {
        if (waveIndex >= totalNonSpace) return

        const cached = cache.get(waveIndex)
        if (!cached) return

        let target = { dx: 0, dy: 0, rotate: 0, scale: 1, proximity: 0 }
        if (mouse.active && !reduceMotion) {
          target = computeMagnetic(
            cached.cx,
            cached.cy,
            mouse.x,
            mouse.y,
            fieldRadius,
            fieldStrength,
            fieldRotation,
            fieldMode,
          )
        }

        let idleY = 0
        let idleScale = 1
        const isIdle = idleAnimation && !reduceMotion && target.proximity < 0.05
        if (isIdle) {
          const breathing = computeIdleBreathing(waveIndex, totalNonSpace, time)
          idleY = breathing.y
          idleScale = breathing.scale
        }

        const pos = positions[waveIndex]
        const targetDx = target.dx
        const targetDy = target.dy + idleY
        const targetRotate = target.rotate
        const targetScale = target.proximity > 0.05 ? target.scale : idleScale
        const lerpRate = isIdle ? Math.min(0.25, fieldElasticity * 3) : fieldElasticity

        pos.dx += (targetDx - pos.dx) * lerpRate
        pos.dy += (targetDy - pos.dy) * lerpRate
        pos.rotate += (targetRotate - pos.rotate) * lerpRate
        pos.scale += (targetScale - pos.scale) * lerpRate

        if (wakeEnabled) {
          const currentWake = wakeTrail[waveIndex]
          const targetWake = target.proximity * wakeIntensity
          wakeTrail[waveIndex] = Math.max(currentWake * wakeDecay, targetWake)
        }

        const wake = wakeTrail[waveIndex]
        let color = textColor
        if (wakeEnabled && wake > 0.02) {
          const wakeProgress = Math.min(1, wake)
          const midColor = lerpColor(textColor, wakeColorA, wakeProgress * 0.9)
          color = lerpColor(midColor, wakeColorB, wakeProgress * 0.4)
        }

        let textShadow = 'none'
        if (wakeEnabled && wake > 0.05) {
          const glowSize = wake * 12
          const glowOpacity = wake * 0.6
          textShadow = `0 0 ${glowSize}px ${wakeColorA}${Math.round(glowOpacity * 255)
            .toString(16)
            .padStart(2, '0')}, 0 0 ${glowSize * 2}px ${wakeColorB}${Math.round(glowOpacity * 100)
            .toString(16)
            .padStart(2, '0')}`
        }

        el.style.transform = `translate(${pos.dx}px, ${pos.dy}px) rotate(${pos.rotate}deg) scale(${pos.scale})`
        el.style.color = color
        el.style.textShadow = textShadow
      })

      rafRef.current = requestAnimationFrame(animate)
    },
    [
      totalNonSpace,
      fieldRadius,
      fieldStrength,
      fieldRotation,
      fieldMode,
      fieldElasticity,
      wakeEnabled,
      wakeIntensity,
      wakeDecay,
      textColor,
      wakeColorA,
      wakeColorB,
      idleAnimation,
      reduceMotion,
    ],
  )

  useEffect(() => {
    if (!isInView || reduceMotion) return undefined

    lastTsRef.current = null
    cacheInvalidatedRef.current = true
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate, isInView, reduceMotion])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:
          justifyContent === 'center'
            ? 'center'
            : justifyContent === 'flex-end'
              ? 'flex-end'
              : 'flex-start',
        overflow: 'visible',
        isolation: 'isolate',
        cursor: 'default',
        position: 'relative',
        ...style,
      }}
    >
      {charsByLine.map((lineChars, lineIdx) => (
        <div
          key={`line-${lineIdx}`}
          style={{
            display: 'flex',
            justifyContent,
            alignItems: 'baseline',
            lineHeight,
          }}
        >
          {lineChars.map((ci, i) => {
            if (ci.isSpace) {
              return <span key={`space-${lineIdx}-${i}`} style={{ display: 'inline-block', width: spaceWidth }} />
            }

            return (
              <span
                key={`char-${lineIdx}-${i}`}
                ref={(el) => setCharRef(ci.waveIndex, el)}
                style={{
                  display: 'inline-block',
                  fontFamily: DEFAULT_FONT,
                  fontWeight: 900,
                  fontSize,
                  letterSpacing: `${letterSpacing}px`,
                  lineHeight,
                  color: textColor,
                  willChange: 'transform, color, text-shadow',
                }}
              >
                {ci.char}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}
