
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify('AIzaSyBxy0ps0l_5N2YokzBlV8yQVICtqyTQiog')
  }
})