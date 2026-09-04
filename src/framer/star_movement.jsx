// Vite port of Framer Interactive Stars / Star movement
// https://framer.com/m/Star-movement-h9mGtc.js@KZmoZKE5vj2WiLKsFfNy

import { useEffect, useRef } from 'react'

export default function StarMovement({
  starCount = 180,
  starSize = 1.5,
  starColor = '#dfff00',
  backgroundColor = '#000000',
  interactionRadius = 180,
  interactionStrength = 5,
  returnSpeed = 0.08,
  className = '',
  style,
}) {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animation = useRef(null)
  const stars = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const createStars = (width, height) => {
      stars.current = Array.from({ length: starCount }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * starSize * 0.7 + starSize * 0.3,
          opacity: Math.random() * 0.6 + 0.4,
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createStars(rect.width, rect.height)
    }

    const drawAnimated = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) {
        animation.current = requestAnimationFrame(drawAnimated)
        return
      }

      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, rect.width, rect.height)

      stars.current.forEach((star) => {
        const dx = star.x - mouse.current.x
        const dy = star.y - mouse.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < interactionRadius) {
          const force = (1 - distance / interactionRadius) * interactionStrength
          const angle = Math.atan2(dy, dx)
          star.x += Math.cos(angle) * force
          star.y += Math.sin(angle) * force
        }

        star.x += (star.baseX - star.x) * returnSpeed
        star.y += (star.baseY - star.y) * returnSpeed

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = starColor
        ctx.globalAlpha = star.opacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animation.current = requestAnimationFrame(drawAnimated)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    resize()
    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', resize)
    animation.current = requestAnimationFrame(drawAnimated)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animation.current !== null) {
        cancelAnimationFrame(animation.current)
        animation.current = null
      }
    }
  }, [
    starCount,
    starSize,
    starColor,
    backgroundColor,
    interactionRadius,
    interactionStrength,
    returnSpeed,
  ])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'absolute',
        inset: 0,
        ...style,
      }}
    />
  )
}
