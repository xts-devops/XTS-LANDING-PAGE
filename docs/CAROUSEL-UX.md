# Product preview controls

The service showcase uses a shared layout across business systems, custom software and automation. Navigation arrows sit in dedicated rails at the image's sides, with 44-pixel minimum targets and no screenshot overlap. The full-screen action and caption sit above the image. Named screen pickers use a single horizontally scrollable row to keep the stage close to its context. Single-screen concepts omit redundant navigation and rotation hints.

## Rotation and progress control

Multi-screen previews advance automatically on a stable 6-second deadline, including transition time. Side arrows and named-view buttons loop between first and last views. The round playback icon and visible count are removed. A visually hidden, atomic live region reports positions as “4 of 6”; automatic rotation keeps it quiet and manual navigation announces politely.

A faint 2px track sits directly below the image, spanning the frame width (including the narrower phone frame). Its gold fill uses a CSS scaleX animation with left origin and duration from --interval. Each slide change restarts at zero. The entire track is a 24px-high button with a visible focus ring, aria-pressed and Pause slideshow / Resume slideshow labels and native tooltips. Explicit Pause freezes and slightly dims the fill until Resume. Single-slide systems have no line or redundant navigation; the height is reserved in CSS before the controller boots.

Manual pointer/picker/swipe/wheel input freezes the fill for 6 seconds after the final movement settles; repeated input renews the reading window. A newly selected slide starts from zero. Once the grace expires, the fill continues over its remaining interval, then advances. Therefore selecting another slide gives 6 seconds of grace plus its full 6-second fill; interacting without changing views preserves the partially elapsed fill. Explicit Resume clears the reading grace and continues the remaining fill immediately. Resting the pointer on an arrow does not prevent resumption.

Keyboard focus-visible inside the carousel, dragging, hidden/offscreen panels/documents and open inspectors freeze the current fill and cancel the advance timer. Returning resumes the remaining time without catch-up jumps. Explicit activation of Resume allows playback while that control retains focus. The native swipe/keyboard paths and inspector focus return remain; inactive slides stay inert.

The controller tracks remaining milliseconds whenever activity changes, derives a new advanceAt only on resumption, and keeps it stable through scroll/resize updates. CSS owns all animation frames. An event-driven class restart with a negative elapsed delay restores the matching fill after resumption or hidden-panel display changes; no per-frame progress JS or animation loop. One timeout handles the next advance or grace expiry. An event-driven frame-offset measurement on slide selection/resize positions the control below shorter active screenshots while keeping the reserved stage height stable. Existing scroll-event coalescing remains separate from progress rendering.

Reduced motion disables rotation and replaces the animated fill with one static segment per slide, highlighting the current segment. The line remains visually present at the same reserved height but its pause button is disabled because no rotation occurs. Manual arrows/pickers use instant paging. Returning to normal motion respects an explicit Pause choice. No-JS visitors retain native scrolling and image links without inert controls. D35 updates the earlier D32 icon/count direction and defines remaining-time resumption.

This change applies to service preview galleries only. The homepage gallery retains manual controls; industry overview cards retain their finite hover/fullscreen workflow behavior described in INDUSTRY-DEMOS.md.

## Product media

The fictional coffee shop POS uses nine generated photographic product thumbnails. coffee/grocery system uses six matching coffee/market photographs, including rice, fruit and greens. Small local 480×480 WebP exports replace symbols. Products fit within their image area rather than being clipped. Sources, exact generation prompts and export paths are in [product-sources.json](media-v2/product-sources.json), with per-file records in [IMAGE-BRIEF-v2.md](IMAGE-BRIEF-v2.md). They are illustrative catalogue photographs, not XTS client products.

## Guidance and validation

[W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) and [W3C animation controls](https://www.w3.org/WAI/tutorials/carousels/animations/) informed the focus, pause and reading-order behavior.

Check 375/768/1440 layouts, navigation geometry, 6-second timing, looping, 6-second idle/reset behavior, persistent pause/resume, keyboard/reduced motion, hidden panels, product asset loading and the full-screen inspector. Capture all 40 sample screens with `npm run capture:ui`, then run `npm run verify` and the browser suite. Review artifacts remain gitignored under `docs/review/carousel-ux`.

Current revision validation: npm run verify passes with zero errors/warnings/hints, and all 23 carousel checks pass at the six-second interval, including the CSS duration, complete POS loop, manual grace, pause/resume, offscreen remaining-time recovery and responsive line placement. Updated captures/logs: docs/review/slideshow-six (gitignored). Prior service/accessibility and motion-budget results are recorded in PROGRESS.md.


## Initiation reliability — 2026-10-25

The active preview starts when it intersects the readable viewport area; a tall frame no longer needs 35% of its entire area visible. Normal vertical wheel/touch page scrolling does not start the manual reading grace. Horizontal wheel/swipe gestures and explicit navigation still freeze/reset the six-second grace; pointer contact itself freezes only while held. Pointer cancellation, lost capture, window blur and visibility changes recover a missing release. Dialog open-state mutations independently suspend/resume rotation, including inspectors opened without a preview event. Six-second intervals, CSS progress/deadline synchronization, explicit Pause, keyboard-focus suspension and reduced-motion behavior remain.

Native scroll-end finalizes active-slide bookkeeping in addition to the event-driven scroll-frame update, so settled smooth transitions do not depend on one pending animation frame. Regression timing separates the mocked deadline from native compositor settling.
