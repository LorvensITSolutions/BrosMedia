import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import { finalCtaButtons, finalCtaIntro, getWhatsAppHref } from '../data/finalCta'
import { services, servicesIntro, servicesProcess } from '../data/services'
import { routes } from '../data/navigation'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const smoothSpring = { type: 'spring', stiffness: 70, damping: 20, mass: 0.9 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const marqueeItems = services.flatMap((s) => [s.navLabel, ...s.highlights.slice(0, 2)])

function scrollToService(id) {
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
        text="Everything your"
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="brand"
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <span className="mt-1 block">
        <LetterSwap
          text="needs to "
          as="span"
          active={hovered}
          color="#000000"
          hoverColor="#1e45ff"
          staggerFrom="first"
          {...swapBase}
        />
        <LetterSwap
          text="grow."
          as="span"
          active={hovered}
          color="#000000"
          hoverColor="#1e45ff"
          staggerFrom="center"
          {...swapBase}
        />
      </span>
    </span>
  )
}

function ServicesHero({ onExplore }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30])

  const stats = [
    { value: '4', label: 'Core services', color: 'text-blue' },
    { value: '360°', label: 'Brand coverage', color: 'text-primary' },
    { value: '100%', label: 'Hands-on team', color: 'text-blue' },
    { value: 'HYD', label: 'Based in Hyderabad', color: 'text-primary' },
  ]

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
          <motion.h1
            variants={fadeUp}
            className="relative z-10 w-full text-[1.625rem] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.25] lg:text-6xl xl:text-7xl"
          >
            <HeadlineTitle />
          </motion.h1>

          <div className="@container relative mt-4 w-full overflow-hidden py-4 sm:mt-1 sm:py-14 lg:py-20 xl:py-24">
            <motion.div
              style={{ y: watermarkY }}
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex justify-center -translate-y-1/2"
              aria-hidden="true"
            >
              <span className="inline-block max-w-full origin-center text-center font-black leading-none tracking-tighter text-blue/[0.07] text-[3.5rem] sm:text-[clamp(4.5rem,14cqw,10rem)] lg:text-[clamp(9rem,17.5cqw,13.5rem)] xl:text-[clamp(10rem,18cqw,14rem)]">
                SERVICES
              </span>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="relative z-10 mx-auto max-w-2xl px-1 text-base leading-relaxed text-primary/65 sm:px-0 sm:text-lg"
            >
              {servicesIntro.description}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6"
          >
            <EyeFollowButton
              text="Start a project"
              to={routes.contact}
              hoverColor="#1e45ff"
              className="w-full max-w-[17rem] sm:w-auto"
            />
            <button
              type="button"
              onClick={onExplore}
              className="text-sm font-semibold text-primary underline decoration-blue decoration-2 underline-offset-4 transition hover:text-blue"
            >
              Explore services
            </button>
          </motion.div>

          <motion.ul
            variants={stagger}
            className="mt-6 grid w-full max-w-sm grid-cols-2 gap-2.5 sm:mt-10 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-2"
          >
            {services.map((service, index) => (
              <motion.li
                key={service.id}
                variants={fadeUp}
                className={index < 2 ? 'col-span-2 flex justify-center' : ''}
              >
                <button
                  type="button"
                  onClick={() => scrollToService(service.id)}
                  className={`rounded-full border border-primary/10 bg-white px-4 py-2.5 text-xs font-medium text-primary transition hover:border-blue/30 hover:text-blue sm:py-2 sm:text-sm ${
                    index < 2 ? 'w-full max-w-[17rem]' : 'w-full'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} · {service.navLabel}
                </button>
              </motion.li>
            ))}
          </motion.ul>

          <motion.dl
            variants={stagger}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <dt className={`text-2xl font-bold sm:text-3xl ${stat.color}`}>{stat.value}</dt>
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
  const doubled = [...marqueeItems, ...marqueeItems]

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

function ServiceNav({ activeId, onSelect }) {
  return (
    <nav className="hidden lg:block" aria-label="Service sections">
      <ul className="space-y-1">
        {services.map((service, index) => {
          const isActive = activeId === service.id
          return (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => onSelect(service.id)}
                className={`group relative flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors ${
                  isActive ? 'text-primary' : 'text-primary/45 hover:text-primary/75'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="serviceNavActive"
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
                <span className="relative z-10 text-sm font-semibold leading-snug">
                  {service.navLabel}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MobileServiceNav({ activeId, onSelect }) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Service sections">
      {services.map((service, index) => {
        const isActive = activeId === service.id
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              isActive
                ? 'bg-blue text-white'
                : 'border border-blue/15 bg-white text-primary/70'
            }`}
          >
            {String(index + 1).padStart(2, '0')} · {service.navLabel}
          </button>
        )
      })}
    </div>
  )
}

function ServicePanel({ service, index, setActiveId }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-35% 0px -35% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const contentX = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, -12])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.7])

  useEffect(() => {
    if (isInView) setActiveId(service.id)
  }, [isInView, service.id, setActiveId])

  const isEven = index % 2 === 0

  return (
    <article
      id={service.id}
      ref={ref}
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] py-10 lg:min-h-[88vh] lg:py-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
          isEven ? '' : 'lg:[&>*:first-child]:order-2'
        }`}
      >
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent/10 opacity-50 blur-2xl" />
          <motion.img
            src={service.image}
            alt={service.name}
            loading="lazy"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ x: contentX, opacity: contentOpacity }} variants={fadeUp}>
          <div className="rounded-3xl border border-blue/10 bg-white p-6 shadow-[0_16px_50px_rgba(30,69,255,0.08)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
                Service
              </p>
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              {service.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary/70 sm:text-lg">{service.summary}</p>

            <motion.ul
              className="mt-8 space-y-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {service.highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={slideIn}
                  className="flex items-start gap-3 text-sm text-primary/75 sm:text-base"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>
    </article>
  )
}

function ProcessStepCard({ item, index, isLast = false }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })
  const lineGrow = useSpring(inView ? 1 : 0, { stiffness: 55, damping: 22 })

  return (
    <motion.li
      ref={cardRef}
      variants={fadeUp}
      className="relative flex gap-5 sm:block"
    >
      <div className="flex flex-col items-center pt-1 sm:hidden">
        <motion.div
          className="relative flex h-11 w-11 shrink-0 items-center justify-center"
          initial={{ scale: 0, rotate: -90 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ ...spring, delay: index * 0.08 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-dashed border-blue/35"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue text-[0.65rem] font-bold text-white">
            {item.step}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div
            className="mt-2 w-px origin-top bg-gradient-to-b from-blue via-blue/50 to-transparent"
            style={{ height: 72, scaleY: lineGrow }}
          />
        )}
      </div>

      <motion.div
        whileHover={{ y: -8 }}
        transition={spring}
        className="group relative min-w-0 flex-1 overflow-hidden rounded-3xl border border-blue/10 bg-white p-6 shadow-[0_16px_50px_rgba(30,69,255,0.08)] sm:flex-none sm:p-8"
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-blue via-blue/70 to-blue"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <span
          className="pointer-events-none absolute -right-1 -top-2 select-none text-[5.5rem] font-black leading-none tracking-tighter text-blue/[0.06] sm:text-[7rem]"
          aria-hidden="true"
        >
          {item.step}
        </span>

        <div className="relative hidden sm:block">
          <motion.div
            className="relative inline-flex h-14 w-14 items-center justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ ...spring, delay: index * 0.1 }}
          >
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue/25"
              animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue text-sm font-bold text-white">
              {item.step}
            </span>
          </motion.div>
        </div>

        <h3 className="relative mt-0 text-xl font-bold text-primary sm:mt-6">{item.title}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-primary/65 sm:text-base">{item.text}</p>

        <motion.div
          className="mt-5 h-px w-full bg-primary/8"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.li>
  )
}

function ProcessTimeline() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const beamProgress = useSpring(isInView ? 1 : 0, { stiffness: 45, damping: 20 })
  const dotLeft = useTransform(beamProgress, [0, 1], ['8%', '92%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f7ff] font-sans text-primary"
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-blue/10 blur-[110px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-blue/8 blur-[110px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,69,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,69,255,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="max-w-xl"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
              How we work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              A simple process.
              <span className="text-blue"> Serious execution.</span>
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={spring}
            className="max-w-sm text-sm leading-relaxed text-primary/55 lg:text-base"
          >
            Three focused stages — no fluff, no handoffs. We stay with you from first call to launch.
          </motion.p>
        </div>

        <div className="relative mt-14 hidden sm:block">
          <div className="absolute left-[8%] right-[8%] top-7 h-px bg-primary/10" />
          <motion.div
            className="absolute left-[8%] top-7 h-px w-[84%] origin-left bg-gradient-to-r from-blue via-blue/70 to-blue"
            style={{ scaleX: beamProgress }}
          />
          <motion.div
            className="absolute top-7 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue shadow-[0_0_12px_rgba(30,69,255,0.45)]"
            style={{ left: dotLeft }}
          />

          <motion.ol
            className="grid grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {servicesProcess.map((item, index) => (
              <ProcessStepCard
                key={item.step}
                item={item}
                index={index}
                isLast={index === servicesProcess.length - 1}
              />
            ))}
          </motion.ol>
        </div>

        <motion.ol
          className="mt-12 sm:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {servicesProcess.map((item, index) => (
            <ProcessStepCard
              key={item.step}
              item={item}
              index={index}
              isLast={index === servicesProcess.length - 1}
            />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function ServicesCta() {
  const whatsappHref = getWhatsAppHref(finalCtaButtons.whatsapp)

  return (
    <section className="bg-gradient-to-br from-blue via-[#1a3de6] to-[#0f2bb8] font-sans text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            {finalCtaIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {finalCtaIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {finalCtaIntro.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href={finalCtaButtons.discovery.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-blue transition hover:bg-white/90"
            >
              {finalCtaButtons.discovery.label}
            </a>
            <a
              href={whatsappHref}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
            >
              {finalCtaButtons.whatsapp.label}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const [activeId, setActiveId] = useState(services[0].id)

  const handleSelect = useCallback((id) => {
    setActiveId(id)
    scrollToService(id)
  }, [])

  return (
    <>
      <ServicesHero onExplore={() => scrollToService(services[0].id)} />

      <MarqueeStrip />

      <section className="bg-white font-sans text-primary">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-16">
            <aside className="mb-8 lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)] lg:mb-0 lg:self-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="mb-6 hidden lg:block"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/60">Navigate</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">What we do</h2>
              </motion.div>
              <MobileServiceNav activeId={activeId} onSelect={handleSelect} />
              <div className="mt-8 hidden lg:block">
                <ServiceNav activeId={activeId} onSelect={handleSelect} />
              </div>
            </aside>

            <div>
              {services.map((service, index) => (
                <ServicePanel
                  key={service.id}
                  service={service}
                  index={index}
                  setActiveId={setActiveId}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <ServicesCta />
    </>
  )
}
