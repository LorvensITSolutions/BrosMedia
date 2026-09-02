import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function isInRevealZone(element, threshold = 0.9) {
  const rect = element.getBoundingClientRect()
  return rect.top < window.innerHeight * threshold && rect.bottom > 0
}

export default function GsapScrollRevealText({
  text,
  className = '',
  as: Tag = 'p',
  baseOpacity = 0.2,
  revealOpacity = 1,
  scrub = false,
  start = 'top 88%',
  end = 'top 45%',
  stagger = 0.08,
}) {
  const containerRef = useRef(null)
  const words = text.trim().split(/\s+/)

  useGSAP(
    () => {
      const container = containerRef.current
      const spans = container?.querySelectorAll('[data-word]')
      if (!container || !spans?.length) return

      gsap.set(spans, { opacity: baseOpacity })

      const reveal = () => {
        gsap.to(spans, {
          opacity: revealOpacity,
          duration: 0.65,
          stagger,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      if (scrub) {
        gsap.fromTo(
          spans,
          { opacity: baseOpacity },
          {
            opacity: revealOpacity,
            ease: 'none',
            stagger,
            scrollTrigger: {
              trigger: container,
              start,
              end,
              scrub: typeof scrub === 'number' ? scrub : 1.2,
              invalidateOnRefresh: true,
            },
          },
        )
      } else {
        ScrollTrigger.create({
          trigger: container,
          start,
          onEnter: reveal,
          once: true,
          invalidateOnRefresh: true,
        })
      }

      if (isInRevealZone(container)) {
        reveal()
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    },
    { scope: containerRef, dependencies: [text, start, end, stagger, baseOpacity, revealOpacity, scrub] },
  )

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-word className="inline-block">
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
