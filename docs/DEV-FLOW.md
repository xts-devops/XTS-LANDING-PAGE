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

## Working mechanics

### 1 · One folder per agent (no shared working tree)
Both agents in one folder = one switches branch under the other. So:
- **Codex** works in `D:\DEV WORKS\XTS LadingPage` (the main folder).
- **Claude** works in a git worktree: `D:\DEV WORKS\XTS LadingPage-claude`.
Same repo, separate checkouts; GitHub `main` is the meeting point.

### 2 · Branch → PR → review → merge
1. `git pull` on main → `git switch -c codex/<task>` (or `claude/<task>`).
2. Small PRs, **one section or one concern per PR** (e.g. `codex/p1-hero`, `codex/p1-solutions`).
3. `npm run verify` green, then `gh pr create` with screenshots (see §3) in the body.
4. The other agent reviews with `gh pr review` (approve / request changes). User has final say at gates.
5. Squash-merge to `main`, delete branch, append `PROGRESS.md`.

Coordination docs (TASKS, PROGRESS, DECISIONS) can be committed straight to `main` — tiny,
frequent commits. `PROGRESS.md` uses git's union merge (`.gitattributes`), so two agents
appending at once won't conflict.

### 3 · Screenshots for every UI PR
`npm run shots` (Claude adds it in T23) → Playwright captures the page at 375 / 768 / 1440 into
`docs/review/<branch>/`. Until it exists, Codex uses its browser tool and saves screenshots
there by hand. Reviewers look at the images first, code second.

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
