# System overview collection

The collection names systems by their purpose, without invented company or product brands. Stable internal asset keys are preserved so existing URLs and capture contracts continue to work.

| System | Workflow shown |
|---|---|
| Coffee shop & grocery POS | Add coffee and rice, filter products, complete a sample sale |
| Construction project management | Foundation, frame, envelope and fit-out |
| School & staff management | Staff/student rosters and attendance filters |
| Dental appointment booking | Clinician, date, time and confirmation |
| Hotel & court booking | Photographic rooms and sports reservation flows |
| Real estate & property discovery | Architectural concept views and viewing requests |
| Auto replies & BPO workflows | Message routing, reply drafting, approval and agent handoff |
| Email indexing & invoice workflows | Attachment indexing, extracted fields, review and sample ledger sync |
| Factory & hardware integration | Sensor event, edge controller, ERP record and exception review |
| Server & deployment management | Data/worker inspection and a dry deployment |

## Preview behavior

Each card keeps a responsive still until the visitor hovers over its image or activates the preview button. A 250ms hover intent delay prevents incidental loads. Only one sandboxed, inert, unfocusable iframe exists at a time. It renders the actual standalone UI at 1440×900 and scales to the thumbnail. A finite cursor sequence activates real local controls, with readable step labels in the parent card. It holds the final state and offers Replay; it never loops indefinitely. No remote API, booking, payment, analytics or storage is involved.

Leaving, Escape, focus departure, scrolling the preview offscreen, hiding the document or changing motion/input preferences unloads it. A 12s readiness timeout restores the still if it cannot load. No page scroll lock, modal or Try-the-demo CTA remains. Keyboard/touch visitors use the same explicit preview control. Reduced motion suppresses hover playback; activation presents an immediate static result without cursor travel or fades. No-JS visitors retain the screenshot and a direct system-screen link.

## Authoring and media

Edit `showcase-ui/industry-screens.mjs`, `industry.css`, `industry.js`, `automation-overviews.mjs`, `automation-actions.js` and `src/content/industry-demos.json`, then run `node showcase-ui/build-screens.mjs`. This regenerates the standalone sample pages, public CSS/JS and the 43-screen manifest/contact sheet. Format generated files, then run `npm run capture:ui` for all 43 native DPR-2 PNGs. The original 33 screen keys plus ten industry keys remain intact.

Café/market products use the generated photographs logged in `docs/media-v2/product-sources.json`. Room and court photographs are logged in `docs/media-v2/hospitality-sources.json`; architectural concept photographs remain in `docs/media-v2/industry-sources.json`. The connected factory photograph and its JPEG/WebP exports are logged in `docs/media-v2/automation-sources.json`. Exact prompts, saved source sheets and export paths are retained. These are illustrative products and spaces, not client evidence, real hotel availability or property listings. Construction remains a clearly labelled phase diagram; future arm/timelapse/walkthrough footage follows the existing Higgsfield handoff.

## People and context

Use English, explicit dates/time zones and descriptive system names. PHP pricing is sample regional context, not a restriction on clients. Names and initials are sample people; roles are not assigned by perceived gender, nationality or ethnicity. School records use initials. No generated portraits, demographic labels or diagnostic claims are added.

## Validation

Check 375/768/1440 layouts, accessible labels and control targets, normal/reduced motion, hover/tap/keyboard playback, cursor/action results, finite completion, loading failure, one-frame isolation and cleanup. Run verify, the full browser suite, responsive marketing captures and mobile performance checks. Review artifacts stay gitignored under `docs/review/system-overviews`.
