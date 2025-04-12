import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
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
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  server: {
    port: 3333,
  },
  preview: {
    port: 3434,
  },
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src'), // '@'를 'apps/frontend/src'로 매핑
    //   '@components': path.resolve(__dirname, 'src/components'), // '@components'를 'apps/frontend/src/components'로 매핑
    //   '@pages': path.resolve(__dirname, 'src/pages'), // '@pages'를 'apps/frontend/src/pages'로 매핑
    //   '@styles': path.resolve(__dirname, 'src/styles'), // '@styles'를 'apps/frontend/src/styles'로 매핑
    //   '@assets': path.resolve(__dirname, 'src/assets'), // '@assets'를 'apps/frontend/src/assets'로 매핑
    //   '@hooks': path.resolve(__dirname, 'src/hooks'), // '@hooks'를 'apps/frontend/src/hooks'로 매핑
    //   '@types': path.resolve(__dirname, 'src/types'), // '@context'를 'apps/frontend/src/context'로 매핑
    //   '@utils': path.resolve(__dirname, 'src/utils'), // '@utils'를 'apps/frontend/src/utils'로 매핑
    //   '@api': path.resolve(__dirname, 'src/api'), // '@api'를 'apps/frontend/src/api'로 매핑
    // },
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
  }
})