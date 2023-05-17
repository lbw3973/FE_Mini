import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsConfigPaths()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://3.38.103.48:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
