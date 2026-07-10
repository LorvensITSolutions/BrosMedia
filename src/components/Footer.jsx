import { Link } from 'react-router-dom'
import CharacterImageReveal from '../framer/character_image_reveal.jsx'
import { LetterSwapLink } from '../framer/letter_swap.jsx'
import { footerIntro, footerLinks, footerRevealImages } from '../data/footer'
import { routes } from '../data/navigation'

function LinkDivider() {
  return (
    <span className="mx-3 text-white/20 sm:mx-4" aria-hidden="true">
      ·
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 font-sans">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col items-center text-center">
          <Link to={routes.home} className="shrink-0" aria-label="Brosmedia home">
            <CharacterImageReveal
              text="BROSMEDIA"
              images={footerRevealImages}
              textColor="#ffffff"
              imageSize={64}
              offsetY={-8}
              objectFit="contain"
              className="font-black tracking-tighter"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            />
          </Link>

          <p className="mt-4 text-sm text-white/50 sm:text-base">{footerIntro.address}</p>

          <nav className="mt-5" aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center">
              {footerLinks.map((link, index) => (
                <li key={link.label} className="flex items-center">
                  {index > 0 && <LinkDivider />}
                  <LetterSwapLink
                    to={link.to}
                    text={link.label}
                    className="text-sm font-medium sm:text-base"
                    color="rgba(255,255,255,0.85)"
                    hoverColor="#dfff00"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-6 text-xs text-white/40 sm:text-sm">
            © {year} {footerIntro.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
