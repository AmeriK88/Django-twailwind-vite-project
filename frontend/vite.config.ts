// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      // Fuerza a que cualquier import de three use siempre la misma carpeta
      three: path.resolve(__dirname, 'node_modules/three'),
      // Y lo mismo para three-stdlib
      'three-stdlib': path.resolve(__dirname, 'node_modules/three-stdlib')
    },
    // Dedupe para que no haya múltiples instancias
    dedupe: ['three', 'three-stdlib']
  },
  optimizeDeps: {
    // Preempaqueta y dedupe estos módulos en dev
    include: ['three', 'three-stdlib']
  }
})
