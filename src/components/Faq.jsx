import { useState } from 'react'
import { faqs } from '../data/event'
import { Section } from './Section'

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" eyebrow="Good to know" title="Frequently asked questions">
      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-white/[0.04]"
              aria-expanded={open === i}
            >
              <span className="font-semibold text-white">{f.q}</span>
              <span className={`text-gold-500 transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open === i && <p className="px-6 pb-6 text-sm leading-relaxed text-slate-300">{f.a}</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}
