import { event } from '../data/event'

const bandWords = ['Run for Health', 'Run for Unity', 'Run for AGES', event.motto]

// Endless scrolling strip of race slogans. The list is rendered twice so the
// loop never shows a gap.
export function Band({ tone = 'red' }) {
  const skin =
    tone === 'red'
      ? 'border-crimson-500/30 bg-crimson-500/10 text-crimson-400/90'
      : 'border-white/10 bg-white/[0.03] text-slate-300'

  return (
    <div className={`relative overflow-hidden border-y py-3 ${skin}`}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {bandWords.map((w) => (
              <span key={`${copy}-${w}`} className="display flex items-center gap-6 px-6 text-xl">
                {w}
                <span className="opacity-50">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
