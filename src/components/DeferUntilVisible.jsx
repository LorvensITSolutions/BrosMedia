import { useEffect, useRef, useState } from 'react'

/**
 * Renders children only after the placeholder enters (near) the viewport.
 * Keeps heavy media sections from downloading until needed.
 */
export default function DeferUntilVisible({
  children,
  rootMargin = '200px 0px',
  minHeight = '40vh',
  className = '',
  fallback = null,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (visible) return undefined
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  if (visible) return children

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight }}
      aria-hidden={fallback ? undefined : true}
    >
      {fallback}
    </div>
  )
}
