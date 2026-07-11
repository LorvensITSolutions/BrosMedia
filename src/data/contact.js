import { getWhatsAppHref } from './finalCta'

export const contactIntro = {
  label: 'Contact Us',
  headline: "Let's build something great together.",
  description:
    'Whether you have a clear brief or just a rough idea — reach out. We will ask the right questions and give you an honest picture of what we can do for your brand.',
}

export const contactEmail = 'brosmedia26@gmail.com'

export const contactWhatsApp = {
  // Country code + number, no + (e.g. 919876543210)
  number: '917013814030',
  display: '+91 70138 14030',
  message: "Hi Brosmedia, I'd like to discuss a project.",
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
    value: '1st Floor, Road No. 86, Jubilee Hills, Hyderabad, Telangana 500096',
  },
  {
    label: 'Working hours',
    value: 'Monday to Saturday, 10 AM – 7 PM IST',
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
