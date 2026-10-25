import { test, expect } from '@playwright/test';
for (const id of ['property', 'hotel'])
  test(
    id + ' loops last to first after selection and stays paused on request',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/demos/tours/' + id + '.html');
      const root = page.locator('[data-journey]');
      await expect(root).toHaveAttribute('data-state', 'playing');
      await page.locator('[data-tour-chapter]').last().click();
      await expect(root).toHaveAttribute('data-state', 'playing');
      await page
        .locator('video')
        .evaluate((v: HTMLVideoElement) => v.dispatchEvent(new Event('ended')));
      await expect(page.locator('[data-tour-chapter="0"]')).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      await expect(root).toHaveAttribute('data-state', 'playing');
      await expect(page.locator('video')).toHaveCount(1);
      await page.locator('[data-tour-play]').click();
      await expect(root).toHaveAttribute('data-state', 'paused');
      const time = await page
        .locator('video')
        .evaluate((v: HTMLVideoElement) => v.currentTime);
      await page.waitForTimeout(300);
      expect(
        await page
          .locator('video')
          .evaluate((v: HTMLVideoElement) => v.currentTime),
      ).toBeCloseTo(time, 1);
    },
  );
for (const viewport of [
  { width: 375, height: 812 },
  { width: 568, height: 320 },
])
  test(
    'touch arm loops without scroll pin or seek scrubbing at ' + viewport.width,
    async ({ browser }) => {
      const context = await browser.newContext({
        viewport,
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 2,
        reducedMotion: 'no-preference',
      });
      try {
        const page = await context.newPage();
        await page.route('**/gsap.*.js', (r) => r.abort());
        await page.route('**/ScrollTrigger.*.js', (r) => r.abort());
        await page.goto('/services/robotics');
        const root = page.locator('[data-exploded]'),
          scene = page.locator('.exploded-pair'),
          video = page.locator('[data-exploded-video]');
        await expect(video).not.toHaveAttribute('src');
        await scene.scrollIntoViewIfNeeded();
        await expect(root).toHaveAttribute('data-arm-phase', 'playing');
        await expect(root).toHaveClass(/has-arm-video/);
        await expect(video).toHaveJSProperty('videoWidth', 1280);
        await expect(video).toHaveJSProperty('videoHeight', 768);
        await expect(page.locator('.exploded-stage')).toHaveCSS(
          'position',
          'relative',
        );
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await scene.scrollIntoViewIfNeeded();
        await expect(root).toHaveClass(/has-arm-video/);
        const y = await page.evaluate(() => scrollY);
        await expect(root).toHaveAttribute('data-arm-phase', 'hold', {
          timeout: 10000,
        });
        expect(await page.evaluate(() => scrollY)).toBeCloseTo(y, 0);
        await expect(root).toHaveAttribute('data-arm-phase', 'playing', {
          timeout: 10000,
        });
        await page
          .getByRole('button', { name: 'Pause animation', exact: true })
          .click();
        await expect(video).toHaveJSProperty('paused', true);
        const time = await video.evaluate(
          (v: HTMLVideoElement) => v.currentTime,
        );
        await page.waitForTimeout(300);
        expect(
          await video.evaluate((v: HTMLVideoElement) => v.currentTime),
        ).toBeCloseTo(time, 1);
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await scene.scrollIntoViewIfNeeded();
        await expect(video).toHaveJSProperty('paused', true);
        await page
          .getByRole('button', { name: 'Resume animation', exact: true })
          .click();
        await expect(video).toHaveJSProperty('paused', false);
        for (const button of await root.locator('button').all()) {
          const r = (await button.boundingBox())!;
          expect(r.height).toBeGreaterThanOrEqual(44);
          expect(r.y).toBeGreaterThanOrEqual(0);
          expect(r.y + r.height).toBeLessThanOrEqual(viewport.height);
          expect(r.x).toBeGreaterThanOrEqual(0);
          expect(r.x + r.width).toBeLessThanOrEqual(viewport.width);
        }
        await page.screenshot({
          path: 'docs/review/showcase-loops/touch-' + viewport.width + '.png',
        });
      } finally {
        await context.close();
      }
    },
  );
test('desktop arm preserves HD and uses native video time rather than repeated seeks', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/robotics');
  await page.locator('.exploded-pair').scrollIntoViewIfNeeded();
  const video = page.locator('[data-exploded-video]');
  await expect(video).toHaveJSProperty('paused', false);
  await expect(video).toHaveJSProperty('videoWidth', 1800);
  const counts = await video.evaluate(
    (v: HTMLVideoElement) =>
      new Promise<number>((resolve) => {
        let seeks = 0;
        const count = () => seeks++;
        v.addEventListener('seeking', count);
        setTimeout(() => {
          v.removeEventListener('seeking', count);
          resolve(seeks);
        }, 500);
      }),
  );
  expect(counts).toBe(0);
});
