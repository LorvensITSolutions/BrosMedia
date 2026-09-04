import { motion } from 'framer-motion'
import ViewOnInstagramButton from '../framer/view_on_instagram_button.jsx'
import PortfolioHero from '../components/portfolio/PortfolioHero.jsx'
import {
  getClientWebsiteHref,
  portfolioItems,
  portfolioSectionIntro,
  portfolioStats,
} from '../data/portfolio'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

function StatsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,255,0,0.07),transparent_55%)]"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/8 sm:grid-cols-4 2xl:max-w-[1400px]"
      >
        {portfolioStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="group bg-black px-5 py-9 text-center transition-colors hover:bg-white/[0.03] sm:px-6 sm:py-11"
          >
            <p className="text-3xl font-black tracking-tight text-accent transition group-hover:scale-[1.03] sm:text-4xl lg:text-[2.85rem]">
              {stat.value}
            </p>
            <p className="mt-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-[0.68rem]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ClientLinks({ client }) {
  const href = getClientWebsiteHref(client.website)

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {client.instagram ? <ViewOnInstagramButton href={client.instagram} compact /> : null}

      {client.websites?.length
        ? client.websites.map((site) => {
            const siteHref = getClientWebsiteHref(site.href)
            return siteHref ? (
              <a
                key={site.label}
                href={siteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent/80 transition hover:text-accent"
              >
                {site.label}
                <span aria-hidden>↗</span>
              </a>
            ) : null
          })
        : href
          ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent/80 transition group-hover:gap-2.5 group-hover:text-accent sm:text-sm"
            >
              Visit website
              <span aria-hidden>↗</span>
            </a>
          )
          : !client.instagram
            ? (
              <span className="text-xs text-white/35 sm:text-sm">Brand & creative engagement</span>
            )
            : null}
    </div>
  )
}

function ClientCase({ client, index }) {
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={spring}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/30 hover:bg-white/[0.05] sm:rounded-[1.35rem] sm:p-6 lg:p-7"
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(223,255,0,0.1),transparent_55%)] opacity-0 transition group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex shrink-0 items-start gap-3.5 sm:block sm:w-[5.5rem]">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-1.5 sm:h-16 sm:w-16">
            {client.logo ? (
              <img
                src={client.logo}
                alt={`${client.client} logo`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-bold uppercase tracking-wide text-primary/40">
                {client.client.slice(0, 2)}
              </span>
            )}
          </div>
          <p className="mt-0 text-[0.65rem] font-semibold tracking-[0.16em] text-accent/70 sm:mt-3 sm:text-center">
            {indexLabel}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-accent/85 sm:text-[0.65rem]">
            {client.industry}
          </p>
          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {client.client}
          </h3>
          {client.subBrands?.length ? (
            <p className="mt-1.5 text-xs text-white/40 sm:text-sm">
              {client.subBrands.join(' · ')}
            </p>
          ) : null}

          <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {[
              { label: 'Goal', value: client.goal },
              { label: 'What we did', value: client.whatWeDid },
              { label: 'Result', value: client.result, accent: true },
            ]
              .filter((block) => block.value)
              .map((block) => (
                <div key={block.label}>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                    {block.label}
                  </p>
                  <p
                    className={`mt-1.5 text-[0.82rem] leading-relaxed sm:text-sm ${
                      block.accent ? 'font-medium text-accent/90' : 'text-white/55'
                    }`}
                  >
                    {block.value}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-5 border-t border-white/8 pt-4">
            <ClientLinks client={client} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ClientsGrid() {
  return (
    <section id="portfolio-clients" className="relative overflow-hidden bg-black font-sans text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(223,255,0,0.05),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(223,255,0,0.04),transparent_40%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16 2xl:max-w-[1400px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent/85"
          >
            Portfolio
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(1.75rem,4.2vw,3rem)] font-black leading-[1.05] tracking-tight"
          >
            <span className="text-white">{portfolioSectionIntro.headlineBefore} </span>
            <span className="text-accent">{portfolioSectionIntro.headlineAccent}</span>{' '}
            <span className="text-white">{portfolioSectionIntro.headlineAfter}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3.5 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base"
          >
            {portfolioSectionIntro.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5"
        >
          {portfolioItems.map((client, index) => (
            <ClientCase key={client.id} client={client} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  const scrollToClients = () => {
    const el = document.getElementById('portfolio-clients')
    if (!el) return
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76',
    )
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 12
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <PortfolioHero onExplore={scrollToClients} />
      <StatsStrip />
      <ClientsGrid />
    </>
  )
}
