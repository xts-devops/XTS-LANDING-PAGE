# Cold-load and interaction audit — 2026-10-26

The hero now says **Technology. Made to work.** Supporting copy covers business systems, custom software, automation and robotics, with broader brand-intro language.

## Changes

- Hero monitor/laptop content originally stayed at scale zero until the shared JavaScript bundle and ResizeObserver fitted it. CSS now scales and positions the original HTML/SVG display planes using the photo container size. An early inline ResizeObserver handles browsers without typed CSS arithmetic and continues tracking their resizes. The shared observer skips these already-managed planes. No replacement raster asset, extra image download, resolution reduction or font change.
- The initial minified page module shrinks from52,238 to34,643 bytes (33.7%). Disabled/absent contact forms do not download their validation/schema module. Configured forms still initialize validation, verified with local-only intercepted fixtures; no test inquiry was sent.
- Remaining photo-plane fitting batches every measurement before style writes, avoiding repeated read/write alternation.
- Industry preview open/close events now supply the open state expected by the motion engine. The consumer also tolerates legacy plain events. Lenis detaches its ticker while a dialog is open or the document is hidden and restores it afterwards; cleanup removes its listeners.
- Keep the approved finite brand intro, transitions, photographic sources, screen captures and native HD/mobile videos. Existing offscreen pauses, reduced motion, responsive images, muted viewport playback and bounded upcoming-clip buffering remain.

The CSS approach follows [container-relative units](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries). The sizing feature check retains the existing JavaScript path on older engines.

## Measurements

Fresh Chromium contexts,375/1440 ×900, cache disabled,40ms latency,10Mbps download and4× CPU slowdown. Each page is loaded directly before the scripted scroll. The isolated final run covers all seven actual routes with successful responses; the initial mistaken /work probe is excluded (/work is a homepage section, not a page). Raw measurements: performance/2026-10-26.json.

These are single-run local diagnostics, not production field scores or a claim that every timing improved. The main-module byte reduction and removal of the hero JavaScript mounting dependency are deterministic; painting, image decode and font/layout timings vary by device and run.

| Route | Width | Before LCP ms | After LCP ms | After CLS |
| --- | --- | --- | --- | --- |
| / | 375 | 1516 | 1284 | 0 |
| /services/business-systems | 375 | 836 | 848 | 0 |
| /services/custom-software | 375 | 968 | 1008 | 0 |
| /services/automation | 375 | 1344 | 1148 | 0 |
| /services/robotics | 375 | 968 | 916 | 0 |
| /terms | 375 | — | 560 | 0 |
| /privacy | 375 | 716 | 572 | 0 |
| / | 1440 | 1892 | 1548 | 0 |
| /services/business-systems | 1440 | 1016 | 768 | 0 |
| /services/custom-software | 1440 | 1172 | 1244 | 0 |
| /services/automation | 1440 | 1120 | 924 | 0 |
| /services/robotics | 1440 | 1160 | 644 | 0 |
| /terms | 1440 | — | 520 | 0 |
| /privacy | 1440 | 640 | 484 | 0 |

All14 final route/viewport samples recorded zero page errors, zero horizontal overflow, zero observed layout shift and no MP4 request during the entry/quick-scroll measurement. Intentional film playback is separately covered by the journey tests. The small LCP increases on the custom-software route are retained in the table rather than omitted. Tracing the automation page showed initial layout/style/module work; no media quality was reduced to mask it.

## Verification

284 distinct e2e checks verified across the full regression and focused runs. Coverage includes hero crop/planes, JavaScript-disabled first paint at375/768/1440/2048, legacy sizing with blocked modules, enabled/disabled forms, modal background locking, all routes, keyboard/no-JS/reduced motion, six-second slideshows, previews, cinematic chapter continuation, stock/dispatch workflows and the70KB gzipped site JavaScript budget. Source PNG/photo/video files remain unchanged.

Reviewed Chromium hero captures at375/768/1440/2048 and WebKit sizing/first-paint smoke checks. Windows WebKit does not project the existing homogeneous CSS matrix identically to Chromium; this is not claimed as real-device Safari pixel certification. The original HTML/SVG planes are retained, avoiding a foreignObject rendering regression discovered during this audit.

Logs, trace, isolated profiles and review captures are in docs/review/performance (gitignored). Production output is rebuilt for localhost4380; the final commit is published to xts-devops/XTS-LANDING-PAGE main and the existing origin PR #12. Public hosting is not configured by this repository operation, and no DNS or hosting-provider settings are changed.

Final npm run verify completed with zero errors, warnings or hints; formatting, lint and the seven-page production build pass.
