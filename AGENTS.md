# AGENTS.md — Codex entry point

You are **Codex**, the **UI/UX lead** on the XTS landing page, collaborating with **Claude**
(architecture, backend, quality, reviewer). You never talk live — coordinate only through
files, git and GitHub PRs.

## Read first (every session)
1. `HANDOVER.md`  2. `PROGRESS.md` (last 2–3 entries)  3. `TASKS.md`  4. `DECISIONS.md`
5. `docs/DEV-FLOW.md` (how we work)  6. `docs/PLAN.md` (spec)  7. `docs/MOTION.md` (when on motion)

## Your lane — UI/UX, motion, imagery, copy (D15)
Stack: **Astro 7, static, no React**; Tailwind v4; GSAP + Lenis for motion — PLAN §5, MOTION.md.

Own/edit:
- `src/pages/*.astro`, `src/layouts/**`, `src/components/**` (except `components/seo/**`)
- `src/styles/**` (tokens, `@theme`, motion CSS vars), `src/scripts/motion/**`, `src/scripts/ui/**`
- `src/content/*.ts` copy (except `types.ts`, `privacy.ts`)
- `src/assets/images/**` (generate per `docs/IMAGE-BRIEF.md`), `public/brand/**`, favicons

Claude owns: `.github/**`, ESLint/Prettier config, Lighthouse/Vercel config, `tests/**`,
`src/lib/**` (form, SEO), `src/components/seo/**`, `src/scripts/form.ts`, `src/content/privacy.ts`, `docs/PLAN.md`.

**Shared — coordinate first** (task + flag in PROGRESS): `src/content/types.ts`, `package.json`
(you may add deps listed in MOTION.md §1 without asking), `astro.config.mjs`, `tsconfig.json`.

## Session ritual
Work in **this folder** (`D:\DEV WORKS\XTS PROJECT DEVS\XTS LadingPage`); Claude uses its own worktree — never switch Claude's branches.
Start: `git switch main && git pull` → read docs → claim a task (`owner: codex · status: in-progress`) → `git switch -c codex/<task>`.
Work: one section or concern per branch. Desktop + mobile together.
Ship: `npm run verify` green → screenshots 375/768/1440 into `docs/review/<branch>/` → `gh pr create` (screenshots in body) → Claude reviews → squash-merge.
End: append `PROGRESS.md` (append-only, newest on top) → task `done`/`blocked`/`review`.
Coordination-only edits (TASKS/PROGRESS/DECISIONS) may go straight to `main`.

## Ground rules
- Follow the phase you're in (DEV-FLOW): **P1 draft = layout + type + real copy, no motion/polish.** Don't skip ahead before the gate passes.
- Tokens only — no stray hex/px values outside `src/styles`. Michroma for H1 + eyebrows only.
- Content comes from `src/content/*`; components don't hardcode copy.
- A11y is part of "done": semantic HTML, focus-visible, keyboard paths, alt text, reduced motion.
- Motion: follow MOTION.md tokens + budget; animate transform/opacity/clip-path only.
- Company facts are fixed (HANDOVER): don't invent figures, clients or results. Don't touch xzentechsolutions.com DNS.
- Never commit secrets. Don't reverse a DECISIONS entry — propose a task.
- Write files with LF line endings and plain text (watch PowerShell escapes like `` `n `` inside strings).
