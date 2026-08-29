import { MG_BLUE, MG_BLUE_DEEP, MG_LIME, MG_MUTED, MG_WHITE } from './tokens'

const S = { strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }

function AudienceRadarGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <circle cx="200" cy="200" r="160" stroke={blue} strokeWidth="2.5" opacity="0.7" {...S} />
      <circle cx="200" cy="200" r="120" stroke={blue} strokeWidth="2.5" opacity="0.85" {...S} />
      <circle cx="200" cy="200" r="80" stroke={blue} strokeWidth="2.5" opacity="0.95" {...S} />
      <circle cx="200" cy="200" r="40" stroke={lime} strokeWidth="3" {...S} />
      <line x1="200" y1="40" x2="200" y2="360" stroke={blue} strokeWidth="1.5" opacity="0.4" {...S} />
      <line x1="40" y1="200" x2="360" y2="200" stroke={blue} strokeWidth="1.5" opacity="0.4" {...S} />
      <line x1="200" y1="200" x2="310" y2="130" stroke={lime} strokeWidth="2.5" {...S} />
      <circle cx="310" cy="130" r="6" fill={lime} />
      <circle cx="248" cy="168" r="4" fill={blue} />
      <circle cx="175" cy="142" r="3" fill={blue} opacity="0.7" />
      <circle cx="200" cy="200" r="5" fill={lime} />
      <path d="M200 200 L200 120 A80 80 0 0 1 276 160 Z" fill={lime} opacity="0.15" stroke={lime} strokeWidth="2" />
      <text x="318" y="118" fill={lime} fontSize="14" fontFamily="monospace" fontWeight="600">87%</text>
      <text x="52" y="388" fill={muted} fontSize="11" fontFamily="monospace" opacity="0.8">AUDIENCE</text>
      <line x1="60" y1="340" x2="100" y2="340" stroke={muted} strokeWidth="1.5" opacity="0.5" {...S} />
      <line x1="60" y1="350" x2="90" y2="350" stroke={muted} strokeWidth="1" opacity="0.4" {...S} />
    </svg>
  )
}

function CinematicAdGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <rect x="80" y="90" width="240" height="160" rx="8" stroke={blue} strokeWidth="2.5" {...S} />
      <rect x="88" y="98" width="224" height="144" rx="4" stroke={blue} strokeWidth="2" opacity="0.65" {...S} />
      <polygon points="185,155 185,185 215,170" fill={lime} />
      <circle cx="185" cy="155" r="22" stroke={lime} strokeWidth="2.5" {...S} />
      <path d="M60 270 Q100 250 140 270 T220 270 T300 270" stroke={blue} strokeWidth="2.5" opacity="0.85" {...S} />
      <path d="M60 290 Q100 270 140 290 T220 290 T300 290" stroke={lime} strokeWidth="2" opacity="0.75" {...S} />
      <circle cx="320" cy="120" r="28" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="320" cy="120" r="14" stroke={lime} strokeWidth="2" {...S} />
      <circle cx="320" cy="120" r="4" fill={lime} />
      <line x1="348" y1="120" x2="380" y2="120" stroke={lime} strokeWidth="2" {...S} />
      <line x1="320" y1="92" x2="320" y2="60" stroke={blue} strokeWidth="1.5" opacity="0.5" {...S} />
      <text x="86" y="82" fill={muted} fontSize="10" fontFamily="monospace" opacity="0.7">AD FRAME</text>
      <path d="M100 310 L120 290 L140 310" stroke={lime} strokeWidth="2" {...S} />
      <line x1="120" y1="310" x2="120" y2="330" stroke={lime} strokeWidth="2" {...S} />
    </svg>
  )
}

function AttentionRadarGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
      <circle cx="160" cy="160" r="130" stroke={blue} strokeWidth="2.5" opacity="0.65" {...S} />
      <circle cx="160" cy="160" r="90" stroke={blue} strokeWidth="2.5" opacity="0.85" {...S} />
      <circle cx="160" cy="160" r="50" stroke={lime} strokeWidth="3" {...S} />
      <path d="M160 30 L160 290 M30 160 L290 160" stroke={blue} strokeWidth="1.5" opacity="0.35" {...S} />
      <path d="M160 160 L250 90" stroke={lime} strokeWidth="2.5" {...S} />
      <circle cx="250" cy="90" r="5" fill={lime} />
      <circle cx="200" cy="120" r="3" fill={blue} />
      <circle cx="140" cy="100" r="3" fill={blue} opacity="0.6" />
      <text x="230" y="82" fill={lime} fontSize="12" fontFamily="monospace">REACH</text>
      <path d="M40 260 Q80 240 120 255 T200 248" stroke={blue} strokeWidth="2" opacity="0.5" {...S} />
    </svg>
  )
}

function SocialEngagementGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
      <circle cx="160" cy="100" r="24" stroke={blue} strokeWidth="2.5" {...S} />
      <circle cx="80" cy="200" r="20" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="240" cy="200" r="20" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="120" cy="270" r="16" stroke={lime} strokeWidth="2" {...S} />
      <circle cx="200" cy="270" r="16" stroke={lime} strokeWidth="2" {...S} />
      <line x1="160" y1="124" x2="80" y2="180" stroke={blue} strokeWidth="2.5" opacity="0.9" {...S} />
      <line x1="160" y1="124" x2="240" y2="180" stroke={blue} strokeWidth="2.5" opacity="0.9" {...S} />
      <line x1="80" y1="220" x2="120" y2="254" stroke={lime} strokeWidth="2" {...S} />
      <line x1="240" y1="220" x2="200" y2="254" stroke={lime} strokeWidth="2" {...S} />
      <circle cx="160" cy="100" r="6" fill={lime} />
      <circle cx="80" cy="200" r="4" fill={blue} />
      <circle cx="240" cy="200" r="4" fill={blue} />
    </svg>
  )
}

function ContentDistributionGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  return (
    <svg viewBox="0 0 280 280" className="h-full w-full" aria-hidden>
      <rect x="110" y="40" width="60" height="80" rx="4" stroke={blue} strokeWidth="2.5" {...S} />
      <line x1="140" y1="120" x2="60" y2="180" stroke={blue} strokeWidth="2" {...S} />
      <line x1="140" y1="120" x2="140" y2="200" stroke={blue} strokeWidth="2" {...S} />
      <line x1="140" y1="120" x2="220" y2="180" stroke={blue} strokeWidth="2" {...S} />
      <rect x="30" y="180" width="60" height="40" rx="3" stroke={lime} strokeWidth="2" {...S} />
      <rect x="110" y="200" width="60" height="40" rx="3" stroke={lime} strokeWidth="2" {...S} />
      <rect x="190" y="180" width="60" height="40" rx="3" stroke={lime} strokeWidth="2" {...S} />
      <circle cx="140" cy="70" r="4" fill={lime} />
    </svg>
  )
}

function CampaignDashboardGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  const steps = [
    { y: 50, label: 'CAMPAIGN' },
    { y: 110, label: 'AUDIENCE' },
    { y: 170, label: 'IMPRESSIONS' },
    { y: 230, label: 'CLICKS' },
    { y: 290, label: 'CONVERSIONS' },
  ]
  return (
    <svg viewBox="0 0 360 360" className="h-full w-full" aria-hidden>
      <rect x="40" y="30" width="120" height="70" rx="6" stroke={blue} strokeWidth="2.5" {...S} />
      <line x1="100" y1="100" x2="100" y2="120" stroke={lime} strokeWidth="2" {...S} />
      <polygon points="95,120 100,130 105,120" fill={lime} />
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x="60" y={s.y} width="200" height="44" rx="4" stroke={blue} strokeWidth={i === 4 ? 2.5 : 2} opacity={0.75 + i * 0.05} {...S} />
          <text x="72" y={s.y + 28} fill={i === 4 ? lime : muted} fontSize="11" fontFamily="monospace" fontWeight={i === 4 ? '700' : '400'}>
            {s.label}
          </text>
          {i < 4 && (
            <>
              <line x1="160" y1={s.y + 44} x2="160" y2={s.y + 66} stroke={lime} strokeWidth="1.5" opacity="0.7" {...S} />
              <polygon points={`155,${s.y + 66} 160,${s.y + 74} 165,${s.y + 66}`} fill={lime} opacity="0.7" />
            </>
          )}
        </g>
      ))}
      <circle cx="290" cy="80" r="30" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="290" cy="80" r="12" stroke={lime} strokeWidth="2" {...S} />
      <path d="M270 300 L290 270 L310 285 L330 250" stroke={lime} strokeWidth="2.5" {...S} />
      <circle cx="330" cy="250" r="4" fill={lime} />
    </svg>
  )
}

function BrandPositioningGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  return (
    <svg viewBox="0 0 380 380" className="h-full w-full" aria-hidden>
      <circle cx="190" cy="190" r="70" stroke={blue} strokeWidth="2.5" {...S} />
      <circle cx="190" cy="190" r="45" stroke={lime} strokeWidth="2.5" {...S} />
      <circle cx="190" cy="190" r="8" fill={lime} />
      <circle cx="190" cy="60" r="22" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="60" cy="190" r="22" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="320" cy="190" r="22" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="190" cy="320" r="22" stroke={blue} strokeWidth="2" {...S} />
      <line x1="190" y1="82" x2="190" y2="122" stroke={blue} strokeWidth="2" {...S} />
      <line x1="82" y1="190" x2="122" y2="190" stroke={blue} strokeWidth="2" {...S} />
      <line x1="258" y1="190" x2="298" y2="190" stroke={blue} strokeWidth="2" {...S} />
      <line x1="190" y1="258" x2="190" y2="298" stroke={blue} strokeWidth="2" {...S} />
      <text x="168" y="44" fill={lime} fontSize="10" fontFamily="monospace" fontWeight="600">AUDIENCE</text>
      <text x="28" y="194" fill={muted} fontSize="10" fontFamily="monospace">BRAND</text>
      <text x="300" y="194" fill={muted} fontSize="10" fontFamily="monospace">MESSAGE</text>
      <text x="155" y="350" fill={muted} fontSize="10" fontFamily="monospace">POSITION</text>
      <text x="168" y="196" fill={lime} fontSize="9" fontFamily="monospace" opacity="0.8">CORE</text>
    </svg>
  )
}

function GrowthFunnelGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  const stages = [
    { y: 30, w: 280, label: 'AWARENESS', pct: '100%' },
    { y: 80, w: 230, label: 'INTEREST', pct: '72%' },
    { y: 130, w: 180, label: 'CONSIDERATION', pct: '48%' },
    { y: 180, w: 130, label: 'CONVERSION', pct: '24%' },
    { y: 230, w: 80, label: 'RETENTION', pct: '12%' },
  ]
  return (
    <svg viewBox="0 0 340 340" className="h-full w-full" aria-hidden>
      {stages.map((s, i) => {
        const x = (340 - s.w) / 2
        return (
          <g key={s.label}>
            <path
              d={`M${x} ${s.y} L${x + s.w} ${s.y} L${x + s.w - 20} ${s.y + 40} L${x + 20} ${s.y + 40} Z`}
              stroke={i === stages.length - 1 ? lime : blue}
              strokeWidth={i === 0 ? 2.5 : 2}
              fill={i === stages.length - 1 ? lime : blue}
              fillOpacity={0.12}
              {...S}
            />
            <text x={x + 16} y={s.y + 26} fill={i >= 3 ? lime : MG_WHITE} fontSize="10" fontFamily="monospace" opacity="0.9">
              {s.label}
            </text>
            <text x={x + s.w - 40} y={s.y + 26} fill={muted} fontSize="10" fontFamily="monospace">
              {s.pct}
            </text>
          </g>
        )
      })}
      <path d="M300 60 L300 280" stroke={lime} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" {...S} />
      <polygon points="295,100 300,90 305,100" fill={lime} opacity="0.7" />
      <polygon points="295,200 300,210 305,200" fill={blue} opacity="0.7" />
    </svg>
  )
}

function PerformanceDashboardGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  return (
    <svg viewBox="0 0 360 360" className="h-full w-full" aria-hidden>
      <line x1="50" y1="280" x2="310" y2="280" stroke={blue} strokeWidth="2" opacity="0.6" {...S} />
      <line x1="50" y1="280" x2="50" y2="60" stroke={blue} strokeWidth="2" opacity="0.6" {...S} />
      <path d="M50 260 L90 220 L130 240 L170 180 L210 160 L250 120 L290 80 L310 60" stroke={lime} strokeWidth="2.5" {...S} />
      <circle cx="90" cy="220" r="4" fill={lime} />
      <circle cx="170" cy="180" r="4" fill={lime} />
      <circle cx="250" cy="120" r="4" fill={lime} />
      <circle cx="310" cy="60" r="5" fill={lime} />
      <rect x="70" y="200" width="24" height="80" fill={blue} opacity="0.15" stroke={blue} strokeWidth="1.5" {...S} />
      <rect x="110" y="170" width="24" height="110" fill={blue} opacity="0.2" stroke={blue} strokeWidth="1.5" {...S} />
      <rect x="150" y="140" width="24" height="140" fill={blue} opacity="0.25" stroke={blue} strokeWidth="1.5" {...S} />
      <rect x="190" y="110" width="24" height="170" fill={lime} opacity="0.12" stroke={lime} strokeWidth="1.5" {...S} />
      <circle cx="300" cy="50" r="28" stroke={blue} strokeWidth="2" {...S} />
      <text x="288" y="55" fill={lime} fontSize="12" fontFamily="monospace" fontWeight="700">ROI</text>
      <text x="52" y="300" fill={muted} fontSize="10" fontFamily="monospace">PERFORMANCE</text>
      <text x="280" y="300" fill={lime} fontSize="11" fontFamily="monospace">+142%</text>
    </svg>
  )
}

function SocialCreativeGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
      <rect x="120" y="40" width="80" height="140" rx="8" stroke={blue} strokeWidth="2.5" {...S} />
      <rect x="128" y="48" width="64" height="100" rx="4" stroke={blue} strokeWidth="2" opacity="0.65" {...S} />
      <polygon points="148,90 148,110 168,100" fill={lime} />
      <circle cx="160" cy="90" r="16" stroke={lime} strokeWidth="2.5" {...S} />
      <circle cx="60" cy="200" r="14" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="260" cy="200" r="14" stroke={blue} strokeWidth="2" {...S} />
      <circle cx="100" cy="270" r="10" stroke={lime} strokeWidth="1.5" {...S} />
      <circle cx="220" cy="270" r="10" stroke={lime} strokeWidth="1.5" {...S} />
      <path d="M160 180 Q100 200 60 186" stroke={blue} strokeWidth="2.5" opacity="0.8" {...S} />
      <path d="M160 180 Q220 200 260 186" stroke={blue} strokeWidth="2.5" opacity="0.8" {...S} />
      <path d="M100 214 Q130 250 100 270" stroke={lime} strokeWidth="2" {...S} />
      <path d="M220 214 Q190 250 220 270" stroke={lime} strokeWidth="2" {...S} />
    </svg>
  )
}

function ConversionRoiGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const muted = theme === 'light' ? '#B0B4BC' : MG_MUTED
  const steps = ['ATTENTION', 'CLICK', 'ACTION', 'CUSTOMER', 'REVENUE']
  return (
    <svg viewBox="0 0 300 360" className="h-full w-full" aria-hidden>
      {steps.map((label, i) => {
        const y = 40 + i * 58
        return (
          <g key={label}>
            <rect x="70" y={y} width="160" height="36" rx="4" stroke={i === steps.length - 1 ? lime : blue} strokeWidth={i === steps.length - 1 ? 2.5 : 2} {...S} />
            <text x="82" y={y + 23} fill={i === steps.length - 1 ? lime : MG_WHITE} fontSize="10" fontFamily="monospace" opacity="0.9">
              {label}
            </text>
            {i < steps.length - 1 && (
              <>
                <line x1="150" y1={y + 36} x2="150" y2={y + 52} stroke={lime} strokeWidth="2" {...S} />
                <polygon points={`145,${y + 52} 150,${y + 60} 155,${y + 52}`} fill={lime} />
              </>
            )}
          </g>
        )
      })}
      <path d="M240 80 L270 50 L270 310 L240 280" stroke={lime} strokeWidth="2.5" opacity="0.85" {...S} />
      <polygon points="270,50 280,55 270,60" fill={lime} />
      <text x="230" y="200" fill={muted} fontSize="9" fontFamily="monospace" transform="rotate(90 230 200)">GROWTH</text>
    </svg>
  )
}

function CtaRingsGraphic({ theme = 'light' }) {
  const blue = theme === 'light' ? MG_BLUE_DEEP : MG_BLUE
  const lime = MG_LIME
  return (
    <svg viewBox="0 0 280 280" className="h-full w-full" aria-hidden>
      <circle cx="140" cy="140" r="110" stroke={blue} strokeWidth="2.5" opacity="0.5" {...S} />
      <circle cx="140" cy="140" r="80" stroke={blue} strokeWidth="2.5" opacity="0.7" {...S} />
      <circle cx="140" cy="140" r="50" stroke={lime} strokeWidth="3" {...S} />
      <circle cx="140" cy="140" r="8" fill={lime} />
      <line x1="140" y1="30" x2="140" y2="90" stroke={blue} strokeWidth="1.5" opacity="0.3" {...S} />
      <line x1="140" y1="190" x2="140" y2="250" stroke={blue} strokeWidth="1.5" opacity="0.3" {...S} />
      <path d="M200 200 L230 230" stroke={lime} strokeWidth="2.5" {...S} />
      <polygon points="230,230 222,228 228,222" fill={lime} />
      <line x1="40" y1="60" x2="80" y2="60" stroke={blue} strokeWidth="1" opacity="0.2" {...S} />
      <line x1="40" y1="70" x2="70" y2="70" stroke={blue} strokeWidth="1" opacity="0.15" {...S} />
      <line x1="40" y1="80" x2="75" y2="80" stroke={blue} strokeWidth="1" opacity="0.1" {...S} />
    </svg>
  )
}

function DataNodesGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  const lime = MG_LIME
  const nodes = [
    [60, 80], [140, 60], [220, 90], [100, 160], [180, 150], [240, 200], [80, 220], [160, 240],
  ]
  return (
    <svg viewBox="0 0 280 280" className="h-full w-full" aria-hidden>
      <line x1="60" y1="80" x2="140" y2="60" stroke={blue} strokeWidth="2" opacity="0.7" {...S} />
      <line x1="140" y1="60" x2="220" y2="90" stroke={blue} strokeWidth="2" opacity="0.7" {...S} />
      <line x1="100" y1="160" x2="180" y2="150" stroke={blue} strokeWidth="2" opacity="0.7" {...S} />
      <line x1="180" y1="150" x2="240" y2="200" stroke={blue} strokeWidth="2" opacity="0.7" {...S} />
      <line x1="80" y1="220" x2="160" y2="240" stroke={lime} strokeWidth="2" opacity="0.85" {...S} />
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 5 : 3} fill={i % 3 === 0 ? lime : blue} opacity={0.7 + (i % 3) * 0.1} />
      ))}
    </svg>
  )
}

function TechnicalGridGraphic({ theme = 'dark' }) {
  const blue = MG_BLUE
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 25} x2="200" y2={i * 25} stroke={blue} strokeWidth="0.75" opacity="0.25" {...S} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="200" stroke={blue} strokeWidth="0.75" opacity="0.25" {...S} />
      ))}
      <circle cx="100" cy="100" r="30" stroke={blue} strokeWidth="2" opacity="0.5" {...S} />
    </svg>
  )
}

export const GRAPHICS = {
  audienceRadar: AudienceRadarGraphic,
  cinematicAd: CinematicAdGraphic,
  attentionRadar: AttentionRadarGraphic,
  socialEngagement: SocialEngagementGraphic,
  contentDistribution: ContentDistributionGraphic,
  campaignDashboard: CampaignDashboardGraphic,
  brandPositioning: BrandPositioningGraphic,
  growthFunnel: GrowthFunnelGraphic,
  performanceDashboard: PerformanceDashboardGraphic,
  socialCreative: SocialCreativeGraphic,
  conversionRoi: ConversionRoiGraphic,
  ctaRings: CtaRingsGraphic,
  dataNodes: DataNodesGraphic,
  technicalGrid: TechnicalGridGraphic,
}
