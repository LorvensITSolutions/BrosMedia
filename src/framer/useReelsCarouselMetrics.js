import { useEffect, useState } from 'react'

/** Matches default reels theme (268 × 448). */
const REEL_HEIGHT_RATIO = 448 / 268

function getLayout(width) {
  if (width < 480) {
    return {
      cardsPeek: 1,
      gap: 8,
      horizontalPadding: 10,
      maxContent: width,
      cardWidthMin: 220,
      cardWidthMax: 9999,
      maxCardHeight: Math.round(width * 1.05),
      minCarouselHeight: 340,
      borderRadius: 12,
      maxScale: 1.03,
      minScale: 0.94,
      inactiveOpacity: 0.72,
      activeDistance: 80,
      titleFontSize: 14,
    }
  }

  if (width < 640) {
    return {
      cardsPeek: 1.06,
      gap: 10,
      horizontalPadding: 12,
      maxContent: width,
      cardWidthMin: 240,
      cardWidthMax: 9999,
      maxCardHeight: Math.round(Math.min(window.innerHeight * 0.54, 500)),
      minCarouselHeight: 360,
      borderRadius: 12,
      maxScale: 1.04,
      minScale: 0.92,
      inactiveOpacity: 0.68,
      activeDistance: 90,
      titleFontSize: 14,
    }
  }

  if (width < 768) {
    return {
      cardsPeek: 1.35,
      gap: 10,
      horizontalPadding: 14,
      maxContent: 720,
      cardWidthMin: 248,
      cardWidthMax: 272,
      maxCardHeight: 460,
      minCarouselHeight: 440,
      borderRadius: 13,
      maxScale: 1.05,
      minScale: 0.9,
      inactiveOpacity: 0.62,
      activeDistance: 100,
      titleFontSize: 14,
    }
  }

  if (width < 1024) {
    return {
      cardsPeek: 2.1,
      gap: 10,
      horizontalPadding: 16,
      maxContent: 960,
      cardWidthMin: 252,
      cardWidthMax: 278,
      maxCardHeight: 480,
      minCarouselHeight: 460,
      borderRadius: 14,
      maxScale: 1.06,
      minScale: 0.88,
      inactiveOpacity: 0.58,
      activeDistance: 110,
      titleFontSize: 15,
    }
  }

  if (width < 1280) {
    return {
      cardsPeek: 2.65,
      gap: 10,
      horizontalPadding: 20,
      maxContent: 1180,
      cardWidthMin: 260,
      cardWidthMax: 286,
      maxCardHeight: 500,
      minCarouselHeight: 480,
      borderRadius: 14,
      maxScale: 1.07,
      minScale: 0.87,
      inactiveOpacity: 0.55,
      activeDistance: 115,
      titleFontSize: 15,
    }
  }

  if (width < 1536) {
    return {
      cardsPeek: 3.1,
      gap: 12,
      horizontalPadding: 24,
      maxContent: 1320,
      cardWidthMin: 268,
      cardWidthMax: 296,
      maxCardHeight: 520,
      minCarouselHeight: 500,
      borderRadius: 14,
      maxScale: 1.08,
      minScale: 0.86,
      inactiveOpacity: 0.52,
      activeDistance: 120,
      titleFontSize: 15,
    }
  }

  if (width < 1920) {
    return {
      cardsPeek: 3.55,
      gap: 12,
      horizontalPadding: 28,
      maxContent: 1480,
      cardWidthMin: 272,
      cardWidthMax: 308,
      maxCardHeight: 540,
      minCarouselHeight: 520,
      borderRadius: 14,
      maxScale: 1.08,
      minScale: 0.86,
      inactiveOpacity: 0.5,
      activeDistance: 125,
      titleFontSize: 16,
    }
  }

  return {
    cardsPeek: 3.95,
    gap: 14,
    horizontalPadding: 32,
    maxContent: 1680,
    cardWidthMin: 278,
    cardWidthMax: 320,
    maxCardHeight: 560,
    minCarouselHeight: 540,
    borderRadius: 16,
    maxScale: 1.08,
    minScale: 0.86,
    inactiveOpacity: 0.5,
    activeDistance: 130,
    titleFontSize: 16,
  }
}

export function computeReelsCarouselMetrics(width) {
  const layout = getLayout(width)
  const contentWidth = Math.min(width, layout.maxContent)
  const viewportWidth = Math.max(contentWidth - layout.horizontalPadding * 2, 240)

  let cardWidth = Math.floor(
    (viewportWidth - layout.gap * (Math.ceil(layout.cardsPeek) - 1)) / layout.cardsPeek,
  )
  cardWidth = Math.min(Math.max(cardWidth, layout.cardWidthMin), layout.cardWidthMax)

  let cardHeight = Math.round(cardWidth * REEL_HEIGHT_RATIO)
  if (layout.maxCardHeight && cardHeight > layout.maxCardHeight) {
    cardHeight = layout.maxCardHeight
    cardWidth = Math.round(cardHeight / REEL_HEIGHT_RATIO)
  }

  const carouselMinHeight = Math.max(layout.minCarouselHeight, cardHeight + 36)

  return {
    cardWidth,
    cardHeight,
    cardGap: layout.gap,
    cardBorderRadius: layout.borderRadius,
    carouselMinHeight,
    isMobile: width < 640,
    isLargeDesktop: width >= 1536,
    maxContent: layout.maxContent,
    motion: {
      maxScale: layout.maxScale,
      minScale: layout.minScale,
      inactiveOpacity: layout.inactiveOpacity,
      activeDistance: layout.activeDistance,
    },
    titleFontSize: layout.titleFontSize,
  }
}

export function useReelsCarouselMetrics() {
  const [metrics, setMetrics] = useState(() =>
    computeReelsCarouselMetrics(window.innerWidth),
  )

  useEffect(() => {
    const update = () => setMetrics(computeReelsCarouselMetrics(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return metrics
}
