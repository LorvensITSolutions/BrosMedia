import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import { finalCtaButtons, getWhatsAppHref } from '../data/finalCta'
import {
  industries,
  industriesCta,
  industriesIntro,
  industriesMarqueeItems,
  industriesStats,
} from '../data/industriesPage'
import { routes } from '../data/navigation'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const smoothSpring = { type: 'spring', stiffness: 70, damping: 20, mass: 0.9 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const navHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76',
  )
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16
  window.scrollTo({ top, behavior: 'smooth' })
}

function HeroBlob({ className, animate, transition }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
      animate={animate}
      transition={transition ?? { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function HeadlineTitle() {
  const [hovered, setHovered] = useState(false)

  const swapBase = {
    variant: 'pingPong',
    direction: 'up',
    staggerDuration: 20,
  }

  return (
    <span
      className="block w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <LetterSwap
        text="We know your market."
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="Not just marketing."
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="center"
        {...swapBase}
      />
    </span>
  )
}

function IndustriesHero({ onExplore }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] overflow-hidden bg-white font-sans text-primary"
    >
      <HeroBlob
        className="left-[-10%] top-[8%] h-72 w-72 bg-blue/10 sm:h-96 sm:w-96"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      />
      <HeroBlob
        className="right-[-8%] bottom-[12%] h-64 w-64 bg-blue/15 sm:h-80 sm:w-80"
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-[calc(var(--navbar-height)+2.5rem)] text-center sm:px-6 sm:pt-[calc(var(--navbar-height)+3rem)] lg:max-w-6xl lg:px-8 lg:pb-24"
      >
        <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full max-w-full">
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80"
          >
            {industriesIntro.label}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="relative z-10 mt-4 w-full text-[1.625rem] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.25] lg:text-6xl xl:text-7xl"
          >
            <HeadlineTitle />
          </motion.h1>

          <div className="@container relative mt-4 w-full overflow-hidden py-4 sm:mt-1 sm:py-14 lg:py-20 xl:py-24">
            <motion.div
              style={{ y: watermarkY }}
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex justify-center -translate-y-1/2"
              aria-hidden="true"
            >
              <span className="inline-block max-w-full origin-center text-center font-black leading-none tracking-tighter text-blue/[0.07] text-[3rem] sm:text-[clamp(3.5rem,12cqw,9rem)] lg:text-[clamp(7rem,15cqw,12rem)] xl:text-[clamp(8rem,16cqw,13rem)]">
                INDUSTRIES
              </span>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="relative z-10 mx-auto max-w-2xl px-1 text-base leading-relaxed text-primary/65 sm:px-0 sm:text-lg"
            >
              {industriesIntro.description}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6"
          >
            <EyeFollowButton
              text="Get in touch"
              to={routes.contact}
              hoverColor="#1e45ff"
              className="w-full max-w-[17rem] sm:w-auto"
            />
            <button
              type="button"
              onClick={onExplore}
              className="text-sm font-semibold text-primary underline decoration-blue decoration-2 underline-offset-4 transition hover:text-blue"
            >
              Explore sectors
            </button>
          </motion.div>

          <motion.dl
            variants={stagger}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
          >
            {industriesStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <dt className="text-2xl font-bold text-blue sm:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-primary/50">
                  {stat.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>
    </section>
  )
}

function MarqueeStrip() {
  const doubled = [...industriesMarqueeItems, ...industriesMarqueeItems]

  return (
    <div className="relative overflow-hidden bg-primary py-4">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/35"
          >
            {item}
            <span className="text-blue" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function IndustryNav({ activeId, onSelect }) {
  return (
    <nav className="hidden lg:block" aria-label="Industry sections">
      <ul className="space-y-1">
        {industries.map((industry, index) => {
          const isActive = activeId === industry.id
          return (
            <li key={industry.id}>
              <button
                type="button"
                onClick={() => onSelect(industry.id)}
                className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                  isActive ? 'text-primary' : 'text-primary/45 hover:text-primary/75'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="industryNavActive"
                    className="absolute inset-0 rounded-2xl border border-blue/15 bg-blue/[0.06]"
                    transition={smoothSpring}
                  />
                )}
                <span
                  className={`relative z-10 text-xs font-bold tabular-nums ${
                    isActive ? 'text-blue' : 'text-primary/30'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative z-10 text-sm font-semibold leading-snug">{industry.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MobileIndustryNav({ activeId, onSelect }) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Industry sections">
      {industries.map((industry, index) => {
        const isActive = activeId === industry.id
        return (
          <button
            key={industry.id}
            type="button"
            onClick={() => onSelect(industry.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              isActive
                ? 'bg-blue text-white'
                : 'border border-blue/15 bg-white text-primary/70'
            }`}
          >
            {String(index + 1).padStart(2, '0')} · {industry.title.split(' ')[0]}
          </button>
        )
      })}
    </div>
  )
}

function IndustryPanel({ industry, index, setActiveId }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-35% 0px -35% 0px' })
  const isEven = index % 2 === 0

  useEffect(() => {
    if (isInView) setActiveId(industry.id)
  }, [isInView, industry.id, setActiveId])

  return (
    <article
      id={industry.id}
      ref={ref}
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] py-10 lg:min-h-[70vh] lg:py-14"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
          isEven ? '' : 'lg:[&>*:first-child]:order-2'
        }`}
      >
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue/15 via-transparent to-blue/5 opacity-60 blur-2xl" />
          <motion.img
            src={industry.image}
            alt={industry.title}
            loading="lazy"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="rounded-3xl border border-blue/10 bg-white p-6 shadow-[0_16px_50px_rgba(30,69,255,0.07)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">Sector</p>
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              {industry.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary/70 sm:text-lg">{industry.summary}</p>

            {industry.extra && (
              <p className="mt-4 text-base leading-relaxed text-primary/65">{industry.extra}</p>
            )}

            <div className="mt-6 space-y-4 border-t border-primary/8 pt-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue/70">What we do</p>
                <p className="mt-2 text-sm leading-relaxed text-primary/75 sm:text-base">{industry.whatWeDo}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue/70">Clients</p>
                <p className="mt-2 text-sm font-semibold text-primary sm:text-base">{industry.clients}</p>
              </div>
            </div>

            {industry.insight && (
              <div className="mt-6 rounded-2xl border border-blue/15 bg-blue/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue">{industry.insight.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-primary/70 sm:text-base">
                  {industry.insight.text}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </article>
  )
}

function IndustriesCta() {
  const whatsappHref = getWhatsAppHref(finalCtaButtons.whatsapp)

  return (
    <section className="bg-gradient-to-br from-blue via-[#1a3de6] to-[#0f2bb8] font-sans text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            {industriesCta.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {industriesCta.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {industriesCta.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href={routes.contact}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue transition hover:bg-white/90"
            >
              {industriesCta.buttonLabel}
            </a>
            <a
              href={whatsappHref}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
            >
              WhatsApp Us →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function IndustriesPage() {
  const [activeId, setActiveId] = useState(industries[0].id)

  const handleSelect = useCallback((id) => {
    setActiveId(id)
    scrollToSection(id)
  }, [])

  return (
    <>
      <IndustriesHero onExplore={() => scrollToSection(industries[0].id)} />
      <MarqueeStrip />

      <section className="border-y border-blue/10 bg-[#f5f7ff] font-sans">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-14">
            <aside className="mb-8 lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)] lg:mb-0 lg:self-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="mb-6 hidden lg:block"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/60">Navigate</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">Sectors we serve</h2>
              </motion.div>
              <MobileIndustryNav activeId={activeId} onSelect={handleSelect} />
              <div className="mt-6 hidden lg:block">
                <IndustryNav activeId={activeId} onSelect={handleSelect} />
              </div>
            </aside>

            <div>
              {industries.map((industry, index) => (
                <IndustryPanel
                  key={industry.id}
                  industry={industry}
                  index={index}
                  setActiveId={setActiveId}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <IndustriesCta />
    </>
  )
}
