import { defineConfig, devices } from '@playwright/test';

// Same port as `npm run serve`: Astro allows one preview per project, so tests reuse it locally.
const PORT = 4380;
const isCI = Boolean(process.env.CI);

/**
 * Projects:
 * - `shots`: review screenshots (`npm run shots`) — not a test suite, never runs in `test:e2e`.
 * - `e2e`:   smoke/a11y tests (added in T24).
 *
 * Both run against the production build served by `astro preview`, so what we review is what ships.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  },
  projects: [
    {
      name: 'shots',
      testDir: './tests/shots',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
