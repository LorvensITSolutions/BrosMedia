// Vite port of Framer MotionGallery
// https://framer.com/m/MotionGallery-JuOB8v.js@44OBltoR5dBarH6Qb9Hj

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const SNAP_TIMEOUT_MS = 150
const ITEM_ASPECT_RATIO = 16 / 9
const ITEM_HEIGHT_PERCENT = 0.95
const ITEM_WIDTH_PERCENT = 0.95

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function GalleryItemFrame({
  image,
  itemIndex,
  itemWidth,
  itemHeight,
  borderRadius,
  hasEntered,
  entranceDelay,
  objectFit,
  onImageClick,
  x,
  y,
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: entranceDelay + itemIndex * 0.03,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => onImageClick?.(image)}
      className={onImageClick ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}
      style={{
        width: itemWidth,
        height: itemHeight,
        borderRadius,
        overflow: 'hidden',
        position: 'absolute',
        x,
        y,
        top: 0,
        left: 0,
        willChange: 'transform',
        border: 'none',
        padding: 0,
        background: 'rgba(255,255,255,0.04)',
      }}
      aria-label={image.alt || `Gallery image ${itemIndex + 1}`}
    >
      <img
        src={image.src}
        alt={image.alt || ''}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </motion.button>
  )
}

function InfiniteGalleryItem({
  itemIndex,
  image,
  itemWidth,
  itemHeight,
  itemSize,
  borderRadius,
  isHorizontal,
  containerSize,
  offset,
  hasEntered,
  entranceDelay,
  totalImages,
  objectFit,
  onImageClick,
}) {
  const getPosition = (value) => {
    const total = totalImages * itemSize
    if (!total) return 0

    let pos = itemIndex * itemSize + value
    pos = ((pos % total) + total) % total
    if (pos > total / 2) pos -= total
    return pos
  }

  const x = useTransform(offset, (value) =>
    isHorizontal
      ? containerSize.width / 2 - itemWidth / 2 + getPosition(value)
      : containerSize.width / 2 - itemWidth / 2,
  )

  const y = useTransform(offset, (value) =>
    isHorizontal
      ? containerSize.height / 2 - itemHeight / 2
      : containerSize.height / 2 - itemHeight / 2 + getPosition(value),
  )

  return (
    <GalleryItemFrame
      image={image}
      itemIndex={itemIndex}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      borderRadius={borderRadius}
      hasEntered={hasEntered}
      entranceDelay={entranceDelay}
      objectFit={objectFit}
      onImageClick={onImageClick}
      x={x}
      y={y}
    />
  )
}

function LinearGalleryItem({
  itemIndex,
  image,
  itemWidth,
  itemHeight,
  itemSize,
  borderRadius,
  isHorizontal,
  containerSize,
  offset,
  hasEntered,
  entranceDelay,
  objectFit,
  onImageClick,
}) {
  const x = useTransform(offset, (value) => {
    const pos = itemIndex * itemSize + value
    return isHorizontal
      ? containerSize.width / 2 - itemWidth / 2 + pos
      : containerSize.width / 2 - itemWidth / 2
  })

  const y = useTransform(offset, (value) => {
    const pos = itemIndex * itemSize + value
    return isHorizontal
      ? containerSize.height / 2 - itemHeight / 2
      : containerSize.height / 2 - itemHeight / 2 + pos
  })

  return (
    <GalleryItemFrame
      image={image}
      itemIndex={itemIndex}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      borderRadius={borderRadius}
      hasEntered={hasEntered}
      entranceDelay={entranceDelay}
      objectFit={objectFit}
      onImageClick={onImageClick}
      x={x}
      y={y}
    />
  )
}

export default function MotionGallery({
  images = [],
  orientation = 'horizontal',
  gap = 16,
  padding = 16,
  itemWidth = 100,
  borderRadius = 12,
  backgroundColor = '#000000',
  showIndicators = true,
  indicatorColor = 'rgba(255, 255, 255, 0.4)',
  indicatorActiveColor = '#FFFFFF',
  entranceDuration = 0.6,
  entranceDelay = 0.1,
  autoCentered = true,
  scrollSpeed = 0.5,
  scrollSmoothness = 0.5,
  showScrollHint = true,
  infinite = true,
  objectFit = 'cover',
  scrollLinked = false,
  scrollContainerRef,
  onImageClick,
  className = '',
  style,
}) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const touchStartRef = useRef(null)
  const touchStartOffsetRef = useRef(0)
  const snapTimeoutRef = useRef(null)
  const unsubscribeRef = useRef(null)

  const [containerSize, setContainerSize] = useState({ width: 600, height: 340 })
  const [hasEntered, setHasEntered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const validImages = useMemo(
    () => images.filter((image) => Boolean(image?.src)),
    [images],
  )

  const isHorizontal = orientation === 'horizontal'
  const baseOffset = useMotionValue(0)

  const springConfig = useMemo(
    () => ({
      stiffness: 500 - scrollSmoothness * 450,
      damping: 15 + scrollSmoothness * 25,
      mass: 0.6 + scrollSmoothness * 0.4,
    }),
    [scrollSmoothness],
  )

  const springOffset = useSpring(baseOffset, springConfig)

  const baseItemHeight = containerSize.height * ITEM_HEIGHT_PERCENT
  const baseItemWidth = isHorizontal
    ? baseItemHeight * ITEM_ASPECT_RATIO
    : containerSize.width * ITEM_WIDTH_PERCENT
  const scaleFactor = itemWidth / 100
  const finalItemWidth = baseItemWidth * scaleFactor
  const itemHeight = baseItemHeight
  const itemSize = Math.max(isHorizontal ? finalItemWidth + gap : itemHeight + gap, 1)

  const minOffset = -(Math.max(validImages.length - 1, 0) * itemSize)
  const maxOffset = 0

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  })

  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, minOffset])
  const displayOffset = scrollLinked ? scrollOffset : springOffset

  useEffect(() => {
    if (validImages.length > 0 && !scrollLinked) {
      baseOffset.set(0)
      setCurrentIndex(0)
    }
  }, [validImages.length, baseOffset, scrollLinked])

  useEffect(() => {
    if (isInView && !hasEntered) setHasEntered(true)
  }, [isInView, hasEntered])

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setContainerSize({
        width: Math.max(rect.width, 5),
        height: Math.max(rect.height, 5),
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (!itemSize || validImages.length === 0) return undefined

    const updateIndex = (value) => {
      const pos = -value / itemSize
      const idx = infinite
        ? ((Math.round(pos) % validImages.length) + validImages.length) % validImages.length
        : clamp(Math.round(pos), 0, validImages.length - 1)
      setCurrentIndex(idx)
    }

    if (scrollLinked) {
      const unsub = scrollOffset.on('change', updateIndex)
      return () => unsub()
    }

    unsubscribeRef.current?.()
    unsubscribeRef.current = springOffset.on('change', updateIndex)

    return () => {
      unsubscribeRef.current?.()
      unsubscribeRef.current = null
    }
  }, [infinite, itemSize, scrollLinked, scrollOffset, springOffset, validImages.length])

  useEffect(
    () => () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
    },
    [],
  )

  const snapToNearest = useCallback(() => {
    if (itemSize < 2 || validImages.length <= 1) return
    const raw = -baseOffset.get() / itemSize
    const targetIndex = infinite
      ? Math.round(raw)
      : clamp(Math.round(raw), 0, validImages.length - 1)
    animate(baseOffset, -targetIndex * itemSize, { type: 'spring', ...springConfig })
  }, [baseOffset, infinite, itemSize, springConfig, validImages.length])

  const handleWheel = useCallback(
    (event) => {
      if (scrollLinked || validImages.length <= 1 || itemSize < 2) return

      event.preventDefault()
      const delta = isHorizontal ? event.deltaX || event.deltaY : event.deltaY
      const next = baseOffset.get() - delta * scrollSpeed

      baseOffset.set(infinite ? next : clamp(next, minOffset, maxOffset))

      if (!autoCentered) return
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
      snapTimeoutRef.current = setTimeout(snapToNearest, SNAP_TIMEOUT_MS)
    },
    [
      autoCentered,
      baseOffset,
      infinite,
      isHorizontal,
      itemSize,
      maxOffset,
      minOffset,
      scrollLinked,
      scrollSpeed,
      snapToNearest,
      validImages.length,
    ],
  )

  useEffect(() => {
    if (scrollLinked) return undefined

    const el = containerRef.current
    if (!el) return undefined

    const onTouchStart = (event) => {
      if (validImages.length <= 1 || itemSize < 2) return
      const touch = event.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
      touchStartOffsetRef.current = baseOffset.get()
    }

    const onTouchMove = (event) => {
      if (!touchStartRef.current || validImages.length <= 1 || itemSize < 2) return

      event.preventDefault()
      const touch = event.touches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const delta = isHorizontal ? deltaX : deltaY
      const next = touchStartOffsetRef.current + delta
      baseOffset.set(infinite ? next : clamp(next, minOffset, maxOffset))
    }

    const onTouchEnd = () => {
      touchStartRef.current = null
      if (autoCentered && validImages.length > 1 && itemSize >= 2) {
        snapToNearest()
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [
    autoCentered,
    baseOffset,
    infinite,
    isHorizontal,
    itemSize,
    maxOffset,
    minOffset,
    scrollLinked,
    snapToNearest,
    validImages.length,
  ])

  const goToIndex = (index) => {
    if (scrollLinked || validImages.length <= 1 || itemSize < 2) return

    if (infinite) {
      const current = Math.round(-springOffset.get() / itemSize)
      const wrapped = ((current % validImages.length) + validImages.length) % validImages.length
      let diff = index - wrapped
      if (diff > validImages.length / 2) diff -= validImages.length
      if (diff < -validImages.length / 2) diff += validImages.length
      animate(baseOffset, springOffset.get() - diff * itemSize, { type: 'spring', ...springConfig })
      return
    }

    animate(baseOffset, -index * itemSize, { type: 'spring', ...springConfig })
  }

  if (!validImages.length) {
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundColor,
          borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
        }}
      >
        Add images to the gallery
      </div>
    )
  }

  const ItemComponent = infinite ? InfiniteGalleryItem : LinearGalleryItem

  return (
    <div
      className={`flex flex-col ${className}`}
      style={{ width: style?.width ?? '100%', height: style?.height ?? '100%' }}
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{
          duration: entranceDuration,
          delay: entranceDelay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          ...style,
          position: 'relative',
          backgroundColor,
          overflow: 'hidden',
          borderRadius,
          overscrollBehavior: 'contain',
          touchAction: scrollLinked ? 'pan-y' : 'none',
          padding,
          flex: 1,
          minHeight: 0,
        }}
        onWheel={scrollLinked ? undefined : handleWheel}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {validImages.map((image, index) => (
            <ItemComponent
              key={`${image.src}-${index}`}
              itemIndex={index}
              image={image}
              itemWidth={finalItemWidth}
              itemHeight={itemHeight}
              itemSize={itemSize}
              borderRadius={borderRadius}
              isHorizontal={isHorizontal}
              containerSize={containerSize}
              offset={displayOffset}
              hasEntered={hasEntered}
              entranceDelay={entranceDelay}
              totalImages={validImages.length}
              objectFit={objectFit}
              onImageClick={onImageClick}
            />
          ))}
        </div>

        {showIndicators && validImages.length > 1 && hasEntered ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: entranceDelay + 0.4 }}
            style={{
              position: 'absolute',
              bottom: isHorizontal ? padding + 8 : 'auto',
              right: isHorizontal ? 'auto' : padding + 8,
              top: isHorizontal ? 'auto' : '50%',
              left: isHorizontal ? '50%' : 'auto',
              transform: isHorizontal ? 'translateX(-50%)' : 'translateY(-50%)',
              display: 'flex',
              flexDirection: isHorizontal ? 'row' : 'column',
              gap: 8,
              zIndex: 10,
              pointerEvents: scrollLinked ? 'none' : 'auto',
            }}
          >
            {validImages.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                style={{
                  width: isHorizontal ? 8 : 6,
                  height: isHorizontal ? 6 : 8,
                  borderRadius: 4,
                  border: 'none',
                  backgroundColor: index === currentIndex ? indicatorActiveColor : indicatorColor,
                  cursor: scrollLinked ? 'default' : 'pointer',
                  transition: 'background-color 0.3s',
                  padding: 0,
                }}
              />
            ))}
          </motion.div>
        ) : null}
      </motion.div>

      {showScrollHint ? (
        <p className="mt-2 px-1 text-xs tracking-wide text-white/45">
          {scrollLinked
            ? '( Keep scrolling to browse all work )'
            : `( Scroll ${isHorizontal ? 'horizontally' : 'vertically'} )`}
        </p>
      ) : null}
    </div>
  )
}
