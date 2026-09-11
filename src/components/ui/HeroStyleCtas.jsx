import { getContactWhatsAppHref, contactEmail } from '../../data/contact'
import NudgeButton from '../../framer/nudge_button.jsx'
import ShowreelButton from '../../framer/showreel_button.jsx'
import { HERO_NUDGE_PROPS } from './heroCtaProps'

export function PrimaryBookingButton({
  text = 'Book a Free Strategy Call',
  fullWidth = false,
  className = '',
}) {
  return (
    <NudgeButton
      text={text}
      link={getContactWhatsAppHref()}
      openInNewTab
      fullWidth={fullWidth}
      className={className}
      {...HERO_NUDGE_PROPS}
    />
  )
}

export function SecondaryCtaButton({
  text,
  href,
  icon = 'arrow',
  openInNewTab = true,
  fullWidth = false,
  className = '',
}) {
  return (
    <ShowreelButton
      text={text}
      href={href}
      icon={icon}
      openInNewTab={openInNewTab}
      fullWidth={fullWidth}
      className={className}
    />
  )
}

export function EmailCtaButton({ fullWidth = false, className = '' }) {
  return (
    <SecondaryCtaButton
      text={`Email ${contactEmail}`}
      href={`mailto:${contactEmail}`}
      icon="mail"
      openInNewTab={false}
      fullWidth={fullWidth}
      className={className}
    />
  )
}
