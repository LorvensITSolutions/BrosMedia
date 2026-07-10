// Vite port of Framer CharacterImageReveal
// https://framer.com/m/CharacterImageReveal-aEoTrs.js@YI9QAML1dZv4gs21LgpQ

import { useMemo, useState } from 'react'

export default function CharacterImageReveal({
  text = 'Hover Me',
  images = [],
  textColor = '#000000',
  imageSize = 60,
  offsetX = 0,
  offsetY = 0,
  objectFit = 'cover',
  className = '',
  style,
  font = {},
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const characters = useMemo(
    () =>
      text.split('').map((char, index) => ({
        char,
        index,
        isSpace: char === ' ',
      })),
    [text],
  )

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: 0,
        color: textColor,
        ...font,
        ...style,
      }}
    >
      {characters.map(({ char, index, isSpace }) => {
        const image = images.length > 0 ? images[index % images.length] : null

        return (
          <span
            key={`${char}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              display: 'inline-block',
              whiteSpace: 'pre',
              cursor: isSpace ? 'default' : 'pointer',
            }}
          >
            <span
              style={{
                opacity: hoveredIndex === index ? 0 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {char}
            </span>
            {hoveredIndex === index && !isSpace && image?.src ? (
              <img
                src={image.src}
                alt={image.alt || ''}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
                  width: imageSize,
                  height: imageSize,
                  objectFit,
                  borderRadius: 4,
                  backgroundColor: objectFit === 'contain' ? '#000000' : undefined,
                  padding: objectFit === 'contain' ? 6 : undefined,
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
                loading="lazy"
              />
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
