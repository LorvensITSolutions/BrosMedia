import { motion } from 'framer-motion'
import { teamCrew, teamFounders, teamIntro } from '../data/team'

const spring = { type: 'spring', stiffness: 90, damping: 22, mass: 0.7 }
const viewport = { once: true, margin: '-60px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

function MemberCard({ member }) {
  const inner = (
    <>
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15 sm:h-24 sm:w-24"
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-lg font-bold text-primary sm:h-24 sm:w-24 sm:text-xl"
          aria-hidden
        >
          {member.initials}
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold text-white">{member.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        {member.role}
      </p>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/55">
        {member.bio}
      </p>
      {member.linkedin ? (
        <p className="mt-3 text-xs font-semibold text-accent/80 transition group-hover:text-accent">
          LinkedIn →
        </p>
      ) : null}
    </>
  )

  const cardClass =
    'group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition hover:border-accent/30 hover:bg-white/[0.05] sm:p-6'

  return (
    <motion.article variants={fadeUp} className="h-full">
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          aria-label={`${member.name} on LinkedIn`}
        >
          {inner}
        </a>
      ) : (
        <div className={cardClass}>{inner}</div>
      )}
    </motion.article>
  )
}

function MemberRow({ members, columnsClass }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className={columnsClass}
    >
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </motion.div>
  )
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-black font-sans text-white"
      aria-label="Brosmedia team"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {teamIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(1.65rem,4.5vw,2.75rem)] font-black tracking-tight"
          >
            <span className="text-white">{teamIntro.headlineBefore} </span>
            <span className="text-accent">{teamIntro.headlineAccent}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
          >
            {teamIntro.description}
          </motion.p>
        </motion.div>

        <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
          <MemberRow
            members={teamFounders}
            columnsClass="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5"
          />
          <MemberRow
            members={teamCrew}
            columnsClass="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-5"
          />
        </div>

        <p className="mt-8 text-center text-xs text-white/35">
          Click a crew card to open LinkedIn.
        </p>
      </div>
    </section>
  )
}
