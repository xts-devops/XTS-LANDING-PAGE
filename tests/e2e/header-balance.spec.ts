import { expect, test } from '@playwright/test';

for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(
    'header groups are aligned without collisions @ ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/services/custom-software#industry-demos']) {
        await page.goto(route);
        const result = await page.locator('.header-inner').evaluate((el) => {
          const parent = el.getBoundingClientRect();
          const parts = [...el.children]
            .filter((child) => getComputedStyle(child).display !== 'none')
            .map((child) => child.getBoundingClientRect());
          return {
            collisions: parts.some((rect, i) =>
              parts.some((other, j) => i < j && rect.right > other.left),
            ),
            inside: parts.every(
              (rect) =>
                rect.left >= parent.left - 1 && rect.right <= parent.right + 1,
            ),
            centered: parts.every(
              (rect) =>
                Math.abs(
                  (rect.top + rect.bottom) / 2 -
                    (parent.top + parent.bottom) / 2,
                ) < 1,
            ),
            height: parent.height,
          };
        });
        expect(result.collisions).toBe(false);
        expect(result.inside).toBe(true);
        expect(result.centered).toBe(true);
        expect(result.height).toBeLessThanOrEqual(73);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
        ).toBe(false);
      }
    },
  );
}

test('mobile header menu preserves space, closes on selection and restores its toggle state', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/');
  const header = page.locator('.site-header');
  const before = (await header.boundingBox())!.height;
  const menu = page.locator('.mobile-menu');
  const summary = menu.locator('summary');
  await summary.click();
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  expect((await header.boundingBox())!.height).toBe(before);
  const panel = await menu.locator('nav').boundingBox();
  expect(panel!.x).toBeGreaterThanOrEqual(0);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(320);
  await menu.getByRole('link', { name: 'Services', exact: true }).click();
  await expect(menu).not.toHaveAttribute('open', '');
  await expect(summary).toHaveAttribute('aria-expanded', 'false');
});
