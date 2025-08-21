import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { OutputAsset } from "rollup"; // For proper typing

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: process.env.PUBLIC_HOST || "localhost",
      port: 5173,
    },
    allowedHosts: [
      "localhost",
      process.env.PUBLIC_HOST,
      ".azurecontainerapps.io"
    ].filter(Boolean),
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: OutputAsset) => {
          const ext = path.extname(assetInfo.name || "").toLowerCase();

          // Images
          if (/\.(png|jpe?g|gif|svg|webp|bmp|tiff?)$/.test(ext)) {
            return "assets/images/[name]-[hash][extname]";
          }

          // Icons
          if (/\.(ico|svg)$/.test(ext)) {
            return "assets/icons/[name]-[hash][extname]";
          }

          // Videos
          if (/\.(mp4|webm|avi|mov)$/.test(ext)) {
            return "assets/videos/[name]-[hash][extname]";
          }

          // Fonts
          if (/\.(woff2?|eot|ttf|otf)$/.test(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          // 3D Models
          if (/\.(glb|gltf|bin|ktx2|env)$/.test(ext)) {
            return "assets/3d/[name]-[hash][extname]";
          }

          // PDFs
          if (ext === ".pdf") {
            return "assets/pdfs/[name]-[hash][extname]";
          }

          // JSON
          if (ext === ".json") {
            return "assets/json/[name]-[hash][extname]";
          }

          // CSS
          if (ext === ".css") {
            return "assets/css/[name]-[hash][extname]";
          }

          // Default
          return "assets/other/[name]-[hash][extname]";
        },
      },
    },
  },
});
