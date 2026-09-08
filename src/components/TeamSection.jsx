import { motion } from 'framer-motion'
import { teamCrew, teamFounders, teamIntro } from '../data/team'
import {
  SECTION_HEADING_CLASS,
  scrollFadeUp,
  scrollStagger,
  scrollViewport,
} from '../lib/scrollMotion'

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
    <motion.article variants={scrollFadeUp} className="h-full">
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
      viewport={scrollViewport}
      variants={scrollStagger}
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
      <div className="section-pad relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scrollStagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={scrollFadeUp}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {teamIntro.label}
          </motion.p>
          <motion.h2 variants={scrollFadeUp} className={SECTION_HEADING_CLASS}>
            <span className="text-white">{teamIntro.headlineBefore} </span>
            <span className="text-accent">{teamIntro.headlineAccent}</span>
          </motion.h2>
          <motion.p
            variants={scrollFadeUp}
            className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
          >
            {teamIntro.description}
          </motion.p>
        </motion.div>

        <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
          <MemberRow
            members={teamFounders}
            columnsClass="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5"
          />
          <MemberRow
            members={teamCrew}
            columnsClass="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-5"
          />
        </div>
      </div>
    </section>
  )
}
