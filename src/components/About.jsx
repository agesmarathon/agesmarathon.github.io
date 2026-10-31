import { event, stats } from '../data/event'
import { Section } from './Section'

const pillars = [
  { icon: '🏃', title: 'Fitness for a better tomorrow', text: 'A morning run that gets the whole neighbourhood moving, from school juniors to senior alumni.' },
  { icon: '🤝', title: 'A stronger alumni network', text: 'Batch after batch of GNHS ex-students on the same road, building the connections AGES was founded for.' },
  { icon: '❤️', title: 'A healthier community', text: 'Every registration supports AGES welfare work for the school and the families around it.' },
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
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-gold-500/40 hover:bg-white/[0.07]"
          >
            <div className="text-3xl">{p.icon}</div>
            <h3 className="mt-4 display text-2xl text-white">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-navy-950 px-6 py-8 text-center">
            <div className="display text-4xl text-gold-500">{s.value}</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
