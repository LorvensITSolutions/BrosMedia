import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmoothThreeDButton from '../framer/smooth_three_d_button.jsx'
import { contactDetails, contactIntro } from '../data/contact'
import { routes } from '../data/navigation'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

export default function ContactSection() {
  return (
    <section id="contact" className="bg-black font-sans">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8 lg:pb-24 lg:pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-[#141414] px-6 py-10 sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-12 lg:py-14"
        >
          <div className="text-center">
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/85"
            >
              {contactIntro.label}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {contactIntro.headline}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {contactIntro.description}
            </motion.p>
          </div>

          <motion.ul
            variants={stagger}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {contactDetails.map((item) => (
              <motion.li
                key={item.label}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent/75">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 block text-sm font-semibold text-white transition hover:text-accent sm:text-base"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">{item.value}</p>
                )}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-5 sm:mt-12 sm:flex-row sm:gap-6"
          >
            <SmoothThreeDButton
              text="Start a project"
              link={routes.contact}
              variant="primary"
              buttonWidth={240}
              buttonHeight={64}
            />
            <SmoothThreeDButton
              text="Email us"
              link="mailto:hello@brosmedia.com"
              variant="secondary"
              buttonWidth={200}
              buttonHeight={64}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 text-center text-sm text-white/40">
            Prefer the full contact page?{' '}
            <Link to={routes.contact} className="font-semibold text-white/70 transition hover:text-accent">
              Go to contact →
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
