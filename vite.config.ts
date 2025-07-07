
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Use SWC for better performance and TypeScript handling
      tsDecorators: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    open: true,
  },
  build: {
    // Optimize build process
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  esbuild: {
    // Use esbuild for TypeScript compilation instead of tsc
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
})
