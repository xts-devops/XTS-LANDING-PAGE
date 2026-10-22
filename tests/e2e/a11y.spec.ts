import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * axe-core WCAG 2.2 AA scan. Fails on `serious` / `critical`; lists `minor` / `moderate`
 * as annotations in the report so they get fixed at G2 without blocking drafts.
 */
for (const width of [375, 1440] as const) {
  test(`axe: no serious or critical violations at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const { violations } = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22aa',
        'best-practice',
      ])
      .analyze();

    const describe = (v: (typeof violations)[number]) =>
      `${v.impact} · ${v.id}: ${v.help} (${v.nodes.length}×) — ${v.nodes
        .slice(0, 3)
        .map((n) => n.target.join(' '))
        .join(' | ')}`;

    const blocking = violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    for (const v of violations.filter((v) => !blocking.includes(v))) {
      testInfo.annotations.push({
        type: 'a11y (non-blocking)',
        description: describe(v),
      });
    }
    expect(blocking.map(describe)).toEqual([]);
  });
}
