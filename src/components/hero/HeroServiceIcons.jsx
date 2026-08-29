import { HERO_BLUE, HERO_LIME, S } from './heroTokens'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'hero-svc-icon',
  'aria-hidden': true,
}

/** Ad frame corner + play + outgoing signal lines */
export function PaidMediaIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path className="hero-svc-stroke" d="M3 6 L3 14 L11 14" stroke={HERO_BLUE} strokeWidth="2" {...S} />
      <path className="hero-svc-stroke" d="M3 6 L11 6 L11 14" stroke={HERO_BLUE} strokeWidth="2" {...S} />
      <polygon className="hero-svc-accent" points="6.5,8.5 6.5,11.5 9.5,10" fill={HERO_LIME} />
      <path className="hero-svc-stroke" d="M13 8 C16 8 17 10 19 10" stroke={HERO_BLUE} strokeWidth="1.8" {...S} />
      <path className="hero-svc-stroke" d="M13 12 C15.5 12 17 14 20 14" stroke={HERO_BLUE} strokeWidth="1.8" opacity="0.75" {...S} />
      <circle className="hero-svc-accent" cx="21" cy="10" r="1.2" fill={HERO_LIME} />
    </svg>
  )
}

/** Positioning rings + core + offset node */
export function BrandStrategyIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} {...base}>
      <circle className="hero-svc-stroke" cx="12" cy="12" r="9" stroke={HERO_BLUE} strokeWidth="1.9" {...S} />
      <circle className="hero-svc-stroke" cx="12" cy="12" r="5.8" stroke={HERO_BLUE} strokeWidth="1.7" opacity="0.8" {...S} />
      <circle className="hero-svc-stroke" cx="12" cy="12" r="2.8" stroke={HERO_BLUE} strokeWidth="1.5" opacity="0.65" strokeDasharray="2 2" {...S} />
      <circle className="hero-svc-accent" cx="12" cy="12" r="1.4" fill={HERO_LIME} />
      <circle className="hero-svc-stroke" cx="17.5" cy="8.5" r="1.8" stroke={HERO_BLUE} strokeWidth="1.6" {...S} />
      <line className="hero-svc-stroke" x1="12" y1="12" x2="16.2" y2="9.2" stroke={HERO_BLUE} strokeWidth="1.4" opacity="0.6" {...S} />
    </svg>
  )
}

/** 3-stage funnel + upward conversion arrow */
export function GrowthFunnelIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} {...base}>
      <path className="hero-svc-stroke" d="M4 4 H20 L17 8 H7 Z" stroke={HERO_BLUE} strokeWidth="1.9" {...S} />
      <path className="hero-svc-stroke" d="M7 8 H17 L14.5 12 H9.5 Z" stroke={HERO_BLUE} strokeWidth="1.8" {...S} />
      <path className="hero-svc-stroke" d="M9.5 12 H14.5 L12.5 16 H11.5 Z" stroke={HERO_BLUE} strokeWidth="1.7" {...S} />
      <path className="hero-svc-accent" d="M18 6 L21 3 M21 3 L21 7 M21 3 L17 3" stroke={HERO_LIME} strokeWidth="1.8" {...S} />
      <circle className="hero-svc-accent" cx="21" cy="3" r="1" fill={HERO_LIME} />
    </svg>
  )
}

/** Analytics trajectory with data points + lime endpoint */
export function PerformanceIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} {...base}>
      <line className="hero-svc-stroke" x1="3" y1="20" x2="21" y2="20" stroke={HERO_BLUE} strokeWidth="1.5" opacity="0.45" {...S} />
      <path
        className="hero-svc-stroke"
        d="M3 17 L7 14 L11 15.5 L15 10 L19 8"
        stroke={HERO_BLUE}
        strokeWidth="2"
        {...S}
      />
      <circle className="hero-svc-stroke" cx="7" cy="14" r="1.3" fill={HERO_BLUE} />
      <circle className="hero-svc-stroke" cx="11" cy="15.5" r="1.3" fill={HERO_BLUE} />
      <circle className="hero-svc-stroke" cx="15" cy="10" r="1.3" fill={HERO_BLUE} />
      <circle className="hero-svc-accent" cx="19" cy="8" r="1.6" fill={HERO_LIME} />
      <path className="hero-svc-accent" d="M17 5 L19 8 L21 6" stroke={HERO_LIME} strokeWidth="1.5" opacity="0.8" {...S} />
    </svg>
  )
}

export const HERO_SERVICE_ICONS = {
  'Paid Media': PaidMediaIcon,
  'Brand Strategy': BrandStrategyIcon,
  'Growth Funnels': GrowthFunnelIcon,
  Performance: PerformanceIcon,
}
