import { motion, useReducedMotion } from 'framer-motion'
import { GRAPHICS } from './graphics'

const POSITION_CLASS = {
  'left-top': '-left-[6%] top-[4%] md:-left-[4%]',
  'right-top': '-right-[6%] top-[2%] md:-right-[4%]',
  'left-mid': '-left-[8%] top-[28%] md:-left-[5%]',
  'right-mid': '-right-[8%] top-[26%] md:-right-[5%]',
  'left-bottom': '-left-[5%] bottom-[6%]',
  'right-bottom': '-right-[5%] bottom-[6%]',
}

const GLOW_CLASS = {
  blue: 'mg-glow-blue',
  lime: 'mg-glow-lime',
  mixed: 'mg-glow-mixed',
  none: '',
}

export default function MarketingGraphic({
  name,
  size = 280,
  opacity = 0.25,
  glow = 'mixed',
  position = 'left-mid',
  animate = 'float',
  className = '',
  theme = 'dark',
}) {
  const reduceMotion = useReducedMotion()
  const Graphic = GRAPHICS[name]
  if (!Graphic) return null

  const motionProps =
    reduceMotion || animate === 'none'
      ? {}
      : animate === 'pulse'
        ? {
            animate: { scale: [1, 1.02, 1] },
            transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }
        : {
            animate: { y: [0, -12, 0] },
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }

  return (
    <motion.div
      aria-hidden
      className={`absolute ${POSITION_CLASS[position] ?? position} ${GLOW_CLASS[glow]} ${className}`}
      style={{ width: size, height: size, opacity }}
      {...motionProps}
    >
      <Graphic theme={theme} />
    </motion.div>
  )
}
