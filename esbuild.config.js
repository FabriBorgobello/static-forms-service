import { build } from 'esbuild';
import alias from 'esbuild-plugin-alias';
import glob from 'tiny-glob';

(async () => {
  const migrations = await glob('src/database/migrations/**/*.ts');
  const seeds = await glob('src/database/seeds/**/*.ts');

  build({
    entryPoints: ['src/index.ts', ...migrations, ...seeds],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
    format: 'esm',
    target: 'es2020',
    minify: false,
    sourcemap: true,
    external: ['express', 'cors', 'dotenv', 'helmet', 'morgan', 'pg', 'bcrypt', 'knex'],
    loader: {
      '.json': 'json',
    },
    plugins: [
      alias({
        '@': './src', // Ensure this path is correct
      }),
    ],
  }).catch(() => process.exit(1));
})();
