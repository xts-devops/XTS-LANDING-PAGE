import { expect, test, type Page } from '@playwright/test';
import { contact } from '../../src/lib/contact';

/**
 * Page-agnostic invariants: they hold from the first draft page to launch, so they never block
 * work in progress. Section-specific behaviour (selector, form) gets its own specs later.
 */

const WIDTHS = [375, 768, 1440] as const;

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on(
    'console',
    (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`),
  );
  page.on('requestfailed', (r) =>
    errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`),
  );
  return errors;
}

test.describe('home page', () => {
  test('loads cleanly: 200, no JS errors, no failed requests', async ({
    page,
  }) => {
    const errors = await collectErrors(page);
    const res = await page.goto('/');
    expect(res?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('document structure: lang, one h1, main landmark, sections have ids', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    // Ids power nav anchors and per-section review screenshots (DEV-FLOW §3).
    const missing = await page
      .locator('main section:not([id])')
      .evaluateAll((els) => els.map((el) => el.outerHTML.slice(0, 80)));
    expect(missing, 'every <main> <section> needs an id').toEqual([]);
  });

  for (const width of WIDTHS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, 'page is wider than the viewport').toBeLessThanOrEqual(
        0,
      );
    });
  }

  test('images have alt attributes and reserved dimensions', async ({
    page,
  }) => {
    await page.goto('/');
    const bad = await page
      .locator('img')
      .evaluateAll((imgs) =>
        imgs
          .filter(
            (img) =>
              !img.hasAttribute('alt') ||
              !img.getAttribute('width') ||
              !img.getAttribute('height'),
          )
          .map((img) => img.getAttribute('src')),
      );
    expect(
      bad,
      'img needs alt (empty if decorative) + width/height to avoid layout shift',
    ).toEqual([]);
  });

  test('in-page anchors point at existing ids', async ({ page }) => {
    await page.goto('/');
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute('href') ?? '')
          .filter(
            (href) =>
              href.length > 1 &&
              !document.getElementById(decodeURIComponent(href.slice(1))),
          ),
      );
    expect(broken).toEqual([]);
  });

  test('contact links use the approved email and phone', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page
      .locator('a[href^="mailto:"], a[href^="tel:"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      if (href.startsWith('mailto:'))
        expect(href.split('?')[0]).toBe(`mailto:${contact.email}`);
      else expect(href).toBe(`tel:${contact.phoneE164}`);
    }
  });

  test('content is visible with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const hidden = await page
      .locator('main section')
      .evaluateAll((els) =>
        els
          .filter((el) => Number(getComputedStyle(el).opacity) === 0)
          .map((el) => el.id),
      );
    expect(hidden, 'sections stuck at opacity 0').toEqual([]);
  });

  test('keyboard: first Tab lands on a visible, focus-styled element', async ({
    page,
  }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
    const styled = await focused.evaluate((el) => {
      const s = getComputedStyle(el);
      return (
        (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) ||
        s.boxShadow !== 'none'
      );
    });
    expect(styled, 'focused element needs a visible focus style').toBe(true);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('content is still readable (MOTION §4)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('SEO', () => {
  test('head has title, description, robots; JSON-LD parses', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/XZEN TECH SOLUTIONS/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /.{50,}/,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
    for (const json of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents()) {
      expect(() => JSON.parse(json)).not.toThrow();
    }
  });

  test('robots.txt is served', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('User-agent: *');
  });
});
