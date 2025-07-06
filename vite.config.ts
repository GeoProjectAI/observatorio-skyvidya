
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    port: 8080,
    host: true,
    hmr: {
      port: 8080,
      overlay: false
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    cors: true
  },
  optimizeDeps: {
    exclude: ['@deck.gl/core', '@deck.gl/layers', '@deck.gl/geo-layers']
  }
})
