import { build } from 'esbuild';

await build({
  entryPoints: ['src/embed.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  external: ['@wix/site', '@wix/site-seo', '@wix/sdk']
});
