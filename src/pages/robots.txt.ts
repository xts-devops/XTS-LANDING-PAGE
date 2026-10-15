import type { APIRoute } from 'astro';
import { allowIndexing } from '../lib/seo';

/** robots.txt — blocks crawlers until PUBLIC_ALLOW_INDEXING=true (launch). SEO endpoint, Claude's lane. */
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', allowIndexing ? 'Allow: /' : 'Disallow: /'];
  if (allowIndexing && site)
    lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
