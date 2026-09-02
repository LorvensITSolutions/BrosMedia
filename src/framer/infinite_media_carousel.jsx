// Vite port of Framer Infinite Media Carousel
// https://framer.com/m/InfiniteMediaCarousel-1YpspB.js@rkUsUWE0kzbFURmpfr6y

import { useEffect, useRef } from 'react'
import MediaCarousel from './infinite_media_carousel.source.js'

export { default as MediaCarousel } from './infinite_media_carousel.source.js'

function deepMerge(base, override) {
  if (!override) return { ...base }
  const result = { ...base }

  for (const key of Object.keys(override)) {
    const value = override[key]
    const baseValue = base[key]

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue, value)
    } else {
      result[key] = value
    }
  }

  return result
}

export default function InfiniteMediaCarousel({
  items,
  theme = {},
  className = '',
  style,
  minHeight,
  onVideoOpen,
  ...overrides
}) {
  const props = deepMerge(MediaCarousel.defaultProps, {
    ...theme,
    ...overrides,
    items: items ?? MediaCarousel.defaultProps.items,
  })

  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const unlockScroll = (node) => {
      node.removeAttribute('data-lenis-prevent')
      node.style.touchAction = 'auto'
      node.style.overscrollBehavior = 'auto'
    }

    root.querySelectorAll('.carousel-wrap, .card, video').forEach(unlockScroll)

    const observer = new MutationObserver(() => {
      root.querySelectorAll('.carousel-wrap, .card, video').forEach(unlockScroll)
    })
    observer.observe(root, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const clearHovered = () => {
      root.querySelectorAll('.card.is-hovered').forEach((card) => {
        card.classList.remove('is-hovered')
      })
    }

    const onPointerOver = (event) => {
      const card = event.target.closest('.card')
      if (!card || !root.contains(card)) return
      clearHovered()
      card.classList.add('is-hovered')
    }

    const onPointerOut = (event) => {
      const card = event.target.closest('.card')
      if (!card || !root.contains(card)) return
      const next = event.relatedTarget
      if (next && card.contains(next)) return
      card.classList.remove('is-hovered')
    }

    root.addEventListener('pointerover', onPointerOver)
    root.addEventListener('pointerout', onPointerOut)

    return () => {
      root.removeEventListener('pointerover', onPointerOver)
      root.removeEventListener('pointerout', onPointerOut)
      clearHovered()
    }
  }, [items])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !onVideoOpen) return undefined

    const handleClick = (event) => {
      if (
        event.target.closest(
          '.nav-btn, .ctrl-btn, .expand-btn, .card-action-btn, .sound-btn, .play-btn',
        )
      ) {
        return
      }

      const card = event.target.closest('.card')
      if (!card || card.dataset.type !== 'mp4') return

      const idx = Number.parseInt(card.dataset.index ?? '0', 10)
      const item = items?.[idx]
      if (!item?.video) return

      event.stopImmediatePropagation()
      onVideoOpen({ src: item.video, title: item.title || '' })
    }

    root.addEventListener('click', handleClick, true)
    return () => root.removeEventListener('click', handleClick, true)
  }, [items, onVideoOpen])

  return (
    <div
      ref={rootRef}
      className={`infinite-media-carousel reels-work-carousel w-full ${className}`}
      style={{
        minHeight: minHeight ? `${minHeight}px` : 'min(560px, 72svh)',
        ...style,
      }}
    >
      <MediaCarousel {...props} />
    </div>
  )
}
