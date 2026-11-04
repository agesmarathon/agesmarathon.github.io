import { useEffect, useRef, useState } from 'react'
import { event } from '../data/event'
import { Section } from './Section'
import { FiCalendar, FiClock, FiArrowUpRight } from 'react-icons/fi'
import { FaSquareParking, FaTruckMedical } from 'react-icons/fa6'
import { LiveMap } from './LiveMap'

const rows = [
  { icon: <FiCalendar className="text-crimson-400 text-lg" />, label: 'Date', value: event.dateLabel },
  { icon: <FiClock className="text-amber-400 text-lg" />, label: 'Reporting', value: '4:45 AM at the school gate' },
  { icon: <FaSquareParking className="text-sky-400 text-lg" />, label: 'Parking', value: 'Free, inside the school ground' },
  { icon: <FaTruckMedical className="text-rose-400 text-lg" />, label: 'Support', value: 'Water points on route · ambulance on standby' },
]

export function Venue() {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Autoplay video when user arrives at the Venue section
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true)
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo' }),
            '*'
          )
        } else {
          // Pause when scrolled out of view to save resources
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo' }),
            '*'
          )
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="venue" eyebrow="Where" title="Start & finish line">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Venue Video Player: Sized to the exact open video box with matching red outline frame and increased width */}
        <div ref={containerRef} className="relative mx-auto w-full max-w-[430px] lg:max-w-[460px] lg:mx-0">
          {/* Red decorative outline frame matching the exact open video box */}
          <span className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl border-2 border-crimson-500/40 sm:block" />

          <div
            className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-forest-950 shadow-2xl"
            style={{ aspectRatio: '384 / 454' }}
          >
            {hasLoaded ? (
              <iframe
                ref={iframeRef}
                src="https://www.youtube-nocookie.com/embed/ZVExOphdWUo?autoplay=1&mute=1&controls=0&loop=1&playlist=ZVExOphdWUo&playsinline=1&rel=0&modestbranding=1&enablejsapi=1"
                title="Garib-e-Newaz High School"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="pointer-events-none absolute left-0 w-full border-0 object-cover"
                style={{
                  top: '-21.3%',
                  height: '143%',
                  width: '100%',
                }}
                loading="lazy"
              />
            ) : (
              // Clean loader placeholder matching theme while waiting to arrive
              <div className="flex h-full w-full items-center justify-center bg-forest-950">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-crimson-500 border-t-transparent" />
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="display text-3xl text-white sm:text-4xl">{event.venue}</h3>
          <p className="mt-3 leading-relaxed text-slate-200">{event.venueAddress}</p>

          <dl className="mt-8 divide-y divide-dashed divide-white/10 border-y border-dashed border-white/10 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  {r.icon}
                </span>
                <dt className="w-24 shrink-0 text-xs uppercase tracking-widest text-slate-300">{r.label}</dt>
                <dd className="font-medium text-white">{r.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-crimson-500/60 hover:bg-white/10"
          >
            <span>Open in Google Maps</span>
            <FiArrowUpRight className="text-base" />
          </a>
        </div>
      </div>

      {/* Live Interactive Map at the bottom of the Venue section */}
      <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur shadow-xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-crimson-500" />
              </span>
              <h4 className="display text-xl text-white sm:text-2xl">Live Venue & Route Map</h4>
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Interactive map of the flag-off ground at {event.venue}, Halishahar Housing Estate
            </p>
          </div>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-4 py-1.5 text-xs font-semibold text-crimson-400 transition hover:bg-crimson-500 hover:text-white"
          >
            <span>Get Directions</span>
            <FiArrowUpRight className="text-xs" />
          </a>
        </div>

        <LiveMap
          coordinates={event.coordinates}
          venue={event.venue}
          address={event.venueAddress}
          mapsUrl={event.mapsUrl}
        />
      </div>
    </Section>
  )
}
