import {
  getClientWebsiteHref,
  ourWorkCta,
  ourWorkIntro,
  ourWorkMarqueeItems,
  ourWorkStats,
  portfolioClients,
} from './ourWork'
import { finalCtaButtons } from './finalCta'

export const portfolioIntro = {
  label: 'Portfolio',
  headline: ourWorkIntro.headline,
  description:
    'From PG and co-living brands in Hyderabad to professional sports teams, plus real estate, healthcare, fashion, and NGOs, here is who we have worked with and what we built.',
}

export const portfolioHeroPreviews = [
  {
    id: 'court',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/Screenshot%202026-09-03%20165927.png',
    alt: 'Sports court project preview',
    rotate: -7,
    x: '2%',
    y: '6%',
    z: 2,
  },
  {
    id: 'team',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/brosmedia_team.jpg',
    alt: 'Team celebration project preview',
    rotate: 6,
    x: '48%',
    y: '4%',
    z: 3,
  },
  {
    id: 'building',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_ap_brosmedia_creative.jpg',
    alt: 'Real estate project preview',
    rotate: -4,
    x: '8%',
    y: '52%',
    z: 4,
  },
  {
    id: 'uv',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/uv_intro_brosmedia_creative.heic',
    alt: 'UV Creations intro project preview',
    rotate: 8,
    x: '50%',
    y: '54%',
    z: 5,
  },
]

export const portfolioHeroCta = {
  primary: 'Explore our Work',
  secondary: 'Book a Discovery Call',
  secondaryHref: finalCtaButtons.discovery.href,
}

export const portfolioStats = ourWorkStats

export const portfolioSectionIntro = {
  headlineBefore: 'Our',
  headlineAccent: 'Real Work.',
  headlineAfter: 'Brands Across Industries.',
  description:
    'From co-living and sports teams to real estate, healthcare, fashion, NGOs, and more - here is who we built for.',
}

export const portfolioMarqueeItems = ourWorkMarqueeItems

export const portfolioCta = {
  ...ourWorkCta,
  fabLabel: 'Start a Project',
  fabHref: finalCtaButtons.discovery.href,
}

export const portfolioItems = portfolioClients.map((client) => ({
  ...client,
  logo: client.logo ?? null,
  instagram: client.instagram ?? null,
}))

export { getClientWebsiteHref }
