import { motion, useReducedMotion } from 'framer-motion'
import EyeFollowButton from '../../framer/eye_follow_button.jsx'
import StarMovement from '../../framer/star_movement.jsx'
import GlowCursor from '../ui/GlowCursor.jsx'
import {
  portfolioHeroCta,
  portfolioHeroPreviews,
  portfolioIntro,
} from '../../data/portfolio'

const spring = { type: 'spring', stiffness: 100, damping: 20, mass: 0.7 }

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

const HEADLINE_LINES = [
  { text: 'Real brands.', accent: false },
  { text: 'Real work.', accent: false },
  { text: 'Real results.', accent: true },
]

const lineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
  },
}

const letterReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: spring,
  },
}

function AnimatedHeadline() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <h1 className="text-[clamp(2.55rem,7.5vw,4.85rem)] font-black leading-[0.92] tracking-tight text-white">
        {HEADLINE_LINES.map((line) => (
          <span key={line.text} className={`block ${line.accent ? 'text-accent' : ''}`}>
            {line.text}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <motion.h1
      aria-label="Real brands. Real work. Real results."
      variants={lineContainer}
      className="text-[clamp(2.55rem,7.5vw,4.85rem)] font-black leading-[0.92] tracking-tight text-white"
    >
      {HEADLINE_LINES.map((line, lineIndex) => (
        <motion.span
          key={line.text}
          className={`block overflow-hidden ${line.accent ? 'text-accent' : ''}`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.028,
                delayChildren: lineIndex * 0.12,
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
              style={char === ' ' ? { width: '0.28em' } : undefined}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h1>
  )
}

function InfoCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="mt-6 w-full max-w-lg rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-sm sm:mt-8 sm:max-w-[30rem]"
    >
      <p className="px-5 py-5 text-[0.92rem] leading-[1.55] text-white/70 sm:px-6 sm:py-6 sm:text-[0.98rem]">
        {portfolioIntro.description}
      </p>
    </motion.div>
  )
}

function ProjectCollage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto mt-2 h-[24rem] w-full max-w-[28rem] sm:mt-4 sm:h-[29rem] sm:max-w-[34rem] lg:mt-4 lg:h-[34rem] lg:max-w-none xl:h-[36rem]">
      {portfolioHeroPreviews.map((preview, index) => (
        <motion.article
          key={preview.id}
          className="absolute w-[54%] rounded-[1.15rem] bg-white/95 p-[0.55rem] shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:w-[52%] sm:rounded-[1.35rem] sm:p-2.5"
          style={{
            left: preview.x,
            top: preview.y,
            zIndex: preview.z,
          }}
          initial={{ opacity: 0, y: 30, rotate: preview.rotate * 0.4, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, rotate: preview.rotate, scale: 1 }}
          transition={{ ...spring, delay: 0.16 + index * 0.09 }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -10,
                  rotate: preview.rotate * 0.25,
                  scale: 1.04,
                  zIndex: 30,
                  transition: { type: 'spring', stiffness: 260, damping: 18 },
                }
          }
        >
          <div className="relative overflow-hidden rounded-[0.85rem] bg-[#eef0ea] sm:rounded-[1rem]">
            <img
              src={preview.src}
              alt={preview.alt}
              className="aspect-[4/3.4] w-full object-cover"
              loading={index > 1 ? 'lazy' : 'eager'}
            />
          </div>
          <p className="mt-2 px-0.5 text-[0.68rem] font-medium tracking-wide text-[#8a8a8a]">
            project preview
          </p>
        </motion.article>
      ))}
    </div>
  )
}

export default function PortfolioHero({ onExplore }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-black font-sans text-white">
      <GlowCursor
        className="h-auto min-h-full"
        style={{ height: 'auto' }}
        color="#dfff00"
        secondaryColor="#8fa600"
        trailLength={40}
        trailWidth={8}
        trailTaper={0.8}
        followSpeed={0.16}
        glowIntensity={1.9}
        glowSpread={1.2}
        hotspot={0.65}
        brightness={1.25}
        opacity={1}
        pulseSpeed={1.1}
        noiseStrength={0.035}
        idleFade
        idleTimeout={700}
        fadeDuration={900}
        blendMode="screen"
        enabled={!reduceMotion}
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <StarMovement
            starCount={220}
            starSize={1.6}
            starColor="#dfff00"
            backgroundColor="#000000"
            interactionRadius={200}
            interactionStrength={5.5}
            returnSpeed={0.08}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-[calc(var(--navbar-height)+0.35rem)] sm:gap-10 sm:px-6 sm:pb-14 sm:pt-[calc(var(--navbar-height)+0.75rem)] lg:grid-cols-[1.15fr_0.95fr] lg:gap-6 lg:px-8 lg:pb-16 xl:gap-8 2xl:max-w-[1400px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative z-10 max-w-xl lg:max-w-none"
          >
            <AnimatedHeadline />

            <InfoCard />

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col items-start gap-5 sm:mt-8 sm:flex-row sm:items-center sm:gap-7"
            >
              <motion.div
                className="rounded-full shadow-[0_0_0_7px_rgba(223,255,0,0.22)]"
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <EyeFollowButton
                  text={portfolioHeroCta.primary}
                  onClick={onExplore}
                  buttonColor="#dfff00"
                  hoverColor="#ffffff"
                  textColor="#000000"
                  pupilColor="#000000"
                  eyeColor="#ffffff"
                  className="portfolio-hero-cta"
                />
              </motion.div>

              <motion.a
                href={portfolioHeroCta.secondaryHref}
                className="group relative inline-flex text-[0.95rem] font-semibold text-white"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
              >
                <span>{portfolioHeroCta.secondary}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative z-10 w-full lg:pl-2">
            <ProjectCollage />
          </div>
        </div>
      </GlowCursor>
    </section>
  )
}
