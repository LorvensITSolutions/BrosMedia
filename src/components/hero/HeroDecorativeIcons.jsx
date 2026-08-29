import { BarChart3, Camera, Filter, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const DECORATIVE_ICONS = [
  {
    id: 'target-ul',
    icon: Target,
    className: 'hero-decor-icon -left-[6%] top-[10%] text-blue',
    size: 260,
    delay: 0,
    duration: 14,
  },
  {
    id: 'camera-ur',
    icon: Camera,
    className: 'hero-decor-icon -right-[8%] top-[6%] text-accent',
    size: 300,
    delay: 1.2,
    duration: 16,
  },
  {
    id: 'chart-ml',
    icon: BarChart3,
    className: 'hero-decor-icon -left-[10%] top-[42%] text-blue',
    size: 280,
    delay: 0.6,
    duration: 18,
  },
  {
    id: 'funnel-mr',
    icon: Filter,
    className: 'hero-decor-icon -right-[5%] top-[38%] text-accent',
    size: 240,
    delay: 2,
    duration: 15,
  },
  {
    id: 'target-lr',
    icon: Target,
    className: 'hero-decor-icon -right-[12%] bottom-[14%] text-blue',
    size: 220,
    delay: 1.8,
    duration: 17,
  },
]

export default function HeroDecorativeIcons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block">
      {DECORATIVE_ICONS.map(({ id, icon: Icon, className, size, delay, duration }) => (
        <motion.div
          key={id}
          className={`absolute ${className}`}
          initial={{ opacity: 0.16 }}
          animate={{
            opacity: [0.14, 0.22, 0.14],
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration, repeat: Infinity, ease: 'easeInOut', delay },
            y: { duration: duration * 1.1, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <Icon size={size} strokeWidth={1.15} />
        </motion.div>
      ))}
    </div>
  )
}
