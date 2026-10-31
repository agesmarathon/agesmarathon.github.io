import { event } from '../data/event'
import { Section } from './Section'
import { useParallax } from '../lib/useParallax'
import { asset } from '../lib/asset'

export function Organizers() {
  const banner = useParallax(0.05)

  return (
    <Section id="organizers" eyebrow="Behind the run" title="Organising committee">
      <div className="grid items-center gap-10 lg:grid-cols-5">
        {/* banner framed with red corner brackets */}
        <div className="relative lg:col-span-3">
          <span className="pointer-events-none absolute -left-1.5 -top-1.5 h-10 w-10 rounded-tl-3xl border-l-2 border-t-2 border-crimson-500/70" />
          <span className="pointer-events-none absolute -right-1.5 -top-1.5 h-10 w-10 rounded-tr-3xl border-r-2 border-t-2 border-crimson-500/70" />
          <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-10 w-10 rounded-bl-3xl border-b-2 border-l-2 border-crimson-500/70" />
          <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-10 w-10 rounded-br-3xl border-b-2 border-r-2 border-crimson-500/70" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <img
              ref={banner}
              src={asset("images/banner.jpg")}
              alt="AGES Marathon organising committee"
              className="absolute -top-[15%] left-0 h-[130%] w-full object-cover will-change-transform"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="display text-3xl text-white sm:text-4xl">{event.organizer}</h3>
          <p className="mt-2 flex items-center gap-3 text-sm uppercase tracking-widest text-crimson-400">
            <span className="h-px w-6 bg-crimson-500/50" />
            on behalf of AGES
          </p>
          <p className="mt-5 leading-relaxed text-slate-200">
            The Association of GNHS Ex-Students is the official alumni organization of Garib-E-Newaz High School in
            Halishahar Housing Estate, Chattogram. Founded on 30 September 2023, it works to keep every batch connected — through
            welfare drives, school support and events like this one. The marathon is run entirely by volunteers from
            the alumni body.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
            <p className="flex items-center gap-3 text-slate-200">
              <span className="text-crimson-400">✉</span>
              <a href={`mailto:${event.email}`} className="text-crimson-400 underline underline-offset-4">
                {event.email}
              </a>
            </p>
            <p className="flex items-center gap-3 text-slate-200">
              <span className="text-crimson-400">☎</span>
              <a href={`tel:${event.phone.replace(/[^+\d]/g, '')}`} className="text-crimson-400 underline underline-offset-4">
                {event.phone}
              </a>
            </p>
          </div>

          <a
            href="#form"
            className="mt-8 inline-block rounded-full bg-crimson-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-crimson-400"
          >
            Join the run →
          </a>
        </div>
      </div>
    </Section>
  )
}
