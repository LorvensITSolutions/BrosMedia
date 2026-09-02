import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { footerIntro, footerSocialLinks } from '../data/footer'
import { contactEmail } from '../data/contact'
import {
  navLinks,
  routes,
  isNavLinkActive,
  navigateToHomeSection,
} from '../data/navigation'

const LOGO_URL =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134190/BrosMedia_Logo_1_nxpara.png'

const menuLinks = [{ label: 'Home', to: routes.home }, ...navLinks]

const LINE_WIDTHS = {
  idle: [44, 26, 14],
  hover: [52, 34, 20],
}

const springSnappy = { type: 'spring', stiffness: 420, damping: 32, mass: 0.35 }
const springSoft = { type: 'spring', stiffness: 260, damping: 28, mass: 0.55 }

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.34, ease: [0.4, 0, 0.2, 1] },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springSoft,
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.2 },
  },
}

function MenuLines({ hovered }) {
  const widths = hovered ? LINE_WIDTHS.hover : LINE_WIDTHS.idle

  return (
    <span className="flex w-11 flex-col items-end gap-1.5 sm:w-12 sm:gap-1.75">
      {widths.map((width, index) => (
        <motion.span
          key={index}
          className="block h-px origin-right rounded-full bg-white"
          animate={{
            width,
            backgroundColor: hovered ? '#dfff00' : 'rgba(255,255,255,0.92)',
          }}
          transition={{
            ...springSnappy,
            delay: hovered ? index * 0.04 : 0,
          }}
        />
      ))}
    </span>
  )
}

function CloseIcon() {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden>
      <motion.span
        className="absolute h-px w-5 rounded-full bg-accent"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 45, opacity: 1 }}
        transition={springSnappy}
      />
      <motion.span
        className="absolute h-px w-5 rounded-full bg-accent"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: -45, opacity: 1 }}
        transition={springSnappy}
      />
    </span>
  )
}

function MenuTrigger({ open, onToggle }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      type="button"
      className={`menu-trigger fixed right-[calc(1rem+env(safe-area-inset-right,0px))] top-[calc(var(--navbar-height)/2)] z-70 flex -translate-y-1/2 items-center justify-center rounded-full transition-colors sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] lg:right-[calc(2rem+env(safe-area-inset-right,0px))] ${
        open
          ? 'h-12 w-12 border border-white/15 bg-white/[0.06] shadow-[0_0_24px_rgba(223,255,0,0.08)] backdrop-blur-md hover:border-accent/40 hover:bg-white/10'
          : 'h-11 w-11 p-2.5 hover:bg-white/5 sm:h-12 sm:w-12'
      }`}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-expanded={open}
      aria-controls="sidebar-nav"
      aria-label={open ? 'Close menu' : 'Open menu'}
      whileTap={{ scale: 0.94 }}
      transition={springSnappy}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={springSnappy}
          >
            <CloseIcon />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={springSnappy}
            className="flex items-center justify-center"
          >
            <MenuLines hovered={hovered} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function SidebarContact() {
  const phoneHref = `tel:${footerIntro.phoneHref}`

  return (
    <div className="flex shrink-0 flex-col gap-5 border-t border-white/8 px-5 py-5 sm:px-6 lg:w-[44%] lg:border-t-0 lg:border-l lg:py-6">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/35 sm:text-xs">
        Get in touch
      </p>

      <p className="text-xs leading-relaxed text-white/50 sm:text-[0.8125rem]">{footerIntro.address}</p>

      <div className="flex flex-col gap-3">
        <a
          href={phoneHref}
          className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-accent"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <Phone className="h-4 w-4 text-accent/80" strokeWidth={1.75} />
          </span>
          <span className="font-semibold">{footerIntro.phone}</span>
        </a>

        <a
          href={`mailto:${contactEmail}`}
          className="text-sm font-medium text-white/50 transition hover:text-accent"
        >
          {contactEmail}
        </a>
      </div>

      <div>
        <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/30">
          Social
        </p>
        <ul className="flex flex-col gap-2">
          {footerSocialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/55 transition hover:text-accent"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SidebarMenu({ onClose }) {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (event, link) => {
    event.preventDefault()
    onClose()
    navigateToHomeSection(navigate, link.to)
  }

  return (
    <motion.div
      id="sidebar-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-60 flex h-svh justify-end"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="absolute inset-0 bg-[#050508]/55 backdrop-blur-[2px]"
        variants={overlayVariants}
        onClick={onClose}
      />

      <motion.aside
        className="relative flex h-full w-[min(92vw,40rem)] min-w-0 flex-col overflow-hidden border-l border-white/10 bg-[#070A0D] shadow-[-24px_0_80px_rgba(0,0,0,0.45)] sm:w-[58%] lg:w-[52%] lg:max-w-4xl"
        variants={panelVariants}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,69,255,0.16),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(223,255,0,0.07),transparent_50%)]"
          aria-hidden
        />

        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/8 px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
          <a
            href={routes.home}
            onClick={(event) => {
              event.preventDefault()
              onClose()
              navigateToHomeSection(navigate, routes.home)
            }}
            className="group inline-flex items-center gap-2.5"
            aria-label="Brosmedia home"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-1 transition-transform group-hover:scale-105 sm:h-9 sm:w-9">
              <img src={LOGO_URL} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="text-lg font-black lowercase tracking-tight text-white sm:text-xl">
              brosmedia
            </span>
          </a>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <motion.nav
            className="scrollbar-hide relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="flex flex-col gap-0.5 pb-4">
              {menuLinks.map((link, index) => {
                const isActive = isNavLinkActive(link.to, pathname, hash)
                const indexLabel = String(index + 1).padStart(2, '0')

                return (
                  <motion.li key={link.to} variants={itemVariants} className="overflow-visible">
                    <a
                      href={link.to}
                      onClick={(event) => handleNavClick(event, link)}
                      className="group flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-white/[0.03] sm:gap-4 sm:py-2.5"
                    >
                      <span
                        className={`w-6 shrink-0 text-[0.65rem] font-semibold tracking-[0.18em] transition-colors sm:text-xs ${
                          isActive ? 'text-accent' : 'text-white/30 group-hover:text-accent/70'
                        }`}
                      >
                        {indexLabel}
                      </span>
                      <span className="min-w-0 flex-1 overflow-visible py-0.5">
                        <motion.span
                          className={`block font-black leading-[1.15] tracking-tight transition-colors text-[clamp(1.25rem,2.8vw,1.85rem)] ${
                            isActive ? 'text-accent' : 'text-white group-hover:text-accent'
                          }`}
                          whileHover={{ x: 5 }}
                          transition={springSnappy}
                        >
                          {link.label}
                        </motion.span>
                      </span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>

          <SidebarContact />
        </div>

        <motion.div
          className="relative z-10 shrink-0 border-t border-white/8 px-5 py-4 sm:px-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.25, ...springSoft }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/25 sm:text-xs">
            Brosmedia
          </p>
          <p className="mt-1 text-sm text-white/45">Digital Marketing Agency</p>
        </motion.div>
      </motion.aside>
    </motion.div>
  )
}

export default function DynamicNavbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-auto flex h-[var(--navbar-height)] items-center px-[max(1rem,env(safe-area-inset-left))] sm:px-6 lg:px-8 ${
            open ? 'justify-end' : 'justify-between'
          }`}
        >
          {!open && (
            <a
              href={routes.home}
              onClick={(event) => {
                event.preventDefault()
                navigateToHomeSection(navigate, routes.home)
              }}
              className="group inline-flex items-center rounded-full bg-white/95 p-1.5 backdrop-blur-md transition hover:bg-white sm:p-2"
              aria-label="Brosmedia home"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white p-0.5 sm:h-11 sm:w-11">
                <img src={LOGO_URL} alt="" className="h-full w-full object-contain" />
              </span>
            </a>
          )}
          <div className="h-12 w-12 shrink-0 sm:w-14" aria-hidden />
        </div>
      </header>

      <MenuTrigger open={open} onToggle={() => setOpen((value) => !value)} />

      <AnimatePresence mode="wait">
        {open ? <SidebarMenu key="menu" onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  )
}
