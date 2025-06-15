import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/embed.ts',
      formats: ['es'],
      fileName: () => `main.js`, // важный момент — без assets/
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // чтобы не создавало assets/ — всё положим в dist/
        assetFileNames: '[name][extname]',
        entryFileNames: 'main.js',
      }
    }
  }
});
