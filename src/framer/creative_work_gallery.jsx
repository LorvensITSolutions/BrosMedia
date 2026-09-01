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
}) {
  const stride = cardWidth + gap

  const scale = useTransform(trackX, (x) => {
    const cardLeft = index * stride + x
    const center = viewportWidth * 0.5
    const cardCenter = cardLeft + cardWidth * 0.5
    const dist = Math.min(Math.abs(cardCenter - center) / (viewportWidth * 0.55), 1)
    return 1 - dist * 0.06
  })

  const opacity = useTransform(trackX, (x) => {
    const cardLeft = index * stride + x
    const center = viewportWidth * 0.5
    const cardCenter = cardLeft + cardWidth * 0.5
    const dist = Math.min(Math.abs(cardCenter - center) / (viewportWidth * 0.65), 1)
    return 0.78 + (1 - dist) * 0.22
  })

  return (
    <motion.button
      type="button"
      onClick={() => onImageClick?.(image)}
      initial={{ y: 24 }}
      animate={hasEntered ? { y: 0 } : { y: 24 }}
      transition={{
        duration: 0.5,
        delay: 0.04 + index * 0.04,
        ease: EASE,
      }}
      className="group shrink-0 overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.38)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_20px_56px_rgba(223,255,0,0.08)]"
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius,
        scale,
        opacity,
        willChange: 'transform',
        flex: '0 0 auto',
      }}
      aria-label={image.alt || `Open creative preview ${index + 1}`}
    >
      <img
        src={image.src}
        alt={image.alt || ''}
        draggable={false}
        className="h-full w-full object-contain p-2 sm:p-2.5"
      />
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
  const isInView = useInView(viewportRef, { once: true, amount: 0.2 })
  const [hasEntered, setHasEntered] = useState(false)

  const { maxOffset, viewportWidth, cardWidth, cardHeight, gap } = metrics

  const trackX = useTransform(scrollProgress, [0, 1], [0, -maxOffset])
  const progressScale = useTransform(scrollProgress, [0, 1], [0.001, 1])

  useEffect(() => {
    if (isInView && !hasEntered) setHasEntered(true)
  }, [isInView, hasEntered])

  if (!images.length || !viewportWidth) return null

  return (
    <div
      ref={viewportRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: cardHeight }}
    >
      <div
        className="relative mx-auto h-full overflow-hidden"
        style={{ width: viewportWidth, maxWidth: '100%' }}
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
            />
          ))}
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-14"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-14"
        />

        {maxOffset > 0 ? (
          <div className="pointer-events-none absolute inset-x-0 -bottom-5 flex justify-center">
            <div className="h-px w-32 overflow-hidden rounded-full bg-white/10 sm:w-44">
              <motion.div
                className="h-full w-full origin-left rounded-full bg-accent"
                style={{ scaleX: progressScale, willChange: 'transform' }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
