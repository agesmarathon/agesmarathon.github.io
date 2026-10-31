import { useState } from 'react'
import { faqs, event } from '../data/event'
import { Section } from './Section'

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" eyebrow="Good to know" title="Frequently asked questions">
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border transition ${
                isOpen
                  ? 'border-gold-500/45 bg-gradient-to-b from-gold-500/[0.08] to-white/[0.02]'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span
                  className={`display flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition ${
                    isOpen
                      ? 'border-gold-500 bg-gold-500 text-navy-950'
                      : 'border-white/20 text-slate-400'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-semibold text-white">{f.q}</span>
                <span
                  className={`text-xl text-gold-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="border-t border-dashed border-white/10 px-5 py-5 text-sm leading-relaxed text-slate-300 sm:px-6 sm:pl-[4.5rem]">
                  {f.a}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] p-7 text-center sm:flex-row sm:text-left">
        <div>
          <h3 className="display text-2xl text-white">Still have a question?</h3>
          <p className="mt-1 text-sm text-slate-300">
            The organising team answers on {event.phone} and {event.email}.
          </p>
        </div>
        <a
          href="#register"
          className="shrink-0 rounded-full bg-gold-500 px-7 py-3 text-sm font-bold text-navy-950 transition hover:bg-gold-400"
        >
          Register now →
        </a>
      </div>
    </Section>
  )
}
