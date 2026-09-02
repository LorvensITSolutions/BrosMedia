import { useEffect, useState } from 'react'

export const PANEL_HEIGHT = 'calc(100svh - var(--navbar-height))'

/** Typical Instagram / social creative ratio (width : height = 4 : 5). */
const CREATIVE_HEIGHT_RATIO = 5 / 4

export function getNavbarHeightPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 60
}

function getLayout(width) {
  if (width < 480) {
    return {
      cardsVisible: 1,
      gap: 0,
      headerSpace: 76,
      maxContent: width,
      horizontalPadding: 6,
      scaleDepth: 0,
      centerBias: 0.5,
      edgeFade: 0,
      progressWidth: 96,
      imagePadding: 0,
      showScrollHint: true,
      cardHeightMin: 200,
      cardHeightMax: 9999,
      mobileCardRatio: 1.05,
      bareCard: true,
    }
  }

  if (width < 640) {
    return {
      cardsVisible: 1,
      gap: 0,
      headerSpace: 80,
      maxContent: width,
      horizontalPadding: 8,
      scaleDepth: 0,
      centerBias: 0.5,
      edgeFade: 0,
      progressWidth: 112,
      imagePadding: 0,
      showScrollHint: true,
      cardHeightMin: 220,
      cardHeightMax: 9999,
      mobileCardRatio: 1.08,
      bareCard: true,
    }
  }

  if (width < 768) {
    return {
      cardsVisible: 1.35,
      gap: 14,
      headerSpace: 102,
      maxContent: 720,
      horizontalPadding: 14,
      scaleDepth: 0.045,
      centerBias: 0.52,
      edgeFade: 36,
      progressWidth: 120,
      imagePadding: 8,
      showScrollHint: true,
      cardHeightMin: 320,
      cardHeightMax: 440,
      cardHeightRatio: 0.9,
    }
  }

  if (width < 1024) {
    return {
      cardsVisible: 2.2,
      gap: 16,
      headerSpace: 106,
      maxContent: 960,
      horizontalPadding: 16,
      scaleDepth: 0.05,
      centerBias: 0.54,
      edgeFade: 40,
      progressWidth: 136,
      imagePadding: 10,
      showScrollHint: false,
      cardHeightMin: 340,
      cardHeightMax: 480,
      cardHeightRatio: 0.91,
    }
  }

  if (width < 1280) {
    return {
      cardsVisible: 2.85,
      gap: 18,
      headerSpace: 110,
      maxContent: 1180,
      horizontalPadding: 20,
      scaleDepth: 0.055,
      centerBias: 0.55,
      edgeFade: 48,
      progressWidth: 148,
      imagePadding: 10,
      showScrollHint: false,
      cardHeightMin: 360,
      cardHeightMax: 500,
      cardHeightRatio: 0.92,
    }
  }

  if (width < 1536) {
    return {
      cardsVisible: 3.35,
      gap: 20,
      headerSpace: 114,
      maxContent: 1320,
      horizontalPadding: 24,
      scaleDepth: 0.06,
      centerBias: 0.55,
      edgeFade: 56,
      progressWidth: 160,
      imagePadding: 12,
      showScrollHint: false,
      cardHeightMin: 380,
      cardHeightMax: 540,
      cardHeightRatio: 0.92,
    }
  }

  if (width < 1920) {
    return {
      cardsVisible: 3.75,
      gap: 22,
      headerSpace: 118,
      maxContent: 1480,
      horizontalPadding: 28,
      scaleDepth: 0.065,
      centerBias: 0.56,
      edgeFade: 64,
      progressWidth: 176,
      imagePadding: 12,
      showScrollHint: false,
      cardHeightMin: 400,
      cardHeightMax: 580,
      cardHeightRatio: 0.93,
    }
  }

  return {
    cardsVisible: 4.15,
    gap: 24,
    headerSpace: 122,
    maxContent: 1680,
    horizontalPadding: 32,
    scaleDepth: 0.07,
    centerBias: 0.56,
    edgeFade: 72,
    progressWidth: 192,
    imagePadding: 14,
    showScrollHint: false,
    cardHeightMin: 420,
    cardHeightMax: 620,
    cardHeightRatio: 0.94,
  }
}

export function computeGalleryMetrics(width, imageCount, navHeight = getNavbarHeightPx()) {
  const layout = getLayout(width)
  const contentWidth = Math.min(width, layout.maxContent)
  const viewportWidth = Math.max(contentWidth - layout.horizontalPadding * 2, 260)

  const cardWidth =
    layout.cardsVisible <= 1
      ? viewportWidth
      : Math.floor(
          (viewportWidth - layout.gap * (Math.ceil(layout.cardsVisible) - 1)) /
            layout.cardsVisible,
        )

  const panelHeightPx = Math.max(window.innerHeight - navHeight, 380)
  const galleryChrome = width < 640 ? 40 : width < 1280 ? 76 : 68
  const galleryAreaHeight = Math.max(
    panelHeightPx - layout.headerSpace - galleryChrome,
    220,
  )

  const heightRatio = layout.mobileCardRatio ?? CREATIVE_HEIGHT_RATIO
  const idealCardHeight = Math.round(cardWidth * heightRatio)
  const cardHeight = Math.min(
    Math.max(idealCardHeight, Math.min(layout.cardHeightMin, galleryAreaHeight)),
    galleryAreaHeight,
    layout.cardHeightMax,
  )

  const totalTrackWidth = imageCount * cardWidth + Math.max(imageCount - 1, 0) * layout.gap
  const maxOffset = Math.max(0, totalTrackWidth - viewportWidth)
  const holdDistance = Math.round(
    Math.min(
      panelHeightPx * (width < 640 ? 0.1 : 0.42),
      window.innerHeight * (width < 640 ? 0.14 : 0.48),
    ),
  )
  const scrollDistance = maxOffset
  const totalScrollDistance = holdDistance + scrollDistance

  return {
    cardWidth,
    cardHeight,
    gap: layout.gap,
    maxOffset,
    holdDistance,
    scrollDistance,
    totalScrollDistance,
    viewportWidth,
    horizontalPadding: layout.horizontalPadding,
    cardsVisible: layout.cardsVisible,
    panelHeightPx,
    sectionHeightPx: panelHeightPx + totalScrollDistance,
    sectionHeight:
      totalScrollDistance > 0
        ? `calc(${PANEL_HEIGHT} + ${totalScrollDistance}px)`
        : PANEL_HEIGHT,
    scaleDepth: layout.scaleDepth,
    centerBias: layout.centerBias,
    edgeFade: layout.edgeFade,
    progressWidth: layout.progressWidth,
    imagePadding: layout.imagePadding,
    showScrollHint: layout.showScrollHint,
    isMobile: width < 640,
    isLargeDesktop: width >= 1536,
    maxContent: layout.maxContent,
    bareCard: layout.bareCard ?? false,
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
