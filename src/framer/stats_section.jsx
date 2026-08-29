// Vite port of Framer StatsSection
// https://framer.com/m/StatsSection-n7ZGfl.js@EluX29wrAkppvSEi5jLA

import { useEffect, useRef, useState } from 'react'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t)
}

function measureText(text, fontSize, fontWeight, fontFamily) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 0
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  return ctx.measureText(text).width
}

function AnimatedNumber({
  end,
  duration,
  prefix,
  suffix,
  decimals,
  separator,
  shouldStart,
  font,
  numberColor,
}) {
  const [display, setDisplay] = useState('0')
  const raf = useRef(null)

  useEffect(() => {
    if (!shouldStart) return undefined

    if (raf.current) cancelAnimationFrame(raf.current)

    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = easeOutExpo(progress)
      const current = eased * end
      const formatted = separator
        ? current.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : current.toFixed(decimals)

      setDisplay(formatted)

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick)
      }
    }

    raf.current = requestAnimationFrame(tick)

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [shouldStart, end, duration, decimals, separator])

  return (
    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontSize: font?.fontSize ?? 48,
        fontWeight: font?.fontWeight ?? 700,
        fontFamily: font?.fontFamily ?? 'Montserrat, sans-serif',
        fontStyle: font?.fontStyle ?? 'normal',
        color: numberColor,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

function StatItem({
  value,
  label,
  prefix,
  suffix,
  decimals,
  separator,
  duration,
  shouldStart,
  font,
  numberColor,
  labelFont,
  labelColor,
  labelTextTransform,
  gap,
  compact = false,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        alignItems: 'center',
        width: compact ? '100%' : undefined,
        maxWidth: compact ? 160 : undefined,
      }}
    >
      <AnimatedNumber
        end={value}
        duration={duration}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        separator={separator}
        shouldStart={shouldStart}
        font={font}
        numberColor={numberColor}
      />
      <span
        style={{
          fontSize: labelFont?.fontSize ?? 14,
          fontWeight: labelFont?.fontWeight ?? 500,
          fontFamily: labelFont?.fontFamily ?? 'Montserrat, sans-serif',
          fontStyle: labelFont?.fontStyle ?? 'normal',
          color: labelColor,
          lineHeight: 1.35,
          textAlign: 'center',
          textTransform: labelTextTransform,
          maxWidth: compact ? 130 : undefined,
          wordBreak: compact ? 'break-word' : undefined,
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function StatsSection({
  stats = [
    { value: 10000, label: 'Happy Customers', prefix: '', suffix: '+', decimals: 0 },
    { value: 99.9, label: 'Uptime SLA', prefix: '', suffix: '%', decimals: 1 },
    { value: 500, label: 'Projects Shipped', prefix: '', suffix: '+', decimals: 0 },
    { value: 4.9, label: 'Average Rating', prefix: '★ ', suffix: '', decimals: 1 },
  ],
  duration = 2,
  separator = true,
  triggerOnView = true,
  font = { fontSize: 48, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' },
  numberColor = '#000000',
  labelFont = { fontSize: 14, fontWeight: 500, fontFamily: 'Montserrat, sans-serif' },
  labelColor = '#888888',
  labelTextTransform = 'none',
  itemGap = 8,
  columnGap = 32,
  rowGap = 32,
  minItemWidth = 140,
  divider = false,
  dividerColor = '#E5E5E5',
  paddingTop = 40,
  paddingRight = 48,
  paddingBottom = 40,
  paddingLeft = 48,
  mobilePaddingTop,
  background = 'transparent',
  borderRadius = 0,
  className = '',
}) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [cellWidth, setCellWidth] = useState(minItemWidth)
  const [isMobile, setIsMobile] = useState(false)

  const fontSize = font?.fontSize ?? 48
  const fontWeight = font?.fontWeight ?? 700
  const fontFamily = font?.fontFamily ?? 'Montserrat, sans-serif'
  const activeColumnGap = isMobile ? 16 : columnGap
  const activeRowGap = isMobile ? 20 : rowGap
  const activeFont = isMobile ? { ...font, fontSize: 34 } : font
  const activeLabelFont = isMobile
    ? { ...labelFont, fontSize: 12 }
    : labelFont

  useEffect(() => {
    const mobileMedia = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mobileMedia.matches)
    update()
    mobileMedia.addEventListener('change', update)
    return () => mobileMedia.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const calculate = () => {
      const max = Math.max(
        minItemWidth,
        ...stats.map((stat) => {
          const finalNumber = separator
            ? stat.value.toLocaleString('en-US', {
                minimumFractionDigits: stat.decimals ?? 0,
                maximumFractionDigits: stat.decimals ?? 0,
              })
            : Number(stat.value).toFixed(stat.decimals ?? 0)
          const fullText = `${stat.prefix ?? ''}${finalNumber}${stat.suffix ?? ''}`
          return Math.ceil(measureText(fullText, fontSize, fontWeight, fontFamily)) + 24
        }),
      )
      setCellWidth(max)
    }

    document.fonts.ready.then(calculate)
  }, [stats, fontSize, fontWeight, fontFamily, separator, minItemWidth])

  useEffect(() => {
    if (!triggerOnView) {
      setStarted(true)
      return undefined
    }

    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggerOnView])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: isMobile ? 'grid' : 'flex',
        gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : undefined,
        flexWrap: isMobile ? undefined : 'wrap',
        justifyContent: 'center',
        columnGap: activeColumnGap,
        rowGap: activeRowGap,
        width: '100%',
        maxWidth: isMobile ? 420 : undefined,
        marginInline: isMobile ? 'auto' : undefined,
        paddingTop: isMobile ? (mobilePaddingTop ?? Math.min(paddingTop, 12)) : paddingTop,
        paddingRight: isMobile ? Math.min(paddingRight, 20) : paddingRight,
        paddingBottom: isMobile ? Math.min(paddingBottom, 24) : paddingBottom,
        paddingLeft: isMobile ? Math.min(paddingLeft, 20) : paddingLeft,
        background,
        borderRadius,
        boxSizing: 'border-box',
      }}
    >
      {stats.map((stat, index) => {
        const showDivider = divider && !isMobile && index > 0

        return (
          <div
            key={`${stat.label}-${index}`}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isMobile ? 'auto' : cellWidth,
              flexShrink: 0,
              boxSizing: 'border-box',
              paddingLeft: showDivider ? 12 : 0,
            }}
          >
            {showDivider && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '15%',
                  height: '70%',
                  width: 1,
                  background: dividerColor,
                }}
              />
            )}
            <StatItem
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix ?? ''}
              suffix={stat.suffix ?? ''}
              decimals={stat.decimals ?? 0}
              separator={separator}
              duration={duration}
              shouldStart={started}
              font={activeFont}
              numberColor={numberColor}
              labelFont={activeLabelFont}
              labelColor={labelColor}
              labelTextTransform={labelTextTransform}
              gap={itemGap}
              compact={isMobile}
            />
          </div>
        )
      })}
    </div>
  )
}
