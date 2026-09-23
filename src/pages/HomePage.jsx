import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import WorkStreamSection from '../components/WorkStreamSection'
import ReelsWorkSection from '../components/ReelsWorkSection'

const StatsBar = lazy(() => import('../components/StatsBar'))
const About = lazy(() => import('../components/About'))
const FounderNote = lazy(() => import('../components/FounderNote'))
const TeamSection = lazy(() => import('../components/TeamSection'))
const FeaturedCaseStudy = lazy(() => import('../components/FeaturedCaseStudy'))
const Services = lazy(() => import('../components/Services'))
const ClientsTeaser = lazy(() => import('../components/ClientsTeaser'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const ContactSection = lazy(() => import('../components/ContactSection'))

function SectionFallback({ minHeight = '36vh' }) {
  return <div className="w-full bg-black" style={{ minHeight }} aria-hidden />
}

export default function HomePage() {
  return (
    <>
      <div className="relative overflow-x-hidden">
        <Hero />
      </div>
      {/* Load immediately so creative images start fetching with first paint */}
      <WorkStreamSection />
      <ReelsWorkSection />
      <Suspense fallback={<SectionFallback minHeight="28vh" />}>
        <StatsBar />
        <About />
        <FounderNote />
        <TeamSection />
        <FeaturedCaseStudy />
        <Services />
        <ClientsTeaser />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </Suspense>
    </>
  )
}
