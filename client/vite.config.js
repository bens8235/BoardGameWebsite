// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        calendar: resolve(__calendar, 'calendar/index.html'),
        collection: resolve(__collection, 'collection/index.html'),
        Marketplace: resolve(__Marketplace, 'Marketplace/index.html'),
        firstplayer: resolve(__firstplayer, 'firstplayer/index.html'),
      },
    },
  },
});