import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { comingSoonPages, routes } from '../data/navigation'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }

export default function ComingSoonPage() {
  const { pathname } = useLocation()
  const page = comingSoonPages[pathname] ?? {
    title: 'Page',
    description: 'This page is under construction. Check back soon.',
  }

  return (
    <section className="flex min-h-[calc(100vh-var(--navbar-height))] items-center bg-gradient-to-b from-accent/5 via-white to-white font-sans">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80"
        >
          Coming Soon
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.06 }}
          className="mt-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl"
        >
          {page.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.12 }}
          className="mt-5 text-base leading-relaxed text-primary/70 sm:text-lg"
        >
          {page.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.18 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to={routes.home}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Back to Home
          </Link>
          <Link
            to={routes.contact}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#141414] px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent/30 hover:text-accent"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
