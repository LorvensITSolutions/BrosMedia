import { MG_BLUE, MG_LIME } from './tokens'

const iconProps = { viewBox: '0 0 24 24', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

export function PaidMediaIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...iconProps} aria-hidden>
      <rect x="3" y="5" width="14" height="10" rx="1.5" stroke={MG_BLUE} strokeWidth="2" />
      <rect x="5" y="7" width="10" height="6" rx="0.5" stroke={MG_BLUE} strokeWidth="1.2" opacity="0.5" />
      <polygon points="9,9.5 9,12.5 12,11" fill={MG_LIME} />
      <path d="M19 8v4" stroke={MG_LIME} strokeWidth="2" />
      <path d="M17 9.5c1 .5 1 3.5 2 4" stroke={MG_LIME} strokeWidth="1.5" opacity="0.7" />
    </svg>
  )
}

export function BrandStrategyIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...iconProps} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke={MG_BLUE} strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke={MG_LIME} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill={MG_LIME} />
      <line x1="12" y1="4" x2="12" y2="7.5" stroke={MG_BLUE} strokeWidth="1.5" opacity="0.6" />
      <line x1="12" y1="16.5" x2="12" y2="20" stroke={MG_BLUE} strokeWidth="1.5" opacity="0.6" />
      <line x1="4" y1="12" x2="7.5" y2="12" stroke={MG_BLUE} strokeWidth="1.5" opacity="0.6" />
      <line x1="16.5" y1="12" x2="20" y2="12" stroke={MG_BLUE} strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}

export function GrowthFunnelsIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...iconProps} aria-hidden>
      <path d="M4 5h16l-2.5 4H6.5L4 5z" stroke={MG_BLUE} strokeWidth="2" />
      <path d="M6.5 9h11l-2 3.5H8.5L6.5 9z" stroke={MG_BLUE} strokeWidth="1.8" />
      <path d="M8.5 12.5h7l-1.5 2.5h-4L8.5 12.5z" stroke={MG_LIME} strokeWidth="1.8" />
      <path d="M10 17h4" stroke={MG_LIME} strokeWidth="2" />
      <path d="M18 6l2-2" stroke={MG_LIME} strokeWidth="2" />
      <polygon points="20,2 20,6 24,4" fill={MG_LIME} transform="translate(-2,0)" />
    </svg>
  )
}

export function PerformanceIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...iconProps} aria-hidden>
      <line x1="3" y1="20" x2="21" y2="20" stroke={MG_BLUE} strokeWidth="1.5" opacity="0.5" />
      <line x1="3" y1="20" x2="3" y2="4" stroke={MG_BLUE} strokeWidth="1.5" opacity="0.5" />
      <path d="M3 16l5-4 4 2 5-6 4-2" stroke={MG_LIME} strokeWidth="2.2" />
      <circle cx="8" cy="12" r="1.5" fill={MG_LIME} />
      <circle cx="17" cy="8" r="1.5" fill={MG_LIME} />
    </svg>
  )
}

export const SERVICE_ICONS = {
  'Paid Media': PaidMediaIcon,
  'Brand Strategy': BrandStrategyIcon,
  'Growth Funnels': GrowthFunnelsIcon,
  Performance: PerformanceIcon,
}
