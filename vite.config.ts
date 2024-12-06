// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy to connect React frontend with Flask backend running on port 5001
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5001', // Updated port to 5001
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
