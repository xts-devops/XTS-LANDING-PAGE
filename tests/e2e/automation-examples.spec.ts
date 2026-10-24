import { expect, test } from '@playwright/test';
const cases = [
  {
    id: 'support',
    actions: [
      'support-classify',
      'support-draft',
      'support-approve',
      'support-handoff',
    ],
    result: '[data-support-result]',
    message: 'Sample handoff created',
  },
  {
    id: 'documents',
    actions: ['doc-index', 'doc-extract', 'doc-review', 'doc-sync'],
    result: '[data-doc-result]',
    message: 'No accounting API was contacted',
  },
  {
    id: 'factory',
    actions: ['factory-read', 'factory-sync', 'factory-alert'],
    result: '[data-factory-result]',
    message: 'No equipment was controlled',
  },
];
for (const demo of cases)
  test(`${demo.id} actions produce a bounded sample result without external requests`, async ({
    page,
  }) => {
    const outgoing: string[] = [];
    page.on('request', (request) => {
      if (!request.url().startsWith('http://127.0.0.1:4380/'))
        outgoing.push(request.url());
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/demos/' + demo.id + '.html');
    for (const action of demo.actions)
      await page.locator(`[data-${action}]`).click();
    await expect(page.locator(demo.result)).toContainText(demo.message);
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight),
    ).toBeLessThanOrEqual(900);
    expect(outgoing).toEqual([]);
    if (demo.id === 'support')
      await expect(page.locator('[data-support-draft-text]')).toContainText(
        'Thanks for getting in touch',
      );
    if (demo.id === 'documents')
      await expect(page.locator('[data-doc-index-value]')).toContainText(
        'Invoice',
      );
  });
test('document posting requires extracted fields and explicit review', async ({
  page,
}) => {
  await page.goto('/demos/documents.html');
  await expect(page.locator('[data-doc-review]')).toBeDisabled();
  await expect(page.locator('[data-doc-sync]')).toBeDisabled();
  await page.locator('[data-doc-extract]').click();
  await expect(page.locator('[data-doc-sync]')).toBeDisabled();
  await page.locator('[data-doc-review]').click();
  await expect(page.locator('[data-doc-sync]')).toBeEnabled();
});
test('automation offers software, hardware and existing integration views', async ({
  page,
}) => {
  await page.goto('/services/automation');
  for (const tab of [
    'Replies & BPO',
    'Email & documents',
    'Factory & IoT',
    'Integrations',
    'Operations dashboards',
  ])
    await expect(
      page.getByRole('tab', { name: tab, exact: true }),
    ).toBeVisible();
  await expect(page.locator('#industry-demos .industry-card')).toHaveCount(4);
  await expect(
    page.getByRole('heading', {
      name: 'Factory & hardware integration',
      exact: true,
    }),
  ).toBeVisible();
});
