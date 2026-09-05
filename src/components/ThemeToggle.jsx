import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { useTheme } from '../lib/ThemeProvider.jsx'

export default function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      className="theme-toggle"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <Lightbulb
        className="h-5 w-5"
        strokeWidth={2}
        fill={isLight ? 'currentColor' : 'none'}
      />
    </motion.button>
  )
}
