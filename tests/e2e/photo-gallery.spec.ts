import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [375, 768, 1440]) {
  test(
    'robotics gallery inspection and keyboard navigation @ ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/services/robotics#photo-gallery');
      const links = page.locator('[data-gallery-open]');
      const total = await links.count();
      expect(total).toBeGreaterThan(4);
      const overflow = await page.locator('.gallery-item').evaluateAll(
        (items) =>
          items.filter((item) => {
            const outer = item.getBoundingClientRect();
            const inner = item.querySelector('figure')!.getBoundingClientRect();
            return (
              inner.right > outer.right + 1 || inner.bottom > outer.bottom + 1
            );
          }).length,
      );
      expect(overflow, 'photo frames must stay inside their grid cell').toBe(0);
      await links.first().click();
      const dialog = page.locator('[data-gallery-dialog]');
      await expect(dialog).toBeVisible();
      await expect(page.locator('[data-gallery-prev]')).toBeDisabled();
      await expect
        .poll(() =>
          page
            .locator('[data-gallery-image]')
            .evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
        )
        .toBe(true);
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('#gallery-dialog-title')).toHaveText(
        (await links.nth(1).getAttribute('data-gallery-caption')) ?? '',
      );
      await expect(page.locator('[data-gallery-count]')).toHaveText(
        '02 / ' + String(total).padStart(2, '0'),
      );
      expect(
        (
          await new AxeBuilder({ page })
            .include('[data-gallery-dialog]')
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(links.first()).toBeFocused();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    },
  );
}

test('desktop scroll depth and progress stop when reduced motion is enabled', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/services/robotics');
  await page.mouse.move(200, 200);
  await expect(page.locator('[data-photo-gallery]')).toHaveClass(
    /has-gallery-motion/,
  );
  const root = page.locator('[data-photo-gallery]');
  await root.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('[data-gallery-progress]')
        .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a),
    )
    .toBeGreaterThan(0);
  const image = page.locator('.gallery-item .photo > picture > img').first();
  await expect
    .poll(() => image.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(root).not.toHaveClass(/has-gallery-motion/);
  await expect
    .poll(() => image.evaluate((el) => getComputedStyle(el).transform))
    .toBe('none');
  await expect(page.locator('.gallery-scroll')).not.toBeVisible();
  await expect(page.locator('.gallery-item').first()).toHaveCSS('opacity', '1');
});

test('short service galleries expose the same useful inspection controls', async ({
  page,
}) => {
  await page.goto('/services/custom-software#photo-gallery');
  const link = page.locator('[data-gallery-open]').last();
  await link.click();
  await expect(page.locator('[data-gallery-next]')).toBeDisabled();
  await page.locator('[data-gallery-close]').click();
  await expect(link).toBeFocused();
});

test('no-JS gallery photos retain native optimized image links', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/services/robotics#photo-gallery');
  const first = page.locator('[data-gallery-open]').first();
  await expect(first).toBeVisible();
  expect(await first.getAttribute('href')).toMatch(/\.webp/);
  await first.click();
  await expect(page).toHaveURL(/\.webp$/);
  await context.close();
});
