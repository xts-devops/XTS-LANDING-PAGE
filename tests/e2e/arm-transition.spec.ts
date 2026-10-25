import { expect, test, type Page } from '@playwright/test';
const progress = (page: Page) =>
  page
    .locator('.exploded-progress')
    .evaluate((el) => Number(getComputedStyle(el).getPropertyValue('--p')));
async function enter(page: Page) {
  await page.evaluate(() => {
    const el = document.querySelector('.exploded-stage')!;
    scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY -
        Math.max(104, (innerHeight - el.clientHeight) / 2) +
        24,
      behavior: 'instant',
    });
  });
}
for (const width of [375, 768, 1440]) {
  test(`arm finishes with scrolling stopped and replays at ${width}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/services/robotics');
    await page.mouse.move(100, 100);
    await enter(page);
    await expect(page.locator('[data-exploded]')).toHaveClass(/has-arm-video/);
    const y = await page.evaluate(() => scrollY);
    await expect.poll(() => progress(page)).toBeGreaterThan(0.98);
    expect(await page.evaluate(() => scrollY)).toBeCloseTo(y, 0);
    const replay = page.getByRole('button', { name: 'Replay transition' });
    await expect(replay).toBeEnabled();
    expect((await replay.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await replay.click();
    await expect.poll(() => progress(page)).toBeLessThan(0.4);
    await expect(replay).toBeEnabled();
    await expect.poll(() => progress(page)).toBeGreaterThan(0.98);
    await page.evaluate(() => scrollBy({ top: -100, behavior: 'instant' }));
    await expect.poll(() => progress(page)).toBeLessThan(0.02);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(replay).not.toBeVisible();
    await expect(page.locator('[data-exploded-video]')).not.toHaveAttribute(
      'src',
      /.+/,
    );
  });
}
test('late media waits at the assembled frame then performs the whole transition', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release = () => {};
  const gate = new Promise<void>((r) => {
    release = r;
  });
  await page.route('**/arm-exploded*.mp4', async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto('/services/robotics', { waitUntil: 'domcontentloaded' });
  await page.mouse.move(100, 100);
  await enter(page);
  await page.waitForTimeout(400);
  expect(await progress(page)).toBe(0);
  release();
  await expect
    .poll(() => progress(page), { timeout: 10000 })
    .toBeGreaterThan(0.98);
});
for (const mode of ['save-data', 'failed-video']) {
  test(`${mode} keeps a finite photo fallback`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    if (mode === 'save-data')
      await page.addInitScript(() =>
        Object.defineProperty(navigator, 'connection', {
          value: { saveData: true },
          configurable: true,
        }),
      );
    else await page.route('**/arm-exploded*.mp4', (route) => route.abort());
    await page.goto('/services/robotics');
    await page.mouse.move(100, 100);
    await enter(page);
    await expect.poll(() => progress(page)).toBeGreaterThan(0.98);
    await expect(page.locator('[data-exploded]')).not.toHaveClass(
      /has-arm-video/,
    );
    await expect(page.locator('.exploded-b')).toBeVisible();
  });
}
test('leaving the scene suspends the unfinished transition', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/robotics');
  await page.mouse.move(100, 100);
  await enter(page);
  await expect
    .poll(() => progress(page), { intervals: [50] })
    .toBeGreaterThan(0.1);
  await page.evaluate(() => {
    const el = document.querySelector('.exploded-stage')!;
    scrollTo({
      top: el.getBoundingClientRect().bottom + scrollY + 100,
      behavior: 'instant',
    });
  });
  await page.waitForTimeout(150);
  const stopped = await progress(page);
  await page.waitForTimeout(300);
  expect(await progress(page)).toBeCloseTo(stopped, 2);
  await enter(page);
  await expect.poll(() => progress(page)).toBeGreaterThan(0.98);
});
