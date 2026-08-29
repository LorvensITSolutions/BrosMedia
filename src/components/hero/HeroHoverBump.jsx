import { motion } from 'framer-motion'
import HoverBumpImage from '../../framer/hover_bump_image.jsx'
import { services } from '../../data/services'

const bumpImages = services.slice(0, 3).map((service, index) => ({
  src: service.image,
  alt: service.name,
  floatDelay: index * 0.35,
}))

export default function HeroHoverBump() {
  return (
    <div className="relative mx-auto w-full max-w-4xl px-2 sm:px-4">
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[0.65rem]">
            Performance Marketing Studio
          </span>
        </div>

        <div className="relative w-full text-center">
          <HoverBumpImage
            src={bumpImages[0].src}
            alt={bumpImages[0].alt}
            floatDelay={bumpImages[0].floatDelay}
            className="absolute -bottom-8 right-[4%] z-20 h-[110px] w-[110px] sm:-bottom-10 sm:right-[8%] sm:h-[140px] sm:w-[140px]"
          />
          <HoverBumpImage
            src={bumpImages[1].src}
            alt={bumpImages[1].alt}
            floatDelay={bumpImages[1].floatDelay}
            className="absolute -bottom-12 left-[6%] z-20 h-[100px] w-[100px] sm:-bottom-14 sm:left-[10%] sm:h-[130px] sm:w-[130px]"
          />
          <HoverBumpImage
            src={bumpImages[2].src}
            alt={bumpImages[2].alt}
            floatDelay={bumpImages[2].floatDelay}
            className="absolute -right-2 top-[18%] z-20 hidden h-[100px] w-[100px] sm:block sm:h-[120px] sm:w-[120px] md:-right-6"
          />

          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-accent sm:text-xs">
            brosmedia.in
          </p>
          <p
            className="relative z-10 text-[clamp(3.2rem,13vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px #dfff00',
            }}
          >
            UNSKIPPABLE
          </p>
          <p className="relative z-10 mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:max-w-lg sm:text-base">
            Branding, paid social &amp; brand systems — built to turn attention into revenue.
          </p>
          <motion.span
            aria-hidden
            className="relative z-10 mx-auto mt-4 block h-[3px] rounded-full bg-accent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
