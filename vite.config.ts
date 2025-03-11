import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react-swc'
// import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), , TanStackRouterVite()],
  server: {
    port: 3000
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    },
    devSourcemap: true
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src')
    }
  }
})
