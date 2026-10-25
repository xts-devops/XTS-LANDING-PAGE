import { test, expect } from '@playwright/test';
for (const path of [
  '/',
  '/services/custom-software',
  '/services/business-systems',
  '/services/automation',
  '/services/robotics',
  '/privacy',
  '/terms',
]) {
  test(`footer return is accessible and instant with reduced motion on ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);
    const link = page.locator('[data-back-top]');
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    await expect(link).toHaveAccessibleName('Back to top');
    const r = await link.boundingBox();
    expect(r!.height).toBeGreaterThanOrEqual(44);
    expect(r!.x + r!.width).toBeLessThanOrEqual(375);
    await link.click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator('.site-header .brand-link')).toBeFocused();
    await expect(page.locator('html')).not.toHaveAttribute(
      'data-returning-top',
    );
    expect(new URL(page.url()).pathname).toBe(path);
  });
}
for (const path of ['/', '/services/custom-software']) {
  test(`normal return is smooth, short and stays at the top on ${path}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(path + '#contact');
    await page.mouse.move(300, 200);
    await page.waitForFunction(() =>
      document.querySelector('.work-track.is-pinned, .has-gallery-motion'),
    );
    await page.evaluate(() =>
      scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'instant',
      }),
    );
    const link = page.locator('[data-back-top]');
    await expect(link).toBeInViewport();
    const start = await page.evaluate(() => scrollY);
    expect(start).toBeGreaterThan(1000);
    const time = Date.now();
    await link.click();
    await page.waitForTimeout(100);
    const intermediate = await page.evaluate(() => scrollY);
    expect(intermediate).toBeGreaterThan(0);
    expect(intermediate).toBeLessThan(start);
    await expect
      .poll(() => page.evaluate(() => scrollY), { timeout: 1200 })
      .toBeLessThanOrEqual(1);
    expect(Date.now() - time).toBeLessThan(1300);
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => scrollY)).toBeLessThanOrEqual(1);
    await expect(page.locator('.site-header .brand-link')).toBeFocused();
  });
}
test('touch fallback returns quickly without loading a desktop scroll engine', async ({
  browser,
}) => {
  const c = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'no-preference',
  });
  const p = await c.newPage();
  await p.goto('http://127.0.0.1:4380/services/custom-software');
  await p.locator('[data-back-top]').scrollIntoViewIfNeeded();
  await p.locator('[data-back-top]').tap();
  await expect
    .poll(() => p.evaluate(() => scrollY), { timeout: 1200 })
    .toBeLessThanOrEqual(1);
  await c.close();
});
test('new user input interrupts a return without stealing focus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/custom-software');
  await page.mouse.move(300, 200);
  await page.waitForFunction(() =>
    document.querySelector('.has-gallery-motion'),
  );
  await page.locator('[data-back-top]').scrollIntoViewIfNeeded();
  await page.locator('[data-back-top]').click();
  await page.waitForTimeout(80);
  await page.mouse.wheel(0, 100);
  await expect(page.locator('html')).not.toHaveAttribute('data-returning-top');
  await page.waitForTimeout(650);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(10);
  await expect(page.locator('.site-header .brand-link')).not.toBeFocused();
});
test('native return works without JavaScript', async ({ browser }) => {
  const c = await browser.newContext({ javaScriptEnabled: false });
  const p = await c.newPage();
  await p.goto('http://127.0.0.1:4380/services/custom-software');
  await p.locator('[data-back-top]').click();
  await expect.poll(() => p.evaluate(() => scrollY)).toBeLessThanOrEqual(1);
  await c.close();
});
