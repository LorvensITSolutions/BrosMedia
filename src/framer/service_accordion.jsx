// Port of Framer Service Accordion
// https://framer.com/m/Service-Accordion-9AKRk0.js@5705lIQS0zFn3fQ1EDtH

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 200, damping: 40, mass: 0.4 }

function PlusIcon({ className = '' }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MinusIcon({ className = '' }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ServiceAccordionItem({
  title,
  tags = [],
  image,
  imageAlt = '',
  isOpen,
  onToggle,
  titleColor = '#000000',
  dividerColor = 'rgba(30, 69, 255, 0.25)',
  iconBorderColor = 'rgba(30, 69, 255, 0.2)',
}) {
  return (
    <motion.div
      layout
      transition={spring}
      className="w-full cursor-pointer overflow-hidden"
      onClick={onToggle}
    >
      <div className="flex w-full items-center gap-4 sm:gap-6">
        <motion.h3
          layout
          className="min-w-0 flex-1 text-left font-bold uppercase tracking-tight"
          style={{
            color: titleColor,
            fontSize: 'clamp(1.5rem, 4vw, 3.75rem)',
            lineHeight: 1.1,
          }}
        >
          {title}
        </motion.h3>

        <motion.button
          type="button"
          layout
          aria-expanded={isOpen}
          aria-label={isOpen ? `Close ${title}` : `Open ${title}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-[60px] sm:w-[60px]"
          style={{
            border: `1px solid ${iconBorderColor}`,
            color: titleColor,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <MinusIcon />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <PlusIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="body"
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={spring}
            className="flex flex-col gap-6 pt-8 sm:gap-8 sm:pt-10"
          >
            {tags.length > 0 ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                {tags.map((tag, index) => (
                  <div key={`${tag}-${index}`} className="flex items-center gap-4 sm:contents">
                    {index > 0 ? (
                      <div
                        className="hidden h-px min-w-5 flex-1 sm:block"
                        style={{ backgroundColor: dividerColor }}
                      />
                    ) : null}
                    <p
                      className="text-sm font-medium sm:text-lg"
                      style={{ color: titleColor, lineHeight: 1.5 }}
                    >
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {image ? (
              <motion.div
                layout
                className="aspect-[3.26/1] w-full overflow-hidden rounded-2xl sm:rounded-3xl"
              >
                <img
                  src={image}
                  alt={imageAlt || title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ServiceAccordion({
  items = [],
  defaultOpenId,
  titleColor = '#000000',
  dividerColor = 'rgba(30, 69, 255, 0.25)',
  iconBorderColor = 'rgba(30, 69, 255, 0.2)',
  className = '',
}) {
  const [activeId, setActiveId] = useState(defaultOpenId ?? items[0]?.id ?? null)

  const handleToggle = (id) => {
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <div className={`flex w-full flex-col gap-10 sm:gap-12 ${className}`}>
      {items.map((item) => (
        <ServiceAccordionItem
          key={item.id}
          title={item.title}
          tags={item.tags}
          image={item.image}
          imageAlt={item.imageAlt}
          isOpen={activeId === item.id}
          onToggle={() => handleToggle(item.id)}
          titleColor={titleColor}
          dividerColor={dividerColor}
          iconBorderColor={iconBorderColor}
        />
      ))}
    </div>
  )
}

export function WhyBrosmediaAccordion({ differentiators }) {
  const items = differentiators.items.map((item) => ({
    id: item.id,
    title: item.title,
    tags: item.tags ?? [item.text],
    image: item.image,
    imageAlt: item.imageAlt ?? item.title,
  }))

  return (
    <ServiceAccordion
      items={items}
      defaultOpenId={items[0]?.id}
      titlecolor="#ffffff"
      dividerColor="rgba(30, 69, 255, 0.22)"
      iconBorderColor="rgba(30, 69, 255, 0.18)"
    />
  )
}
