import {
  getClientWebsiteHref,
  ourWorkCta,
  ourWorkIntro,
  ourWorkMarqueeItems,
  portfolioClients,
} from './ourWork'
import { finalCtaButtons } from './finalCta'

export const portfolioIntro = {
  label: 'Portfolio',
  headline: ourWorkIntro.headline,
  description:
    'From PG and co-living brands in Hyderabad to professional sports teams, plus real estate, healthcare, fashion, and NGOs, here is who we have worked with and what we built.',
  heroSubline:
    'Branding, websites, and campaigns from Brosmedia - real work for brands built to be seen, remembered, and grown.',
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

export const portfolioAboutWork = {
  title: 'About Our Work',
  paragraphs: [
    {
      before:
        'At ',
      highlight: 'Brosmedia',
      after:
        ', we are more than just a digital marketing agency - we are growth partners for brands that want to thrive in today’s fast-moving digital landscape. With creativity at our core and strategy as our foundation, we bring together design, technology, and marketing expertise to craft digital experiences that leave a lasting impact.',
    },
    {
      text: 'Our portfolio reflects a diverse range of projects across industries, where we have transformed ideas into compelling stories and brands into market leaders. From startups seeking a strong online presence to established businesses ready to scale, we tailor strategies that align with every stage of growth. What sets us apart is not only the depth of our services but also our commitment to measurable results and innovative thinking.',
    },
  ],
  stats: [
    { value: '12+', label: 'Brands Built' },
    { value: '9+', label: 'Industries' },
    { value: '1+ Yr', label: 'Of Execution' },
    { value: '360°', label: 'Branding & Marketing' },
  ],
}

export const portfolioSectionIntro = {
  headlineBefore: 'Our',
  headlineAccent: 'Real Work.',
  headlineAfter: 'Brands Across Industries.',
  description:
    'From co-living and sports teams to real estate, healthcare, fashion, NGOs, and more - here is who we built for.',
}

export const portfolioFeaturedIntro = {
  headlineBefore: 'Building',
  headlineAccent: 'Brand',
  headlineAfter: 'Websites',
}

export const portfolioIconicIntro = {
  headlineBefore: 'Crafting',
  headlineAccent: 'Iconic Identities',
}

const ICONIC_FEATURED_IDS = ['narenn-living', 'vizag-seahawks', 'nellore-wolves']

/** Featured website cards (2-up) + other websites */
export const portfolioWebsiteFeatured = [
  {
    id: 'web-narenn',
    title: 'Narenn Living',
    description:
      'Premium co-living website with SEO pages, room discovery, and a lead pipeline built to fill beds in Madhapur.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/narennwebsite.png',
    href: 'https://narennliving.com',
  },
  {
    id: 'web-mb-prime',
    title: 'MB Prime Projects',
    description:
      'Landmark real estate site for villa and plot launches - polished presence that converts enquiries into site visits.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprimewebsite.png',
    href: 'https://mbprimeprojects.com',
  },
]

export const portfolioOtherWebsites = [
  {
    id: 'web-sasha-slimming',
    title: 'Sasha Luxe Slimming',
    description:
      'Medical-aesthetic clinic website focused on body analysis bookings and conversion-led CTAs.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/sashaslimmingwebsite.png',
    href: 'https://sashaslimming.com',
  },
  {
    id: 'web-sasha-smiles',
    title: 'Sasha Smiles',
    description:
      'Dental clinic site built around trust, gentle care messaging, and easy consultation booking.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/sashasmileswebsite.png',
    href: 'https://sashasmiles.com',
  },
  {
    id: 'web-lumiere-luxe',
    title: 'Lumière Luxe',
    description:
      'Luxury salon experience site with premium storytelling and appointment-driven journeys.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/lumiereluxewebsite.png',
    href: 'https://lumiereluxe.in',
  },
  {
    id: 'web-amvi',
    title: 'Amvi Foods',
    description:
      'Export-ready brand website taking Konaseema farms to global markets with clear RFQ flows.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/amvifoodswebsite.png',
    href: 'https://amvifoods.com',
  },
  {
    id: 'web-andhra-machines',
    title: 'Andhra Machines',
    description:
      'Full e-commerce storefront for sewing machines — catalog, brands, and nationwide delivery.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/andhramachineswebsite.png',
    href: 'https://andhramachinesagencies.com',
  },
  {
    id: 'web-yalla-dorababu',
    title: 'Yalla Dorababu',
    description:
      'Political portfolio site for Yalla Venkata Ramamohan Rao — timeline, speeches, gallery, and public connect.',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/yalladorababuwebsite.png',
    href: 'https://yalladorababu.in',
  },
]

export const portfolioItems = portfolioClients.map((client) => ({
  ...client,
  logo: client.logo ?? null,
  instagram: client.instagram ?? null,
}))

export const portfolioIconicFeatured = ICONIC_FEATURED_IDS.map((id) =>
  portfolioItems.find((client) => client.id === id),
).filter(Boolean)

export const portfolioCreations = portfolioItems.filter(
  (client) => !ICONIC_FEATURED_IDS.includes(client.id),
)

export const portfolioFeaturedProjects = portfolioWebsiteFeatured

export const portfolioPosterIntro = {
  headlineBefore: 'Crafting',
  headlineAccent: 'Campaign Creatives',
}

export const portfolioPosterFeatured = [
  {
    id: 'poster-prabhas',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/prabhas_brosmedia_creative.webp',
    alt: 'Prabhas supports Nellore Wolves campaign creative',
  },
  {
    id: 'poster-mbprime-ap',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_ap_brosmedia_creative.jpg',
    alt: 'MB Prime biggest villa community in Andhra Pradesh creative',
  },
  {
    id: 'poster-niharika',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/niharika_konidela_brosmedia_creative.heic',
    alt: 'Niharika Konidela campaign creative',
  },
]

export const portfolioPosterMore = [
  {
    id: 'poster-uv-intro',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/uv_intro_brosmedia_creative.heic',
    alt: 'UV Creations intro creative',
  },
  {
    id: 'poster-seahawks',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/seahawks_brosmedia_beyond_the_game.heic',
    alt: 'Vizag Seahawks Beyond the Game creative',
  },
  {
    id: 'poster-nellore-intro',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/nellore_wolves_intro_brosmedia_creative.heic',
    alt: 'Nellore Wolves intro creative',
  },
  {
    id: 'poster-mbprime',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_brosmedia_creative.jpg',
    alt: 'MB Prime villas and plots campaign creative',
  },
  {
    id: 'poster-court',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/Screenshot%202026-09-03%20165927.png',
    alt: 'Sports campaign creative',
  },
  {
    id: 'poster-narenn',
    src: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/narenn_krishnajanmastami.png',
    alt: 'Narenn Living campaign creative',
  }
]

export const portfolioSocialIntro = {
  headlineBefore: 'Growing',
  headlineAccent: 'Instagram Handles',
}

export const portfolioSocialFeatured = [
  {
    id: 'social-narenn',
    name: 'Narenn Living',
    handle: '@narennliving',
    status: '4,050 followers · Premium PG & co-living presence in Hyderabad',
    href: 'https://www.instagram.com/narennliving',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/narenn_instgram_new.png',
  },
  {
    id: 'social-nellore',
    name: 'Nellore Wolves',
    handle: '@nellorewolvesofficial',
    status: 'Official APL franchise · Managed season-long social content',
    href: 'https://www.instagram.com/nellorewolvesofficial',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/nellore-instgram.jpeg',
  },
  {
    id: 'social-vizag',
    name: 'Vizag Sea Hawks',
    handle: '@vizagseahawksofficial',
    status: 'Official APL franchise · Fan engagement & match-day content',
    href: 'https://www.instagram.com/vizagseahawksofficial',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/vizag_seahawks_instgram.jpeg',
  },
]

export const portfolioSocialMore = [
  {
    id: 'social-amvi',
    name: 'Amvi Foods',
    handle: '@amvi_foods',
    status: 'Premium agri-export brand storytelling from Konaseema',
    href: 'https://www.instagram.com/amvi_foods',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/amvi_instgram.jpeg',
  },
  {
    id: 'social-yalla',
    name: 'Yalla Dorababu',
    handle: '@yalladorababu_official',
    status: 'Political leadership presence with consistent community content',
    href: 'https://www.instagram.com/yalladorababu_official',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/yalladorababu_instgram.png',
  },
  {
    id: 'social-mbprime',
    name: 'MB Prime',
    handle: '@mbprimeprojects',
    status: 'Real estate villas & plots — always-on property content',
    href: 'https://www.instagram.com/mbprimeprojects',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/mbprime_instgram.jpg',
  },
  {
    id: 'social-zarivaram',
    name: 'Zarivaram',
    handle: '@zarivaram',
    status: '9.7K+ followers · Boutique saree storytelling that drives footfall',
    href: 'https://www.instagram.com/zarivaram',
    cta: 'View Profile',
    image: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/zarivaram_instgram.png',
  },
]

export const portfolioMarqueeItems = ourWorkMarqueeItems

export const portfolioCta = {
  ...ourWorkCta,
  fabLabel: 'Start a Project',
  fabHref: finalCtaButtons.discovery.href,
}

export { getClientWebsiteHref }
