// Port of Framer Stacked Card Carousel
// https://framer.com/m/StackedCardCarousel-wturTV.js@gDDNhc877gEBcLOXNQ8a

import { useCallback, useEffect, useId, useRef, useState, startTransition } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const defaultTitleFont = {
  fontSize: '22px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  lineHeight: '1.4em',
}

const defaultMetadataFont = {
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0em',
  lineHeight: '1.4em',
}

const defaultCategoryFont = {
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '-0.01em',
  lineHeight: '1em',
}

export default function StackedCardCarousel({
  cards = [],
  backgroundColor = '#F5F5F5',
  cardBackground = '#141414',
  textColor = '#000000',
  metadataColor = '#999999',
  categoryBackground = '#EEEEEE',
  categoryTextColor = '#666666',
  buttonColor = '#000000',
  buttonIconColor = '#FFFFFF',
  titleFont = defaultTitleFont,
  metadataFont = defaultMetadataFont,
  categoryFont = defaultCategoryFont,
  scrollSensitivity = 3,
  scrollDirection = 'reverse',
  cardBorderRadius = 32,
  cardShadowIntensity = 1,
  cardSpacing = 40,
  scaleReduction = 0.08,
  animationSpeed = 260,
  dragThreshold = 50,
  cardPadding = 32,
  imageBorderRadius = 20,
  contentPadding = 40,
  forceMobileView = false,
  hideButton = false,
  className = '',
  style,
}) {
  const containerId = useId().replace(/:/g, '')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragX = useMotionValue(0)
  const activeIndexRef = useRef(activeIndex)
  const isScrollingRef = useRef(false)

  activeIndexRef.current = activeIndex

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      startTransition(() => {
        setIsMobile(forceMobileView || window.innerWidth < 768)
      })
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [forceMobileView])

  useEffect(() => {
    if (typeof window === 'undefined' || cards.length === 0) return

    let scrollTimeout
    let accumulatedDelta = 0
    const scrollThreshold = scrollSensitivity

    const handleWheel = (e) => {
      if (isScrollingRef.current) return

      const scrollDown = e.deltaY > 0
      const shouldAdvance = scrollDirection === 'natural' ? scrollDown : !scrollDown
      const index = activeIndexRef.current
      const canAdvance = shouldAdvance && index < cards.length - 1
      const canRetreat = !shouldAdvance && index > 0

      if (!canAdvance && !canRetreat) return

      e.preventDefault()
      accumulatedDelta += e.deltaY

      if (scrollTimeout) clearTimeout(scrollTimeout)

      scrollTimeout = window.setTimeout(() => {
        if (Math.abs(accumulatedDelta) > scrollThreshold) {
          isScrollingRef.current = true

          const advance = accumulatedDelta > 0
          const moveForward = scrollDirection === 'natural' ? advance : !advance
          const currentIndex = activeIndexRef.current

          if (moveForward && currentIndex < cards.length - 1) {
            startTransition(() => setActiveIndex(currentIndex + 1))
          } else if (!moveForward && currentIndex > 0) {
            startTransition(() => setActiveIndex(currentIndex - 1))
          }

          window.setTimeout(() => {
            isScrollingRef.current = false
          }, 600)
        }
        accumulatedDelta = 0
      }, 50)
    }

    const container = document.getElementById(containerId)
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        container.removeEventListener('wheel', handleWheel)
        if (scrollTimeout) clearTimeout(scrollTimeout)
      }
    }
  }, [cards.length, containerId, scrollDirection, scrollSensitivity])

  const handleDragEnd = useCallback(
    (_event, info) => {
      setIsDragging(false)

      const index = activeIndexRef.current
      if (info.offset.x > dragThreshold && index > 0) {
        startTransition(() => setActiveIndex(index - 1))
      } else if (info.offset.x < -dragThreshold && index < cards.length - 1) {
        startTransition(() => setActiveIndex(index + 1))
      }

      animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 })
    },
    [cards.length, dragThreshold, dragX],
  )

  const handleCardClick = useCallback(
    (index) => {
      if (index !== activeIndex && !isDragging) {
        startTransition(() => setActiveIndex(index))
      }
    },
    [activeIndex, isDragging],
  )

  const getCardStyle = useCallback(
    (index) => {
      const offset = index - activeIndex
      const isViewed = index < activeIndex

      if (isViewed) {
        return {
          x: 0,
          y: isMobile ? 600 : 800,
          scale: 0.9,
          opacity: 0,
          zIndex: cards.length + index + 100,
          rotateX: 15,
          rotateZ: 0,
        }
      }

      if (isMobile) {
        const offsetScale = offset * 0.05
        const mobileScaleReduction = offset * (offsetScale * 0.625)
        return {
          x: 0,
          y: offset * (cardSpacing * -0.2),
          scale: Math.max(0.7, 1 - mobileScaleReduction),
          opacity: 1,
          zIndex: cards.length - offset,
          rotateX: 0,
          rotateZ: 0,
        }
      }

      const offsetScale = offset * 0.08
      const desktopScaleReduction = offset * offsetScale
      return {
        x: 0,
        y: offset * -cardSpacing,
        scale: Math.max(0.6, 1 - desktopScaleReduction),
        opacity: 1,
        zIndex: cards.length - offset,
        rotateX: 0,
        rotateZ: 0,
      }
    },
    [activeIndex, cardSpacing, cards.length, isMobile],
  )

  if (cards.length === 0) return null

  return (
    <div
      id={containerId}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: isMobile ? '20px' : '40px',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: isMobile ? '100%' : '900px',
          maxHeight: isMobile ? '100%' : '600px',
          perspective: '1500px',
        }}
      >
        {cards.map((card, index) => {
          const cardStyle = getCardStyle(index)
          const isActive = index === activeIndex
          const isBehind = index > activeIndex
          const isViewed = index < activeIndex

          return (
            <motion.div
              key={card.id || index}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClick(index)}
              animate={cardStyle}
              transition={
                isViewed
                  ? { type: 'spring', stiffness: 80, damping: 20 }
                  : { type: 'spring', stiffness: animationSpeed, damping: 30 }
              }
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: cardBackground,
                borderRadius: isMobile
                  ? `${cardBorderRadius * 0.75}px`
                  : `${cardBorderRadius}px`,
                boxShadow: isActive
                  ? `0 ${20 * cardShadowIntensity}px ${60 * cardShadowIntensity}px rgba(0, 0, 0, ${0.15 * cardShadowIntensity})`
                  : `0 ${10 * cardShadowIntensity}px ${30 * cardShadowIntensity}px rgba(0, 0, 0, ${0.08 * cardShadowIntensity})`,
                cursor: isActive ? 'grab' : 'pointer',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                userSelect: 'none',
                pointerEvents: isViewed ? 'none' : isBehind ? 'auto' : isActive ? 'auto' : 'none',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  width: isMobile ? '100%' : '50%',
                  height: isMobile ? '50%' : '100%',
                  padding: isMobile
                    ? `${cardPadding * 0.625}px ${cardPadding * 0.625}px 0 ${cardPadding * 0.625}px`
                    : `${cardPadding}px 0 ${cardPadding}px ${cardPadding}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: isMobile
                      ? `${imageBorderRadius * 0.8}px`
                      : `${imageBorderRadius}px`,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={card.image?.src}
                    alt={card.image?.alt || 'Card image'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>

              <div
                style={{
                  width: isMobile ? '100%' : '50%',
                  height: isMobile ? '50%' : '100%',
                  padding: isMobile ? `${contentPadding * 0.625}px` : `${contentPadding}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: metadataColor,
                      ...metadataFont,
                      fontSize: isMobile
                        ? `${parseFloat(metadataFont.fontSize) * 0.85}px`
                        : metadataFont.fontSize,
                      marginBottom: isMobile ? '12px' : '16px',
                    }}
                  >
                    {card.metadata}
                  </p>
                  <h2
                    style={{
                      margin: 0,
                      color: textColor,
                      ...titleFont,
                      fontSize: isMobile
                        ? `${parseFloat(titleFont.fontSize) * 0.7}px`
                        : titleFont.fontSize,
                      lineHeight: '1.4',
                    }}
                  >
                    {card.title}
                  </h2>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: hideButton ? 'flex-start' : 'space-between',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: categoryBackground,
                      color: categoryTextColor,
                      padding: isMobile ? '6px 14px' : '8px 16px',
                      borderRadius: '20px',
                      ...categoryFont,
                      fontSize: isMobile
                        ? `${parseFloat(categoryFont.fontSize) * 0.85}px`
                        : categoryFont.fontSize,
                    }}
                  >
                    {card.category}
                  </span>

                  {!hideButton && card.buttonText ? (
                    <button
                      type="button"
                      style={{
                        height: isMobile ? '44px' : '48px',
                        padding: isMobile ? '0 20px' : '0 24px',
                        borderRadius: '24px',
                        backgroundColor: buttonColor,
                        color: buttonIconColor,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        ...categoryFont,
                        fontSize: isMobile
                          ? `${parseFloat(categoryFont.fontSize) * 0.85}px`
                          : categoryFont.fontSize,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {card.buttonText}
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 1000,
        }}
      >
        {cards.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => startTransition(() => setActiveIndex(index))}
            style={{
              width: index === activeIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === activeIndex ? textColor : metadataColor,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function StoryStackedCarousel({ chapters }) {
  const cards = chapters.map((chapter, index) => ({
    id: chapter.id,
    image: {
      src: chapter.image,
      alt: chapter.imageAlt || chapter.year,
    },
    metadata: `Chapter ${String(index + 1).padStart(2, '0')}`,
    title: chapter.text,
    category: chapter.year,
  }))

  return (
    <StackedCardCarousel
      cards={cards}
      backgroundColor="transparent"
      cardBackground="#141414"
      textColor="#ffffff"
      metadataColor="rgba(30, 69, 255, 0.65)"
      categoryBackground="rgba(30, 69, 255, 0.1)"
      categoryTextColor="#8ab4ff"
      buttonColor="#8ab4ff"
      buttonIconColor="#ffffff"
      hideButton
      className="h-full w-full"
    />
  )
}
