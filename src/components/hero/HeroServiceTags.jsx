import { BarChart3, Filter, Megaphone, Target } from 'lucide-react'

const SERVICE_TAGS = [
  { icon: Megaphone, label: 'Paid Media' },
  { icon: Target, label: 'Brand Strategy' },
  { icon: Filter, label: 'Growth Funnels' },
  { icon: BarChart3, label: 'Performance' },
]

export default function HeroServiceTags() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:mt-7 sm:gap-x-6">
      {SERVICE_TAGS.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="hero-service-tag group inline-flex items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-[#8A8D92] sm:text-[0.65rem]"
        >
          <Icon
            className="hero-service-tag-icon h-4 w-4 shrink-0 text-blue brightness-110 transition-[color,filter] duration-300 group-hover:text-accent"
            strokeWidth={2}
            aria-hidden
          />
          {label}
        </span>
      ))}
    </div>
  )
}
