import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import EyeFollowButton from '../framer/eye_follow_button.jsx'
import LetterSwap from '../framer/letter_swap.jsx'
import SmoothThreeDButton from '../framer/smooth_three_d_button.jsx'
import MagicRings from './ui/MagicRings.jsx'
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
  const isLongValue = item.value.length > 28

  const content = (
    <span className="relative flex items-start gap-3 sm:gap-4">
      <motion.span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent sm:h-11 sm:w-11 sm:rounded-xl"
        whileHover={{ scale: 1.08, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
      </motion.span>
      <span className="min-w-0 flex-1">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/40 sm:text-[0.65rem] sm:tracking-[0.16em]">
          {item.label}
        </p>
        <p
          className={`mt-1 font-semibold leading-snug text-white sm:mt-1.5 sm:text-[0.95rem] ${
            isLongValue
              ? 'text-[0.68rem] break-words sm:text-sm sm:leading-relaxed'
              : 'text-xs sm:leading-relaxed'
          }`}
        >
          {item.value}
        </p>
        {item.href && (
          <span className="mt-1.5 inline-flex items-center gap-1 text-[0.65rem] font-semibold text-accent/70 transition group-hover:text-accent sm:mt-2 sm:text-xs">
            Open
            <span aria-hidden>→</span>
          </span>
        )}
      </span>
    </span>
  )

  const cardClass =
    'group relative flex h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-accent/30 hover:bg-white/[0.05] sm:rounded-2xl sm:p-6'

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
          {content}
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
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <MagicRings
          color="#dfff00"
          colorTwo="#8fa600"
          ringCount={7}
          speed={0.9}
          attenuation={11}
          lineThickness={2.2}
          baseRadius={0.22}
          radiusStep={0.09}
          scaleRate={0.12}
          opacity={0.75}
          blur={0}
          noiseAmount={0.06}
          rotation={0}
          ringGap={1.45}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse
          mouseInfluence={0.16}
          hoverScale={1.12}
          parallax={0.04}
          clickBurst={false}
          alphaMode="luminance"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 pb-4 sm:px-6 sm:pt-16 sm:pb-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="relative lg:sticky lg:top-[calc(var(--navbar-height)+2rem)]"
          >
            <motion.div variants={fadeUp} className="relative z-10">
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
              className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
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
              className="mt-10 flex w-full flex-col gap-4 md:flex-row md:flex-wrap md:items-center"
            >
              <div className="w-full md:w-auto">
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
              </div>
              <div className="w-full md:w-auto">
                <SmoothThreeDButton
                  text="Email us"
                  link={emailHref}
                  variant="secondary"
                  buttonWidth={200}
                  buttonHeight={64}
                />
              </div>
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
            <ul className="grid grid-cols-2 gap-3 sm:gap-5">
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
