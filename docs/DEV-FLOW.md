# DEV FLOW — top-down, UI first

How Codex and Claude build the XTS site. **Top-down**: get the whole page on screen as a
draft first, approve the composition, then raise fidelity, then add motion, then harden.
Backend is small (static site + one form), so the effort goes into UI/UX and motion.

```
P0 Foundation ─► P1 Draft UI ─► G1 ─► P2 Hi-fi UI ─► G2 ─► P3 Motion ─► G3 ─► P4 Harden ─► P5 Launch
   (codex)        (codex)            (codex)              (codex)             (claude)      (both)
                         └──────── claude: reviews every gate + parallel backend prep ────────┘
```

## Roles (D15)
| | **Codex — UI/UX lead** | **Claude — architecture, backend, quality** |
|---|---|---|
| Builds | Layout, components, sections, styles/tokens, motion, images, copy | Form, SEO, CI, tests, perf budget, deploy, config |
| Reviews | — | Every UI PR: design, a11y, perf, code |
| Owns paths | see `AGENTS.md` | see `CLAUDE.md` |

## Phases & gates

### P0 · Foundation — Codex (in progress)
Scaffold, deps, tokens, fonts, brand assets. **Done when** `npm run verify` passes on `main`.

### P1 · Draft UI — Codex
Whole page, all 6 sections + header/footer, at **real** layout/type/spacing/tokens with real
copy. Images = tonal placeholders (gradient blocks with the target aspect ratio). **No motion,
no hover polish.** Desktop **and** mobile from the start.
Aim for speed: the point is to judge composition, hierarchy and rhythm.

**G1 · Composition gate** — user + Claude. Screenshots at 375 / 768 / 1440 vs. the mockup.
Questions: right sections in the right order? hierarchy clear? density right? CTA obvious?

### P2 · Hi-fi UI — Codex
Final components + every state (hover, focus-visible, active, disabled, form idle/sending/
success/error), generated image set (IMAGE-BRIEF), hero dashboard composition (static),
industries selector working (keyboard included), micro-detail (borders, glows, grain).

**G2 · Visual gate** — user + Claude. Pixel review + Claude's a11y/contrast/semantics pass.

### P3 · Motion — Codex
Implement `docs/MOTION.md`: motion tokens, hero sequence, scroll choreography, micro-
interactions, reduced-motion variants.

**G3 · Motion gate** — user + Claude. Screen recording or preview link. Claude checks the
perf budget (MOTION §6) on a throttled mobile profile.

### P4 · Harden — Claude (Codex fixes UI findings)
Form wiring + provider, SEO/JSON-LD/OG, privacy page copy, Lighthouse CI budget, Playwright
smoke + visual-regression baselines, CI on PRs, Vercel deploy.

### P5 · Launch — both
Final content check, cross-browser (Chrome, Safari iOS, Firefox, Samsung Internet), real-device
pass, production deploy on the Vercel URL. Domain cutover stays T40 (later).

### Claude's parallel track (during P1–P3, no UI files touched)
Form provider spike (T07) · `src/lib/form.ts` + zod schema · SEO helper + JSON-LD · Playwright
+ Lighthouse CI harness · CI on PRs · reviewing Codex PRs. Ready to plug in at P4.

---

## Remaining Codex work: optimized plan (D19, 2026-10-16)

**Situation:** the P1 draft is built, but split over 7 local stacked branches. PR #5 (scaffold) and
Claude's #2→#3→#4 are open and nothing is on `main`. The bottleneck is **merging and reviewing**,
not building. So: fewer, bigger, well-tested PRs, and never idle while a gate is open.

### Step 0 · Merge train (do first, ~30 min)
1. Claude approves **#5** → Codex squash-merges it.
2. Merge **#2 → #3 → #4** in order (each auto-retargets to `main`; all CI-green). Codex may approve them.
3. `codex/p1-composition` (it already contains every P1 commit): `git rebase origin/main`. Resolve
   TASKS/PROGRESS by keeping both sides. **Delete the 6 intermediate `codex/p1-*` branches.**
4. In `Base.astro`: `<Seo title description />` (from #3), `<html class="no-js">` + inline
   `document.documentElement.classList.replace('no-js','js')`, and a skip link.
5. Run the **full local gate** (below) → open **one PR: "P1 draft"** → G1.

### Full local gate (every PR, replaces ad-hoc checks)
`npm run verify && npm run test:e2e && npm run shots`. Before P3 PRs, also run
`npm run build && npm run test:lighthouse`. CI repeats all of it; the PR body links the
`review-shots-pr<N>` artifact.

### Never idle at a gate: work that's safe while G1/G2 are under review
Nothing below depends on the composition decision:
- **T18 images**: ratios are fixed in IMAGE-BRIEF. Start the hero backdrop + 4 pillar images during G1.
- **Favicon + OG (T05 / T18)**: derive from the raster mark now (crop the "A" mark → 512px PNG →
  `favicon.svg` (raster-embedded is fine) + `favicon.ico` 32px + `apple-touch-icon.png` 180px).
  Swap in the vector when XTS sends it. Don't stay blocked.
- **Motion engine (T20)**: build `src/scripts/motion/` against the attribute contract in
  MOTION §7. It's invisible until sections carry the attributes.

### PR plan after G1: 4 PRs, 2 gates
| PR | Contents | Gate |
|---|---|---|
| **P2-a · Imagery** | T18 image set (AVIF/WebP via `astro:assets`), favicon set, `public/og/og-default.jpg` 1200×630 | — |
| **P2-b · Interaction & detail** | T19 hero living dashboard (static SVG, animation hooks per MOTION §7), T21 all states (hover / focus-visible / active / disabled / form idle-sending-success-error), industries selector JS (tabs pattern), privacy page layout (T17), **MOTION §7 attributes added to all markup** | **G2** |
| **P3-a · Motion engine + reveals** | GSAP/Lenis, attribute engine, reduced-motion + no-JS branches, section reveals, count-up, header state | — |
| **P3-b · Signature moments** | Hero sequence + dashboard animation, process line scrub, industries transitions, showcase tilt/parallax, buttons/spotlight/magnetic, form submit states | **G3** |

That's ~20 task-sized PRs down to **5** (P1 + 4), with gates only where the user's eye is needed.

### Rules that save rework
- Build states **into the primitives** (Button, Card, Chip, inputs) when they're touched. Don't do a separate states pass.
- Put motion attributes in the markup in P2-b, so P3 is mostly one engine, not edits to 9 sections.
- Form markup: keep field `name`s = `name, email, company, need, message, consent, botcheck`
  (T30 wires them; D18). Leave `<form data-form="inquiry" novalidate>` free of submit logic. Claude owns `scripts/form.ts`.
- No new deps beyond MOTION §1 without a task.

---

## Working mechanics

### 1 · One folder per agent (no shared working tree)
Both agents in one folder = one switches branch under the other. So:
- **Codex** works in `D:\DEV WORKS\XTS PROJECT DEVS\XTS LadingPage` (the main folder).
- **Claude** works in a git worktree: `D:\DEV WORKS\XTS PROJECT DEVS\XTS LadingPage-claude`.
Same repo, separate checkouts; GitHub `main` is the meeting point.

### 2 · Branch → PR → review → merge
1. `git pull` on main → `git switch -c codex/<task>` (or `claude/<task>`).
2. One concern per PR, batched per D19 (P1 draft · P2-a · P2-b · P3-a · P3-b), not one PR per section.
3. Full local gate green, then `gh pr create` with the screenshot artifact linked (see §3).
4. The other agent reviews with **`gh pr review --comment`**. Both agents push as the same GitHub
   account (`BFC-XZEN`), and GitHub blocks approving your own PR. So the verdict goes on the comment's
   first line: **`✅ approved`** or **`❌ changes requested`**. A ✅ comment counts as approval. User has final say at gates.
5. Squash-merge to `main`, delete branch, append `PROGRESS.md`.

Coordination docs (TASKS, PROGRESS, DECISIONS) can be committed straight to `main` — tiny,
frequent commits. `PROGRESS.md` uses git's union merge (`.gitattributes`), which works for
**local** merges only. **GitHub ignores it**, so a PR touching PROGRESS.md can show as conflicting.
Fix it locally: `git fetch && git merge origin/main` on the PR branch (the union applies) → push.
Never commit build output: `git status` before `git add -A`, and only add when `.gitignore` covers `dist/` and `.astro/`.

### 3 · Screenshots for every UI PR
`npm run shots` → builds, serves the production build, and captures a full-page PNG **plus one
PNG per section** (`main section[id]`, `header`, `footer`) at 375 / 768 / 1440 into
`docs/review/<branch>/<page>/<width>/`. Every `<section>` needs an `id` for this.
- `docs/review/` is **git-ignored** — screenshots never go into history.
- CI runs the same script on every PR and uploads artifact **`review-shots-pr<N>`** (14 days).
  Link it in the PR body; reviewers look at the images first, code second.
- Extra pages: `SHOTS_PATHS=/,/privacy npm run shots`.

### 4 · Review checklist (Claude applies at each gate)
- **Composition**: hierarchy, rhythm (120/72px), alignment to grid, density, CTA prominence.
- **Brand**: tokens only (no stray hex), Michroma only for H1/eyebrows, gold used sparingly.
- **A11y**: semantic landmarks + heading order, focus-visible on everything interactive,
  contrast AA, alt text, keyboard path through selector + form, reduced motion.
- **Responsive**: 375 / 768 / 1024 / 1440, no horizontal scroll, tap targets ≥ 44px.
- **Perf**: image sizes/format, no layout shift, JS budget, fonts preloaded.
- **Code**: copy from `src/content/*`, no dead code, components small and reusable.

---

## Tooling (practical, already available)

| Need | Codex | Claude |
|---|---|---|
| Up-to-date docs (Astro 7, Tailwind 4, GSAP) | Add Context7 MCP (snippet below) | Context7 plugin ✅ |
| See the page | `browser` plugin ✅ | Playwright MCP + in-app browser ✅ |
| Generate images (IMAGE-BRIEF) | built-in image generation ✅ | — |
| Design critique | — | `frontend-design` skill ✅ |
| Code review | `code-review` plugin ✅ | `code-review` skill + `gh pr review` ✅ |
| PRs / repo | `gh` (authed as BFC-XZEN) ✅ | `gh` ✅ |
| Lighthouse / a11y | — | Lighthouse CI + axe in Playwright (T24) |

Optional Codex upgrade — add Context7 docs to `~/.codex/config.toml`:
```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
```

> **Moved the folders?** Git worktrees store absolute paths. After moving both folders, run
> `git -C "<main folder>" worktree repair "<claude worktree>"` once (done 2026-10-17 for the move into `XTS PROJECT DEVS`).
