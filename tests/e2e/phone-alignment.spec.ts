import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
  test(
    'software photos retain distinct images through inspection and resize @ ' +
      width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/services/custom-software#photo-gallery');
      const links = page.locator('[data-gallery-open]');
      await expect(links).toHaveCount(2);
      const images = links.locator('picture img');
      await expect(images.nth(0)).toHaveAttribute('src', /device-testing-v2/);
      await expect(images.nth(1)).toHaveAttribute('src', /field-inspection-v2/);
      await expect(links.locator('.on-photo')).toHaveCount(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
            ),
          )
          .toBe(true);
        await expect(image).toHaveAttribute('loading', 'lazy');
      }
      await links.last().click();
      const dialog = page.locator('[data-gallery-dialog]');
      const enlarged = dialog.locator('[data-gallery-image]');
      await expect(enlarged).toHaveAttribute('src', /field-inspection-v2/);
      await expect(enlarged).toHaveCSS('object-fit', 'contain');
      await page.setViewportSize({
        width: width === 375 ? 768 : 375,
        height: 812,
      });
      await expect
        .poll(() =>
          enlarged.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await page.keyboard.press('ArrowLeft');
      await expect(enlarged).toHaveAttribute('src', /device-testing-v2/);
      await page.keyboard.press('ArrowRight');
      await expect(enlarged).toHaveAttribute('src', /field-inspection-v2/);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(links.last()).toBeFocused();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    },
  );
}
