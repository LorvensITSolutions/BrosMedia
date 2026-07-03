import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LetterSwap from '../framer/letter_swap.jsx'
import {
  buildContactMailtoBody,
  contactDetails,
  contactEmail,
  contactFormLabels,
  contactDirectHeading,
  contactIntro,
  contactServiceOptions,
} from '../data/contact'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const initialForm = {
  fullName: '',
  businessName: '',
  phone: '',
  email: '',
  industry: '',
  services: [],
  project: '',
}

function HeroBlob({ className, animate, transition }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
      animate={animate}
      transition={transition ?? { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function HeadlineTitle() {
  const [hovered, setHovered] = useState(false)

  const swapBase = {
    variant: 'pingPong',
    direction: 'up',
    staggerDuration: 20,
  }

  return (
    <span
      className="block w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <LetterSwap
        text="Let's build something"
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="first"
        {...swapBase}
      />
      <LetterSwap
        text="great together."
        as="span"
        className="block"
        active={hovered}
        color="#000000"
        hoverColor="#1e45ff"
        staggerFrom="center"
        {...swapBase}
      />
    </span>
  )
}

function ContactHero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white font-sans text-primary"
    >
      <HeroBlob
        className="left-[-10%] top-[8%] h-72 w-72 bg-blue/10 sm:h-96 sm:w-96"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      />
      <HeroBlob
        className="right-[-8%] bottom-[12%] h-64 w-64 bg-blue/15 sm:h-80 sm:w-80"
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-5xl px-5 pb-12 pt-[calc(var(--navbar-height)+2.5rem)] text-center sm:px-6 sm:pb-16 sm:pt-[calc(var(--navbar-height)+3rem)] lg:max-w-6xl lg:px-8"
      >
        <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full">
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80"
          >
            {contactIntro.label}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="relative z-10 mt-4 w-full text-[1.625rem] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.25] lg:text-6xl xl:text-7xl"
          >
            <HeadlineTitle />
          </motion.h1>

          <div className="@container relative mt-4 w-full overflow-hidden py-4 sm:mt-1 sm:py-10 lg:py-14">
            <motion.div
              style={{ y: watermarkY }}
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex justify-center -translate-y-1/2"
              aria-hidden="true"
            >
              <span className="inline-block max-w-full origin-center text-center font-black leading-none tracking-tighter text-blue/[0.07] text-[3.5rem] sm:text-[clamp(4rem,13cqw,9rem)] lg:text-[clamp(7rem,15cqw,12rem)]">
                CONTACT
              </span>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="relative z-10 mx-auto max-w-2xl px-1 text-base leading-relaxed text-primary/65 sm:px-0 sm:text-lg"
            >
              {contactIntro.description}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.fullName.trim() || !form.businessName.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const subject = encodeURIComponent(`New enquiry from ${form.fullName} — ${form.businessName}`)
    const body = encodeURIComponent(
      buildContactMailtoBody({
        fullName: form.fullName.trim(),
        businessName: form.businessName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        industry: form.industry.trim(),
        services: form.services,
        project: form.project.trim(),
      }),
    )

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-primary/35 focus:border-blue/40 focus:ring-2 focus:ring-blue/10'

  return (
    <motion.form
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-blue/10 bg-white p-6 shadow-[0_20px_60px_rgba(30,69,255,0.08)] sm:p-8 lg:p-10"
      noValidate
    >
      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-primary/55">
            {contactFormLabels.fullName} <span className="text-blue">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="businessName" className="text-xs font-semibold uppercase tracking-wider text-primary/55">
            {contactFormLabels.businessName} <span className="text-blue">*</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            value={form.businessName}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-primary/55">
            {contactFormLabels.phone} <span className="text-blue">*</span>
          </label>
          <p className="mt-0.5 text-[0.65rem] text-primary/40">{contactFormLabels.phoneHint}</p>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className={`mt-1.5 ${inputClass}`}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-primary/55">
            {contactFormLabels.email} <span className="text-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
            autoComplete="email"
          />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-5">
        <label htmlFor="industry" className="text-xs font-semibold uppercase tracking-wider text-primary/55">
          {contactFormLabels.industry}
        </label>
        <input
          id="industry"
          name="industry"
          type="text"
          value={form.industry}
          onChange={handleChange}
          className={`mt-2 ${inputClass}`}
        />
      </motion.div>

      <motion.fieldset variants={fadeUp} className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wider text-primary/55">
          {contactFormLabels.services}
        </legend>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {contactServiceOptions.map((service) => {
            const checked = form.services.includes(service)
            return (
              <li key={service}>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                    checked
                      ? 'border-blue/30 bg-blue/[0.06] text-primary'
                      : 'border-primary/10 bg-[#f5f7ff] text-primary/75 hover:border-blue/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-primary/20 text-blue focus:ring-blue/30"
                    checked={checked}
                    onChange={() => toggleService(service)}
                  />
                  {service}
                </label>
              </li>
            )
          })}
        </ul>
      </motion.fieldset>

      <motion.div variants={fadeUp} className="mt-6">
        <label htmlFor="project" className="text-xs font-semibold uppercase tracking-wider text-primary/55">
          {contactFormLabels.project}
        </label>
        <textarea
          id="project"
          name="project"
          rows={5}
          value={form.project}
          onChange={handleChange}
          className={`mt-2 resize-y ${inputClass}`}
        />
      </motion.div>

      {error && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      <motion.div variants={fadeUp} className="mt-8">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={spring}
          className="w-full rounded-full bg-blue px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1a3de6] sm:w-auto"
        >
          {contactFormLabels.submit}
        </motion.button>
        <p className="mt-3 text-xs text-primary/45">
          Submitting opens your email app with your message pre-filled to {contactEmail}.
        </p>
      </motion.div>
    </motion.form>
  )
}

function DirectContact() {
  return (
    <motion.aside
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className="lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)] lg:self-start"
    >
      <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-blue/80">
        {contactDirectHeading}
      </motion.p>

      <motion.ul variants={stagger} className="mt-6 space-y-4">
        {contactDetails.map((item) => (
          <motion.li
            key={item.label}
            variants={fadeUp}
            className="rounded-2xl border border-blue/10 bg-white p-5 shadow-[0_12px_40px_rgba(30,69,255,0.06)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue/70">{item.label}</p>
            {item.href ? (
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="mt-2 block text-sm font-semibold text-primary transition hover:text-blue sm:text-base"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-sm font-semibold text-primary sm:text-base">{item.value}</p>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={fadeUp}
        className="mt-6 rounded-2xl border border-dashed border-blue/20 bg-blue/[0.04] p-5"
      >
        <p className="text-sm leading-relaxed text-primary/60">
          We typically respond within one business day. For faster replies, WhatsApp is the quickest way to reach us.
        </p>
      </motion.div>
    </motion.aside>
  )
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-[#f5f7ff] pb-20 font-sans lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(260px,320px)] lg:gap-14">
            <ContactForm />
            <DirectContact />
          </div>
        </div>
      </section>
    </>
  )
}
