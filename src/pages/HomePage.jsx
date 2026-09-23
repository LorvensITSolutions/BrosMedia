import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'

const WorkStreamSection = lazy(() => import('../components/WorkStreamSection'))
const ReelsWorkSection = lazy(() => import('../components/ReelsWorkSection'))
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
      <Suspense fallback={<SectionFallback minHeight="50vh" />}>
        <WorkStreamSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="56vh" />}>
        <ReelsWorkSection />
      </Suspense>
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
