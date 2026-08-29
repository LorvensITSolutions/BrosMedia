import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GsapScrollRevealText from './GsapScrollRevealText'
import { routes } from '../data/navigation'

const ABOUT_IMAGE =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1783690793/wmremove-transformed_5_f35bei.png'

const ABOUT_COPY_1 =
  'Brosmedia is built for businesses that are serious about their brand and serious about growth. We are a focused agency based in Hyderabad, working across branding, digital marketing, creative production, and paid media. We do not do generic. Every brand we work with gets a strategy built around their industry, their audience, and their goals and a team that stays hands-on from start to finish.'

const SATISFACTION_COPY =
  'Client satisfaction rate built on trust, quality service, and proven results.'

const GROWTH_COPY =
  'Elevate your brand with strategy, creativity, and measurable growth.'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const easeOut = [0.25, 0.1, 0.25, 1]

const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...spring, stiffness: 100 },
  },
}

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: spring,
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

function AboutIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-accent"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#about-us-icon-clip)">
        <path
          d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9699 14.4402C18.3399 14.6702 19.8499 14.4302 20.9099 13.7202C22.3199 12.7802 22.3199 11.2402 20.9099 10.3002C19.8399 9.59016 18.3099 9.35016 16.9399 9.59016"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.99994 14.4402C5.62994 14.6702 4.11994 14.4302 3.05994 13.7202C1.64994 12.7802 1.64994 11.2402 3.05994 10.3002C4.12994 9.59016 5.65994 9.35016 7.02994 9.59016"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0001 14.6297C11.9401 14.6197 11.8701 14.6197 11.8101 14.6297C10.4301 14.5797 9.33008 13.4497 9.33008 12.0497C9.33008 10.6197 10.4801 9.46973 11.9101 9.46973C13.3401 9.46973 14.4901 10.6297 14.4901 12.0497C14.4801 13.4497 13.3801 14.5897 12.0001 14.6297Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.09021 17.7794C7.68021 18.7194 7.68021 20.2594 9.09021 21.1994C10.6902 22.2694 13.3102 22.2694 14.9102 21.1994C16.3202 20.2594 16.3202 18.7194 14.9102 17.7794C13.3202 16.7194 10.6902 16.7194 9.09021 17.7794Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="about-us-icon-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-black font-sans text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-0 lg:px-8 lg:pt-24 lg:pb-0 ">
        <motion.div
          className="grid gap-10 pb-12 lg:grid-cols-[3fr_7fr] lg:gap-12 lg:items-start"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.div
            className="flex flex-col items-center text-center sm:pl-8 lg:items-start lg:pl-12 lg:pr-12 lg:text-left"
            variants={stagger}
          >
            <motion.div
              className="flex items-center justify-center gap-2.5 lg:justify-start"
              variants={fadeUp}
            >
              <AboutIcon />
              <span className="text-sm font-medium text-accent">ABOUT US</span>
            </motion.div>
            <motion.p
              className="mt-8 text-7xl font-bold tracking-tight text-white sm:text-8xl lg:text-9xl"
              variants={scaleIn}
            >
              10+
            </motion.p>
            <motion.p
              className="mt-2 text-lg font-semibold text-white/60 sm:text-xl"
              variants={fadeUp}
            >
              Brands Built
            </motion.p>
          </motion.div>

          <div className="text-center lg:text-left">
            <GsapScrollRevealText
              text={ABOUT_COPY_1}
              className="text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl lg:leading-relaxed"
              start="top 90%"
              end="top 50%"
            />
          </div>
        </motion.div>

        <div className="grid gap-8 pt-12 pb-12 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <motion.div
            className="overflow-hidden rounded-3xl"
            initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8% round 24px)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <motion.img
              src={ABOUT_IMAGE}
              alt="Brosmedia team collaborating"
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[420px]"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ duration: 1.1, ease: easeOut }}
            />
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={slideRight}
            >
              <motion.p
                className="text-5xl font-bold tracking-tight text-white sm:text-6xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ ...spring, delay: 0.15 }}
              >
                98%
              </motion.p>
              <GsapScrollRevealText
                text={SATISFACTION_COPY}
                className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base"
                start="top 92%"
                end="top 55%"
                stagger={0.1}
              />
              <GsapScrollRevealText
                text={GROWTH_COPY}
                className="mt-6 text-base font-semibold leading-relaxed text-white sm:text-lg"
                start="top 90%"
                end="top 52%"
                stagger={0.09}
              />
            </motion.div>

            <motion.div
              className="group flex items-center justify-center gap-5 lg:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <Link to={routes.contact} className="group flex items-center gap-5">
              <motion.span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform group-hover:scale-105"
                whileHover={{ scale: 1.08, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <ArrowUpRight />
              </motion.span>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-white/60">Get in Touch</span>
                <span className="block text-base font-semibold text-white">Start a Project</span>
              </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
