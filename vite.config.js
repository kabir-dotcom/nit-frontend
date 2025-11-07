import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  const devApiUrl = env.VITE_API_URL || 'http://localhost:5000/api';
  const devProxyTarget = devApiUrl.replace(/\/api\/?$/, '');

  return {
    plugins: [react()],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      open: true,
      ...(isDev
        ? {
            proxy: {
              '/api': {
                target: devProxyTarget || 'http://localhost:5000',
                changeOrigin: true,
              },
            },
          }
        : {}),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  };
});
