import { build } from 'esbuild';
import alias from 'esbuild-plugin-alias';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node',
  format: 'esm',
  target: 'es2020',
  minify: false,
  sourcemap: true,
  external: ['sqlite3', 'mysql', 'tedious', 'oracledb', 'better-sqlite3', 'mysql2', 'pg-query-stream'],
  loader: {
    '.json': 'json',
  },
  plugins: [
    alias({
      '@': './src', // Ensure this path is correct
    }),
  ],
}).catch(() => process.exit(1));
