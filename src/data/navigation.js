export const routes = {
  home: '/',
  services: '/#services',
  ourWork: '/#clients',
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

export function isNavLinkActive(linkTo, pathname, hash) {
  if (linkTo === routes.home) {
    return pathname === '/' && (!hash || hash === '#hero')
  }

  const targetHash = linkTo.includes('#') ? linkTo.slice(linkTo.indexOf('#')) : ''
  return pathname === '/' && hash === targetHash
}
