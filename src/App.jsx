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
          <Route path="/services" element={<Navigate to={routes.services} replace />} />
          <Route path="/about" element={<Navigate to={routes.about} replace />} />
          <Route path="/our-work" element={<Navigate to={routes.portfolio} replace />} />
          <Route path="/industries" element={<Navigate to={routes.industries} replace />} />
          <Route path="/contact" element={<Navigate to={routes.contact} replace />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
