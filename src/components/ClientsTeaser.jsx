import { motion } from 'framer-motion'
import { ClientsCarouselFromData } from '../framer/clients_carousel.jsx'
import { clientsTeaser, clientsTeaserIntro } from '../data/clientsTeaser'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export default function ClientsTeaser() {
  return (
    <section id="clients" className="bg-black font-sans text-white">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="relative z-10 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70"
          >
            {clientsTeaserIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {clientsTeaserIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {clientsTeaserIntro.description}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 w-full pb-8 lg:mt-14 lg:pb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={spring}
      >
        <ClientsCarouselFromData
          items={clientsTeaser}
          shellBackground="#141414"
          shellBorderColor="rgba(255, 255, 255, 0.1)"
        />
      </motion.div>
    </section>
  )
}
