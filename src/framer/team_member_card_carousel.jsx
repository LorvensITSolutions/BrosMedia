// Port of Framer Team Member Card Carousel
// https://framer.com/m/TeamMemberCardCarousel-1-7GED38.js@TrHagNcBxHE41aIbV5xj

import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react'
import { animate, motion, useInView, useMotionValue } from 'framer-motion'

const defaultNameFont = {
  fontSize: '24px',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: '1.05em',
}

const defaultDescriptionFont = {
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: '-0.01em',
  lineHeight: '1.35em',
}

const defaultTagFont = {
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '-0.01em',
  lineHeight: '1em',
}

const defaultButtonFont = {
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  lineHeight: '1em',
}

const fallbackPortraits = [
  { src: 'https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg', alt: 'Portrait' },
  { src: 'https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg', alt: 'Portrait' },
  { src: 'https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg', alt: 'Portrait' },
  { src: 'https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg', alt: 'Portrait' },
  { src: 'https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg', alt: 'Portrait' },
]

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function useElementSize() {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const el = ref.current
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (!cr) return
      startTransition(() => setSize({ width: cr.width, height: cr.height }))
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, size }
}

function MemberCard({
  member,
  isActive,
  cardWidth,
  cardHeight,
  radius,
  shadow,
  cardBackground,
  textColor,
  tagBg,
  tagText,
  buttonLabel,
  buttonBg,
  buttonText,
  nameFont,
  descriptionFont,
  tagFont,
  buttonFont,
  shouldAnimate,
  onClick,
  imageMargin,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.35 })
  const allowMotion = shouldAnimate && inView
  const imageHeightActive = 0.56
  const imageHeightInactive = 1
  const imageInset = imageMargin

  const spring = useMemo(
    () => ({ type: 'spring', stiffness: 320, damping: 34, mass: 1.05 }),
    [],
  )

  return (
    <motion.article
      ref={ref}
      initial={false}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      aria-label={`${member.name} card`}
      whileHover={
        allowMotion
          ? { scale: isActive ? 1.03 : 0.99, y: isActive ? -6 : -2 }
          : undefined
      }
      whileTap={allowMotion ? { scale: isActive ? 1.015 : 0.985 } : undefined}
      style={{
        position: 'relative',
        width: cardWidth,
        height: cardHeight,
        flex: '0 0 auto',
        borderRadius: radius,
        boxShadow: isActive
          ? shadow && shadow !== 'none'
            ? shadow
            : '0 18px 50px rgba(0,0,0,0.12)'
          : '0 10px 30px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: cardBackground,
        WebkitTapHighlightColor: 'transparent',
        willChange: 'transform',
      }}
      animate={
        allowMotion
          ? { scale: isActive ? 1.02 : 0.97, y: isActive ? -4 : 0 }
          : undefined
      }
      transition={spring}
    >
      <motion.div
        initial={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          willChange: 'height, top, left, right',
          zIndex: 2,
        }}
        animate={{
          top: imageInset,
          left: imageInset,
          right: imageInset,
          height: isActive
            ? `calc(${imageHeightActive * 100}% - ${imageInset * 2}px)`
            : `calc(${imageHeightInactive * 100}% - ${imageInset * 2}px)`,
          borderRadius: `calc(${radius} - 12px)`,
        }}
        transition={spring}
      >
        <img
          src={member.image?.src}
          srcSet={member.image?.srcSet}
          alt={member.image?.alt || 'Portrait'}
          style={{
            width: '100%',
            height: `${Math.max(0, cardHeight - imageInset * 2)}px`,
            objectFit: 'cover',
            objectPosition: isActive ? 'center 90%' : 'center',
            display: 'block',
            transform: 'translateZ(0)',
          }}
          draggable={false}
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={false}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: `${Math.round(imageHeightActive * 100)}%`,
          background: cardBackground,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
          padding: '20px 22px 22px',
          willChange: 'transform, opacity',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        animate={
          allowMotion
            ? { opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }
            : { opacity: isActive ? 1 : 0 }
        }
        transition={spring}
      >
        <div style={{ ...nameFont, color: textColor, margin: 0, lineHeight: nameFont?.lineHeight || '1.1em' }}>
          {member.name}
        </div>
        <div style={{ ...descriptionFont, color: textColor, opacity: 0.82, marginTop: 8 }}>
          {member.description}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginTop: 16,
          }}
        >
          <span
            style={{
              ...tagFont,
              padding: '7px 10px',
              borderRadius: 999,
              background: tagBg,
              color: tagText,
              whiteSpace: 'nowrap',
            }}
          >
            {member.tag}
          </span>
          {member.buttonLink ? (
            <motion.a
              href={member.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={allowMotion ? { scale: 1.02 } : undefined}
              whileTap={allowMotion ? { scale: 0.99 } : undefined}
              style={{
                ...buttonFont,
                padding: '10px 14px',
                borderRadius: 999,
                background: buttonBg,
                color: buttonText,
                border: '1px solid rgba(0,0,0,0.10)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${buttonLabel} for ${member.name}`}
            >
              {buttonLabel}
            </motion.a>
          ) : (
            <motion.button
              type="button"
              disabled
              whileHover={allowMotion ? { scale: 1.02 } : undefined}
              whileTap={allowMotion ? { scale: 0.99 } : undefined}
              style={{
                ...buttonFont,
                padding: '10px 14px',
                borderRadius: 999,
                background: buttonBg,
                color: buttonText,
                border: '1px solid rgba(0,0,0,0.10)',
                cursor: 'not-allowed',
                whiteSpace: 'nowrap',
                opacity: 0.6,
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${buttonLabel} for ${member.name} (no link)`}
            >
              {buttonLabel}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function TeamMemberCardCarousel({
  members = [],
  buttonLabel = 'View Profile',
  backgroundColor = '#FFFFFF',
  cardBackground = '#FFFFFF',
  textColor = '#000000',
  tagBg = '#F5F5F5',
  tagText = '#000000',
  buttonBg = '#1e45ff',
  buttonText = '#FFFFFF',
  nameFont = defaultNameFont,
  descriptionFont = defaultDescriptionFont,
  tagFont = defaultTagFont,
  buttonFont = defaultButtonFont,
  radius = '32px',
  shadow = '0 18px 50px rgba(0,0,0,0.12)',
  gap = 34,
  padding = 48,
  imageMargin = 10,
  desktopCardWidth = 360,
  desktopCardHeight = 520,
  arrowSize = 48,
  arrowBg = 'rgba(255,255,255,0.75)',
  arrowIcon = '#000000',
  className = '',
  style,
}) {
  const safeMembers = useMemo(() => {
    const list = Array.isArray(members) ? members.filter(Boolean) : []
    if (!list.length) return []

    return list.map((m, idx) => {
      const rawImage = m?.image
      const normalizedImage =
        rawImage && typeof rawImage === 'object'
          ? {
              src: typeof rawImage.src === 'string' ? rawImage.src : '',
              srcSet: typeof rawImage.srcSet === 'string' ? rawImage.srcSet : undefined,
              alt: typeof rawImage.alt === 'string' ? rawImage.alt : 'Portrait',
            }
          : { src: typeof rawImage === 'string' ? rawImage : '', alt: 'Portrait' }

      const fallback = fallbackPortraits[idx % fallbackPortraits.length]
      const image = normalizedImage?.src ? normalizedImage : { src: fallback.src, alt: normalizedImage?.alt || fallback.alt }

      return {
        image,
        name: typeof m?.name === 'string' ? m.name : '',
        description: typeof m?.description === 'string' ? m.description : '',
        tag: typeof m?.tag === 'string' ? m.tag : '',
        buttonLink: typeof m?.buttonLink === 'string' ? m.buttonLink : '',
      }
    })
  }, [members])

  const count = safeMembers.length
  const container = useElementSize()
  const isMobile = container.size.width > 0 && container.size.width < 640
  const isTablet = container.size.width >= 640 && container.size.width < 980
  const tabletW = Math.round(desktopCardWidth * 0.9)
  const tabletH = Math.round(desktopCardHeight * 0.92)
  const mobileW = Math.round(desktopCardWidth * 0.84)
  const mobileH = Math.round(desktopCardHeight * 0.88)
  const cardW = isMobile ? mobileW : isTablet ? tabletW : desktopCardWidth
  const cardH = isMobile ? mobileH : isTablet ? tabletH : desktopCardHeight
  const step = cardW + gap

  const centerOffset = useMemo(() => {
    const viewportW = container.size.width || 1200
    const sidePad = padding
    const available = Math.max(0, viewportW - sidePad * 2)
    return (available - cardW) / 2
  }, [container.size.width, cardW, padding])

  const shouldAnimate = typeof window !== 'undefined'
  const x = useMotionValue(0)
  const [index, setIndex] = useState(0)
  const didInitRef = useRef(false)
  const indexRef = useRef(index)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const snapToIndex = useCallback(
    (next, options) => {
      if (!count) return
      const clamped = clamp(next, 0, count - 1)
      const targetX = -(clamped * step) + centerOffset

      if (options?.immediate || !shouldAnimate) {
        x.set(targetX)
        startTransition(() => setIndex(clamped))
        return
      }

      startTransition(() => setIndex(clamped))
      animate(x, targetX, { type: 'spring', stiffness: 320, damping: 34, mass: 0.9 })
    },
    [count, step, centerOffset, shouldAnimate, x],
  )

  useEffect(() => {
    if (!count) return
    const initial = didInitRef.current
      ? clamp(indexRef.current, 0, count - 1)
      : clamp(Math.floor(count / 2), 0, count - 1)
    didInitRef.current = true
    startTransition(() => setIndex(initial))
    const targetX = -(initial * step) + centerOffset
    x.set(targetX)
  }, [count, step, centerOffset, padding, x])

  const goNext = useCallback(() => {
    if (!count) return
    snapToIndex(indexRef.current + 1)
  }, [count, snapToIndex])

  const goPrev = useCallback(() => {
    if (!count) return
    snapToIndex(indexRef.current - 1)
  }, [count, snapToIndex])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    },
    [goNext, goPrev],
  )

  const onDragEnd = useCallback(
    (_, info) => {
      if (!count || !shouldAnimate) return

      const offset = info.offset.x
      const velocity = info.velocity.x
      const swipePower = offset + velocity * 0.25
      const threshold = Math.max(40, step * 0.25)
      let nextIndex = indexRef.current

      if (swipePower < -threshold) nextIndex += 1
      else if (swipePower > threshold) nextIndex -= 1
      else {
        const raw = -(x.get() - (centerOffset + padding)) / step
        nextIndex = Math.round(raw)
      }

      snapToIndex(nextIndex)
    },
    [count, shouldAnimate, step, x, centerOffset, padding, snapToIndex],
  )

  const effectiveArrowSize = isMobile ? Math.round(arrowSize * 0.82) : arrowSize

  const arrowButtonBase = {
    width: effectiveArrowSize,
    height: effectiveArrowSize,
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.06)',
    background: arrowBg,
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    backdropFilter: 'blur(10px)',
  }

  function ArrowIcon({ dir }) {
    const rotate = dir === 'left' ? 180 : 0
    return (
      <svg
        width={Math.round(effectiveArrowSize * 0.44)}
        height={Math.round(effectiveArrowSize * 0.44)}
        viewBox="0 0 24 24"
        style={{ transform: `rotate(${rotate}deg)` }}
        aria-hidden="true"
      >
        <path
          d="M9 18l6-6-6-6"
          fill="none"
          stroke={arrowIcon}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (!count) return null

  return (
    <div
      ref={container.ref}
      className={className}
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: backgroundColor,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      tabIndex={0}
      onKeyDown={shouldAnimate ? handleKeyDown : undefined}
      role="region"
      aria-label="Team member carousel"
    >
      <motion.button
        type="button"
        aria-label="Previous"
        onClick={goPrev}
        whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
        whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
        style={{
          ...arrowButtonBase,
          position: 'absolute',
          left: 18,
          top: '50%',
          marginTop: -effectiveArrowSize / 2,
          zIndex: 5,
        }}
      >
        <ArrowIcon dir="left" />
      </motion.button>

      <motion.button
        type="button"
        aria-label="Next"
        onClick={goNext}
        whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
        whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
        style={{
          ...arrowButtonBase,
          position: 'absolute',
          right: 18,
          top: '50%',
          marginTop: -effectiveArrowSize / 2,
          zIndex: 5,
        }}
      >
        <ArrowIcon dir="right" />
      </motion.button>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap,
            x,
            willChange: 'transform',
            touchAction: 'pan-y',
          }}
          drag={shouldAnimate ? 'x' : false}
          dragConstraints={shouldAnimate ? { left: -1e5, right: 1e5 } : undefined}
          dragElastic={0.08}
          onDragEnd={shouldAnimate ? onDragEnd : undefined}
          aria-label="Carousel track"
        >
          {safeMembers.map((m, i) => (
            <MemberCard
              key={`${m.name}-${i}`}
              member={m}
              isActive={i === index}
              cardWidth={cardW}
              cardHeight={cardH}
              radius={radius}
              shadow={shadow}
              cardBackground={cardBackground}
              textColor={textColor}
              tagBg={tagBg}
              tagText={tagText}
              buttonLabel={buttonLabel}
              buttonBg={buttonBg}
              buttonText={buttonText}
              nameFont={nameFont}
              descriptionFont={descriptionFont}
              tagFont={tagFont}
              buttonFont={buttonFont}
              shouldAnimate={shouldAnimate}
              onClick={() => snapToIndex(i)}
              imageMargin={imageMargin}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
