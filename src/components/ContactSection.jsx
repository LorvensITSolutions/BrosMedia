import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import LetterSwap from '../framer/letter_swap.jsx'
import MagicRings from './ui/MagicRings.jsx'
import {
  contactDetails,
  contactIntro,
} from '../data/contact'
import { EmailCtaButton, PrimaryBookingButton } from './ui/HeroStyleCtas'

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

const CARD_ICONS = {
  WhatsApp: MessageCircle,
  Email: Mail,
  Location: MapPin,
  'Working hours': Clock,
}

function ContactCard({ item }) {
  const Icon = CARD_ICONS[item.label] ?? Mail

  const content = (
    <span className="relative z-10 flex h-full flex-col gap-2.5">
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/40">
            {item.label}
          </p>
          <p className="mt-0.5 text-sm font-semibold leading-snug text-white sm:text-[0.95rem]">
            {item.value}
          </p>
        </span>
      </span>

      {item.href ? (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent px-3 py-1 text-[0.7rem] font-semibold text-primary transition group-hover:gap-2 group-hover:bg-accent/90">
          Open
          <span aria-hidden>→</span>
        </span>
      ) : (
        <span className="text-[0.7rem] text-white/30">Local time · IST</span>
      )}
    </span>
  )

  const cardClass =
    'group relative flex h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-accent/35 hover:bg-white/[0.05] sm:p-4'

  return (
    <motion.li variants={fadeUp} className="min-h-0">
      {item.href ? (
        <motion.a
          href={item.href}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cardClass}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <span
            className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/10 blur-xl transition group-hover:bg-accent/20"
            aria-hidden
          />
          {content}
        </motion.a>
      ) : (
        <motion.div
          className={cardClass}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <span
            className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/10 blur-xl transition group-hover:bg-accent/20"
            aria-hidden
          />
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
              className="mt-10 flex w-full flex-col gap-3 sm:gap-4 md:flex-row md:flex-wrap md:items-center"
            >
              <PrimaryBookingButton text="Book a strategy call" />
              <EmailCtaButton />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-sm text-white/40">
              Free 30-min strategy call. WhatsApp is fastest — we typically reply within one business day.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="pt-8 sm:pt-10 lg:pt-16"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/35"
            >
              Reach us directly
            </motion.p>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
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
