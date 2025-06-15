// build.js
import { build } from 'vite';
import config from './vite.config.js';

build(config).then(() => {
  console.log("✅ Build complete");
}).catch(err => {
  console.error("❌ Build failed", err);
  process.exit(1);
});
