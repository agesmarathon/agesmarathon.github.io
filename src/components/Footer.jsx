import { event } from '../data/event'
import { Band } from './Band'
import { asset } from '../lib/asset'
import { FiArrowRight, FiArrowUpRight, FiArrowUp } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-forest-950">
      <Band tone="muted" />
      <div className="stripes absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src={asset("images/logo.jpg")}
                alt="AGES logo"
                className="h-14 w-14 rounded-full object-cover ring-2 ring-crimson-500/60"
              />
              <div>
                <div className="display text-2xl text-white">
                  <span className="glow-red text-crimson-400">AGES</span> Marathon
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-400">{event.motto}</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              {event.dateLabel} · {event.venue}, {event.venueAddress}. Organised by {event.organizer} on behalf of the{' '}
              {event.organizerFor}.
            </p>
            <a
              href="#form"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-crimson-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-crimson-400"
            >
              <span>Register now</span>
              <FiArrowRight className="text-base" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Event
              </h4>
              <ul className="space-y-2 text-slate-200">
                <li><a href="#about" className="transition hover:text-crimson-400">About</a></li>
                <li><a href="#categories" className="transition hover:text-crimson-400">Categories</a></li>
                <li><a href="#schedule" className="transition hover:text-crimson-400">Schedule</a></li>
                <li><a href="#venue" className="transition hover:text-crimson-400">Venue</a></li>
                <li><a href="#gallery" className="transition hover:text-crimson-400">Gallery</a></li>
                <li><a href="#faq" className="transition hover:text-crimson-400">FAQ</a></li>
              </ul>
            </div>
            <div className="min-w-0">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Contact
              </h4>
              <ul className="space-y-2 text-slate-200">
                <li>
                  <a href={`mailto:${event.email}`} className="break-all transition hover:text-crimson-400">
                    {event.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${event.phone.replace(/[^+\d]/g, '')}`} className="transition hover:text-crimson-400">
                    {event.phone}
                  </a>
                </li>
                <li>
                  <a href={event.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition hover:text-crimson-400">
                    <span>Facebook</span>
                    <FiArrowUpRight className="text-xs" />
                  </a>
                </li>
                <li>
                  <a href={event.formUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition hover:text-crimson-400">
                    <span>Register</span>
                    <FiArrowUpRight className="text-xs" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-dashed border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} {event.organizerFor}. All rights reserved.</span>
          <a href="#top" className="inline-flex items-center gap-1 transition hover:text-crimson-400">
            <span>Back to top</span>
            <FiArrowUp className="text-xs" />
          </a>
        </div>
      </div>
    </footer>
  )
}
