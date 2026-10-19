import { gzipSync } from 'node:zlib';
import { expect, test } from '@playwright/test';

/** MOTION §6: total JS ≤ 70 KB gzipped, measured with the motion engine actually loaded. */
const JS_BUDGET_GZ = 70 * 1024;

test('JS budget with motion loaded: ≤ 70 KB gzipped', async ({ browser }) => {
  // Lighthouse can't measure this: it never interacts, so the lazy motion engine never loads there.
  const context = await browser.newContext({ reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const urls = new Set<string>();
  page.on('request', (r) => r.resourceType() === 'script' && urls.add(r.url()));
  await page.goto('/');
  await page.mouse.move(300, 300);
  await page.mouse.wheel(0, 1500);
  await page.waitForFunction(() =>
    document.querySelector('.work-track.is-pinned'),
  );
  await page.waitForLoadState('networkidle');

  let total = 0;
  const sizes: string[] = [];
  for (const url of urls) {
    const body = await (await page.request.get(url)).body();
    const gz = gzipSync(body, { level: 9 }).length;
    total += gz;
    sizes.push(`${url.split('/').pop()} ${(gz / 1024).toFixed(1)} KB`);
  }
  expect(
    [...urls].some((u) => /gsap/i.test(u)),
    'motion engine should have loaded',
  ).toBe(true);
  expect(total, `scripts (gz):\n${sizes.join('\n')}`).toBeLessThanOrEqual(
    JS_BUDGET_GZ,
  );
  await context.close();
});

/**
 * Motion ON (the project default emulates reduced motion). Guards the failure modes that matter:
 * content stuck invisible after reveals, counters not landing on the real figures, the Work gallery
 * not pinning/moving, the exploded view not separating, and GSAP being downloaded for reduced-motion visitors.
 */
test.describe('with motion enabled', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('after scrolling through, nothing is left hidden and counters land on the real figures', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const scripts: string[] = [];
    page.on(
      'request',
      (r) => r.resourceType() === 'script' && scripts.push(r.url()),
    );
    await page.goto('/');
    // First interaction boots the engine; then walk the page like a reader.
    await page.mouse.move(400, 300);
    await page.waitForFunction(
      () => document.querySelectorAll('[data-reveal]').length > 0,
    );
    for (let y = 0; y < 12000; y += 500) {
      await page.mouse.wheel(0, 500);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(2200); // let the last reveals and count-ups finish
    // Positive control for the reduced-motion test below: chunk names do contain 'gsap'.
    expect(scripts.some((u) => /gsap/i.test(u))).toBe(true);

    const stuck = await page
      .locator('[data-reveal]')
      .evaluateAll((els) =>
        els
          .filter((el) => Number(getComputedStyle(el).opacity) < 0.99)
          .map((el) => el.className || el.tagName),
      );
    expect(stuck, 'reveals left partially transparent').toEqual([]);

    await expect(page.locator('[data-count]')).toHaveText(['300+', '200+']);

    // Work gallery is pinned on wide fine-pointer screens and has moved sideways by the end.
    await expect(page.locator('[data-work-track]')).toHaveClass(/is-pinned/);
    const x = await page
      .locator('.work-list')
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    expect(x, 'work track should have scrolled sideways').toBeLessThan(-50);
  });
});

test.describe('with reduced motion', () => {
  test('GSAP and Lenis are never downloaded', async ({ page }) => {
    const scripts: string[] = [];
    page.on(
      'request',
      (r) => r.resourceType() === 'script' && scripts.push(r.url()),
    );
    await page.goto('/');
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(4000); // past the engine's fallback timer
    expect(
      scripts.filter((u) => /gsap|ScrollTrigger|DrawSVG|lenis/i.test(u)),
    ).toEqual([]);
  });
});

test.describe('robotics exploded view', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('scrolling through separates the two states', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/services/robotics');
    await page.mouse.move(300, 300);
    await page.waitForTimeout(400);
    const scroller = page.locator('.exploded-scroll');
    const box = await scroller.boundingBox();
    expect(
      box?.height ?? 0,
      'sticky scroll space laid out before paint',
    ).toBeGreaterThan(900 * 2);
    for (let i = 0; i < 40; i++) {
      await page.mouse.wheel(0, 120);
      await page.waitForTimeout(40);
    }
    await page.waitForTimeout(800);
    const p = await page
      .locator('.exploded-progress')
      .evaluate((el) =>
        Number(getComputedStyle(el).getPropertyValue('--p') || 0),
      );
    expect(p, 'scroll progress drives the exploded view').toBeGreaterThan(0.2);
  });
});
