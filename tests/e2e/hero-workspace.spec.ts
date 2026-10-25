import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
  test(
    'workspace remains on the photographed image plane @ ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/#top');
      const stage = page.locator('.hero-workspace');
      await expect(stage.locator('.on-photo-screen')).toHaveCount(2);
      await expect
        .poll(() =>
          stage.evaluate((el) => {
            const plane = el.getBoundingClientRect(),
              photo = el.parentElement!.getBoundingClientRect();
            const position = getComputedStyle(
              el.parentElement!.querySelector('picture > img')!,
            )
              .objectPosition.split(' ')
              .map((v) => parseFloat(v) / 100);
            const scale = Math.max(photo.width / 2400, photo.height / 1400);
            return Math.max(
              Math.abs(plane.width - 2400 * scale),
              Math.abs(plane.height - 1400 * scale),
              Math.abs(
                plane.x - photo.x - (photo.width - plane.width) * position[0],
              ),
              Math.abs(
                plane.y - photo.y - (photo.height - plane.height) * position[1],
              ),
            );
          }),
        )
        .toBeLessThan(1);
      if (width <= 1023) {
        const copy = await page.locator('.hero-copy').boundingBox();
        const visual = await page.locator('.hero-visual').boundingBox();
        expect(visual!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
      }
      await expect(page.locator('.hero-motion')).not.toBeVisible();
      await expect(page.locator('.workspace-title')).toHaveText(
        'Connected workspace',
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
    },
  );
}

test('workspace motion pauses on request, offscreen and on live reduced-motion change', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#top');
  const hero = page.locator('[data-hero]');
  const toggle = page.getByRole('button', { name: 'Pause workspace motion' });
  await expect(hero).toHaveAttribute('data-workspace-active', 'true');
  await toggle.click();
  await expect(hero).toHaveAttribute('data-workspace-active', 'false');
  await expect(page.locator('[data-workspace-toggle]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Resume workspace motion' }).click();
  await expect(hero).toHaveAttribute('data-workspace-active', 'true');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-workspace-active', 'false');
  await page.locator('.hero-visual').scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-workspace-active', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(hero).toHaveAttribute('data-workspace-active', 'false');
  await expect(page.locator('[data-workspace-toggle]')).not.toBeVisible();
});
