import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ArrowRight, Play, Zap } from 'lucide-react'
import { routes } from '../data/navigation'
import HeroCinematicBackground from './hero/HeroCinematicBackground'
import HeroDecorativeIcons from './hero/HeroDecorativeIcons'


const SHOWREEL_URL =
  'https://www.instagram.com/brosmedia.in?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=='

function HeroMarketingVisual() {
  return (
    <div className="relative mx-auto mb-4 flex w-full max-w-5xl flex-col items-center px-4 sm:mb-10 sm:px-6">
      <h1 className="sr-only">
        Brosmedia digital marketing agency — branding, social, and conversion funnels
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-4xl px-2 sm:px-4"
      >
        <div className="relative z-10 flex flex-col items-center">
          

          <div className="-rotate-1 pt-10 text-center sm:pt-14 md:pt-16">
            
            <p
              className="max-w-full px-1 text-[clamp(2.15rem,10vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px #dfff00',
              }}
            >
              UNSKIPPABLE
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:max-w-lg sm:text-base">
              Branding, social &amp; brand systems - built to turn attention into revenue.
            </p>
            <motion.span
              aria-hidden
              className="mx-auto mt-4 block h-[3px] rounded-full bg-accent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </motion.div>

      
    </div>
  )
}

const MARQUEE_ROWS = [
  {
    text: 'STOP BEING INVISIBLE ONLINE • WE DOMINATE ATTENTION •',
    variant: 'solid',
    baseVelocity: 3,
  },
  {
    text: 'BRAND SYSTEMS • OBSESSIVE CRAFT • HYPER-SCALABLE FUNNELS •',
    variant: 'outline',
    baseVelocity: -2.5,
  },
  {
    text: 'UNIGNORABLE DIGITAL IMPACT • SCALE YOUR BRAND •',
    variant: 'gradient',
    baseVelocity: 3.5,
  },
]

function wrap(min, max, value) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

function VelocityMarquee({ text, variant = 'solid', baseVelocity = 8 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 55,
    stiffness: 320,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.8], {
    clamp: false,
  })

  const x = useTransform(baseX, (value) => `${wrap(-20, -45, value)}%`)
  const directionFactor = useRef(1)
  const reduceMotion = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion.current = media.matches
    const onChange = () => {
      reduceMotion.current = media.matches
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useAnimationFrame((_, delta) => {
    if (reduceMotion.current) return

    const factor = velocityFactor.get()

    if (factor < -0.05) directionFactor.current = -1
    else if (factor > 0.05) directionFactor.current = 1

    const scrollBoost = Math.min(Math.abs(factor), 1.8)
    const speed = Math.abs(baseVelocity) * (0.25 + scrollBoost * 0.6)
    const moveBy =
      directionFactor.current * Math.sign(baseVelocity || 1) * speed * (delta / 1000)

    baseX.set(baseX.get() + moveBy)
  })

  const itemClass =
    variant === 'outline'
      ? 'velocity-text-outline'
      : variant === 'gradient'
        ? 'text-blue'
        : 'text-accent'

  return (
    <div className="scrollbar-hide relative overflow-hidden py-1 sm:py-2.5">
      <div className="-rotate-2">
        <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={`${text}-${index}`}
              className={`shrink-0 pr-4 text-[clamp(1.45rem,6vw,6.75rem)] font-black uppercase leading-[0.9] tracking-tight sm:pr-10 sm:text-[clamp(2.2rem,8.5vw,6.75rem)] ${itemClass}`}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Brosmedia velocity hero"
      className="scrollbar-hide relative z-10 flex min-h-0 w-full max-w-[100vw] flex-col justify-start overflow-x-hidden bg-[#070A0D] font-sans text-white sm:min-h-svh sm:justify-center"
    >
      <HeroCinematicBackground />
      <HeroDecorativeIcons />

      <div className="relative z-10 flex w-full flex-col justify-start pt-[var(--navbar-height)] pb-2 sm:justify-center sm:pb-8">
        <HeroMarketingVisual />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="w-full space-y-2 sm:space-y-3"
        >
          {MARQUEE_ROWS.map((row) => (
            <VelocityMarquee
              key={row.text}
              text={row.text}
              variant={row.variant}
              baseVelocity={row.baseVelocity}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 px-4 sm:mt-12 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:px-6"
        >
          <Link
            to={routes.contact}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-accent/90 sm:w-auto sm:min-w-[210px]"
          >
            Scale Your Brand
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <a
            href={SHOWREEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-accent/45 hover:text-accent sm:w-auto sm:min-w-[210px]"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch Showreel
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 pb-1 text-center text-[0.6rem] font-medium uppercase tracking-[0.14em] text-white/35 sm:mt-5 sm:pb-0 sm:text-[0.65rem]"
        >
          <span className="inline-flex items-center gap-1">
            <Zap className="h-3 w-3 text-accent" strokeWidth={2.5} />
            Free Strategy Call
          </span>
          <span aria-hidden className="text-white/20">
            ·
          </span>
          <span>Hyderabad, IN</span>
          <span aria-hidden className="text-white/20">
            ·
          </span>
          <span>Remote-First Agency</span>
        </motion.p>
      </div>
    </section>
  )
}
