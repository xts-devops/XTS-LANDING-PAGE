import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { expect, test, type Page } from '@playwright/test';

/**
 * Review screenshots for UI PRs (DEV-FLOW §3).
 * Output: docs/review/<branch>/<width>/{page.png, <section-id>.png}
 * Run: `npm run shots` · Override folder: SHOTS_DIR=…  · Extra pages: SHOTS_PATHS=/,/privacy
 */

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

const PATHS = (process.env.SHOTS_PATHS ?? '/').split(',').map((p) => p.trim());

function branchSlug(): string {
  const fromEnv = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME;
  const branch =
    fromEnv ||
    (() => {
      try {
        return execSync('git rev-parse --abbrev-ref HEAD', {
          encoding: 'utf8',
        }).trim();
      } catch {
        return 'local';
      }
    })();
  return branch.replace(/[^\w.-]+/g, '-');
}

const OUT = process.env.SHOTS_DIR ?? path.join('docs', 'review', branchSlug());

/** Scroll through the page so lazy images and scroll-triggered content settle, then return to top. */
async function settle(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
}

for (const route of PATHS) {
  for (const vp of VIEWPORTS) {
    test(`${route} @ ${vp.width}`, async ({ page }) => {
      await page.setViewportSize(vp);
      const res = await page.goto(route);
      expect(res?.status(), `GET ${route}`).toBeLessThan(400);
      await settle(page);

      const name =
        route === '/'
          ? 'home'
          : route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
      const dir = path.join(OUT, name, String(vp.width));
      mkdirSync(dir, { recursive: true });

      await page.screenshot({
        path: path.join(dir, 'page.png'),
        fullPage: true,
        animations: 'disabled',
      });

      // One image per landmark section that has an id (e.g. #solutions) — easier to review than a 10k-px page.
      for (const section of await page
        .locator('main section[id], header, footer')
        .all()) {
        const id =
          (await section.getAttribute('id')) ??
          (await section.evaluate((el) => el.tagName.toLowerCase()));
        await section.screenshot({
          path: path.join(dir, `${id}.png`),
          animations: 'disabled',
        });
      }
    });
  }
}
