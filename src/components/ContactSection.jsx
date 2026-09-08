import { motion } from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import { contactIntro } from '../data/contact'
import { EmailCtaButton, PrimaryBookingButton } from './ui/HeroStyleCtas'
import {
  SECTION_HEADING_CLASS,
  scrollFadeUp,
  scrollStagger,
  scrollViewport,
} from '../lib/scrollMotion'

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="section-pad relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scrollStagger}
        >
          <motion.div variants={scrollFadeUp}>
            <LetterSwap
              text={contactIntro.label.toUpperCase()}
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              color="rgba(223,255,0,0.85)"
              hoverColor="#dfff00"
              variant="pingPong"
              direction="up"
            />
          </motion.div>

          <motion.h2 variants={scrollFadeUp} className={`${SECTION_HEADING_CLASS} mt-4`}>
            <span className="text-white">{contactIntro.headlineBefore} </span>
            <span className="text-accent">{contactIntro.headlineAccent}</span>
          </motion.h2>

          <motion.p
            variants={scrollFadeUp}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {contactIntro.description}
          </motion.p>

          <motion.div
            variants={scrollFadeUp}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <PrimaryBookingButton text="Book a strategy call" />
            <EmailCtaButton />
          </motion.div>

          <motion.p variants={scrollFadeUp} className="mt-5 text-sm text-white/40">
            Free 30-min strategy call. WhatsApp is fastest - we typically reply within one business
            day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
