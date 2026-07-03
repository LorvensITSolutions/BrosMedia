import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import Services from '../components/Services'
import ClientsTeaser from '../components/ClientsTeaser'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import IndustriesStrip from '../components/IndustriesStrip'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <IndustriesStrip />
      <ClientsTeaser />
      <Testimonials />
      <ContactSection />
    </>
  )
}
