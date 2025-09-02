import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Esto hace que Vite escuche en 0.0.0.0,
                // lo que te permite acceder a él desde la red local
  }
})
