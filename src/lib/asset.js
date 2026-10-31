// Builds a URL for a file in /public that works both at the site root
// (Vercel, dev server) and under a sub-path like /AGES-marathon/ on GitHub
// Pages. Vite fills in BASE_URL at build time.
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
