// Vite port of Framer Float Menu
// https://framer.com/m/Float-Menu-QIDS7u.js@rj5sGn5P8Y9PycMKYQTi

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { getContactWhatsAppHref } from '../data/contact'
import {
  BROS_MEDIA_INSTAGRAM_URL,
  BROS_MEDIA_LINKEDIN_URL,
} from '../data/social.js'
import './float_menu.css'

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

function LinkedInIcon() {
  return (
    <svg
      className="float-menu-linkedin-icon-svg"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M6.34 8.95H3.56V20.4h2.78V8.95zm-.14-3.97a1.66 1.66 0 1 1-3.32 0 1.66 1.66 0 0 1 3.32 0zM20.44 20.4h-2.77v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.7H10.9V8.95h2.66v1.57h.04c.37-.7 1.27-1.44 2.62-1.44 2.8 0 3.32 1.84 3.32 4.24V20.4z"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      className="float-menu-whatsapp-icon-svg"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M17.47 14.38c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.89 1.09-.16.18-.33.2-.61.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.02 3.08 4.89 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z"
      />
      <path
        fill="#ffffff"
        d="M12.04 2C6.58 2 2.15 6.42 2.15 11.87c0 1.75.46 3.45 1.33 4.95L2 22l5.33-1.4a9.9 9.9 0 0 0 4.71 1.2h.01c5.46 0 9.89-4.42 9.89-9.87C21.94 6.42 17.5 2 12.04 2zm0 18.07h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.18 8.18 0 0 1-1.26-4.37c0-4.53 3.7-8.21 8.25-8.21 4.54 0 8.24 3.68 8.24 8.21 0 4.53-3.7 8.21-8.22 8.21z"
      />
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

function LinkedInButton({ href, text = 'Connect on LinkedIn' }) {
  return (
    <FloatExpandButton
      href={href}
      text={text}
      className="float-menu-linkedin"
      iconClassName="float-menu-linkedin-icon"
      hoverBackground="#d9ebff"
      icon={<LinkedInIcon />}
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
      icon={<WhatsAppIcon />}
    />
  )
}

export default function FloatMenu({
  whatsappLink = getContactWhatsAppHref(),
  whatsappText = 'Chat With Us Now',
  instagramLink = BROS_MEDIA_INSTAGRAM_URL,
  instagramText = 'View on Instagram',
  linkedinLink = BROS_MEDIA_LINKEDIN_URL,
  linkedinText = 'Connect on LinkedIn',
}) {
  return (
    <aside className="float-menu" aria-label="Quick contact">
      <InstagramButton href={instagramLink} text={instagramText} />
      <LinkedInButton href={linkedinLink} text={linkedinText} />
      <WhatsappButton href={whatsappLink} text={whatsappText} />
    </aside>
  )
}
