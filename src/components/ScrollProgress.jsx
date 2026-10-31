import { useEffect, useState } from 'react'

// A hairline across the very top showing how far down the page you are.
export function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/5" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-400"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
