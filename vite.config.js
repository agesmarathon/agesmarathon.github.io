import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is served from the root on every host we use:
//   - Vercel                     https://ages-marathon.vercel.app/
//   - an <org>.github.io repo    https://<org>.github.io/
// A GitHub *project* site (github.io/<repo>/) would need base: '/<repo>/'
// instead, and src/lib/asset.js keeps image URLs correct either way.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
