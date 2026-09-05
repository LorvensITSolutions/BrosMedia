import { useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isProgrammaticScrolling } from '../data/navigation'
import { getNavbarHeightPx, PANEL_HEIGHT } from './useCreativeGalleryMetrics.js'

/**
 * Fixed pin + scroll progress for scroll-driven horizontal galleries.
 * Uses position:fixed while active because ancestor overflow-x breaks CSS sticky.
 */
export function useCreativeWorkScrollPin(sectionRef, scrollDistance, holdDistance = 0) {
  const progress = useMotionValue(0)
  const rafRef = useRef(0)
  const [pinPhase, setPinPhase] = useState('before')

  useEffect(() => {
    const horizontalDistance = Math.max(scrollDistance, 1)
    const hold = Math.max(holdDistance, 0)
    const totalDistance = hold + horizontalDistance

    const update = () => {
      const section = sectionRef.current
      if (!section) return

      const nav = getNavbarHeightPx()
      const sectionTop = section.offsetTop
      const scrollY = window.scrollY
      const pinStart = sectionTop - nav
      const pinEnd = pinStart + totalDistance

      let phase = 'before'
      let nextProgress = 0

      if (scrollY < pinStart) {
        phase = 'before'
        nextProgress = 0
      } else if (scrollY <= pinEnd) {
        phase = 'pinned'
        const scrolled = scrollY - pinStart
        if (scrolled <= hold) {
          nextProgress = 0
        } else {
          nextProgress = Math.min(1, (scrolled - hold) / horizontalDistance)
        }
      } else {
        phase = 'after'
        nextProgress = 1
      }

      progress.set(nextProgress)
      setPinPhase((prev) => {
        // Refreshing ScrollTrigger mid nav-scroll cancels the jump past this pin.
        if (prev !== phase && phase === 'after' && !isProgrammaticScrolling()) {
          requestAnimationFrame(() => ScrollTrigger.refresh())
        }
        return prev === phase ? prev : phase
      })
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
  }, [sectionRef, scrollDistance, holdDistance, progress])

  return { progress, pinPhase }
}

export function getPinPanelStyle(
  pinPhase,
  totalScrollDistance,
  navHeight = getNavbarHeightPx(),
) {
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
    top: pinPhase === 'after' ? totalScrollDistance : 0,
  }
}
