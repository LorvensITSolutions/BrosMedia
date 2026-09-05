import AboutOurWork from '../components/portfolio/AboutOurWork.jsx'
import FeaturedProjects from '../components/portfolio/FeaturedProjects.jsx'
import IconicIdentities from '../components/portfolio/IconicIdentities.jsx'
import PortfolioHero from '../components/portfolio/PortfolioHero.jsx'
import PosterDesigns from '../components/portfolio/PosterDesigns.jsx'
import SocialPresence from '../components/portfolio/SocialPresence.jsx'

export default function PortfolioPage() {
  const scrollToAbout = () => {
    const el = document.getElementById('about-us')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <PortfolioHero onExplore={scrollToAbout} />
      <AboutOurWork />
      <IconicIdentities />
      <FeaturedProjects />
      <PosterDesigns />
      <SocialPresence />
    </>
  )
}
