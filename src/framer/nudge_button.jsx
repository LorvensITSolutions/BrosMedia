// Vite port of Framer Nudge Button
// https://framer.com/m/Nudge-Button-mMgxfo.js@qEG2iUEqts6KyJQGsGUK

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './nudge_button.css'

const SPRING = { type: 'spring', bounce: 0.2, duration: 0.6 }

function ArrowRightIcon({ color = '#000000', strokeWidth = 1.6 }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 14 4 L 0 4 M 14 4 L 10 8 M 14 4 L 10 0"
        transform="translate(5 8)"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function NudgeButton({
  text = 'Get in Touch',
  link = '',
  openInNewTab = false,
  buttonColor = '#dfff00',
  textColor = '#000000',
  arrowColor = '#000000',
  arrowWrapperColor = '#ffffff',
  padding = '6px 6px 6px 18px',
  className = '',
  fullWidth = false,
}) {
  const [hovered, setHovered] = useState(false)
  const isInternalLink = link && link.startsWith('/') && !link.startsWith('//')
  const Tag = link ? (isInternalLink ? Link : 'a') : 'button'
  const linkProps = isInternalLink
    ? { to: link }
    : link
      ? {
          href: link,
          target: openInNewTab ? '_blank' : undefined,
          rel: openInNewTab ? 'noopener noreferrer' : undefined,
        }
      : { type: 'button' }

  return (
    <div className={`${fullWidth ? 'nudge-button--block ' : ''}${className}`.trim()}>
      <Tag
        {...linkProps}
        className={`nudge-button font-sans${hovered ? ' nudge-button--hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{
          '--nudge-padding': padding,
          backgroundColor: buttonColor,
          color: textColor,
        }}
      >
        <span className="nudge-button__text">{text}</span>
        <span
          className="nudge-button__arrow-content"
          style={{ backgroundColor: arrowWrapperColor }}
        >
          <motion.span
            className="nudge-button__arrow-track"
            animate={{ x: hovered ? -36 : 0 }}
            transition={SPRING}
          >
            <span className="nudge-button__arrow-slot" aria-hidden="true">
              <ArrowRightIcon color={arrowColor} />
            </span>
            <span className="nudge-button__arrow-slot" aria-hidden="true">
              <ArrowRightIcon color={arrowColor} />
            </span>
          </motion.span>
        </span>
      </Tag>
    </div>
  )
}
