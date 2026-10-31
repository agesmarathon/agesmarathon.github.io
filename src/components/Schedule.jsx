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
      <ol className="relative space-y-4 pl-10 sm:pl-16">
        {/* the line the markers sit on */}
        <span className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-crimson-500/70 via-crimson-500/25 to-transparent sm:left-[27px]" />

        {schedule.map((s, i) => (
          <li key={s.time} className="relative">
            <span className="absolute -left-10 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-crimson-500/50 bg-forest-950 text-[10px] font-bold text-crimson-400 sm:-left-16">
              {i + 1}
            </span>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-crimson-500/35 hover:bg-white/[0.06] sm:flex sm:items-center sm:gap-6">
              <span className="display inline-block shrink-0 rounded-lg border border-crimson-500/30 bg-crimson-500/10 px-3 py-1 text-lg text-crimson-400">
                {s.time}
              </span>
              <div className="mt-3 sm:mt-0">
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 pl-10 text-xs uppercase tracking-widest text-slate-500 sm:pl-16">
        Finish line · Garib-E-Newaz High School
      </p>
    </Section>
  )
}
