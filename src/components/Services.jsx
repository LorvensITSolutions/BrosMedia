import { motion } from 'framer-motion'
import FluidCardStack from '../framer/fluid_card_stack.jsx'
import { services, servicesIntro } from '../data/services'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export default function Services() {
  const items = services.map((service) => ({
    id: service.id,
    title: service.name,
    shortTitle: service.navLabel,
    description: service.summary,
    image: service.image,
  }))

  return (
    <section id="services" className="bg-black font-sans text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          className="mb-10 max-w-xl sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90"
          >
            {servicesIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {servicesIntro.headline}
          </motion.h2>
        </motion.div>

        <FluidCardStack items={items} />
      </div>
    </section>
  )
}
