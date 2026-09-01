import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

export default function ScrollTripleGallery({
  images = [],
  sectionRef,
  cardsPerView = 4,
  onImageClick,
  gap = 16,
  borderRadius = 14,
  className = '',
}) {
  const viewportRef = useRef(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const stepCount = useMemo(
    () => Math.max(1, images.length - cardsPerView + 1),
    [images.length, cardsPerView],
  )

  const cardWidth =
    viewportWidth > 0 ? (viewportWidth - gap * (cardsPerView - 1)) / cardsPerView : 0

  const stepWidth = cardWidth + gap
  const maxOffset = Math.max(0, (stepCount - 1) * stepWidth)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, (progress) => -progress * maxOffset)

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (stepCount <= 1) {
      setCurrentStep(0)
      return
    }
    setCurrentStep(Math.min(stepCount - 1, Math.round(progress * (stepCount - 1))))
  })

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return undefined

    const update = () => setViewportWidth(node.clientWidth)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (!images.length) return null

  return (
    <div ref={viewportRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <motion.div className="flex h-full will-change-transform" style={{ x, gap }}>
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onImageClick?.(image)}
            className="group relative h-[min(56vh,400px)] shrink-0 overflow-hidden border border-white/10 bg-white/[0.03] transition hover:border-accent/35 sm:h-[min(60vh,460px)]"
            style={{
              width:
                cardWidth || `calc((100% - ${gap * (cardsPerView - 1)}px) / ${cardsPerView})`,
              borderRadius,
            }}
            aria-label={image.alt || 'Open creative preview'}
          >
            <img
              src={image.src}
              alt={image.alt || ''}
              draggable={false}
              className="h-full w-full object-contain p-1.5 transition duration-300 group-hover:scale-[1.02] sm:p-2"
            />
          </button>
        ))}
      </motion.div>

      {stepCount > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2 sm:bottom-6">
          {Array.from({ length: stepCount }, (_, index) => (
            <span
              key={`dot-${index}`}
              aria-hidden={index !== currentStep}
              aria-label={index === currentStep ? `Gallery position ${index + 1}` : undefined}
              className={`rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'h-1.5 w-5 bg-accent'
                  : 'h-1.5 w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
