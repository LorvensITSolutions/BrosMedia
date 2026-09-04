import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import ViewOnInstagramButton from '../framer/view_on_instagram_button.jsx'
import {
  getCaseStudyBySlug,
  getCaseStudyPath,
  getClientWebsiteHref,
  portfolioCaseStudies,
} from '../data/portfolio'
import { routes } from '../data/navigation'
import { finalCtaButtons } from '../data/finalCta'

const spring = { type: 'spring', stiffness: 90, damping: 22, mass: 0.75 }
const viewport = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

function WebsiteMockup({ site, index }) {
  return (
    <motion.a
      href={site.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={spring}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-accent/40"
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate text-[0.65rem] text-white/35">
          {site.href.replace(/^https?:\/\//, '')}
        </span>
      </div>
      <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent p-6">
        {site.logo ? (
          <img
            src={site.logo}
            alt={`${site.name} logo`}
            className="max-h-20 max-w-[70%] object-contain transition duration-300 group-hover:scale-105"
            loading={index > 0 ? 'lazy' : 'eager'}
          />
        ) : (
          <span className="text-sm font-semibold text-white/50">{site.name}</span>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold text-white">{site.name}</p>
        <ArrowUpRight className="h-4 w-4 text-accent opacity-70 transition group-hover:opacity-100" />
      </div>
    </motion.a>
  )
}

export default function PortfolioClientPage() {
  const { slug } = useParams()
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return <Navigate to={routes.portfolio} replace />
  }

  const websiteHref = getClientWebsiteHref(study.website)
  const currentIndex = portfolioCaseStudies.findIndex((item) => item.slug === study.slug)
  const nextStudy =
    portfolioCaseStudies[(currentIndex + 1) % portfolioCaseStudies.length] ?? null
  const prevStudy =
    portfolioCaseStudies[
      (currentIndex - 1 + portfolioCaseStudies.length) % portfolioCaseStudies.length
    ] ?? null

  return (
    <div className="bg-[#0b0b0b] font-sans text-white">
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,245,29,0.1),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(223,255,0,0.05),transparent_40%)]"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-[calc(var(--navbar-height)+1.5rem)] sm:px-6 sm:pb-14 lg:px-8 lg:pb-16 2xl:max-w-[1400px]">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link
                to={routes.portfolio}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to portfolio
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              {study.logo ? (
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-1.5 sm:h-16 sm:w-16">
                  <img
                    src={study.logo}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : null}
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {study.category}
                </p>
                <h1 className="mt-2 text-[clamp(1.85rem,4.5vw,3.4rem)] font-black leading-[1.05] tracking-tight">
                  {study.client}
                </h1>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {study.oneLiner}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg sm:gap-4"
            >
              {study.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center sm:px-4"
                >
                  <p className="text-xl font-black text-accent sm:text-2xl">{item.value}</p>
                  <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-white/40 sm:text-[0.65rem]">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16 2xl:max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent/90">
                The goal
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/65 sm:text-[1.05rem]">
                {study.goal}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent/90">
                What we did
              </p>
              <ul className="mt-4 space-y-3">
                {study.whatWeDid.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="space-y-8"
          >
            {study.websites?.length > 0 ? (
              <div>
                <motion.p
                  variants={fadeUp}
                  className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent/90"
                >
                  {study.websites.length > 1 ? 'Brand websites' : 'Live site'}
                </motion.p>
                <div
                  className={`grid gap-4 ${
                    study.websites.length >= 3 ? 'sm:grid-cols-3' : study.websites.length === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {study.websites.map((site, index) => (
                    <WebsiteMockup key={site.href} site={site} index={index} />
                  ))}
                </div>
              </div>
            ) : null}

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.1] to-transparent p-6 sm:p-8"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                The result
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-white sm:text-xl">
                {study.result}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {study.instagram ? (
                <ViewOnInstagramButton href={study.instagram} />
              ) : null}
              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent/40 hover:text-accent"
                >
                  Visit website
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
              <a
                href={finalCtaButtons.discovery.href}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
              >
                Start a project
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 2xl:max-w-[1400px]">
          {prevStudy ? (
            <Link
              to={getCaseStudyPath(prevStudy.slug)}
              className="group text-sm text-white/45 transition hover:text-white"
            >
              <span className="block text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
                Previous
              </span>
              <span className="mt-1 inline-flex items-center gap-2 font-semibold group-hover:text-accent">
                ← {prevStudy.client}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextStudy ? (
            <Link
              to={getCaseStudyPath(nextStudy.slug)}
              className="group text-right text-sm text-white/45 transition hover:text-white sm:ml-auto"
            >
              <span className="block text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
                Next
              </span>
              <span className="mt-1 inline-flex items-center gap-2 font-semibold group-hover:text-accent">
                {nextStudy.client} →
              </span>
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  )
}
