import { motion } from 'framer-motion'
import { TestimonialsProFromData } from '../framer/testimonials_pro.jsx'
import { testimonials, testimonialsIntro } from '../data/testimonials'

const viewport = { once: true, margin: '-80px' }

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-black font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        >
          <TestimonialsProFromData
            items={testimonials}
            intro={testimonialsIntro}
            repeat={2}
            badgeBackground="rgba(223, 255, 0, 0.08)"
            badgeBorder="rgba(223, 255, 0, 0.22)"
            badgeColor="rgba(223, 255, 0, 0.9)"
            titleColor="#ffffff"
            descriptionColor="rgba(255, 255, 255, 0.6)"
            cardBackground="#ffffff"
            quoteColor="#111111"
            nameColor="#111111"
            roleColor="rgba(17, 17, 17, 0.55)"
            fadecolor="#000000"
          />
        </motion.div>
      </div>
    </section>
  )
}
