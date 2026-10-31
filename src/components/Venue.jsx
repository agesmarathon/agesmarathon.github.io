import { event } from '../data/event'
import { Section } from './Section'

export function Venue() {
  return (
    <Section id="venue" eyebrow="Where" title="Start & finish line">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img src="/images/venue.jpg" alt={event.venue} className="h-[420px] w-full object-cover" />
        </div>
        <div>
          <h3 className="display text-3xl text-white">{event.venue}</h3>
          <p className="mt-3 leading-relaxed text-slate-300">{event.venueAddress}</p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 uppercase tracking-widest text-slate-400">Date</dt>
              <dd className="font-medium text-white">{event.dateLabel}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 uppercase tracking-widest text-slate-400">Reporting</dt>
              <dd className="font-medium text-white">4:45 AM at the school gate</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 uppercase tracking-widest text-slate-400">Parking</dt>
              <dd className="font-medium text-white">Free, inside the school ground</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 uppercase tracking-widest text-slate-400">Support</dt>
              <dd className="font-medium text-white">Water points on route · ambulance on standby</dd>
            </div>
          </dl>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </Section>
  )
}
