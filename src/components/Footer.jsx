import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  footerBottomLinks,
  footerContactLinks,
  footerIntro,
  footerSocialLinks,
  routes,
} from '../data/footer'

const LOGO_URL =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1782134190/BrosMedia_Logo_1_nxpara.png'

function FooterHeading({ children }) {
  return (
    <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/35 sm:text-xs">
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
      className={`footer-link text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white sm:text-[0.9375rem] ${className}`}
    >
      {children}
    </a>
  )
}

function FooterNavLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`footer-link text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white sm:text-[0.9375rem] ${className}`}
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const emailHref = `mailto:${footerIntro.email}?subject=${encodeURIComponent('Project inquiry — Brosmedia')}`

  return (
    <footer className="footer-illucus border-t border-white/6 bg-[#0a0a0c] font-sans text-white">
      <div className="mx-auto max-w-352 px-5 pt-6 pb-0 sm:px-8 sm:pt-8 lg:px-12 lg:pt-10">
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
              <span className="text-2xl font-black lowercase tracking-tight text-white sm:text-3xl">
                brosmedia
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">
              {footerIntro.tagline}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Social and contact links">
            <FooterHeading>Connect</FooterHeading>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {footerSocialLinks.map((link) => (
                <li key={link.label}>
                  <FooterAnchor href={link.href} external={link.external}>
                    {link.label}
                  </FooterAnchor>
                </li>
              ))}
              {footerContactLinks.map((link) => (
                <li key={link.label}>
                  <FooterAnchor href={link.href} external={link.external}>
                    <span className="text-white/35">{link.label}: </span>
                    {link.value}
                  </FooterAnchor>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3 lg:justify-self-end">
            <FooterHeading>Visit us</FooterHeading>
            <address className="max-w-xs not-italic">
              <FooterAnchor
                href={footerIntro.mapsUrl}
                external
                className="block leading-relaxed hover:text-accent"
              >
                {footerIntro.address}
              </FooterAnchor>
              <p className="mt-4 text-sm text-white/45 sm:text-[0.9375rem]">
                {footerIntro.workingHours}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/6 pt-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pt-6 lg:gap-10">
          <a
            href={emailHref}
            className="footer-email group inline-flex max-w-full shrink-0 items-start gap-2"
            aria-label={`Email ${footerIntro.email}`}
          >
            <span className="break-all font-bold lowercase leading-tight tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-accent">
              {footerIntro.email}
            </span>
            <ArrowUpRight
              className="mt-0.5 h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:h-4.5 sm:w-4.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8 lg:gap-x-10">
              {footerBottomLinks.map((link) => (
                <li key={`bottom-${link.to}`}>
                  <FooterNavLink to={link.to} className="text-sm sm:text-base">
                    {link.label}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="relative mt-4 flex flex-col items-center justify-center overflow-hidden border-t border-white/6 pt-3 sm:mt-5 sm:pt-4">
        <p
          aria-hidden
          className="footer-watermark pointer-events-none w-full select-none text-center font-black leading-none tracking-[-0.055em] text-accent"
        >
          BROSMEDIA
        </p>
        <p className="relative z-10 -mt-1 w-full px-5 text-center text-[0.7rem] leading-none text-white/55 sm:text-xs">
          © {year} {footerIntro.companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
