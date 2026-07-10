// Port inspired by Framer Project Split Card
// https://framer.com/m/Project-Split-Card-Py7Xwa.js@znYM0Ch8FvtiWANUqF4U

import { useState } from 'react'
import { motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 90, damping: 24, mass: 0.75 }
const hoverSpring = { type: 'spring', bounce: 0, duration: 0.6 }

function PreviewCard({ image, title, industry, hovered }) {
  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-[32px] bg-[#141414] p-6 sm:min-h-[360px] lg:min-h-0">
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        <motion.img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          animate={{
            scale: hovered ? 1.4 : 1,
            rotate: hovered ? -5 : 0,
          }}
          transition={hoverSpring}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end">
        <p className="text-2xl font-semibold text-white sm:text-[32px] sm:leading-tight">{title}</p>
        <p className="mt-2 text-sm font-medium text-white">{industry}</p>
      </div>
    </div>
  )
}

function DetailsCard({ brandIcon, description, categories, hovered }) {
  return (
    <motion.div
      className="flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-[32px] border border-primary/10 p-6"
      animate={{
        backgroundColor: hovered ? 'rgba(30, 69, 255, 0.08)' : 'rgb(245, 245, 245)',
        borderColor: hovered ? 'rgba(30, 69, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      }}
      transition={hoverSpring}
    >
      <ul className="flex flex-col items-end gap-2">
        {categories.map((category) => (
          <li
            key={category}
            className="w-full text-right text-sm font-medium text-primary/55"
          >
            {category}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-5">
       
        <p className="text-sm font-medium leading-relaxed text-primary/75 text-balance">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ProjectSplitCard({
  image,
  brandIcon,
  previewTitle,
  previewIndustry,
  categories = [],
  description,
  quote,
  className = '',
}) {
  const [hovered, setHovered] = useState(false)
  const fullDescription = quote ? `${quote} ${description}` : description

  return (
    <motion.div
      className={`flex w-full cursor-default flex-col gap-2 lg:h-[500px] lg:flex-row ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileTap={{ scale: 0.995 }}
      transition={spring}
    >
      <div className="min-h-[280px] flex-[2] lg:min-h-0">
        <PreviewCard
          image={image}
          title={previewTitle}
          industry={previewIndustry}
          hovered={hovered}
        />
      </div>
      <div className="min-h-[240px] flex-1 lg:min-h-0">
        <DetailsCard
          brandIcon={brandIcon}
          description={fullDescription}
          categories={categories}
          hovered={hovered}
        />
      </div>
    </motion.div>
  )
}

export function PhilosophySplitCard({ philosophy }) {
  const { splitCard, quote, body, label, title } = philosophy

  return (
    <ProjectSplitCard
      image={splitCard.image}
      brandIcon={splitCard.brandIcon}
      previewTitle={splitCard.previewTitle || title}
      previewIndustry={splitCard.previewIndustry || label}
      categories={splitCard.categories}
      quote={quote}
      description={body}
    />
  )
}
