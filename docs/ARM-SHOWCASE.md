# Robotic arm showcase

The existing silent 1800×1080 master remains unchanged. A 1280×768 local delivery derivative is selected only for compact/coarse displays when it covers rendered width times DPR; larger views keep HD. It is 1,600,535 bytes versus the 5,076,759-byte master. Provenance and exact encoding command: media-v2/robotic-arm/mobile-delivery.json. No new generation, credits or runtime dependency.

## Visible native loop (D40)

The lightweight UI controller starts native video playback when 60% of the available scene area is visible, independent of GSAP boot or pointer interaction. Playback finishes on its own clock: approximately 3.2 seconds on compact/touch screens and 2.5 seconds on desktop, bounded by native playback-rate limits. The exploded frame holds for 2.2 seconds, dissolves to the assembled still, rests for 1.2 seconds, then repeats. Only the reset/replay seeks to zero; wheel movement never seeks individual frames. Native timeupdate events drive an interpolated progress line; there is no per-frame JS loop.

Pause/Resume persists through viewport exit/re-entry. Replay restarts directly. Hidden/offscreen states, open previews and fast return-to-top pause playback and timers; return-to-top resets without reversing the film. A nearby scroll-triggered preload avoids entry downloads. Failed media, data saver and 2G use a lightweight two-photo dissolve loop. Reduced motion keeps stills and no autoplay/download; no-JS retains accessible images.

Fine-pointer desktop retains a brief CSS sticky runway; touch/coarse and short screens keep normal document flow. Portrait and landscape framing reserves room for 44px controls below the scene, with additional short-screen clearance. No scroll lock, snap or forced viewing delay.

## Verification

Focused browser coverage includes native looping, rapid viewport exit/re-entry, persistent manual pause, delayed/failed media and data-saver fallback, reduced motion, desktop HD, touch portrait/landscape framing, return-to-top, and playback with GSAP blocked. Native iOS release-device verification remains a separate check. Review captures/logs: docs/review/showcase-loops (gitignored).
