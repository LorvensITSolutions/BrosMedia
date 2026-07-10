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
  ourWorkCta,
  ourWorkIntro,
  ourWorkMarqueeItems,
  ourWorkStats,
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
              hoverColor="#1e45ff"
              className="w-full max-w-[17rem] sm:w-auto"
            />
            <button
              type="button"
              onClick={onExplore}
              className="text-sm font-semibold text-primary underline decoration-blue decoration-2 underline-offset-4 transition hover:text-blue"
            >
              View deliverables
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

function BrandIdentityShowcase({ portraitImage, landscapeImage, portraitAlt, landscapeAlt }) {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute left-[8%] top-[12%] h-48 w-48 rounded-full bg-blue/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[6%] right-[4%] h-40 w-40 rounded-full bg-blue/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-center sm:gap-6 lg:gap-8">
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...spring, delay: 0.05 }}
          whileHover={{ y: -6 }}
          className="relative z-10 w-full max-w-[17.5rem] shrink-0 sm:max-w-[15.5rem] lg:max-w-[18rem]"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-blue/10 bg-white p-2 shadow-[0_22px_60px_rgba(30,69,255,0.14)] sm:rounded-[2rem] sm:p-2.5">
            <img
              src={portraitImage}
              alt={portraitAlt}
              className="aspect-[568/734] w-full rounded-[1.35rem] object-cover sm:rounded-[1.5rem]"
              loading="lazy"
            />
          </div>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...spring, delay: 0.18 }}
          whileHover={{ y: -6 }}
          className="relative z-20 w-full max-w-[20rem] shrink-0 sm:-ml-6 sm:max-w-[18rem] lg:-ml-10 lg:max-w-[22rem]"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-blue/10 bg-white p-2 shadow-[0_24px_70px_rgba(30,69,255,0.16)] sm:rounded-[1.75rem] sm:p-2.5">
            <img
              src={landscapeImage}
              alt={landscapeAlt}
              className="aspect-[576/536] w-full rounded-[1.15rem] object-cover sm:rounded-[1.35rem]"
              loading="lazy"
            />
          </div>
        </motion.figure>
      </div>
    </div>
  )
}

function WebsiteDeviceShowcase({ desktopImage, mobileImage, alt }) {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div className="overflow-hidden rounded-2xl border border-blue/10 bg-[#f5f7ff] p-3 shadow-[0_24px_70px_rgba(30,69,255,0.12)] sm:rounded-3xl sm:p-4">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 h-6 flex-1 rounded-md bg-white/80" />
        </div>
        <div className="overflow-hidden rounded-xl border border-blue/10 bg-white">
          <img
            src={desktopImage}
            alt={`${alt} desktop view`}
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, x: 12 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={viewport}
        transition={{ ...spring, delay: 0.15 }}
        className="absolute -bottom-6 -right-2 w-[38%] max-w-[11rem] sm:-bottom-8 sm:right-4 sm:max-w-[13rem] lg:-right-6"
      >
        <div className="rounded-[1.75rem] border-[5px] border-primary bg-primary p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:border-[6px]">
          <div className="overflow-hidden rounded-[1.25rem] bg-white">
            <img
              src={mobileImage}
              alt={`${alt} mobile view`}
              className="aspect-[9/19] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DeliverableShowcase({ image, alt, index }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={spring}
      className="relative overflow-hidden rounded-3xl border border-blue/10 bg-[#f5f7ff] shadow-[0_20px_60px_rgba(30,69,255,0.1)]"
    >
      <span
        className="pointer-events-none absolute -right-2 -top-4 z-10 text-7xl font-black leading-none text-blue/[0.07] sm:text-8xl"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <img
        src={image}
        alt={alt}
        className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
    </motion.div>
  )
}

function TransparentShowcase({ image, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={spring}
      whileHover={{ y: -6 }}
      className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none"
    >
      <img
        src={image}
        alt={alt}
        className="h-auto w-full object-contain"
        loading="lazy"
      />
    </motion.div>
  )
}

function MetaAdsNeonCurve() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%] w-full overflow-visible"
      viewBox="0 0 800 320"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M-40 280 C 80 260, 140 120, 260 140 C 380 160, 420 280, 540 240 C 660 200, 700 80, 840 100"
        stroke="#dfff00"
        strokeWidth="14"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function MetaAdsShowcase({ phoneImage, gridImages = [], alt }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg overflow-visible lg:max-w-none lg:aspect-[5/4]">
      <div className="absolute inset-0 z-0 grid h-full grid-cols-3 gap-2 sm:gap-3">
        {gridImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl"
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Light edge fade only — keep campaign images readable */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/4 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/5 bg-gradient-to-t from-black/35 to-transparent" />

      <MetaAdsNeonCurve />


      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={viewport}
        transition={{ ...spring, delay: 0.12 }}
        className="relative z-10 flex h-full items-center justify-center px-2 py-4 sm:px-6"
      >
        <img
          src={phoneImage}
          alt={alt}
          className="h-auto max-h-[min(30rem,72vw)] w-auto max-w-[88%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:max-h-[34rem]"
          loading="lazy"
        />
      </motion.div>
    </div>
  )
}

function CreativeProductionShowcase({ cards = [], alt }) {
  return (
    <div className="relative z-10 mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:gap-6">
      {cards.map((src, i) => (
        <motion.div
          key={`${src}-${i}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...spring, delay: 0.1 + i * 0.12 }}
          className="relative aspect-[16/11] w-full"
        >
          <img
            src={src}
            alt={`${alt} ${i + 1}`}
            className="absolute inset-0 h-full w-full rounded-2xl object-contain object-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  )
}

function MetaLogoMark() {
  return (
    <img
      src="https://res.cloudinary.com/dvruqkpqk/image/upload/v1783678833/meta-removebg-preview_ji98ct.png"
      alt=""
      className="h-auto w-[min(48vw,15rem)] object-contain sm:w-[min(40vw,17rem)] lg:w-[19rem]"
      loading="lazy"
    />
  )
}

function PrintCollateralShowcase({ leftImage, rightImage, alt, index, title, description }) {
  const titleMain = title.replace(/\s*Collateral\s*$/i, '').trim()
  const hasCollateral = /collateral/i.test(title)

  return (
    <div className="relative h-[36rem] w-full overflow-hidden sm:h-[42rem] lg:h-[48rem]">
      {/* Text — top right (padded) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="relative z-[3] ml-auto w-full max-w-md px-6 pt-10 sm:max-w-lg sm:pt-14 lg:max-w-xl lg:px-10 lg:pt-16"
      >
        <motion.p
          variants={fadeUp}
          className="text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.p>
        <motion.h3
          variants={fadeUp}
          className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
        >
          <span className="text-accent">{titleMain}</span>
          {hasCollateral ? <span className="text-white"> Collateral</span> : null}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* GoClean — flush to left edge, bleeds off left/top */}
      <motion.div
        initial={{ opacity: 0, x: -48, rotate: -16 }}
        whileInView={{ opacity: 1, x: 0, rotate: -12 }}
        viewport={viewport}
        transition={spring}
        className="absolute -left-8 top-0 z-[1] w-[85%] origin-top-left sm:-left-12 sm:w-[68%] lg:-left-16 lg:w-[60%] xl:-left-20"
      >
        <img
          src={leftImage}
          alt={`${alt} — GoClean brochure`}
          className="h-auto w-full max-w-none object-contain object-left drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
          loading="lazy"
        />
      </motion.div>

      {/* AMVI — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ ...spring, delay: 0.1 }}
        className="absolute bottom-6 right-4 z-[2] w-[88%] sm:bottom-8 sm:right-6 sm:w-[64%] lg:bottom-10 lg:right-8 lg:w-[52%]"
      >
        <img
          src={rightImage}
          alt={`${alt} — AMVI brochure`}
          className="h-auto w-full rounded-2xl object-contain drop-shadow-[0_20px_44px_rgba(0,0,0,0.5)] sm:rounded-3xl"
          loading="lazy"
        />
      </motion.div>
    </div>
  )
}

function DeliverableBlock({ item, index }) {
  const isEven = index % 2 === 0
  const isWebsite = item.layout === 'website'
  const isBrandIdentity = item.layout === 'brand-identity'
  const isTransparent = item.layout === 'transparent'
  const isMetaAds = item.layout === 'meta-ads'
  const isCreativeProduction = item.layout === 'creative-production'
  const isPrintCollateral = item.layout === 'print-collateral'

  if (isPrintCollateral) {
    return (
      <article
        id={item.id}
        className="scroll-mt-[calc(var(--navbar-height)+1rem)] relative overflow-hidden bg-black font-sans text-white"
      >
        <PrintCollateralShowcase
          leftImage={item.leftImage}
          rightImage={item.rightImage}
          alt={item.imageAlt}
          index={index}
          title={item.title}
          description={item.description}
        />
      </article>
    )
  }

  if (isCreativeProduction) {
    return (
      <article
        id={item.id}
        className="scroll-mt-[calc(var(--navbar-height)+1rem)] relative overflow-hidden bg-black py-16 font-sans text-white lg:py-24"
      >
        <div className="pointer-events-none absolute -right-6 top-8 opacity-90 sm:right-4 sm:top-10 lg:right-10 lg:top-12">
          <MetaLogoMark />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="relative z-10 max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {String(index + 1).padStart(2, '0')}
            </motion.p>
            <motion.h3
              variants={fadeUp}
              className="mt-4 text-3xl font-bold tracking-tight text-accent sm:text-4xl lg:text-5xl"
            >
              {item.title}
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {item.description}
            </motion.p>
          </motion.div>

          <div className="relative mt-8 sm:mt-10">
            <svg
              className="pointer-events-none absolute left-[-8%] top-[18%] z-[1] h-[70%] w-[116%] overflow-visible"
              viewBox="0 0 1000 280"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M-20 180 C 120 40, 220 40, 340 150 C 460 260, 560 260, 700 140 C 820 40, 900 80, 1040 160"
                stroke="#dfff00"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>

            <CreativeProductionShowcase cards={item.cards} alt={item.imageAlt} />
          </div>
        </div>
      </article>
    )
  }

  if (isMetaAds) {
    return (
      <article
        id={item.id}
        className="scroll-mt-[calc(var(--navbar-height)+1rem)] overflow-hidden bg-black py-16 font-sans text-white lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16"
          >
            <motion.div variants={fadeUp} className="relative z-10 max-w-xl">
              <p className="text-5xl font-light tracking-tight text-white/90 sm:text-6xl lg:text-7xl">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-5 text-3xl font-bold tracking-tight text-accent sm:text-4xl lg:text-5xl">
                {item.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                {item.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <MetaAdsShowcase
                phoneImage={item.phoneImage}
                gridImages={item.gridImages}
                alt={item.imageAlt}
              />
            </motion.div>
          </motion.div>
        </div>
      </article>
    )
  }

  return (
    <article
      id={item.id}
      className={`scroll-mt-[calc(var(--navbar-height)+1rem)] py-16 lg:py-24 ${
        isEven ? 'bg-white' : 'bg-[#f5f7ff]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            isEven ? '' : 'lg:[&>*:first-child]:order-2'
          }`}
        >
          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
              {String(index + 1).padStart(2, '0')} · Deliverable
            </p>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              {item.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-primary/70 sm:text-lg">
              {item.description}
            </p>
            {isWebsite && (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue/15 bg-blue/[0.06] px-3 py-1.5 text-xs font-semibold text-blue">
                  Desktop view
                </span>
                <span className="rounded-full border border-blue/15 bg-blue/[0.06] px-3 py-1.5 text-xs font-semibold text-blue">
                  Mobile view
                </span>
              </div>
            )}
            {isBrandIdentity && (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue/15 bg-blue/[0.06] px-3 py-1.5 text-xs font-semibold text-blue">
                  Brand guidelines
                </span>
                <span className="rounded-full border border-blue/15 bg-blue/[0.06] px-3 py-1.5 text-xs font-semibold text-blue">
                  Logo & color system
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={isWebsite || isBrandIdentity ? 'pb-4 sm:pb-6' : ''}
          >
            {isWebsite ? (
              <WebsiteDeviceShowcase
                desktopImage={item.desktopImage}
                mobileImage={item.mobileImage}
                alt={item.imageAlt}
              />
            ) : isBrandIdentity ? (
              <BrandIdentityShowcase
                portraitImage={item.portraitImage}
                landscapeImage={item.landscapeImage}
                portraitAlt={item.portraitAlt}
                landscapeAlt={item.landscapeAlt}
              />
            ) : isTransparent ? (
              <TransparentShowcase image={item.image} alt={item.imageAlt} />
            ) : (
              <DeliverableShowcase image={item.image} alt={item.imageAlt} index={index} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </article>
  )
}

function DeliverablesSection() {
  return (
    <div id="deliverables" className="scroll-mt-[calc(var(--navbar-height)+1rem)] font-sans">
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
              {deliverables.label}
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {deliverables.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-primary/65 sm:text-lg">
              {deliverables.intro}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {deliverables.items.map((item, index) => (
        <DeliverableBlock key={item.id} item={item} index={index} />
      ))}
    </div>
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
      <OurWorkHero onExplore={() => scrollToSection('deliverables')} />
      <MarqueeStrip />
      <DeliverablesSection />
      <OurWorkCta />
    </>
  )
}
