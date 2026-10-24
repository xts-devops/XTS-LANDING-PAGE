import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { services } from '../../src/content/services';

const serious = async (page: import('@playwright/test').Page) =>
  (
    await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
  ).violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
    );

test.describe('service pages', () => {
  for (const service of services) {
    test(`/services/${service.slug}: renders, one h1, form preselects the service, axe clean`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(`/services/${service.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(service.title);
      await expect(page.locator('select[name="need"]')).toHaveValue(
        service.slug,
      );
      expect(await serious(page)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  test('home service tiles link to every service page', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page
      .locator('.service-link')
      .evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(services.map((s) => `/services/${s.slug}`));
  });
});

test.describe('system showcase', () => {
  test('tabs: one system at a time; arrows, Home/End and click switch it', async ({
    page,
  }) => {
    await page.goto('/services/business-systems');
    const tabs = page.getByRole('tab');
    const count = services[0].systems!.length;
    await expect(tabs).toHaveCount(count);
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute(
      'id',
      'system-pos',
    );

    await page.keyboard.press('End');
    await expect(tabs.nth(count - 1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight'); // wraps
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    await tabs.nth(3).click();
    await expect(page.getByRole('tabpanel')).toHaveAttribute(
      'id',
      'system-wms',
    );
    await expect(page.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
  });

  test('deep link #system-pos opens the POS tab', async ({ page }) => {
    await page.goto('/services/business-systems#system-pos');
    await expect(page.getByRole('tab', { name: 'POS' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('slideshow: next/prev move slides and update the counter', async ({
    page,
  }) => {
    await page.goto('/services/business-systems');
    const panel = page.getByRole('tabpanel');
    const counter = panel.locator('[data-count-label]');
    const total = services[0].systems![0].slides.length;
    await expect(counter).toHaveText(`1 / ${total}`);
    await expect(panel.locator('[data-prev]')).toBeDisabled();
    await panel.locator('[data-next]').click();
    await expect(counter).toHaveText(`2 / ${total}`);
    await panel.locator('[data-prev]').click();
    await expect(counter).toHaveText(`1 / ${total}`);
  });
});

test.describe('screen on photo', () => {
  test('phone screen is scaled onto the photo and stays inside it', async ({
    page,
  }) => {
    await page.goto('/services/custom-software');
    const fig = page.locator('.photo:has([data-fit-stage])');
    await fig.scrollIntoViewIfNeeded();
    const screen = fig.locator('.on-photo-screen');
    await expect(screen).toBeVisible();
    const [f, s] = await Promise.all([fig.boundingBox(), screen.boundingBox()]);
    expect(s!.width).toBeGreaterThan(f!.width * 0.15);
    expect(s!.x).toBeGreaterThan(f!.x);
    expect(s!.x + s!.width).toBeLessThan(f!.x + f!.width);
    expect(s!.y + s!.height).toBeLessThan(f!.y + f!.height);
  });
});

test.describe('work gallery', () => {
  test('is keyboard-reachable and lists every item', async ({ page }) => {
    await page.goto('/');
    const track = page.locator('[data-work-track]');
    await expect(track).toHaveAttribute('tabindex', '0');
    await expect(page.locator('.work-card')).toHaveCount(
      (await import('../../src/content/work')).work.length,
    );
  });
});
