import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' = relative asset paths so dist/ works from any folder on static hosting
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: { input: { main: 'index.html', about: 'about.html', privacy: 'privacy.html', terms: 'terms.html', refund: 'refund.html' } },
  },
});
