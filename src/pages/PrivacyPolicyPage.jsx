import { useEffect } from 'react'
import LegalDocument from '../components/LegalDocument'
import { privacyPolicy } from '../data/legal'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return <LegalDocument document={privacyPolicy} />
}
