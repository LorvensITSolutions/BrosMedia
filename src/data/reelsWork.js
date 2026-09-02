export const REEL_VIDEO_SRC =
  'https://brosmedia.sgp1.cdn.digitaloceanspaces.com/IMG_8402.MOV'

export const EXAMPLE_INSTAGRAM_REEL = 'https://www.instagram.com/reel/DcoBZ9lEsGi/'

/** Use hosted MP4/MOV for full-bleed cards. Instagram embeds cannot fill the card without their UI. */
export const NARENN_REEL_VIDEO = REEL_VIDEO_SRC

const reelClients = [
  'Narenn Living',
  'Hyderabad FC',
  'Narenn Group',
  'Urban Estates',
  'Metro Kitchens',
  'Skyline Motors',
  'Greenleaf Organics',
  'Apex Athletics',
  'Studio Verse',
]

export const REELS_CAROUSEL_ITEMS = reelClients.map((client, index) => ({
  mediaType: 'Video',
  video: index === 0 ? NARENN_REEL_VIDEO : REEL_VIDEO_SRC,
  title: client,
  description: '',
  ...(index === 0
    ? {
        link: {
          type: 'url',
          url: EXAMPLE_INSTAGRAM_REEL,
          target: '_blank',
        },
      }
    : {}),
}))

export const reelsIntro = {
  label: 'Motion That Moves',
  headlineAccent: 'Reels',
  headlineBlue: 'Work',
  subline: 'Short-form films, campaign cuts, and social reels - built for scroll-stopping impact.',
}

export const reelsCarouselTheme = {
  cardLayout: {
    showHeading: false,
    cardWidth: 268,
    cardHeight: 448,
    cardGap: 10,
    cardBorderRadius: 14,
    backgroundColor: '#000000',
    cardBackgroundColor: '#070a0d',
    cardOverlayOpacity: 0,
    infoPosition: 'overlay',
    headerTitle: 'Reels Work',
    headerDescription: reelsIntro.subline,
  },
  navigation: {
    showControls: true,
    keyboardNav: false,
    mouseWheel: false,
    mouseWheelInvert: false,
    mouseWheelSpeed: 1,
    hoverPause: false,
    showNavText: false,
    showCounter: false,
    showReelLabel: false,
  },
  autoplaySettings: {
    autoplay: true,
    speed: 1.4,
    infiniteLoop: true,
    mediaPauseDuration: 4,
    fabPosition: 'bottom-right',
  },
  motion: {
    transitionEffect: 'Standard',
    smoothness: 0.08,
    dragPower: 0.7,
    activeDistance: 120,
    maxScale: 1.08,
    minScale: 0.86,
    inactiveOpacity: 0.5,
    parallaxEffect: false,
    parallaxIntensity: 40,
    skewEffect: false,
    tiltEffect: false,
  },
  dragCursor: {
    showDragCursor: false,
    dragCursorBg: '#dfff00',
    dragCursorText: '#000000',
  },
  closeCursor: {
    showCloseCursor: true,
    closeCursorBg: '#dfff00',
    closeCursorText: '#000000',
  },
  infoPanelColors: {
    infoGradientStart: 'rgba(0,0,0,0.75)',
    infoGradientMid: 'rgba(0,0,0,0.35)',
    infoGradientEnd: 'rgba(0,0,0,0)',
    infoTitleColor: '#ffffff',
    infoDescColor: 'rgba(255,255,255,0.65)',
    overlayBg: 'rgba(0,0,0,0.94)',
    cardTitleColor: '#dfff00',
    cardDescColor: 'rgba(255,255,255,0.65)',
    cardInfoBgColor: '#070a0d',
  },
  headerTypography: {
    headerTitleFont: {
      fontFamily: 'Montserrat',
      fontSize: 36,
      fontWeight: 900,
      textAlign: 'left',
      lineHeight: 1.05,
      letterSpacing: -0.5,
    },
    headerTitleTextTransform: 'uppercase',
    headerTitleColor: '#ffffff',
    headerDescFont: {
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'left',
      lineHeight: 1.6,
      letterSpacing: 0,
    },
    headerDescTextTransform: 'none',
    headerDescColor: 'rgba(255,255,255,0.55)',
  },
  titleTypography: {
    titleFont: {
      fontFamily: 'Montserrat',
      fontSize: 15,
      fontWeight: 700,
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 0,
    },
    titleTextTransform: 'none',
  },
  descTypography: {
    descFont: {
      fontFamily: 'Montserrat',
      fontSize: 13,
      fontWeight: 400,
      textAlign: 'left',
      lineHeight: 1.55,
      letterSpacing: 0,
    },
    descTextTransform: 'none',
  },
  counterTypography: {
    counterFont: {
      fontFamily: 'Montserrat',
      fontSize: 11,
      fontWeight: 700,
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 0.22,
    },
    counterTextTransform: 'uppercase',
  },
  counterColors: {
    counterLabelColor: '#dfff00',
    counterCountColor: '#1e45ff',
  },
  controlBarColors: {
    controlBarBg: 'rgba(255,255,255,0.06)',
    controlBarBorder: 'rgba(223,255,0,0.22)',
    controlBtnText: '#ffffff',
    controlBtnHoverBg: 'rgba(223,255,0,0.12)',
    controlBtnActiveBg: '#dfff00',
    controlBtnActiveText: '#000000',
  },
  autoplayButtonColors: {
    autoplayFabBg: 'rgba(255,255,255,0.06)',
    autoplayFabHoverBg: 'rgba(223,255,0,0.1)',
    autoplayFabBorder: 'rgba(223,255,0,0.28)',
    autoplayFabText: '#ffffff',
    autoplayFabActiveBg: '#dfff00',
    autoplayFabActiveText: '#000000',
  },
  actionButton: {
    showActionButton: true,
    actionButtonBg: '#000000',
    actionButtonHoverBg: '#333333',
    actionButtonIconColor: '#ffffff',
    actionButtonHoverIconColor: '#ffffff',
    actionButtonSize: 44,
    actionButtonIconSize: 55,
    actionButtonBorderRadius: 50,
    actionButtonPosition: 'bottom-right',
  },
  overlayTitleTypography: {
    overlayTitleFont: {
      fontFamily: 'Montserrat',
      fontSize: 24,
      fontWeight: 700,
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 0.2,
    },
    overlayTitleTextTransform: 'none',
  },
  overlayDescTypography: {
    overlayDescFont: {
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left',
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    overlayDescTextTransform: 'none',
  },
}
