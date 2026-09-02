import { memo, useEffect, useRef, useState } from 'react'
import { motion, useInView, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const GalleryCard = memo(function GalleryCard({
  image,
  index,
  cardWidth,
  cardHeight,
  gap,
  borderRadius,
  trackX,
  viewportWidth,
  onImageClick,
  hasEntered,
  scaleDepth = 0.06,
  centerBias = 0.55,
  imagePadding = 10,
  isMobile = false,
  bareCard = false,
}) {
  const stride = cardWidth + gap

  const scale = useTransform(trackX, (x) => {
    const cardLeft = index * stride + x
    const center = viewportWidth * 0.5
    const cardCenter = cardLeft + cardWidth * 0.5
    const dist = Math.min(Math.abs(cardCenter - center) / (viewportWidth * centerBias), 1)
    return 1 - dist * scaleDepth
  })

  const opacity = useTransform(trackX, (x) => {
    const cardLeft = index * stride + x
    const center = viewportWidth * 0.5
    const cardCenter = cardLeft + cardWidth * 0.5
    const falloff = isMobile ? 0.72 : 0.65
    const dist = Math.min(Math.abs(cardCenter - center) / (viewportWidth * falloff), 1)
    const minOpacity = isMobile ? 0.82 : 0.78
    return minOpacity + (1 - dist) * (1 - minOpacity)
  })

  return (
    <motion.button
      type="button"
      onClick={() => onImageClick?.(image)}
      initial={{ y: isMobile ? 12 : 24 }}
      animate={hasEntered ? { y: 0 } : { y: isMobile ? 12 : 24 }}
      transition={{
        duration: isMobile ? 0.42 : 0.5,
        delay: 0.03 + index * (isMobile ? 0.03 : 0.04),
        ease: EASE,
      }}
      className={
        bareCard
          ? 'group flex shrink-0 items-center justify-center overflow-hidden active:scale-[0.98]'
          : 'group flex shrink-0 items-center justify-center overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.38)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_20px_56px_rgba(223,255,0,0.08)] active:scale-[0.98]'
      }
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius,
        scale: bareCard ? 1 : scale,
        opacity: bareCard ? 1 : opacity,
        willChange: bareCard ? undefined : 'transform',
        flex: '0 0 auto',
      }}
      aria-label={image.alt || `Open creative preview ${index + 1}`}
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
    </motion.button>
  )
})

export default function CreativeWorkGallery({
  images = [],
  scrollProgress,
  metrics,
  onImageClick,
  borderRadius = 14,
  className = '',
}) {
  const viewportRef = useRef(null)
  const isInView = useInView(viewportRef, { once: true, amount: 0.15 })
  const [hasEntered, setHasEntered] = useState(false)

  const {
    maxOffset,
    viewportWidth,
    cardWidth,
    cardHeight,
    gap,
    scaleDepth = 0.06,
    centerBias = 0.55,
    edgeFade = 48,
    progressWidth = 140,
    imagePadding = 10,
    showScrollHint = false,
    isMobile = false,
    bareCard = false,
  } = metrics

  const trackX = useTransform(scrollProgress, [0, 1], [0, -maxOffset])
  const progressScale = useTransform(scrollProgress, [0, 1], [0.001, 1])

  useEffect(() => {
    if (isInView && !hasEntered) setHasEntered(true)
  }, [isInView, hasEntered])

  if (!images.length || !viewportWidth) return null

  const progressReserve = maxOffset > 0 ? (isMobile ? 32 : 28) : 0

  return (
    <div
      ref={viewportRef}
      className={`relative w-full ${className}`}
      style={{ height: cardHeight + progressReserve }}
    >
      <div
        className="relative mx-auto overflow-hidden"
        style={{
          width: viewportWidth,
          maxWidth: '100%',
          height: cardHeight,
        }}
      >
        <motion.div
          className="flex h-full flex-nowrap items-center"
          style={{
            x: trackX,
            gap,
            willChange: 'transform',
          }}
        >
          {images.map((image, index) => (
            <GalleryCard
              key={image.src}
              image={image}
              index={index}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              gap={gap}
              borderRadius={borderRadius}
              trackX={trackX}
              viewportWidth={viewportWidth}
              onImageClick={onImageClick}
              hasEntered={hasEntered}
              scaleDepth={scaleDepth}
              centerBias={centerBias}
              imagePadding={imagePadding}
              isMobile={isMobile}
              bareCard={bareCard}
            />
          ))}
        </motion.div>

        {edgeFade > 0 ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent"
              style={{ width: edgeFade }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-black via-black/80 to-transparent"
              style={{ width: edgeFade }}
            />
          </>
        ) : null}
      </div>

      {maxOffset > 0 ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2"
          style={{ height: progressReserve || undefined }}
        >
          {showScrollHint ? (
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-[0.65rem]">
              Scroll to explore
            </p>
          ) : null}
          <div
            className="h-px overflow-hidden rounded-full bg-white/10"
            style={{ width: progressWidth }}
          >
            <motion.div
              className="h-full w-full origin-left rounded-full bg-accent"
              style={{ scaleX: progressScale, willChange: 'transform' }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
