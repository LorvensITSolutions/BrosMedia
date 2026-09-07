import './showreel_button.css'

function PlayIcon() {
  return (
    <svg className="showreel-button__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      className="showreel-button__icon showreel-button__icon--stroke"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      className="showreel-button__icon showreel-button__icon--stroke"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ICONS = {
  play: PlayIcon,
  arrow: ArrowIcon,
  mail: MailIcon,
}

export default function ShowreelButton({
  text = 'Watch Showreel',
  href = '#',
  openInNewTab = true,
  icon = 'play',
  className = '',
  fullWidth = false,
}) {
  const Icon = ICONS[icon] || PlayIcon

  return (
    <div className={`${fullWidth ? 'showreel-button--block ' : ''}${className}`.trim()}>
      <a
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="showreel-button font-sans"
      >
        <span className="showreel-button__icon-wrap" aria-hidden="true">
          <Icon />
        </span>
        <span className="showreel-button__label">{text}</span>
      </a>
    </div>
  )
}
