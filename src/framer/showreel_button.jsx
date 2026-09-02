import './showreel_button.css'

export default function ShowreelButton({
  text = 'Watch Showreel',
  href = '#',
  openInNewTab = true,
  className = '',
  fullWidth = false,
}) {
  return (
    <div className={`${fullWidth ? 'showreel-button--block ' : ''}${className}`.trim()}>
      <a
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="showreel-button font-sans"
      >
        <span className="showreel-button__icon-wrap" aria-hidden="true">
          <svg className="showreel-button__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="showreel-button__label">{text}</span>
      </a>
    </div>
  )
}
