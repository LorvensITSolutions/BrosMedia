// Vite port of Framer Stackflowcards / StackingCards
// https://framer.com/m/Stackflowcards-Sd0nNR.js@sJDOnn2jYnYucRtd8T0Q
// Image area replaced with custom content via `renderBody`.

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

function shade(hex, amount) {
  let color = (hex || '#888888').replace('#', '')
  if (color.length === 3) {
    color = color
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const num = parseInt(color, 16)
  if (Number.isNaN(num)) return hex
  let r = (num >> 16) & 255
  let g = (num >> 8) & 255
  let b = num & 255
  r = Math.min(255, Math.max(0, Math.round(r + 255 * amount)))
  g = Math.min(255, Math.max(0, Math.round(g + 255 * amount)))
  b = Math.min(255, Math.max(0, Math.round(b + 255 * amount)))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function parsePaddingSides(padding) {
  const nums = (padding || '0px')
    .trim()
    .split(/\s+/)
    .map((p) => parseFloat(p) || 0)
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0
  if (nums.length === 1) top = right = bottom = left = nums[0]
  else if (nums.length === 2) {
    top = bottom = nums[0]
    right = left = nums[1]
  } else if (nums.length === 3) {
    top = nums[0]
    right = left = nums[1]
    bottom = nums[2]
  } else [top, right, bottom, left] = nums
  return { top, right, bottom, left }
}

function CardFace({
  data,
  cardRadius,
  cardPadding,
  imageRadius,
  gapAfterHeader,
  titleFont,
  descriptionFont,
  shadow,
  cardShadow,
  placeholderColor,
  renderBody,
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: data.background,
        borderRadius: cardRadius,
        padding: cardPadding,
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: shadow ? cardShadow : 'none',
        border: data.border || '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          flexShrink: 0,
        }}
      >
        <div style={{ minWidth: 0, flex: '1 1 220px' }}>
          {data.eyebrow ? (
            <p
              style={{
                margin: '0 0 8px',
                color: data.eyebrowColor || '#dfff00',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {data.eyebrow}
            </p>
          ) : null}
          <h3 style={{ margin: 0, color: data.titleColor, ...titleFont }}>{data.title}</h3>
          {data.subtitle ? (
            <p
              style={{
                margin: '8px 0 0',
                color: data.descriptionColor,
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              {data.subtitle}
            </p>
          ) : null}
        </div>
        {data.description ? (
          <p
            style={{
              margin: 0,
              maxWidth: 340,
              color: data.descriptionColor,
              ...descriptionFont,
            }}
          >
            {data.description}
          </p>
        ) : null}
      </div>

      <div style={{ height: gapAfterHeader, flexShrink: 0 }} />

      <div
        style={{
          width: '100%',
          flex: '1 1 auto',
          minHeight: 0,
          borderRadius: imageRadius,
          overflow: 'hidden',
          background: placeholderColor,
        }}
      >
        {typeof renderBody === 'function' ? (
          renderBody(data)
        ) : data.image?.src ? (
          <img
            src={data.image.src}
            alt={data.image.alt || data.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : null}
      </div>
    </div>
  )
}

function AnimatedCard({
  data,
  index,
  isLast,
  activeFloat,
  cardWidth,
  cardHeight,
  cardRadius,
  cardPadding,
  imageRadius,
  gapAfterHeader,
  titleFont,
  descriptionFont,
  perspective,
  depth,
  entrance,
  spring,
  shadow,
  cardShadow,
  zIndexBase,
  renderBody,
}) {
  const rawD = useTransform(activeFloat, (v) => v - index)
  const d = useSpring(rawD, spring)
  const maxDepth = Math.max(depth.visibleDepth, 1)
  const inputRange = [-1, 0, maxDepth]
  const translateZ = useTransform(d, inputRange, [-entrance.distance, 0, -depth.zStep * maxDepth])
  const scale = useTransform(d, inputRange, [entrance.scale, 1, 1 - depth.scaleStep * maxDepth])
  const rotateX = useTransform(d, inputRange, [entrance.tilt, 0, depth.tiltAngle])
  const translateY = useTransform(d, inputRange, [
    entrance.distance * 0.25,
    0,
    depth.stackOffset * maxDepth,
  ])
  const opacity = useTransform(d, [-1, -0.6, 0, maxDepth], [0, 1, 1, depth.opacityFloor])
  const darken = useTransform(d, [0, maxDepth], [0, depth.darkenAmount])
  const placeholderColor = useMemo(() => shade(data.background, -0.08), [data.background])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: cardWidth,
        height: cardHeight,
        margin: 'auto',
        perspective,
        zIndex: zIndexBase + index,
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          translateZ,
          translateY,
          scale,
          rotateX,
          opacity,
          transformOrigin: '50% 100%',
          transformPerspective: perspective,
          willChange: 'transform, opacity',
        }}
      >
        <CardFace
          data={data}
          cardRadius={cardRadius}
          cardPadding={cardPadding}
          imageRadius={imageRadius}
          gapAfterHeader={gapAfterHeader}
          titleFont={titleFont}
          descriptionFont={descriptionFont}
          shadow={shadow}
          cardShadow={cardShadow}
          placeholderColor={placeholderColor}
          renderBody={renderBody}
        />
        {!isLast ? (
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: cardRadius,
              background: '#000000',
              opacity: darken,
              pointerEvents: 'none',
            }}
          />
        ) : null}
      </motion.div>
    </div>
  )
}

const defaultTitleFont = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: 28,
  lineHeight: '1.05em',
  letterSpacing: '-0.02em',
}

const defaultDescriptionFont = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  fontSize: 15,
  lineHeight: '1.45em',
  letterSpacing: '-0.01em',
}

const defaultDepth = {
  visibleDepth: 3,
  zStep: 0,
  scaleStep: 0.05,
  stackOffset: 16,
  tiltAngle: 5,
  darkenAmount: 0.35,
  opacityFloor: 1,
}

const defaultEntrance = {
  distance: 40,
  scale: 0.92,
  tilt: 0,
}

export default function StackflowCards({
  cards = [],
  titleFont = defaultTitleFont,
  descriptionFont = defaultDescriptionFont,
  cardRadius = 24,
  imageRadius = 16,
  cardPadding = 28,
  cardWidth = 920,
  cardHeight = 520,
  gapAfterHeader = 28,
  framePadding = '48px 24px 48px 24px',
  stagePosition = 0,
  sectionHeight = 720,
  topSpacing = 60,
  bottomSpacing = 180,
  perspective = 1200,
  depthSettings = defaultDepth,
  entranceSettings = defaultEntrance,
  shadow = true,
  cardShadow = '0px 24px 48px -18px rgba(0,0,0,0.55)',
  springTransition = { stiffness: 260, damping: 34, mass: 1 },
  background = '#000000',
  stageBackground = 'transparent',
  renderBody,
  className = '',
}) {
  const list = cards?.length ? cards : []
  const containerRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined
    const measure = () => setContainerHeight(el.scrollHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [list.length, sectionHeight, topSpacing, bottomSpacing])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const pxScrolled = useTransform(scrollYProgress, (v) => v * containerHeight)
  const activeFloat = useTransform(pxScrolled, (v) =>
    sectionHeight > 0 ? (v - topSpacing) / sectionHeight : 0,
  )

  const spring = {
    stiffness: springTransition?.stiffness ?? 260,
    damping: springTransition?.damping ?? 34,
    mass: springTransition?.mass ?? 1,
  }

  const { top: padTop, right: padRight, bottom: padBottom, left: padLeft } =
    parsePaddingSides(framePadding)
  const avgPadding = (padTop + padRight + padBottom + padLeft) / 4
  const frameWidth = cardWidth + padLeft + padRight
  const frameHeight = cardHeight + padTop + padBottom
  const stageRadius = cardRadius + avgPadding * 0.4

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height:
          sectionHeight * Math.max(list.length - 1, 0) +
          topSpacing +
          bottomSpacing +
          cardHeight,
        background,
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: `calc(50vh - ${frameHeight / 2}px + ${stagePosition}px)`,
          width: frameWidth,
          maxWidth: '100%',
          height: frameHeight,
          margin: '0 auto',
          padding: framePadding,
          boxSizing: 'border-box',
          background: stageBackground,
          borderRadius: stageRadius,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {list.map((card, i) => (
            <AnimatedCard
              key={card.id || i}
              data={card}
              index={i}
              isLast={i === list.length - 1}
              activeFloat={activeFloat}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardRadius={cardRadius}
              cardPadding={cardPadding}
              imageRadius={imageRadius}
              gapAfterHeader={gapAfterHeader}
              titleFont={titleFont}
              descriptionFont={descriptionFont}
              perspective={perspective}
              depth={depthSettings}
              entrance={entranceSettings}
              spring={spring}
              shadow={shadow}
              cardShadow={cardShadow}
              zIndexBase={1}
              renderBody={renderBody}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
