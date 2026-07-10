import { motion } from 'framer-motion'
import SmoothThreeDButton from '../framer/smooth_three_d_button.jsx'
import {
  contactDetails,
  contactEmail,
  contactIntro,
  getContactWhatsAppHref,
} from '../data/contact'

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

const whatsappHref = getContactWhatsAppHref()
const emailHref = `mailto:${contactEmail}`

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white font-sans">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,69,255,0.08),_transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80"
          >
            {contactIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            {contactIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary/65 sm:text-lg"
          >
            {contactIntro.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:gap-5"
        >
          <motion.div variants={fadeUp}>
            <SmoothThreeDButton
              text="Start a project"
              link={whatsappHref}
              openInNewTab
              variant="primary"
              buttonWidth={240}
              buttonHeight={64}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <SmoothThreeDButton
              text="Email us"
              link={emailHref}
              variant="secondary"
              buttonWidth={200}
              buttonHeight={64}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto mt-14 max-w-4xl border-t border-blue/10 pt-10 sm:mt-16 sm:pt-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue/70"
          >
            Reach us directly
          </motion.p>

          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {contactDetails.map((item) => (
              <motion.li key={item.label} variants={fadeUp} className="text-center">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-blue/70">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="mt-2 block text-sm font-semibold text-primary transition hover:text-blue sm:text-[0.95rem]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-primary sm:text-[0.95rem]">
                    {item.value}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
