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
    <Section
      id="about"
      eyebrow="About the event"
      title="One morning. One road. One family."
      subtitle={`${event.name} is the flagship run of the ${event.organizerFor} — ${event.organizerForLong}. Organised by ${event.organizer}, it brings alumni, students, teachers and the people of Halishahar together for a cause that lasts well past the finish line.`}
    >
      <div className="grid gap-6 md:grid-cols-3">
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
