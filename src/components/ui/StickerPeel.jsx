import { useEffect, useId, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import './StickerPeel.css'

gsap.registerPlugin(Draggable, InertiaPlugin)

export default function StickerPeel({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = 'power3.out',
  peelHoverEasing = 'power2.out',
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = 'center',
  peelDirection = 0,
  className = '',
}) {
  const reactId = useId().replace(/:/g, '')
  const filterIds = useMemo(
    () => ({
      pointLight: `pointLight-${reactId}`,
      pointLightFlipped: `pointLightFlipped-${reactId}`,
      dropShadow: `dropShadow-${reactId}`,
      expandAndFill: `expandAndFill-${reactId}`,
    }),
    [reactId],
  )

  const containerRef = useRef(null)
  const dragTargetRef = useRef(null)
  const pointLightRef = useRef(null)
  const pointLightFlippedRef = useRef(null)
  const draggableInstanceRef = useRef(null)

  const defaultPadding = 10

  useEffect(() => {
    const target = dragTargetRef.current
    if (!target) return

    const boundsEl = target.parentNode
    if (!boundsEl) return

    const place = () => {
      const boundsRect = boundsEl.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      let startX = 0
      let startY = 0

      if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {
        startX = initialPosition.x
        startY = initialPosition.y
      } else if (initialPosition === 'top-left') {
        startX = 12
        startY = 12
      } else if (initialPosition === 'top-right') {
        startX = Math.max(12, boundsRect.width - targetRect.width - 12)
        startY = 12
      } else if (initialPosition === 'bottom-left') {
        startX = 12
        startY = Math.max(12, boundsRect.height - targetRect.height - 12)
      } else if (initialPosition === 'bottom-right') {
        startX = Math.max(12, boundsRect.width - targetRect.width - 12)
        startY = Math.max(12, boundsRect.height - targetRect.height - 12)
      } else {
        startX = Math.max(0, (boundsRect.width - targetRect.width) / 2)
        startY = Math.max(0, (boundsRect.height - targetRect.height) / 2)
      }

      gsap.set(target, { x: startX, y: startY })
    }

    place()
    const raf = requestAnimationFrame(place)
    return () => cancelAnimationFrame(raf)
  }, [initialPosition, width])

  useEffect(() => {
    const target = dragTargetRef.current
    if (!target) return
    const boundsEl = target.parentNode

    draggableInstanceRef.current = Draggable.create(target, {
      type: 'x,y',
      bounds: boundsEl,
      inertia: true,
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4)
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' })
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.8, ease: 'power2.out' })
      },
    })[0]

    const handleResize = () => {
      if (!draggableInstanceRef.current) return
      draggableInstanceRef.current.update()

      const currentX = gsap.getProperty(target, 'x')
      const currentY = gsap.getProperty(target, 'y')
      const boundsRect = boundsEl.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const maxX = Math.max(0, boundsRect.width - targetRect.width)
      const maxY = Math.max(0, boundsRect.height - targetRect.height)
      const newX = Math.max(0, Math.min(currentX, maxX))
      const newY = Math.max(0, Math.min(currentY, maxY))

      if (newX !== currentX || newY !== currentY) {
        gsap.to(target, {
          x: newX,
          y: newY,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill()
        draggableInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const updateLight = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.set(pointLightRef.current, { attr: { x, y } })

      const normalizedAngle = Math.abs(peelDirection % 360)
      if (normalizedAngle !== 180) {
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } })
      } else {
        gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } })
      }
    }

    const container = containerRef.current
    if (!container) return undefined
    container.addEventListener('mousemove', updateLight)
    return () => container.removeEventListener('mousemove', updateLight)
  }, [peelDirection])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const handleTouchStart = () => {
      container.classList.add('touch-active')
    }
    const handleTouchEnd = () => {
      container.classList.remove('touch-active')
    }

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])

  const cssVars = useMemo(
    () => ({
      '--sticker-rotate': `${rotate}deg`,
      '--sticker-p': `${defaultPadding}px`,
      '--sticker-peelback-hover': `${peelBackHoverPct}%`,
      '--sticker-peelback-active': `${peelBackActivePct}%`,
      '--sticker-peel-easing': peelEasing,
      '--sticker-peel-hover-easing': peelHoverEasing,
      '--sticker-width': `${width}px`,
      '--sticker-shadow-opacity': shadowIntensity,
      '--sticker-lighting-constant': lightingIntensity,
      '--peel-direction': `${peelDirection}deg`,
      '--sticker-point-light': `url(#${filterIds.pointLight})`,
      '--sticker-point-light-flipped': `url(#${filterIds.pointLightFlipped})`,
      '--sticker-drop-shadow': `url(#${filterIds.dropShadow})`,
      '--sticker-expand-fill': `url(#${filterIds.expandAndFill})`,
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection,
      filterIds,
    ],
  )

  return (
    <div className={`sticker-peel${className ? ` ${className}` : ''}`} ref={dragTargetRef} style={cssVars}>
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={filterIds.pointLight}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={filterIds.pointLightFlipped}>
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={filterIds.dropShadow}>
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id={filterIds.expandAndFill}>
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <img
              src={imageSrc}
              alt="BROSMEDIA"
              className="sticker-image"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div className="flap">
          <div className="flap-lighting">
            <img
              src={imageSrc}
              alt=""
              className="flap-image"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
