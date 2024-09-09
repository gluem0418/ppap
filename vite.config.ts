import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { templateCompilerOptions } from '@tresjs/core'

import * as path from 'path';

export default defineConfig({
  base: '/ppap/', //追加
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
      ...templateCompilerOptions,
    }),
  ],
  define: { 'process.env': {} },
  build: {
    outDir: './docs', 
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
  },
})