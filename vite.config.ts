import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://retentionos.io',
      dynamicRoutes: ['/'],
      changefreq: 'weekly',
      priority: 1.0,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['@splinetool/react-spline', '@splinetool/runtime'],
  },
});
