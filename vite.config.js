import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + HashRouter means the build works at any GitHub Pages path
// (https://<user>.github.io/<repo>/) without knowing the repo name.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: { firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'] }
      }
    }
  }
});
