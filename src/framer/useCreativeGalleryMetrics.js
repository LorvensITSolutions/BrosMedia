import { useEffect, useState } from 'react'

export const PANEL_HEIGHT = 'calc(100svh - var(--navbar-height))'

export function getNavbarHeightPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 60
}

function getLayout(width) {
  if (width < 640) {
    return { cardsVisible: 1.15, gap: 14, headerSpace: 100 }
  }
  if (width < 768) {
    return { cardsVisible: 1.4, gap: 16, headerSpace: 104 }
  }
  if (width < 1024) {
    return { cardsVisible: 2.35, gap: 16, headerSpace: 108 }
  }
  if (width < 1280) {
    return { cardsVisible: 3.1, gap: 18, headerSpace: 112 }
  }
  return { cardsVisible: 3.55, gap: 20, headerSpace: 116 }
}

export function computeGalleryMetrics(width, imageCount, navHeight = getNavbarHeightPx()) {
  const layout = getLayout(width)
  const maxContent = 1280
  const contentWidth = Math.min(width, maxContent)
  const horizontalPadding = width < 640 ? 12 : width < 1024 ? 16 : 24
  const viewportWidth = Math.max(contentWidth - horizontalPadding * 2, 280)

  const cardWidth = Math.floor(
    (viewportWidth - layout.gap * (Math.ceil(layout.cardsVisible) - 1)) / layout.cardsVisible,
  )

  const panelHeightPx = Math.max(window.innerHeight - navHeight, 420)
  const galleryAreaHeight = panelHeightPx - layout.headerSpace - (width < 640 ? 20 : 32)
  const cardHeight = Math.min(
    Math.max(Math.floor(galleryAreaHeight * 0.92), width < 640 ? 300 : 340),
    width < 640 ? 440 : 520,
  )

  const totalTrackWidth =
    imageCount * cardWidth + Math.max(imageCount - 1, 0) * layout.gap
  const maxOffset = Math.max(0, totalTrackWidth - viewportWidth)
  const scrollDistance = maxOffset

  return {
    cardWidth,
    cardHeight,
    gap: layout.gap,
    maxOffset,
    scrollDistance,
    viewportWidth,
    horizontalPadding,
    cardsVisible: layout.cardsVisible,
    panelHeightPx,
    sectionHeightPx: panelHeightPx + scrollDistance,
    sectionHeight:
      scrollDistance > 0
        ? `calc(${PANEL_HEIGHT} + ${scrollDistance}px)`
        : PANEL_HEIGHT,
  }
}

export function useCreativeGalleryMetrics(imageCount = 0) {
  const [metrics, setMetrics] = useState(() =>
    computeGalleryMetrics(window.innerWidth, imageCount),
  )

  useEffect(() => {
    const update = () => setMetrics(computeGalleryMetrics(window.innerWidth, imageCount))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [imageCount])

  return metrics
}
