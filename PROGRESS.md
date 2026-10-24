# PROGRESS

Append-only. Newest at top. Never edit past entries. Format:

## 2026-10-25 · claude · claude/parallel-lanes
**Did:** D24 (supersedes D23): Codex and Claude work at the same time again. Codex keeps `XTS LadingPage`; Claude's worktree moved out of sight to `D:/DEV WORKS/.worktrees/xts-landing-claude` (outside the project folder so Codex's lint/type-check/format don't scan it). Tasks split by lane and by files; rules in AGENTS/CLAUDE/DEV-FLOW §1.
**Why:** User: one visible folder, but both agents should work simultaneously on separate tasks.
**Verify:** `git worktree list` → main folder + hidden worktree. Docs only.
**Next:** Codex is mid-task on `codex/v2-ui-refinement` — Claude stays off those files.
## 2026-10-25 · codex · codex/v2-ui-refinement (review)
**Did:** Audited home and service pages at 375/768/1440. Replaced the tiny boxed header/footer logo with a transparent raster mark plus a legible responsive wordmark, preserving supplied originals. Regenerated the hero as an engineering studio with deliberate copy space; simplified headline wrapping and proof hierarchy. Balanced all four service cards. Added gallery controls, mobile menu dismissal, scrollable mobile system tabs and accurate slideshow indexing.
**Motion:** Calmer entrances, desktop-only hero parallax/pinning, breakpoint cleanup, live reduced-motion cleanup and no GSAP/Lenis download for initial reduced motion. Arm frames now crossfade at their registered positions without scale drift or blur. Anchor handling preserves modified clicks and transfers focus on completion.
**Verify:** npm run verify passes (0 errors/0 warnings); 38 e2e tests and 3 final home screenshot captures pass. Service-page screenshots also reviewed at all three widths. Axe clean; motion-loaded JS remains within 70 KB gz. Three mobile Lighthouse collections: Performance 100/100, Accessibility 100/100, LCP 1.66–1.71s, CLS <0.001. Screenshots and verify log: docs/review/codex-v2-ui-refinement and docs/review/v2-ui-refinement. Full image prompts: docs/media-v2/ui-refinement-sources.json.
**Next:** Claude review of the refinement PR. Folder returned clean to main per D23. Local production preview of the refinement build: http://127.0.0.1:4380/.

## 2026-10-25 · codex · codex/v2-ui-refinement (claim)
**Claim:** User requested a whole-site UI/UX and motion review, corner-logo refinement and regenerated imagery where useful. Scope: responsive brand lockup, hero art direction/type, balanced service navigation, gallery controls, motion lifecycle and reduced-motion handling. Read main clean after D23; no concurrent agent work. Existing facts and architecture retained.

## 2026-10-25 · claude · claude/one-folder
**Did:** One local folder (D23). Removed Claude's worktree `XTS LadingPage-claude`; both agents now work in `XTS LadingPage`, taking turns. Updated AGENTS/CLAUDE session rituals and DEV-FLOW §1: start only if the folder is clean on `main`, end by switching back to `main`.
**Why:** User asked for a single project folder.
**Verify:** `git worktree list` shows one entry; docs only otherwise.
**Next:** Unchanged — waiting on XTS facts/keys, then deployment.

## 2026-10-25 · claude · claude/v2-redesign (PR #7, includes #8 + #9)
**Did:** Reviewed Codex's v2 media. All 50 photo/screen keys in `src/content` match delivered files; the arm pair aligns (same base, camera, light) and the exploded view now blends the real pair. Merged `codex/v2-media-ui` (which contains `codex/v2-media`) into PR #7. Wired the 4 unused photos: Custom Software and Automation pages get a short photo row (`galleryHeading`, per-photo `ratio`, equal heights). New `ScreenOnPhoto` + `src/lib/homography.ts` warp the captured `software/mobile-1` screen onto the phone in `software/mobile-in-hand` (build-time matrix3d, ~15 lines of JS to scale). New e2e test for it.
**Why:** User: verify Codex's work, implement and finalize.
**Verify:** `npm run verify` ✅ · e2e 34/34 ✅ · Lighthouse home ×3: Perf 0.99–1.00, A11y/BP 1, LCP 1.6s, CLS 0 (SEO 1 with `PUBLIC_ALLOW_INDEXING=true` as in CI). Build now ~2 min (AVIF encoding of ~60 images).
**Next:** Waiting on XTS: real project names/countries (PLAN-v2 §6), Web3Forms key, vector logo, legal review; then deployment (Vercel). Optional: Higgsfield clip from the arm pair → `src/assets/video/arm-exploded.mp4` (auto-used).

## YYYY-MM-DD · <agent> · <branch>
**Did:** ...
**Why:** ...
**Verify:** ...
**Next:** ...

---

## 2026-10-19 · claude · claude/v2-redesign (v2 site)
**Did:** Rebuilt the site per PLAN-v2 / D22 on Codex's photo-led look. Home = Hero (real photo, proof row) → Services (4 photo tiles) → Work (pinned horizontal gallery) → Global reach → Contact. New `/services/<slug>` pages: system switcher (ERP·POS·CRM·WMS·Inventory·HR, software, automation) with slideshows of product screens; robotics = scroll-scrubbed exploded view + photo gallery. Native cross-document view transitions (tile photo morphs into page hero) + speculation-rules prerender: zero JS. `<Photo>`/`<Screen>` auto-wire files from `src/assets/photos|showcase/**` with placeholders. Removed v1 schematics, console, industries, process. Motion engine v2 (no DrawSVG). Tests rewritten for v2.
**Verify:** `npm run verify` 0/0; e2e 33/33 (4 service pages + axe, tabs/keyboard/deep link, slides, work pinned + moving, exploded progress, JS budget, no GSAP when reduced); Lighthouse home ×3: Perf 0.99–1.00, A11y/BP/SEO 1, LCP 1.5s, CLS 0.
**Next:** Codex: CODEX-BRIEF-v2 (images + `showcase-ui/`); they drop in with no code changes. User: real projects + countries (PLAN-v2 §6); exploded-view source (PLAN-v2 §4).
## 2026-10-25 · codex · codex/v2-media-ui (Part B complete)
**Did:** Built 33 standalone HTML/CSS screens across ERP, POS, CRM, WMS, inventory, HR, custom software and automation. Fictional product brands and Philippine sample data; inline SVG charts, tables, filters, workflows and mobile views. Added npm run capture:ui, npm run preview:ui, manifest contract and linked contact sheet. Captured all 33 exact PNG keys from PR #7 at native viewports and DPR 2.
**Verify:** npm run capture:ui passes with bundled Chromium, all 33 screenshots; captures check page errors, document overflow and mobile navigation overlap. Contact sheet plus representative desktop/tablet/mobile views visually inspected. npm run verify passes (0 errors/0 warnings). No application source edits; only src/assets/showcase.
**Next:** Separate Part B PR stacked on codex/v2-media; merge Part A first, then retarget Part B to main. PR #7 consumes assets automatically when integrated. Local contact-sheet preview: npm run preview:ui on 127.0.0.1:4382.

## 2026-10-25 · codex · codex/v2-media (Part A complete)
**Did:** Delivered all 25 JPEGs at the v2 filenames, including the supplied office hero and the matched 2000×1200 arm pair. Generated 24 photoreal assets with the built-in ImageGen tool; recorded every full prompt in IMAGE-BRIEF-v2 and docs/media-v2/sources.json. Added a toggle/blend arm review page. Main base, shoulder frame, background and camera remain aligned; joint parts separate along their axes.
**Verify:** All 25 JPEG formats/dimensions checked with Sharp; photo contact sheet and both arm frames visually reviewed. npm run verify passes (Astro check 0 errors/0 warnings, lint, format, build). No application source edits; only src/assets/photos.
**Next:** Part A PR for Claude review. PR #7 remains open; its existing filename slots consume these assets on integration. Part B is separately reviewable.

## 2026-10-20 · codex · codex/v2-media (claim)
**Claim:** v2 media Parts A/B. Part A writes only src/assets/photos and the image licence log; Part B writes showcase-ui, capture tooling, package script and src/assets/showcase. Exact 33 screen keys read from PR #7, not guessed. Shared package.json change is explicitly requested by the user. Robotics first; assembled arm is the exploded-view reference. No page/component/content source edits.

## 2026-10-19 · claude · main (v2 kickoff)
**Did:** Planned v2 with the user (D22): `docs/PLAN-v2.md`, `docs/IMAGE-BRIEF-v2.md`, `docs/CODEX-BRIEF-v2.md`. Claude is rebuilding `src/` on `claude/v2-redesign`.
**Next:** **Codex → start now:** read `docs/CODEX-BRIEF-v2.md`. Part A = photoreal images (IMAGE-BRIEF-v2), Part B = `showcase-ui/` sample ERP/POS/CRM/WMS/Inventory/HR/software/automation UIs + `npm run capture:ui`. Branch `codex/v2-media`, one PR per part. **Don't edit `src/`** until Claude's v2 PR merges. Drop images into `src/assets/photos/<folder>/` and they auto-wire.

## 2026-10-18 · claude · main (one output)
**Did:** Merged PR #6 into `main` with a merge commit (0f8d3a7) so both agents' commits stay in history. Closed #2–#5 (superseded; #5 auto-marked merged, #3 auto-closed). Deleted merged branches on GitHub (only `main` + `codex/wip-2026-10-18` remain). Codex folder → `main`; deleted its 9 local branches that were fully in main (verified with merge-base). Claude worktree detached on origin/main.
**Verify:** CI green on the merged head; main folder: `npm ci` + `npm run verify` 0/0, `npm run test:e2e` 25/25; both folders at 0f8d3a7.
**Next:** **Codex:** D15 lanes resume — start from `main`. Your 2026-10-18 WIP is on `codex/wip-2026-10-18`; the hero photo, Terms copy, legal links, nav highlight and button lift are already in main. **User:** U1 key, T05 logo, T33 Vercel, legal copy review.

## 2026-10-18 · claude · claude/mvp-ui (merged Codex WIP → one output)
**Did:** Found uncommitted Codex work in the main folder (2026-10-18 01:12–01:29) and saved it untouched to `codex/wip-2026-10-18` (pushed). Folded its **unique** parts into the MVP: hero photo backdrop (`hero-office.png` 1.8 MB → 18–75 KB WebP via astro:assets), **Website Terms page** (Codex copy → `content/terms.ts`), footer Privacy/Terms links, active-section nav highlight, button hover lift. Factored a shared `components/legal/LegalPage.astro` for Privacy + Terms. **Not taken** (duplicates of tested MVP code): Codex's parallel lib/form, lib/seo, scripts/motion, privacy page, global reduced-motion kill switch, `polish.css`. Fixed local tooling: Astro 7 allows one preview per project, so Playwright now shares port **4380** with `npm run serve` (reuses it locally; CI unchanged).
**Verify:** verify 0/0; e2e **25/25** (new: terms + legal links); Lighthouse ×3: **Perf 0.99**, A11y/BP/SEO 1.00, LCP 1.5s (hero photo), CLS 0. Visual check at 1440 + browser pane.
**Next:** Merge PR #6 → main; close #2–#5; Codex folder → main. Codex: diff `codex/wip-2026-10-18` against main if you want anything else from your WIP.

## 2026-10-18 · claude · claude/mvp-ui (local run)
**Did:** One-command local run. `npm run serve` = production build + `astro preview --host` on **:4380** (what visitors get: inlined CSS, optimised images, lazy motion; reachable from phones on the LAN). `npm run dev` pinned to **:4381**. `.claude/launch.json` has both (`xts-preview`, `xts-dev`). Ports avoid 4321 (Playwright) and 4173 (another local project).
**Verify:** served page has all 6 sections, 5 tabs, inline CSS, no console errors. Cold build ~45s (first image optimisation), warm ~6s (cache in node_modules/.astro).
**Next:** Shared file touched: `package.json` scripts (serve, dev port) — Codex FYI.

## 2026-10-17 · claude · claude/mvp-ui (session end + cleanup)
**Did:** PR #6 CI fully green on GitHub (24/24 e2e, screenshots, Lighthouse Perf 0.96–1.00 / A11y·BP·SEO 1, LCP 1.4–1.5s, CLS 0). Fixed CI: Lighthouse reports now upload (`include-hidden-files`); JS budget now enforced with motion loaded (new e2e, 59.7 KB gz of 70). Cleanup: repaired the git worktree link after both folders moved into `D:\DEV WORKS\XTS PROJECT DEVS\` (`git worktree repair`); updated folder paths in AGENTS.md, CLAUDE.md, DEV-FLOW §1; removed local build/test leftovers; deleted local copies of `claude/t23|t24|t31` (still on GitHub for PRs #2–#4); fast-forwarded local `main`.
**Why:** End-of-session tidy before handing off.
**Verify:** `git worktree list` shows both folders at the new paths; worktree clean; PR #6 checks green.
**Next:** **User:** review + merge **PR #6** (= G1–G3), then close #2–#5 as superseded and delete their branches. U1 Web3Forms key · T05 vector logo · T33 Vercel · read the privacy-notice draft. **Codex:** after #6 merges, `git switch main && git pull`; your local `codex/p1-*` branches are fully contained in #6 and can be deleted (your call); D15 lanes resume.

## 2026-10-16 · claude · claude/mvp-ui → MVP PR
**Did:** Finished UI/UX to MVP on top of Codex's P1 draft (D20, D21). Integrated #5 + #2→#4 + `codex/p1-composition`. Added: 12 coded schematics (`components/art/Schematic.astro`, `ui/Visual.astro`), hero living console, accessible industries tabs, states (buttons, cards, inputs, sticky header), motion engine (MOTION §7: lazy GSAP + DrawSVG + Lenis; CSS-only hero), Web3Forms form wiring (live when `PUBLIC_FORM_ACCESS_KEY` is set), privacy page (RA 10173), `<Seo/>` in Base, favicon + OG from the logo (`tools/make-brand-assets.mjs`). Tests: tabs, privacy, form, motion-on, no-GSAP-when-reduced.
**Why:** User asked Claude to finish UI/UX to the best MVP possible.
**Verify:** `npm run verify` 0 errors/0 warnings; `npm run test:e2e` 23/23; Lighthouse ×3: Perf 0.95, A11y 1.00, BP 1.00, SEO 1.00, LCP 1.6–1.9s, CLS 0, JS 58 KB. Screenshots reviewed at 375/768/1440.
**Next:** **User:** review the MVP PR (counts as G1–G3). After merge, close #2–#5 as superseded. **U1** Web3Forms key, **T05** vector logo, **T33** Vercel. **Codex:** D15 lanes resume after merge; good next UI work = T18 photos (optional), polish from user feedback. Git Bash tip: `MSYS_NO_PATHCONV=1 SHOTS_PATHS=/,/privacy npm run shots`.
## 2026-10-16 · claude · claude/mvp-ui (claim)
**Claim:** User asked Claude to finish UI/UX to a best-possible MVP (D20). Branch `claude/mvp-ui` = main + #5 + #2→#4 + `codex/p1-composition` (+ Codex's uncommitted style fixes as a patch). Scope: coded schematic visuals in place of placeholders, hero living console, industries tabs, states, motion engine (MOTION §7), Seo wiring, favicon/OG, form wiring (T30), privacy page.
**Next:** **Codex: please hold all UI-file edits until the MVP PR merges.** Your P1 commits are preserved in this branch's history.

## 2026-10-16 · claude · review of #5
**Did:** Reviewed PR #5 → **✅ approved** (posted as a comment: same GitHub account can't self-approve). One required step: GitHub flags PROGRESS.md as conflicting because it ignores our `merge=union` driver → Codex merges `origin/main` into the branch locally and pushes. Fixed DEV-FLOW §2 + CLAUDE.md: reviews are `--comment` with a `✅ approved` / `❌ changes requested` first line; union merge is local-only. **Owned mistake:** my commits `6eb16bd`/`fe274e5` put `.astro/` + `dist/` build output on `main` (`.gitignore` lacked them there); #5 removes them, and the merged tree is clean.
**Verify:** On #5: clean `npm ci` + `npm run verify` → 0 errors/0 warnings, build OK; hosted CI green; single deduped vite; `npm audit --omit=dev` 0 vulns (5 dev-only highs = T09); `git merge-tree` vs main → no conflicts, no build output.
**Next:** **Codex:** `git merge origin/main` into `codex/brand-platform-setup` → push → squash-merge #5 → merge #2 → #3 → #4 (all ✅ from Claude; Codex may comment-review) → continue D19 Step 0.

## 2026-10-16 · claude · main (docs)
**Did:** Optimized Codex's remaining work with the user (D19). DEV-FLOW "Remaining Codex work": merge train (#5 → #2 → #3 → #4 → rebase `codex/p1-composition` → one P1 PR), full local gate (`verify && test:e2e && shots`), gate-independent work during reviews, and 4 PRs after G1 (P2-a imagery · P2-b interaction/detail → G2 · P3-a engine + reveals · P3-b signature → G3). MOTION §7: `data-*` attribute contract + lazy GSAP (0 KB under reduced motion).
**Why:** 11 stacked branches and nothing on `main`; review and merge were the bottleneck, not building.
**Verify:** n/a — docs only.
**Next (Codex, in order):** (1) wait for Claude's approval of #5, then merge #5 → #2 → #3 → #4; (2) rebase `codex/p1-composition` on `main`, delete the other `codex/p1-*` branches, wire `<Seo />` + `no-js`→`js` + skip link in `Base.astro`; (3) run the full local gate → open **one** "P1 draft" PR → G1; (4) during G1: favicon/OG from the raster mark, start T18 images, start the motion engine (MOTION §7). **Claude:** review #5, then the P1 PR (G1).
## 2026-10-16 · codex · codex/brand-platform-setup
**Did:** Reconciled D15 ownership and current board with PR #5. Moved theme into src/styles; removing accidentally tracked build outputs from Git.
**Next:** Codex claims T02/T04/T10–T16 for the P1 composition draft, one section per stacked PR. Shared content contract additions are declared here for Claude review. No P2 imagery or P3 motion before G1. Claude retains all backend/SEO/test/deploy work and existing PRs #2–#4.

## 2026-10-16 · codex · codex/brand-platform-setup
**Did:** T01 scaffold (Astro 7.4, Node 24, Tailwind 4, fonts, lint, formatting, lockfile); T05 supplied originals and provenance log; T08 theme tokens + brand module + exact Claude handoff; T06 CI prepared. Branch for review, not merged to main.
**Why:** User supplied the theme and logos and requested implementation aligned with Claude ownership. Claude pages/components/layouts/PLAN untouched.
**Verify:** Asset SHA-256 hashes match all three supplied originals; dimensions confirmed. npm run verify passed (zero routes: scaffold only). No E2E tests exist yet. npm audit reports five high dev-tool findings in the Astro lint parser dependency chain; T09 tracks this without forcing a downgrade. Initial runtime install audit was clean.
**Next:** Claude reviews/pulls this branch, implements T02/T03 using docs/BRAND-HANDOFF.md, then T10–T16. T05 vector/favicon derivatives pending suitable source; T22 browser tests and T09 audit remain open.

## 2026-10-16 · codex · codex/brand-platform-setup
**Claim:** T01, T05, T08. Adding the planned scaffold dependencies and shared theme foundation before Claude starts T02/T03. Both supplied raster logos will be retained unchanged. No edits to Claude components, layouts, pages or PLAN. T03 should import the theme foundation and own subsequent styling. Coordination is files + git only.

## 2026-10-16 · claude · claude/t31-seo (#3, review) + claude/t24-test-harness (#4, review)
**Did:** **T31**: `src/lib/seo.ts` + `components/seo/Seo.astro` / `JsonLd.astro` (title template, description, robots, canonical, OG/Twitter, Organization + WebSite JSON-LD from approved facts only); `robots.txt` endpoint; **indexing off unless `PUBLIC_ALLOW_INDEXING=true`**; `astro.config` falls back to Vercel's production URL for `site`; `.env.example` drops captcha key, adds the indexing flag. **T24**: `tests/e2e/smoke.spec.ts` (page-agnostic invariants) + `a11y.spec.ts` (axe WCAG 2.2 AA, fails on serious/critical); `lighthouserc.cjs` with MOTION §6 budgets (private reports); CI runs e2e + Lighthouse on PRs. `src/lib/contact.ts` = contact facts as plain data.
**Why:** User continued Claude's parallel track.
**Verify:** `npm run verify` ✅. Throwaway page: 15/15 e2e pass; 6 injected defects → 9 failures, each correct. Lighthouse: Perf/A11y/SEO 1.00, LCP 1.4s, CLS 0; BP 0.93 from missing favicon + low-res image (real issues).
**Next:** PR stack: Codex scaffold → #2 → #3 → #4. **Codex:** open your scaffold PR; then in `Base.astro` use `<Seo title description />` (snippet in #3); every `main section` gets an `id`; every `img` gets alt + width/height; ship favicon (T05) and `public/og/og-default.jpg` (T18); visible `:focus-visible` + skip link. **Claude:** T30 form logic next (needs U1 key for a live test).

## 2026-10-16 · claude · claude/t07-form-provider (#1, merged) + claude/t23-shots-ci (#2, review)
**Did:** **T07** → Web3Forms (250 free/mo, browser JSON POST, public key, honeypot + min fill time; hCaptcha only if spam) — `docs/spikes/T07-form-provider.md`, D18. **T23** `npm run shots` (Playwright vs `astro preview`, full page + per-section PNGs at 375/768/1440, `docs/review/` git-ignored). **T06** extended Codex's `verify.yml`: push only on `main`, new `browser` job (e2e when `tests/e2e/` exists; PR screenshot artifact `review-shots-pr<N>`), browser cache. DEV-FLOW §3 updated.
**Why:** User started Claude's parallel track while Codex builds the draft UI.
**Verify:** `npm run verify` ✅; `npm run shots` on a throwaway page ✅ (3 passed, 15 PNGs; page removed before commit).
**Next:** **Codex:** open a PR for `codex/brand-platform-setup` → `main` (PR #2 is stacked on it and retargets automatically). Give every `<section>` an `id` (shots + anchors need it). Drop `PUBLIC_CAPTCHA_SITE_KEY` from `.env.example` (D18). Move `public/brand/theme.css` → `src/styles/` (T08). **User:** U1 — create the Web3Forms access key with info@xzentechsolutions.com. **Claude:** next T31 SEO components, T24 test harness.

## 2026-10-16 · claude · claude/dev-flow (merged to main)
**Did:** Planned the top-down, UI-first dev flow with the user. New `docs/DEV-FLOW.md` (phases P0–P5, gates G1–G3, one-folder-per-agent, PR review loop, review checklist, tooling) and `docs/MOTION.md` (GSAP + Lenis, motion tokens, per-section choreography, reduced motion, perf budget). **Lanes swapped (D15): Codex = UI/UX lead, Claude = architecture/backend/quality/reviews.** Rewrote AGENTS.md, CLAUDE.md, TASKS.md (phase board); PLAN v1.3 (motion row, ownership map, coded hero dashboard); IMAGE-BRIEF hero backdrop; `.gitattributes` union merge for PROGRESS.md; DECISIONS D15–D17.
**Why:** User wants top-down dev, Codex leading UI/UX + motion first; backend is small.
**Verify:** n/a — docs only.
**Next:** **Codex:** finish T01/T05/T08 on `codex/brand-platform-setup`, then `git pull origin main` — on conflict in TASKS.md take **main's** version and re-mark your in-flight items (already listed). Fix the broken T06 line (PowerShell `` `n `` escape) — main's TASKS already has it fixed. Then P1 (T10→T16). Your earlier claim entry appears twice in PROGRESS.md — leave it (append-only). **Claude:** parallel track T07 → T23 → T06 from worktree `D:\DEV WORKS\XTS LadingPage-claude`.

## 2026-10-16 · claude · main
**Did:** T00 — created private repo https://github.com/BFC-XZEN/xts-landing-page, pushed `main`. Added `git pull` / `git push` to the session ritual in AGENTS.md + CLAUDE.md.
**Why:** User approved GitHub as the shared remote.
**Verify:** `git status -sb` → `main...origin/main`, in sync.
**Next:** **Codex → T01** (scaffold) + **T07** (form provider spike); T06 CI once T01 lands. Claude → T02/T03 after T01.

## 2026-10-16 · claude · claude/stack-astro (merged to main)
**Did:** Stack review with user → **Astro 7, static, no React**, no CMS, GitHub, English only. Rewrote PLAN §5 (architecture, stack table, source layout, env vars) and §6 `Img` type (`ImageMetadata`); images now under `src/assets/images/`. Updated lanes in AGENTS/CLAUDE, HANDOVER, IMAGE-BRIEF paths. TASKS: T00 GitHub repo, T06 CI, T07 form-provider spike, T17 privacy page. DECISIONS D12 (supersedes D4), D13, D14.
**Why:** Marketing-only site → Astro gives the fastest page with near-zero JS.
**Verify:** n/a — docs only.
**Next:** T01 hold is **lifted**. **Codex → T01** (scaffold) and **T07** (form provider spike). Claude → T00 (GitHub repo) once the user approves, then T02/T03 after T01.

## 2026-10-16 · claude · claude/no-socials (merged to main)
**Did:** Removed social links from PLAN (footer, `Social` type, Q7 closed), TASKS (T16, Q7), HANDOVER; added D11.
**Why:** User: no social links for now.
**Verify:** n/a — docs only.
**Next:** Stack/architecture review with the user is in progress — **Codex: hold T01** until the stack is confirmed in DECISIONS.md (D4 may change).

## 2026-10-16 · claude · claude/plan-v1.1 (merged to main)
**Did:** Applied XTS answers to `docs/PLAN.md` (v1.1): proof bar = 300+ business systems / 200+ robotics & automation + 2 text proofs; case studies → anonymised **Showcase** with generated visuals; Why-XTS merged into Process (no partner logos) → 6 sections; contact details; domain reference-only. Updated content types (`Proof`, `Showcase`, `Contact`, `Principle`, `Social`), IMAGE-BRIEF (showcase shots + `public/brand/`), TASKS (T05 brand, T40 domain later), DECISIONS D7–D10, HANDOVER company facts.
**Why:** User answered open questions Q1–Q6 and asked to optimise.
**Verify:** n/a — docs only.
**Next:** **Codex → T01** scaffold, then **T05** once the user sends the logo. Claude → T02/T03 after T01. Still open: Q4 logo, Q7 social URLs.

## 2026-10-16 · claude · main
**Did:** Wrote `docs/PLAN.md` (reworked IA from the mockup: 7 solution cards → 4 pillars, merged trust strips into one proof bar, 6 → 5 industries as a selector, added Featured Work + inquiry form), `docs/IMAGE-BRIEF.md`, saved mockup to `docs/reference/`. Set up coordination files (HANDOVER, AGENTS, CLAUDE, TASKS, DECISIONS, this log) and `.gitignore`.
**Why:** User asked to plan and optimise the landing page and set up a Codex + Claude workspace before building.
**Verify:** n/a — docs only, no code yet.
**Next:** **Codex → T01** (scaffold Next.js + tooling, `npm run verify` script). Then Claude → T02/T03 (content types, tokens/fonts) while Codex starts T04/T18. Open questions Q1–Q6 for XTS are in PLAN §8.
