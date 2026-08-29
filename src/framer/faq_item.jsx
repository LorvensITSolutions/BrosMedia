// Vite port of Framer FAQ Item
// https://framer.com/m/FAQ-vCoC.js@cfOy7dW5O34bPIU4H0Vn

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const transition = { duration: 0.3, ease: [0.44, 0, 0.56, 1] }

export default function FaqItem({ number, question, answer, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      className={`overflow-hidden rounded-2xl border transition-colors ${
        isOpen
          ? 'border-accent/25 bg-white/[0.06]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-start gap-2 px-4 py-4 text-left sm:px-8 sm:py-[18px]"
      >
        <span className="shrink-0 px-1 text-lg leading-7 text-white/40 sm:px-2 sm:text-xl sm:leading-8">{number}</span>
        <span className="min-w-0 flex-1 pt-0.5 text-sm font-medium leading-snug text-white sm:text-[0.9375rem] sm:leading-5">
          {question}
        </span>
        <motion.span
          className="mt-1 shrink-0 text-white/45"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={transition}
          aria-hidden
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pl-[2.75rem] text-sm leading-relaxed text-white/60 sm:px-8 sm:pb-[18px] sm:pl-[3.75rem] sm:leading-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
