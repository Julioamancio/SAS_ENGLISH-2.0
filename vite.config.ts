import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REMOVED ALIAS to fix Linux/Render build issues. 
  // Relative paths (../) in code will work natively.
  define: {
    // Safety define for libraries that assume Node.js env
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