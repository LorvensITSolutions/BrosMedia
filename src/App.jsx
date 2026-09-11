import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import { routes } from './data/navigation'

const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<HomePage />} />
          <Route
            path={routes.portfolio}
            element={
              <Suspense fallback={<div className="min-h-[50vh] bg-[var(--page-bg)]" aria-hidden />}>
                <PortfolioPage />
              </Suspense>
            }
          />
          {/* Section URLs stay on HomePage so crawlers + users get real content at these paths */}
          <Route path="/services" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/industries" element={<HomePage />} />
          <Route path="/contact" element={<HomePage />} />
          <Route path="/our-work" element={<Navigate to={routes.portfolio} replace />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
