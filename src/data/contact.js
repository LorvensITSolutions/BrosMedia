import { contact } from './seo'

export function getWhatsAppHref({ number, message }) {
  if (!number) return 'mailto:info@brosmedia.in'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const contactIntro = {
  label: 'Contact',
  headline: "Let's build something great together.",
  headlineBefore: "Let's build something",
  headlineAccent: 'great together',
  description:
    'Whether you have a clear brief or just a rough idea, book a free 30 min Strategy Call and we will map clear next steps for your brand.',
}

export const contactEmail = 'info@brosmedia.in'

export const contactWhatsApp = {
  number: '917013814030',
  display: '+91 70138 14030',
  message: "Hi Brosmedia, I'd like to book a free strategy call.",
}

export function getContactWhatsAppHref() {
  return getWhatsAppHref({
    number: contactWhatsApp.number,
    message: contactWhatsApp.message,
  })
}

export const contactServiceOptions = [
  'Branding & Identity',
  'Website',
  'Social Media',
  'Meta Ads',
  'Creative Production',
  'Video',
  'Brochure',
  'App / UI Creatives',
]

export const contactFormLabels = {
  fullName: 'Full Name',
  businessName: 'Business Name',
  phone: 'Phone Number',
  phoneHint: 'WhatsApp preferred',
  email: 'Email Address',
  industry: 'Industry / Type of Business',
  services: 'Services Interested In',
  project: 'Tell us about your project',
  submit: 'Send Message',
}

export const contactDirectHeading = 'Other ways to reach us'

export const contactDetails = [
  {
    label: 'WhatsApp',
    value: contactWhatsApp.display,
    href: getContactWhatsAppHref(),
    external: true,
  },
  {
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    label: 'Location',
    value: 'Hyderabad, Telangana',
    href: contact.mapsUrl,
    external: true,
  },
  {
    label: 'Working hours',
    value: 'Monday to Saturday, 10 AM - 7 PM IST',
  },
]

export function buildContactMailtoBody({
  fullName,
  businessName,
  phone,
  email,
  industry,
  services,
  project,
}) {
  const lines = [
    `Full Name: ${fullName}`,
    `Business Name: ${businessName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Industry: ${industry || '—'}`,
    '',
    'Services Interested In:',
    services.length ? services.map((s) => `• ${s}`).join('\n') : '—',
    '',
    'Project:',
    project || '—',
  ]
  return lines.join('\n')
}
