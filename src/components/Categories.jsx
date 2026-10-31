import { categories, payment } from '../data/event'
import { Section } from './Section'

export function Categories() {
  return (
    <Section
      id="categories"
      eyebrow="Race categories"
      title="Two distances, one finish line"
      subtitle="Your distance follows the gender you select on the registration form — there is nothing extra to choose. Open to every age."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className={`relative flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 ${
              c.featured
                ? 'border-gold-500/60 bg-gradient-to-b from-gold-500/15 to-white/[0.03] shadow-xl shadow-gold-600/10'
                : 'border-white/10 bg-white/[0.04] hover:border-white/25'
            }`}
          >
            <div className="display text-6xl text-white">{c.distance}</div>
            <h3 className="mt-2 text-lg font-semibold text-gold-400">{c.name}</h3>
            <p className="mt-1 text-sm text-slate-400">{c.who}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="display text-4xl text-white">{c.fee}</span>
              <span className="text-xs uppercase tracking-widest text-slate-400">entry fee</span>
            </div>

            <div className="mt-6 flex justify-between border-y border-white/10 py-4 text-sm">
              <span className="text-slate-400">Age limit</span>
              <span className="font-medium text-slate-100">{c.age}</span>
            </div>

            <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-300">
              {c.perks.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-gold-500">✓</span>
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="#register"
              className={`mt-7 rounded-full py-3 text-center text-sm font-bold transition ${
                c.featured
                  ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                  : 'border border-white/25 text-white hover:bg-white/10'
              }`}
            >
              Register for {c.distance}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Entry fee is {payment.fee} for every participant, paid by {payment.method}. Certificates are not issued for
        this event.
      </p>
    </Section>
  )
}
