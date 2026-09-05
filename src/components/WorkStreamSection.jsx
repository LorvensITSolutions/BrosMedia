import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CreativeWorkGallery from '../framer/creative_work_gallery.jsx'
import { useCreativeGalleryMetrics } from '../framer/useCreativeGalleryMetrics.js'
import {
  getPinPanelStyle,
  useCreativeWorkScrollPin,
} from '../framer/useCreativeWorkScrollPin.js'

const HERO_IMAGES = [
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/prabhas_brosmedia_creative.webp',
    alt: 'Prabhas supports Nellore Wolves - Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_brosmedia_creative.jpg',
    alt: 'MB Prime Villas & Plots - Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/niharika_konidela_brosmedia_creative.heic',
    alt: 'Niharika Konidela Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_ap_brosmedia_creative.jpg',
    alt: 'MB Prime Andhra Pradesh villa community - Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/seahawks_brosmedia_beyond_the_game.heic',
    alt: 'Seahawks Beyond the Game - Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/uv_intro_brosmedia_creative.heic',
    alt: 'UV Creations intro - Brosmedia creative',
  },
  {
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/nellore_wolves_intro_brosmedia_creative.heic',
    alt: 'Nellore Wolves intro - Brosmedia creative',
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

  return createPortal(
    <AnimatePresence>
      {image ? (
        <motion.div
          key="hero-image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt || 'Image preview'}
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
              aria-label="Close image preview"
              className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-lg font-semibold leading-none text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
            >
              ×
            </button>

            <div className="max-h-[min(calc(88svh-var(--navbar-height)),820px)] overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:rounded-2xl">
              <img
                src={image.src}
                alt={image.alt || 'Brosmedia creative'}
                className="max-h-[min(calc(78svh-var(--navbar-height)),760px)] w-full object-contain"
              />
              {image.alt ? (
                <p className="border-t border-white/10 bg-black/80 px-3 py-2.5 text-center text-[0.7rem] text-white/70 sm:px-4 sm:py-3 sm:text-sm">
                  {image.alt}
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

export default function WorkStreamSection() {
  const [activeImage, setActiveImage] = useState(null)
  const sectionRef = useRef(null)
  const metrics = useCreativeGalleryMetrics(HERO_IMAGES.length)
  const { progress, pinPhase } = useCreativeWorkScrollPin(
    sectionRef,
    metrics.scrollDistance,
    metrics.holdDistance,
  )

  const pinStyle = getPinPanelStyle(pinPhase, metrics.totalScrollDistance)

  return (
    <section
      id="work-stream"
      ref={sectionRef}
      aria-label="Brosmedia creative work stream"
      className="relative z-0 bg-black max-sm:-mt-6 sm:mt-0"
      style={{ height: metrics.sectionHeight }}
    >
      <div
        className="relative w-full"
        style={{ height: metrics.sectionHeightPx }}
      >
        <div
          className="flex flex-col overflow-hidden bg-black max-sm:justify-center sm:justify-start"
          style={pinStyle}
        >
          <div className="relative z-10 mx-auto flex w-full max-w-7xl shrink-0 flex-col items-center px-3 pt-0 sm:px-6 sm:pt-1 lg:max-w-[1180px] lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1680px]">
            <motion.div
              className="mx-auto flex max-w-xl flex-col items-center text-center"
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

              <motion.div custom={0.18} variants={fadeUp} className="mt-1.5 sm:mt-2">
                <motion.p
                  aria-hidden="true"
                  className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-[clamp(1.5rem,8vw,2.4rem)] font-black uppercase leading-none tracking-tight text-accent sm:gap-x-3 sm:text-[clamp(2rem,6.5vw,3.25rem)]"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span>Creative</span>
                  <span className="text-blue">Work</span>
                </motion.p>
              </motion.div>

              
            </motion.div>
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl shrink-0 flex-col items-center px-1 pt-1 pb-1 sm:flex-1 sm:shrink sm:px-4 sm:pt-6 sm:pb-4 md:pt-8 lg:max-w-[1180px] lg:px-6 lg:pt-10 lg:pb-6 xl:max-w-[1400px] 2xl:max-w-[1680px] 2xl:px-8">
            <CreativeWorkGallery
              images={HERO_IMAGES}
              scrollProgress={progress}
              metrics={metrics}
              onImageClick={setActiveImage}
              borderRadius={12}
              className="creative-work-gallery-shell w-full"
            />
          </div>
        </div>
      </div>

      <ImageModal image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  )
}
