/**
 * Lighthouse CI — budgets from docs/MOTION.md §6.
 * Run after a build made with PUBLIC_ALLOW_INDEXING=true (otherwise the SEO "is-crawlable" audit fails by design):
 *   npm run test:lighthouse
 * CI gates Performance at 0.90 (shared runners are noisy); G3 checks ≥ 0.95 manually on a throttled profile.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['/'],
      numberOfRuns: 3,
      settings: {
        // Default Lighthouse mobile profile: Moto G Power, slow 4G, 4× CPU throttle.
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      aggregationMethod: 'median-run',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
        'total-blocking-time': ['warn', { maxNumericValue: 150 }],
        // Initial-load JS only: Lighthouse never interacts, so the lazy motion engine isn't counted.
        // The full budget (motion loaded, ≤ 70 KB gz) is enforced by tests/e2e/motion.spec.ts.
        'resource-summary:script:size': ['error', { maxNumericValue: 71680 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
      },
    },
    upload: {
      // Reports stay private: written to disk and uploaded as a CI artifact, never to public storage.
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
