import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import FaqItem from '../framer/faq_item.jsx'
import { contactEmail, contactWhatsApp } from '../data/contact'
import { contact } from '../data/seo'
import { faqIntro, faqItems } from '../data/faq'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { ...spring, delay: 0.15 } },
}

function ContactLink({ href, icon: Icon, label, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-accent/30 hover:text-accent"
    >
      <Icon className="h-4 w-4 shrink-0 text-accent/80" strokeWidth={1.75} />
      {label}
    </a>
  )
}

export default function FaqSection() {
  const [openId, setOpenId] = useState('')

  return (
    <section id="faq" className="relative overflow-hidden bg-black font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,1)_0%,rgba(10,10,10,1)_100%)] p-4 sm:rounded-[32px] sm:p-8 lg:p-12"
        >
          <p
            className="pointer-events-none absolute bottom-6 left-4 hidden select-none text-[clamp(5rem,22vw,14rem)] font-bold leading-none sm:block sm:bottom-8 sm:left-8 lg:left-12"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(223, 255, 0, 0.22)',
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(223,255,0,0.18) 55%, rgba(255,255,255,0.12) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
            aria-hidden
          >
            FAQ
          </p>

          <div className="relative z-10 flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-10">
            <motion.div variants={fadeUp} className="lg:max-w-[620px] lg:flex-1">
              <h2 className="bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.55)_100%)] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-[2rem] sm:leading-10">
                {faqIntro.title}
              </h2>
              <p className="mt-2.5 text-base leading-6 text-white/55">{faqIntro.description}</p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <ContactLink
                  href={`tel:${contact.phone}`}
                  icon={Phone}
                  label={contactWhatsApp.display}
                />
                <ContactLink
                  href={`mailto:${contactEmail}`}
                  icon={Mail}
                  label={contactEmail}
                />
              </div>
            </motion.div>

            <motion.ul
              variants={slideIn}
              className="flex w-full flex-col gap-5 lg:flex-1"
            >
              {faqItems.map((item, index) => (
                <li key={item.id}>
                  <FaqItem
                    number={String(index + 1).padStart(2, '0')}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === item.id}
                    onToggle={() =>
                      setOpenId((current) => (current === item.id ? '' : item.id))
                    }
                  />
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
