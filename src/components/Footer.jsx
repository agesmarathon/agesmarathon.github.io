import { event } from '../data/event'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="AGES logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-500/60" />
              <div>
                <div className="display text-xl text-white">AGES <span className="text-gold-500">Marathon</span></div>
                <div className="text-xs uppercase tracking-widest text-slate-500">{event.motto}</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {event.dateLabel} · {event.venue}, {event.venueAddress}. Organised by {event.organizer} on behalf
              of the {event.organizerFor}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Event</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#about" className="hover:text-gold-400">About</a></li>
                <li><a href="#categories" className="hover:text-gold-400">Categories</a></li>
                <li><a href="#schedule" className="hover:text-gold-400">Schedule</a></li>
                <li><a href="#venue" className="hover:text-gold-400">Venue</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href={`mailto:${event.email}`} className="hover:text-gold-400">{event.email}</a></li>
                <li>{event.phone}</li>
                <li><a href={event.facebook} target="_blank" rel="noreferrer" className="hover:text-gold-400">Facebook ↗</a></li>
                <li><a href={event.formUrl} target="_blank" rel="noreferrer" className="hover:text-gold-400">Register ↗</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {event.organizerFor}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
