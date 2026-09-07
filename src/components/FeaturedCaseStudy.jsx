import { motion } from 'framer-motion'
import { narennCaseStudy } from '../data/caseStudies'
import NudgeButton from '../framer/nudge_button.jsx'
import { HERO_NUDGE_PROPS, SecondaryCtaButton } from './ui/HeroStyleCtas'

const spring = { type: 'spring', stiffness: 90, damping: 22, mass: 0.7 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

export default function FeaturedCaseStudy() {
  const study = narennCaseStudy

  return (
    <section
      id="case-study"
      className="relative overflow-hidden bg-black font-sans text-white"
      aria-label={`${study.client} case study`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(223,255,0,0.07),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {study.label}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col items-center gap-4"
          >
            <img
              src={study.logo}
              alt={`${study.client} logo`}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              loading="lazy"
            />
            <div>
              <p className="text-base font-semibold text-white sm:text-lg">
                {study.client}
              </p>
              <p className="mt-1 text-sm text-white/45">{study.industry}</p>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-[clamp(1.65rem,4.5vw,2.85rem)] font-black tracking-tight"
          >
            {study.headline}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:items-stretch lg:gap-12"
        >
          <motion.a
            variants={fadeUp}
            href={study.socialHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] lg:min-h-0 lg:h-full"
            aria-label={`${study.socialHandle} on Instagram`}
          >
            <img
              src={study.socialImage}
              alt={`${study.client} Instagram profile`}
              className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="relative mt-auto border-t border-white/10 bg-black/75 px-4 py-3 backdrop-blur-sm sm:px-5">
              <p className="text-sm font-semibold text-accent">
                {study.socialHandle}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/55">
                {study.socialStatus}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition group-hover:gap-2.5">
                {study.socialCtaLabel}
                <span aria-hidden>→</span>
              </span>
            </div>
          </motion.a>

          <motion.div variants={stagger} className="flex h-full flex-col">
            <motion.p
              variants={fadeUp}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/40"
            >
              The brief
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-base leading-relaxed text-white/70"
            >
              {study.brief}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/40"
            >
              What we did
            </motion.p>
            <motion.ul variants={stagger} className="mt-3 space-y-2.5">
              {study.whatWeDid.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex gap-2.5 text-sm leading-relaxed text-white/70"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-1 gap-3"
            >
              {study.results.map((row) => (
                <div
                  key={row.label}
                  className="border-l-2 border-accent/80 bg-white/[0.03] px-4 py-3.5"
                >
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {row.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-white">
                    {row.value}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-sm font-semibold leading-relaxed text-white sm:text-base"
            >
              {study.resultLine}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <NudgeButton
                text={study.ctaLabel}
                link={study.ctaHref}
                openInNewTab
                {...HERO_NUDGE_PROPS}
              />
              <SecondaryCtaButton
                text={study.socialCtaLabel}
                href={study.socialHref}
                icon="arrow"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
