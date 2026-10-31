import { useEffect, useState } from 'react'

function diff(target) {
  const ms = Math.max(0, target - Date.now())
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  }
}

export function Countdown({ dateISO }) {
  const target = new Date(dateISO).getTime()
  const [left, setLeft] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const cells = [
    { v: left.days, l: 'Days' },
    { v: left.hours, l: 'Hours' },
    { v: left.minutes, l: 'Minutes' },
    { v: left.seconds, l: 'Seconds' },
  ]

  return (
    <div className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
      {cells.map((c) => (
        <div
          key={c.l}
          className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur"
        >
          <div className="display glow-red text-3xl text-crimson-400 tabular-nums sm:text-4xl">
            {String(c.v).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300">{c.l}</div>
        </div>
      ))}
    </div>
  )
}
