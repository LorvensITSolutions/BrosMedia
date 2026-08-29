import { motion, useReducedMotion } from 'framer-motion'
import AudienceIntelligenceGraphic from './AudienceIntelligenceGraphic'
import MediaSignalGraphic from './MediaSignalGraphic'

export default function HeroDecorGraphics() {
  const reduceMotion = useReducedMotion()

  const float = reduceMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
      }

  return (
    <div
      aria-hidden
      className="hero-decor-layer pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block"
    >
      <motion.div
        className="hero-decor-graphic hero-decor-graphic--left hero-decor-glow-mixed absolute -left-[7%] top-[8%] lg:-left-[4%] lg:top-[6%]"
        style={{ width: 440, height: 440, opacity: 0.28 }}
        {...float}
      >
        <AudienceIntelligenceGraphic />
      </motion.div>

      <motion.div
        className="hero-decor-graphic hero-decor-graphic--right hero-decor-glow-mixed absolute -right-[8%] top-[4%] lg:-right-[5%] lg:top-[2%]"
        style={{ width: 420, height: 420, opacity: 0.26 }}
        animate={reduceMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <MediaSignalGraphic />
      </motion.div>
    </div>
  )
}
