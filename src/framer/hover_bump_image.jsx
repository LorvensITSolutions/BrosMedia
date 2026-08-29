// Vite port inspired by Framer Hover Bump Image (Nostromo Studio)
// https://hoverbumpimage-component.framer.website/

import { motion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const springConfig = { stiffness: 280, damping: 22, mass: 0.55 }

export default function HoverBumpImage({
  src,
  alt = '',
  className = '',
  style,
  floatDelay = 0,
}) {
  const ref = useRef(null)
  const pointer = useRef({ x: 0, y: 0, time: 0 })
  const [hovered, setHovered] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const rotate = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const reset = () => {
    x.set(0)
    y.set(0)
    rotate.set(0)
    scale.set(1)
    pointer.current = { x: 0, y: 0, time: 0 }
  }

  const handleMove = (event) => {
    if (reduceMotion) return

    const now = performance.now()
    const prev = pointer.current

    if (prev.time) {
      const dt = Math.max(now - prev.time, 8)
      const vx = (event.clientX - prev.x) / dt
      const vy = (event.clientY - prev.y) / dt
      const speed = Math.hypot(vx, vy)
      const bump = Math.min(speed * 90, 36)

      x.set(vx * bump * 0.55)
      y.set(vy * bump * 0.55)
      rotate.set(vx * 6)
      scale.set(1 + Math.min(speed * 0.18, 0.14))
    }

    pointer.current = { x: event.clientX, y: event.clientY, time: now }
  }

  return (
    <motion.div
      ref={ref}
      className={`hover-bump-image ${className}`.trim()}
      style={{
        ...style,
        x,
        y,
        rotate,
        scale,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        reset()
      }}
      onMouseMove={handleMove}
      animate={
        reduceMotion || hovered
          ? undefined
          : {
              y: [0, -8, 0, 6, 0],
              rotate: [0, -2, 0, 2, 0],
            }
      }
      transition={
        reduceMotion || hovered
          ? undefined
          : {
              duration: 5 + floatDelay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            }
      }
    >
      <img src={src} alt={alt} draggable={false} />
    </motion.div>
  )
}
