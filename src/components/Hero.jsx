import { event } from '../data/event'
import { Countdown } from './Countdown'

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src="/images/run.jpg"
        alt="Runners at a past AGES event"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          {event.motto}
        </span>

        <h1 className="display mt-6 text-6xl leading-[0.9] text-white sm:text-8xl lg:text-[7.5rem]">
          AGES
          <br />
          <span className="text-gold-500">Marathon</span>{' '}
          <span className="text-white/90">{event.year}</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg font-medium text-slate-200">{event.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
          <span>📅 {event.dateLabel}</span>
          <span>⏱ {event.timeLabel}</span>
          <span>📍 {event.city}</span>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#register"
            className="rounded-full bg-gold-500 px-8 py-4 text-center text-base font-bold text-navy-950 shadow-xl shadow-gold-600/20 transition hover:-translate-y-0.5 hover:bg-gold-400"
          >
            Register Free Online
          </a>
          <a
            href="#categories"
            className="rounded-full border border-white/25 px-8 py-4 text-center text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
          >
            See race categories
          </a>
        </div>

        <div className="mt-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Flag-off countdown
          </p>
          <Countdown dateISO={event.dateISO} />
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-400">
          Organized by {event.organizer} · on behalf of {event.organizerFor}
        </p>
      </div>
    </section>
  )
}
