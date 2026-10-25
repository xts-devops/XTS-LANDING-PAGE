import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [375, 768, 1440]) {
  test(
    'construction phases keep imagery and project records synchronized at ' +
      width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/demos/formafield.html');
      const cases = [
        ['foundation', '15%', 'Foundation inspection record'],
        ['structure', '38%', 'Structural work-package review'],
        ['enclosure', '62%', 'Roof and window inspection'],
        ['fitout', '84%', 'Services testing and defect review'],
        ['handover', '100%', 'Turnover pack complete'],
      ];
      await expect(page.locator('[data-phase-button]')).toHaveCount(5);
      for (const [i, [id, progress, gate]] of cases.entries()) {
        await page.locator('[data-phase-button="' + i + '"]').click();
        await expect(page.locator('[data-build-scene]')).toHaveAttribute(
          'data-phase',
          String(i),
        );
        await expect(page.locator('[data-build-scene]')).toHaveAttribute(
          'aria-busy',
          'false',
        );
        await expect(page.locator('[data-build-progress]')).toHaveText(
          progress,
        );
        await expect(page.locator('[data-build-gate]')).toHaveText(gate);
        await expect(
          page.locator('.construction-photo.is-current'),
        ).toHaveAttribute('src', '/demos/media/construction/' + id + '.webp');
        expect(
          await page
            .locator('.construction-photo.is-current')
            .evaluate(
              (el: HTMLImageElement) => el.complete && el.naturalWidth === 1600,
            ),
        ).toBe(true);
        await expect(page.locator('[data-build-fallback]')).not.toBeVisible();
        await expect(page.locator('[data-build-completion]')).toHaveAttribute(
          'aria-valuenow',
          progress.replace('%', ''),
        );
        const bounds = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        }));
        expect(bounds.width).toBe(width);
        if (width === 1440) expect(bounds.height).toBeLessThanOrEqual(900);
      }
      await expect(page.locator('[data-build-open]')).toHaveText('0');
      await expect(page.locator('[data-site-task]:checked')).toHaveCount(4);
      await expect(
        page
          .locator('[data-build-milestone-state]')
          .filter({ hasText: 'Complete' }),
      ).toHaveCount(5);
    },
  );
}

test('construction preserves per-phase checklist edits and delays unselected image requests', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/media/construction/')) requests.push(r.url());
  });
  await page.goto('/demos/formafield.html');
  expect(requests.every((url) => url.endsWith('enclosure.webp'))).toBe(true);
  await page.locator('[data-site-task]').nth(2).check();
  await expect(page.locator('[data-site-status]')).toHaveText(
    '3 of 4 coordination items recorded',
  );
  await page.locator('[data-phase-button="4"]').click();
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'data-phase',
    '4',
  );
  await page.locator('[data-phase-button="2"]').click();
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'data-phase',
    '2',
  );
  await expect(page.locator('[data-site-status]')).toHaveText(
    '3 of 4 coordination items recorded',
  );
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    ),
  ).toEqual([]);
});

test('failed phase photograph keeps the right project record and a useful fallback', async ({
  page,
}) => {
  await page.route('**/construction/foundation.webp', (route) => route.abort());
  await page.goto('/demos/formafield.html');
  await page.locator('[data-phase-button="0"]').click();
  await expect(page.locator('[data-build-fallback]')).toBeVisible();
  await expect(page.locator('[data-build-progress]')).toHaveText('15%');
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'aria-busy',
    'false',
  );
  await page.locator('[data-phase-button="4"]').click();
  await expect(page.locator('[data-build-progress]')).toHaveText('100%');
  await expect(page.locator('[data-build-fallback]')).not.toBeVisible();
});

test('reduced-motion construction overview loads only the selected and final records', async ({
  page,
}) => {
  const images: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/media/construction/')) images.push(r.url());
  });
  await page.goto('/demos/formafield.html?preview=1&still=1');
  await page.evaluate(() =>
    window.postMessage({ type: 'xts:overview-start' }, '*'),
  );
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'data-phase',
    '4',
  );
  expect(images.every((url) => /enclosure|handover/.test(url))).toBe(true);
  await expect(page.locator('[data-build-progress]')).toHaveText('100%');
});
