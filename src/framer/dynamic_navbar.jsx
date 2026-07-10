// Dynamic island navbar — expands vertically on hamburger hover

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LetterSwap, { LetterSwapLink } from '../framer/letter_swap.jsx'
import { navLinks, routes } from '../data/navigation'

const LOGO_URL =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134190/BrosMedia_Logo_1_nxpara.png'

const revealEase = [0.22, 1, 0.36, 1]

function HamburgerIcon() {
  return (
    <span className="relative block h-[18px] w-[22px]" aria-hidden="true">
      <span className="absolute left-0 top-0 block h-[2px] w-[22px] rounded-full bg-primary" />
      <span className="absolute left-0 top-[8px] block h-[2px] w-[22px] rounded-full bg-primary" />
      <span className="absolute left-0 top-4 block h-[2px] w-[22px] rounded-full bg-primary" />
    </span>
  )
}

export default function DynamicNavbar() {
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [canHover, setCanHover] = useState(false)
  const { hash } = useLocation()

  const expanded = hovered || menuOpen

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setHovered(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const collapse = () => {
    setHovered(false)
    setMenuOpen(false)
  }

  const handleShellLeave = () => {
    if (canHover) collapse()
  }

  const handleHamburgerEnter = () => {
    if (canHover) setHovered(true)
  }

  const handleHamburgerClick = () => {
    if (!canHover) setMenuOpen((open) => !open)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4">
      <div
        className="pointer-events-auto w-[min(94%,14rem)]"
        onMouseLeave={handleShellLeave}
      >
        <div className="dynamic-nav-shell overflow-hidden font-sans shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <nav className="flex h-[3.25rem] items-center gap-3 px-5 sm:h-[3.5rem] sm:px-6">
            <Link to={routes.home} className="flex shrink-0 items-center" onClick={collapse}>
              <img
                src={LOGO_URL}
                alt="Brosmedia"
                className="h-7 w-auto object-contain sm:h-8"
              />
            </Link>

            <button
              type="button"
              className="ml-auto inline-flex shrink-0 items-center justify-center p-1"
              aria-label={expanded ? 'Close menu' : 'Open menu'}
              aria-expanded={expanded}
              onMouseEnter={handleHamburgerEnter}
              onClick={handleHamburgerClick}
            >
              <HamburgerIcon />
            </button>
          </nav>

          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{
              height: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.38, ease: revealEase }}
          >
            <div className="border-t border-primary/10 px-3 pb-4 pt-2 sm:px-4">
              <ul className="flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const linkHash = link.to.includes('#') ? `#${link.to.split('#')[1]}` : ''
                  const isActive = Boolean(hash) && hash === linkHash

                  return (
                    <li key={link.to}>
                      <LetterSwapLink
                        to={link.to}
                        text={link.label}
                        active={isActive}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                          isActive ? 'bg-blue/5' : ''
                        }`}
                        color={isActive ? '#1e45ff' : 'rgba(0,0,0,0.75)'}
                        hoverColor="#dfff00"
                        onClick={collapse}
                      />
                    </li>
                  )
                })}
              </ul>

              <div className="mt-2 px-1">
                <Link
                  to={routes.contact}
                  className="flex w-full items-center justify-center rounded-full bg-blue px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary"
                  onClick={collapse}
                >
                  <LetterSwap
                    text="Get in Touch"
                    color="#ffffff"
                    hoverColor="#ffffff"
                    variant="pingPong"
                    direction="up"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
