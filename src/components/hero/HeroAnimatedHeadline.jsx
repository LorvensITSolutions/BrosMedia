import { motion, useReducedMotion } from 'framer-motion'

const SUBTITLE =
  'Branding, social & brand systems — built to turn attention into revenue.'

const HEADLINE = 'UNSKIPPABLE'

const spring = { type: 'spring', stiffness: 110, damping: 24, mass: 0.75 }
const easeOut = [0.22, 1, 0.36, 1]

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.2 },
  },
}

const headlineLetter = {
  hidden: { y: '108%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: spring,
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

const outlineStyle = {
  color: 'transparent',
  WebkitTextStroke: '1.5px #dfff00',
}

function HeroOutlineHeadline() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <p
        className="text-[clamp(3.2rem,13vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
        style={outlineStyle}
      >
        {HEADLINE}
      </p>
    )
  }

  return (
    <motion.p
      variants={headlineContainer}
      initial="hidden"
      animate="visible"
      aria-label={HEADLINE}
      className="text-[clamp(3.2rem,13vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
    >
      {HEADLINE.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ height: '0.88em' }}
          aria-hidden="true"
        >
          <motion.span variants={headlineLetter} className="inline-block" style={outlineStyle}>
            {char}
          </motion.span>
        </span>
      ))}
    </motion.p>
  )
}

export default function HeroAnimatedHeadline() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto mb-8 flex w-full max-w-5xl flex-col items-center px-4 sm:mb-10 sm:px-6">
      <h1 className="sr-only">
        Brosmedia digital marketing agency — branding, social, and conversion funnels
      </h1>

      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="relative mx-auto w-full max-w-4xl px-2 sm:px-4"
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.05 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[0.65rem]">
              Performance Marketing Studio
            </span>
          </motion.div>

          <div className="-rotate-1 text-center">
            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.12 }}
              className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-accent sm:text-xs"
            >
              brosmedia.in
            </motion.p>

            <HeroOutlineHeadline />

            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.55 }}
              className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:max-w-lg sm:text-base"
            >
              {SUBTITLE}
            </motion.p>

            <motion.span
              aria-hidden
              variants={fadeUp}
              transition={{ delay: 0.68 }}
              className="mx-auto mt-4 block h-[3px] w-20 rounded-full bg-accent"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
