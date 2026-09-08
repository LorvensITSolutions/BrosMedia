import { useEffect, useMemo, useRef, useState } from 'react'

const SPEED_PX_PER_SEC = 42

function useGalleryLayout() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return useMemo(() => {
    const isMobile = width < 640
    const isTablet = width < 1024
    const horizontalPadding = isMobile ? 12 : isTablet ? 24 : 40
    const gap = isMobile ? 12 : 16
    const cardsVisible = isMobile ? 1 : isTablet ? 2 : 3
    const maxContent = Math.min(width, isMobile ? width : isTablet ? 960 : 1400)
    const viewportWidth = Math.max(maxContent - horizontalPadding * 2, 260)
    const cardWidth =
      cardsVisible <= 1
        ? viewportWidth
        : Math.floor((viewportWidth - gap * (cardsVisible - 1)) / cardsVisible)
    const cardHeight = Math.round(
      Math.min(
        Math.max(cardWidth * (isMobile ? 1.05 : 5 / 4), isMobile ? 220 : 320),
        isMobile ? 480 : 560,
      ),
    )

    return {
      gap,
      cardWidth,
      cardHeight,
      viewportWidth,
      isMobile,
      borderRadius: isMobile ? 10 : 12,
      imagePadding: isMobile ? 0 : 10,
      bareCard: isMobile,
    }
  }, [width])
}

function ChevronLeft({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GalleryCard({
  image,
  index,
  cardWidth,
  cardHeight,
  borderRadius,
  imagePadding,
  bareCard,
  onImageClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onImageClick?.(image)}
      aria-label={image.alt || `Open creative preview ${index + 1}`}
      className={
        bareCard
          ? 'group flex shrink-0 items-center justify-center overflow-hidden active:scale-[0.98]'
          : 'group flex shrink-0 items-center justify-center overflow-hidden border border-white/10 bg-white/[0.03] transition-[border-color] duration-300 hover:border-accent/40 active:scale-[0.98]'
      }
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius,
        flex: '0 0 auto',
      }}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        style={imagePadding ? { padding: imagePadding } : undefined}
      >
        <img
          src={image.src}
          alt={image.alt || ''}
          draggable={false}
          className={`block max-h-full max-w-full ${bareCard ? 'h-full w-full object-contain' : 'object-contain'}`}
        />
      </div>
    </button>
  )
}

export default function CreativeWorkGallery({
  images = [],
  onImageClick,
  className = '',
}) {
  const layout = useGalleryLayout()
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  const { gap, cardWidth, cardHeight, viewportWidth, borderRadius, imagePadding, bareCard } =
    layout

  const loopWidth = images.length * cardWidth + Math.max(images.length - 1, 0) * gap + gap
  const stride = cardWidth + gap
  const loopImages = useMemo(() => [...images, ...images], [images])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    offsetRef.current = 0
    if (trackRef.current) {
      trackRef.current.style.transform = 'translate3d(0,0,0)'
    }
  }, [loopWidth])

  useEffect(() => {
    if (!images.length || reduceMotion || loopWidth <= 0) return undefined

    let raf = 0
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!paused) {
        offsetRef.current += SPEED_PX_PER_SEC * dt
        if (offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px,0,0)`
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [images.length, loopWidth, paused, reduceMotion])

  const nudge = (direction) => {
    if (!images.length || loopWidth <= 0) return
    let next = offsetRef.current + direction * stride
    next = ((next % loopWidth) + loopWidth) % loopWidth
    offsetRef.current = next
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${next}px,0,0)`
    }
  }

  if (!images.length) return null

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative mx-auto flex items-center gap-2 sm:gap-3"
        style={{ maxWidth: viewportWidth + 112 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
        }}
      >
        <button
          type="button"
          aria-label="Previous images"
          onClick={() => nudge(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-accent/50 hover:text-accent sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div
          className="relative overflow-hidden"
          style={{ width: viewportWidth, maxWidth: '100%', height: cardHeight }}
          aria-label="Creative work gallery, slowly scrolling left. Hover to pause."
        >
          <div
            ref={trackRef}
            className="flex h-full flex-nowrap items-center will-change-transform"
            style={{ gap, width: 'max-content' }}
          >
            {loopImages.map((image, imageIndex) => (
              <GalleryCard
                key={`${image.src}-${imageIndex}`}
                image={image}
                index={imageIndex % images.length}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                borderRadius={borderRadius}
                imagePadding={imagePadding}
                bareCard={bareCard}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next images"
          onClick={() => nudge(1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-accent/50 hover:text-accent sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  )
}
