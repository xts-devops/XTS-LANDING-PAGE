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

Each card keeps a responsive still until a 250ms hover/focus intent starts its finite workflow. There are no Play/Stop/Replay toggles. The single 44px action is View full screen. Only one sandboxed, inert, unfocusable iframe exists at a time; its cursor sequence runs real local sample controls at a fixed 1440×900 plane, then holds the final state. Leaving and returning replays inline; opening the viewer starts a fresh finite sequence. No real booking, payment, network API or storage is involved.

The native full-window dialog provides Fit / Actual size inspection, a named title and Close. Escape, Close and backdrop click unload the frame and restore focus without scrolling the page; native modal focus containment and body scroll lock apply. Closing suppresses accidental immediate reactivation on restored focus. Actual size uses native scrolling for detailed inspection, including touch panning. Controls remain outside the displayed UI. Other service carousels receive the existing preview lifecycle event and remain suspended behind the dialog.

Large responsive WebP stills live inside inert HTML templates and are cloned only when the viewer opens; they remain beneath the live frame as a high-resolution fallback. The readiness timeout/error path keeps that still and a closable viewer instead of a blank rectangle. Thumbnail stills and full-size/live media share the same native aspect and coordinate plane. No frame is reparented between hosts: expansion unloads the inline instance before creating its replacement, preserving the one-live-frame limit.

Inline leaving, Escape, focus departure, offscreen scrolling, document hiding or motion/input-preference changes unload playback. An open viewer is retained on document hiding with its still fallback, and restarts its finite sequence on return. Reduced motion suppresses hover/focus animation; explicit expansion shows an immediate terminal state without cursor travel or fades. A live reduced-motion change unloads inline playback or rebuilds the open viewer as static. Keyboard and touch use the same full-screen action. No-JS visitors retain the screenshot and direct system-screen link. D33 supersedes D27's former inline toggle/no-modal choice.

## Authoring and media

Edit `showcase-ui/industry-screens.mjs`, `industry.css`, `industry.js`, `automation-overviews.mjs`, `automation-actions.js` and `src/content/industry-demos.json`, then run `node showcase-ui/build-screens.mjs`. This regenerates the standalone sample pages, public CSS/JS and the 43-screen manifest/contact sheet. Format generated files, then run `npm run capture:ui` for all 43 native DPR-2 PNGs. The original 33 screen keys plus ten industry keys remain intact.

Café/market products use the generated photographs logged in `docs/media-v2/product-sources.json`. Room and court photographs are logged in `docs/media-v2/hospitality-sources.json`; architectural concept photographs remain in `docs/media-v2/industry-sources.json`. The connected factory photograph and its JPEG/WebP exports are logged in `docs/media-v2/automation-sources.json`. Exact prompts, saved source sheets and export paths are retained. These are illustrative products and spaces, not client evidence, real hotel availability or property listings. Construction remains a clearly labelled phase diagram. Existing robotic-arm media is local; further Higgsfield use is prohibited under D31 unless explicitly re-enabled by the user.

## People and context

Use English, explicit dates/time zones and descriptive system names. PHP pricing is sample regional context, not a restriction on clients. Names and initials are sample people; roles are not assigned by perceived gender, nationality or ethnicity. School records use initials. No generated portraits, demographic labels or diagnostic claims are added.

## Validation

Check 375/768/1440 layouts, accessible labels and control targets, normal/reduced motion, hover/focus playback, touch/keyboard expansion, cursor/action results, finite completion, fit/actual-size panning, Escape/Close/focus return, loading failure, deferred high-resolution stills, one-frame isolation and cleanup. Run verify, the full browser suite, responsive marketing captures and mobile performance checks. Review artifacts stay gitignored under `docs/review/system-overviews`.

Current full-screen revision: npm run verify passes with zero errors/warnings. All 77 focused checks pass across the service/workflow/media/motion run and final seven-test viewer rerun, including all ten finite workflows, 320/375/768 media geometry, 375/768/1440 modal fit/zoom/focus return, pointer request isolation, reduced motion, no JS, lazy full-size assets and failed-frame fallback. The viewer-specific axe audit has no serious/critical violations; the 70KB motion JS budget passes. Reviewed final card/viewer captures at 375/768/1440, actual-size mobile inspection and a normal-motion hover/full-screen recording in docs/review/overview-fullscreen. Existing sample-app captures and source media are unchanged.
