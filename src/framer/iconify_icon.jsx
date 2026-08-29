// Vite port of Framer IconifyIcon
// https://framer.com/m/IconifyIcon-G2B5LC.js@y7jBXtvUSDVsqQO4GyjJ

import { useEffect, useMemo, useState } from 'react'

const ALLOWED_SVG_TAGS = new Set(
  [
    'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
    'text', 'tspan', 'defs', 'symbol', 'use', 'clipPath', 'mask', 'pattern',
    'linearGradient', 'radialGradient', 'stop', 'title', 'desc', 'style',
    'animate', 'animateTransform', 'animateMotion', 'set',
  ].map((tag) => tag.toLowerCase()),
)

const ALLOWED_SVG_ATTRS = new Set(
  [
    'xmlns', 'viewBox', 'width', 'height', 'fill', 'stroke', 'stroke-width',
    'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray',
    'stroke-dashoffset', 'stroke-opacity', 'fill-opacity', 'opacity', 'd', 'cx', 'cy',
    'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'points', 'transform',
    'clip-path', 'mask', 'id', 'class', 'gradientUnits', 'gradientTransform',
    'patternUnits', 'patternTransform', 'fx', 'fy', 'offset', 'stop-color',
    'stop-opacity', 'xlink:href', 'href', 'clipPathUnits', 'maskUnits', 'text-anchor',
    'dominant-baseline', 'font-size', 'font-family', 'letter-spacing', 'word-spacing',
    'preserveAspectRatio', 'style', 'attributename', 'type', 'values', 'keytimes',
    'dur', 'repeatcount', 'begin', 'calcmode', 'keysplines', 'additive', 'accumulate',
    'from', 'to', 'restart',
  ].map((attr) => attr.toLowerCase()),
)

function cleanNode(node) {
  if (!ALLOWED_SVG_TAGS.has(node.tagName.toLowerCase())) {
    node.parentNode?.removeChild(node)
    return
  }

  const attrsToRemove = []
  for (const attr of Array.from(node.attributes)) {
    const name = attr.name.toLowerCase()
    const value = attr.value.trim().toLowerCase()

    if (name.startsWith('on')) {
      attrsToRemove.push(attr.name)
      continue
    }
    if ((name === 'href' || name === 'xlink:href') && value.startsWith('http')) {
      attrsToRemove.push(attr.name)
      continue
    }
    if (value.startsWith('javascript:')) {
      attrsToRemove.push(attr.name)
      continue
    }
    if (!ALLOWED_SVG_ATTRS.has(name)) attrsToRemove.push(attr.name)
  }

  attrsToRemove.forEach((attr) => node.removeAttribute(attr))
  Array.from(node.children).forEach(cleanNode)
}

function sanitizeSvg(svgString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  if (doc.querySelector('parsererror')) return ''
  cleanNode(doc.documentElement)
  return doc.documentElement.outerHTML
}

function processSvg(svgString, color) {
  return svgString
    .replace(/<svg([^>]*)>/i, (match, attrs) => {
      const cleaned = attrs
        .replace(/\s*width="[^"]*"/gi, '')
        .replace(/\s*height="[^"]*"/gi, '')
        .replace(/\s*style="[^"]*"/gi, '')
      const colorStyle = `style="color: ${color}; width: 100%; height: 100%; display: block;"`
      return `<svg${cleaned} ${colorStyle}>`
    })
    .replace(/fill="currentColor"/gi, `fill="${color}"`)
    .replace(/stroke="currentColor"/gi, `stroke="${color}"`)
}

const cache = new Map()

function useIconify(iconName, color) {
  const [svg, setSvg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const safeName = typeof iconName === 'string' ? iconName.trim() : ''
    const [prefix, name] = safeName.split(':')

    if (!prefix || !name) {
      setLoading(false)
      setError(true)
      return undefined
    }

    const cacheKey = `${safeName}::${color}`
    if (cache.has(cacheKey)) {
      setSvg(cache.get(cacheKey))
      setLoading(false)
      setError(false)
      return undefined
    }

    setLoading(true)
    setError(false)

    fetch(`https://api.iconify.design/${prefix}/${name}.svg`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.text()
      })
      .then((raw) => {
        const sanitized = sanitizeSvg(raw)
        if (!sanitized) throw new Error('Invalid SVG')
        const processed = processSvg(sanitized, color)
        cache.set(cacheKey, processed)
        setSvg(processed)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })

    return undefined
  }, [iconName, color])

  return { svg, loading, error }
}

export default function IconifyIcon({
  iconName = 'mdi:home',
  color = '#000000',
  rotate = 0,
  flipHorizontal = false,
  flipVertical = false,
  style,
  className = '',
}) {
  const { svg, loading, error } = useIconify(iconName, color)

  const transform = useMemo(() => {
    const transforms = []
    if (rotate) transforms.push(`rotate(${rotate}deg)`)
    if (flipHorizontal) transforms.push('scaleX(-1)')
    if (flipVertical) transforms.push('scaleY(-1)')
    return transforms.length ? transforms.join(' ') : undefined
  }, [rotate, flipHorizontal, flipVertical])

  const fallbackStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...style,
  }

  if (loading) {
    return <div className={className} style={{ ...fallbackStyle, opacity: 0 }} aria-hidden />
  }

  if (error || !svg) {
    return <div className={className} style={{ ...fallbackStyle, opacity: 0 }} aria-hidden />
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        transform,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
