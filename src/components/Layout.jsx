import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Seo from './Seo'
import FloatMenu from '../framer/float_menu.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import PortfolioShortcut from './PortfolioShortcut.jsx'
import { useTheme } from '../lib/ThemeProvider.jsx'
import { routes, scrollToSection } from '../data/navigation'
import { seoPages } from '../data/seo'

/** Path-based section landing pages (also used in sitemap). */
const PATH_SECTION_HASH = {
  '/services': '#services',
  '/about': '#about',
  '/industries': '#industries',
  '/contact': '#contact',
}

function scrollToHash(hash) {
  return scrollToSection(hash || '#hero')
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const { theme } = useTheme()
  const pageSeo = seoPages[pathname] ?? seoPages.home
  const isPortfolio = pathname === routes.portfolio
  const isHome = pathname === routes.home
  const sectionHash = PATH_SECTION_HASH[pathname]

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      if (cancelled) return

      if (pathname === routes.home) {
        const ok = scrollToHash(hash)
        if (!ok && hash && hash !== '#hero') {
          window.setTimeout(() => {
            if (!cancelled) scrollToHash(hash)
          }, 120)
        }
        return
      }

      if (sectionHash) {
        const ok = scrollToSection(sectionHash)
        if (!ok) {
          window.setTimeout(() => {
            if (!cancelled) scrollToSection(sectionHash)
          }, 120)
        }
      }
    }, 60)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [pathname, hash, sectionHash])

  // Light/dark theme only applies on the portfolio page.
  useEffect(() => {
    const next = isPortfolio && theme === 'light' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
  }, [isPortfolio, theme])

  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-[var(--page-bg)] font-sans text-[var(--page-ink)]">
      <Seo title={pageSeo.title} description={pageSeo.description} path={pageSeo.path} />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatMenu />
      {isPortfolio ? <ThemeToggle /> : null}
      {isHome || sectionHash ? <PortfolioShortcut /> : null}
    </div>
  )
}
