import { motion } from 'framer-motion'
import { faqIntro, talkPoints } from '../data/faq'
import { PrimaryBookingButton } from './ui/HeroStyleCtas'
import {
  SECTION_HEADING_CLASS,
  scrollFadeUp,
  scrollStagger,
  scrollViewport,
} from '../lib/scrollMotion'

export default function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="section-pad relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scrollStagger}
          className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
        >
          <div>
            <motion.p
              variants={scrollFadeUp}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
            >
              {faqIntro.label}
            </motion.p>
            <motion.h2 variants={scrollFadeUp} className={SECTION_HEADING_CLASS}>
              <span className="text-white">{faqIntro.headlineBefore} </span>
              <span className="text-accent">{faqIntro.headlineAccent}</span>
            </motion.h2>
            <motion.p
              variants={scrollFadeUp}
              className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
            >
              {faqIntro.description}
            </motion.p>

            <motion.div variants={scrollFadeUp} className="mt-7">
              <PrimaryBookingButton />
            </motion.div>
            <motion.p variants={scrollFadeUp} className="mt-3 text-xs text-white/40">
              Opens WhatsApp - free 30-min strategy call.
            </motion.p>
          </div>

          <motion.ul variants={scrollStagger} className="space-y-0 border-t border-white/10">
            {talkPoints.map((point) => (
              <motion.li
                key={point.id}
                variants={scrollFadeUp}
                className="border-b border-white/10 py-5 sm:py-6"
              >
                <h3 className="text-base font-semibold uppercase text-white sm:text-lg">
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
