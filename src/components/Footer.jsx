import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  footerBottomLinks,
  footerIntro,
  routes,
} from '../data/footer'

const LOGO_URL =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134190/BrosMedia_Logo_1_nxpara.png'

function FooterHeading({ children }) {
  return (
    <p className="section-title mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--page-muted)] sm:text-xs">
      {children}
    </p>
  )
}

function FooterAnchor({ href, external, children, className = '' }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`footer-link text-sm font-medium text-[var(--page-muted)] transition-colors duration-200 hover:text-[var(--page-ink)] sm:text-[0.9375rem] ${className}`}
    >
      {children}
    </a>
  )
}

function FooterNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="footer-link text-xs font-medium text-[var(--page-muted)] transition-colors duration-200 hover:text-[var(--page-ink)] sm:text-[0.8125rem]"
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const emailHref = `mailto:${footerIntro.email}?subject=${encodeURIComponent('Project inquiry — Brosmedia')}`

  return (
    <footer className="footer-illucus border-t border-[var(--page-border)] bg-[var(--page-surface-strong)] font-sans text-[var(--page-ink)]">
      <div className="mx-auto max-w-352 px-5 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-10 lg:pb-14">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              to={routes.home}
              className="group inline-flex items-center gap-3"
              aria-label="Brosmedia home"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl sm:p-1.5">
                <img
                  src={LOGO_URL}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-2xl font-black lowercase tracking-tight text-[var(--page-ink)] sm:text-3xl">
                brosmedia
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--page-muted)]">
              {footerIntro.tagline}
            </p>
            <a
              href={emailHref}
              className="footer-email group mt-5 inline-flex max-w-full items-start gap-2 sm:mt-6"
              aria-label={`Email ${footerIntro.email}`}
            >
              <span className="break-all text-sm font-semibold lowercase leading-tight tracking-tight text-[var(--page-ink)] transition-colors duration-300 group-hover:text-accent sm:text-base">
                {footerIntro.email}
              </span>
              <ArrowUpRight
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--page-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:h-4 sm:w-4"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <FooterHeading>Explore</FooterHeading>
            <ul className="flex flex-col gap-2 sm:gap-2.5">
              {footerBottomLinks.map((link) => (
                <li key={link.to}>
                  <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3 lg:justify-self-end">
            <FooterHeading>Visit us</FooterHeading>
            <address className="not-italic">
              <FooterAnchor
                href={footerIntro.mapsUrl}
                external
                className="block leading-relaxed hover:text-accent"
              >
                {footerIntro.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </FooterAnchor>
              <p className="mt-4 whitespace-nowrap text-sm text-[var(--page-muted)] sm:text-[0.9375rem]">
                {footerIntro.workingHours}
              </p>
              <a
                href={`tel:${footerIntro.phoneHref}`}
                className="footer-link mt-3 block text-sm font-medium text-[var(--page-muted)] transition-colors duration-200 hover:text-[var(--page-ink)] sm:text-[0.9375rem]"
              >
                {footerIntro.phone}
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center overflow-hidden border-t border-[var(--page-border)] pt-3 pb-6 sm:pt-4 sm:pb-8">
        <p
          aria-hidden
          className="footer-watermark pointer-events-none w-full select-none text-center font-anton leading-none  text-accent"
        >
          BROSMEDIA
        </p>
        <p className="relative z-10 -mt-1 w-full px-5 text-center text-[0.7rem] leading-none text-[var(--page-muted)] sm:text-xs">
          © {year} {footerIntro.companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
