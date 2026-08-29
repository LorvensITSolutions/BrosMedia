import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import LetterSwap from '../framer/letter_swap.jsx'
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
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}

const whatsappHref = getContactWhatsAppHref()
const emailHref = `mailto:${contactEmail}`

const CARD_ICONS = {
  WhatsApp: MessageCircle,
  Email: Mail,
  Location: MapPin,
  'Working hours': Clock,
}

function ContactCard({ item }) {
  const Icon = CARD_ICONS[item.label] ?? Mail
  const content = (
    <>
      <motion.span
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent"
        whileHover={{ scale: 1.08, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </motion.span>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">
        {item.label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-white sm:text-[0.95rem]">
        {item.value}
      </p>
      {item.href && (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent/70 transition group-hover:text-accent">
          Open
          <span aria-hidden>→</span>
        </span>
      )}
    </>
  )

  const cardClass =
    'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/30 hover:bg-white/[0.05] sm:p-7'

  return (
    <motion.li variants={fadeUp}>
      {item.href ? (
        <motion.a
          href={item.href}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cardClass}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <span
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,69,255,0.12),transparent_55%)] opacity-0 transition group-hover:opacity-100"
            aria-hidden
          />
          <span className="relative">{content}</span>
        </motion.a>
      ) : (
        <motion.div
          className={cardClass}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          {content}
        </motion.div>
      )}
    </motion.li>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,69,255,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(223,255,0,0.07),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="lg:sticky lg:top-[calc(var(--navbar-height)+2rem)]"
          >
            <motion.div variants={fadeUp}>
              <LetterSwap
                text={contactIntro.label.toUpperCase()}
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                color="rgba(223,255,0,0.85)"
                hoverColor="#dfff00"
                variant="pingPong"
                direction="up"
              />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {contactIntro.headline}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {contactIntro.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <EyeFollowButton
                text="Start a project"
                link={whatsappHref}
                openInNewTab
                buttonColor="#dfff00"
                hoverColor="#ffffff"
                textColor="#000000"
                pupilColor="#000000"
                eyeColor="#ffffff"
              />
              <SmoothThreeDButton
                text="Email us"
                link={emailHref}
                variant="secondary"
                buttonWidth={200}
                buttonHeight={64}
              />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-sm text-white/40">
              We typically reply within one business day. WhatsApp is fastest.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/35"
            >
              Reach us directly
            </motion.p>
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {contactDetails.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
