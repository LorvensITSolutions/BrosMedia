import { motion } from 'framer-motion'
import { clientsTeaserIntro, industryResults } from '../data/clientsTeaser'
import {
  SECTION_HEADING_CLASS,
  scrollFadeUp,
  scrollStagger,
  scrollViewport,
} from '../lib/scrollMotion'

export default function ClientsTeaser() {
  return (
    <section id="industries" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="section-pad relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scrollStagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={scrollFadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {clientsTeaserIntro.label}
          </motion.p>
          <motion.h2 variants={scrollFadeUp} className={SECTION_HEADING_CLASS}>
            <span className="text-white">{clientsTeaserIntro.headlineBefore} </span>
            <span className="text-accent">{clientsTeaserIntro.headlineAccent}</span>
          </motion.h2>
          <motion.p
            variants={scrollFadeUp}
            className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
          >
            {clientsTeaserIntro.description}
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scrollStagger}
          className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industryResults.map((item) => (
            <motion.li
              key={item.id}
              variants={scrollFadeUp}
              className="bg-[#111] px-5 py-6 sm:px-6 sm:py-7"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.industry}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[0.95rem]">
                {item.proof}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
