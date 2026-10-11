import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built site work from any path — a subfolder on
// GitHub Pages, an S3 prefix, or the root of a domain. Do not change it
// unless the host requires absolute paths.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
})
