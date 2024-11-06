import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vite.dev/config/s
export default defineConfig({
  root: "./src",
  plugins: [react(), tsconfigPaths(),
  svgr()],
  base: "/tip/",
  build: {
    outDir: '../out/renderer'
  },
  resolve: {
    alias: {
      '@styles': path.resolve(process.cwd(), './src/shared/styles'),
    },
  },
})
