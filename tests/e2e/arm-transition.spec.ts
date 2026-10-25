import { expect, test, type Page } from '@playwright/test';
const progress = (page: Page) =>
  page
    .locator('.exploded-progress')
    .evaluate((el) => Number(getComputedStyle(el).getPropertyValue('--p')));
async function enter(page: Page) {
  await page.evaluate(() => {
    const el = document.querySelector('.exploded-scroll')!;
    const stage = document.querySelector<HTMLElement>('.exploded-stage')!;
    const style = getComputedStyle(stage);
    const inset =
      style.position === 'sticky'
        ? parseFloat(style.top)
        : Math.max(104, (innerHeight - stage.clientHeight) / 2);
    scrollTo({
      top: el.getBoundingClientRect().top + scrollY - inset + 24,
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
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await expect(page.locator('[data-exploded-video]')).toHaveJSProperty(
      'paused',
      true,
    );
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
  test(`${mode} keeps a looping photo fallback`, async ({ page }) => {
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
    const el = document.querySelector('.exploded-scroll')!;
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

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(
    'arm holds briefly, fits controls and releases at ' + viewport.width,
    async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/services/robotics');
      await page.mouse.move(100, 100);
      await enter(page);
      const stage = page.locator('.exploded-stage');
      await expect(stage).toHaveCSS('position', 'sticky');
      const initial = (await stage.boundingBox())!;
      expect(initial.y).toBeGreaterThanOrEqual(72);
      expect(initial.y + initial.height).toBeLessThan(viewport.height);
      await page.evaluate(() => scrollBy({ top: 180, behavior: 'instant' }));
      await expect
        .poll(async () => Math.abs((await stage.boundingBox())!.y - initial.y))
        .toBeLessThan(2);
      await expect.poll(() => progress(page)).toBeGreaterThan(0.98);
      await page.evaluate(() => {
        const el = document.querySelector('.exploded-scroll')!;
        scrollTo({
          top: el.getBoundingClientRect().bottom + scrollY + 50,
          behavior: 'instant',
        });
      });
      await expect
        .poll(
          async () =>
            (await stage.boundingBox())!.y +
            (await stage.boundingBox())!.height,
        )
        .toBeLessThan(0);
      await page.setViewportSize({ width: 375, height: 812 });
      await expect(stage).toHaveCSS('position', 'relative');
      await expect(page.locator('.exploded-scroll')).toHaveCSS(
        'padding-bottom',
        '0px',
      );
      await page.setViewportSize(viewport);
      await expect(stage).toHaveCSS('position', 'sticky');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(stage).toHaveCSS('position', 'relative');
      await expect(page.locator('.exploded-scroll')).toHaveCSS(
        'padding-bottom',
        '0px',
      );
    },
  );
}

test('short desktops retain normal arm flow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 600 });
  await page.goto('/services/robotics');
  await expect(page.locator('.exploded-stage')).toHaveCSS(
    'position',
    'relative',
  );
  await expect(page.locator('.exploded-scroll')).toHaveCSS(
    'padding-bottom',
    '0px',
  );
});

test('coarse-pointer desktop viewport keeps normal flow', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    hasTouch: true,
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4380/services/robotics');
  await expect(page.locator('.exploded-stage')).toHaveCSS(
    'position',
    'relative',
  );
  await context.close();
});
