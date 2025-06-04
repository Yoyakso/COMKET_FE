import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true }]],
      },
    }),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'COMKET',
        short_name: 'COMKET',
        description: ' 프로젝트 관리와 논의 경험을 동시에 연결하는 협업 플랫폼',
        theme_color: '#ffffff',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  base: '/',
  server: {
    port: 3333,
  },
  preview: {
    port: 3434,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@icons': '/src/assets/icons',
      '@styles': '/src/styles',
      '@hooks': '/src/hooks',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@api': '/src/api',
    },
  },
  optimizeDeps: {
    exclude: ['react-toastify'],
  },
});
