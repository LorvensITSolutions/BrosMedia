import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqIntro, faqItems } from '../data/faq'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

function Chevron({ open }) {
  return (
    <motion.svg
      className="h-5 w-5 shrink-0 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </motion.svg>
  )
}

function FaqItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.li variants={fadeUp} className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 py-5 text-left sm:py-6"
      >
        <span className="flex items-start gap-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-semibold text-white sm:text-lg">{item.question}</span>
        </span>
        <Chevron open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-11 text-sm leading-relaxed text-white/60 sm:pb-6 sm:pl-11 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function FaqSection() {
  const [openId, setOpenId] = useState(faqItems[0].id)

  return (
    <section id="faq" className="bg-black font-sans">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/85">
              {faqIntro.label}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {faqIntro.title}
            </h2>
          </motion.div>

          <motion.ul
            variants={stagger}
            className="mt-10 rounded-[28px] border border-white/10 bg-[#141414] px-5 sm:mt-12 sm:px-8 lg:rounded-[32px] lg:px-10"
          >
            {faqItems.map((item, index) => (
              <FaqItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? '' : item.id))}
              />
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
