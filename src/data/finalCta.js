import { getContactWhatsAppHref } from './contact'

export const finalCtaButtons = {
  discovery: {
    label: 'Book a Free 30-Min Strategy Call',
    get href() {
      return getContactWhatsAppHref()
    },
    external: true,
  },
}
