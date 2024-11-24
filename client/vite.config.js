import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.PROXY_URL || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      'prop-types': 'prop-types',
    },
  },
  build: {
    rollupOptions: {
      external: ['prop-types'],
    },
    commonjsOptions: {
      include: [/prop-types/, /node_modules/],
    },
    outDir: 'dist',
    sourcemap: false
  }
});