import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import { finalCtaButtons, getWhatsAppHref } from '../data/finalCta'
import {
  deliverables,
  getClientWebsiteHref,
  ourWorkCta,
  ourWorkIntro,
  ourWorkMarqueeItems,
  ourWorkStats,
  portfolioClients,
} from '../data/ourWork'
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
        text="Real brands."
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="Real work."
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="Real results."
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

function OurWorkHero({ onExplore }) {
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
            {ourWorkIntro.label}
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
                WORK
              </span>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="relative z-10 mx-auto max-w-2xl px-1 text-base leading-relaxed text-primary/65 sm:px-0 sm:text-lg"
            >
              {ourWorkIntro.description}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6"
          >
            <EyeFollowButton
              text="Talk to us"
              to={routes.contact}
              className="w-full max-w-[17rem] sm:w-auto"
            />
            <button
              type="button"
              onClick={onExplore}
              className="text-sm font-semibold text-primary underline decoration-blue decoration-2 underline-offset-4 transition hover:text-blue"
            >
              View portfolio
            </button>
          </motion.div>

          <motion.dl
            variants={stagger}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
          >
            {ourWorkStats.map((stat) => (
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
  const doubled = [...ourWorkMarqueeItems, ...ourWorkMarqueeItems]

  return (
    <div className="relative overflow-hidden bg-primary py-4">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
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

function PortfolioTable() {
  return (
    <section id="portfolio" className="scroll-mt-[calc(var(--navbar-height)+1rem)] bg-[#f5f7ff] py-16 font-sans lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mb-10 lg:mb-14"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
            Client portfolio
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Who we have worked with
          </motion.h2>
        </motion.div>

        <div className="hidden overflow-hidden rounded-2xl border border-blue/10 bg-white shadow-[0_20px_60px_rgba(30,69,255,0.08)] lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-blue/10 bg-blue/[0.04]">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue/80">Client</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue/80">Industry</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue/80">Work done</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue/80">Website</th>
              </tr>
            </thead>
            <tbody>
              {portfolioClients.map((row, index) => {
                const href = getClientWebsiteHref(row.website)
                return (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ ...spring, delay: index * 0.04 }}
                    className="border-b border-primary/5 transition hover:bg-blue/[0.03]"
                  >
                    <td className="px-6 py-5 align-top text-sm font-bold text-primary">{row.client}</td>
                    <td className="px-6 py-5 align-top text-sm text-primary/60">{row.industry}</td>
                    <td className="max-w-md px-6 py-5 align-top text-sm leading-relaxed text-primary/70">
                      {row.workDone}
                    </td>
                    <td className="px-6 py-5 align-top text-sm">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 transition hover:decoration-blue"
                        >
                          {row.website}
                        </a>
                      ) : (
                        <span className="text-primary/35">—</span>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <motion.ul
          className="grid gap-4 lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {portfolioClients.map((row) => {
            const href = getClientWebsiteHref(row.website)
            return (
              <motion.li key={row.id} variants={fadeUp}>
                <article className="rounded-2xl border border-blue/10 bg-white p-5 shadow-[0_12px_40px_rgba(30,69,255,0.06)]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-primary">{row.client}</h3>
                    <span className="shrink-0 rounded-full bg-blue/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-blue">
                      {row.industry.split(',')[0]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-primary/50">{row.industry}</p>
                  <p className="mt-4 text-sm leading-relaxed text-primary/70">{row.workDone}</p>
                  <div className="mt-4 border-t border-primary/8 pt-4">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue"
                      >
                        {row.website} →
                      </a>
                    ) : (
                      <span className="text-sm text-primary/35">No public website</span>
                    )}
                  </div>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

function DeliverablesSection() {
  return (
    <section className="bg-white py-20 font-sans lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="lg:sticky lg:top-[calc(var(--navbar-height)+2rem)] lg:self-start"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
              {deliverables.label}
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {deliverables.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-primary/60">
              Every engagement draws from this stack — tailored to what your brand actually needs.
            </motion.p>
          </motion.div>

          <motion.ul
            className="grid gap-3 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {deliverables.items.map((item, index) => (
              <motion.li key={item} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={spring}
                  className="flex h-full gap-3 rounded-xl border border-blue/10 bg-[#f5f7ff] p-4 sm:p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue text-[0.65rem] font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed text-primary/75 sm:text-base">{item}</p>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function OurWorkCta() {
  const whatsappHref = getWhatsAppHref(finalCtaButtons.whatsapp)

  return (
    <section className="bg-gradient-to-br from-blue via-[#1a3de6] to-[#0f2bb8] font-sans text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            {ourWorkCta.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {ourWorkCta.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {ourWorkCta.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href={routes.contact}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue transition hover:bg-white/90"
            >
              {ourWorkCta.buttonLabel}
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

export default function OurWorkPage() {
  return (
    <>
      <OurWorkHero onExplore={() => scrollToSection('portfolio')} />
      <MarqueeStrip />
      <PortfolioTable />
      <DeliverablesSection />
      <OurWorkCta />
    </>
  )
}
