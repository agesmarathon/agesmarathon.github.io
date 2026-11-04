import { useReveal } from '../lib/useReveal'

export function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  const ref = useReveal()
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div ref={ref} className="reveal mx-auto w-full max-w-6xl px-5">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-crimson-400">
            {eyebrow}
          </p>
        )}
        {title && (
          <>
            <h2 className="display text-4xl text-white sm:text-5xl">{title}</h2>
            <div className="mt-5 flex items-center text-xs text-crimson-400/60">
              <span>★</span>
            </div>
          </>
        )}
        {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200">{subtitle}</p>}
        <div className={title ? 'mt-12' : ''}>{children}</div>
      </div>
    </section>
  )
}
