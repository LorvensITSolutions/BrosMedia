import { motion } from 'framer-motion'
import { portfolioAboutWork } from '../../data/portfolio'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

export default function AboutOurWork() {
  const [first, second] = portfolioAboutWork.paragraphs
  const titleParts = portfolioAboutWork.title.split(' ')
  const titleAccent = titleParts.slice(-2).join(' ')
  const titleBefore = titleParts.slice(0, -2).join(' ')
  const stats = portfolioAboutWork.stats ?? []

  return (
    <section
      id="about-us"
      className="relative scroll-mt-[calc(var(--navbar-height)+0.75rem)] overflow-hidden border-y border-[var(--page-border)] bg-[var(--page-bg)] font-sans text-[var(--page-ink)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-rgb),0.1),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl sm:block"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--page-muted)] sm:text-xs sm:tracking-[0.24em]"
          >
            Who we are
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-2.5 text-center text-[clamp(1.65rem,6.5vw,3.35rem)] font-black tracking-tight sm:mt-3"
          >
            {titleBefore ? (
              <span className="text-[var(--page-ink)]">{titleBefore} </span>
            ) : null}
            <span className="text-accent">{titleAccent}</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-4 h-px w-12 bg-accent sm:mt-6 sm:w-16"
          />

          <div className="mt-6 w-full max-w-3xl space-y-4 text-center text-[0.9rem] leading-relaxed text-[var(--page-muted)] sm:mt-10 sm:space-y-6 sm:text-base sm:leading-[1.75] lg:text-[1.05rem] lg:leading-[1.8]">
            <motion.p variants={fadeUp}>
              {first.before}
              <strong className="font-bold text-accent">{first.highlight}</strong>
              {first.after}
            </motion.p>
            <motion.p variants={fadeUp}>{second.text}</motion.p>
          </div>

          {stats.length > 0 ? (
            <motion.div
              variants={fadeUp}
              className="mt-10 w-full max-w-4xl sm:mt-14 lg:mt-16"
            >
              <ul className="grid grid-cols-2 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <li
                    key={stat.label}
                    className={[
                      'relative flex flex-col items-center justify-center px-2 py-5 text-center sm:px-4 sm:py-0',
                      index % 2 === 1
                        ? 'border-l border-[color-mix(in_srgb,var(--page-ink)_16%,transparent)] sm:border-l-0'
                        : '',
                      index < 2
                        ? 'border-b border-[color-mix(in_srgb,var(--page-ink)_12%,transparent)] sm:border-b-0'
                        : '',
                      index > 0
                        ? 'sm:border-l sm:border-[color-mix(in_srgb,var(--color-accent)_28%,transparent)]'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <p className="text-[clamp(1.6rem,7vw,2.75rem)] font-black leading-none tracking-tight text-accent">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[0.72rem] font-medium leading-snug text-[var(--page-ink)] sm:mt-3 sm:text-[0.9rem]">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
