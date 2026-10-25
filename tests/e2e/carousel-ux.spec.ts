import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
  for (const slug of ['business-systems', 'custom-software', 'automation']) {
    test(`${slug} controls flank the image without overlap at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/services/' + slug);
      if (slug === 'custom-software')
        await page
          .getByRole('tab', { name: 'Mobile apps', exact: true })
          .click();
      if (slug === 'automation')
        await page
          .getByRole('tab', { name: 'Integrations', exact: true })
          .click();
      const panel = page.getByRole('tabpanel');
      const stage = panel.locator('.slides-stage');
      await stage.scrollIntoViewIfNeeded();
      const bounds = await stage.evaluate((el) => {
        const rect = (s: string) =>
          el.querySelector(s)!.getBoundingClientRect();
        const previous = rect('[data-prev]'),
          next = rect('[data-next]'),
          image = rect('.slide .screen'),
          zoom = rect('[data-screen-open]'),
          progress = rect('[data-slides-progress]');
        return {
          progressLeft: progress.left,
          progressRight: progress.right,
          progressTop: progress.top,
          progressHeight: progress.height,
          previousRight: previous.right,
          nextLeft: next.left,
          imageLeft: image.left,
          imageRight: image.right,
          imageTop: image.top,
          imageBottom: image.bottom,
          zoomBottom: zoom.bottom,
          prevY: previous.y,
          nextY: next.y,
          targetWidth: previous.width,
          centerDifference: Math.abs(
            previous.y + previous.height / 2 - (image.y + image.height / 2),
          ),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      expect(bounds.previousRight).toBeLessThanOrEqual(bounds.imageLeft);
      expect(bounds.nextLeft).toBeGreaterThanOrEqual(bounds.imageRight);
      expect(bounds.zoomBottom).toBeLessThanOrEqual(bounds.imageTop);
      expect(bounds.prevY).toBeGreaterThan(bounds.imageTop);
      expect(bounds.nextY).toBeLessThan(bounds.imageBottom);
      expect(bounds.targetWidth).toBeGreaterThanOrEqual(44);
      expect(bounds.progressTop).toBeGreaterThanOrEqual(bounds.imageBottom);
      expect(Math.abs(bounds.progressLeft - bounds.imageLeft)).toBeLessThan(2);
      expect(Math.abs(bounds.progressRight - bounds.imageRight)).toBeLessThan(
        2,
      );
      expect(bounds.progressHeight).toBeGreaterThanOrEqual(24);
      expect(bounds.overflow).toBe(false);
      expect(bounds.centerDifference).toBeLessThan(4);
    });
  }
}

test('automatic 6s rotation resumes after 6s idle; explicit pause remains stopped', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const start = new Date('2026-10-25T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel'),
    wrap = panel.locator('[data-slides]'),
    count = panel.locator('[data-count-label]');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await expect(panel.locator('.slides-timing')).toHaveCount(0);
  await expect(panel.locator('[data-slides-play], .slides-count')).toHaveCount(
    0,
  );
  await expect(count).toHaveClass('sr-only');
  await page.clock.runFor(5900);
  await expect(count).toHaveText('1 of 6');
  await page.clock.runFor(1100);
  await expect(count).toHaveText('2 of 6');
  await panel.locator('[data-slide-index="5"]').click();
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await page.clock.runFor(5000);
  await expect(count).toHaveText('6 of 6');
  await expect(wrap).toHaveAttribute('data-idle', 'true');
  await page.clock.runFor(2000);
  await expect(count).toHaveText('6 of 6');
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await page.clock.runFor(6000);
  await expect(count).toHaveText('1 of 6');
  await panel
    .getByRole('button', { name: 'Pause slideshow', exact: true })
    .click();
  await page.clock.runFor(7000);
  await expect(count).toHaveText('1 of 6');
  await panel
    .getByRole('button', { name: 'Resume slideshow', exact: true })
    .click();
  await page.clock.runFor(5500);
  await expect(count).toHaveText('2 of 6');
});

test('navigation arrows reset the idle window even with the pointer left on them', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const start = new Date('2026-10-25T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel'),
    count = panel.locator('[data-count-label]');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await panel.locator('[data-next]').click();
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await page.clock.runFor(4000);
  await expect(count).toHaveText('2 of 6');
  await panel.locator('[data-next]').click();
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await page.clock.runFor(4000);
  await expect(count).toHaveText('3 of 6');
  await page.clock.runFor(9000);
  await expect(count).toHaveText('4 of 6');
});

test('reduced motion disables rotation; keyboard focus suspends it until focus leaves', async ({
  page,
}) => {
  await page.goto('/services/business-systems');
  const panel = page.getByRole('tabpanel'),
    wrap = panel.locator('[data-slides]');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'false');
  await expect(panel.locator('[data-slides-progress]')).toBeDisabled();
  await expect(panel.locator('.slides-progress-fill')).toHaveCSS(
    'animation-name',
    'none',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await panel.locator('[data-slides-track]').focus();
  await expect(wrap).toHaveAttribute('data-paused', 'true');
  await page.locator('h1').click();
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(wrap).toHaveAttribute('data-rotating', 'false');
  await expect(panel.locator('[data-slides-progress]')).toBeDisabled();
});

test('hidden panels and offscreen carousels do not rotate', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/business-systems');
  const erp = page.locator('#system-erp [data-slides]');
  await expect(erp).toHaveAttribute('data-rotating', 'false');
  await page.locator('#system-erp .slides-stage').scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(erp).toHaveAttribute('data-rotating', 'true');
  await page.getByRole('tab', { name: 'POS', exact: true }).click();
  await expect(erp).toHaveAttribute('data-rotating', 'false');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('#system-pos [data-slides]')).toHaveAttribute(
    'data-rotating',
    'false',
  );
});

test('POS and market concepts load photographic product thumbnails', async ({
  page,
}) => {
  await page.goto('/demos/morrow.html');
  const photos = page.locator('.product-art img');
  await expect(photos).toHaveCount(6);
  for (const photo of await photos.all())
    expect(
      await photo.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBe(480);
  await page.goto('/services/business-systems');
  await page.getByRole('tab', { name: 'POS', exact: true }).click();
  await page.locator('#system-pos [data-screen-open]').first().click();
  await expect(page.locator('[data-screen-dialog]')).toBeVisible();
});

test('single-screen concepts omit redundant navigation and rotation hints', async ({
  page,
}) => {
  await page.goto('/services/custom-software');
  const panel = page.getByRole('tabpanel');
  await expect(panel.locator('.slides-progress')).toHaveCount(0);
  await expect(panel.locator('.slide-picker')).not.toBeVisible();
  await expect(panel.locator('[data-slides-play]')).toHaveCount(0);
  await expect(panel.locator('[data-prev]')).toHaveCount(0);
  await expect(panel.locator('[data-next]')).toHaveCount(0);
  await expect(panel.locator('[data-screen-open]')).toBeVisible();
});

test('POS keeps a six-second cadence through all four views and loops', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const start = new Date('2026-10-25T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(start);
  await page.goto('/services/business-systems#system-pos');
  const panel = page.locator('#system-pos');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(panel.locator('[data-slides]')).toHaveAttribute(
    'data-rotating',
    'true',
  );
  const count = panel.locator('[data-count-label]');
  await expect(panel.locator('.slides-progress-fill')).toHaveCSS(
    'animation-duration',
    '6s',
  );
  await page.clock.runFor(5900);
  await expect(count).toHaveText('1 of 4');
  await page.clock.runFor(600);
  await expect(count).toHaveText('2 of 4');
  for (const expected of ['3 of 4', '4 of 4', '1 of 4']) {
    await page.clock.runFor(6000);
    await expect(count).toHaveText(expected);
  }
});

for (const width of [375, 1440]) {
  test(
    'POS side arrows wrap in both directions at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/services/business-systems#system-pos');
      const panel = page.locator('#system-pos');
      const count = panel.locator('[data-count-label]');
      await panel.locator('[data-prev]').click();
      await expect(count).toHaveText('4 of 4');
      await expect(panel.locator('[data-next]')).toBeEnabled();
      await panel.locator('[data-next]').click();
      await expect(count).toHaveText('1 of 4');
      await expect(panel.locator('[data-prev]')).toBeEnabled();
    },
  );
}

const fillScale = async (fill: import('@playwright/test').Locator) =>
  fill.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);

test('progress line freezes on Pause and resumes its remaining fill without a layout shift', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/business-systems#system-pos');
  const panel = page.locator('#system-pos'),
    control = panel.locator('[data-slides-progress]'),
    fill = control.locator('.slides-progress-fill');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect
    .poll(() => fillScale(fill), { intervals: [50] })
    .toBeGreaterThan(0.2);
  const height = await panel
    .locator('.slides-stage')
    .evaluate((el) => el.getBoundingClientRect().height);
  await control.click();
  await expect(control).toHaveAttribute('aria-label', 'Resume slideshow');
  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await expect(fill).toHaveCSS('animation-play-state', 'paused');
  const frozen = await fillScale(fill);
  await page.waitForTimeout(450);
  expect(await fillScale(fill)).toBeCloseTo(frozen, 2);
  await control.click();
  await expect(control).toHaveAttribute('aria-label', 'Pause slideshow');
  await expect(fill).toHaveCSS('animation-play-state', 'running');
  expect(
    await control.evaluate((el) =>
      parseFloat(el.style.getPropertyValue('--elapsed')),
    ),
  ).toBeGreaterThan(400);
  await expect(panel.locator('[data-count-label]')).toHaveText('2 of 4', {
    timeout: 6300,
  });
  expect(
    await panel
      .locator('.slides-stage')
      .evaluate((el) => el.getBoundingClientRect().height),
  ).toBe(height);
});

test('manual slide changes freeze a reset fill for the reading window, then complete it', async ({
  page,
}) => {
  test.setTimeout(20_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/business-systems#system-pos');
  const panel = page.locator('#system-pos'),
    wrap = panel.locator('[data-slides]'),
    fill = panel.locator('.slides-progress-fill');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect
    .poll(() => fillScale(fill), { intervals: [50] })
    .toBeGreaterThan(0.15);
  await panel.locator('[data-slide-index="1"]').click();
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(panel.locator('[data-count-label]')).toHaveText('2 of 4');
  await expect(fill).toHaveCSS('animation-play-state', 'paused');
  await page.waitForTimeout(600);
  expect(await fillScale(fill)).toBeLessThan(0.02);
  await expect(wrap).toHaveAttribute('data-rotating', 'true', {
    timeout: 7500,
  });
  await expect
    .poll(() => fillScale(fill), { intervals: [50] })
    .toBeGreaterThan(0.1);
  await expect(panel.locator('[data-count-label]')).toHaveText('3 of 4', {
    timeout: 6500,
  });
});

test('reduced motion shows one static segment per view and updates selection', async ({
  page,
}) => {
  await page.goto('/services/business-systems#system-pos');
  const panel = page.locator('#system-pos'),
    control = panel.locator('[data-slides-progress]');
  await expect(control.locator('[data-progress-segment]')).toHaveCount(4);
  await expect(control.locator('[data-current="true"]')).toHaveCount(1);
  await expect(control.locator('[data-current="true"]')).toHaveAttribute(
    'data-progress-segment',
    '',
  );
  await panel.locator('[data-slide-index="3"]').click();
  await expect(
    control.locator('[data-progress-segment]').nth(3),
  ).toHaveAttribute('data-current', 'true');
  await expect(control.locator('.slides-progress-fill')).toHaveCSS(
    'animation-name',
    'none',
  );
  await expect(control).toBeDisabled();
});

test('offscreen progress freezes and returns at the remaining fraction', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services/business-systems#system-pos');
  const panel = page.locator('#system-pos'),
    wrap = panel.locator('[data-slides]'),
    control = panel.locator('[data-slides-progress]'),
    fill = panel.locator('.slides-progress-fill');
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect
    .poll(() => fillScale(fill), { intervals: [50] })
    .toBeGreaterThan(0.2);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect(wrap).toHaveAttribute('data-rotating', 'false');
  await expect(fill).toHaveCSS('animation-play-state', 'paused');
  const frozen = await fillScale(fill);
  await page.waitForTimeout(350);
  expect(await fillScale(fill)).toBeCloseTo(frozen, 2);
  await panel.locator('.slides-stage').scrollIntoViewIfNeeded();
  await expect(wrap).toHaveAttribute('data-rotating', 'true');
  expect(
    await control.evaluate((el) =>
      parseFloat(el.style.getPropertyValue('--elapsed')),
    ),
  ).toBeGreaterThan(400);
  await expect(panel.locator('[data-count-label]')).toHaveText('2 of 4', {
    timeout: 6300,
  });
});

test('the line follows a shorter active frame without changing stage height', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto('/services/business-systems#system-pos');
  const panel = page.locator('#system-pos'),
    stage = panel.locator('.slides-stage');
  const height = await stage.evaluate(
    (el) => el.getBoundingClientRect().height,
  );
  await panel.locator('[data-slide-index="2"]').click();
  await expect(panel.locator('[data-count-label]')).toHaveText('3 of 4');
  const gap = await panel.evaluate(
    (el) =>
      el.querySelector('[data-slides-progress]')!.getBoundingClientRect().top -
      el.querySelector('.slide:not([inert]) .screen')!.getBoundingClientRect()
        .bottom,
  );
  expect(gap).toBeGreaterThanOrEqual(0);
  expect(gap).toBeLessThan(8);
  expect(await stage.evaluate((el) => el.getBoundingClientRect().height)).toBe(
    height,
  );
});
