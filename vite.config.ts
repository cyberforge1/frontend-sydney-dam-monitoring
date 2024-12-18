// vite.config.ts

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        rewrite: (path) => path, // Keep the `/api` prefix in the URL
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request:', req.url); // This should log the full URL, including `/api/dams/203042`
          });
        },
      },
    },
  },
});
