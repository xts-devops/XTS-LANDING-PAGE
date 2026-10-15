import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  'PUBLIC_',
);
// On Vercel, fall back to the project's production URL so canonical/OG/sitemap work before
// PUBLIC_SITE_URL is set (D10: the real domain comes later).
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;
const site =
  process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || vercelUrl || undefined;
if (site && !/^https?:\/\//.test(site)) {
  throw new Error('PUBLIC_SITE_URL must be an absolute HTTP(S) URL.');
}

export default defineConfig({
  output: 'static',
  site,
  integrations: site ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});
