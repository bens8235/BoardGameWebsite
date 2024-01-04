// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        calendar: resolve('calendar/index.html'),
        collection: resolve('collection/index.html'),
        Marketplace: resolve('Marketplace/index.html'),
        firstplayer: resolve('first-player/index.html'),
      },
    },
  },
});