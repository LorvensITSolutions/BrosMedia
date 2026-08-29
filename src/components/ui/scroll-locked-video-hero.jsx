import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Scroll-locked video hero.
 * Sticky viewport scrubs the video as the user scrolls through `scrubDistance`.
 * Scroll / lock math should stay intact — customize via props only.
 */
export function ScrollLockedVideoHero({
  title = 'BROS MEDIA',
  tagline = '',
  scrollHint = 'SCROLL',
  signature,
  scrubDistance = 2800,
  videoSrc = '/videos/brosmedia-reel.mp4',
  badge,
  className,
  ...props
}) {
  const sectionRef = React.useRef(null)
  const videoRef = React.useRef(null)
  const rafRef = React.useRef(0)
  const [progress, setProgress] = React.useState(0)
  const [ready, setReady] = React.useState(false)

  const updateProgress = React.useCallback(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const total = Math.max(section.offsetHeight - window.innerHeight, 1)
    const scrolled = Math.min(Math.max(-rect.top, 0), total)
    const next = scrolled / total
    setProgress(next)

    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const t = next * video.duration
      if (Math.abs(video.currentTime - t) > 0.04) {
        try {
          video.currentTime = t
        } catch {
          // Ignore seek errors while metadata is still settling.
        }
      }
    }
  }, [])

  React.useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [updateProgress])

  const titleParts = React.useMemo(() => {
    const cleaned = title.trim()
    if (cleaned.includes(' ')) {
      const [first, ...rest] = cleaned.split(/\s+/)
      return { first, second: rest.join(' ') }
    }
    return { first: cleaned, second: '' }
  }, [title])

  return (
    <section
      ref={sectionRef}
      aria-label={`${title} video hero`}
      className={cn('relative bg-black', className)}
      style={{ height: scrubDistance }}
      {...props}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden
          onLoadedMetadata={() => {
            setReady(true)
            updateProgress()
          }}
        />

        {/* Dark overlays for title contrast — keep approach, brand accent only on chrome */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 pb-10 pt-[calc(var(--navbar-height)+1.5rem)] sm:pb-12 sm:pt-[calc(var(--navbar-height)+2rem)]">
          <div className="flex flex-col items-center gap-4 text-center">
            {badge ? (
              <span className="rounded-full border border-accent/40 bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                {badge}
              </span>
            ) : null}

            <h2 className="flex flex-wrap items-baseline justify-center gap-3 text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-none tracking-tight text-white sm:gap-4">
              <span>{titleParts.first}</span>
              {titleParts.second ? <span className="text-accent">{titleParts.second}</span> : null}
            </h2>

            {tagline ? (
              <p className="max-w-xl text-balance text-sm leading-relaxed text-white/75 sm:text-base">
                {tagline}
              </p>
            ) : null}
          </div>

          <div className="flex w-full max-w-lg flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]">
                {scrollHint}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="animate-bounce text-accent"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full origin-left rounded-full bg-accent transition-[width] duration-75 ease-out"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div className="flex w-full items-center justify-between text-[0.65rem] uppercase tracking-[0.18em] text-white/45">
              <span>{ready ? `${Math.round(progress * 100)}%` : 'Loading'}</span>
              {signature?.name ? (
                signature.url ? (
                  <a
                    href={signature.url}
                    className="pointer-events-auto text-white/70 transition hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {signature.name}
                  </a>
                ) : (
                  <span>{signature.name}</span>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollLockedVideoHero
