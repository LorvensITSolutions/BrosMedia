import { routes } from '../data/navigation'
import ScrollZoomReveal from '../framer/scroll_zoom_reveal.jsx'
import SmoothThreeDButton from '../framer/smooth_three_d_button.jsx'

const HERO_BG =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1783688056/wmremove-transformed_jlwarc.png'

export default function Hero() {
  return (
    <section id="hero" aria-label="Brosmedia hero">
      <h1 className="sr-only">
        Brosmedia — Digital Marketing Agency in Hyderabad for branding, websites, social media, and
        Meta ads
      </h1>
      <ScrollZoomReveal
        image={{
          src: HERO_BG,
          alt: 'Brosmedia digital marketing team and creative workspace',
        }}
        leftText="BROS "
        rightText="MEDIA"
        textColor="#000000"
        sideGap={70}
        sideGapMobile={8}
        backgroundColor="#ffffff"
        liquidEtherColors={['#ffffff', '#ffffff', '#ffffff/1.05']}
      >
      {/*}  <div className="absolute inset-x-0 top-[56%] flex flex-col items-center px-6 text-center sm:top-[54%]">
          <div className="pointer-events-auto mt-6 flex flex-col items-center gap-5 sm:mt-8 sm:flex-row sm:gap-6">
            <SmoothThreeDButton
              text="Start a project"
              link={routes.contact}
              variant="primary"
              buttonWidth={230}
              buttonHeight={64}
            />
            <SmoothThreeDButton
              text="View Our Work"
              link={routes.ourWork}
              variant="secondary"
              buttonWidth={230}
              buttonHeight={64}
            />
          </div>
        </div>*/}
      </ScrollZoomReveal>
    </section>
  )
}
