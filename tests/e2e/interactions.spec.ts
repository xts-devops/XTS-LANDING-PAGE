import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { validate } from '../../src/lib/form';

test.describe('industries tabs', () => {
  test('one panel at a time; arrows, Home/End and click switch it', async ({
    page,
  }) => {
    await page.goto('/');
    const tabs = page.getByRole('tab');
    await expect(page.getByRole('tablist')).toHaveCount(1);
    await expect(tabs).toHaveCount(5);
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowDown');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      'tab-manufacturing',
    );

    await page.keyboard.press('End');
    await expect(tabs.nth(4)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowDown'); // wraps
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    await tabs.nth(3).click();
    await expect(page.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      'tab-healthcare',
    );
    // Only the active tab is in the Tab order (roving tabindex).
    await expect(page.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
  });
});

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

  test('"Discuss a similar project" preselects the matching solution', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('[data-need="automation"]').click();
    await expect(page.locator('select[name="need"]')).toHaveValue('automation');
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
      .locator('header nav a, footer nav a')
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
