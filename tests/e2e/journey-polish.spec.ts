import { test, expect } from '@playwright/test';
for (const width of [320, 375, 768, 1440])
  for (const id of ['hotel', 'property']) {
    test(`${id} editorial landing has aligned controls and thumbnails at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const films: string[] = [];
      page.on('request', (r) => {
        if (r.url().endsWith('.mp4')) films.push(r.url());
      });
      await page.goto('/demos/tours/' + id + '.html');
      await expect(page.locator('h1')).toHaveText(
        id === 'hotel'
          ? 'Somewhere to slow down.'
          : 'Designed around the view.',
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      if (width === 1440)
        expect(
          await page.evaluate(() => document.documentElement.scrollHeight),
        ).toBeLessThanOrEqual(900);
      const play = await page.locator('[data-tour-play]').boundingBox(),
        expand = await page.locator('[data-tour-expand]').boundingBox();
      expect(play!.height).toBeGreaterThanOrEqual(44);
      expect(play!.width).toBeLessThan(240);
      expect(expand!.width).toBeLessThanOrEqual(52);
      expect(expand!.height).toBeGreaterThanOrEqual(44);
      expect(play!.x + play!.width).toBeLessThan(expand!.x);
      await expect(page.locator('[data-tour-play] svg')).toHaveCount(3);
      await expect(page.locator('.chapter-preview')).toHaveCount(
        id === 'hotel' ? 2 : 4,
      );
      for (const image of await page.locator('.chapter-preview').all())
        await expect(image).toHaveJSProperty('naturalWidth', 240);
      expect(films).toEqual([]);
      await expect(page.locator('link[href="/demos/demo.css"]')).toHaveCount(0);
      const colors = await page
        .locator('body')
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(colors).toBe(
        id === 'hotel' ? 'rgb(243, 240, 232)' : 'rgb(19, 22, 21)',
      );
    });
  }
test('primary control keeps its SVG, text and geometry aligned through playback states', async ({
  page,
}) => {
  await page.goto('/demos/tours/hotel.html');
  const button = page.locator('[data-tour-play]'),
    before = await button.boundingBox();
  await button.click();
  await expect(page.locator('[data-journey]')).toHaveAttribute(
    'data-state',
    'playing',
  );
  await expect(button).toHaveText('Pause journey');
  await expect(button).toHaveAttribute('data-play-mode', 'pause');
  await expect(button.locator('svg')).toHaveCount(3);
  await expect(button.locator('.pause-symbol')).toHaveCSS('opacity', '1');
  const playing = await button.boundingBox();
  expect(playing!.width).toBeCloseTo(before!.width, 0);
  await button.click();
  await expect(button).toHaveText('Resume journey');
  await expect(button).toHaveAttribute('data-play-mode', 'play');
  await expect(button.locator('.play-symbol')).toHaveCSS('opacity', '1');
  expect((await button.boundingBox())!.width).toBeCloseTo(before!.width, 0);
});
test('chapter details remain still for reduced motion and rapid inputs never stack animations', async ({
  page,
}) => {
  await page.goto('/demos/tours/property.html');
  await page.locator('[data-tour-chapter="2"]').click();
  expect(
    await page
      .locator('.route-description')
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  await expect(page.locator('video')).not.toHaveAttribute('src');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('[data-tour-chapter="1"]').click();
  await page.locator('[data-tour-chapter="3"]').click();
  expect(
    await page
      .locator('.route-description')
      .evaluate((el) => el.getAnimations().length),
  ).toBeLessThanOrEqual(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page
      .locator('.route-description')
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
});
