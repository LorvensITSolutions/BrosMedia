import { lazy, Suspense } from 'react'
import PortfolioHero from '../components/portfolio/PortfolioHero.jsx'

const AboutOurWork = lazy(() => import('../components/portfolio/AboutOurWork.jsx'))
const IconicIdentities = lazy(() => import('../components/portfolio/IconicIdentities.jsx'))
const FeaturedProjects = lazy(() => import('../components/portfolio/FeaturedProjects.jsx'))
const PosterDesigns = lazy(() => import('../components/portfolio/PosterDesigns.jsx'))
const SocialPresence = lazy(() => import('../components/portfolio/SocialPresence.jsx'))

function SectionFallback() {
  return <div className="min-h-[32vh] w-full bg-[var(--page-bg)]" aria-hidden />
}

export default function PortfolioPage() {
  const scrollToAbout = () => {
    const el = document.getElementById('about-us')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <PortfolioHero onExplore={scrollToAbout} />
      <Suspense fallback={<SectionFallback />}>
        <AboutOurWork />
        <IconicIdentities />
        <FeaturedProjects />
        <PosterDesigns />
        <SocialPresence />
      </Suspense>
    </>
  )
}
