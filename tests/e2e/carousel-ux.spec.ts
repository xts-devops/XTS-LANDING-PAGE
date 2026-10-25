import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
  for (const slug of ['business-systems', 'custom-software', 'automation']) {
    test(`${slug} controls flank the image without overlap at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/services/' + slug);
      if (slug === 'custom-software')
        await page
          .getByRole('tab', { name: 'Mobile apps', exact: true })
          .click();
      if (slug === 'automation')
        await page
          .getByRole('tab', { name: 'Integrations', exact: true })
          .click();
      const panel = page.getByRole('tabpanel');
      const stage = panel.locator('.slides-stage');
      await stage.scrollIntoViewIfNeeded();
      const bounds = await stage.evaluate((el) => {
        const rect = (s: string) =>
          el.querySelector(s)!.getBoundingClientRect();
        const previous = rect('[data-prev]'),
          next = rect('[data-next]'),
          image = rect('.slide .screen'),
          zoom = rect('[data-screen-open]');
        return {
          previousRight: previous.right,
          nextLeft: next.left,
          imageLeft: image.left,
          imageRight: image.right,
          imageTop: image.top,
          imageBottom: image.bottom,
          zoomBottom: zoom.bottom,
          prevY: previous.y,
          nextY: next.y,
          targetWidth: previous.width,
          centerDifference: Math.abs(
            previous.y + previous.height / 2 - (image.y + image.height / 2),
          ),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      expect(bounds.previousRight).toBeLessThanOrEqual(bounds.imageLeft);
      expect(bounds.nextLeft).toBeGreaterThanOrEqual(bounds.imageRight);
      expect(bounds.zoomBottom).toBeLessThanOrEqual(bounds.imageTop);
      expect(bounds.prevY).toBeGreaterThan(bounds.imageTop);
      expect(bounds.nextY).toBeLessThan(bounds.imageBottom);
      expect(bounds.targetWidth).toBeGreaterThanOrEqual(44);
      expect(bounds.overflow).toBe(false);
      expect(bounds.centerDifference).toBeLessThan(4);
    });
  }
}

test('automatic 3s rotation resumes after 6s idle; explicit pause remains stopped', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const start = new Date('2026-10-25T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel'),
    wrap = panel.locator('[data-slides]'),
    count = panel.locator('[data-count-label]');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await expect(panel.locator('.slides-timing')).toHaveCount(0);
  await expect(panel.locator('span[data-play-label]')).toHaveCount(0);
  await page.clock.runFor(2900);
  await expect(count).toHaveText('1 / 6');
  await page.clock.runFor(1100);
  await expect(count).toHaveText('2 / 6');
  await panel.locator('[data-slide-index="5"]').click();
  await page.clock.runFor(5000);
  await expect(count).toHaveText('6 / 6');
  await expect(wrap).toHaveAttribute('data-idle', 'true');
  await page.clock.runFor(2000);
  await expect(count).toHaveText('1 / 6');
  await panel
    .getByRole('button', { name: 'Pause slideshow', exact: true })
    .click();
  await page.clock.runFor(7000);
  await expect(count).toHaveText('1 / 6');
  await panel
    .getByRole('button', { name: 'Play slideshow', exact: true })
    .click();
  await page.clock.runFor(4000);
  await expect(count).toHaveText('2 / 6');
});

test('navigation arrows reset the idle window even with the pointer left on them', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const start = new Date('2026-10-25T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel'),
    count = panel.locator('[data-count-label]');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await panel.locator('[data-next]').click();
  await page.clock.runFor(4000);
  await expect(count).toHaveText('2 / 6');
  await panel.locator('[data-next]').click();
  await page.clock.runFor(4000);
  await expect(count).toHaveText('3 / 6');
  await page.clock.runFor(3500);
  await expect(count).toHaveText('4 / 6');
});

test('reduced motion disables rotation; keyboard focus suspends it until focus leaves', async ({
  page,
}) => {
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel'),
    wrap = panel.locator('[data-slides]');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'false');
  await expect(panel.locator('[data-slides-play]')).not.toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await panel.locator('[data-slides-track]').focus();
  await expect(wrap).toHaveAttribute('data-paused', 'true');
  await page.locator('h1').click();
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(wrap).toHaveAttribute('data-rotating', 'false');
  await expect(panel.locator('[data-slides-play]')).not.toBeVisible();
});

test('hidden panels and offscreen carousels do not rotate', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/business-systems');
  const erp = page.locator('#system-erp [data-slides]');
  await expect(erp).toHaveAttribute('data-rotating', 'false');
  await page.locator('#system-erp .slides-stage').scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(erp).toHaveAttribute('data-rotating', 'true');
  await page.getByRole('tab', { name: 'POS', exact: true }).click();
  await expect(erp).toHaveAttribute('data-rotating', 'false');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('#system-pos [data-slides]')).toHaveAttribute(
    'data-rotating',
    'false',
  );
});

test('POS and market concepts load photographic product thumbnails', async ({
  page,
}) => {
  await page.goto('/demos/morrow.html');
  const photos = page.locator('.product-art img');
  await expect(photos).toHaveCount(6);
  for (const photo of await photos.all())
    expect(
      await photo.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBe(480);
  await page.goto('/services/business-systems');
  await page.getByRole('tab', { name: 'POS', exact: true }).click();
  await page.locator('#system-pos [data-screen-open]').first().click();
  await expect(page.locator('[data-screen-dialog]')).toBeVisible();
});

test('single-screen concepts omit redundant navigation and rotation hints', async ({
  page,
}) => {
  await page.goto('/services/custom-software');
  const panel = page.getByRole('tabpanel');
  await expect(panel.locator('.slides-toolbar')).not.toBeVisible();
  await expect(panel.locator('.slide-picker')).not.toBeVisible();
  await expect(panel.locator('[data-slides-play]')).toHaveCount(0);
  await expect(panel.locator('[data-prev]')).toHaveCount(0);
  await expect(panel.locator('[data-next]')).toHaveCount(0);
  await expect(panel.locator('[data-screen-open]')).toBeVisible();
});
