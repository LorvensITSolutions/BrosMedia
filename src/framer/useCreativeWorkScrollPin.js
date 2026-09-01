import { useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'framer-motion'
import { getNavbarHeightPx, PANEL_HEIGHT } from './useCreativeGalleryMetrics.js'

/**
 * Fixed pin + scroll progress for scroll-driven horizontal galleries.
 * Uses position:fixed while active because ancestor overflow-x breaks CSS sticky.
 */
export function useCreativeWorkScrollPin(sectionRef, scrollDistance) {
  const progress = useMotionValue(0)
  const rafRef = useRef(0)
  const [pinPhase, setPinPhase] = useState('before')

  useEffect(() => {
    const distance = Math.max(scrollDistance, 1)

    const update = () => {
      const section = sectionRef.current
      if (!section) return

      const nav = getNavbarHeightPx()
      const sectionTop = section.offsetTop
      const scrollY = window.scrollY
      const pinStart = sectionTop - nav
      const pinEnd = pinStart + distance

      let phase = 'before'
      let nextProgress = 0

      if (scrollY < pinStart) {
        phase = 'before'
        nextProgress = 0
      } else if (scrollY <= pinEnd) {
        phase = 'pinned'
        nextProgress = (scrollY - pinStart) / distance
      } else {
        phase = 'after'
        nextProgress = 1
      }

      progress.set(nextProgress)
      setPinPhase((prev) => (prev === phase ? prev : phase))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef, scrollDistance, progress])

  return { progress, pinPhase }
}

export function getPinPanelStyle(pinPhase, scrollDistance, navHeight = getNavbarHeightPx()) {
  const base = {
    left: 0,
    right: 0,
    width: '100%',
    height: PANEL_HEIGHT,
    zIndex: pinPhase === 'pinned' ? 30 : 1,
  }

  if (pinPhase === 'pinned') {
    return {
      ...base,
      position: 'fixed',
      top: navHeight,
    }
  }

  return {
    ...base,
    position: 'absolute',
    top: pinPhase === 'after' ? scrollDistance : 0,
  }
}
