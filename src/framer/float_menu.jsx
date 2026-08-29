// Vite port of Framer Float Menu
// https://framer.com/m/Float-Menu-QIDS7u.js@rj5sGn5P8Y9PycMKYQTi

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { getContactWhatsAppHref } from '../data/contact'
import './float_menu.css'

const WHATSAPP_ICON =
  'https://framerusercontent.com/images/7ZY0s1UaExCCsVfFfhqqRuiWU.png?width=512&height=512'

const spring = { type: 'spring', stiffness: 420, damping: 32, mass: 0.35 }

function WhatsappButton({ href, text = 'Chat With Us Now' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="float-menu-whatsapp"
      aria-label={text}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        width: hovered ? 'auto' : 40,
        backgroundColor: hovered ? '#c7ffbf' : '#ebebeb',
      }}
      transition={spring}
      whileTap={{ scale: 0.96 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="float-menu-whatsapp-text"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="float-menu-whatsapp-icon">
        <img src={WHATSAPP_ICON} alt="" />
      </span>
    </motion.a>
  )
}

export default function FloatMenu({
  whatsappLink = getContactWhatsAppHref(),
  whatsappText = 'Chat With Us Now',
}) {
  return (
    <aside className="float-menu" aria-label="Quick contact">
      <WhatsappButton href={whatsappLink} text={whatsappText} />
    </aside>
  )
}
