export const featuredClients = [
  {
    id: 'narenn-living',
    name: 'Narenn Living',
    industry: 'PG & Co-living',
    location: 'Hyderabad',
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/Insta%20DP%20(1).png',
    workDone:
      'Brand identity, social creatives, SEO website, and ads — a lead pipeline built to fill beds.',
    website: 'narennliving.com',
    instagram: null,
  },
  {
    id: 'nellore-wolves',
    name: 'Nellore Wolves',
    industry: 'New Sports Franchise',
    location: 'Nellore',
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/WhatsApp+Image+2026-08-03+at+7.25.35+PM-Photoroom%201.png',
    workDone:
      'New APL franchise — built brand identity, match-day creatives, and season-long fan content from day one.',
    website: null,
    instagram:
      'https://www.instagram.com/nellorewolvesofficial?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  },
  {
    id: 'vizag-seahawks',
    name: 'Vizag Seahawks',
    industry: 'New Sports Franchise',
    location: 'Visakhapatnam',
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/WhatsApp+Image+2026-07-22+at+17.13.10%201%20(1).png',
    workDone:
      'New APL franchise — debut-season branding, campaign creatives, and fan engagement from scratch.',
    website: null,
    instagram:
      'https://www.instagram.com/vizagseahawksofficial?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  },
]

export function toClientTeaserItem(client) {
  return {
    name: client.name,
    logo: client.logo,
    ...(client.website ? { url: `https://${client.website.replace(/^https?:\/\//, '')}` } : {}),
    ...(client.instagram ? { instagram: client.instagram } : {}),
  }
}
