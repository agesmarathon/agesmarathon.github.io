import { useReveal } from '../lib/useReveal'

export function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  const ref = useReveal()
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div ref={ref} className="reveal mx-auto w-full max-w-6xl px-5">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">{eyebrow}</p>
        )}
        {title && <h2 className="display text-4xl sm:text-5xl text-white">{title}</h2>}
        {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{subtitle}</p>}
        <div className={title ? 'mt-12' : ''}>{children}</div>
      </div>
    </section>
  )
}
