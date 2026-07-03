import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import {
  aboutCta,
  aboutDifferentiators,
  aboutIntro,
  aboutMarqueeItems,
  aboutPhilosophy,
  aboutStats,
  aboutStory,
  aboutTeam,
} from '../data/about'
import { routes } from '../data/navigation'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-60px' }
const easeOut = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: spring },
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
        text="We are a branding"
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="and marketing agency"
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
          text="that gets things "
          as="span"
          active={hovered}
          color="#000000"
          hoverColor="#1e45ff"
          staggerFrom="first"
          {...swapBase}
        />
        <LetterSwap
          text="done."
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

function AboutHero({ onExplore }) {
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
            {aboutIntro.label}
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
              <span className="inline-block max-w-full origin-center text-center font-black leading-none tracking-tighter text-blue/[0.07] text-[3.5rem] sm:text-[clamp(4.5rem,14cqw,10rem)] lg:text-[clamp(9rem,17.5cqw,13.5rem)] xl:text-[clamp(10rem,18cqw,14rem)]">
                ABOUT
              </span>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="relative z-10 mx-auto max-w-2xl px-1 text-base leading-relaxed text-primary/65 sm:px-0 sm:text-lg"
            >
              {aboutIntro.paragraphs[0]}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6"
          >
            <EyeFollowButton
              text="Start a conversation"
              to={routes.contact}
              className="w-full max-w-[17rem] sm:w-auto"
            />
            <button
              type="button"
              onClick={onExplore}
              className="text-sm font-semibold text-primary underline decoration-blue decoration-2 underline-offset-4 transition hover:text-blue"
            >
              Our story
            </button>
          </motion.div>

          <motion.dl
            variants={stagger}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
          >
            {aboutStats.map((stat) => (
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
  const doubled = [...aboutMarqueeItems, ...aboutMarqueeItems]

  return (
    <div className="relative overflow-hidden bg-primary py-4">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
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

function IntroEditorial() {
  return (
    <section className="bg-white font-sans text-primary">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          className="grid gap-12 lg:grid-cols-[2fr_5fr] lg:items-start lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">Who we are</p>
            <p className="mt-8 text-7xl font-bold tracking-tight text-blue sm:text-8xl">10+</p>
            <p className="mt-2 text-lg font-semibold text-primary/55">Brands in year one</p>
            <ul className="mt-10 space-y-4">
              {aboutStats.slice(1).map((stat) => (
                <li key={stat.label} className="flex items-baseline gap-3 border-l-2 border-blue/25 pl-4">
                  <span className="text-xl font-bold text-blue">{stat.value}</span>
                  <span className="text-sm text-primary/55">{stat.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-xl leading-relaxed text-primary/70 sm:text-2xl sm:leading-relaxed lg:text-[1.65rem] lg:leading-relaxed">
              {aboutIntro.paragraphs[1]}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StorySection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-[#f5f7ff] font-sans"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mb-12 max-w-2xl lg:mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
            {aboutStory.label}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {aboutStory.title}
          </motion.h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:items-start">
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, clipPath: 'inset(6% 6% 6% 6% round 24px)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
            viewport={viewport}
            transition={{ duration: 0.85, ease: easeOut }}
            className="overflow-hidden rounded-3xl border border-blue/10 shadow-[0_24px_60px_rgba(30,69,255,0.1)]"
          >
            <img
              src={ABOUT_IMAGE}
              alt="Brosmedia team collaborating"
              className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:min-h-[480px]"
              loading="lazy"
            />
          </motion.div>

          <motion.ol
            className="list-none space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {aboutStory.chapters.map((chapter, index) => (
              <motion.li key={chapter.id} variants={slideRight}>
                <motion.article
                  whileHover={{ x: 6 }}
                  transition={spring}
                  className="rounded-2xl border border-blue/10 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue/70">{chapter.year}</p>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-primary/70 sm:text-lg">{chapter.text}</p>
                </motion.article>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const lineGrow = useSpring(isInView ? 1 : 0, { stiffness: 50, damping: 22 })

  return (
    <section
      id="philosophy"
      ref={ref}
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-white py-20 font-sans lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
            {aboutPhilosophy.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            {aboutPhilosophy.title}
          </motion.h2>

          <motion.div variants={fadeUp} className="relative mx-auto mt-12 max-w-3xl">
            <motion.div
              className="mx-auto h-px w-24 origin-center bg-blue"
              style={{ scaleX: lineGrow }}
            />
            <blockquote className="mt-10 text-2xl font-bold leading-snug text-primary sm:text-3xl lg:text-4xl">
              {aboutPhilosophy.quote}
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-primary/65 sm:text-lg">
              {aboutPhilosophy.body}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function WhySection() {
  return (
    <section
      id="why"
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] border-y border-blue/10 bg-[#f5f7ff] py-20 font-sans lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
              {aboutDifferentiators.label}
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {aboutDifferentiators.title}
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-sm text-sm leading-relaxed text-primary/55 lg:text-base">
            Seven reasons clients choose a focused agency over a bloated one.
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {aboutDifferentiators.items.map((item, index) => (
            <motion.li key={item.id} variants={fadeUp}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={spring}
                className="h-full rounded-2xl border border-blue/12 bg-white p-6 shadow-[0_12px_40px_rgba(30,69,255,0.06)] sm:p-7"
              >
                <span className="text-xs font-bold tabular-nums text-blue/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary/65 sm:text-base">{item.text}</p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section
      id="team"
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-white py-20 font-sans lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="lg:sticky lg:top-[calc(var(--navbar-height)+2rem)]"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
              {aboutTeam.label}
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {aboutTeam.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-primary/65 sm:text-lg">
              {aboutTeam.description}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-sm text-primary/45">
              {aboutTeam.placeholderNote}
            </motion.p>
          </motion.div>

          <motion.ul
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {aboutTeam.placeholders.map((member, index) => (
              <motion.li key={member.role} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={spring}
                  className="overflow-hidden rounded-2xl border border-blue/10 bg-[#f5f7ff] p-5"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blue/15 via-white to-blue/5">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: [0.35, 0.65, 0.35] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                    >
                      <span className="text-4xl font-black text-blue/20">+</span>
                    </motion.div>
                  </div>
                  <p className="mt-4 text-sm font-bold text-primary">{member.role}</p>
                  <p className="mt-1 text-xs text-blue/60">Coming soon</p>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function AboutCta() {
  return (
    <section className="bg-gradient-to-br from-blue via-[#1a3de6] to-[#0f2bb8] font-sans text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            {aboutCta.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {aboutCta.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {aboutCta.description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex justify-center">
            <a
              href={routes.contact}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue transition hover:bg-white/90"
            >
              {aboutCta.buttonLabel}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <AboutHero onExplore={() => scrollToSection('story')} />
      <MarqueeStrip />
      <IntroEditorial />
      <StorySection />
      <PhilosophySection />
      <WhySection />
      <TeamSection />
      <AboutCta />
    </>
  )
}
