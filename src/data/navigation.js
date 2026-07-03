export const routes = {
  home: '/',
  services: '/services',
  ourWork: '/our-work',
  industries: '/industries',
  about: '/about',
  contact: '/contact',
}

export const navLinks = [
  { label: 'Services', to: routes.services },
  { label: 'About', to: routes.about },
  { label: 'Our Work', to: routes.ourWork },
  { label: 'Industries', to: routes.industries },
  { label: 'Contact', to: routes.contact },
]

export const comingSoonPages = {
  [routes.ourWork]: {
    title: 'Our Work',
    description: 'Case studies and project showcases are coming soon. Until then, explore the brands we have built on the home page.',
  },
  [routes.industries]: {
    title: 'Industries',
    description: 'Sector-by-sector expertise pages are being prepared. We work across real estate, healthcare, education, fashion, and more.',
  },
}
