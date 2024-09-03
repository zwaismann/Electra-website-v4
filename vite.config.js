import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Main entry point
        lorenzo: resolve(__dirname, 'pages/lorenzo-deguia.html'), // Additional entry point
        anthony: resolve(__dirname, 'pages/anthony-garth.html'), // Additional entry point
        kailee: resolve(__dirname, 'pages/kailee-mcgee.html'), // Additional entry point
        ben: resolve(__dirname, 'pages/ben-weinstein.html'), // Additional entry point
        zev: resolve(__dirname, 'pages/zeev-waismann.html'), // Additional entry point
      },
    },
  },
})
