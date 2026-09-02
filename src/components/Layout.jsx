import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Seo from './Seo'
import FloatMenu from '../framer/float_menu.jsx'
import { seoPages } from '../data/seo'
import { scrollToSection } from '../data/navigation'

function scrollToHash(hash) {
  scrollToSection(hash || '#hero')
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const pageSeo = seoPages[pathname] ?? seoPages.home

  useEffect(() => {
    const timer = window.setTimeout(() => scrollToHash(hash), 50)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-sans text-white">
      <Seo title={pageSeo.title} description={pageSeo.description} path={pageSeo.path} />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatMenu />
    </div>
  )
}
