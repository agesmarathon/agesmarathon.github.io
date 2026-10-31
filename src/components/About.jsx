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
      {/* a pull quote: serif voice, red rule, one passage of three lines */}
      <figure className="relative mt-10 max-w-4xl pl-8 sm:pl-14">
        <span
          aria-hidden="true"
          className="quote-type pointer-events-none absolute -top-6 left-0 select-none text-[7rem] leading-none text-crimson-500/25 sm:-top-8 sm:text-[9rem]"
        >
          &ldquo;
        </span>
        <span className="absolute bottom-10 left-0 top-2 w-px bg-gradient-to-b from-crimson-500/70 via-crimson-500/25 to-transparent" />

        <blockquote className="quote-type space-y-4 text-2xl leading-[1.3] text-slate-100 sm:text-4xl sm:leading-[1.25]">
          {event.quote.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </blockquote>

        <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em] text-slate-300 sm:tracking-[0.3em]">
          <span className="h-px w-8 bg-crimson-500/60" />
          {event.quote.author}
          <span className="text-slate-400">·</span>
          {event.quote.authorNote}
        </figcaption>
      </figure>

      {/* who AGES is, for anyone landing here for the first time */}
      <p className="mt-10 max-w-3xl border-l-2 border-crimson-500/50 pl-5 text-lg leading-relaxed text-slate-100">
        {event.name} is the flagship run of the {event.organizerFor} — {event.organizerForLong}. Organised by{' '}
        {event.organizer}, it brings alumni, students, teachers and the people of Halishahar together for a cause
        that lasts well past the finish line.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-crimson-500/40 hover:bg-white/[0.07]"
          >
            {/* oversized index watermark */}
            <span className="display pointer-events-none absolute -right-2 -top-6 text-8xl text-white/[0.04] transition group-hover:text-crimson-500/10">
              0{i + 1}
            </span>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-crimson-500/30 bg-crimson-500/10 text-2xl">
              {p.icon}
            </div>
            <h3 className="display mt-5 text-2xl text-white">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{p.text}</p>
            <span className="mt-5 block h-px w-10 bg-crimson-500/50 transition-all group-hover:w-20" />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-dashed divide-white/10 overflow-hidden rounded-2xl border border-crimson-500/25 bg-gradient-to-br from-crimson-500/[0.07] to-transparent md:grid-cols-4 md:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-8 text-center">
            <div className="display glow-red text-4xl text-crimson-400">{s.value}</div>
            <div className="mt-2 text-[11px] uppercase tracking-widest text-slate-300">{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
