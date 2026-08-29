import MarketingGraphic from './MarketingGraphic'

const SECTION_CONFIG = {
  hero: {
    mask: true,
    breakpoint: 'md',
    items: [
      { name: 'audienceRadar', position: 'left-top', size: 460, opacity: 0.38, glow: 'mixed', animate: 'float' },
      { name: 'cinematicAd', position: 'right-top', size: 440, opacity: 0.35, glow: 'mixed', animate: 'float' },
    ],
  },
  workStream: {
    breakpoint: 'md',
    items: [
      { name: 'attentionRadar', position: 'left-mid', size: 360, opacity: 0.32, glow: 'blue', animate: 'float' },
      { name: 'socialEngagement', position: 'right-mid', size: 320, opacity: 0.3, glow: 'mixed', animate: 'float' },
      { name: 'contentDistribution', position: 'right-bottom', size: 260, opacity: 0.24, glow: 'blue', animate: 'none', className: 'hidden xl:block' },
      { name: 'technicalGrid', position: 'left-bottom', size: 180, opacity: 0.14, glow: 'none', animate: 'none', className: 'hidden lg:block' },
    ],
  },
  stats: {
    items: [
      { name: 'performanceDashboard', position: 'left-mid', size: 380, opacity: 0.3, glow: 'mixed', animate: 'float' },
      { name: 'dataNodes', position: 'right-top', size: 280, opacity: 0.2, glow: 'blue', animate: 'pulse' },
    ],
  },
  about: {
    items: [
      { name: 'brandPositioning', position: 'right-mid', size: 400, opacity: 0.32, glow: 'mixed', animate: 'float' },
      { name: 'technicalGrid', position: 'left-top', size: 160, opacity: 0.14, glow: 'none', animate: 'none', className: 'hidden lg:block' },
    ],
  },
  services: {
    items: [
      { name: 'campaignDashboard', position: 'left-mid', size: 400, opacity: 0.3, glow: 'blue', animate: 'float' },
      { name: 'growthFunnel', position: 'right-mid', size: 380, opacity: 0.32, glow: 'mixed', animate: 'float' },
    ],
  },
  industries: {
    items: [
      { name: 'attentionRadar', position: 'left-top', size: 240, opacity: 0.18, glow: 'blue', animate: 'none', className: 'hidden md:block' },
      { name: 'dataNodes', position: 'right-bottom', size: 200, opacity: 0.14, glow: 'none', animate: 'none', className: 'hidden lg:block' },
    ],
  },
  clients: {
    items: [
      { name: 'socialCreative', position: 'right-mid', size: 340, opacity: 0.3, glow: 'mixed', animate: 'float' },
      { name: 'contentDistribution', position: 'left-bottom', size: 240, opacity: 0.2, glow: 'blue', animate: 'none', className: 'hidden xl:block' },
    ],
  },
  testimonials: {
    items: [
      { name: 'socialEngagement', position: 'left-mid', size: 280, opacity: 0.22, glow: 'blue', animate: 'pulse', className: 'hidden lg:block' },
      { name: 'performanceDashboard', position: 'right-bottom', size: 300, opacity: 0.2, glow: 'mixed', animate: 'none', className: 'hidden xl:block' },
    ],
  },
  faq: {
    items: [
      { name: 'conversionRoi', position: 'right-mid', size: 320, opacity: 0.28, glow: 'mixed', animate: 'float' },
      { name: 'technicalGrid', position: 'left-top', size: 150, opacity: 0.12, glow: 'none', animate: 'none', className: 'hidden lg:block' },
    ],
  },
  contact: {
    theme: 'light',
    items: [
      { name: 'ctaRings', position: 'right-top', size: 320, opacity: 0.22, glow: 'mixed', animate: 'pulse', theme: 'light' },
      { name: 'technicalGrid', position: 'left-bottom', size: 140, opacity: 0.1, glow: 'none', animate: 'none', theme: 'light', className: 'hidden lg:block' },
    ],
  },
}

export default function SectionDecor({ variant, className = '' }) {
  const config = SECTION_CONFIG[variant]
  if (!config) return null

  const bp = config.breakpoint ?? 'lg'
  const bpClass = bp === 'md' ? 'hidden md:block' : 'hidden lg:block'

  return (
    <div
      aria-hidden
      className={`mg-section-decor pointer-events-none absolute inset-0 overflow-hidden ${config.mask ? 'hero-mg-decor' : ''} ${className}`}
    >
      <div className={bpClass}>
        {config.items.map((item) => (
          <MarketingGraphic
            key={`${variant}-${item.name}-${item.position}`}
            name={item.name}
            position={item.position}
            size={item.size}
            opacity={item.opacity}
            glow={item.glow}
            animate={item.animate}
            theme={item.theme ?? config.theme ?? 'dark'}
            className={item.className ?? ''}
          />
        ))}
      </div>
    </div>
  )
}

export { SECTION_CONFIG }
