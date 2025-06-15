import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: () => `main.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
})
