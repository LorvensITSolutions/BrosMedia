import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageStreamHero } from '@/components/ui/image-stream-hero'

const HERO_IMAGES = [
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/prabhas_brosmedia_creative.webp',
    alt: 'Prabhas supports Nellore Wolves — Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_brosmedia_creative.jpg',
    alt: 'MB Prime Villas & Plots — Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/niharika_konidela_brosmedia_creative.heic',
    alt: 'Niharika Konidela Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_ap_brosmedia_creative.jpg',
    alt: 'MB Prime Andhra Pradesh villa community — Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/seahawks_brosmedia_beyond_the_game.heic',
    alt: 'Seahawks Beyond the Game — Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/uv_intro_brosmedia_creative.heic',
    alt: 'UV Creations intro — Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/nellore_wolves_intro_brosmedia_creative.heic',
    alt: 'Nellore Wolves intro — Brosmedia creative',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const HERO_LAYOUT = {
  mobile: {
    heightClass: 'h-svh min-h-[100svh]',
    axis: 54,
    speed: 22,
    cards: 7,
    path: {
      perspective: 28,
      cardWidth: 34,
      cardHeight: 46,
      birthHeight: 5.5,
      exitHeight: 74,
      railBirth: -16,
      railExit: 54,
      fan: 3.1,
      turnBirth: 5,
      turnExit: 24,
    },
  },
  tablet: {
    heightClass: 'h-svh min-h-[100svh]',
    axis: 66,
    speed: 20,
    cards: 8,
    path: {
      perspective: 30,
      cardWidth: 24,
      cardHeight: 33,
      birthHeight: 3.8,
      exitHeight: 58,
      railBirth: -12,
      railExit: 46,
      fan: 3.2,
      turnBirth: 6,
      turnExit: 26,
    },
  },
  desktop: {
    heightClass: 'h-svh min-h-[100svh]',
    axis: 63,
    speed: 20,
    cards: 9,
    path: {
      perspective: 30,
      cardWidth: 22,
      cardHeight: 31,
      birthHeight: 3.6,
      exitHeight: 56,
      railBirth: -11,
      railExit: 48,
      fan: 3.3,
      turnBirth: 6,
      turnExit: 28,
    },
  },
}

function useHeroLayout() {
  const [layout, setLayout] = useState(HERO_LAYOUT.desktop)

  useEffect(() => {
    const pick = () => {
      const width = window.innerWidth
      if (width < 640) setLayout(HERO_LAYOUT.mobile)
      else if (width < 1024) setLayout(HERO_LAYOUT.tablet)
      else setLayout(HERO_LAYOUT.desktop)
    }

    pick()
    window.addEventListener('resize', pick)
    return () => window.removeEventListener('resize', pick)
  }, [])

  return layout
}

function ImageModal({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined

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
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          key="hero-image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt || 'Image preview'}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8"
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

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            ×
          </button>

          <motion.div
            className="relative z-[1] max-h-[min(88svh,920px)] w-full max-w-[min(94vw,720px)] overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] [transform-style:preserve-3d] sm:rounded-2xl"
            initial={{ rotateY: -90, opacity: 0, scale: 0.88 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: 90, opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, mass: 0.85 }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt || 'Brosmedia creative'}
              className="max-h-[min(78svh,820px)] w-full object-contain"
            />
            {image.alt ? (
              <p className="border-t border-white/10 bg-black/80 px-3 py-2.5 text-center text-[0.7rem] text-white/70 sm:px-4 sm:py-3 sm:text-sm">
                {image.alt}
              </p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function WorkStreamSection() {
  const [activeImage, setActiveImage] = useState(null)
  const layout = useHeroLayout()

  return (
    <section
      id="work-stream"
      aria-label="Brosmedia creative work stream"
      className="relative z-0 -mt-2 hidden overflow-x-hidden bg-black pb-6 lg:block sm:pb-8 md:pb-10"
    >
      <ImageStreamHero
        images={HERO_IMAGES}
        className={`${layout.heightClass} w-full max-w-[100vw] overflow-hidden bg-black`}
        axis={layout.axis}
        speed={layout.speed}
        cards={layout.cards}
        path={layout.path}
        onImageClick={setActiveImage}
      >
        {/* Soft edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-16 bg-gradient-to-b from-black via-black/50 to-transparent sm:h-20 md:h-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-16 bg-gradient-to-t from-black via-black/50 to-transparent sm:h-20 md:h-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-6 bg-gradient-to-r from-black/70 to-transparent sm:w-10 md:w-14"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-6 bg-gradient-to-l from-black/70 to-transparent sm:w-10 md:w-14"
        />

        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-between px-4 pb-4 pt-12 sm:px-6 sm:pb-6 sm:pt-14 md:pb-8 md:pt-16">
          <motion.div
            className="mt-1 flex w-full max-w-[20rem] flex-col items-center text-center sm:mt-2 sm:max-w-md md:max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.span
              custom={0.05}
              variants={fadeUp}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-accent/50 bg-accent px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-primary sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[0.65rem] sm:tracking-[0.2em]"
            >
              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="truncate">Work That Earns Eyes</span>
            </motion.span>

            <motion.div custom={0.18} variants={fadeUp} className="mt-2.5 sm:mt-3 md:mt-3.5">
              <motion.p
                aria-hidden="true"
                className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-[clamp(1.65rem,9vw,2.4rem)] font-black uppercase leading-none tracking-tight text-accent sm:gap-x-3 sm:text-[clamp(2rem,6.5vw,3.25rem)] md:gap-x-3.5 md:text-[clamp(2.25rem,5.5vw,4rem)]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>Creative</span>
                <span className="text-blue">Work</span>
              </motion.p>
            </motion.div>

            <motion.div
              custom={0.28}
              variants={fadeUp}
              className="mt-2.5 flex w-full flex-col items-center gap-2 sm:mt-3 md:mt-3.5"
            >
              <motion.span
                className="h-[3px] rounded-full bg-accent"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{
                  width: layout === HERO_LAYOUT.mobile ? 48 : layout === HERO_LAYOUT.tablet ? 60 : 72,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            custom={0.38}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="px-1 text-center text-[0.65rem] leading-snug text-white/65 sm:text-xs sm:leading-5 md:text-sm md:leading-6"
          >
            <span className="block max-sm:whitespace-normal sm:whitespace-nowrap">
              From celebrity campaigns to conversion-led brand systems
            </span>
            <span className="block max-sm:whitespace-normal sm:whitespace-nowrap">
              scroll the stream to see the work that earns attention.
            </span>
          </motion.p>
        </div>
      </ImageStreamHero>

      <ImageModal image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  )
}
