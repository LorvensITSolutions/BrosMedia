/** Shared Framer Motion presets for section scroll reveals */
export const scrollViewport = { once: true, margin: '-70px', amount: 0.25 }

export const scrollSpring = { type: 'spring', stiffness: 70, damping: 20, mass: 0.85 }

export const scrollFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: scrollSpring,
  },
}

export const scrollStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

/** Matches Team section title scale + Helvetica Neue via `.section-heading` */
export const SECTION_HEADING_CLASS =
  'section-heading mt-3 text-[clamp(1.35rem,3.5vw,2.1rem)] font-black uppercase tracking-tight'
