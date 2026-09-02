export const routes = {
  home: '/',
  services: '/#services',
  ourWork: '/#work-stream',
  industries: '/#industries',
  about: '/#about',
  contact: '/#contact',
}

export const navLinks = [
  { label: 'Services', to: routes.services },
  { label: 'About', to: routes.about },
  { label: 'Our Work', to: routes.ourWork },
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

/** Smooth-scroll to a homepage section (single-page inline navigation). */
export function navigateToHomeSection(navigate, route) {
  const hash = getHashFromRoute(route)

  if (route === routes.home || !hash) {
    navigate('/')
    window.history.replaceState(null, '', '/')
    window.requestAnimationFrame(() => scrollToSection('#hero'))
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

  const targetHash = getHashFromRoute(linkTo)
  return pathname === '/' && hash === targetHash
}
