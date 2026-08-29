import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import OurWorkPage from './pages/OurWorkPage'
import IndustriesPage from './pages/IndustriesPage'
import ContactPage from './pages/ContactPage'
import { routes } from './data/navigation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.services} element={<ServicesPage />} />
          <Route path={routes.about} element={<AboutPage />} />
          <Route path={routes.ourWork} element={<OurWorkPage />} />
          <Route path={routes.industries} element={<IndustriesPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
