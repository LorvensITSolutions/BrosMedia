import { motion } from 'framer-motion'
import {
  getClientWebsiteHref,
  portfolioCreations,
  portfolioIconicFeatured,
  portfolioIconicIntro,
} from '../../data/portfolio'

const spring = { type: 'spring', stiffness: 100, damping: 18, mass: 0.7 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const scaleIn = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

function LogoCard({ client }) {
  const href = getClientWebsiteHref(client.website) || client.instagram
  const cardClass =
    'group relative mx-auto flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-300 hover:-translate-y-1 sm:h-40 sm:rounded-2xl sm:p-2.5 lg:h-44'

  const inner = client.logo ? (
    <img
      src={client.logo}
      alt={`${client.client} logo`}
      className="max-h-[86%] w-auto max-w-[90%] object-contain sm:max-h-[90%] sm:max-w-[92%]"
      loading="lazy"
    />
  ) : (
    <span className="text-sm font-bold uppercase tracking-wide text-black/40">
      {client.client.slice(0, 2)}
    </span>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={scaleIn}
        className={cardClass}
        aria-label={client.client}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.div variants={scaleIn} className={cardClass}>
      {inner}
    </motion.div>
  )
}

function MarqueeLogoCard({ client }) {
  const href = getClientWebsiteHref(client.website) || client.instagram
  const cardClass =
    'flex h-24 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] sm:h-28 sm:w-32 sm:rounded-2xl sm:p-2'

  const inner = client.logo ? (
    <img
      src={client.logo}
      alt={`${client.client} logo`}
      className="max-h-[88%] w-auto max-w-[90%] object-contain"
      loading="lazy"
    />
  ) : (
    <span className="text-sm font-bold uppercase tracking-wide text-black/40">
      {client.client.slice(0, 2)}
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={client.client}
      >
        {inner}
      </a>
    )
  }

  return <div className={cardClass}>{inner}</div>
}

function CreationsMarquee() {
  if (!portfolioCreations.length) return null

  const loop = [...portfolioCreations, ...portfolioCreations]

  return (
    <div className="relative z-10 pb-10 pt-5 sm:pb-14 sm:pt-8 lg:pb-16">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="px-4 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:px-5 sm:text-xs sm:tracking-[0.22em]"
      >
        Our Creations
      </motion.p>

      <div className="relative mt-3 overflow-hidden sm:mt-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--page-bg)] to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--page-bg)] to-transparent sm:w-16"
        />

        <div
          className="portfolio-marquee flex w-max items-center gap-2 sm:gap-3"
          aria-label="Our creations logo marquee"
        >
          {loop.map((client, index) => (
            <MarqueeLogoCard key={`${client.id}-${index}`} client={client} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function IconicIdentities() {
  return (
    <section
      id="portfolio-clients"
      className="relative overflow-hidden bg-[var(--page-bg)] font-sans text-[var(--page-ink)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.12),transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:pb-6 lg:pt-16">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center text-[clamp(1.55rem,6.5vw,3rem)] font-black tracking-tight"
        >
          <span className="text-[var(--page-ink)]">{portfolioIconicIntro.headlineBefore} </span>
          <span className="text-accent">{portfolioIconicIntro.headlineAccent}</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-5 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:mt-7 sm:text-xs sm:tracking-[0.22em]"
        >
          Featured Projects
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3"
        >
          {portfolioIconicFeatured.map((client) => (
            <LogoCard key={client.id} client={client} />
          ))}
        </motion.div>
      </div>

      <CreationsMarquee />
    </section>
  )
}
