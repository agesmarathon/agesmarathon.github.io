import { useReveal } from '../lib/useReveal'

export function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  const ref = useReveal()
  return (
    <section id={id} className={`relative py-10 sm:py-14 ${className}`}>
      <div ref={ref} className="reveal mx-auto w-full max-w-6xl px-5">
        {eyebrow && (
          <p className="mb-2.5 text-sm font-semibold uppercase tracking-[0.25em] text-crimson-400">
            {eyebrow}
          </p>
        )}
        {title && (
          <>
            <h2 className="display text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <div className="mt-3 flex items-center text-xs text-crimson-400/60">
              <span>★</span>
            </div>
          </>
        )}
        {subtitle && <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-200">{subtitle}</p>}
        <div className={title ? 'mt-7 sm:mt-8' : ''}>{children}</div>
      </div>
    </section>
  )
}
