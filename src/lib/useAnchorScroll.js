import { useEffect } from 'react'

// Handles every in-page "#id" link ourselves instead of relying on the
// browser's own fragment jump, which some embedded browsers ignore.
// html { scroll-padding-top } keeps the target clear of the fixed navbar.
export function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return

      const link = e.target.closest('a[href^="#"]')
      if (!link) return

      const id = link.getAttribute('href').slice(1)
      const target = id && document.getElementById(id)
      if (!target) return

      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
