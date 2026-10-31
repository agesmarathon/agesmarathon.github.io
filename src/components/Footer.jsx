import { event } from '../data/event'
import { Band } from './Band'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-950">
      <Band tone="muted" />
      <div className="stripes absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="AGES logo"
                className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-500/60"
              />
              <div>
                <div className="display text-2xl text-white">
                  AGES <span className="text-gold-500">Marathon</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500">{event.motto}</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {event.dateLabel} · {event.venue}, {event.venueAddress}. Organised by {event.organizer} on behalf of the{' '}
              {event.organizerFor}.
            </p>
            <a
              href="#form"
              className="mt-6 inline-block rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-gold-400"
            >
              Register now →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-px w-4 bg-gold-500/60" />
                Event
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#about" className="transition hover:text-gold-400">About</a></li>
                <li><a href="#categories" className="transition hover:text-gold-400">Categories</a></li>
                <li><a href="#schedule" className="transition hover:text-gold-400">Schedule</a></li>
                <li><a href="#venue" className="transition hover:text-gold-400">Venue</a></li>
                <li><a href="#faq" className="transition hover:text-gold-400">FAQ</a></li>
              </ul>
            </div>
            <div className="min-w-0">
              <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <span className="h-px w-4 bg-gold-500/60" />
                Contact
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href={`mailto:${event.email}`} className="break-all transition hover:text-gold-400">
                    {event.email}
                  </a>
                </li>
                <li>{event.phone}</li>
                <li>
                  <a href={event.facebook} target="_blank" rel="noreferrer" className="transition hover:text-gold-400">
                    Facebook ↗
                  </a>
                </li>
                <li>
                  <a href={event.formUrl} target="_blank" rel="noreferrer" className="transition hover:text-gold-400">
                    Register ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-dashed border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} {event.organizerFor}. All rights reserved.</span>
          <a href="#top" className="transition hover:text-gold-400">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
