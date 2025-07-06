
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
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
    host: "::",
    port: 8080,
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
}))
