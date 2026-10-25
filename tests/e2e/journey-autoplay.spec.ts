import { test, expect } from '@playwright/test';

for (const id of ['property', 'hotel'])
  for (const width of [375, 1440])
    test(
      id + ' starts in view and continues after chapter selection at ' + width,
      async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.route('**/demos/tours/' + id + '.html', async (route) => {
          const response = await route.fetch();
          await route.fulfill({
            response,
            body: (await response.text()).replace(
              '</head>',
              '<style>body{padding-top:1100px;padding-bottom:1100px}</style></head>',
            ),
          });
        });
        const requests: string[] = [];
        page.on('request', (r) => {
          if (r.url().endsWith('.mp4')) requests.push(r.url());
        });
        await page.goto('/demos/tours/' + id + '.html');
        await expect(page.locator('video')).not.toHaveAttribute('src');
        expect(requests).toEqual([]);
        const stage = page.locator('[data-tour-stage]'),
          root = page.locator('[data-journey]');
        await stage.scrollIntoViewIfNeeded();
        await expect(root).toHaveAttribute('data-state', 'playing');
        await expect(page.locator('video')).toHaveJSProperty('muted', true);
        await page.locator('[data-tour-chapter="0"]').click();
        await expect(root).toHaveAttribute('data-state', 'playing');
        await page.locator('video').evaluate((video: HTMLVideoElement) => {
          video.currentTime = video.duration - 0.12;
        });
        await expect(page.locator('[data-tour-chapter="1"]')).toHaveAttribute(
          'aria-pressed',
          'true',
        );
        await expect(root).toHaveAttribute('data-state', 'playing');
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: 'instant' }),
        );
        await expect(page.locator('video')).not.toHaveAttribute('src');
        await stage.scrollIntoViewIfNeeded();
        await expect(root).toHaveAttribute('data-state', 'playing');
        await page.locator('[data-tour-play]').click();
        await expect(root).toHaveAttribute('data-state', 'paused');
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: 'instant' }),
        );
        await expect(page.locator('video')).not.toHaveAttribute('src');
        await stage.scrollIntoViewIfNeeded();
        await expect(root).toHaveAttribute('data-state', 'paused');
        await expect(page.locator('video')).not.toHaveAttribute('src');
      },
    );

for (const width of [375, 1440])
  test(
    'journey cards auto-start one film in view and provide persistent pause at ' +
      width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/services/custom-software');
      await expect(page.locator('[data-overview] iframe')).toHaveCount(0);
      const card = page.locator('[data-overview="daybreak"]');
      await card.locator('[data-overview-stage]').scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      await expect(card).toHaveAttribute('data-preview', 'playing');
      await expect(page.locator('[data-overview] iframe')).toHaveCount(1);
      const toggle = card.locator('[data-journey-toggle]');
      await expect(toggle).toHaveAccessibleName('Pause preview');
      await toggle.click();
      await expect(toggle).toHaveAccessibleName('Resume preview');
      await expect(toggle).toHaveAttribute('aria-pressed', 'true');
      const frame = card.frameLocator('iframe');
      await expect(frame.locator('[data-journey]')).toHaveAttribute(
        'data-state',
        'paused',
      );
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await expect(card.locator('iframe')).toHaveCount(0);
      await card.locator('[data-overview-stage]').scrollIntoViewIfNeeded();
      await expect(toggle).toHaveAccessibleName('Resume preview');
      await toggle.click();
      await expect(frame.locator('[data-journey]')).toHaveAttribute(
        'data-state',
        'playing',
      );
      const button = card.locator('[data-overview-open]');
      await button.click();
      const dialog = page.locator('[data-overview-dialog]');
      await expect(dialog).toBeVisible();
      const expanded = dialog.frameLocator('iframe');
      await expect(expanded.locator('[data-journey]')).toHaveAttribute(
        'data-state',
        'playing',
      );
      await expanded.locator('[data-tour-chapter="0"]').click();
      await expect(expanded.locator('[data-journey]')).toHaveAttribute(
        'data-state',
        'playing',
      );
      await expanded.locator('video').evaluate((v: HTMLVideoElement) => {
        v.currentTime = v.duration - 0.12;
      });
      await expect(expanded.locator('[data-tour-chapter="1"]')).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      await expect(expanded.locator('[data-journey]')).toHaveAttribute(
        'data-state',
        'playing',
      );
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(button).toBeFocused();
    },
  );

test('touch-only visitors get viewport playback without a hover gesture', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'no-preference',
  });
  try {
    const page = await context.newPage();
    await page.goto('/services/custom-software');
    expect(
      await page.evaluate(
        () => matchMedia('(hover:hover) and (pointer:fine)').matches,
      ),
    ).toBe(false);
    const card = page.locator('[data-overview="daybreak"]');
    await card.locator('[data-overview-stage]').scrollIntoViewIfNeeded();
    await expect(
      card.frameLocator('iframe').locator('[data-journey]'),
    ).toHaveAttribute('data-state', 'playing');
    await expect(page.locator('[data-overview] iframe')).toHaveCount(1);
  } finally {
    await context.close();
  }
});
