import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Seo from './Seo'
import { seoPages } from '../data/seo'

function scrollToHash(hash) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const pageSeo = seoPages.home

  useEffect(() => {
    // Allow the home page to paint before scrolling to a section
    const timer = window.setTimeout(() => scrollToHash(hash), 50)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Seo title={pageSeo.title} description={pageSeo.description} path={pageSeo.path} />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
