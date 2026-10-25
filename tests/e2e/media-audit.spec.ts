import { expect, test } from '@playwright/test';

for (const width of [320, 375, 768, 1440]) {
  test(
    'panoramic hero keeps headline, actions and capabilities aligned @ ' +
      width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(page.locator('#hero-heading')).toHaveText(
        'Ambition, engineered.',
      );
      await expect(page.locator('.hero-actions a')).toHaveCount(2);
      await expect(page.locator('.hero-capabilities a')).toHaveCount(4);
      const layout = await page.locator('.hero').evaluate((el) => {
        const heading = el.querySelector('h1')!.getBoundingClientRect();
        const photo = el.querySelector('.hero-visual')!.getBoundingClientRect();
        const copy = el.querySelector('.hero-copy')!.getBoundingClientRect();
        return {
          overflow: el.scrollWidth > innerWidth,
          headingInside: heading.left >= 0 && heading.right <= innerWidth,
          separate: photo.top >= copy.bottom - 1,
        };
      });
      expect(layout.overflow).toBe(false);
      expect(layout.headingInside).toBe(true);
      if (width <= 760) expect(layout.separate).toBe(true);
    },
  );
}

for (const width of [320, 375, 768]) {
  test(
    'all industry preview controls stay outside media and live frame aligns @ ' +
      width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const service of [
        'business-systems',
        'custom-software',
        'automation',
      ]) {
        await page.goto('/services/' + service + '#industry-demos');
        const cards = page.locator('[data-overview]');
        for (const card of await cards.all()) {
          const bounds = await card.evaluate((el) => {
            const media = el
              .querySelector('.overview-media')!
              .getBoundingClientRect();
            const button = el
              .querySelector('.overview-control')!
              .getBoundingClientRect();
            const status = el
              .querySelector('.overview-status')!
              .getBoundingClientRect();
            return {
              separate:
                button.top >= media.bottom - 1 &&
                status.top >= media.bottom - 1,
              target: button.height >= 44,
              contained: button.right <= el.getBoundingClientRect().right,
            };
          });
          expect(bounds).toEqual({
            separate: true,
            target: true,
            contained: true,
          });
        }
        const first = cards.first();
        await first.locator('[data-overview-open]').click();
        await expect(first).toHaveAttribute('data-preview', 'complete');
        const alignment = await page
          .locator('[data-overview-dialog]')
          .evaluate((el) => {
            const frame = el.querySelector('iframe')!.getBoundingClientRect();
            const still = el
              .querySelector('.overview-expanded-poster .screen-view')!
              .getBoundingClientRect();
            return Math.max(
              Math.abs(frame.x - still.x),
              Math.abs(frame.y - still.y),
              Math.abs(frame.width - still.width),
              Math.abs(frame.height - still.height),
            );
          });
        expect(alignment).toBeLessThan(1);
        await page.keyboard.press('Escape');
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
        ).toBe(false);
      }
    },
  );
}
