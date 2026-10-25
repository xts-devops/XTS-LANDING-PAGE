# Product preview controls

The service showcase uses a shared layout across business systems, custom software and automation. Navigation arrows sit in dedicated rails at the image's sides, with 44-pixel minimum targets and no screenshot overlap. The full-screen action and caption sit above the image. Named screen pickers use a single horizontally scrollable row to keep the stage close to its context. Single-screen concepts omit redundant navigation and rotation hints.

## Rotation

Multi-screen previews start automatically and advance every 3 seconds, including transition time. A stable deadline prevents scroll and resize events from stretching the cadence. Automatic playback and both side arrows loop between the last and first views. The large Play/Pause text block and visible cadence label are removed. Named views share a compact row with the count and a 44px icon-only Pause/Resume control; that control keeps accessible labels and a tooltip. Single-screen concepts omit the whole row.

Pointer navigation, view selection, drag/swipe and wheel interaction override rotation for 6 seconds after the last manual movement settles. Repeated interaction resets that window rather than queuing advances. Resting the pointer on an arrow does not prevent resumption. Keyboard focus-visible within the carousel suspends rotation until focus leaves; pointer focus on a navigation button does not permanently stop it. The compact Pause control is an explicit persistent stop and only Resume clears that choice.

One timeout per eligible carousel is cancelled when offscreen, in a hidden panel/document, while dragging, while keyboard-focused or behind an open inspector. Returning starts a fresh viewing interval rather than catching up. The inspector's existing focus return, native swipe and keyboard paging remain. Automatic updates keep the count's live region quiet; manual navigation uses polite announcements. Inactive slides remain inert.

Reduced motion suppresses autoplay and hides the unnecessary rotation icon, while manual arrows/pickers remain usable with instant paging. Returning to normal motion respects any explicit persistent Pause choice. No-JS visitors retain native scrolling and no inert enhancement controls. D32 records this user-requested change to D26's former persistent stop after manual navigation.

This is limited to the user-requested service preview galleries. The homepage gallery retains manual controls. The industry overview cards now follow the explicit finite hover/tap preview behavior documented in INDUSTRY-DEMOS.md.

## Product media

The fictional coffee shop POS uses nine generated photographic product thumbnails. coffee/grocery system uses six matching coffee/market photographs, including rice, fruit and greens. Small local 480×480 WebP exports replace symbols. Products fit within their image area rather than being clipped. Sources, exact generation prompts and export paths are in [product-sources.json](media-v2/product-sources.json), with per-file records in [IMAGE-BRIEF-v2.md](IMAGE-BRIEF-v2.md). They are illustrative catalogue photographs, not XTS client products.

## Guidance and validation

[W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) and [W3C animation controls](https://www.w3.org/WAI/tutorials/carousels/animations/) informed the focus, pause and reading-order behavior.

Check 375/768/1440 layouts, navigation geometry, 3-second timing, looping, 6-second idle/reset behavior, persistent pause/resume, keyboard/reduced motion, hidden panels, product asset loading and the full-screen inspector. Capture all 40 sample screens with `npm run capture:ui`, then run `npm run verify` and the browser suite. Review artifacts remain gitignored under `docs/review/carousel-ux`.

Current revision validation: npm run verify passes with zero errors/warnings/hints. All 41 focused carousel, service-experience, UI-refinement and motion checks pass. POS regressions cover the complete four-view three-second cycle and cyclic side arrows at 375/1440. Existing checks preserve 6s inactivity resumption, repeated-input reset, explicit Pause, keyboard/reduced motion, image-side geometry and inspection/navigation. Real-time label-change measurements no longer accumulate smooth-transition drift. Reviewed 375/768/1440 captures and timing logs are in docs/review/slideshow-cadence (gitignored).
