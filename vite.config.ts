import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  base: "",
  build: {
    assetsDir: "assets",
    // rollupOptions: {
    //   output: {
    //     assetFileNames: (assetInfo) => {
    //       if (/\.(png|jpe?g|svg|gif|webp)$/.test(assetInfo.name)) {
    //         return "assets/images/[name]-[hash][extname]"; // 👈 Переносит картинки в `assets/images/`
    //       }
    //       return "assets/[name]-[hash][extname]"; // 👈 Остальные файлы идут в `assets/`
    //     },
    //   },
    // },
  },
  // resolve: {
  //   alias: {
  //     "/assets/images/": "/sindbad-boardgame/assets/images/",
  //     "/shaders/": "/sindbad-boardgame/shaders/",
  //   },
  // },
}); 