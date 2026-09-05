import { motion } from 'framer-motion'
import {
  portfolioFeaturedIntro,
  portfolioWebsiteFeatured,
  portfolioOtherWebsites,
} from '../../data/portfolio'

const spring = { type: 'spring', stiffness: 100, damping: 18, mass: 0.7 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const scaleIn = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

function ProjectCard({ project, size = 'md' }) {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={spring}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)]"
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        className="block h-auto max-h-[min(52vh,28rem)] w-full object-cover object-top sm:max-h-none sm:object-contain"
        loading="lazy"
      />

      <div className={`flex flex-1 flex-col ${size === 'lg' ? 'p-4 sm:p-6' : 'p-4 sm:p-5'}`}>
        <h3
          className={`font-bold tracking-tight text-[var(--page-ink)] ${
            size === 'lg' ? 'text-base sm:text-xl' : 'text-base sm:text-lg'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-1.5 flex-1 leading-relaxed text-[var(--page-muted)] sm:mt-2 ${
            size === 'lg' ? 'text-[0.8125rem] sm:text-[0.95rem]' : 'text-xs sm:text-sm'
          }`}
        >
          {project.description}
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5 sm:mt-4 sm:min-h-0"
        >
          View Project
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.article>
  )
}

function MarqueeWebsiteCard({ project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-[14.5rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] transition hover:-translate-y-1 sm:w-[18rem]"
      aria-label={`${project.title} — View Project`}
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        className="block h-36 w-full object-cover object-top sm:h-auto sm:max-h-48 sm:object-contain"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-sm font-bold tracking-tight text-[var(--page-ink)] sm:text-base">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--page-muted)]">
          {project.description}
        </p>
        <span className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5 sm:min-h-0">
          View Project
          <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  )
}

function OtherWebsitesMarquee() {
  if (!portfolioOtherWebsites.length) return null

  const loop = [...portfolioOtherWebsites, ...portfolioOtherWebsites]

  return (
    <div className="mt-10 sm:mt-14">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="px-4 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:px-5 sm:text-xs sm:tracking-[0.22em]"
      >
        Other Websites
      </motion.p>

      <div className="relative mt-4 overflow-hidden sm:mt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--page-bg)] to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--page-bg)] to-transparent sm:w-16"
        />

        <div
          className="portfolio-marquee flex w-max items-stretch gap-3 sm:gap-4"
          aria-label="Other websites marquee"
        >
          {loop.map((project, index) => (
            <MarqueeWebsiteCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden bg-[var(--page-bg)] font-sans text-[var(--page-ink)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.1),transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:pb-10 lg:pt-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center text-[clamp(1.55rem,6.5vw,3rem)] font-black tracking-tight"
        >
          <span className="text-[var(--page-ink)]">{portfolioFeaturedIntro.headlineBefore} </span>
          <span className="text-accent">{portfolioFeaturedIntro.headlineAccent}</span>
          <span className="text-[var(--page-ink)]"> {portfolioFeaturedIntro.headlineAfter}</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-7 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:mt-12 sm:text-xs sm:tracking-[0.22em]"
        >
          Featured Projects
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-4 grid grid-cols-1 gap-3.5 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:gap-6"
        >
          {portfolioWebsiteFeatured.map((project) => (
            <ProjectCard key={project.id} project={project} size="lg" />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 pb-12 sm:pb-16 lg:pb-20">
        <OtherWebsitesMarquee />
      </div>
    </section>
  )
}

