# Photo gallery interaction

The service photo galleries retain their native editorial layout. Robotics uses the larger bento composition; software and automation keep short rows. A shared PhotoGallery component supplies consistent interaction and descriptive captions.

- Cards join the existing staggered reveal batch. Content is visible without JavaScript and settles immediately for reduced motion.
- Fine-pointer desktop images drift only 3% in each direction inside their frame. Hover adds a small zoom, a gold edge and an expand cue. Captions remain visible. The phone screen-on-photo composite skips independent photo transforms to preserve registration.
- The small heading indicator represents actual progress through the gallery section. It never claims loading, adds a delay, pins the gallery or captures scroll. It is decorative and hidden for no-JS/reduced-motion visitors.
- Selecting a photograph opens a native dialog with a large WebP, side controls, arrow-key navigation, a count and a visible Close button. Escape/backdrop close it, focus returns to the originating photo, and background scrolling is restored. Modified clicks and no-JS navigation retain native image links. Only the selected large image is requested.
- There are no continuous timelines. The existing lazy GSAP context owns triggers and tears down drift/progress when motion preferences or viewport conditions change. Touch gets static photos and tap inspection.

The final wide robotics tile uses an explicit panoramic ratio, and frames have an explicit width, preventing the adjacent portrait from growing outside its grid cell. Checks include frame bounds at 375/768/1440, native image loading, keyboard/dialog accessibility, live reduced-motion cleanup, no-JS navigation, the screen-on-photo registration, existing service navigation and the motion JS budget. No new media, dependency or client-project claim is introduced.
