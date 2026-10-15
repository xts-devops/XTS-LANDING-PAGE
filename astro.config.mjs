import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  'PUBLIC_',
);
const site = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || undefined;
if (site && !/^https?:\/\//.test(site)) {
  throw new Error('PUBLIC_SITE_URL must be an absolute HTTP(S) URL.');
}

export default defineConfig({
  output: 'static',
  site,
  integrations: site ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});
