import { categories, payment, event } from '../data/event'
import { Section } from './Section'
import { asset } from '../lib/asset'

// thin varying bars, like the barcode printed on a real race BIB
const barcode = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 4, 2, 1, 1, 3]

function Barcode() {
  return (
    <div className="flex h-6 items-end gap-[3px] opacity-40">
      {barcode.map((w, i) => (
        <span key={i} className="block h-full bg-current" style={{ width: `${w}px` }} />
      ))}
    </div>
  )
}

export function Categories() {
  return (
    <Section
      id="categories"
      eyebrow="Race categories"
      title="Two distances, one finish line"
      subtitle="Your distance follows the gender you select on the registration form — there is nothing extra to choose. Open to every age."
    >
      <div className="grid gap-7 md:grid-cols-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="group relative flex flex-col rounded-3xl border border-gold-500/60 bg-gradient-to-b from-gold-500/15 to-white/[0.03] p-7 shadow-xl shadow-gold-600/10 transition hover:-translate-y-1 hover:border-gold-500" 
          >
            {/* BIB header strip */}
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                <img src={asset("images/logo.jpg")} alt="" className="h-6 w-6 rounded-full object-cover" />
                AGES Marathon
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                {event.dateLabel}
              </span>
            </div>

            {/* the distance, printed like a BIB number */}
            <div className="mt-6 text-center">
              <div className="display text-7xl leading-none text-white sm:text-8xl">{c.distance}</div>
              <h3 className="mt-3 text-lg font-semibold text-gold-400">{c.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{c.who}</p>
            </div>

            <div className="mt-6 flex justify-center text-white">
              <Barcode />
            </div>

            {/* punched divider */}
            <div className="ticket-notch relative my-6 border-t border-dashed border-white/20" />

            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Entry fee</p>
                <p className="display text-3xl text-white">{c.fee}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Age limit</p>
                <p className="font-semibold text-slate-100">{c.age}</p>
              </div>
            </div>

            <ul className="mt-6 flex-1 space-y-2 text-sm text-slate-300">
              {c.perks.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-gold-500">✓</span>
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="#form"
              className="mt-7 rounded-full bg-gold-500 py-3 text-center text-sm font-bold text-navy-950 transition hover:bg-gold-400" 
            >
              Register for {c.distance}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-7 flex flex-wrap items-center gap-x-2 text-sm text-slate-400">
        <span className="text-gold-500">★</span>
        Entry fee is {payment.fee} for every participant, paid by {payment.method}. Certificates are not issued for
        this event.
      </p>
    </Section>
  )
}
