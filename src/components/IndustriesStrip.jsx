import LetterSwap from '../framer/letter_swap.jsx'
import { industriesStrip, industriesStripIntro } from '../data/industriesStrip'

function Divider() {
  return (
    <span className="mx-4 shrink-0 text-white/20 sm:mx-5" aria-hidden="true">
      |
    </span>
  )
}

function IndustryItem({ industry, className = '' }) {
  return (
    <LetterSwap
      text={industry}
      className={`font-medium ${className}`}
      color="rgba(255,255,255,0.75)"
      hoverColor="#dfff00"
      variant="pingPong"
      direction="up"
      staggerFrom="first"
      staggerDuration={22}
    />
  )
}

export default function IndustriesStrip() {
  const marqueeItems = [...industriesStrip, ...industriesStrip]

  return (
    <section
      id="industries-strip"
      className="relative bg-black font-sans"
      aria-label="Industries we serve"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="flex justify-center px-2">
          <LetterSwap
            text={industriesStripIntro.label.toUpperCase()}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]"
            color="rgba(223,255,0,0.85)"
            hoverColor="#dfff00"
            variant="pingPong"
            direction="up"
            staggerFrom="center"
            staggerDuration={22}
          />
        </div>

        {/* Mobile: wrapped grid */}
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:hidden">
          {industriesStrip.map((industry) => (
            <li
              key={industry}
              className={`flex min-h-[2.75rem] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center ${
                industry.length > 16 ? 'col-span-2' : ''
              }`}
            >
              <IndustryItem industry={industry} className="text-[0.68rem] leading-snug" />
            </li>
          ))}
        </ul>
      </div>

      {/* Tablet / desktop: infinite marquee — full width, no clipping */}
      <div className="relative mt-1 hidden overflow-hidden pb-2 sm:block sm:pb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent sm:w-16" />

        <ul
          className="animate-hero-marquee flex w-max items-center"
          aria-label="Industries marquee"
        >
          {marqueeItems.map((industry, index) => (
            <li key={`${industry}-${index}`} className="flex shrink-0 items-center">
              {index > 0 && <Divider />}
              <IndustryItem industry={industry} className="whitespace-nowrap text-sm lg:text-base" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
