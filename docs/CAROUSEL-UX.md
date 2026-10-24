# Product preview controls

The service showcase uses a shared layout across business systems, custom software and automation. Navigation arrows sit in dedicated rails at the image's sides, with 44-pixel minimum targets and no screenshot overlap. The full-screen action and caption sit above the image. Named screen pickers use a single horizontally scrollable row to keep the stage close to its context. Single-screen concepts omit redundant navigation and rotation hints.

## Rotation

The user explicitly requested automatic previews on 2026-10-25. Multi-screen service previews advance every 3 seconds while sufficiently visible, then loop without a long backward sweep. One timeout per active carousel is cancelled when offscreen, in a hidden panel, in a hidden document or behind an open dialog. Hover pauses temporarily. Focus, touch, manual arrows and named screen selection stop rotation until Play is explicitly activated. The visible Play/Pause control comes before the view pickers. Keyboard paging, native swipe, screen-reader labels and full-screen focus return remain available.

Reduced motion starts paused, disables smooth paging and stops playback when enabled live. Autoplay does not move keyboard focus; the count uses a quiet live region during rotation and polite announcements during manual navigation. Inactive slides are inert so hidden full-screen buttons are not keyboard stops. No-JS visitors can scroll the screens natively; nonfunctional enhancement controls are hidden.

This is limited to the user-requested service preview galleries. The homepage gallery retains manual controls. The industry overview cards now follow the explicit finite hover/tap preview behavior documented in INDUSTRY-DEMOS.md.

## Product media

The fictional coffee shop POS uses nine generated photographic product thumbnails. coffee/grocery system uses six matching coffee/market photographs, including rice, fruit and greens. Small local 480×480 WebP exports replace symbols. Products fit within their image area rather than being clipped. Sources, exact generation prompts and export paths are in [product-sources.json](media-v2/product-sources.json), with per-file records in [IMAGE-BRIEF-v2.md](IMAGE-BRIEF-v2.md). They are illustrative catalogue photographs, not XTS client products.

## Guidance and validation

[W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) and [W3C animation controls](https://www.w3.org/WAI/tutorials/carousels/animations/) informed the focus, pause and reading-order behavior.

Check 375/768/1440 layouts, navigation geometry, 3-second timing, looping, pause/resume, keyboard/reduced motion, hidden panels, product asset loading and the full-screen inspector. Capture all 40 sample screens with `npm run capture:ui`, then run `npm run verify` and the browser suite. Review artifacts remain gitignored under `docs/review/carousel-ux`.
