import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Strict Content Security Policy for production builds: the page may only load
// its own bundled scripts and styles, and cannot make any network requests, so
// keystores, passwords and keys have no way to leave the browser.
// Not applied in dev, where Vite's HMR needs inline scripts and a websocket.
const csp = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "connect-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join('; ');

const contentSecurityPolicy = {
  name: 'content-security-policy',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: csp },
      injectTo: 'head',
    },
  ],
};

export default defineConfig({
  plugins: [react(), tailwindcss(), contentSecurityPolicy],
});
