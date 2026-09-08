import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CreativeWorkGallery from '../framer/creative_work_gallery.jsx'

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
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8"
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
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

            <div className="max-h-[min(88svh,820px)] overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:rounded-2xl">
              <img
                src={image.src}
                alt={image.alt || 'Brosmedia creative'}
                className="max-h-[min(78svh,760px)] w-full object-contain"
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

  return (
    <section
      id="work-stream"
      aria-label="Brosmedia creative work stream"
      className="relative z-0 bg-black py-8 max-sm:-mt-6 sm:mt-0 sm:py-12 lg:py-14"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-3 sm:px-6 lg:max-w-[1180px] lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1680px]">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
            Work That Earns Eyes
          </p>
          <p className="section-heading mt-1.5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-[clamp(1.35rem,3.5vw,2.1rem)] font-black uppercase leading-none tracking-tight text-white sm:mt-2 sm:gap-x-3">
            <span>Creative</span>
            <span className="text-accent">Work</span>
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-6 w-full max-w-7xl px-1 sm:mt-8 sm:px-4 lg:max-w-[1180px] lg:px-6 xl:max-w-[1400px] 2xl:max-w-[1680px] 2xl:px-8">
        <CreativeWorkGallery images={HERO_IMAGES} onImageClick={setActiveImage} className="w-full" />
      </div>

      <ImageModal image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  )
}
