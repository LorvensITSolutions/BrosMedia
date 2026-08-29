// Vite port inspired by Framer Testimonials Pro (ONYRI Strategy)
// https://www.framer.com/marketplace/components/testimonials-pro/

import { useState, startTransition } from 'react'
import { motion } from 'framer-motion'

const viewport = { once: true, margin: '-60px' }
const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function TestimonialProCard({
  quote,
  name,
  designation,
  image,
  imageAlt = '',
  cardBackground = '#141414',
  quoteColor = '#111111',
  nameColor = '#111111',
  roleColor = 'rgba(17, 17, 17, 0.55)',
}) {
  return (
    <article className="w-full shrink-0">
      <div
        className="rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-6"
        style={{ backgroundColor: cardBackground }}
      >
        <p
          className="text-[15px] leading-relaxed sm:text-base"
          style={{ color: quoteColor }}
        >
          {quote}
        </p>

        <div className="mt-5 flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={imageAlt || name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)', color: nameColor }}
            >
              {name?.charAt(0) ?? '?'}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold" style={{ color: nameColor }}>
              {name}
            </p>
            {designation ? (
              <p className="truncate text-xs" style={{ color: roleColor }}>
                {designation}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function distributeColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => [])
  items.forEach((item, index) => {
    columns[index % columnCount].push({ ...item, _key: item._key || `${item.name}-${index}` })
  })
  return columns
}

function ScrollingColumn({
  items,
  direction = 'up',
  duration = 36,
  gap = 16,
  paused = false,
  cardProps,
}) {
  if (items.length === 0) return null

  const loopItems = [...items, ...items]
  const animateY = direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%']

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <motion.div
        className="flex flex-col"
        style={{ gap }}
        animate={paused ? undefined : { y: animateY }}
        transition={
          paused
            ? undefined
            : {
                duration,
                repeat: Infinity,
                ease: 'linear',
              }
        }
      >
        {loopItems.map((item, index) => (
          <TestimonialProCard
            key={`${item._key}-${index}`}
            {...item}
            {...cardProps}
          />
        ))}
      </motion.div>
    </div>
  )
}

function ScrollingGrid({
  items,
  columnCount,
  speeds,
  cardProps,
  fadeColor,
  className = '',
  heightClass = '',
}) {
  const [paused, setPaused] = useState(false)
  const columns = distributeColumns(items, columnCount)

  return (
    <div
      className={`relative overflow-hidden ${heightClass} ${className}`}
      style={{ height: heightClass ? undefined : 'clamp(420px, 52vh, 620px)' }}
      onMouseEnter={() => startTransition(() => setPaused(true))}
      onMouseLeave={() => startTransition(() => setPaused(false))}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 sm:h-20"
        style={{
          background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 sm:h-20"
        style={{
          background: `linear-gradient(to top, ${fadeColor}, transparent)`,
        }}
      />

      <div className="flex h-full gap-4 px-1">
        {columns.map((columnItems, index) => {
          const direction = index % 2 === 0 ? 'up' : 'down'
          const duration = speeds?.[index] ?? 32 + index * 4

          return (
            <ScrollingColumn
              key={`col-${index}`}
              items={columnItems}
              direction={direction}
              duration={duration}
              paused={paused}
              cardProps={cardProps}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function TestimonialsPro({
  items = [],
  sectionLabel = 'Testimonials',
  sectionTitle = 'What our users say',
  sectionDescription = '',
  backgroundColor = 'transparent',
  badgeBackground = 'rgba(255, 255, 255, 0.06)',
  badgeBorder = 'rgba(255, 255, 255, 0.12)',
  badgeColor = 'rgba(255, 255, 255, 0.85)',
  titleColor = '#ffffff',
  descriptionColor = 'rgba(255, 255, 255, 0.6)',
  cardBackground = '#141414',
  quoteColor = '#111111',
  nameColor = '#111111',
  roleColor = 'rgba(17, 17, 17, 0.55)',
  fadeColor = '#000000',
  className = '',
  style,
}) {
  if (items.length === 0) return null

  const cardProps = {
    cardBackground,
    quoteColor,
    nameColor,
    roleColor,
  }

  return (
    <div className={`font-sans ${className}`} style={{ backgroundColor, ...style }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="text-center"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <span
            className="inline-flex rounded-full border px-3.5 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: badgeBackground,
              borderColor: badgeBorder,
              color: badgeColor,
            }}
          >
            {sectionLabel}
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          style={{ color: titleColor }}
        >
          {sectionTitle}
        </motion.h2>

        {sectionDescription ? (
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: descriptionColor }}
          >
            {sectionDescription}
          </motion.p>
        ) : null}
      </motion.div>

      <div className="mt-10 sm:mt-12">
        <div className="hidden lg:block">
          <ScrollingGrid
            items={items}
            columnCount={3}
            speeds={[34, 40, 36]}
            cardProps={cardProps}
            fadeColor={fadeColor}
          />
        </div>

        <div className="hidden sm:block lg:hidden">
          <ScrollingGrid
            items={items}
            columnCount={2}
            speeds={[34, 38]}
            cardProps={cardProps}
            fadeColor={fadeColor}
          />
        </div>

        <div className="sm:hidden">
          <ScrollingGrid
            items={items}
            columnCount={1}
            speeds={[32]}
            cardProps={cardProps}
            fadeColor={fadeColor}
            heightClass="h-[clamp(340px,46vh,520px)]"
          />
        </div>
      </div>
    </div>
  )
}

export function TestimonialsProFromData({
  items = [],
  intro = {},
  repeat = 3,
  ...props
}) {
  const mapped = items.map((item) => ({
    quote: item.quote,
    name: item.name,
    designation: item.designation,
    image: item.image?.src || '',
    imageAlt: item.image?.alt || item.name,
  }))

  const gridItems = Array.from({ length: repeat }, (_, pass) =>
    mapped.map((item) => ({ ...item, _key: `${pass}-${item.name}` })),
  ).flat()

  return (
    <TestimonialsPro
      items={gridItems}
      sectionLabel={intro.label || 'Testimonials'}
      sectionTitle={intro.headline || 'What our clients say'}
      sectionDescription={intro.description || ''}
      {...props}
    />
  )
}
