import { featuredClients } from './featuredClients'
import { getClientWebsiteHref } from './ourWork'

const logoById = Object.fromEntries(featuredClients.map((c) => [c.id, c.logo]))

export const portfolioFilterCategories = [
  { id: 'all', label: 'All' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'branding', label: 'Branding & Identity' },
  { id: 'social', label: 'Social Media & Content' },
  { id: 'website', label: 'Website / App Design' },
  { id: 'full-service', label: 'Full-Service' },
]

export const portfolioOverviewStats = [
  { value: '10+', label: 'Brands Built' },
  { value: '8', label: 'Industries Served' },
  { value: '1', label: 'Year of Active Execution' },
]

/**
 * Finalized portfolio case studies (overview cards + detail pages).
 * Sasha Clinic Group is one combined page covering three brand websites.
 */
export const portfolioCaseStudies = [
  {
    slug: 'sasha-clinic-group',
    client: 'Sasha Clinic Group',
    category: 'Healthcare — multi-brand clinic group',
    filterIds: ['healthcare'],
    oneLiner: 'Three brand websites + always-on ad creative, more bookings across all three',
    goal:
      'Sasha Clinic runs three distinct services — Lumiere Luxe (skin & body), Sasha Dental, and Sasha Slimming — each needed its own identity and website, plus ongoing creative support to keep bookings coming in.',
    whatWeDid: [
      'Built three separate websites, one per brand: Lumiere Luxe, Sasha Dental, Sasha Slimming',
      'Ongoing video editing for the clinic group',
      'Design creatives, posters, and banners used specifically for ad campaigns',
    ],
    result:
      'Increased bookings across the clinic group, driven by the ad creative and banner campaigns.',
    highlights: [
      { value: '3', label: 'Brand websites' },
      { value: 'Ads', label: 'Always-on creative' },
      { value: '↑', label: 'Bookings' },
    ],
    websites: [
      {
        name: 'Lumiere Luxe',
        href: 'https://lumiereluxe.in',
        logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_15_15_AM_ghors1_iwrplf.png',
      },
      {
        name: 'Sasha Dental',
        href: 'https://sashasmiles.com',
        logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_20_32_AM_e1ot2u_kc47qk.png',
      },
      {
        name: 'Sasha Slimming',
        href: 'https://sashaslimming.com',
        logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_22_29_AM_q09vhf_we6pis.png',
      },
    ],
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_20_32_AM_e1ot2u_kc47qk.png',
    website: null,
    instagram: null,
  },
  {
    slug: 'viqantai',
    client: 'ViQantAI',
    category: 'Technology — brand identity + social media',
    filterIds: ['branding'],
    oneLiner: 'Full brand identity, logo, and ongoing social content for an AI company',
    goal:
      'ViQantAI needed a brand from scratch — logo, colors — plus a real social media presence, not just a one-time design drop.',
    whatWeDid: [
      'Branding and logo design',
      'Color palette definition',
      'Set up social media accounts',
      'Ongoing content: carousel posts, static post designs, edited videos',
    ],
    result:
      'A consistent brand identity carried across every social touchpoint, with an active content pipeline instead of a one-off logo handoff.',
    highlights: [
      { value: 'ID', label: 'Brand system' },
      { value: 'Social', label: 'Content pipeline' },
      { value: 'AI', label: 'Tech brand' },
    ],
    websites: [],
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782133985/ViQant_Logo_bfy9f3.png',
    website: null,
    instagram: null,
  },
  {
    slug: 'zarivaram',
    client: 'Zarivaram',
    category: 'Fashion / retail — saree boutique',
    filterIds: ['social'],
    oneLiner: 'Content and event marketing that brings customers into the store',
    goal:
      'Zarivaram is an exclusive boutique celebrating the essence, versatility, and beauty of sarees — needed to turn Instagram attention into actual store visits and purchases.',
    whatWeDid: [
      'Video editing',
      'Creative and poster design',
      'Instagram content posting',
      'Event planning — including cultural events like Mayabazar',
    ],
    result:
      'Increased customer footfall — people seeing content online and visiting the store to buy.',
    highlights: [
      { value: 'IG', label: 'Content engine' },
      { value: 'Events', label: 'In-store draws' },
      { value: '↑', label: 'Footfall' },
    ],
    websites: [{ name: 'Zarivaram', href: 'https://zarivaram.vercel.app', logo: 'https://res.cloudinary.com/dvnplfu6z/image/upload/v1776921469/logo_1_rwdv9g.png' }],
    logo: 'https://res.cloudinary.com/dvnplfu6z/image/upload/v1776921469/logo_1_rwdv9g.png',
    website: 'zarivaram.vercel.app',
    instagram: null,
  },
  {
    slug: 'dista',
    client: 'DISTA',
    category: 'Technology — delivery platform',
    filterIds: ['website'],
    oneLiner: 'App and UI creative assets for a delivery partner platform',
    goal:
      'DISTA, an order delivery partner platform, needed its app and digital product to feel as easy to use as it is functional.',
    whatWeDid: [
      'App & UI creative design',
      'Interface design for mobile app',
      'Creative assets for the digital product',
    ],
    result: 'A more user-friendly website and app experience.',
    highlights: [
      { value: 'UI', label: 'App creatives' },
      { value: 'UX', label: 'Product feel' },
      { value: 'Mobile', label: 'Interface' },
    ],
    websites: [{ name: 'DISTA USA', href: 'https://distausa.com', logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134932/Dista_Logo_1_l0kgvo.png' }],
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134932/Dista_Logo_1_l0kgvo.png',
    website: 'distausa.com',
    instagram: null,
  },
  {
    slug: 'mb-prime',
    client: 'MB Prime — Villas and Plots',
    category: 'Real estate',
    filterIds: ['real-estate', 'full-service'],
    oneLiner:
      'Full-funnel marketing — from local ads to telecalling — driving plot and villa bookings',
    goal:
      'MB Prime needed to convert awareness into actual site visits and bookings across multiple ongoing villa and plot launches, using both digital and traditional local reach.',
    whatWeDid: [
      'Creatives, posters, and banners',
      'Video editing, including theatre-ad edits',
      'Meta ads management',
      'YouTube, Instagram, and Facebook posting',
      'Local advertising: banners, local TV channels, radio ads',
      'Set up a telecalling team to connect and follow up with leads',
      'Website development',
      'SEO',
    ],
    result:
      'Increased villa and plot bookings, backed by a lead pipeline that runs from ad click through to a telecaller follow-up.',
    highlights: [
      { value: 'Full', label: 'Funnel' },
      { value: 'Ads', label: 'Meta + local' },
      { value: '↑', label: 'Bookings' },
    ],
    websites: [
      {
        name: 'MB Prime Projects',
        href: 'https://mbprimeprojects.com',
        logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134726/sklmlogo_c2trtg_cndghd.png',
      },
    ],
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134726/sklmlogo_c2trtg_cndghd.png',
    website: 'mbprimeprojects.com',
    instagram: null,
  },
  {
    slug: 'amvi-foods',
    client: 'Amvi Foods',
    category: 'Food & agri exports',
    filterIds: ['full-service'],
    oneLiner: "Building an export-ready digital presence for AP's largest food powder exporter",
    goal:
      'Amvi Foods — one of the biggest food powder exporters in Andhra Pradesh — wanted a stronger digital portfolio to present the company internationally to buyers and partners.',
    whatWeDid: [
      'Video editing',
      'Creative design',
      'Social media handling',
      'Website design and development',
      'Brochure design',
    ],
    result:
      'A stronger, more credible digital presence built for an international audience of buyers and partners.',
    highlights: [
      { value: 'Export', label: 'Ready presence' },
      { value: 'Web', label: '+ brochure' },
      { value: 'Social', label: 'Handled' },
    ],
    websites: [
      {
        name: 'AMVI Foods',
        href: 'https://amvifoods.com',
        logo: 'https://res.cloudinary.com/dnvpasppl/image/upload/v1773392136/Screenshot_2026-03-04_114703-removebg-preview_a5xoie.png',
      },
    ],
    logo: 'https://res.cloudinary.com/dnvpasppl/image/upload/v1773392136/Screenshot_2026-03-04_114703-removebg-preview_a5xoie.png',
    website: 'amvifoods.com',
    instagram: null,
  },
  {
    slug: 'andhra-machines-store',
    client: 'Andhra Machines Store',
    category: 'E-commerce — industrial/machinery retail',
    filterIds: ['website'],
    oneLiner: 'E-commerce website build',
    goal: 'Andhra Machines Store needed an online store to sell through.',
    whatWeDid: ['Designed and developed a full e-commerce website'],
    result: 'A functioning online store for the business.',
    highlights: [
      { value: 'Store', label: 'E-commerce' },
      { value: 'Full', label: 'Build' },
      { value: 'Live', label: 'Online' },
    ],
    websites: [
      {
        name: 'Andhra Machines Agencies',
        href: 'https://andhramachinesagencies.com',
        logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1765255577/logo_sewing_td6tcf.png',
      },
    ],
    logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1765255577/logo_sewing_td6tcf.png',
    website: 'andhramachinesagencies.com',
    instagram: null,
  },
  {
    slug: 'goclean-foundation',
    client: 'GoClean Foundation',
    category: 'NGO — Section 8 (non-profit) company',
    filterIds: ['branding'],
    oneLiner: 'Brand identity and donor-facing brochure for a sanitation-focused foundation',
    goal:
      'GoClean, a Section 8 non-profit, needed a professional identity and printed material to support fundraising and outreach.',
    whatWeDid: ['Logo design', 'Brochure design'],
    result:
      "A credible, professional identity to support the foundation's fundraising and outreach work.",
    highlights: [
      { value: 'Logo', label: 'Identity' },
      { value: 'Print', label: 'Brochure' },
      { value: 'NGO', label: 'Section 8' },
    ],
    websites: [],
    logo: 'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/Secondary%20Logo%20(1).png',
    website: null,
    instagram: null,
  },
  {
    slug: 'vizag-seahawks',
    client: 'Vizag Seahawks',
    category: 'Sports — Andhra Pickle League (pickleball)',
    filterIds: ['social'],
    oneLiner: 'Digital marketing partner for a pickleball franchise',
    goal:
      'Vizag Seahawks needed a digital marketing partner to build fan engagement and visibility as a franchise in the Andhra Pickle League.',
    whatWeDid: [
      'Digital marketing partnership',
      'Creative and poster design',
      'Video editing',
      'Social media handling',
    ],
    result:
      'Ongoing digital presence and fan-facing content for the franchise across the season.',
    highlights: [
      { value: 'APL', label: 'Franchise' },
      { value: 'Social', label: 'Season-long' },
      { value: 'Video', label: '+ creatives' },
    ],
    websites: [],
    logo: logoById['vizag-seahawks'],
    website: null,
    instagram:
      'https://www.instagram.com/vizagseahawksofficial?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  },
  {
    slug: 'nellore-wolves',
    client: 'Nellore Wolves',
    category: 'Sports — Andhra Pickle League (pickleball)',
    filterIds: ['social'],
    oneLiner: 'Digital marketing partner for a second Andhra Pickle League franchise',
    goal:
      'Same league as Vizag Seahawks — Nellore Wolves needed the same level of ongoing content and social support.',
    whatWeDid: ['Creatives and posts', 'Video editing', 'Social media handling'],
    result: 'Consistent content and social presence across the season.',
    highlights: [
      { value: 'APL', label: 'Franchise' },
      { value: 'Social', label: 'Season-long' },
      { value: 'Video', label: '+ posts' },
    ],
    websites: [],
    logo: logoById['nellore-wolves'],
    website: null,
    instagram:
      'https://www.instagram.com/nellorewolvesofficial?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  },
  {
    slug: 'narenn-living',
    client: 'Narenn Living PG',
    category: 'Real estate / hospitality — premium PG (paying guest) accommodation',
    filterIds: ['real-estate', 'full-service'],
    oneLiner: '54-page SEO website plus full-funnel marketing driving PG bookings',
    goal:
      'Narenn Living, a premium luxury PG brand, needed a serious digital presence and lead pipeline to fill rooms consistently.',
    whatWeDid: [
      'Video editing',
      'Creatives and posters',
      'Meta ads management',
      'YouTube posting',
      'Built a 54-page website with full SEO',
      'Set up a telecalling team to connect and follow up with leads',
    ],
    result:
      'Increased bookings, supported by organic SEO traffic and a telecalling team converting leads.',
    highlights: [
      { value: '54', label: 'SEO pages' },
      { value: 'Ads', label: 'Meta + YouTube' },
      { value: '↑', label: 'Bookings' },
    ],
    websites: [
      {
        name: 'Narenn Living',
        href: 'https://narennliving.com',
        logo: logoById['narenn-living'],
      },
    ],
    logo: logoById['narenn-living'],
    website: 'narennliving.com',
    instagram: null,
  },
]

export function getCaseStudyBySlug(slug) {
  return portfolioCaseStudies.find((study) => study.slug === slug) ?? null
}

export function getPortfolioItemsFiltered(filterId = 'all') {
  if (!filterId || filterId === 'all') return portfolioCaseStudies
  return portfolioCaseStudies.filter((study) => study.filterIds.includes(filterId))
}

export function getCaseStudyPath(slug) {
  return `/portfolio/${slug}`
}

export { getClientWebsiteHref }
