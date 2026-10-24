# Higgsfield handoff — robotic arm

Status: prepared; no generated video is claimed or connected yet. Connect the intended Higgsfield MCP later, then use the two approved source frames and the attached motion brief. Do not replace these frames before checking their registration.

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

Retain the highest-quality master outside the public runtime. Review the master at 0/25/50/75/100% before producing a web derivative. Target web delivery: 1280×768, 24 fps, 6 seconds, H.264 MP4, no audio, yuv420p, all keyframes for smooth seeking, faststart, preferably ≤8 MB. Optional WebM alternative is secondary; the page prefers MP4.

Example conversion after approval of the master (FFmpeg required locally; not a repository dependency):

```sh
ffmpeg -i arm-master.mp4 -an -vf "scale=1280:768:force_original_aspect_ratio=decrease,setsar=1,fps=24" -c:v libx264 -preset slow -crf 24 -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart src/assets/video/arm-exploded.mp4
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames:format=duration,size -of json src/assets/video/arm-exploded.mp4
```

Do not commit the master or a blank/placeholder MP4. The existing photos remain the delivered fallback. A real `src/assets/video/arm-exploded.mp4` is picked up at build time; MP4 is preferred if both supported files exist.

## Playback and acceptance

- Before interaction/nearby viewport: no video source is assigned and no clip download starts.
- Reduced motion, no JS, data saver or an unavailable/failed clip: keep the photo pair; never show a blank rectangle.
- Normal motion: load near the stage, reveal video only after a decoded frame is available, seek at most once per animation frame and wait for the current seek to finish before applying the latest scroll target.
- Leaving the tab pauses work. Switching to reduced motion removes the video source and restores static frames. No autoplay/audio.
- Reject background/camera drift, base displacement exceeding a few pixels, temporal flicker, changed arm geometry, abrupt midpoint jumps, text/logos or a mismatched final pose. Compare side-by-side with source frames at equal scale.
- Verify forward/backward scroll, rapid scrubbing, resize, reduced-motion toggling, offline/error fallback, iOS and Chrome mobile seeking before enabling the clip in a release.

## Adjacent future footage

FormaField currently has an interactive build-phase diagram; a photoreal construction timelapse needs its own approved start/end scene and phase consistency. Vista Grove currently has two generated architectural concept views. Before a filmed walking route, plan a consistent floor layout and camera path with matching doorway landmarks. Do not imply that two unrelated image views already define a traversable building.