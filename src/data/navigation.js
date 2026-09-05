export const routes = {
  home: '/',
  services: '/#services',
  portfolio: '/portfolio',
  ourWork: '/portfolio',
  industries: '/#industries',
  about: '/#about',
  contact: '/#contact',
}

export const navLinks = [
  { label: 'Services', to: routes.services },
  { label: 'About', to: routes.about },
  { label: 'Portfolio', to: routes.portfolio },
  { label: 'Industries', to: routes.industries },
  { label: 'Contact', to: routes.contact },
]

export function getHashFromRoute(route) {
  const hashIndex = route.indexOf('#')
  return hashIndex >= 0 ? route.slice(hashIndex) : ''
}

function getNavbarOffset() {
  if (typeof window === 'undefined') return 76
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 76
}

/** True while a nav-driven scroll is in progress (skips pin ScrollTrigger.refresh). */
let programmaticScrollUntil = 0

export function isProgrammaticScrolling() {
  return typeof performance !== 'undefined' && performance.now() < programmaticScrollUntil
}

/**
 * Scroll to a homepage section by hash.
 * Uses instant positioning for long jumps so Creative Work's scroll-pin
 * (and ScrollTrigger.refresh) cannot interrupt mid-smooth-scroll.
 */
export function scrollToSection(hash, options = {}) {
  if (!hash || hash === '#hero') {
    programmaticScrollUntil = performance.now() + 400
    window.scrollTo({ top: 0, behavior: options.behavior ?? 'auto' })
    return true
  }

  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return false

  const nav = getNavbarOffset()
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - nav - 12)
  const distance = Math.abs(top - window.scrollY)
  // Pin section is multi-viewport tall — smooth scroll often dies at reels.
  const behavior =
    options.behavior ?? (distance > window.innerHeight * 1.25 ? 'auto' : 'smooth')

  programmaticScrollUntil = performance.now() + (behavior === 'smooth' ? 1000 : 450)
  window.scrollTo({ top, behavior })
  return true
}

/** Navigate to a homepage hash section, or a full page route like /portfolio. */
export function navigateToHomeSection(navigate, route) {
  const hash = getHashFromRoute(route)

  if (route === routes.home) {
    navigate('/')
    window.history.replaceState(null, '', '/')
    window.requestAnimationFrame(() => scrollToSection('#hero'))
    return
  }

  // Full page routes (no hash) — e.g. /portfolio
  if (!hash) {
    navigate(route)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
    return
  }

  // Hash links: Layout's hash effect owns the scroll (avoids double scroll fights).
  navigate(route)
}

export function isNavLinkActive(linkTo, pathname, hash) {
  if (linkTo === routes.home) {
    return pathname === '/' && (!hash || hash === '#hero')
  }

  if (!linkTo.includes('#')) {
    return pathname === linkTo
  }

  const targetHash = getHashFromRoute(linkTo)
  return pathname === '/' && hash === targetHash
}
