import { motion } from 'framer-motion'
import {
  portfolioSocialFeatured,
  portfolioSocialIntro,
  portfolioSocialMore,
} from '../../data/portfolio'

const spring = { type: 'spring', stiffness: 100, damping: 18, mass: 0.7 }
const viewport = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const scaleIn = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

function SocialCard({ profile }) {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={spring}
      className="group flex h-full w-[78%] min-w-[78%] snap-center flex-col overflow-hidden rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] sm:w-full sm:min-w-0"
    >
      <img
        src={profile.image}
        alt={`${profile.name} Instagram profile`}
        className="block h-auto w-full object-contain"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-sm font-semibold text-[var(--page-ink)]">
          <span className="text-accent">{profile.handle}</span>
          <span className="text-[var(--page-muted)]"> · {profile.name}</span>
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--page-muted)] sm:text-[0.8125rem]">
          {profile.status}
        </p>
        <a
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5 sm:min-h-0"
        >
          {profile.cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.article>
  )
}

function MarqueeHandleCard({ profile }) {
  return (
    <a
      href={profile.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-[13rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] transition hover:-translate-y-1 sm:w-[15.5rem]"
      aria-label={`${profile.handle} — View Profile`}
    >
      <img
        src={profile.image}
        alt={`${profile.name} Instagram profile`}
        className="block h-auto w-full object-contain"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-sm font-semibold text-[var(--page-ink)]">
          <span className="text-accent">{profile.handle}</span>
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--page-muted)]">
          {profile.status}
        </p>
        <span className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5 sm:min-h-0">
          {profile.cta}
          <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  )
}

function MoreHandlesMarquee() {
  if (!portfolioSocialMore.length) return null

  const loop = [...portfolioSocialMore, ...portfolioSocialMore]

  return (
    <div className="mt-8 sm:mt-12">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="px-4 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:px-5 sm:text-xs sm:tracking-[0.22em]"
      >
        More Handles
      </motion.p>

      <div className="relative mt-4 overflow-hidden sm:mt-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--page-bg)] to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--page-bg)] to-transparent sm:w-16"
        />

        <div
          className="portfolio-marquee flex w-max items-stretch gap-3 sm:gap-4"
          aria-label="More Instagram handles marquee"
        >
          {loop.map((profile, index) => (
            <MarqueeHandleCard key={`${profile.id}-${index}`} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SocialPresence() {
  return (
    <section className="relative overflow-hidden bg-[var(--page-bg)] font-sans text-[var(--page-ink)]">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:pb-10 lg:pt-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center text-[clamp(1.55rem,6.5vw,3rem)] font-black tracking-tight"
        >
          <span className="text-[var(--page-ink)]">{portfolioSocialIntro.headlineBefore} </span>
          <span className="text-accent">{portfolioSocialIntro.headlineAccent}</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-5 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:mt-8 sm:text-xs sm:tracking-[0.22em]"
        >
          Client Instagram Profiles
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-4"
        >
          {portfolioSocialFeatured.map((profile) => (
            <SocialCard key={profile.id} profile={profile} />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-16 lg:pb-20">
        <MoreHandlesMarquee />
      </div>
    </section>
  )
}
