# Construction project management sample

A generic two-storey residential build replaces the earlier diagram-only construction demo. Five coordinated snapshots show Foundation, Structure, Enclosure, Fit-out and Handover. Each selection updates the site photograph, sample programme week, project progress, open coordination items, review gate, phase checklist, milestone timeline and document register. Per-phase checklist edits persist for the current local visit; they do not imply a real approval or update a live project.

The same completed-house photograph is the reference for four earlier generated stages. The plot, camera and background landmarks stay recognizable; these are illustrative snapshots, not exact construction records, engineering/CAD documentation or a filmed timelapse. Progress values and weeks are explicitly sample data and describe the selected snapshot. No actual client, company, construction result or equipment ownership is claimed.

Handover includes testing records, defect closeout, owner orientation and as-built/manual turnover. These broad management categories were informed by [Autodesk's construction closeout guidance](https://www.autodesk.com/blogs/construction/project-closeout/). The preview is a marketing example of project coordination, not a construction method or compliance checklist.

## Implementation

- Source model and markup: showcase-ui/construction.mjs, imported by industry-screens.mjs. Generated HTML is mirrored to showcase-ui/industry/formafield.html and public/demos/formafield.html.
- Source runtime/style: showcase-ui/industry.js and industry.css; the existing generator mirrors these to public/demos/demo.js and demo.css.
- Five local 1600×900 WebP photographs, about 1.21 MiB total. Only the default enclosure photograph loads initially (the two crossfade slots reuse the same URL). Other stages load on selection inside the hover/fullscreen iframe. The marketing poster does not request these photos before the iframe opens.
- The existing picture remains visible while the next image decodes; both the image and project record switch after decoding, then crossfade over 320ms. A bounded image failure uses a clear fallback and still shows the selected project record. Rapid selection ignores stale image completions.
- The standalone Play sequence holds each snapshot for 2.5s, advances once through the five phases and stops. Pause, hidden-page/pagehide and reduced-motion changes cancel further steps. Reduced motion disables the play control and removes transitions while keeping manual selection.
- The existing finite hover/fullscreen cursor workflow visits all five states and waits for image readiness before proceeding. Reduced-motion overviews go directly to the final handover snapshot and load only the default and final images. The preview retains the common one-iframe cleanup, responsive viewer and keyboard behavior. No new animation library, video or Higgsfield use.
- The native 1440×900 system screen fits every phase without viewport overflow; its refreshed poster is captured at DPR 2. Mobile standalone views use normal scrolling, with minimum 44px phase controls.

Full generation prompts, output paths and reference provenance: [construction-sources.json](media-v2/construction-sources.json). Source PNGs remain outside runtime. Review artifacts are under docs/review/construction-phases (gitignored).

## Validation

npm run verify passes with zero errors/warnings/hints. All 81 final construction/industry/workflow/fullscreen/media/motion checks pass. Every phase fits the native 1440×900 viewport, with the marketing poster captured at DPR 2. Mobile/tablet phase state, checklist persistence, deferred image requests, reduced-motion two-image delivery, image-error fallback and existing viewer cleanup are covered. Reviewed source-phase and marketing card/viewer captures at 375/768/1440; normal-motion hover playback recorded under docs/review/construction-phases. The main motion JS budget remains below 70KB gzipped.
