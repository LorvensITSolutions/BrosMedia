import { motion } from 'framer-motion'
import FluidCardStack from '../framer/fluid_card_stack.jsx'
import { services, servicesIntro } from '../data/services'
import {
  SECTION_HEADING_CLASS,
  scrollFadeUp,
  scrollStagger,
  scrollViewport,
} from '../lib/scrollMotion'

export default function Services() {
  const items = services.map((service) => ({
    id: service.id,
    title: service.name,
    shortTitle: service.navLabel,
    description: service.summary,
    image: service.image,
  }))

  return (
    <section id="services" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="section-pad relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 max-w-xl sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scrollStagger}
        >
          <motion.p
            variants={scrollFadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90"
          >
            {servicesIntro.label}
          </motion.p>
          <motion.h2 variants={scrollFadeUp} className={SECTION_HEADING_CLASS}>
            <span className="text-white">{servicesIntro.headlineBefore} </span>
            <span className="text-accent">{servicesIntro.headlineAccent}</span>
          </motion.h2>
        </motion.div>

        <FluidCardStack items={items} />
      </div>
    </section>
  )
}
