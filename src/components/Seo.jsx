import { useEffect } from 'react'
import {
  absoluteUrl,
  buildFaqSchema,
  buildOrganizationSchema,
  buildServiceListSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
  defaultDescription,
  defaultKeywords,
  defaultTitle,
  favicon,
  ogImage,
  siteName,
  siteUrl,
} from '../data/seo'

function upsertMeta(selector, attributes) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })
}

function upsertLink(rel, href, attributes = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo({
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  image = ogImage,
  noIndex = false,
}) {
  useEffect(() => {
    const url = absoluteUrl(path)
    const robots = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.title = title

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: defaultKeywords })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })
    upsertMeta('meta[name="googlebot"]', { name: 'googlebot', content: robots })
    upsertMeta('meta[name="author"]', { name: 'author', content: siteName })
    upsertMeta('meta[name="publisher"]', { name: 'publisher', content: siteName })
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#000000' })
    upsertMeta('meta[name="format-detection"]', {
      name: 'format-detection',
      content: 'telephone=yes',
    })
    upsertMeta('meta[name="geo.region"]', { name: 'geo.region', content: 'IN-TG' })
    upsertMeta('meta[name="geo.placename"]', {
      name: 'geo.placename',
      content: 'Jubilee Hills, Hyderabad',
    })
    upsertMeta('meta[name="geo.position"]', { name: 'geo.position', content: '17.4326;78.4071' })
    upsertMeta('meta[name="ICBM"]', { name: 'ICBM', content: '17.4326, 78.4071' })

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    upsertMeta('meta[property="og:image:secure_url"]', {
      property: 'og:image:secure_url',
      content: image,
    })
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' })
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' })
    upsertMeta('meta[property="og:image:type"]', {
      property: 'og:image:type',
      content: 'image/png',
    })
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: `${siteName} — Digital Marketing Agency in Hyderabad`,
    })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: 'twitter:image:alt',
      content: `${siteName} — Digital Marketing Agency in Hyderabad`,
    })

    upsertLink('canonical', url)
    upsertLink('icon', favicon, { type: 'image/png' })
    upsertLink('apple-touch-icon', favicon)
    upsertLink('author', `${siteUrl}/humans.txt`)
    upsertLink('sitemap', `${siteUrl}/sitemap.xml`, { type: 'application/xml' })

    upsertJsonLd('seo-organization', buildOrganizationSchema())
    upsertJsonLd('seo-website', buildWebsiteSchema())
    upsertJsonLd('seo-webpage', buildWebPageSchema({ title, description, path }))
    upsertJsonLd('seo-faq', buildFaqSchema())
    upsertJsonLd('seo-services', buildServiceListSchema())
  }, [title, description, path, image, noIndex])

  return null
}

export { siteUrl }
