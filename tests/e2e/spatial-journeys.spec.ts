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
    test(`${id} route prototype is clear and does not request missing video at ${width}`, async ({
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
        'footage pending',
      );
      await expect(page.locator('[data-tour-play]')).toBeDisabled();
      await buttons.last().click();
      await expect(buttons.last()).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('[data-tour-status]')).toContainText(
        'Concept cover only',
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
