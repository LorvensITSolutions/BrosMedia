import { motion } from 'framer-motion'
import { founderNote } from '../data/team'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export default function FounderNote() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-black font-sans text-white"
      aria-label="Founder note"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(223,255,0,0.08),transparent_50%)]"
      />

      <div className="section-pad relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mx-auto max-w-3xl border-l-2 border-accent pl-5 sm:pl-7"
        >
          <p className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
            “{founderNote.pullQuote}”
          </p>
          
        </motion.blockquote>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto mt-12 max-w-2xl sm:mt-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {founderNote.label} · Founded {founderNote.founded}
          </motion.p>

          <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-white/70 sm:text-base sm:leading-[1.75]">
            {founderNote.letter.map((para) => (
              <motion.p key={para.slice(0, 32)} variants={fadeUp}>
                {para}
              </motion.p>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm font-semibold text-white"
          >
            - {founderNote.founderName},{' '}
            <span className="font-medium text-white/50">{founderNote.founderTitle}</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
