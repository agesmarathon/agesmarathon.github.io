import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves a project site from /<repo-name>/, while Vercel and the
// dev server serve it from /. `npm run deploy` builds with --mode pages, which
// switches the base path. If you rename the repo, change the string below.
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' || process.env.GITHUB_PAGES === 'true' ? '/AGES-marathon/' : '/',
  plugins: [react(), tailwindcss()],
}))
