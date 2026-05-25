import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: set VITE_BASE=/<tên-repo>/ when building (see .github/workflows)
// Local dev: leave unset → base '/'
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
