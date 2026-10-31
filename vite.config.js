import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo-name>/, while Vercel and the dev
// server serve it from /. The deploy workflow sets GITHUB_PAGES=true so both
// hosts get the right asset paths from the same code.
const base = process.env.GITHUB_PAGES === 'true' ? '/AGES-marathon/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
