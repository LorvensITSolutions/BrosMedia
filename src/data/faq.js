export const faqIntro = {
  label: "Let's talk",
  title: 'About working with Brosmedia',
  description:
    'Straight answers to what brands usually ask before a first call - then book a free strategy session.',
}

/** Editorial objection-handling (replaces template FAQ accordion). */
export const talkPoints = [
  {
    id: 'start',
    title: 'How we start',
    body: 'A WhatsApp or a booked strategy call is enough. We spend 30 minutes on your brand, goals, and constraints - no pitch deck theatre, no commitment required.',
  },
  {
    id: 'size',
    title: 'Small businesses welcome',
    body: 'Most of our clients are growing brands, not mega-corps. What matters is whether you are serious about the brand - not how big the retainer looks on day one.',
  },
  {
    id: 'location',
    title: 'Hyderabad-based, India-ready',
    body: 'We work from Jubilee Hills and deliver remotely across India. Strategy calls, creatives, websites, and ads all run without needing you in the room.',
  },
  {
    id: 'engagement',
    title: 'Projects and retainers',
    body: 'Branding, websites, and brochures are quoted per project. Social, ads, and ongoing content run on monthly retainers - clear scope, no fuzzy “minimum months” traps.',
  },
  {
    id: 'in-house',
    title: 'All work in-house',
    body: 'Design, development, video, content, and ads stay with our team. You deal with one crew that owns the outcome.',
  },
]

/** Kept for any legacy imports; prefer talkPoints. */
export const faqItems = talkPoints.map((point) => ({
  id: point.id,
  question: point.title,
  answer: point.body,
}))
