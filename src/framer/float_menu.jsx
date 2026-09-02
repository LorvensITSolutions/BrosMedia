// Vite port of Framer Float Menu
// https://framer.com/m/Float-Menu-QIDS7u.js@rj5sGn5P8Y9PycMKYQTi

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { getContactWhatsAppHref } from '../data/contact'
import { BROS_MEDIA_INSTAGRAM_URL } from '../data/social.js'
import './float_menu.css'

const WHATSAPP_ICON =
  'https://framerusercontent.com/images/7ZY0s1UaExCCsVfFfhqqRuiWU.png?width=512&height=512'

const spring = { type: 'spring', stiffness: 420, damping: 32, mass: 0.35 }

function InstagramIcon() {
  return (
    <svg
      className="float-menu-instagram-icon-svg"
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

function FloatExpandButton({
  href,
  text,
  className,
  iconClassName,
  hoverBackground,
  icon,
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={text}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        width: hovered ? 'auto' : 40,
        backgroundColor: hovered ? hoverBackground : '#ebebeb',
      }}
      transition={spring}
      whileTap={{ scale: 0.96 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="float-menu-expand-text"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
      <span className={iconClassName}>{icon}</span>
    </motion.a>
  )
}

function InstagramButton({ href, text = 'View on Instagram' }) {
  return (
    <FloatExpandButton
      href={href}
      text={text}
      className="float-menu-instagram"
      iconClassName="float-menu-instagram-icon"
      hoverBackground="#ffe8f3"
      icon={<InstagramIcon />}
    />
  )
}

function WhatsappButton({ href, text = 'Chat With Us Now' }) {
  return (
    <FloatExpandButton
      href={href}
      text={text}
      className="float-menu-whatsapp"
      iconClassName="float-menu-whatsapp-icon"
      hoverBackground="#c7ffbf"
      icon={<img src={WHATSAPP_ICON} alt="" />}
    />
  )
}

export default function FloatMenu({
  whatsappLink = getContactWhatsAppHref(),
  whatsappText = 'Chat With Us Now',
  instagramLink = BROS_MEDIA_INSTAGRAM_URL,
  instagramText = 'View on Instagram',
}) {
  return (
    <aside className="float-menu" aria-label="Quick contact">
      <InstagramButton href={instagramLink} text={instagramText} />
      <WhatsappButton href={whatsappLink} text={whatsappText} />
    </aside>
  )
}
