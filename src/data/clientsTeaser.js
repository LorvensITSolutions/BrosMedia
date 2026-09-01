import { featuredClients, toClientTeaserItem } from './featuredClients'

export const clientsTeaserIntro = {
  label: 'Clients Teaser',
  headline: 'Brands that trusted us',
  description:
    'From PG and co-living spaces in Hyderabad to pickleball and professional sports teams - plus real estate, healthcare, education, fashion, food exports, and tech brands we have built for.',
}

const legacyClientsTeaser = [
  {
    name: 'MB Prime Projects',
    url: 'https://mbprimeprojects.com/projects/mb-prime-villas',
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134726/sklmlogo_c2trtg_cndghd.png',
  },
  {
    name: 'Sasha Smiles',
    url: 'https://sashasmiles.com',
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_20_32_AM_e1ot2u_kc47qk.png',
  },
  {
    name: 'Sasha Slimming',
    url: 'https://sashaslimming.com',
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_22_29_AM_q09vhf_we6pis.png',
  },
  
  {
    name: 'Zarivaram',
    url: 'https://zarivaram.vercel.app',
    logo: 'https://res.cloudinary.com/dvnplfu6z/image/upload/v1776921469/logo_1_rwdv9g.png',
  },
  {
    name: 'Andhra Machines',
    url: 'https://andhramachinesagencies.com',
    logo: 'https://res.cloudinary.com/durbtkhbz/image/upload/v1765255577/logo_sewing_td6tcf.png',
  },
  { name: 'AMVI Foods', url: 'https://amvifoods.com', logo: 'https://res.cloudinary.com/dnvpasppl/image/upload/v1773392136/Screenshot_2026-03-04_114703-removebg-preview_a5xoie.png' },
  { name: 'Dista USA', logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134932/Dista_Logo_1_l0kgvo.png' },
  { name: 'Viqantai', logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782133985/ViQant_Logo_bfy9f3.png' },
  {
    name: 'Lumiere Luxe',
    url: 'https://lumiereluxe.in',
    logo: 'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134725/ChatGPT_Image_Dec_8_2025_10_15_15_AM_ghors1_iwrplf.png',
  },
  
]

export const clientsTeaser = [
  ...featuredClients.map(toClientTeaserItem),
  ...legacyClientsTeaser,
]
