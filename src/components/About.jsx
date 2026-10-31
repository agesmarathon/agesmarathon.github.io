import { event, stats } from '../data/event'
import { Section } from './Section'

const pillars = [
  {
    icon: '🏃',
    title: 'Fitness for a better tomorrow',
    text: 'A morning run that gets the whole neighbourhood moving, from school juniors to senior alumni.',
  },
  {
    icon: '🤝',
    title: 'A stronger alumni network',
    text: 'Batch after batch of GNHS ex-students on the same road, building the connections AGES was founded for.',
  },
  {
    icon: '❤️',
    title: 'A healthier community',
    text: 'Every registration supports AGES welfare work for the school and the families around it.',
  },
]

export function About() {
  return (
    <Section id="about" eyebrow="About the event">
      {/* the event's own words carry this section instead of a plain heading */}
      <blockquote className="max-w-3xl">
        <p className="text-lg italic leading-relaxed text-slate-300 sm:text-xl">{event.quote.lead}</p>

        <p className="display mt-6 text-4xl leading-[1.05] text-white sm:text-6xl">{event.quote.text}</p>

        <div className="mt-6 flex items-center gap-3 text-gold-500/60">
          <span className="h-px w-16 bg-gold-500/40" />
          <span className="text-xs">★</span>
          <span className="h-px w-8 bg-gold-500/20" />
        </div>

        <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">{event.quote.closer}</p>

        <footer className="mt-5 text-xs uppercase tracking-[0.25em] text-slate-500">
          {event.quote.author}
          <span className="text-slate-600"> · </span>
          {event.quote.authorNote}
        </footer>
      </blockquote>

      {/* who AGES is, for anyone landing here for the first time */}
      <p className="mt-10 max-w-3xl border-l-2 border-white/10 pl-5 text-base leading-relaxed text-slate-400">
        {event.name} is the flagship run of the {event.organizerFor} — {event.organizerForLong}. Organised by{' '}
        {event.organizer}, it brings alumni, students, teachers and the people of Halishahar together for a cause
        that lasts well past the finish line.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-gold-500/40 hover:bg-white/[0.07]"
          >
            {/* oversized index watermark */}
            <span className="display pointer-events-none absolute -right-2 -top-6 text-8xl text-white/[0.04] transition group-hover:text-gold-500/10">
              0{i + 1}
            </span>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-2xl">
              {p.icon}
            </div>
            <h3 className="display mt-5 text-2xl text-white">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.text}</p>
            <span className="mt-5 block h-px w-10 bg-gold-500/50 transition-all group-hover:w-20" />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-dashed divide-white/10 overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-br from-gold-500/[0.07] to-transparent md:grid-cols-4 md:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-8 text-center">
            <div className="display text-4xl text-gold-500">{s.value}</div>
            <div className="mt-2 text-[11px] uppercase tracking-widest text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
