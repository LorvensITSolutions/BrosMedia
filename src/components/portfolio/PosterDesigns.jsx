import { motion } from 'framer-motion'
import {
  portfolioPosterFeatured,
  portfolioPosterIntro,
  portfolioPosterMore,
} from '../../data/portfolio'

const spring = { type: 'spring', stiffness: 100, damping: 18, mass: 0.7 }
const viewport = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const scaleIn = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

function PosterCard({ poster, size = 'md' }) {
  const frame =
    size === 'lg'
      ? 'aspect-[3/4] min-w-[70%] snap-center rounded-2xl sm:min-w-0 sm:rounded-[1.35rem]'
      : 'aspect-square rounded-xl sm:rounded-2xl'

  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={spring}
      className={`group relative overflow-hidden border border-[var(--page-border)] bg-[var(--page-surface)] ${frame}`}
    >
      <img
        src={poster.src}
        alt={poster.alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />
    </motion.article>
  )
}

export default function PosterDesigns() {
  return (
    <section className="relative overflow-hidden bg-[var(--page-bg)] font-sans text-[var(--page-ink)]">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center text-[clamp(1.55rem,6.5vw,3rem)] font-black tracking-tight"
        >
          <span className="text-[var(--page-ink)]">{portfolioPosterIntro.headlineBefore} </span>
          <span className="text-accent">{portfolioPosterIntro.headlineAccent}</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-6 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:mt-10 sm:text-xs sm:tracking-[0.22em]"
        >
          Featured Projects
        </motion.p>

        {/* Mobile: horizontal snap; sm+: 3-col grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6"
        >
          {portfolioPosterFeatured.map((poster) => (
            <PosterCard key={poster.id} poster={poster} size="lg" />
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-10 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:mt-14 sm:text-xs sm:tracking-[0.22em]"
        >
          More Designs
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5"
        >
          {portfolioPosterMore.map((poster) => (
            <PosterCard key={poster.id} poster={poster} size="sm" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
