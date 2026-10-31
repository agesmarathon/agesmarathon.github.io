import { schedule } from '../data/event'
import { Section } from './Section'

export function Schedule() {
  return (
    <Section
      id="schedule"
      eyebrow="Race day"
      title="Schedule"
      subtitle="Reach the ground early — BIB collection closes 15 minutes before your flag-off."
    >
      <ol className="relative border-l border-white/15 pl-8">
        {schedule.map((s, i) => (
          <li key={s.time} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border border-gold-500/50 bg-navy-950 text-[10px] font-bold text-gold-500">
              {i + 1}
            </span>
            <div className="display text-xl text-gold-400">{s.time}</div>
            <h3 className="mt-1 text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{s.note}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
