import { expect, test, type Page } from '@playwright/test';
const audit = async (page: Page) =>
  page.addInitScript(() => {
    const events: string[] = [];
    Object.defineProperty(window, 'bootAudit', { value: events });
    new MutationObserver(() =>
      events.push(document.documentElement.getAttribute('data-boot') ?? 'off'),
    ).observe(document, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-boot'],
    });
  });
const history = async (page: Page) =>
  page.evaluate(() => (window as unknown as { bootAudit: string[] }).bootAudit);
test('brand intro runs once per session, then shows the new hero', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await audit(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect.poll(() => history(page)).toContain('on');
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', 'on', {
    timeout: 4500,
  });
  await expect(page.locator('#hero-heading')).toHaveText(
    'Technology. Made to work.',
  );
  await page.reload({ waitUntil: 'domcontentloaded' });
  expect(await history(page)).not.toContain('on');
});
for (const key of ['Escape', 'Tab'])
  test(`${key} dismisses the brand entrance`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press(key);
    await expect(page.locator('[data-boot-screen]')).not.toBeVisible();
    if (key === 'Tab') await expect(page.locator('.skip-link')).toBeFocused();
  });
test('skip intro returns focus to visible page content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-boot-skip]').click();
  await expect(page.locator('[data-boot-screen]')).not.toBeVisible();
  await expect(page.locator('#main-content')).toBeFocused();
});
test('live reduced motion dismisses the entrance', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-boot-screen]')).not.toBeVisible();
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', 'on');
});
for (const route of ['/', '/#services', '/services/custom-software'])
  test(`entrance is bypassed for ${route}`, async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: route === '/' ? 'reduce' : 'no-preference',
    });
    await audit(page);
    await page.goto(route);
    expect(await history(page)).not.toContain('on');
    await expect(page.locator('[data-boot-screen]')).not.toBeVisible();
  });
test('blocked session storage leaves the page immediately available', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() =>
    Object.defineProperty(window, 'sessionStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    }),
  );
  await audit(page);
  await page.goto('/');
  expect(await history(page)).not.toContain('on');
  await expect(page.locator('[data-boot-screen]')).not.toBeVisible();
});
test('entrance fails open if the deferred UI bundle cannot load', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/*.js', (route) => route.abort());
  await audit(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect.poll(() => history(page)).toContain('on');
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', 'on', {
    timeout: 4500,
  });
  await expect(page.locator('#hero-heading')).toBeVisible();
});
test('global team wording and capability routes are consistent', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('#reach-heading')).toHaveText(
    'An international team. A global perspective.',
  );
  await expect(page.locator('main')).not.toContainText(/abroad/i);
  await expect(page.locator('.hero-capabilities a')).toHaveCount(4);
  const hrefs = await page
    .locator('.hero-capabilities a')
    .evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  expect(hrefs).toEqual([
    '/services/business-systems',
    '/services/custom-software',
    '/services/automation',
    '/services/robotics',
  ]);
});

test('extended entrance holds for its sequence then opens without a download dependency', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const timing = { start: 0, end: 0 };
    Object.defineProperty(window, 'introTiming', { value: timing });
    new MutationObserver(() => {
      if (document.documentElement.hasAttribute('data-boot'))
        timing.start ||= performance.now();
      else if (timing.start && !timing.end) timing.end = performance.now();
    }).observe(document, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-boot'],
    });
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', 'on', {
    timeout: 4500,
  });
  const duration = await page.evaluate(() => {
    const timing = (
      window as unknown as { introTiming: { start: number; end: number } }
    ).introTiming;
    return timing.end - timing.start;
  });
  expect(duration).toBeGreaterThan(2600);
  expect(duration).toBeLessThan(3900);
});

for (const viewport of [
  { width: 320, height: 667 },
  { width: 812, height: 375 },
  { width: 1440, height: 900 },
]) {
  test(
    'intro skip and signature fit the viewport @ ' +
      viewport.width +
      'x' +
      viewport.height,
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize(viewport);
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const skip = page.locator('[data-boot-skip]');
      await expect(skip).toBeVisible();
      const bounds = await skip.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      await skip.click();
      await expect(page.locator('[data-boot-screen]')).not.toBeVisible();
    },
  );
}

test('completed visual cover cannot intercept clicks if the UI controller is missing', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-boot-screen]')).toBeVisible();
  await page.evaluate(() =>
    document
      .getAnimations()
      .filter(
        (animation) =>
          animation instanceof CSSAnimation &&
          animation.animationName === 'xts-boot-out',
      )
      .forEach((animation) => animation.finish()),
  );
  const blocked = await page.evaluate(() =>
    Boolean(
      document
        .elementFromPoint(innerWidth / 2, innerHeight / 2)
        ?.closest('[data-boot-screen]'),
    ),
  );
  expect(blocked).toBe(false);
});
