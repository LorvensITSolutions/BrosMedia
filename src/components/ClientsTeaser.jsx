import { motion } from 'framer-motion'
import { clientsTeaserIntro, industryResults } from '../data/clientsTeaser'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

export default function ClientsTeaser() {
  return (
    <section id="clients" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {clientsTeaserIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(1.65rem,4.5vw,2.75rem)] font-black tracking-tight text-white"
          >
            {clientsTeaserIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
          >
            {clientsTeaserIntro.description}
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industryResults.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
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
