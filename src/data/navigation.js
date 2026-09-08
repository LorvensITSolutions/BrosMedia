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

function getScrollOffset() {
  // Nav is not sticky — only leave a little breathing room above sections.
  return 16
}

/** Scroll to a homepage section by hash. */
export function scrollToSection(hash, options = {}) {
  if (!hash || hash === '#hero') {
    window.scrollTo({ top: 0, behavior: options.behavior ?? 'auto' })
    return true
  }

  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return false

  const nav = getScrollOffset()
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - nav)
  const distance = Math.abs(top - window.scrollY)
  // Long jumps use instant scroll so mid-page motion sections don't interrupt.
  const behavior =
    options.behavior ?? (distance > window.innerHeight * 1.25 ? 'auto' : 'smooth')

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
