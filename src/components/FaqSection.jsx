import { motion } from 'framer-motion'
import { faqIntro, talkPoints } from '../data/faq'
import { PrimaryBookingButton } from './ui/HeroStyleCtas'

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

export default function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
            >
              {faqIntro.label}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-[clamp(1.65rem,4.5vw,2.75rem)] font-black tracking-tight"
            >
              {faqIntro.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
            >
              {faqIntro.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <PrimaryBookingButton />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-3 text-xs text-white/40">
              Opens WhatsApp - free 30-min strategy call.
            </motion.p>
          </div>

          <motion.ul variants={stagger} className="space-y-0 border-t border-white/10">
            {talkPoints.map((point) => (
              <motion.li
                key={point.id}
                variants={fadeUp}
                className="border-b border-white/10 py-5 sm:py-6"
              >
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
                  {point.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
