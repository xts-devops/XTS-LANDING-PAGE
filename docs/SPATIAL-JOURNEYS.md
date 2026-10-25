# Property and hotel journeys — production plan and player prototype

## Current status

The native-video player, chapter navigation, concept covers and route plans are ready for design review. Actual walkthrough films have not been generated or supplied. The two clearly labelled prototypes are deliberately unlinked from the current marketing cards; the existing property and hotel samples continue to work. Do not describe these concept covers as walking footage, a 360 tour, a construction timelapse or an actual property listing.

Review locally:
- /demos/tours/property.html
- /demos/tours/hotel.html

The user's Higgsfield prohibition (D31) is still active. An asynchronous question is pending: use supplied footage, or explicitly re-enable Higgsfield with a credit-cost preflight. No Higgsfield discovery, balance/cost query, generation or processing has been performed for this task. No actual-video quality or final media weight is claimed yet.

## Route and camera continuity

Use a fictional waterfront residential tower, rather than implying XTS delivered a famous landmark. The property route is approximately 24 seconds in four six-second chapters:
1. **Build to opening:** locked-camera timelapse, maintaining tower silhouette, footprint, coastline and approach.
2. **Landscape and arrival:** human-eye approach along a clear stone path, reflecting pool on the left, ending just inside the bronze canopy/entrance threshold.
3. **Lobby and lift:** repeat the same entrance fins and limestone floor; follow an unobstructed route through the lobby to the right lift bank.
4. **Residence and view:** a deliberate matched-door editorial cut bridges lift travel to the guest floor; move through one residence doorway into the living space and waterfront view. Do not simulate travelling through walls or an implausibly instantaneous lift ride.

The hotel route is a shorter approximately 12-second experience in two six-second chapters:
1. **Lobby and arrival:** entrance to limestone reception, oak fins and courtyard tree, turning right toward the bronze lifts.
2. **Suite and terrace:** a matched-door cut leads from the guest corridor through one room door, then reveals the suite and terrace. Reuse materials, lighting and door orientation from the lobby concept.

These are planned durations, not generated film metadata. Selectable chapters communicate location and route rather than forcing a timed slideshow. Every source clip must be reviewed for consistent door/window placement, walking line, floor level, skyline direction and daylight. Exact surveyed geometry for a real listing would require the actual property's footage or model; these generated concepts do not establish a real floor plan.

Full shot descriptions, continuity anchors and expected filenames: [routes.json](../showcase-ui/tours/routes.json). Two generated concept covers and complete prompts/source paths: [journey-covers.json](media-v2/journey-covers.json). Original PNGs remain outside runtime; WebP exports are local.

## Player and loading behavior

Source: showcase-ui/tours/generate.mjs, player.js, player.css and routes.json. Run node showcase-ui/tours/generate.mjs to refresh the matching source/public prototype pages and static runtime copies. The generator publishes a playable source only when the configured local MP4 exists and has content; missing film URLs do not create browser requests.

One muted, playsinline video element owns playback. There is no video source or download on page entry. Fine-pointer hover waits 250ms and starts a finite route only when every required chapter has real media; touch and keyboard use explicit Play. Manual chapter/arrow selection overrides the route. The player supports pause/resume, finite end/replay, keyboard arrows/space, expanded native fullscreen and a visible route/current-chapter description. Native timeupdate events drive progress; no per-frame JS loop or extra animation library.

Only the current clip loads, with preload=none before intent. The concept cover remains while the first frame prepares; playback reveals the video once ready. Waiting/error states retain a useful cover and route controls. Leaving a hover preview, going offscreen, hiding the document or changing motion preference pauses and releases the source; stale async loads cannot restart it. Explicit playback is not stopped merely because the pointer moves toward other controls. Reduced motion suppresses hover autoplay but permits explicit video playback. Future mobile delivery chooses 720p only when it covers the displayed device-pixel width or data saver requests it; otherwise the 1080p master remains available.

This follows [MDN's video element contract](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) and [web.dev's video loading guidance](https://web.dev/articles/lazy-loading-video).

## Footage acceptance and delivery

- Obtain the footage-source choice before any video-generation service use. If Higgsfield is explicitly re-enabled, check the actual model, native output size, per-clip price, total quote and remaining credit balance before generation; no silent retries or upscaling a low-resolution source and calling it native HD. No current price or balance has been assumed.
- Prefer native 1920×1080 or higher source at a consistent 24–30fps. Preserve a full-resolution master; reject geometry morphing, flicker, implausible travel, mismatched interiors, warped furniture, poor door transitions, logos or fabricated signage.
- Deliver silent, faststart MP4/H.264 with a normal playback GOP (approximately 1–2 seconds), rather than the arm's seek-heavy short-GOP encoding. Use a quality-led encode around CRF 20 as a starting point and inspect moving glass, foliage and fine interior detail. Do not force a byte target by visibly damaging the image.
- Export an optional 1280×720 derivative from the same master and timeline for small displays. Retain responsive poster imagery and no eager video downloads. Measure actual transferred bytes, startup, buffering and mobile performance after real clips exist. Current chapter durations and size expectations remain planning targets.
- Publish only when the whole route has coherent approved footage. Wire the existing vista/daybreak hover/fullscreen iframe URLs to the new journey pages after media acceptance, update their poster captures, and rerun end-to-end checks. Existing viewing/reservation systems remain accessible through the player header links. Do not enable unfinished route chapters on production marketing cards.

## Verification scope

Browser tests use the existing local arm clip strictly as an intercepted transport fixture to verify the generic native player. No unrelated clip is shipped under a property/hotel filename or captured as a real estate example. Passing player tests is not approval of architectural footage quality. Real camera continuity, decoder quality, final transfer weight and native iOS playback remain footage/release checks. Review screenshots use concept covers only.

Prototype validation: npm run verify passes with zero errors/warnings/hints. All 10 focused player/prototype checks pass, including 375/768/1440 layout/accessibility, deferred and failed media, finite playback/pause/resume and preference/hover cleanup with a test-only transport fixture. Both desktop designs fit 1440×900; mobile/tablet views scroll normally. Reviewed concept-only screenshots at all three widths. No actual property/hotel film has been supplied, generated, quality-approved or activated on marketing cards.
