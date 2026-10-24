# Sample system screens

33 standalone HTML/CSS screens with fictional products, businesses and Philippine demonstration data. These are presentation fixtures, not functional business applications or XTS client results.

- `npm run capture:ui` captures every manifest entry at its native viewport and DPR 2 into `src/assets/showcase/`.
- `npm run preview:ui` serves the contact sheet at http://127.0.0.1:4382.
- Install the Playwright Chromium browser with `npx playwright install chromium` if needed. To use an installed browser, set `PLAYWRIGHT_CHANNEL=msedge` (PowerShell: `$env:PLAYWRIGHT_CHANNEL='msedge'`).
- Edit the HTML directly, or update `build-screens.mjs` and run `node showcase-ui/build-screens.mjs` to regenerate all source screens and the contact sheet. Regeneration overwrites manual HTML edits.
- `screen-contract.json` records the 33 exact screen keys in PR #7's `src/content/services.ts`. `manifest.json` adds capture sizes. Desktop: 1440×900; POS checkout/receipt: 1366×1024; warehouse pick list and three software mobile views: 390×844.
- Captures fail on missing pages, JavaScript errors, or viewport overflow. No fonts, images or APIs are fetched from third parties.
- Payroll amounts are illustrative fixtures and do not implement statutory contribution calculations. Receipt preview is explicitly marked as a demonstration receipt.

The contact sheet uses the captured PNGs and links to each full HTML screen.
The featured portal, booking/mobile journey and automation screens now use distinct product layouts from `featured-screens.mjs` and `featured.css`. The other business modules retain their own product themes. All 33 exact screen keys and native capture sizes are unchanged. The website's full-screen inspector loads an original DPR-2 PNG only when opened; normal pages use responsive AVIF previews.
