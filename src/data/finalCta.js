import { getContactWhatsAppHref, getWhatsAppHref } from './contact'

export { getWhatsAppHref }

export const finalCtaIntro = {
  label: 'Next step',
  headline: 'Ready to build your brand?',
  description:
    'Whether you are starting from scratch or looking to level up — book a free 30-minute strategy call and we will map clear next steps.',
}

export const finalCtaButtons = {
  discovery: {
    label: 'Book a Free 30-Min Strategy Call',
    get href() {
      return getContactWhatsAppHref()
    },
    external: true,
  },
  whatsapp: {
    label: 'WhatsApp Us →',
    number: '917013814030',
    message: "Hi Brosmedia, I'd like to book a free strategy call.",
  },
}
