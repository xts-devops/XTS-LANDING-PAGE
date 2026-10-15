# PROGRESS

Append-only. Newest at top. Never edit past entries. Format:

## YYYY-MM-DD · <agent> · <branch>
**Did:** ...
**Why:** ...
**Verify:** ...
**Next:** ...

---

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
