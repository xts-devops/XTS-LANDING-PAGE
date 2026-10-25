# Hero workspace displays

The hero keeps its approved panorama, headline and responsive layout. The main monitor shows an illustrative operations application: navigation, order-fulfilment modules, a task queue and a connected handover track. The laptop shows a customer-portal design canvas with a mobile layout, component tools and a small style inspector. Content is purpose-named, with no fictional companies, client figures or live-system claims. Both are native SVG, without new raster media, dependencies or external requests.

## Mounting

The same 2400×1400 photograph is the coordinate plane. Active-glass insets preserve the monitor bezel and laptop webcam strip; the existing homography helper maps each SVG to its four measured corners.

| Screen | Top left | Top right | Bottom right | Bottom left | SVG plane |
|---|---|---|---|---|---|
| Monitor | 1402, 514 | 1821, 528 | 1827, 817 | 1418, 844 | 720×460 |
| Laptop | 1171, 738 | 1374, 728 | 1419, 915 | 1219, 941 | 512×440 |

The previous equally specific shared phone-mockup styles could win by stylesheet order, applying 34px corners and a tint/filter to both screens. Hero-scoped selectors now explicitly set the monitor to square corners and laptop to 3px native-plane corners, with no filter and a restrained glass reflection. Shared phone styles are unchanged. The photo figure isolates its image and vector layers, with the picture at z-index 0 and fitted workspace at 1; this also prevents the desktop 3D projection from obscuring the photograph. The shared object-position fitter and whole-figure mobile zoom are unchanged.

## Motion and fallback

A quiet scan travels along the monitor's handover track; a soft selection outline accents the laptop design canvas. Only transform/opacity animate. The existing visible-photo/tab-visibility controller and Pause/Resume button manage both loops. Reduced motion keeps a static presentation and hides the unnecessary toggle. No JS retains the original photograph. Tablet copy and photo remain in separate rows through 1023px.

## Review

No Higgsfield tools were called. D31 records the user's prohibition for future work. Local source crops were made only for measuring the photographed glass; they are gitignored diagnostic artifacts, not replacement photos.

The focused suite passes all 38 checks, including screen registration and corner/filter regression checks at 375/768/1440/2048, pause/resume/offscreen/reduced-motion behavior, intro failure paths, existing phone overlays, accessibility and the 70KB motion JS budget. npm run verify passes with zero errors/warnings. Final full-view stills, bezel closeups and a normal-motion recording are in docs/review/workspace-mount (gitignored).

Three final mobile homepage Lighthouse runs: Performance 97/96/96, Accessibility 100, LCP 1.90–1.96s, CLS 0 and TBT 50–67ms. No fresh robotics-page performance result is claimed for this hero-only correction.
