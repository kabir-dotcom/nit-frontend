import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  const devApiUrl = env.VITE_API_URL || 'http://localhost:5000/api';
  const devProxyTarget = devApiUrl.replace(/\/api\/?$/, '');
  const devN8nProxyTarget = env.VITE_N8N_PROXY || 'https://kabir2512.app.n8n.cloud';

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
              '/n8n': {
                target: devN8nProxyTarget,
                changeOrigin: true,
                secure: true,
                rewrite: path => path.replace(/^\/n8n/, ''),
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
