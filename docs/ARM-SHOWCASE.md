# Robotic arm showcase

The arm uses the existing local 1800×1080 silent clip. No new generation or Higgsfield use.

On fine-pointer hover desktops at least 1024×650, the media stage sticks below the header for 55svh of additional scroll distance, capped at 32rem. Its 5:3 image and Replay control fit inside the viewport. Native CSS sticky reserves the brief hold before motion boots, with no pin spacer or extra scroll listener. ScrollTrigger aligns playback with the sticky inset. The existing eased 1.8s explosion runs on its own clock rather than scrubbing for every wheel movement. The stage releases naturally at the end of the short runway; scrolling is never stopped, snapped or cancelled.

Mobile, touch/coarse pointer, short screens, reduced motion and no-JS keep normal document flow. Live resizing and motion preferences restore the appropriate layout through CSS and the existing GSAP cleanup. No content is trapped behind an enforced playback delay. Returning above the entry reassembles the arm; Replay remains available. Hidden/offscreen, buffering, media-error and data-saver behavior remain unchanged.

This updates D30's desktop framing only; D34 records the user request. Original media provenance and native iOS release limitation remain in media-v2/robotic-arm/HIGGSFIELD-HANDOFF.md.

Review: arm-transition.spec.ts validates independent completion, reverse/replay, visible control framing, short hold/release, resize/reduced-motion cleanup, buffering and fallback behavior. Screenshots/recording: docs/review/arm-hold (gitignored).

Final revision validation: npm run verify passes with zero errors/warnings/hints; all 19 focused arm/motion/UI checks pass. Reviewed 375/768/1440/1920 captures and held/release states, with a recorded desktop wheel-scroll sequence. Motion JS stays within 70KB gzipped. Native iOS playback remains a release-device check.
