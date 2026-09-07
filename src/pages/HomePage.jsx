import Hero from '../components/Hero'
import WorkStreamSection from '../components/WorkStreamSection'
import ReelsWorkSection from '../components/ReelsWorkSection'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import FounderNote from '../components/FounderNote'
import TeamSection from '../components/TeamSection'
import FeaturedCaseStudy from '../components/FeaturedCaseStudy'
import Services from '../components/Services'
import ClientsTeaser from '../components/ClientsTeaser'
import Testimonials from '../components/Testimonials'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'
import IndustriesStrip from '../components/IndustriesStrip'

export default function HomePage() {
  return (
    <>
      <div className="relative overflow-x-hidden">
        <Hero />
      </div>
      <WorkStreamSection />
      <ReelsWorkSection />
      <StatsBar />
      <About />
      <FounderNote />
      <TeamSection />
      <FeaturedCaseStudy />
      <Services />
      <IndustriesStrip />
      <ClientsTeaser />
      <Testimonials />
      <FaqSection />
      <ContactSection />
    </>
  )
}
