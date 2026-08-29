export const featuredClients = [
  {
    id: 'narenn-living',
    name: 'Narenn Living',
    industry: 'PG & Co-living',
    location: 'Hyderabad',
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/Insta%20DP%20(1).png',
    workDone:
      'Brand identity, social creatives, and digital presence for a premium PG and co-living space in Hyderabad.',
    website: null,
  },
  {
    id: 'nellore-wolves',
    name: 'Nellore Wolves',
    industry: 'Pickleball Sports Team',
    location: 'Nellore',
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/WhatsApp+Image+2026-08-03+at+7.25.35+PM-Photoroom%201.png',
    workDone:
      'Sports team branding, match-day creatives, intro films, and social content for a competitive pickleball team.',
    website: null,
  },
  {
    id: 'vizag-seahawks',
    name: 'Vizag Seahawks',
    industry: 'Sports Team',
    location: 'Visakhapatnam',
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/WhatsApp+Image+2026-07-22+at+17.13.10%201%20(1).png',
    workDone:
      'Team branding, campaign creatives, and video production for a professional sports franchise.',
    website: null,
  },
]

export function toClientTeaserItem(client) {
  return {
    name: client.name,
    logo: client.logo,
    ...(client.website ? { url: client.website } : {}),
  }
}
