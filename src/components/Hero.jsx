import { event } from '../data/event'
import { Countdown } from './Countdown'
import { useParallax } from '../lib/useParallax'
import { asset } from '../lib/asset'

const facts = [
  { icon: '📅', text: event.dateLabel },
  { icon: '⏱', text: event.timeLabel },
  { icon: '📍', text: event.city },
]

export function Hero() {
  const bg = useParallax(0.12)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <img
        ref={bg}
        src={asset("images/run.jpg")}
        alt="Runners at a past AGES event"
        className="absolute -top-[20%] left-0 h-[140%] w-full object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-950/85 to-forest-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/70" />
      <div className="stripes absolute inset-0" />

      {/* date stamp running up the left edge, desktop only */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="display block -rotate-90 whitespace-nowrap text-sm tracking-[0.4em] text-white/35">
          16 · 12 · 2026
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-crimson-400">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
          {event.motto}
        </span>

        {/* red rule beside the headline */}
        <div className="mt-6 flex gap-5">
          <span className="mt-2 hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-crimson-500 to-transparent sm:block" />
          <h1 className="display text-6xl leading-[0.9] text-white sm:text-8xl lg:text-[7.5rem]">
            <span className="glow-red text-crimson-400">AGES</span>
            <br />
            Marathon <span className="text-white/80">{event.year}</span>
          </h1>
        </div>

        <p className="mt-5 max-w-xl text-lg font-medium text-slate-100">{event.tagline}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          {facts.map((f) => (
            <span
              key={f.text}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-slate-100 backdrop-blur"
            >
              <span>{f.icon}</span>
              {f.text}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#form"
            className="btn-shine group rounded-full bg-crimson-500 px-8 py-4 text-center text-base font-bold text-white shadow-xl shadow-crimson-600/20 transition hover:-translate-y-0.5 hover:bg-crimson-400"
          >
            Register Free Online
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#categories"
            className="rounded-full border border-white/25 px-8 py-4 text-center text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
          >
            See race categories
          </a>
        </div>

        <div className="mt-14">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <span className="h-px w-6 bg-crimson-500/50" />
            Flag-off countdown
          </p>
          <Countdown dateISO={event.dateISO} />
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-300">
          Organized by {event.organizer} · on behalf of {event.organizerFor}
        </p>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50 transition hover:text-crimson-400 sm:flex"
      >
        Scroll
        <span className="animate-bounce text-base">↓</span>
      </a>
    </section>
  )
}
