import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';

async function mediaFixture(page: Page, fail = false) {
  // Test transport only: the existing arm clip is never published as property footage.
  await page.route('**/demos/media/tours/fixture-*.mp4', async (route) => {
    if (fail) await route.abort();
    else
      await route.fulfill({
        path: path.resolve('src/assets/video/arm-exploded.mp4'),
        contentType: 'video/mp4',
      });
  });
  await page.route('**/demos/tours/property.html', async (route) => {
    const response = await route.fetch();
    const html = (await response.text()).replace(
      /(<script[^>]*data-journey-config[^>]*>)([\s\S]*?)(<\/script>)/,
      (_, before, json, after) => {
        const config = JSON.parse(json);
        config.chapters.forEach(
          (chapter: { src: string; mobileSrc: string }, i: number) => {
            chapter.src = '/demos/media/tours/fixture-' + i + '.mp4';
            chapter.mobileSrc = chapter.src;
          },
        );
        return before + JSON.stringify(config) + after;
      },
    );
    await route.fulfill({ response, body: html });
  });
}

for (const width of [375, 768, 1440])
  for (const id of ['property', 'hotel']) {
    test(`${id} journey is ready and defers video until intent at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const requests: string[] = [];
      page.on('request', (r) => {
        if (r.url().endsWith('.mp4')) requests.push(r.url());
      });
      await page.goto('/demos/tours/' + id + '.html');
      const buttons = page.locator('[data-tour-chapter]');
      await expect(buttons).toHaveCount(id === 'property' ? 4 : 2);
      await expect(page.locator('.journey-badge')).toContainText(
        'Generated architectural concept',
      );
      await expect(page.locator('[data-tour-play]')).toBeEnabled();
      await buttons.last().click();
      await expect(buttons.last()).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('[data-tour-status]')).toContainText(
        'Selected',
      );
      await expect(page.locator('[data-journey-video]')).not.toHaveAttribute(
        'src',
      );
      expect(requests).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      const image = page.locator('.tour-cover');
      expect(
        await image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth === 1600,
        ),
      ).toBe(true);
      expect(
        (await new AxeBuilder({ page }).analyze()).violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical',
        ),
      ).toEqual([]);
    });
  }

test('native journey loads on demand, pauses, and completes a finite four-chapter route', async ({
  page,
}) => {
  await mediaFixture(page);
  await page.goto('/demos/tours/property.html');
  const video = page.locator('[data-journey-video]'),
    root = page.locator('[data-journey]'),
    play = page.locator('[data-tour-play]');
  await expect(video).not.toHaveAttribute('src');
  await play.click();
  await expect(root).toHaveAttribute('data-state', 'playing');
  await expect(root).toHaveAttribute('data-frame', 'true');
  await expect(page.locator('[data-tour-quality]')).toHaveText('1080p');
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime))
    .toBeGreaterThan(0.1);
  await play.click();
  await expect(root).toHaveAttribute('data-state', 'paused');
  const time = await video.evaluate((el: HTMLVideoElement) => el.currentTime);
  await page.waitForTimeout(200);
  expect(
    await video.evaluate((el: HTMLVideoElement) => el.currentTime),
  ).toBeCloseTo(time, 1);
  await play.click();
  for (let i = 0; i < 4; i++) {
    await expect(video).toHaveAttribute(
      'src',
      '/demos/media/tours/fixture-' + i + '.mp4',
    );
    await expect(root).toHaveAttribute('data-state', 'playing');
    await video.evaluate((el: HTMLVideoElement) => {
      el.playbackRate = 8;
    });
    if (i < 3)
      await expect(video).toHaveAttribute(
        'src',
        '/demos/media/tours/fixture-' + (i + 1) + '.mp4',
      );
  }
  await expect(root).toHaveAttribute('data-state', 'complete');
  await expect(play).toHaveText('Replay journey');
});

test('hover preview is muted and releases media on exit; reduced motion avoids hover playback', async ({
  page,
}) => {
  await mediaFixture(page);
  await page.goto('/demos/tours/property.html');
  const stage = page.locator('[data-tour-stage]'),
    video = page.locator('video');
  await stage.hover();
  await expect(video).not.toHaveAttribute('src');
  await page.mouse.move(0, 0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await stage.hover();
  await expect(page.locator('[data-journey]')).toHaveAttribute(
    'data-state',
    'playing',
  );
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(true);
  await page.mouse.move(0, 0);
  await expect(video).not.toHaveAttribute('src');
  await expect(page.locator('[data-journey]')).toHaveAttribute(
    'data-frame',
    'false',
  );
});

test('failed media retains the concept cover and keyboard chapter controls', async ({
  page,
}) => {
  await mediaFixture(page, true);
  await page.goto('/demos/tours/property.html');
  await page.locator('[data-tour-play]').click();
  await expect(page.locator('[data-journey]')).toHaveAttribute(
    'data-state',
    'error',
  );
  await expect(page.locator('[data-tour-status]')).toContainText(
    'could not load',
  );
  await expect(page.locator('video')).not.toHaveAttribute('src');
  await page.locator('[data-tour-stage]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-tour-chapter="1"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('live reduced motion releases active media instead of restarting it', async ({
  page,
}) => {
  await mediaFixture(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/demos/tours/property.html');
  await page.locator('[data-tour-play]').click();
  await expect(page.locator('[data-journey]')).toHaveAttribute(
    'data-state',
    'playing',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('video')).not.toHaveAttribute('src');
  await expect(page.locator('[data-journey]')).toHaveAttribute(
    'data-state',
    'paused',
  );
});

for (const id of ['property', 'hotel'])
  test(`${id} actual HD journey decodes and manual chapter stops the route`, async ({
    page,
  }) => {
    await page.goto('/demos/tours/' + id + '.html');
    const root = page.locator('[data-journey]'),
      video = page.locator('video');
    await page.locator('[data-tour-play]').click();
    await expect(root).toHaveAttribute('data-state', 'playing');
    await expect(video).toHaveJSProperty('videoWidth', 1920);
    await expect(video).toHaveJSProperty('videoHeight', 1080);
    await expect(video).toHaveJSProperty('muted', true);
    await page.locator('[data-tour-chapter]').last().click();
    await expect(root).toHaveAttribute('data-state', 'playing');
    await video.evaluate((el: HTMLVideoElement) => {
      el.playbackRate = 8;
    });
    await expect(root).toHaveAttribute('data-state', 'complete');
    await expect(page.locator('[data-tour-chapter]').last()).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

test('mobile uses 720p without cropping the architecture or overlapping playback controls', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4380/demos/tours/hotel.html');
  await page.locator('[data-tour-play]').click();
  await expect(page.locator('video')).toHaveAttribute('src', /-720.mp4$/);
  await expect(page.locator('video')).toHaveJSProperty('videoWidth', 1280);
  const media = await page.locator('video').boundingBox(),
    controls = await page.locator('.tour-controls').boundingBox();
  expect(controls!.y).toBeGreaterThan(media!.y + media!.height);
  expect(Math.abs(media!.width / media!.height - 16 / 9)).toBeLessThan(0.01);
  await context.close();
});

for (const width of [375, 1440])
  test(`expanded property journey has usable chapters and Escape returns focus at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const requests: string[] = [];
    page.on('request', (r) => {
      if (r.url().endsWith('.mp4')) requests.push(r.url());
    });
    await page.goto('/services/custom-software');
    const button = page.locator('[data-overview="vista"] [data-overview-open]');
    await button.click();
    const dialog = page.locator('[data-overview-dialog]');
    const frame = dialog.frameLocator('iframe');
    await expect(frame.locator('[data-tour-play]')).toBeEnabled();
    await expect(
      page.locator('[data-overview-expanded-live]'),
    ).toHaveJSProperty('inert', false);
    expect(requests).toEqual([]);
    await frame.locator('[data-tour-chapter="2"]').click();
    await frame.locator('[data-tour-play]').click();
    await expect(frame.locator('[data-journey]')).toHaveAttribute(
      'data-state',
      'playing',
    );
    await expect(frame.locator('[data-tour-play]')).toHaveText('Pause journey');
    expect(requests.length).toBe(1);
    await frame.locator('[data-tour-play]').focus();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(button).toBeFocused();
    await expect(page.locator('[data-overview] iframe')).toHaveCount(0);
  });

test('data saver suppresses automatic tour requests while keeping explicit playback', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: true },
      configurable: true,
    });
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const requests: string[] = [];
  page.on('request', (r) => {
    if (r.url().endsWith('.mp4')) requests.push(r.url());
  });
  await page.goto('/services/custom-software');
  const card = page.locator('[data-overview="daybreak"]');
  await card.locator('[data-overview-stage]').hover();
  await page.waitForTimeout(400);
  await expect(card.locator('iframe')).toHaveCount(0);
  await card.locator('[data-overview-open]').click();
  const frame = page.locator('[data-overview-dialog]').frameLocator('iframe');
  await expect(frame.locator('[data-tour-play]')).toBeEnabled();
  expect(requests).toEqual([]);
  await frame.locator('[data-tour-play]').click();
  await expect(frame.locator('video')).toHaveAttribute('src', /-720.mp4$/);
  await expect(frame.locator('[data-journey]')).toHaveAttribute(
    'data-state',
    'playing',
  );
});
