import { expect, test } from '@playwright/test';

/**
 * Motion ON (the project default emulates reduced motion). Guards the failure modes that matter:
 * content stuck invisible after reveals, counters not landing on the real figures, the process
 * line never completing, and GSAP being downloaded for reduced-motion visitors.
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

    const fills = await page
      .locator('.process-timeline > li')
      .evaluateAll((lis) =>
        lis.map((li) => getComputedStyle(li).getPropertyValue('--fill').trim()),
      );
    expect(
      fills.slice(0, -1).every((f) => Number(f) > 0.99),
      `process connectors: ${fills}`,
    ).toBe(true);
    await expect(page.locator('.process-timeline > li.is-reached')).toHaveCount(
      5,
    );
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
