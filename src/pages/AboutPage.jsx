import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import { PhilosophySplitCard } from '../framer/project_split_card.jsx'
import { StoryStackedCarousel } from '../framer/stacked_card_carousel.jsx'
import { WhyBrosmediaAccordion } from '../framer/service_accordion.jsx'
import TeamMemberCardCarousel from '../framer/team_member_card_carousel.jsx'
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

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
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
        text="We build brands"
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="and get results."
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      
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
              text="Start a Project"
              to={routes.contact}
              hoverColor="#1e45ff"
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

function WhoWeAreIcon({ className = '' }) {
  return (
    <svg
      className={`h-6 w-6 shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v18M3 12h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IntroEditorial() {
  return (
    <section className="relative overflow-hidden bg-white py-24 font-sans">
      {/* Background Blur */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue/10 blur-[120px]" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-blue/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid items-center gap-20 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {/* LEFT CONTENT */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue">
              WHO WE ARE
            </p>

            <h2 className="mt-6 text-4xl font-black leading-tight text-primary sm:text-5xl lg:text-5xl">
              We build brands
              <br />
              people remember.
            </h2>

            

            <p className="mt-8 text-lg leading-9 text-primary/70">
              BROsMEDIA is a creative digital agency that transforms ideas into
              powerful digital experiences. From branding and UI/UX to websites,
              marketing and scalable products, we help ambitious businesses grow
              faster with creativity backed by technology.
            </p>

          

           
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center"
          >
            {/* Main Image */}
            <div className="relative h-[560px] w-full overflow-hidden rounded-[40px] bg-gradient-to-br from-blue/15 via-white to-blue/5 shadow-2xl">
              <img
                src="/images/about/team.jpg"
                alt="BROsMEDIA"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -left-10 top-10 rounded-3xl bg-white px-8 py-6 shadow-2xl"
            >
              <p className="text-4xl font-black text-blue">10+</p>
              <p className="text-sm text-primary/60">
                Brands Built
              </p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="absolute -right-8 top-40 rounded-3xl bg-white px-8 py-6 shadow-2xl"
            >
              <p className="text-4xl font-black text-blue">50+</p>
              <p className="text-sm text-primary/60">
                Projects Delivered
              </p>
            </motion.div>

            {/* Floating Card 3 */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
              }}
              className="absolute bottom-8 left-12 rounded-3xl bg-white px-8 py-6 shadow-2xl"
            >
              <p className="text-4xl font-black text-blue">100%</p>
              <p className="text-sm text-primary/60">
                Client Focus
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section
      id="story"
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-[#f5f7ff] font-sans"
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 lg:pt-24 lg:pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mb-8 max-w-2xl lg:mb-10"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
            {aboutStory.label}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {aboutStory.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-primary/50">
            Scroll, drag, or tap to move through our story.
          </motion.p>
        </motion.div>

        <div className="relative h-[520px] w-full sm:h-[600px] lg:h-[680px]">
          <StoryStackedCarousel chapters={aboutStory.chapters} />
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-white py-8 font-sans lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mb-6 max-w-2xl lg:mb-8"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
            {aboutPhilosophy.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            {aboutPhilosophy.title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={spring}
        >
          <PhilosophySplitCard philosophy={aboutPhilosophy} />
        </motion.div>
      </div>
    </section>
  )
}

function WhySection() {
  return (
    <section
      id="why"
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] border-y border-blue/10 bg-[#f5f7ff] pt-8 pb-20 font-sans lg:pt-10 lg:pb-24"
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

        <WhyBrosmediaAccordion differentiators={aboutDifferentiators} />
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section
      id="team"
      className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-white py-16 font-sans lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto mb-10 max-w-2xl text-center lg:mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
            {aboutTeam.label}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {aboutTeam.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-primary/65 sm:text-lg">
            {aboutTeam.description}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-primary/45">
            {aboutTeam.placeholderNote}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={spring}
          className="relative h-[520px] w-full sm:h-[580px] lg:h-[640px]"
        >
          <TeamMemberCardCarousel
            members={aboutTeam.members}
            buttonLabel={aboutTeam.buttonLabel}
            backgroundColor="transparent"
            cardBackground="#ffffff"
            textColor="#000000"
            tagBg="#f5f7ff"
            tagText="#1e45ff"
            buttonBg="#1e45ff"
            buttonText="#ffffff"
            arrowBg="rgba(255,255,255,0.9)"
            arrowIcon="#000000"
            padding={24}
            gap={28}
            desktopCardWidth={340}
            desktopCardHeight={500}
          />
        </motion.div>
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
