# MOTION — system & choreography

Goal: premium, cinematic, **calm**. Motion explains hierarchy and makes the page feel alive.
It never blocks reading, never hijacks scrolling, and never costs speed.
Mood words: *precise · warm · engineered · confident*. Think control-room UI, not a showreel.

## 1 · Stack
| Tool | Use | Size (gz) |
|---|---|---|
| **GSAP 3.15** core | Timelines, hero sequence | ~24 KB |
| **ScrollTrigger** | Scroll-linked reveals, process line scrub, parallax | ~12 KB |
| **SplitText** | Headline line/word reveals | ~4 KB |
| **DrawSVGPlugin** | Process timeline + dashboard chart lines | ~2 KB |
| **Lenis 1.3** | Smooth wheel scrolling (desktop only), synced to ScrollTrigger | ~3 KB |
| CSS | Hover, focus, cursor spotlight, sheen, all micro-interactions | 0 |

All GSAP plugins are free under GSAP's standard licence (commercial OK). No React, no WebGL in
v1. Load GSAP **only** from `src/scripts/motion/*` (one entry, `type="module"`, deferred).

## 2 · Tokens (in `src/styles` as CSS vars **and** `src/scripts/motion/tokens.ts`)
| Token | Value | Use |
|---|---|---|
| `--dur-1` | 160ms | hover, press, focus |
| `--dur-2` | 320ms | small UI changes, tab switch |
| `--dur-3` | 640ms | element reveals |
| `--dur-4` | 1100ms | headline / hero / image reveals |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` (expo-out) | default for entrances |
| `--ease-inout` | `cubic-bezier(.65,0,.35,1)` | crossfades, wipes |
| stagger | 60ms (items) · 80ms (cards) · 120ms (lines) | |
| distance | 24px (y-reveal) · 8% (image scale-in from 1.08) | |

Rule: entrances use `ease-out`; nothing bounces; nothing exceeds 1.2s except the hero sequence.

## 3 · Choreography by section

**Global**
- Page load: no full-screen preloader. Fonts preloaded so the first paint is final.
- Header: transparent over hero → on scroll >24px: `--surface` 70% + backdrop-blur + 1px line fades in (CSS, `--dur-2`). Active section link gets a gold underline that slides between links.
- Ambient: very subtle film grain (static CSS noise, 3% opacity) + a soft gold radial glow behind the hero.
- Cursor spotlight on cards: radial gradient following pointer via CSS vars (`--mx/--my`), desktop only.

**1 · Hero — the signature moment (~1.6s total)**
1. 0ms: eyebrow letters fade + tracking 0.6em → 0.32em.
2. 150ms: H1 lines rise from a mask (SplitText lines, `--dur-4`, stagger 120ms); "REAL GROWTH" gold gradient sweeps left→right once.
3. 500ms: sub copy + CTAs fade-up (stagger 60ms).
4. 400ms (parallel): **living dashboard** — coded SVG/HTML panels (not a flat image) over a blurred night-city photo:
   - panels slide in with slight depth (y + scale .96→1, stagger 80ms);
   - KPI numbers count up; bar chart bars grow; line chart draws (DrawSVG); world-map dots pulse once then idle at a slow loop.
5. Idle: dashboard floats with pointer parallax (±6px, desktop) and scroll parallax (moves 12% slower than page).
6. Proof bar: on enter, 300+ / 200+ count up (1.2s), text proofs fade in, divider lines draw.

**2 · Solutions**
- Section head: eyebrow + H2 SplitText line reveal (shared pattern for every section head).
- Cards: stagger fade-up 80ms; image inside does clip-path reveal (inset 100% → 0 from bottom) + scale 1.08→1.
- Hover: image scale 1.04, gold border glow (1px line → gold 40%), icon nudges 2px, chips brighten. Focus-visible = same state + ring.

**3 · Showcase**
- Large card enters first, the two stacked cards follow (stagger 120ms).
- Images: slow scroll parallax inside the frame (±6%).
- Hover: 3D tilt ≤ 4° (pointer-driven, desktop), sheen sweep across the image once.

**4 · Industries selector**
- Switch: outgoing image fades/scales to 1.02, incoming wipes in with clip-path (`--ease-inout`, `--dur-3`); text crossfades with 8px y. Active row: gold bar grows from the left.
- Auto-advance off (user-driven only). Keyboard: arrows move, Enter/Space select (tabs pattern).
- Mobile: native scroll-snap carousel, no JS animation.

**5 · Process**
- 3 principles fade-up.
- Timeline: connecting line draws with scroll (ScrollTrigger scrub, DrawSVG); each node's gold ring fills as the line reaches it; step text fades up at the same moment.
- Mobile: vertical line, same behaviour.

**6 · Contact**
- Headline reveal; form card rises.
- Inputs: label floats, gold underline grows on focus (`--dur-2`).
- Submit: button → spinner morph → ✓ check draw on success; shake 6px ×2 on error (skipped under reduced motion).

**Buttons (global)**: primary has a gold sheen sweep on hover; arrow icon slides 3px; magnetic pull ≤ 6px on desktop.

## 4 · Reduced motion & input modes
- `prefers-reduced-motion: reduce` → no Lenis, no parallax, no tilt, no SplitText; reveals become 200ms opacity fades; counters show final values; process line shown fully drawn.
- Implement with `gsap.matchMedia()` so both branches live side by side.
- Touch / `(hover: none)`: no cursor spotlight, tilt, magnetic or pointer parallax.
- Content must be **visible without JS**: hide-before-reveal only via a `.js` class on `<html>`.

## 5 · Implementation rules
- Animate only `transform`, `opacity`, `clip-path`, `filter: blur` (sparingly). Never layout properties.
- One `ScrollTrigger` per section head/group, not per element; use `batch()` for card grids.
- Kill/refresh triggers on resize via `ScrollTrigger.refresh()` after images load; reserve image space (width/height) to avoid shifts.
- Anchor links use Lenis `scrollTo` with header offset.
- Pause hero idle loops when off-screen (`IntersectionObserver`) and when the tab is hidden.

## 6 · Budget (Claude verifies at G3)
- Total JS ≤ **70 KB gz** (GSAP + plugins + Lenis + our code).
- LCP ≤ 2.0s · CLS ≤ 0.02 · INP ≤ 150ms on Lighthouse mobile (Moto G Power, slow 4G).
- 60 fps on scroll at 1440 (Chrome perf panel, no long tasks > 50ms during scroll).
- Lighthouse Performance ≥ 95 with motion enabled.

## 7 · Attribute contract (declarative motion, D19)
Markup **declares** motion and one engine (`src/scripts/motion/index.ts`) applies it. Sections then
need no motion code of their own, and P3 becomes mostly one module. Attributes are inert until the
engine loads, so they can go into markup any time (P2-b).

| Attribute | On | Effect |
|---|---|---|
| `data-reveal="up \| fade \| clip \| scale"` | any element | Enters on scroll (`up` = 24px + fade; `clip` = inset reveal for images; `scale` = 1.08→1 inside its frame) |
| `data-reveal-group` | parent | Children with `data-reveal` stagger (`ScrollTrigger.batch`); optional `data-stagger="80"` (ms) |
| `data-delay="150"` | with `data-reveal` | Extra delay (ms) |
| `data-split="lines \| words"` | headings | SplitText mask reveal; the real text stays in the DOM for SEO and screen readers |
| `data-count` | element whose text is the **final** value, e.g. `<span data-count>300+</span>` | Counts up from 0 on enter; the number and suffix are parsed from the text, so no-JS shows the final value |
| `data-draw` · `data-draw="scrub"` | SVG `path`/`line` | DrawSVG on enter, or scrubbed with scroll (process line) |
| `data-parallax="0.12"` | element | Moves at (1 − n) × scroll speed; desktop only |
| `data-tilt` · `data-magnetic` · `data-spotlight` | cards · buttons · card grids | Pointer effects; `(hover: hover)` only |
| `data-hero` | hero root | Hands off to `hero.ts` for the bespoke sequence (§3.1) |
| `data-motion="off"` | any subtree | Engine skips it |

**Engine rules**
- `<html class="no-js">` is replaced by `js` inline in `<head>`. CSS hides `[data-reveal]` **only** under
  `.js` + `(prefers-reduced-motion: no-preference)`, so no-JS and reduced-motion users never see hidden content.
- **Load GSAP lazily**: `index.ts` checks `matchMedia('(prefers-reduced-motion: reduce)')`. When it's reduced,
  it only adds the final state and never downloads GSAP/Lenis (0 KB). Otherwise it `import()`s GSAP plus the plugins
  in use, and loads Lenis only for `(pointer: fine)`.
- One `ScrollTrigger.batch` per `data-reveal-group`. Never one trigger per element.
- `ScrollTrigger.refresh()` after fonts and images settle; kill everything on `astro:before-swap` if view transitions are ever added.
