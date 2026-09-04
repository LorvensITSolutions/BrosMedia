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

export const comingSoonPages = {}

export function getHashFromRoute(route) {
  const hashIndex = route.indexOf('#')
  return hashIndex >= 0 ? route.slice(hashIndex) : ''
}

export function scrollToSection(hash) {
  if (!hash || hash === '#hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return true
  }

  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return true
  }

  return false
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

  navigate(route)
  window.requestAnimationFrame(() => {
    window.setTimeout(() => scrollToSection(hash), 80)
  })
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
