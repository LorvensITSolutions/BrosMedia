import { navLinks, routes } from './navigation'
import { contactEmail, getContactWhatsAppHref } from './contact'
import { contact, siteTagline } from './seo'

export const footerIntro = {
  companyName: 'Brosmedia',
  tagline: siteTagline,
  addressLines: [
    '1st Floor, Road No. 86, Jubilee Hills,',
    'Hyderabad, Telangana 500096',
  ],
  mapsUrl: contact.mapsUrl,
  phone: contact.phoneDisplay,
  phoneHref: contact.phone,
  email: contactEmail,
  workingHours: 'Monday to Saturday, 10 AM - 7 PM IST',
}

export const footerNavLinks = navLinks

export const footerBottomLinks = [
  { label: 'Home', to: routes.home },
  ...navLinks,
]

export const footerSocialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/brosmedia.in',
    external: true,
  },
  {
    label: 'WhatsApp',
    href: getContactWhatsAppHref(),
    external: true,
  },
]

export const footerContactLinks = [
  {
    label: 'Phone',
    value: contact.phoneDisplay,
    href: `tel:${contact.phone}`,
  },
]

export const footerLinks = navLinks

export { routes }
