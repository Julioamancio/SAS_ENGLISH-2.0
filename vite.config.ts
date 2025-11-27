import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Clean alias
    },
  },
  // Safety define for libraries that might assume Node.js env
  define: {
    'process.env': {} 
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 3000,
  }
});