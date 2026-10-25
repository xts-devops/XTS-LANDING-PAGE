# Higgsfield handoff — robotic arm

Status: generated and integrated for review on 2026-10-25. A regenerated 1080p Higgsfield Hailuo clip now drives a finite viewport-triggered transition; the approved photo pair remains the fallback. Current 1080p request, job/media IDs, checksum, cost and review notes: `generation-1080p.json`; the prior 768p delivery is retained in `generation.json`.

## Inputs and shot

- Start: `src/assets/photos/robotics/hero-arm.jpg` (2000×1200).
- End: `src/assets/photos/robotics/arm-exploded.jpg` (2000×1200).
- Fingerprints and machine-readable brief: `shot.json` beside this document.
- Existing review: flick between both full-resolution frames and blend them at 50%; compare the base, floor, fixed mounting location, background edges and warm key light.

One locked-off tripod shot, 5:3 aspect, no camera movement, no zoom, no focus pull, no object rotation, no lighting change. Preserve the six-axis arm identity, fixed base and clean dark laboratory. Mechanical parts separate smoothly along their own axes with even spacing. Do not invent pieces, change the topology, bend rigid parts or let geometry pass through itself. This is a visual concept, not an engineering assembly instruction.

## Six-second beat sheet

| Time | Beat |
|---|---|
| 0.0–0.6s | Assembled start frame; hold position |
| 0.6–4.8s | Controlled, smooth component separation; fixed base and camera |
| 4.8–6.0s | Hold the exploded end frame, matching the supplied end state |

Generate a forward shot only. The site reverses the timeline when visitors scroll back. Do not add an assembly/reverse cycle, cuts, narration, music, text, particles or flares.

## Outputs and web encode

Retain the highest-quality master outside the public runtime. Review the master at 0/25/50/75/100% before producing a web derivative. Target web delivery: 1800×1080, 24 fps, about 6 seconds, H.264 MP4, no audio, yuv420p, a four-frame GOP with no B frames for responsive seeking, faststart, preferably ≤8 MB. Optional WebM alternative is secondary; the page prefers MP4.

Example conversion after approval of the master (FFmpeg required locally; not a repository dependency):

```sh
ffmpeg -i arm-master.mp4 -an -vf "scale=1800:1080:force_original_aspect_ratio=decrease,setsar=1,fps=24" -c:v libx264 -preset slow -crf 20 -g 4 -keyint_min 4 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart src/assets/video/arm-exploded.mp4
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames:format=duration,size -of json src/assets/video/arm-exploded.mp4
```

Do not commit the master or a blank/placeholder MP4. The existing photos remain the delivered fallback. A real `src/assets/video/arm-exploded.mp4` is picked up at build time; MP4 is preferred if both supported files exist.

## Playback and acceptance

- Before interaction/nearby viewport: no video source is assigned and no clip download starts.
- Reduced motion, no JS, data saver or an unavailable/failed clip: keep the photo pair; never show a blank rectangle.
- Normal motion: load near the stage, start the finite transition only after a decoded frame and the complete short clip are buffered, seek at most once per animation frame and wait for the current seek to finish before applying the latest transition target.
- Leaving the tab pauses work. Switching to reduced motion removes the video source and restores static frames. No autoplay/audio.
- Reject background/camera drift, base displacement exceeding a few pixels, temporal flicker, changed arm geometry, abrupt midpoint jumps, text/logos or a mismatched final pose. Compare side-by-side with source frames at equal scale.
- Verify viewport entry, reverse on upward exit, replay, resize, reduced-motion toggling, offline/error fallback, iOS and Chrome mobile seeking before enabling the clip in a release.

## Adjacent future footage

FormaField currently has an interactive build-phase diagram; a photoreal construction timelapse needs its own approved start/end scene and phase consistency. Vista Grove currently has two generated architectural concept views. Before a filmed walking route, plan a consistent floor layout and camera path with matching doorway landmarks. Do not imply that two unrelated image views already define a traversable building.
## Delivered clip · 2026-10-25

One compatible MiniMax Hailuo (`variant: minimax`) generation, requested as 6 seconds at 768 resolution, using the existing start/end frames. The newer 2.3 variant was rejected before job creation because its backend does not accept end frames; the balance remained 130. The compatible generation cost exactly 6 credits, leaving 124. No paid retry, upscaling generation or additional variants.

The source returned 1280×768, 24 fps, 142 frames (5.917s). Reviewed sampled start/intermediate/end frames before producing a 3,786,739-byte H.264 derivative with all keyframes, faststart and no audio. Source master stays outside runtime in the gitignored review folder. The website picks up the MP4 automatically; no playback-code change or dependency was required.

Validation: npm run verify passes; 8 existing motion/UI checks pass. Dedicated desktop/mobile browser checks validate forward/reverse seeking, no autoplay, near-stage loading and reduced-motion/save-data/no-JS/error fallbacks. Captures and a scroll recording are in docs/review/arm-video. Real iOS-device seeking remains a release review check, not claimed as tested.

## 1080p revision and finite transition · 2026-10-25

One new start/end-frame Hailuo generation at 1080 resolution cost 10 credits (preflight checked), leaving 114. Source and web output are genuinely 1800×1080, preserving the 5:3 shot; no upscaling from the prior clip. The silent web derivative is 5,076,759 bytes at CRF 20, with a four-frame GOP, no B frames and faststart. The source master stays outside runtime.

The 200–260vh sticky scrub runway is replaced by a normal-flow scene. When the arm approaches the viewport center, a 1.8s eased transition finishes without continued scrolling. Scrolling back above the trigger reassembles it. Replay reverses then re-explodes continuously; hidden/offscreen scenes suspend unfinished motion. The transition waits for a decoded frame and the short clip to finish buffering on slow loads and falls back to a finite photo crossfade on failure or data saver. Reduced motion and no JS retain static source images; Replay is absent there. Replay space is reserved before JS initializes, preventing its late appearance from moving the page. Source microgeometry remains an illustrative generated concept, not a CAD assembly.

Validation for the 1080p/finite-transition revision: npm run verify passes; the full 180-test e2e suite passed, followed by all 15 focused checks after the final buffering guard. Browser playback reports native 1800×1080 at 375/768/1440; final stills and a normal-motion recording are in docs/review/arm-hd. The 70KB motion JS budget passes. The robotics hero photo now uses responsive WebP (matching the existing automation policy) to reduce decode cost. Three mobile robotics Lighthouse runs improved from 92/93/94 with LCP 3.02–3.08s to 94/94/94 with LCP 2.74–2.75s, Accessibility 100, CLS 0, TBT 23–97ms. This remains below the internal Performance 95 / LCP 2s targets; do not describe the overall robotics page as passing that performance gate. Real iOS-device playback also remains a release check. No additional generation credits were spent for encoding or site tests.

## Desktop showcase framing update · 2026-10-25

The user now requests a brief scroll hold. Desktop native sticky framing replaces only the previous normal-flow desktop layout; the 1.8s independent transition, source media and mobile/fallback behavior remain. The short 55svh/capped runway never locks scroll. Current behavior and validation: ../../ARM-SHOWCASE.md, D34. No Higgsfield calls or new credits used.
