import { event } from '../data/event'
import { Section } from './Section'
import { asset } from '../lib/asset'

const rows = [
  { icon: '📅', label: 'Date', value: event.dateLabel },
  { icon: '⏱', label: 'Reporting', value: '4:45 AM at the school gate' },
  { icon: '🅿️', label: 'Parking', value: 'Free, inside the school ground' },
  { icon: '🚑', label: 'Support', value: 'Water points on route · ambulance on standby' },
]

export function Venue() {
  return (
    <Section id="venue" eyebrow="Where" title="Start & finish line">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* photo with an offset gold outline behind it */}
        <div className="relative">
          <span className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl border-2 border-gold-500/40 sm:block" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img src={asset("images/venue.jpg")} alt={event.venue} className="h-[420px] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent p-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-navy-950/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400 backdrop-blur">
                📍 Halishahar, Chattogram
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="display text-3xl text-white sm:text-4xl">{event.venue}</h3>
          <p className="mt-3 leading-relaxed text-slate-300">{event.venueAddress}</p>

          <dl className="mt-8 divide-y divide-dashed divide-white/10 border-y border-dashed border-white/10 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  {r.icon}
                </span>
                <dt className="w-24 shrink-0 text-xs uppercase tracking-widest text-slate-400">{r.label}</dt>
                <dd className="font-medium text-white">{r.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-gold-500/60 hover:bg-white/10"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </Section>
  )
}
