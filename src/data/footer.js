import { navLinks, routes } from './navigation'
import { clientsTeaser } from './clientsTeaser'

export const footerIntro = {
  companyName: 'Brosmedia',
  address: '1st Floor, Road No. 86, Jubilee Hills, Hyderabad, Telangana 500096',
}

export const footerRevealImages = clientsTeaser
  .filter((client) => client.logo)
  .map((client) => ({
    src: client.logo,
    alt: client.name,
  }))

export const footerLinks = navLinks

export { routes }
