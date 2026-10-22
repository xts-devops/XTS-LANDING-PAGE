/**
 * Approved contact facts (HANDOVER "Company facts"). Plain data, no Astro/Vite APIs,
 * so tests and build scripts can import it too.
 * TODO(T04): move to / re-export from `src/content/site.ts` so contact details have one source.
 */
export const contact = {
  email: 'info@xzentechsolutions.com',
  phoneDisplay: '0969 244 2557',
  phoneE164: '+639692442557',
  country: 'PH',
} as const;
