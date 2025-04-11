import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 원하는 포트번호로 바꾸기
    proxy: {
      // 네이버 API 프록시 설정
      '/naver-api': {
      target: 'https://openapi.naver.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/naver-api/, ''),
      },
    },
  },
})

