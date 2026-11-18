import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Content-Security-Policy for the built pages only: the dev server needs inline scripts for hot reload.
// Keep in sync with vercel.json (the header version adds frame-ancestors, which a meta tag can't set).
// Allows: own files, Google Fonts, the Google Maps embed. Inline <style> blocks in the policy pages need 'unsafe-inline' for styles.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  'frame-src https://www.google.com',
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

// base './' = relative asset paths so dist/ works from any folder on static hosting
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    { name: 'csp-meta', apply: 'build', transformIndexHtml: (html) => html.replace('<head>', `<head>
    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`) },
  ],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: { input: { main: 'index.html', about: 'about.html', privacy: 'privacy.html', terms: 'terms.html', refund: 'refund.html' } },
  },
});
