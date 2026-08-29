// Vite port inspired by Framer FlowStack (Fluid Card Stack)
// https://www.framer.com/marketplace/components/fluid-card-stack/

import { useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'

const expandSpring = { type: 'spring', stiffness: 58, damping: 26, mass: 1.2 }
const layoutSpring = { type: 'spring', stiffness: 48, damping: 24, mass: 1.25 }
const imageSpring = { type: 'spring', stiffness: 45, damping: 22, mass: 1.35 }
const overlayEase = { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }

function StackCard({
  item,
  index,
  isActive,
  onActivate,
  layout = 'row',
}) {
  const isRow = layout === 'row'

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onClick={() => onActivate(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onActivate(index)
        }
      }}
      className="relative min-w-0 cursor-pointer overflow-hidden rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      animate={
        isRow
          ? { flex: isActive ? 4 : 1, minWidth: isActive ? 0 : 64 }
          : { height: isActive ? 240 : 72 }
      }
      transition={{
        layout: layoutSpring,
        flex: expandSpring,
        minWidth: expandSpring,
        height: expandSpring,
      }}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        animate={{ scale: isActive ? 1.03 : 1.14 }}
        transition={imageSpring}
        style={{ transformOrigin: 'center center' }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/25"
        animate={{ opacity: isActive ? 0.92 : 0.72 }}
        transition={overlayEase}
      />
      <motion.div
        className="absolute inset-0 bg-accent/10"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={overlayEase}
      />

      <div className="relative flex h-full flex-col justify-end p-4 sm:p-5 lg:p-6">
        <motion.span
          className="text-xs font-bold tracking-wider text-secondary"
          animate={{ opacity: isActive ? 1 : 0.85 }}
          transition={overlayEase}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        <motion.h3
          layout="position"
          className="mt-2 font-bold leading-tight text-white"
          animate={{
            fontSize: isActive ? (isRow ? '1.35rem' : '1.25rem') : '0.875rem',
            opacity: isActive ? 1 : 0.9,
          }}
          transition={expandSpring}
        >
          {isActive ? item.title : item.shortTitle ?? item.title}
        </motion.h3>

        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 12,
            marginTop: isActive ? 12 : 0,
            maxHeight: isActive ? 160 : 0,
          }}
          transition={{
            opacity: { ...expandSpring, delay: isActive ? 0.06 : 0 },
            y: expandSpring,
            marginTop: expandSpring,
            maxHeight: expandSpring,
          }}
        >
          <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function FluidCardStack({
  items = [],
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  if (items.length === 0) return null

  const focusedIndex = hoveredIndex ?? activeIndex

  const handleActivate = (index) => {
    setActiveIndex(index)
    setHoveredIndex(index)
  }

  return (
    <div className={className}>
      <LayoutGroup>
        <div
          className="hidden h-[min(68vh,520px)] gap-3 lg:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {items.map((item, index) => (
            <StackCard
              key={item.id ?? index}
              item={item}
              index={index}
              isActive={focusedIndex === index}
              onActivate={handleActivate}
              layout="row"
            />
          ))}
        </div>
      </LayoutGroup>

      <LayoutGroup>
        <div className="flex flex-col gap-3 lg:hidden">
          {items.map((item, index) => (
            <StackCard
              key={item.id ?? index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onActivate={setActiveIndex}
              layout="column"
            />
          ))}
        </div>
      </LayoutGroup>
    </div>
  )
}
