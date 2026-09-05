import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { portfolioIntro } from '../../data/portfolio'
import { useTheme } from '../../lib/ThemeProvider.jsx'

const spring = { type: 'spring', stiffness: 100, damping: 20, mass: 0.7 }

const lineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.12 },
  },
}

const letterReveal = {
  hidden: { y: '115%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: spring,
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.35 } },
}

const TITLE_LINES = [
  { text: 'OUR', accent: true },
  { text: 'PORTFOLIO', accent: false },
]

function MotionTitle() {
  const reduceMotion = useReducedMotion()
  const titleClass =
    'text-center text-[clamp(2.55rem,13vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] sm:text-[clamp(3rem,11vw,7rem)] sm:leading-[0.86]'

  if (reduceMotion) {
    return (
      <h1 className={titleClass}>
        {TITLE_LINES.map((line) => (
          <span
            key={line.text}
            className={`block ${line.accent ? 'text-accent' : 'text-[var(--page-ink)]'}`}
          >
            {line.text}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <motion.h1
      aria-label="Our Portfolio"
      variants={lineContainer}
      initial="hidden"
      animate="visible"
      className={titleClass}
    >
      {TITLE_LINES.map((line, lineIndex) => (
        <motion.span
          key={line.text}
          className={`block overflow-hidden ${line.accent ? 'text-accent' : 'text-[var(--page-ink)]'}`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.03,
                delayChildren: lineIndex * 0.15,
              },
            },
          }}
        >
          {line.text.split('').map((char, index) => (
            <motion.span
              key={`${line.text}-${index}`}
              variants={letterReveal}
              className="inline-block"
              aria-hidden="true"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function PortfolioHero({ onExplore }) {
  const { isLight } = useTheme()

  const handleExplore = () => {
    if (typeof onExplore === 'function') {
      onExplore()
      return
    }
    const el = document.getElementById('about-us')
    if (!el) return
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76',
    )
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 12
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--page-bg)] font-sans text-[var(--page-ink)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, rgba(var(--accent-rgb), ${isLight ? 0.18 : 0.14}), transparent ${isLight ? '58%' : '55%'})`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl sm:-left-24 sm:h-72 sm:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 bottom-1/4 h-44 w-44 rounded-full bg-accent/8 blur-3xl sm:-right-20 sm:h-64 sm:w-64"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--page-ink) 1px, transparent 1px), linear-gradient(90deg, var(--page-ink) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--page-bg)] to-transparent sm:h-32"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-28 pt-[calc(var(--navbar-height)+1.75rem)] text-center sm:px-6 sm:pb-24 sm:pt-[calc(var(--navbar-height)+2.5rem)]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-accent sm:mb-6 sm:text-xs sm:tracking-[0.28em]"
        >
          Brosmedia Work
        </motion.p>

        <MotionTitle />

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ ...spring, delay: 0.4 }}
          className="mt-5 h-px w-14 origin-center bg-accent sm:mt-8 sm:w-20"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-[var(--page-muted)] sm:mt-7 sm:max-w-xl sm:text-base sm:leading-[1.7]"
        >
          {portfolioIntro.heroSubline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.55 }}
          className="relative z-20 mt-8 sm:mt-12"
        >
          <button
            type="button"
            onClick={handleExplore}
            aria-label="Scroll to About Us"
            className="relative z-20 flex min-h-12 min-w-12 cursor-pointer items-center justify-center p-3 text-accent transition hover:opacity-80"
          >
            <motion.span
              className="pointer-events-none block"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={2.25} />
            </motion.span>
          </button>
        </motion.div>

        <p className="sr-only">{portfolioIntro.description}</p>
      </div>
    </section>
  )
}
