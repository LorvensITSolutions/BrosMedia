import { lazy, Suspense } from 'react'
import PortfolioHero from '../components/portfolio/PortfolioHero.jsx'
import IconicIdentities from '../components/portfolio/IconicIdentities.jsx'
import FeaturedProjects from '../components/portfolio/FeaturedProjects.jsx'

const AboutOurWork = lazy(() => import('../components/portfolio/AboutOurWork.jsx'))
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
      </Suspense>
      <IconicIdentities />
      <FeaturedProjects />
      <Suspense fallback={<SectionFallback />}>
        <PosterDesigns />
        <SocialPresence />
      </Suspense>
    </>
  )
}
