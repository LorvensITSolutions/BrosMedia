import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../data/navigation'

/** Home-only floating shortcut to the portfolio page (same slot as theme bulb). */
export default function PortfolioShortcut() {
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      onClick={() => navigate(routes.portfolio)}
      aria-label="View portfolio"
      className="theme-toggle"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <Briefcase className="h-5 w-5" strokeWidth={2} />
    </motion.button>
  )
}
