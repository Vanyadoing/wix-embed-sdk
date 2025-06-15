// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/embed.ts',
      formats: ['es'],
      fileName: () => `main.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: 'main.js',
      }
    },
    emptyOutDir: true,
    ssr: true
  }
});
