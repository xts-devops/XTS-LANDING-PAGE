import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const width of [375, 768, 1440]) {
  test(`workflow viewer fits, inspects and restores focus at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/services/business-systems#industry-demos');
    const card = page.locator('[data-overview="formafield"]');
    const open = card.getByRole('button', {
      name: 'View full screen: Construction project management',
    });
    await expect(card.locator('[data-overview-play]')).toHaveCount(0);
    await open.focus();
    await page.keyboard.press('Enter');
    const dialog = page.locator('[data-overview-dialog]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName(
      'Construction project management',
    );
    await expect(card).toHaveAttribute('data-preview', 'complete');
    await expect(page.locator('iframe')).toHaveCount(1);
    await expect(card.locator('iframe')).toHaveCount(0);
    const fit = await dialog.evaluate((el) => {
      const viewport = el
        .querySelector('[data-overview-inspect]')!
        .getBoundingClientRect();
      const frame = el.querySelector('iframe')!.getBoundingClientRect();
      return (
        frame.width <= viewport.width + 1 && frame.height <= viewport.height + 1
      );
    });
    expect(fit).toBe(true);
    await dialog
      .getByRole('button', { name: 'Actual size', exact: true })
      .click();
    await expect
      .poll(() =>
        dialog
          .locator('iframe')
          .evaluate((el) => Math.round(el.getBoundingClientRect().width)),
      )
      .toBe(1440);
    await dialog
      .locator('[data-overview-inspect]')
      .evaluate((el) => el.scrollTo(250, 100));
    expect(
      await dialog
        .locator('[data-overview-inspect]')
        .evaluate((el) => el.scrollLeft),
    ).toBeGreaterThan(0);
    await dialog
      .getByRole('button', { name: 'Fit to screen', exact: true })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    await page.keyboard.press('Tab');
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(open).toBeFocused();
    await expect(page.locator('iframe')).toHaveCount(0);
  });
}
test('full-screen preview starts a finite workflow and Close unloads it', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/automation#industry-demos');
  const card = page.locator('[data-overview="factory"]');
  await card.locator('[data-overview-open]').click();
  const dialog = page.locator('[data-overview-dialog]');
  await expect(dialog).toHaveAttribute('data-preview', 'playing');
  await expect(
    dialog.frameLocator('iframe').locator('.overview-cursor'),
  ).toBeVisible();
  await expect(dialog).toHaveAttribute('data-preview', 'complete', {
    timeout: 15000,
  });
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
});
test('large stills and workflow frames are deferred until requested; no-JS keeps direct links', async ({
  page,
  browser,
}) => {
  const large: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/_astro/morrow.') && r.url().includes('.webp'))
      large.push(r.url());
  });
  await page.goto('/services/business-systems#industry-demos');
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(large).toHaveLength(0);
  await page.locator('[data-overview="morrow"] [data-overview-open]').click();
  await expect.poll(() => large.length).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJS = await context.newPage();
  await noJS.goto('/services/business-systems#industry-demos');
  await expect(
    noJS.locator('[data-overview="morrow"] .overview-fallback'),
  ).toBeVisible();
  await expect(
    noJS.locator('[data-overview="morrow"] [data-overview-open]'),
  ).not.toBeVisible();
  await expect(noJS.locator('iframe')).toHaveCount(0);
  await context.close();
});

test('expanded viewer has no serious or critical accessibility violations', async ({
  page,
}) => {
  await page.goto('/services/custom-software#industry-demos');
  await page.locator('[data-overview-open]').first().click();
  await expect(page.locator('[data-overview-dialog]')).toHaveAttribute(
    'data-preview',
    'complete',
  );
  const audit = await new AxeBuilder({ page })
    .include('[data-overview-dialog]')
    .analyze();
  expect(
    audit.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    ),
  ).toEqual([]);
});
test('a failed workflow keeps the large still and closable viewer', async ({
  page,
}) => {
  await page.route('**/demos/*.html?preview=*', (route) => route.abort());
  await page.goto('/services/business-systems#industry-demos');
  await page.locator('[data-overview-open]').first().click();
  const dialog = page.locator('[data-overview-dialog]');
  await expect(dialog.locator('.overview-expanded-poster img')).toBeVisible();
  await expect(dialog.locator('iframe')).toHaveCount(0, { timeout: 14000 });
  await expect(dialog.locator('[data-overview-dialog-status]')).toHaveText(
    'Showing the sample screen',
  );
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(dialog).not.toBeVisible();
});
