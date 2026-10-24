import { expect, test } from '@playwright/test';
for (const width of [375, 1440]) {
  for (const slug of [
    'business-systems',
    'custom-software',
    'automation',
    'robotics',
  ]) {
    test(`${slug} has a bounded hero without overflow at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/services/' + slug);
      const layout = await page.locator('.svc-hero-grid').evaluate((el) => {
        const copy = el
            .querySelector('.svc-hero-copy')!
            .getBoundingClientRect(),
          visual = el.querySelector('.svc-visual')!.getBoundingClientRect();
        return {
          copyX: copy.x,
          copyRight: copy.right,
          visualX: visual.x,
          copyTop: copy.y,
          visualTop: visual.y,
          height: el.getBoundingClientRect().height,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      expect(layout.overflow).toBe(false);
      if (width > 1000) {
        expect(layout.visualX).toBeGreaterThan(layout.copyRight);
        expect(Math.abs(layout.copyTop - layout.visualTop)).toBeLessThan(150);
        expect(layout.height).toBeLessThan(650);
      }
    });
  }
  test(`Explore services aligns useful content at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('.hero-actions a[href="#services"]').click();
    await expect
      .poll(async () =>
        page
          .locator('#services [data-scroll-start]')
          .evaluate((el) =>
            Math.abs(
              el.getBoundingClientRect().top -
                (document.querySelector('.site-header')!.getBoundingClientRect()
                  .height +
                  24),
            ),
          ),
      )
      .toBeLessThan(3);
    expect(
      (await page.locator('.service-link').first().boundingBox())!.y,
    ).toBeLessThan(550);
  });
}
for (const slug of ['business-systems', 'custom-software', 'automation'])
  test(`${slug} screen preview opens full resolution and returns keyboard focus`, async ({
    page,
  }) => {
    await page.goto('/services/' + slug);
    const opener = page.locator('[data-screen-open]:visible').first();
    await opener.click();
    const dialog = page.locator('[data-screen-dialog]');
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator('[data-dialog-image]')
          .evaluate((el) => (el as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(500);
    await page.locator('[data-preview-zoom]').click();
    await expect(page.locator('[data-preview-zoom]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
  });
test('view picker jumps to the requested screen', async ({ page }) => {
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel');
  await panel.locator('[data-slide-index="5"]').click();
  await expect(panel.locator('[data-count-label]')).toHaveText('6 / 6');
  await expect(panel.locator('[data-slide-index="5"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('motion-aware section navigation and preview scrolling stay aligned', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.mouse.move(250, 250);
  await expect(page.locator('[data-work-track]')).toHaveClass(/is-pinned/);
  await page.locator('.hero-actions a[href="#services"]').click();
  await expect
    .poll(() =>
      page
        .locator('#services [data-scroll-start]')
        .evaluate((el) =>
          Math.abs(
            el.getBoundingClientRect().top -
              (document.querySelector('.site-header')!.getBoundingClientRect()
                .height +
                24),
          ),
        ),
    )
    .toBeLessThan(3);
  await page.goto('/services/business-systems');
  await page.mouse.move(250, 250);
  await expect(page.locator('html')).toHaveClass(/lenis/);
  await page.locator('[data-screen-open]:visible').first().click();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-screen-dialog]')).not.toBeVisible();
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(600, 600);
  await page.mouse.wheel(0, 400);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(before + 100);
});
