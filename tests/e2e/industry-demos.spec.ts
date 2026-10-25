import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const ids = [
  'morrow',
  'formafield',
  'brightlane',
  'kindred',
  'daybreak',
  'vista',
  'relaydock',
  'support',
  'documents',
  'factory',
  'retail',
  'warehouse',
];
for (const id of ids)
  for (const width of [375, 768, 1440])
    test(`${id} live concept at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`/demos/${id}.html`);
      await expect(page.locator('h1')).toBeVisible();
      const bounds = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      expect(bounds.width).toBeLessThanOrEqual(width);
      if (width === 1440) expect(bounds.height).toBeLessThanOrEqual(900);
      expect(errors).toEqual([]);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.screenshot({
        path: `docs/review/industry-demos/live/${id}-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    });
test('full-screen workflows load on request and restore focus with Escape', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (r) => {
    if (/\/demos\/.*\.html/.test(r.url())) requests.push(r.url());
  });
  await page.goto('/services/custom-software');
  await expect(page.locator('[data-overview-open]')).toHaveCount(3);
  expect(requests).toHaveLength(0);
  const button = page.locator('[data-overview-open]').first();
  await button.click();
  const card = page.locator('[data-overview]').first();
  await expect(card).toHaveAttribute('data-preview', 'complete');
  const viewer = page.locator('[data-overview-dialog]');
  await expect(viewer.locator('iframe')).toHaveAttribute(
    'sandbox',
    'allow-scripts',
  );
  await expect(viewer.locator('iframe')).toHaveAttribute('tabindex', '-1');
  expect(requests).toHaveLength(1);
  await page.keyboard.press('Escape');
  await expect(card.locator('iframe')).toHaveCount(0);
  await expect(button).toBeFocused();
});

test('retail checkout and filtering use local sample state', async ({
  page,
}) => {
  await page.goto('/demos/morrow.html');
  await expect(page.locator('[data-checkout]')).toBeDisabled();
  await page.locator('[data-product="Flat white"]').click();
  await page.locator('[data-product="Local rice · 1 kg"]').click();
  await expect(page.locator('[data-total]')).toContainText('213.00');
  await page.locator('[data-segment="products"][data-value="Market"]').click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(3);
  await page.locator('[data-checkout]').click();
  await expect(page.getByRole('status')).toContainText(
    'No payment was collected',
  );
  await expect(page.locator('[data-total]')).toContainText('0.00');
});
test('construction phase controls and checklist work without automatic motion', async ({
  page,
}) => {
  await page.goto('/demos/formafield.html');
  await expect(page.locator('[data-build-play]')).not.toBeVisible();
  await page.locator('[data-phase-button="3"]').click();
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'data-phase',
    '3',
  );
  await page.locator('[data-site-task]').nth(2).check();
  await expect(page.locator('[data-site-status]')).toHaveText(
    '3 of 4 coordination items recorded',
  );
});
test('school views filter the roster', async ({ page }) => {
  await page.goto('/demos/brightlane.html');
  await page.locator('[data-attendance]').selectOption('Pending');
  await expect(
    page.locator('[data-roster="Students"] tbody tr:visible'),
  ).toHaveCount(1);
  await page.locator('[data-segment="roster"][data-value="Staff"]').click();
  await expect(
    page.locator('[data-roster="Staff"] tbody tr:visible'),
  ).toContainText('Sam Lee');
});
test('dental booking carries selections to confirmation', async ({ page }) => {
  await page.goto('/demos/kindred.html');
  await page.locator('[data-clinician]').selectOption('Dr Maya Reyes');
  await page.locator('[data-book-date]').nth(1).click();
  await page.locator('[data-book-time="2:00 PM"]').click();
  await page.locator('[data-confirm-booking]').click();
  await expect(page.getByRole('status')).toContainText(
    'Dr Maya Reyes · Sat, 24 October · 2:00 PM',
  );
});
test('court reservations are distinct from hotel stays', async ({ page }) => {
  await page.goto('/demos/daybreak.html');
  await page
    .locator('[data-segment="reservation"][data-value="Courts"]')
    .click();
  await expect(page.locator('[data-reservation="Stays"]')).not.toBeVisible();
  await page
    .locator('[data-reservation="Courts"] [data-reserve]')
    .first()
    .click();
  await expect(page.getByRole('status')).toContainText('Court 01');
});
test('architecture concept views and viewing requests work', async ({
  page,
}) => {
  await page.goto('/demos/vista.html');
  await page.locator('[data-tour-view="interior"]').click();
  await expect(page.locator('[data-tour-image]')).toHaveAttribute(
    'src',
    '/demos/media/vista-interior.webp',
  );
  await page.locator('[data-viewing]').click();
  await expect(page.locator('[data-viewing-panel]')).toBeVisible();
  await page.locator('[data-viewing-confirm]').click();
  await expect(page.getByRole('status')).toContainText('no request was sent');
});
test('infrastructure deployment is a dry run with visible progress', async ({
  page,
}) => {
  await page.goto('/demos/relaydock.html');
  await page.locator('[data-stack="data"]').click();
  await expect(page.locator('[data-stack-title]')).toHaveText('Data services');
  await page.locator('[data-deploy]').click();
  await expect(page.locator('[data-release-step].complete')).toHaveCount(4);
  await expect(page.getByRole('status')).toContainText(
    'no infrastructure was changed',
  );
});

test('construction sequence can be paused and responds to reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/demos/formafield.html');
  const play = page.locator('[data-build-play]');
  await play.click();
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'data-phase',
    '0',
  );
  await play.click();
  await page.waitForTimeout(1450);
  await expect(page.locator('[data-build-scene]')).toHaveAttribute(
    'data-phase',
    '0',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(play).not.toBeVisible();
});
test('no-JS visitors have a direct concept preview link', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4380/services/custom-software');
  await expect(page.locator('[data-overview-open]').first()).not.toBeVisible();
  const link = page.locator('.industry-card noscript a').first();
  await expect(link).toBeVisible();
  await link.click();
  await expect(page.locator('h1')).toContainText('smile');
  await context.close();
});

test('mobile retail ticket is reachable without hunting below the catalogue', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/demos/morrow.html');
  await page.locator('[data-product="Flat white"]').click();
  const peek = page.locator('[data-show-ticket]');
  await expect(peek).toBeVisible();
  await expect(peek).toContainText('145.00');
  await peek.click();
  await expect(page.locator('[data-checkout]')).toBeInViewport();
  await page.locator('[data-checkout]').click();
  await expect(peek).not.toBeVisible();
});
