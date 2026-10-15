import { brand } from '../content/brand';
import { contact } from './contact';

/**
 * Site-wide SEO facts and JSON-LD builders (Claude's lane — D15).
 * Company facts are fixed by HANDOVER "Company facts"; don't add figures, clients or socials here.
 */

export { contact };

export const siteMeta = {
  name: brand.name,
  shortName: brand.shortName,
  titleTemplate: `%s · ${brand.name}`,
  /** Home page <title>; ~50–60 chars. */
  defaultTitle: `${brand.name} — Business Systems, Automation & Robotics`,
  /** ~150–160 chars. */
  description:
    'Philippines-based technology partner: POS, CRM, ERP and WMS platforms, custom software, automation and integration, and robotics R&D — built end to end.',
  locale: 'en_PH',
  lang: 'en',
  themeColor: '#0a0a0b',
  /** Default social card (1200×630). Produced by Codex in T18 (`og/og-default.jpg` in IMAGE-BRIEF). */
  ogImage: {
    src: '/og/og-default.jpg',
    width: 1200,
    height: 630,
    alt: `${brand.name} — technology solutions built for real growth`,
  },
  services: [
    'Business platforms (POS, CRM, ERP, WMS)',
    'Custom software development',
    'Automation and system integration',
    'Robotics, R&D and prototyping',
  ],
} as const;

/**
 * Indexing is OFF unless `PUBLIC_ALLOW_INDEXING=true` (set only on the production deploy at launch).
 * Keeps Vercel previews and the pre-domain site out of search results (D10).
 */
export const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

export function formatTitle(title?: string): string {
  return title
    ? siteMeta.titleTemplate.replace('%s', title)
    : siteMeta.defaultTitle;
}

/** Absolute URL from a site-relative path, or `undefined` when no site URL is configured. */
export function absoluteUrl(
  path: string,
  site: URL | undefined,
): string | undefined {
  return site ? new URL(path, site).href : undefined;
}

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(site: URL | undefined): JsonLd {
  const url = site?.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': url ? `${url}#organization` : undefined,
    name: siteMeta.name,
    alternateName: siteMeta.shortName,
    url,
    logo: absoluteUrl(brand.goldLogo.src, site),
    email: contact.email,
    telephone: contact.phoneE164,
    address: { '@type': 'PostalAddress', addressCountry: contact.country },
    areaServed: { '@type': 'Country', name: 'Philippines' },
    knowsAbout: siteMeta.services,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: contact.email,
      telephone: contact.phoneE164,
      areaServed: contact.country,
      availableLanguage: ['en'],
    },
  };
}

export function websiteJsonLd(site: URL | undefined): JsonLd {
  const url = site?.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url ? `${url}#website` : undefined,
    name: siteMeta.name,
    url,
    inLanguage: siteMeta.lang,
    publisher: url ? { '@id': `${url}#organization` } : undefined,
  };
}

/** JSON for a <script type="application/ld+json">: drops undefined, escapes `<` so content can't close the tag. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
