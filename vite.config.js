import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill necesario para peerjs en entorno browser con Vite
    global: 'globalThis',
  },
})
