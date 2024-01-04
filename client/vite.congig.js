// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__root, 'index.html'),
        nested: resolve(__calendar, 'nested/.html'),
        nested: resolve(__collection, 'nested/.html'),
        nested: resolve(__Marketplace, 'nested/.html'),
        nested: resolve(__first-player, 'nested/.html'),
      },
    },
  },
});