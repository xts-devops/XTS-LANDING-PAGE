import { expect, test } from '@playwright/test';
import industryDemos from '../../src/content/industry-demos.json' with { type: 'json' };
for (const d of industryDemos) {
  test(`${d.id} overview performs a finite workflow with a visible cursor`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/services/' + d.service);
    const card = page.locator(`[data-overview="${d.id}"]`),
      button = card.locator('[data-overview-play]');
    await card.scrollIntoViewIfNeeded();
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(card).toHaveAttribute('data-preview', 'playing');
    const frame = card.frameLocator('iframe');
    await expect(frame.locator('.overview-cursor')).toBeVisible();
    await expect(frame.locator('.overview-caption')).not.toHaveText('');
    await expect(card).toHaveAttribute('data-preview', 'complete', {
      timeout: 15000,
    });
    await expect(button).toHaveAccessibleName(`Replay overview: ${d.title}`);
    if (d.id === 'morrow')
      await expect(frame.locator('[data-total]')).toContainText('0.00');
    if (d.id === 'formafield')
      await expect(frame.locator('[data-build-scene]')).toHaveAttribute(
        'data-phase',
        '3',
      );
    if (d.id === 'brightlane')
      await expect(frame.locator('[data-attendance]')).toHaveValue('Pending');
    if (d.id === 'kindred')
      await expect(frame.locator('[data-book-review]')).toContainText(
        'Dr Maya Reyes',
      );
    if (d.id === 'daybreak')
      await expect(frame.locator('[data-reservation="Courts"]')).toBeVisible();
    if (d.id === 'vista')
      await expect(frame.locator('[data-viewing-panel]')).toBeVisible();
    if (d.id === 'support')
      await expect(frame.locator('[data-support-status]')).toHaveText(
        'Assigned to an agent',
      );
    if (d.id === 'documents')
      await expect(frame.locator('[data-doc-status]')).toHaveText(
        'Sample sync complete',
      );
    if (d.id === 'factory')
      await expect(frame.locator('[data-factory-status]')).toHaveText(
        'Sample exception flagged',
      );
    if (d.id === 'relaydock')
      await expect(frame.locator('[data-release-step].complete')).toHaveCount(
        4,
      );
    await page.keyboard.press('Escape');
    await expect(card.locator('iframe')).toHaveCount(0);
  });
}
test('hover starts one preview and leaving unloads it without page scroll changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/custom-software');
  const cards = page.locator('[data-overview]');
  await cards.first().locator('[data-overview-stage]').hover();
  await expect(cards.first()).toHaveAttribute('data-preview', 'playing');
  const y = await page.evaluate(() => scrollY);
  await cards.nth(1).locator('[data-overview-stage]').hover();
  await expect(cards.first().locator('iframe')).toHaveCount(0);
  await expect(cards.nth(1)).toHaveAttribute('data-preview', 'playing');
  expect(await page.evaluate(() => scrollY)).toBe(y);
  await page.mouse.move(0, 0);
  await expect(page.locator('[data-overview] iframe')).toHaveCount(0);
});
for (const width of [375, 768, 1440])
  test(`purpose names and compact cards at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/services/business-systems');
    const collection = page.locator('#industry-demos');
    await expect(
      collection.getByRole('heading', { name: 'Coffee shop & grocery POS' }),
    ).toBeVisible();
    await expect(collection).not.toContainText(
      /Morrow|FormaField|Brightlane|Try the demo/,
    );
    expect(await collection.evaluate((el) => el.scrollWidth > innerWidth)).toBe(
      false,
    );
    for (const card of await collection.locator('.industry-card').all()) {
      expect(
        (await card.locator('.industry-card-body').boundingBox())!.height,
      ).toBeLessThan(350);
      expect(
        (await card.locator('[data-overview-play]').boundingBox())!.height,
      ).toBeGreaterThanOrEqual(44);
    }
  });
test('reduced motion skips hover animation and tap presents a static overview', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/services/business-systems');
  const card = page.locator('[data-overview="morrow"]');
  await card.locator('[data-overview-stage]').hover();
  await expect(card.locator('iframe')).toHaveCount(0);
  await card.locator('[data-overview-play]').click();
  await expect(card).toHaveAttribute('data-preview', 'complete');
  await expect(
    card.frameLocator('iframe').locator('.overview-cursor'),
  ).toHaveCount(0);
  await expect(
    card.frameLocator('iframe').locator('[data-product] img'),
  ).toHaveCount(6);
  await page.keyboard.press('Escape');
  await expect(card.locator('iframe')).toHaveCount(0);
});
test('a live reduced-motion change unloads a running overview', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/business-systems');
  const stage = page.locator('[data-overview="morrow"] [data-overview-stage]');
  await stage.hover();
  await expect(stage.locator('iframe')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(stage.locator('iframe')).toHaveCount(0);
});
