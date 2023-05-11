import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  // 跨域处理
  server: {
    open: false,
    port: 3000,
    proxy: {
      '/iblog': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
      },
      '/all.json': {
        target: 'https://v1.jinrishici.com',
        changeOrigin: true,
      },
    },
  },
});
