import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/embed.ts',
      formats: ['es'],
      fileName: () => `main.js`,
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
