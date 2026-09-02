import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import InfiniteMediaCarousel from '../framer/infinite_media_carousel.jsx'
import { useReelsCarouselMetrics } from '../framer/useReelsCarouselMetrics.js'
import {
  REELS_CAROUSEL_ITEMS,
  reelsCarouselTheme,
  reelsIntro,
} from '../data/reelsWork.js'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function ReelVideoModal({ reel, onClose }) {
  useEffect(() => {
    if (!reel) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [reel, onClose])

  return createPortal(
    <AnimatePresence>
      {reel ? (
        <motion.div
          key="reel-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={reel.title || 'Reel preview'}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 pt-[calc(var(--navbar-height)+0.75rem)] sm:p-6 sm:pt-[calc(var(--navbar-height)+1rem)] md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-[1] w-full max-w-[min(94vw,720px)]"
            initial={{ rotateY: -90, opacity: 0, scale: 0.88 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: 90, opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, mass: 0.85 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close reel preview"
              className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-lg font-semibold leading-none text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
            >
              ×
            </button>

            <div className="max-h-[min(calc(88svh-var(--navbar-height)),820px)] overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:rounded-2xl">
              <video
                key={reel.src}
                src={reel.src}
                controls
                autoPlay
                playsInline
                className="max-h-[min(calc(78svh-var(--navbar-height)),760px)] w-full object-contain"
              />
              {reel.title ? (
                <p className="border-t border-white/10 bg-black/80 px-3 py-2.5 text-center text-[0.7rem] text-white/70 sm:px-4 sm:py-3 sm:text-sm">
                  {reel.title}
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default function ReelsWorkSection() {
  const [activeReel, setActiveReel] = useState(null)
  const metrics = useReelsCarouselMetrics()

  const carouselTheme = useMemo(
    () => ({
      ...reelsCarouselTheme,
      cardLayout: {
        ...reelsCarouselTheme.cardLayout,
        cardWidth: metrics.cardWidth,
        cardHeight: metrics.cardHeight,
        cardGap: metrics.cardGap,
        cardBorderRadius: metrics.cardBorderRadius,
      },
      motion: {
        ...reelsCarouselTheme.motion,
        ...metrics.motion,
      },
      titleTypography: {
        ...reelsCarouselTheme.titleTypography,
        titleFont: {
          ...reelsCarouselTheme.titleTypography.titleFont,
          fontSize: metrics.titleFontSize,
        },
      },
    }),
    [metrics],
  )

  return (
    <section
      id="reels-work"
      aria-label="Brosmedia reels and video work"
      className={`reels-work-section relative bg-black font-sans text-white max-sm:-mt-10 sm:mt-0${metrics.isMobile ? ' reels-work-section--mobile' : ''}${metrics.isLargeDesktop ? ' reels-work-section--wide' : ''}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hero-cinematic-glow-green opacity-35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hero-cinematic-glow-blue opacity-30"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-3 pt-3 pb-5 sm:px-6 sm:pt-16 sm:pb-8 lg:max-w-[1180px] lg:px-8 lg:pt-20 lg:pb-10 xl:max-w-[1400px] 2xl:max-w-[1680px]">
        <motion.div
          className="mx-auto flex max-w-xl flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-accent/50 bg-accent px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-primary sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[0.65rem] sm:tracking-[0.2em]"
          >
            <motion.span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="truncate">{reelsIntro.label}</span>
          </motion.span>

          <motion.div variants={fadeUp} className="mt-1.5 sm:mt-2">
            <h2 className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-[clamp(1.5rem,8vw,2.4rem)] font-black uppercase leading-none tracking-tight sm:gap-x-3 sm:text-[clamp(2rem,6.5vw,3.25rem)]">
              <span className="text-accent">{reelsIntro.headlineAccent}</span>
              <span className="text-blue">{reelsIntro.headlineBlue}</span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-1.5 max-w-md text-sm text-white/55 sm:mt-3 sm:text-base"
          >
            {reelsIntro.subline}
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-10 w-full mt-1 pb-4 sm:mt-2 sm:pb-12 lg:pb-14">
        <InfiniteMediaCarousel
          key={`${metrics.cardWidth}x${metrics.cardHeight}`}
          items={REELS_CAROUSEL_ITEMS}
          theme={carouselTheme}
          onVideoOpen={setActiveReel}
          minHeight={metrics.carouselMinHeight}
        />
      </div>

      <ReelVideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  )
}
