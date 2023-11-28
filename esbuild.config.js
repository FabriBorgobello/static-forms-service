const { build } = require('esbuild');
const alias = require('esbuild-plugin-alias');

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node',
  format: 'cjs',
  target: 'es2020',
  minify: false,
  sourcemap: true,
  external: [
    'better-sqlite3',
    'mysql2',
    'oracledb',
    'sqlite3',
    'tedious',
    'mysql',
    'pg-query-stream',
    'assert',
    'fs',
    'os',
    'https',
    'http',
    'stream',
    'tty',
    'zlib',
    'timers',
    'path',
    'crypto',
    'dns',
    'module',
    'process',
    'http2',
    'child_process',
  ],
  loader: {
    '.json': 'json',
  },
  plugins: [
    alias({
      '@': './src', // Ensure this path is correct
    }),
  ],
}).catch(() => process.exit(1));
