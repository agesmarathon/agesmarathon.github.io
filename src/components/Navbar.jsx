import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#categories', label: 'Categories' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#venue', label: 'Venue' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-950/90 shadow-lg shadow-black/30 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="AGES logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-500/60" />
          <span className="display text-xl leading-none text-white">
            AGES <span className="text-gold-500">Marathon</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-slate-200 transition hover:text-gold-400">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#register"
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-gold-400"
            >
              Register Now
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-lg">{open ? '\u2715' : '\u2630'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-950/95 px-5 pb-6 pt-2 backdrop-blur md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 text-slate-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-gold-500 py-3 text-center font-bold text-navy-950"
          >
            Register Now
          </a>
        </div>
      )}
    </header>
  )
}
