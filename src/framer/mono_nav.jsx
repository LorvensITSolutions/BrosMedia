import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isNavLinkActive,
  navigateToHomeSection,
  navLinks,
  routes,
} from '../data/navigation'
import './mono_nav.css'

const LOGO_URL =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134190/BrosMedia_Logo_1_nxpara.png'

const desktopLinks = navLinks
const menuLinks = [{ label: 'Home', to: routes.home }, ...navLinks]

const spring = { type: 'spring', stiffness: 380, damping: 32, mass: 0.4 }

/**
 * Vite port inspired by Framer MonoNav
 * https://framer.com/m/MonoNav-12rhqB.js@pD4Wm2NcAhu03TZZJO5m
 * Floating capsule · black theme.
 */
export default function MonoNav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (to) => {
    setOpen(false)
    navigateToHomeSection(navigate, to)
  }

  return (
    <header className="mono-nav-root pointer-events-none relative z-50 flex justify-center px-3 pt-[max(0.65rem,env(safe-area-inset-top))] sm:px-5 sm:pt-3">
      <motion.div
        layout
        transition={spring}
        className={`mono-nav pointer-events-auto w-full max-w-6xl ${open ? 'mono-nav--open' : ''}`}
      >
        <div className="mono-nav__shell">
          <a
            href={routes.home}
            className="mono-nav__brand"
            aria-label="Brosmedia home"
            onClick={(event) => {
              event.preventDefault()
              go(routes.home)
            }}
          >
            <span className="mono-nav__logo">
              <img src={LOGO_URL} alt="" />
            </span>
            <span className="mono-nav__wordmark">Brosmedia</span>
          </a>

          <nav className="mono-nav__links" aria-label="Primary">
            {desktopLinks.map((link, index) => {
              const active = isNavLinkActive(link.to, pathname, hash)
              return (
                <div key={link.to} className="mono-nav__link-wrap">
                  {index > 0 ? <span className="mono-nav__divider" aria-hidden /> : null}
                  <a
                    href={link.to}
                    onClick={(event) => {
                      event.preventDefault()
                      go(link.to)
                    }}
                    className={`mono-nav__link ${active ? 'mono-nav__link--active' : ''}`}
                  >
                    {link.label}
                  </a>
                </div>
              )
            })}
          </nav>

          <button
            type="button"
            className="mono-nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <motion.span
              className="mono-nav__burger-line"
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={spring}
            />
            <motion.span
              className="mono-nav__burger-line"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="mono-nav__burger-line"
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={spring}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              className="mono-nav__panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="mono-nav__panel-links" aria-label="Mobile">
                {menuLinks.map((link) => {
                  const active = isNavLinkActive(link.to, pathname, hash)
                  return (
                    <a
                      key={link.to}
                      href={link.to}
                      onClick={(event) => {
                        event.preventDefault()
                        go(link.to)
                      }}
                      className={`mono-nav__panel-link ${
                        active ? 'mono-nav__panel-link--active' : ''
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
