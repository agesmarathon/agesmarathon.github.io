import { event } from '../data/event'
import { asset } from '../lib/asset'
import { useReveal } from '../lib/useReveal'

// A quiet full-width moment between the gallery and the FAQ.
export function QuoteBand() {
  const ref = useReveal()

  return (
    <section className="relative overflow-hidden border-y border-white/10">
      <img
        src={asset('images/run.jpg')}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/85 to-navy-950" />
      <div className="stripes absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div ref={ref} className="reveal relative mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
        <span className="display block text-7xl leading-none text-gold-500/40" aria-hidden="true">
          &ldquo;
        </span>

        <blockquote>
          <p className="text-lg italic leading-relaxed text-slate-300 sm:text-xl">{event.quote.lead}</p>

          <p className="display mt-6 text-4xl leading-[1.1] text-white sm:text-6xl">{event.quote.text}</p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {event.quote.closer}
          </p>
        </blockquote>

        <div className="mx-auto mt-8 flex max-w-max items-center gap-3 text-gold-500/60">
          <span className="h-px w-16 bg-gold-500/40" />
          <span className="text-xs">★</span>
          <span className="h-px w-16 bg-gold-500/40" />
        </div>

        <figcaption className="mt-6 text-sm uppercase tracking-[0.25em] text-slate-400">
          {event.quote.author}
          <span className="text-slate-600"> · </span>
          {event.quote.authorNote}
        </figcaption>
      </div>
    </section>
  )
}
