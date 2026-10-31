import { useEffect, useRef } from 'react'

// Drifts an image against the scroll. `speed` is how far it moves relative to
// the page — 0.15 means a sixth of the distance you scroll.
//
// The element it is attached to must be oversized (taller than its frame) and
// sit inside an overflow-hidden parent, or the drift exposes an edge.
export function useParallax(speed = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let visible = false

    const apply = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      // distance of the element's centre from the centre of the screen
      const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2

      // never drift further than the image overhangs its frame, or an edge
      // of the background shows through
      const parent = el.parentElement
      const overhang = parent ? Math.max(0, (el.offsetHeight - parent.clientHeight) / 2) : 0
      const shift = Math.max(-overhang, Math.min(overhang, -fromCentre * speed))

      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(apply)
    }

    // only do the work while the image is actually on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) apply()
      },
      { rootMargin: '150px' },
    )
    io.observe(el)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [speed])

  return ref
}
