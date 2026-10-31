import { useEffect, useState } from 'react'
import { gallery } from '../data/event'
import { asset } from '../lib/asset'
import { Section } from './Section'

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur"
      role="dialog"
      aria-label={photo.caption}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:bg-white/10"
        aria-label="Close"
      >
        ✕
      </button>
      <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
        <img
          src={asset(photo.src)}
          alt={photo.caption}
          className="max-h-[78vh] w-auto rounded-2xl border border-white/10 object-contain"
        />
        <figcaption className="mt-4 text-center">
          <p className="display text-xl text-crimson-400">{photo.caption}</p>
          <p className="mt-1 text-sm text-slate-300">{photo.note}</p>
        </figcaption>
      </figure>
    </div>
  )
}

export function Gallery() {
  const [open, setOpen] = useState(null)

  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      title="AGES on the road"
      subtitle="Our alumni already run together across Chattogram — World Stroke Day, CR 10K and more. In December the start line is ours."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {gallery.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setOpen(p)}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-1 hover:border-crimson-500/50 ${
              i === 0 ? 'md:col-span-2' : ''
            }`}
          >
            <img
              src={asset(p.src)}
              alt={p.caption}
              loading="lazy"
              className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                i === 0 ? 'h-72 md:h-[30rem]' : 'h-80 md:h-[26rem]'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 text-left">
              <p className="display text-2xl text-white">{p.caption}</p>
              <p className="mt-1 text-sm text-slate-200">{p.note}</p>
            </div>

            <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-forest-950/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              View ⤢
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-sm text-slate-300">
        <span className="text-crimson-400">★</span>
        Photos from past runs by AGES members. Yours could be here next — the December start list is open.
      </p>

      {open && <Lightbox photo={open} onClose={() => setOpen(null)} />}
    </Section>
  )
}
