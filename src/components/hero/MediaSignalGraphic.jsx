import { motion, useReducedMotion } from 'framer-motion'
import { HERO_BLUE, HERO_LIME, HERO_MUTED, S } from './heroTokens'

export default function MediaSignalGraphic() {
  const reduceMotion = useReducedMotion()

  return (
    <svg viewBox="0 0 420 420" className="h-full w-full" aria-hidden>
      {/* Angular partial frame — open cinematic corners, not a rectangle */}
      <path d="M108 88 L108 168 M108 88 L188 88" stroke={HERO_BLUE} strokeWidth="2.5" opacity="0.8" {...S} />
      <path d="M312 88 L312 168 M312 88 L232 88" stroke={HERO_BLUE} strokeWidth="2.5" opacity="0.8" {...S} />
      <path d="M108 252 L108 332 M108 332 L188 332" stroke={HERO_BLUE} strokeWidth="2" opacity="0.65" {...S} />
      <path d="M312 252 L312 332 M312 332 L232 332" stroke={HERO_BLUE} strokeWidth="2" opacity="0.65" {...S} />

      {/* Inner angular guide */}
      <path d="M128 108 L292 108 L292 268 L128 268 Z" stroke={HERO_BLUE} strokeWidth="1.5" opacity="0.35" strokeDasharray="5 6" {...S} />

      {/* Play indicator */}
      <circle cx="210" cy="188" r="28" stroke={HERO_BLUE} strokeWidth="2" opacity="0.55" {...S} />
      <motion.polygon
        points="202,176 202,200 224,188"
        fill={HERO_LIME}
        animate={reduceMotion ? {} : { opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Signal waves — right side transmission */}
      <motion.path
        d="M318 188 Q348 188 348 158 Q348 128 378 128"
        stroke={HERO_BLUE}
        strokeWidth="2"
        opacity="0.7"
        animate={reduceMotion ? {} : { pathLength: [0.6, 1, 0.6], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        {...S}
      />
      <motion.path
        d="M318 208 Q360 208 360 178 Q360 148 395 148"
        stroke={HERO_BLUE}
        strokeWidth="1.8"
        opacity="0.55"
        animate={reduceMotion ? {} : { pathLength: [0.5, 0.95, 0.5] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        {...S}
      />
      <motion.path
        d="M318 228 Q352 228 352 248 Q352 268 382 268"
        stroke={HERO_LIME}
        strokeWidth="1.8"
        opacity="0.65"
        animate={reduceMotion ? {} : { opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        {...S}
      />

      {/* Distribution nodes */}
      <circle cx="348" cy="128" r="4" fill={HERO_BLUE} />
      <circle cx="378" cy="148" r="3.5" fill={HERO_BLUE} opacity="0.75" />
      <circle cx="382" cy="268" r="4" fill={HERO_LIME} opacity="0.85" />
      <line x1="348" y1="128" x2="378" y2="148" stroke={HERO_BLUE} strokeWidth="1.2" opacity="0.5" {...S} />
      <line x1="352" y1="248" x2="382" y2="268" stroke={HERO_LIME} strokeWidth="1.2" opacity="0.55" {...S} />

      {/* Targeting point — upper left of frame */}
      <circle cx="148" cy="148" r="18" stroke={HERO_BLUE} strokeWidth="1.8" opacity="0.6" {...S} />
      <line x1="148" y1="130" x2="148" y2="138" stroke={HERO_LIME} strokeWidth="1.5" {...S} />
      <line x1="148" y1="158" x2="148" y2="166" stroke={HERO_LIME} strokeWidth="1.5" {...S} />
      <line x1="130" y1="148" x2="138" y2="148" stroke={HERO_LIME} strokeWidth="1.5" {...S} />
      <line x1="158" y1="148" x2="166" y2="148" stroke={HERO_LIME} strokeWidth="1.5" {...S} />
      <circle cx="148" cy="148" r="3" fill={HERO_LIME} />

      {/* Lime progress arc */}
      <path
        d="M210 88 A122 122 0 0 1 332 210"
        stroke={HERO_LIME}
        strokeWidth="2.2"
        opacity="0.7"
        strokeDasharray="80 200"
        {...S}
      />

      {/* Motion lines */}
      <motion.line
        x1="88"
        y1="210"
        x2="108"
        y2="210"
        stroke={HERO_BLUE}
        strokeWidth="1.5"
        opacity="0.5"
        animate={reduceMotion ? {} : { x1: [88, 92, 88], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        {...S}
      />
      <line x1="72" y1="198" x2="96" y2="198" stroke={HERO_MUTED} strokeWidth="1" opacity="0.35" {...S} />
      <line x1="72" y1="222" x2="90" y2="222" stroke={HERO_MUTED} strokeWidth="1" opacity="0.3" {...S} />

      {/* Micro label */}
      <text x="338" y="98" fill={HERO_LIME} fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="600" opacity="0.85">
        2.8x
      </text>
      <text x="56" y="348" fill={HERO_MUTED} fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="0.1em" opacity="0.65">
        CTR
      </text>
    </svg>
  )
}
