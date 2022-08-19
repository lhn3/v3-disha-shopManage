import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS()
  ],
  resolve: {
    alias: {
      // 配置别名
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    open: true, // 自动启动浏览器
    host: "127.0.0.1", // localhost
    port: 5173, // 端口号
    https: false
  }
})