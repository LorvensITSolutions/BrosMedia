import { Link } from 'react-router-dom'
import { legalUpdated } from '../data/legal'
import { routes } from '../data/navigation'

export default function LegalDocument({ document }) {
  return (
    <article className="relative bg-[var(--page-bg)] font-sans text-[var(--page-ink)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-rgb),0.12),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
          {document.label}
        </p>
        <h1 className="section-heading mt-3 text-[clamp(1.75rem,4.5vw,2.75rem)] font-black uppercase tracking-tight text-[var(--page-ink)]">
          {document.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--page-muted)] sm:text-base">
          {document.summary}
        </p>
        <p className="mt-3 text-xs text-[var(--page-muted)]">Last updated: {legalUpdated}</p>

        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-base font-bold tracking-tight text-[var(--page-ink)] sm:text-lg">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--page-muted)] sm:text-[0.9375rem]">
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={`${section.heading}-p-${index}`}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((item, index) => (
                      <li key={`${section.heading}-b-${index}`}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <nav
          aria-label="Other legal pages"
          className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--page-border)] pt-6 text-sm"
        >
          <Link
            to={routes.privacy}
            className="font-medium text-[var(--page-muted)] transition-colors hover:text-accent"
          >
            Privacy Policy
          </Link>
          <Link
            to={routes.terms}
            className="font-medium text-[var(--page-muted)] transition-colors hover:text-accent"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            to={routes.home}
            className="font-medium text-[var(--page-muted)] transition-colors hover:text-accent"
          >
            Back to home
          </Link>
        </nav>
      </div>
    </article>
  )
}
