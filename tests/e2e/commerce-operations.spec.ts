import { test, expect } from '@playwright/test';

test('branch replenishment follows store stock and does not change it on draft', async ({
  page,
}) => {
  await page.goto('/demos/retail.html');
  await page.locator('[data-retail-branch]').selectOption('Cebu City');
  await expect(page.locator('[data-retail-store]')).toHaveText('Cebu City');
  await expect(page.locator('[data-retail-suggestions]')).toContainText(
    'Drill 11 units',
  );
  await expect(page.locator('[data-retail-transfer-status]')).toContainText(
    '27 units suggested',
  );
  const stock = await page.locator('[data-retail-stock]').allTextContents();
  await page.getByRole('button', { name: 'Create transfer draft' }).click();
  await expect(page.locator('[data-retail-transfer-status]')).toContainText(
    '27 units to Cebu City',
  );
  expect(await page.locator('[data-retail-stock]').allTextContents()).toEqual(
    stock,
  );
  await expect(page.locator('[data-retail-transfer]')).toBeDisabled();
  await page.locator('[data-retail-branch]').selectOption('Quezon City');
  await expect(page.locator('[data-retail-transfer]')).toBeEnabled();
  await expect(page.locator('[data-retail-suggestions]')).toContainText(
    'Extension cable 4 units',
  );
  await page.locator('[data-retail-collect]').click();
  await expect(page.locator('[data-retail-collect-status]')).toContainText(
    'Ready for collection',
  );
});

test('warehouse prevents out-of-order dispatch and preserves the quality hold', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/demos/warehouse.html');
  await page.locator('[data-warehouse-stage="3"]').click();
  await expect(page.locator('[data-warehouse-action]')).toBeDisabled();
  await expect(page.locator('[data-warehouse-status]')).toContainText(
    'Complete the previous',
  );
  for (let i = 0; i < 4; i++) {
    await page.locator('[data-warehouse-stage="' + i + '"]').click();
    await expect(page.locator('[data-warehouse-action]')).toBeEnabled();
    await page.locator('[data-warehouse-action]').click();
    await expect(page.locator('[data-warehouse-action]')).toBeDisabled();
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight),
    ).toBeLessThanOrEqual(900);
  }
  await expect(page.locator('[data-wave-row]').first()).toHaveText(
    'Dispatch confirmed',
  );
  await expect(page.locator('[data-warehouse-audit]')).toHaveText(
    'Manifest ready for carrier',
  );
  await expect(page.locator('.warehouse-exception')).toContainText(
    '12 cartons',
  );
  await expect(page.locator('.warehouse-exception')).toContainText('Held');
});

for (const id of ['retail', 'warehouse'])
  test(
    id + ' fullscreen preview is available without hover',
    async ({ page }) => {
      await page.goto('/services/business-systems');
      const card = page.locator('[data-overview="' + id + '"]');
      const button = card.locator('[data-overview-open]');
      await button.click();
      const dialog = page.locator('[data-overview-dialog]');
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('iframe')).toHaveAttribute(
        'src',
        new RegExp('/demos/' + id + '.html'),
      );
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(button).toBeFocused();
    },
  );
