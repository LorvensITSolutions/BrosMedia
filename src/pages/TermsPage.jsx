import { useEffect } from 'react'
import LegalDocument from '../components/LegalDocument'
import { termsAndConditions } from '../data/legal'

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return <LegalDocument document={termsAndConditions} />
}
