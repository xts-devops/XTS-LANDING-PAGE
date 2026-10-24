import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(
  await readFile(path.join(root, 'showcase-ui/manifest.json'), 'utf8'),
);
const contract = JSON.parse(
  await readFile(path.join(root, 'showcase-ui/screen-contract.json'), 'utf8'),
);
if (
  manifest.length !== 33 ||
  new Set(manifest.map((s) => s.key)).size !== 33 ||
  contract.some((k) => !manifest.some((s) => s.key === k))
)
  throw Error('The 33-screen filename contract is incomplete');
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
    const relative =
      pathname === '/' ? 'showcase-ui/index.html' : pathname.slice(1);
    if (
      !relative.startsWith('showcase-ui/') &&
      !relative.startsWith('src/assets/showcase/')
    ) {
      res.writeHead(404).end();
      return;
    }
    const filename = path.resolve(root, relative);
    if (!filename.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    const data = await readFile(filename);
    res.setHeader(
      'Content-Type',
      {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.png': 'image/png',
        '.json': 'application/json',
      }[path.extname(filename)] || 'application/octet-stream',
    );
    res.end(data);
  } catch {
    res.writeHead(404).end('Not found');
  }
});
const serving = process.argv.includes('--serve');
await new Promise((resolve) =>
  server.listen(serving ? 4382 : 0, '127.0.0.1', resolve),
);
const url = `http://127.0.0.1:${server.address().port}`;
if (serving) {
  console.log(`Showcase contact sheet: ${url}`);
} else {
  let browser;
  const failures = [];
  try {
    browser = await chromium.launch(
      process.env.PLAYWRIGHT_CHANNEL
        ? { channel: process.env.PLAYWRIGHT_CHANNEL }
        : {},
    );
    for (const screen of manifest) {
      const context = await browser.newContext({
        viewport: { width: screen.width, height: screen.height },
        deviceScaleFactor: 2,
        locale: 'en-PH',
        timezoneId: 'Asia/Manila',
        colorScheme: 'light',
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      const response = await page.goto(
        `${url}/showcase-ui/${screen.key}.html`,
        { waitUntil: 'networkidle' },
      );
      if (!response?.ok()) throw Error(`Missing HTML: ${screen.key}`);
      await page.evaluate(() => document.fonts.ready);
      const bounds = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
      }));
      if (bounds.width > screen.width || bounds.height > screen.height)
        failures.push(
          screen.key + ' viewport overflow: ' + JSON.stringify(bounds),
        );
      const mobileBottom = await page
        .locator('.mobile-body')
        .evaluateAll((es) => es[0]?.getBoundingClientRect().bottom ?? 0);
      if (mobileBottom > 770)
        failures.push(
          screen.key + ' mobile content overlaps navigation: ' + mobileBottom,
        );
      if (errors.length) throw Error(`${screen.key}: ${errors.join('; ')}`);
      const output = path.join(
        root,
        'src/assets/showcase',
        screen.key + '.png',
      );
      await mkdir(path.dirname(output), { recursive: true });
      await page.screenshot({ path: output, animations: 'disabled' });
      await context.close();
      console.log(
        `Captured ${screen.key} (${screen.width * 2}×${screen.height * 2})`,
      );
    }
    if (failures.length) throw Error(failures.join('\n'));
    console.log('All 33 screens captured at DPR 2.');
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
}
