/**
 * Build-time SEO prerender (no Puppeteer / no SSR rewrite).
 * Injects crawlable HTML into dist/*.html so bots see real content
 * before React boots. React replaces #root on mount as usual.
 *
 * Content is inlined here so Node can run without Vite's extensionless imports.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')
const siteUrl = 'https://brosmedia.in'

const pages = {
  home: {
    title: 'Brosmedia | Digital Marketing Agency in Hyderabad',
    description:
      'Brosmedia is a digital marketing agency in Hyderabad offering branding, websites, social media, Meta ads, and creative production for growing businesses across India.',
    path: '/',
  },
  portfolio: {
    title: 'Portfolio | Brosmedia Clients & Projects',
    description:
      "See Brosmedia's client portfolio — real estate, healthcare, sports, fashion, and more. Branding, websites, social media, and Meta ads from Hyderabad.",
    path: '/portfolio',
  },
  services: {
    title: 'Services | Brosmedia Digital Marketing Agency',
    description:
      'Branding, marketing, websites, and business consulting from Brosmedia — end-to-end digital services for growing brands in Hyderabad and across India.',
    path: '/services',
  },
  about: {
    title: 'About Brosmedia | Digital Marketing Agency in Hyderabad',
    description:
      'Meet Brosmedia — a Hyderabad-based digital marketing agency building brands with strategy, design, websites, and performance marketing.',
    path: '/about',
  },
  industries: {
    title: 'Industries | Brosmedia Digital Marketing Expertise',
    description:
      'Brosmedia works across real estate, healthcare, fashion, and more — industry-focused branding and digital marketing from Hyderabad.',
    path: '/industries',
  },
  contact: {
    title: 'Contact Brosmedia | Start a Project',
    description:
      'Get in touch with Brosmedia in Jubilee Hills, Hyderabad. Tell us about your brand — we will reply with clear next steps.',
    path: '/contact',
  },
  ourWork: {
    title: 'Our Work | Brosmedia Case Studies & Projects',
    description:
      "Explore Brosmedia's work across branding, websites, social media, Meta ads, and creative production for clients in India and beyond.",
    path: '/our-work',
  },
}

const services = [
  {
    name: 'Branding',
    summary:
      'Positioning, naming, visual identity, and brand systems that make your business look credible - and memorable - from day one.',
  },
  {
    name: 'Marketing',
    summary:
      'Paid media, social management, and creative campaigns that keep your brand visible - and your pipeline active.',
  },
  {
    name: 'Websites & Portals',
    summary:
      'Responsive websites and digital portals designed to convert - polished on desktop, fast on mobile, built for real users.',
  },
  {
    name: 'Business Consulting',
    summary:
      'Hands-on strategy and consulting to align your brand, marketing, and growth goals - with clear direction and practical next steps.',
  },
]

const industries = [
  { industry: 'Real estate', proof: 'Campaign systems that turn curiosity into site visits' },
  { industry: 'Sports franchises', proof: 'New APL teams branded and launched from day one' },
  { industry: 'Hospitality', proof: 'SEO sites + ads + telecalling that fill beds' },
  { industry: 'Healthcare', proof: 'Clinic brands and sites built for trust + bookings' },
  { industry: 'Fashion & retail', proof: 'Premium presence that grows online enquiries' },
  { industry: 'NGO & public', proof: 'Clear identity and content that builds credibility' },
]

const talkPoints = [
  {
    title: 'How we start',
    body: 'A WhatsApp or a booked strategy call is enough. We spend 30 minutes on your brand, goals, and constraints - no pitch deck theatre, no commitment required.',
  },
  {
    title: 'Small businesses welcome',
    body: 'Most of our clients are growing brands, not mega-corps. What matters is whether you are serious about the brand - not how big the retainer looks on day one.',
  },
  {
    title: 'Hyderabad-based, India-ready',
    body: 'We work from Jubilee Hills and deliver remotely across India. Strategy calls, creatives, websites, and ads all run without needing you in the room.',
  },
  {
    title: 'Projects and retainers',
    body: 'Branding, websites, and brochures are quoted per project. Social, ads, and ongoing content run on monthly retainers - clear scope, no fuzzy minimum months traps.',
  },
  {
    title: 'All work in-house',
    body: 'Design, development, video, content, and ads stay with our team. You deal with one crew that owns the outcome.',
  },
]

const clients = [
  'Narenn Living',
  'Nellore Wolves',
  'Vizag Seahawks',
  'MB Prime Projects',
  'AMVI Foods',
  'GoClean Foundation',
  'Sasha Clinic Group',
  'Zarivaram',
  'Dista USA',
  'Andhra Machines',
  'Viqantai',
]

const address = '1st Floor, Road No. 86, Jubilee Hills, Hyderabad, Telangana 500096'
const phone = '+91 70138 14030'
const phoneHref = '+917013814030'
const email = 'info@brosmedia.in'

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function listItems(items, mapFn) {
  return `<ul>${items.map((item) => `<li>${mapFn(item)}</li>`).join('')}</ul>`
}

function navHtml() {
  return `<nav aria-label="Primary">
    <ul>
      <li><a href="${siteUrl}/">Home</a></li>
      <li><a href="${siteUrl}/services">Services</a></li>
      <li><a href="${siteUrl}/about">About</a></li>
      <li><a href="${siteUrl}/portfolio">Portfolio</a></li>
      <li><a href="${siteUrl}/industries">Industries</a></li>
      <li><a href="${siteUrl}/contact">Contact</a></li>
    </ul>
  </nav>`
}

function wrapArticle(inner) {
  // Kept in the HTML for crawlers; visually hidden via critical CSS (#seo-static).
  return `<article id="seo-prerender">${navHtml()}${inner}</article>`
}

function homeBody() {
  return wrapArticle(`
  <header>
    <p>Digital marketing agency in Hyderabad</p>
    <h1>Brosmedia — branding, websites, social media &amp; Meta ads</h1>
    <p>${escapeHtml(pages.home.description)}</p>
    <p>We've built 12+ brands across sports, real estate, fashion, and healthcare — from zero to unforgettable.</p>
    <p>
      <a href="https://wa.me/917013814030">Book a free strategy call</a>
      · <a href="mailto:${email}">Email ${email}</a>
      · <a href="${siteUrl}/portfolio">View portfolio</a>
    </p>
  </header>
  <section aria-labelledby="seo-services">
    <h2 id="seo-services">Everything your brand needs to grow</h2>
    <p>From strategy and identity to websites, content, and campaigns — end-to-end brand and marketing services built around your business goals.</p>
    ${listItems(services, (s) => `<strong>${escapeHtml(s.name)}</strong>: ${escapeHtml(s.summary)}`)}
  </section>
  <section aria-labelledby="seo-industries">
    <h2 id="seo-industries">Work across sectors that need attention</h2>
    ${listItems(industries, (i) => `<strong>${escapeHtml(i.industry)}</strong> — ${escapeHtml(i.proof)}`)}
  </section>
  <section aria-labelledby="seo-work">
    <h2 id="seo-work">Real brands. Real work. Real results.</h2>
    <p>From hospitality brands in Hyderabad to pickleball and professional sports teams — plus real estate, healthcare, fashion, and NGOs.</p>
    <p>Clients include: ${escapeHtml(clients.join(', '))}.</p>
    <p><a href="${siteUrl}/portfolio">See full portfolio</a></p>
  </section>
  <section aria-labelledby="seo-faq">
    <h2 id="seo-faq">About working with Brosmedia</h2>
    ${listItems(talkPoints, (p) => `<strong>${escapeHtml(p.title)}</strong>: ${escapeHtml(p.body)}`)}
  </section>
  <section aria-labelledby="seo-contact">
    <h2 id="seo-contact">Let's build something great together</h2>
    <address>
      ${escapeHtml(address)}<br />
      <a href="tel:${phoneHref}">${escapeHtml(phone)}</a><br />
      <a href="mailto:${email}">${escapeHtml(email)}</a>
    </address>
  </section>`)
}

function portfolioBody() {
  return wrapArticle(`
  <header>
    <p>Portfolio</p>
    <h1>Real brands. Real work. Real results.</h1>
    <p>${escapeHtml(pages.portfolio.description)}</p>
  </header>
  <section>
    <h2>About our work</h2>
    <p>At <strong>Brosmedia</strong>, we are growth partners for brands that want to thrive online — combining design, technology, and marketing for measurable results.</p>
    <p>Our portfolio spans hospitality, sports, real estate, healthcare, fashion, and NGOs across India.</p>
  </section>
  <section>
    <h2>Selected clients</h2>
    ${listItems(clients, (name) => `<strong>${escapeHtml(name)}</strong>`)}
  </section>
  <p><a href="${siteUrl}/contact">Start a project with Brosmedia</a></p>`)
}

function sectionBody(title, description, sectionsHtml) {
  return wrapArticle(`
  <header>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
  </header>
  ${sectionsHtml}
  <p><a href="${siteUrl}/">Home</a> · <a href="${siteUrl}/portfolio">Portfolio</a> · <a href="${siteUrl}/contact">Contact</a></p>`)
}

const SEO_HIDE_STYLE = `<style id="seo-static-hide">html,body{background:#000;margin:0}#root{min-height:100vh;background:#000}#seo-static{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}</style>`

function ensureCriticalCss(html) {
  if (html.includes('id="seo-static-hide"')) return html
  return html.replace('</head>', `    ${SEO_HIDE_STYLE}\n  </head>`)
}

function injectRoot(html, body) {
  let next = ensureCriticalCss(html)

  // Prefer a dedicated SEO node outside #root so React never flashes it.
  if (next.includes('id="seo-static"')) {
    return next.replace(
      /<div id="seo-static">[\s\S]*?<\/div>(\s*)<div id="root">/,
      `<div id="seo-static">${body}</div>$1<div id="root">`,
    )
  }

  // Migrate older builds that injected into #root.
  if (next.includes('<!--seo-prerender-start-->')) {
    next = next.replace(
      /<div id="root"><!--seo-prerender-start-->[\s\S]*?<!--seo-prerender-end--><\/div>/,
      `<div id="seo-static">${body}</div>\n    <div id="root"></div>`,
    )
    return next
  }

  if (next.includes('<div id="root"></div>')) {
    return next.replace(
      '<div id="root"></div>',
      `<div id="seo-static">${body}</div>\n    <div id="root"></div>`,
    )
  }

  throw new Error('[seo-prerender] Could not find #root in HTML template')
}

function applyPageMeta(html, page) {
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const canonical =
    !page.path || page.path === '/' ? `${siteUrl}/` : `${siteUrl}${page.path}`

  let next = html
  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  )
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`,
  )
  return next
}

function writeRoute(templateHtml, routePath, page, body) {
  let html = applyPageMeta(templateHtml, page)
  html = injectRoot(html, body)

  if (routePath === '/') {
    fs.writeFileSync(indexPath, html)
    return indexPath
  }

  const outDir = path.join(distDir, routePath.replace(/^\//, ''))
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, 'index.html')
  fs.writeFileSync(outFile, html)
  return outFile
}

function main() {
  if (!fs.existsSync(indexPath)) {
    console.error('[seo-prerender] dist/index.html missing — run vite build first')
    process.exit(1)
  }

  const templateHtml = fs.readFileSync(indexPath, 'utf8')

  const servicesBlock = `<section><h2>Our services</h2>${listItems(
    services,
    (s) => `<strong>${escapeHtml(s.name)}</strong>: ${escapeHtml(s.summary)}`,
  )}</section>`

  const industriesBlock = `<section><h2>Industries we serve</h2>${listItems(
    industries,
    (i) => `<strong>${escapeHtml(i.industry)}</strong> — ${escapeHtml(i.proof)}`,
  )}</section>`

  const aboutBlock = `<section><h2>About Brosmedia</h2><p>${escapeHtml(pages.about.description)}</p><p>Office: ${escapeHtml(address)}</p></section>`

  const contactBlock = `<section><h2>Contact</h2><address>${escapeHtml(address)}<br /><a href="tel:${phoneHref}">${escapeHtml(phone)}</a><br /><a href="mailto:${email}">${escapeHtml(email)}</a></address></section>`

  const written = [
    writeRoute(templateHtml, '/', pages.home, homeBody()),
    writeRoute(templateHtml, '/portfolio', pages.portfolio, portfolioBody()),
    writeRoute(
      templateHtml,
      '/services',
      pages.services,
      sectionBody(pages.services.title, pages.services.description, servicesBlock),
    ),
    writeRoute(
      templateHtml,
      '/about',
      pages.about,
      sectionBody(pages.about.title, pages.about.description, aboutBlock),
    ),
    writeRoute(
      templateHtml,
      '/industries',
      pages.industries,
      sectionBody(pages.industries.title, pages.industries.description, industriesBlock),
    ),
    writeRoute(
      templateHtml,
      '/contact',
      pages.contact,
      sectionBody(pages.contact.title, pages.contact.description, contactBlock),
    ),
    writeRoute(
      templateHtml,
      '/our-work',
      pages.ourWork,
      sectionBody(
        pages.ourWork.title,
        pages.ourWork.description,
        `<section><h2>Our work</h2><p>Clients include: ${escapeHtml(clients.join(', '))}.</p><p><a href="${siteUrl}/portfolio">Open full portfolio</a></p></section>`,
      ),
    ),
  ]

  console.log('[seo-prerender] Wrote crawlable HTML for:')
  for (const file of written) console.log(`  - ${path.relative(distDir, file)}`)
}

main()
