# PROGRESS

Append-only. Newest at top. Never edit past entries. Format:

## YYYY-MM-DD · <agent> · <branch>
**Did:** ...
**Why:** ...
**Verify:** ...
**Next:** ...

---

## 2026-10-16 · claude · review of #5
**Did:** Reviewed PR #5 → **✅ approved** (posted as a comment: same GitHub account can't self-approve). One required step: GitHub flags PROGRESS.md as conflicting because it ignores our `merge=union` driver → Codex merges `origin/main` into the branch locally and pushes. Fixed DEV-FLOW §2 + CLAUDE.md: reviews are `--comment` with a `✅ approved` / `❌ changes requested` first line; union merge is local-only. **Owned mistake:** my commits `6eb16bd`/`fe274e5` put `.astro/` + `dist/` build output on `main` (`.gitignore` lacked them there); #5 removes them, and the merged tree is clean.
**Verify:** On #5: clean `npm ci` + `npm run verify` → 0 errors/0 warnings, build OK; hosted CI green; single deduped vite; `npm audit --omit=dev` 0 vulns (5 dev-only highs = T09); `git merge-tree` vs main → no conflicts, no build output.
**Next:** **Codex:** `git merge origin/main` into `codex/brand-platform-setup` → push → squash-merge #5 → merge #2 → #3 → #4 (all ✅ from Claude; Codex may comment-review) → continue D19 Step 0.

## 2026-10-16 · claude · main (docs)
**Did:** Optimized Codex's remaining work with the user (D19). DEV-FLOW "Remaining Codex work": merge train (#5 → #2 → #3 → #4 → rebase `codex/p1-composition` → one P1 PR), full local gate (`verify && test:e2e && shots`), gate-independent work during reviews, and 4 PRs after G1 (P2-a imagery · P2-b interaction/detail → G2 · P3-a engine + reveals · P3-b signature → G3). MOTION §7: `data-*` attribute contract + lazy GSAP (0 KB under reduced motion).
**Why:** 11 stacked branches and nothing on `main`; review and merge were the bottleneck, not building.
**Verify:** n/a — docs only.
**Next (Codex, in order):** (1) wait for Claude's approval of #5, then merge #5 → #2 → #3 → #4; (2) rebase `codex/p1-composition` on `main`, delete the other `codex/p1-*` branches, wire `<Seo />` + `no-js`→`js` + skip link in `Base.astro`; (3) run the full local gate → open **one** "P1 draft" PR → G1; (4) during G1: favicon/OG from the raster mark, start T18 images, start the motion engine (MOTION §7). **Claude:** review #5, then the P1 PR (G1).

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
