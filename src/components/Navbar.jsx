import { useEffect, useState } from 'react'
import { asset } from '../lib/asset'
import { useTheme } from '../lib/useTheme'
import { event } from '../data/event'
import { FiSun, FiMoon } from 'react-icons/fi'

const links = [
  { href: '#about', label: 'About' },
  { href: '#categories', label: 'Categories' },
  { href: '#photocard', label: 'Photo Card' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#venue', label: 'Venue' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLightScrolled = !isDark && (scrolled || open)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? isDark
            ? 'header-scrolled-dark bg-forest-950/90 shadow-lg shadow-black/30 backdrop-blur'
            : 'header-scrolled-light bg-white/95 shadow-md shadow-slate-900/5 border-b border-slate-200/80 backdrop-blur'
          : 'header-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={asset("images/logo.jpg")}
            alt="AGES logo"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-crimson-500/60"
          />
          <span
            className={`display text-xl leading-none transition-colors ${
              isLightScrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            <span className={`${isLightScrolled ? 'text-crimson-500' : 'glow-red text-crimson-400'}`}>AGES</span> Marathon
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  isLightScrolled
                    ? 'text-slate-700 hover:text-crimson-500'
                    : 'text-slate-100 hover:text-crimson-400'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Theme toggle button */}
          <li>
            <button
              onClick={toggleTheme}
              className={`theme-toggle-btn flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                isDark
                  ? 'border-white/20 bg-white/5 text-amber-400 hover:border-amber-400/50 hover:bg-white/10'
                  : isLightScrolled
                  ? 'border-slate-300 bg-slate-100 text-slate-700 hover:border-crimson-500 hover:text-crimson-500'
                  : 'border-white/25 bg-white/10 text-amber-300 hover:border-white/50 hover:bg-white/20'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
          </li>

          <li>
            <a
              href={event.formUrl} target="_blank" rel="noreferrer"
              className="rounded-full bg-crimson-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-crimson-600/20 transition hover:bg-crimson-400"
            >
              Register Now
            </a>
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            onClick={toggleTheme}
            className={`theme-toggle-btn flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              isDark
                ? 'border-white/20 bg-white/5 text-amber-400'
                : isLightScrolled
                ? 'border-slate-300 bg-slate-100 text-slate-700'
                : 'border-white/25 bg-white/10 text-amber-300'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`mobile-menu-btn inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
              isLightScrolled
                ? 'border-slate-300 text-slate-800'
                : 'border-white/15 text-white'
            }`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={`border-t px-5 pb-6 pt-2 backdrop-blur md:hidden ${
            isDark
              ? 'border-white/10 bg-forest-950/95 text-slate-100'
              : 'border-slate-200 bg-white/98 text-slate-800 shadow-xl'
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block border-b py-3 font-medium transition ${
                isDark
                  ? 'border-white/5 text-slate-100 hover:text-crimson-400'
                  : 'border-slate-100 text-slate-700 hover:text-crimson-500'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={event.formUrl} target="_blank" rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-crimson-500 py-3 text-center font-bold text-white shadow-md shadow-crimson-600/20"
          >
            Register Now
          </a>
        </div>
      )}
    </header>
  )
}
