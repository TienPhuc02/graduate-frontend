import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'
import tsconfigPaths from 'vite-tsconfig-paths'
// import path from 'path'

import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim')
export default defineConfig({
  plugins: [react(), , TanStackRouterVite(), tsconfigPaths()],
  server: {
    port: 3000
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    },
    devSourcemap: true
  }
})
