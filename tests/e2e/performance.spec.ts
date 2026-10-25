import { test, expect } from '@playwright/test';
for (const width of [375, 768, 1440, 2048])
  test(
    'hero glass paints without JavaScript at ' + width,
    async ({ browser }) => {
      const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width, height: 900 },
      });
      try {
        const page = await context.newPage();
        await page.goto('/#top');
        await expect(page.locator('#hero-heading')).toHaveText(
          'Technology. Made to work.',
        );
        const stage = page.locator('.hero-workspace');
        expect(
          await stage.evaluate((el) => el.getBoundingClientRect().width),
        ).toBeGreaterThanOrEqual(width - 1);
        await expect(stage.locator('.workspace-title')).toBeVisible();
        await expect(stage.locator('.workspace-portal-heading')).toBeVisible();
        expect(
          await stage.evaluate((el) => parseFloat(getComputedStyle(el).scale)),
        ).toBeGreaterThan(0);
        await page.screenshot({
          path: 'docs/review/performance/no-js-' + width + '.png',
          fullPage: false,
        });
      } finally {
        await context.close();
      }
    },
  );

test('inactive forms do not fetch validation code', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  await page.goto('/#top');
  expect(requests.some((url) => /\/form\.[^/]+\.js/.test(url))).toBe(false);
  await expect(
    page.locator('form[data-form="inquiry"] button[type="submit"]'),
  ).toBeDisabled();
});

test('configured forms still load validation and reject incomplete submissions locally', async ({
  page,
}) => {
  await page.route('https://api.web3forms.com/**', (route) => route.abort());
  await page.route('**/', async (route) => {
    const response = await route.fetch();
    let html = await response.text();
    html = html
      .replace(
        /<form([^>]*data-form="inquiry"[^>]*)>/,
        '<form$1 data-access-key="test-only-key">',
      )
      .replace(/<fieldset disabled(?:="")?>/, '<fieldset>');
    await route.fulfill({ response, body: html });
  });
  await page.goto('/#contact');
  await page.waitForFunction(() =>
    performance
      .getEntriesByType('resource')
      .some((r) => /\/form\.[^/]+\.js/.test(r.name)),
  );
  await page.locator('form[data-form="inquiry"] button[type="submit"]').click();
  await expect(page.locator('input[name="name"]')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await expect(page.locator('#name-error')).toBeVisible();
});

test('motion-enabled preview events never throw or scroll the background', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/custom-software');
  await page.mouse.move(200, 200);
  await page.mouse.wheel(0, 500);
  await page.waitForFunction(() =>
    performance
      .getEntriesByType('resource')
      .some((r) => r.name.includes('lenis.')),
  );
  await page.locator('[data-overview="kindred"] [data-overview-open]').click();
  await expect(page.locator('[data-overview-dialog]')).toBeVisible();
  const top = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 200);
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(top, 0);
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-overview-dialog]')).not.toBeVisible();
  expect(errors).toEqual([]);
});

test('legacy CSS sizing mounts early even when the main JavaScript bundle is blocked', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const supports = CSS.supports.bind(CSS);
    CSS.supports = ((property: string, value?: string) =>
      property === 'scale'
        ? false
        : value === undefined
          ? supports(property)
          : supports(property, value)) as typeof CSS.supports;
  });
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/#top');
  const stage = page.locator('.hero-workspace');
  await expect(stage).toHaveAttribute('data-fit-managed', 'early');
  expect(
    await stage.evaluate((el) => parseFloat(getComputedStyle(el).scale)),
  ).toBeGreaterThan(0);
  await page.setViewportSize({ width: 768, height: 900 });
  await expect
    .poll(() =>
      stage.evaluate((el) => {
        const photo = el.parentElement!.getBoundingClientRect(),
          plane = el.getBoundingClientRect();
        return Math.abs(
          plane.width -
            2400 * Math.max(photo.width / 2400, photo.height / 1400),
        );
      }),
    )
    .toBeLessThan(1);
});
