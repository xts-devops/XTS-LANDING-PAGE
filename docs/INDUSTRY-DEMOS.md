# Industry demo collection

Seven fictional concept brands demonstrate distinct tasks. They are marketing samples, not client engagements, working integrations, medical products or commercial offers.

| Brand | Context | Live interaction |
|---|---|---|
| Morrow & Moss | Coffee, groceries, rice and farm-to-market retail | Filter products, build a ticket, finish a sample checkout |
| FormaField | Construction project coordination | Choose build phases, play/pause one short diagram sequence, complete tasks |
| Brightlane Campus | School and staff operations | Switch rosters, search and filter attendance |
| Kindred Smile | Dental / clinic booking | Choose clinician, date and time; review and confirm |
| Daybreak Club | Hotel and pickleball reservations | Switch rooms/courts and request a sample reservation |
| Vista Grove | Real-estate discovery | Explore two generated concept views and request a sample viewing |
| RelayDock | Server stack, implementation and training | Inspect components and run a local deployment simulation |

## Source and regeneration

- `src/content/industry-demos.json`: brand identity and marketing descriptions shared by the site and generator.
- `showcase-ui/industry-screens.mjs`, `industry.css`, `industry.js`: editable demo sources.
- `node showcase-ui/build-screens.mjs`: generates all 40 source pages, the manifest/contact sheet and the seven public demos. This overwrites generated HTML and public CSS/JS; edit sources first.
- `npm run capture:ui`: captures the original 33 system screens plus seven industry screens at native viewports and DPR 2. The original filename contract is preserved; `industry-contract.json` records the new seven.
- `public/demos/`: generated live pages served directly by the site. Each is responsive and works as a standalone concept. No remote dependencies, APIs, payments, storage or real transactions.
- `src/assets/showcase/industry/`: captured PNGs; Astro serves smaller responsive previews.
- `docs/media-v2/industry-sources.json`: full prompts and provenance for both new architectural images, generated with the built-in imagegen tool.

Service pages load no live demo until a visitor chooses one. A sandboxed iframe isolates the demo; closing it unloads the document and restores focus/scrolling. Escape works from inside the iframe. No-JS visitors get direct demo links. All static concept pages declare noindex.

## People and regional direction

Use English, clear dates, explicit time zones and neutral fictional brands. PHP pricing is sample regional context, not a restriction on the types of client XTS can serve. Names and initials are fictional; roles are not assigned by perceived gender, nationality or ethnicity. There are no generated human portraits, stereotyped costumes or demographic labels. School records use initials. Clinic demos contain appointment information only, with no patient histories or diagnostic claims.

Future photography should show a natural mix of Southeast Asian people across customer, leadership, engineering and support roles, without making ethnicity the visual theme. Add broader client contexts when the sales material needs them. Do not create demographic toggles, infer gender/race from photos, or use appearance to personalize business scenarios.

## Keep the collection focused

Car retail/dealership, pet stores, specialist hospital operations, agricultural wholesale and standalone campaign landing pages are optional future briefs, not extra repetitive dashboard skins. Reuse a relevant journey only when its domain needs are clear (e.g. pet care appointment vs pet retail checkout). Avoid adding a tile for every possible industry.

Construction timelapse and real-estate walking footage are next-stage media, alongside the robotic arm. FormaField currently uses a deliberately labelled phase diagram; Vista Grove uses two conceptual views, not a continuous walkthrough. Build a spatially consistent scene and approve camera keyframes before generating a doorway-to-interior video. Do not market the current images as a real listing, walkable 3D model or surveyed plan.

## UX decisions and evidence

Use named controls and active states instead of hidden swipes, native page scrolling inside each demo, clear completion feedback, and a single primary task per concept. No unsolicited autoplay or time-limited reading. Play/pause is explicit; animations stop when hidden and respect reduced motion. Reserve image dimensions; load previews responsively and defer full interactive documents and video until needed.

Guidance checked on 2026-10-25:
- [W3C carousel tutorial](https://www.w3.org/WAI/tutorials/carousels/): user control, keyboard operation and clear navigation.
- [W3C C39 reduced motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39): respect reduced-motion preferences for interaction animations.
- [web.dev video performance](https://web.dev/learn/performance/video-performance): defer video downloads and retain a lightweight visual fallback.

Validation covers all seven demos at 375/768/1440, axe accessibility, no horizontal overflow, live task completion and parent/iframe focus, Escape and lazy-load behavior. Source fixtures and browser screenshots stay in the repository/review workflow; they do not claim business outcomes.