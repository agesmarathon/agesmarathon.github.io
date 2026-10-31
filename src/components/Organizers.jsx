import { event } from '../data/event'
import { Section } from './Section'

export function Organizers() {
  return (
    <Section id="organizers" eyebrow="Behind the run" title="Organising committee">
      <div className="grid items-center gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 overflow-hidden rounded-3xl border border-white/10">
          <img src="/images/banner.jpg" alt="AGES Marathon organising committee" className="w-full object-cover" />
        </div>
        <div className="lg:col-span-2">
          <h3 className="display text-3xl text-white">{event.organizer}</h3>
          <p className="mt-1 text-sm uppercase tracking-widest text-gold-500">on behalf of {event.organizerFor}</p>
          <p className="mt-5 leading-relaxed text-slate-300">
            The Association of GNHS Ex-Students is the official alumni organization of Garib-E-Newaz High School in
            Halishahar Housing Estate, Chattogram. Since 2022 it has worked to keep every batch connected — through
            welfare drives, school support and events like this one. The marathon is run entirely by volunteers from
            the alumni body.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <p className="text-slate-300">
              <span className="text-slate-500">Email · </span>
              <a href={`mailto:${event.email}`} className="text-gold-400 underline underline-offset-4">{event.email}</a>
            </p>
            <p className="text-slate-300">
              <span className="text-slate-500">Hotline · </span>{event.phone}
            </p>
          </div>
          <a
            href="#register"
            className="mt-8 inline-block rounded-full bg-gold-500 px-7 py-3 text-sm font-bold text-navy-950 transition hover:bg-gold-400"
          >
            Join the run
          </a>
        </div>
      </div>
    </Section>
  )
}
