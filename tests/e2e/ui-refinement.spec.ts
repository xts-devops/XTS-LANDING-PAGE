import { expect, test } from '@playwright/test';

test('mobile menu dismisses with Escape and outside interaction', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const summary = page.locator('.mobile-menu summary');
  const menu = page.locator('.mobile-menu');
  await summary.click();
  await expect(menu).toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open');
  await expect(summary).toBeFocused();
  await summary.click();
  await page.locator('.hero-proof').click();
  await expect(menu).not.toHaveAttribute('open');
});

test('gallery buttons navigate the native reduced-motion track', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const count = page.locator('[data-work-count]');
  await expect(page.locator('[data-work-prev]')).toBeDisabled();
  await page.locator('[data-work-next]').click();
  await expect(count).toContainText('02 /');
  await page.locator('[data-work-prev]').click();
  await expect(count).toContainText('01 /');
  expect(
    await page.locator('[data-work-track]').evaluate((el) => el.scrollLeft),
  ).toBeLessThan(2);
});

test('motion pin cleans up on resize and a live reduced-motion preference change', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.mouse.move(300, 300);
  await expect(page.locator('[data-work-track]')).toHaveClass(/is-pinned/);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('[data-work-track]')).not.toHaveClass(/is-pinned/);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    375,
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('[data-work-track]')).toHaveClass(/is-pinned/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-work-track]')).not.toHaveClass(/is-pinned/);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect
    .poll(async () =>
      page
        .locator('[data-reveal]')
        .evaluateAll(
          (es) =>
            es.filter((e) => Number(getComputedStyle(e).opacity) < 0.99).length,
        ),
    )
    .toBe(0);
});

test('robotic arm scroll preserves frame registration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/robotics');
  await page.mouse.move(300, 300);
  await page.locator('.exploded-scroll').scrollIntoViewIfNeeded();
  const frames = await page
    .locator('.exploded-a,.exploded-b')
    .evaluateAll((es) =>
      es.map((e) => ({
        transform: getComputedStyle(e).transform,
        filter: getComputedStyle(e).filter,
      })),
    );
  expect(frames).toEqual([
    { transform: 'none', filter: 'none' },
    { transform: 'none', filter: 'none' },
  ]);
});
