import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config'

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
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectRegister: 'auto',
      registerType: 'autoUpdate',

      injectManifest: {
        swSrc: 'src/sw.js',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },

      manifest: {
        name: 'COMKET',
        short_name: 'COMKET',
        description: ' 프로젝트 관리와 논의 경험을 동시에 연결하는 협업 플랫폼',
        theme_color: '#ffffff',
      },

      // workbox: {
      //   globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      //   cleanupOutdatedCaches: true,
      //   clientsClaim: true,
      // },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
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
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
});
