import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { validate } from '../../src/lib/form';

test.describe('inquiry form', () => {
  test('stays disabled with an email/phone note until an access key is configured', async ({
    page,
  }) => {
    test.skip(
      Boolean(process.env.PUBLIC_FORM_ACCESS_KEY),
      'form is live in this build',
    );
    await page.goto('/');
    // toBeDisabled() applies to controls, so check fields inside the disabled fieldset.
    await expect(page.locator('#name')).toBeDisabled();
    await expect(page.locator('.form-submit')).toBeDisabled();
    await expect(page.locator('#form-status')).toContainText(/email or call/i);
  });

  test('validation rules', () => {
    const good = {
      name: 'Ana Cruz',
      email: 'ana@company.ph',
      company: '',
      need: 'automation',
      message: 'We want to connect our POS to our warehouse system.',
      consent: 'on',
    };
    expect(validate(good).ok).toBe(true);
    const bad = validate({
      ...good,
      name: ' ',
      email: 'nope',
      message: 'short',
      consent: '',
    });
    expect(bad.ok).toBe(false);
    if (!bad.ok)
      expect(bad.fields.sort()).toEqual([
        'consent',
        'email',
        'message',
        'name',
      ]);
  });
});

test.describe('privacy page', () => {
  test('renders, links back to home sections, and passes axe', async ({
    page,
  }) => {
    const res = await page.goto('/privacy');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(/privacy notice/i);
    await expect(page).toHaveTitle(/Privacy Notice · XZEN TECH SOLUTIONS/);
    // Header/footer anchors must point at the home page from here.
    const hrefs = await page
      .locator('header nav a, footer nav:not(.footer-legal) a')
      .evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(href).toMatch(/^\/#/);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => v.id),
    ).toEqual([]);
  });

  test('home form consent links to the privacy page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.form-consent a')).toHaveAttribute(
      'href',
      '/privacy',
    );
  });
});

test.describe('terms page and legal links', () => {
  test('terms renders and passes axe; footer links to both legal pages', async ({
    page,
  }) => {
    const res = await page.goto('/terms');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(/website terms/i);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => v.id),
    ).toEqual([]);
    await page.goto('/');
    await expect(page.locator('.footer-legal a')).toHaveText([
      'Privacy notice',
      'Website terms',
    ]);
  });
});
