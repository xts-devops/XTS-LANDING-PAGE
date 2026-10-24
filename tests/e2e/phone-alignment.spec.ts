import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
  test(
    'phone photo keeps its sample UI in inspection and after resize @ ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/services/custom-software#photo-gallery');
      const link = page
        .locator('[data-gallery-open]')
        .filter({ has: page.locator('.on-photo') });
      await link.click();
      const dialog = page.locator('[data-gallery-dialog]');
      await expect(dialog.locator('[data-gallery-image]')).toHaveCSS(
        'object-fit',
        'contain',
      );
      const stage = dialog.locator('.on-photo');
      await expect(stage).toHaveCount(1);
      await expect
        .poll(() =>
          stage.evaluate((el) =>
            Number(getComputedStyle(el).getPropertyValue('--s')),
          ),
        )
        .toBeGreaterThan(0);
      const screen = dialog.locator('.on-photo-screen img');
      await expect
        .poll(() =>
          screen.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await page.setViewportSize({
        width: width === 375 ? 768 : 375,
        height: 812,
      });
      await expect
        .poll(() =>
          stage.evaluate((el) => {
            const bounds = el.getBoundingClientRect();
            const frame = el.parentElement!.getBoundingClientRect();
            return (
              Math.abs(bounds.x - frame.x - (frame.width - bounds.width) / 2) <
                1 &&
              Math.abs(
                bounds.y - frame.y - (frame.height - bounds.height) / 2,
              ) < 1 &&
              bounds.width <= frame.width + 1 &&
              bounds.height <= frame.height + 1
            );
          }),
        )
        .toBe(true);
      await page.keyboard.press('ArrowLeft');
      await expect(dialog.locator('.on-photo')).toHaveCount(0);
      await page.keyboard.press('ArrowRight');
      await expect(dialog.locator('.on-photo')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(dialog.locator('.on-photo')).toHaveCount(0);
      await expect(link).toBeFocused();
    },
  );
}

test('overlay follows centered cover cropping rather than width-only scaling', async ({
  page,
}) => {
  await page.goto('/services/custom-software#photo-gallery');
  const photo = page
    .locator('.gallery-link .photo')
    .filter({ has: page.locator('.on-photo') });
  await photo.evaluate((el) => {
    (el as HTMLElement).style.width = '300px';
    (el as HTMLElement).style.height = '500px';
  });
  const stage = photo.locator('.on-photo');
  await expect
    .poll(() =>
      stage.evaluate((el) => {
        const bounds = el.getBoundingClientRect();
        const frame = el.parentElement!.getBoundingClientRect();
        return (
          Math.abs(bounds.height - frame.height) < 1 &&
          bounds.width > frame.width &&
          Math.abs(bounds.x - frame.x - (frame.width - bounds.width) / 2) < 1
        );
      }),
    )
    .toBe(true);
});
