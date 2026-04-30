import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
