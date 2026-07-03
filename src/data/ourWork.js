export const ourWorkIntro = {
  label: 'Our Work',
  headline: 'Real brands. Real work. Real results.',
  description:
    'From building brand identities from zero to managing full digital ecosystems — here is a snapshot of who we have worked with and what we built for them.',
}

export const ourWorkStats = [
  { value: '12', label: 'Clients served' },
  { value: '10+', label: 'Industries' },
  { value: '9', label: 'Service types' },
  { value: '8', label: 'Live websites' },
]

export const ourWorkMarqueeItems = [
  'MB Prime Projects',
  'Sasha Smiles',
  'Zarivaram',
  'AMVI Foods',
  'Lumiere Luxe',
  'Viqantai',
  'Arise Academy',
  'Andhra Machines',
  'Dista USA',
  'Yalladorababu',
]

export const portfolioClients = [
  {
    id: 'mb-prime',
    client: 'MB Prime Projects',
    industry: 'Real Estate, Hyderabad',
    workDone:
      'Website, social media management, Meta ads (Instagram & Facebook), carousels, static creatives, video editing',
    website: 'mbprimeprojects.com',
  },
  {
    id: 'sasha-smiles',
    client: 'Sasha Smiles',
    industry: 'Dental Clinic',
    workDone:
      'Website design & development, carousel creatives, static graphics, video production',
    website: 'sashasmiles.com',
  },
  {
    id: 'sasha-slimming',
    client: 'Sasha Slimming',
    industry: 'Slimming & Aesthetics',
    workDone:
      'Website design & development, carousel creatives, static graphics, video production',
    website: 'sashaslimming.com',
  },
  {
    id: 'arise-academy',
    client: 'Arise Academy',
    industry: 'Education',
    workDone: 'Carousel creatives, static design, video editing for social media',
    website: null,
  },
  {
    id: 'arise-delhi',
    client: 'Arise Delhi Branch',
    industry: 'Education',
    workDone: 'Website design & development for Delhi branch',
    website: 'arisedelhi.com',
  },
  {
    id: 'zarivaram',
    client: 'Zarivaram',
    industry: 'Ethnic Wear & Sarees',
    workDone:
      'Complete social media management, carousels, static creatives, video editing',
    website: 'zarivaram.vercel.app',
  },
  {
    id: 'andhra-machines',
    client: 'Andhra Machines Agencies',
    industry: 'Industrial E-commerce',
    workDone: 'E-commerce website design & development',
    website: 'andhramachinesagencies.com',
  },
  {
    id: 'amvi-foods',
    client: 'AMVI Foods',
    industry: 'Food & Agri Exports',
    workDone: 'Website, brochure design, video production',
    website: 'amvifoods.com',
  },
  {
    id: 'dista-usa',
    client: 'Dista USA',
    industry: 'Technology / SaaS',
    workDone: 'Website creatives, app UI creatives, Meta ad creatives',
    website: null,
  },
  {
    id: 'viqantai',
    client: 'Viqantai',
    industry: 'Brand Identity',
    workDone:
      'Logo design, color palette, full brand creative suite — identity built from scratch',
    website: null,
  },
  {
    id: 'lumiere-luxe',
    client: 'Lumiere Luxe',
    industry: 'Luxury / Lifestyle',
    workDone: 'Website design & development',
    website: 'lumiereluxe.in',
  },
  {
    id: 'yalladorababu',
    client: 'Yalladorababu',
    industry: 'Politics / Public Figure',
    workDone:
      'Politician portfolio website — profile, achievements, vision, constituency info, and contact',
    website: 'yalladorababu.in',
  },
]

export const deliverables = {
  label: 'Across our work we have delivered',
  title: 'What we have built',
  items: [
    'Brand identities — logos, color systems, brand guidelines',
    'Websites — business, e-commerce, landing pages, multi-branch',
    'Social media management — full account handling and content calendars',
    'Meta ad campaigns — lead generation, awareness, retargeting',
    'Creative production — carousels, statics, reels, motion graphics',
    'Video production — brand films, product videos, social reels',
    'Print & digital collateral — brochures, catalogs',
    'App & UI creatives — screens, banners, product visuals',
    'Political portfolio websites — personal branding and campaign creatives for public figures',
  ],
}

export const ourWorkCta = {
  label: 'Want to see work from your industry?',
  headline: 'We will walk you through relevant samples.',
  description:
    'Send us a WhatsApp or book a call and we will walk you through specific samples relevant to your sector.',
  buttonLabel: 'Talk to Us →',
}

export function getClientWebsiteHref(domain) {
  if (!domain) return null
  return domain.startsWith('http') ? domain : `https://${domain}`
}
