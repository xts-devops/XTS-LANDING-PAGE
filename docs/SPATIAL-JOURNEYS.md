# Property and hotel architectural journeys

The property and hotel cards now play generated architectural films on hover and open an interactive, responsive journey viewer. These are fictional architectural concepts, not client projects, real property listings, surveyed floor plans or 360 tours. The original property-viewing and hotel-booking samples remain linked from the standalone journey headers.

Local review:
- /services/custom-software#industry-demos
- /demos/tours/property.html
- /demos/tours/hotel.html

## Footage and credit record

The user explicitly re-enabled Higgsfield for this task after D31, with a cost check first (D37). Preflight balance was 114 credits. Hailuo minimax, six seconds at native1080, was quoted at 10 credits per clip. One arrival pilot was inspected before the remaining five clips. Six completed jobs cost exactly 60 credits; the final checked balance is 54. No paid retries or additional generations were submitted. An ambiguous lobby submission response was reconciled against account history and balance before proceeding; it had not created a job.

All six source clips are native 1920x1080, 24 fps, H.264/yuv420p. Five run 5.875s; construction runs approximately 5.917s. Full prompts, upload/job IDs, original master URLs, selected delivery URLs and byte sizes are recorded in media-v2/journey-generation.json. The five new 1600x900 JPEG reference frames are preserved under media-v2/journey-keyframes; earlier exterior/hotel references are logged in journey-covers.json. Runtime still posters are WebP exports of those frames.

The property film has four chapters: accelerated construction concept, landscape/arrival reveal, double-height lobby/lift bank, and residence/waterfront. The hotel film has two: lobby/reception/lift approach, and suite/terrace. The arrival pilot and interior films have restrained camera movement; descriptions match those reveals rather than promising travel the model did not produce. Deliberate editorial cuts bridge exterior/interior and floor changes. The construction film is an accelerated generated concept, not verified site chronology or engineering evidence. No real landmark or client is implied.

Sampled contact sheets and motion playback are inspected for fixed architecture, consistent materials, clear floor paths and furniture placement. References preserve bronze/limestone for the tower and oak/seafoam for the hotel. These are coherent material/setting concepts, not an assertion of exact measured spatial continuity.

## Delivery and interaction

HD delivery uses lossless video stream copy from the original masters with audio removed and MP4 faststart. Recompressing at CRF20 made larger files, so those HD candidates were discarded in favor of the smaller original-quality streams. HD clips are approximately 2.7-5.4 MB. Optional 1280x720 mobile versions use CRF20, slow preset, yuv420p, a 48-frame GOP and faststart. Only the active clip and at most one upcoming clip load, after playback intent. There is no video request on entry or idle card visibility, full-tour preload, looping playlist or per-frame JavaScript.

Fine-pointer hover waits 250ms and runs one finite journey. Leaving the hover, going offscreen, hiding the document or changing motion preferences releases video resources. Reduced motion and data saver suppress standalone hover. Parent cards also suppress hover under data saver. Explicit playback remains available. At the end the viewer offers Replay; a manual chapter choice plays only the selected chapter and stops. Pause/resume preserves the current position. Native timeupdate events update the current chapter's progress.

The parent sends the actual displayed pixel width with its existing readiness handshake, so a scaled card can use the 720p copy without sacrificing its displayed resolution. Larger expanded views retain the native1080 copy. Standalone mobile pages choose720 only when it covers the stage's device-pixel width, or data saver requests it. Chapter-specific posters remain available during loading/error; stale loads cannot restart after cancellation. Preparation has an 8s timeout.

Expanded tour frames are interactive and responsive, with normal-sized controls and internal scrolling rather than a miniature scaled desktop interface. Mobile retains the entire16:9 architectural frame above the controls. Parent Close and iframe Escape restore focus and release the frame. Other system overviews retain their existing inert fit/actual-size inspection behavior. Reduced motion opens a still chapter view with no video download; users can explicitly play.

Source: showcase-ui/tours/{routes.json,generate.mjs,player.js,player.css}. Refresh the generated source/public pages with node showcase-ui/tours/generate.mjs, then format the generated HTML. The generator enables film sources only when every configured local file exists. Marketing card routing lives in IndustryDemos.astro; original sample apps are preserved. Native 1440x900 DPR2 posters remain src/assets/showcase/industry/{vista,daybreak}.png.

Browser behavior follows [MDN video guidance](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) and [web.dev lazy video loading](https://web.dev/articles/lazy-loading-video). Automated transport/failure tests retain an intercepted arm clip fixture; that fixture is never published as architectural footage. Actual media tests separately decode the delivered HD/mobile files. Native iOS device verification remains a release check.


## Interaction cleanup and bounded buffering

After the first film starts, a 500ms grace and at least two seconds of buffered active playback (or its fully buffered remainder) protect the current stream before one detached native-video element buffers the next chapter. Native progress events retry this preparation when enough data arrives. That exact element is adopted as the active film at the boundary, avoiding a second request for the same warmed clip. It is never played in the background. No other future chapter buffers concurrently. Reduced motion, data saver, 2G/slow-2G, pause, manual single-chapter selection, hidden/offscreen states and preview exit cancel or suppress speculative buffering. A warming failure does not affect the current film. Browser HTTP caching can reuse completed requests, but persistent offline caching is not claimed.

On a chapter transition, a canvas captures the outgoing decoded frame once. It remains visible while the new stream prepares, then the incoming video fades over it using CSS opacity. The canvas is released after that fade (immediately for reduced motion), avoiding a repeated initial-poster flash and retaining no animation loop. Native loading is cancellable, with a 10-second timeout, stable operation tokens and scoped event listeners. Pause also cancels an in-flight start. Rapid inputs cannot revive an obsolete stream; failures retain the relevant still and accessible chapter controls.

Expanded viewers use explicit interaction, separate from parent-card hover. Moving from the film to chapter buttons does not pause or reset it. Standalone hover does not override explicit playback or a manual chapter choice. Named chapter buttons and Play/Pause/Replay are the primary controls; duplicate previous/next arrows are removed, while stage ArrowLeft/ArrowRight and Space remain available. Normal-motion chapter clicks start that chapter directly; reduced-motion/data-saver selection remains still until Play. Pausing and resuming a selected chapter preserves its single-chapter scope.

The existing expand button has a pointer target stretched over the tour image, so clicking/tapping either image or visible button opens the same dialog without adding another tab stop or navigation destination. A source-verified, throttled native timeupdate checkpoint carries chapter, time, sequence, paused and completed state into expansion. The new viewer seeks to that position and chooses suitable quality; no history or page URL change is involved. Duplicate ready messages and stale-frame errors are ignored. Hidden expanded viewers release media and retain their checkpoint, including a manual pause, when restored.

The current source stills/posters and media quality remain unchanged; refreshed system captures reflect the simpler controls. No additional Higgsfield calls, credits, media generation or dependencies are used for this cleanup.

Completed previews expand into Replay rather than resuming a final fraction of a second. Playback rate also survives an internal buffer handoff. Validation includes delayed responses, frame retention, cancelled starts, rapid selection, buffering limits, hover-to-viewer continuity and explicit-pause behavior.
