import { motion } from 'framer-motion'
import { BROS_MEDIA_INSTAGRAM_URL } from '../data/social.js'
import './view_on_instagram_button.css'

const SPRING = { type: 'spring', stiffness: 380, damping: 28, mass: 0.45 }

function InstagramIcon() {
  return (
    <svg
      className="instagram-cta__icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="#ffffff" stroke="none" />
    </svg>
  )
}

export default function ViewOnInstagramButton({
  href = BROS_MEDIA_INSTAGRAM_URL,
  text = 'View on Instagram',
  className = '',
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`instagram-cta font-sans ${className}`.trim()}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
    >
      <span className="instagram-cta__icon-wrap" aria-hidden="true">
        <InstagramIcon />
      </span>
      <span className="instagram-cta__label">{text}</span>
      <span className="instagram-cta__arrow" aria-hidden="true">
        ↗
      </span>
    </motion.a>
  )
}
