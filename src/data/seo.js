import { faqItems } from './faq'
import { services } from './services'

export const siteUrl = 'https://brosmedia.in'

export const siteName = 'Brosmedia'

export const siteTagline = 'Digital Marketing Agency in Hyderabad'

export const defaultTitle = 'Brosmedia | Digital Marketing Agency in Hyderabad'

export const defaultDescription =
  'Brosmedia is a digital marketing agency in Hyderabad offering branding, websites, social media, Meta ads, and creative production for growing businesses across India.'

export const defaultKeywords = [
  'digital marketing agency Hyderabad',
  'branding agency Hyderabad',
  'social media marketing India',
  'Meta ads agency',
  'website design Hyderabad',
  'creative production',
  'Brosmedia',
  'digital marketing company',
  'brand identity',
  'performance marketing',
  'SEO agency Hyderabad',
  'Google ads Hyderabad',
].join(', ')

export const ogImage =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/w_1200,h_630,c_pad,b_rgb:000000,q_auto,f_auto/v1782134190/BrosMedia_Logo_1_nxpara.png'

export const favicon =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1781159780/Bros_Media_Logo_zfbess.png'

export const contact = {
  email: 'brosmedia26@gmail.com',
  phone: '+917013814030',
  phoneDisplay: '+91 70138 14030',
  streetAddress: '1st Floor, Road No. 86, Jubilee Hills',
  addressLocality: 'Hyderabad',
  addressRegion: 'Telangana',
  postalCode: '500096',
  addressCountry: 'IN',
  addressDisplay: '1st Floor, Road No. 86, Jubilee Hills, Hyderabad, Telangana 500096',
  mapsUrl: 'https://share.google/iACqLAI0aLf6P8Rec',
  areaServed: 'IN',
  openingHours: 'Mo-Sa 10:00-19:00',
  latitude: 17.4326,
  longitude: 78.4071,
}

/** Add profile URLs here when live — they appear in Organization sameAs. */
export const socialProfiles = []

export const seoPages = {
  '/': {
    title: defaultTitle,
    description: defaultDescription,
    path: '/',
  },
  home: {
    title: defaultTitle,
    description: defaultDescription,
    path: '/',
  },
  '/services': {
    title: 'Services | Brosmedia Digital Marketing Agency',
    description:
      'Branding, marketing, websites, and business consulting from Brosmedia — end-to-end digital services for growing brands in Hyderabad and across India.',
    path: '/services',
  },
  '/about': {
    title: 'About Brosmedia | Digital Marketing Agency in Hyderabad',
    description:
      'Meet Brosmedia — a Hyderabad-based digital marketing agency building brands with strategy, design, websites, and performance marketing.',
    path: '/about',
  },
  '/our-work': {
    title: 'Our Work | Brosmedia Case Studies & Projects',
    description:
      'Explore Brosmedia’s work across branding, websites, social media, Meta ads, and creative production for clients in India and beyond.',
    path: '/our-work',
  },
  '/portfolio': {
    title: 'Portfolio | Brosmedia Clients & Projects',
    description:
      'See Brosmedia’s client portfolio — real estate, healthcare, sports, fashion, and more. Branding, websites, social media, and Meta ads from Hyderabad.',
    path: '/portfolio',
  },
  '/industries': {
    title: 'Industries | Brosmedia Digital Marketing Expertise',
    description:
      'Brosmedia works across real estate, healthcare, fashion, and more — industry-focused branding and digital marketing from Hyderabad.',
    path: '/industries',
  },
  '/contact': {
    title: 'Contact Brosmedia | Start a Project',
    description:
      'Get in touch with Brosmedia in Jubilee Hills, Hyderabad. Tell us about your brand — we will reply with clear next steps.',
    path: '/contact',
  },
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${siteUrl}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalized}`
}

export function buildOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    legalName: 'Brosmedia',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: favicon,
    },
    image: ogImage,
    description: defaultDescription,
    email: contact.email,
    telephone: contact.phone,
    foundingDate: '2025',
    slogan: siteTagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.streetAddress,
      addressLocality: contact.addressLocality,
      addressRegion: contact.addressRegion,
      postalCode: contact.postalCode,
      addressCountry: contact.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.latitude,
      longitude: contact.longitude,
    },
    hasMap: contact.mapsUrl,
    areaServed: [
      {
        '@type': 'City',
        name: 'Hyderabad',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
    knowsAbout: [
      'Digital Marketing',
      'Branding',
      'Social Media Marketing',
      'Meta Ads',
      'Google Ads',
      'Website Design',
      'Creative Production',
      'Business Consulting',
      'Video Production',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: contact.email,
        telephone: contact.phone,
        areaServed: contact.areaServed,
        availableLanguage: ['English', 'Hindi', 'Telugu'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: contact.email,
        telephone: contact.phone,
        areaServed: contact.areaServed,
        availableLanguage: ['English', 'Hindi', 'Telugu'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Brosmedia Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.summary,
          provider: { '@id': `${siteUrl}/#organization` },
          areaServed: 'IN',
        },
      })),
    },
  }

  if (socialProfiles.length > 0) {
    schema.sameAs = socialProfiles
  }

  return schema
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: defaultDescription,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-IN',
    copyrightYear: 2025,
    copyrightHolder: {
      '@id': `${siteUrl}/#organization`,
    },
  }
}

export function buildWebPageSchema({
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-IN',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: ogImage,
    },
  }
}

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildServiceListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/#services`,
    name: 'Brosmedia Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      description: service.summary,
      url: `${siteUrl}/#services`,
    })),
  }
}
