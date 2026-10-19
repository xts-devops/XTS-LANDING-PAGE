# XTS site — Plan v2 (2026-10-19)

**Brief (user, 2026-10-19):** Codex's pre-merge look as the base, plus Claude's motion and quality work.
Simple and straight to the point, but enticing. The site itself must *prove* the build standard:
smooth transitions, fast responses, polished detail. Use real-life imagery, not drawn graphics.
Services open into their own pages with realistic system showcases. Robotics gets real photos and
an exploded-view centrepiece. Database + deployment come after the UI is final.

Supersedes PLAN v1.3 §1–3 (structure). Stack (§5), tokens (§4) and budgets (MOTION §6) stay.

---

## 1 · The story a visitor scrolls through

```
HOME  /
  1 Hero            real photo (night office) · headline · 2 CTAs · proof (300+ / 200+)
  2 Services        4 large photo tiles → each opens its own page (shared-element transition)
  3 Work            selected projects: horizontal, drag/scroll gallery of real project shots
  4 Global reach    where we've delivered: map + regions/countries + short quotes   ⚠ needs facts
  5 Start a project contact form + direct email/phone
  Footer

SERVICE PAGES  /services/<slug>
  business-systems   system switcher (ERP · POS · CRM · WMS · Inventory · HR/Payroll)
                     → each tab = slideshow of realistic MVP screens + 3 key features
  custom-software    web apps · mobile apps · portals → device-framed screen slides
  automation         integrations · dashboards · workflow bots → screens + flow photos
  robotics           exploded robotic-arm centrepiece (scroll-scrubbed) + real photo gallery:
                     tinkering bench · factory robots · lab · Arduino builds · drones · custom devices
  Every service page ends with "Start a project" (prefills the form's need).
```

**Cut from v1 (simpler):** Industries selector and Process timeline as separate sections. Industries
become tags on Work items. Process becomes one line in the contact section ("Consult → Design →
Build → Support"). The proof bar folds into the hero.

## 2 · "Show, don't tell": capability moments (one per screen, not everywhere)

| Where | Moment | Tech | Why it sells |
|---|---|---|---|
| Hero | Photo slow push-in + headline mask reveal; console-style live stat ticks | CSS only (LCP-safe) | Instant, cinematic first impression |
| Services → page | **Shared-element morph**: the tile photo expands into the service page hero | Astro View Transitions (`<ClientRouter />`, ~3 KB) | Feels like a native app |
| Business systems | Tabs switch systems; slides cross-fade with a clip wipe; keyboard + swipe | vanilla TS + CSS scroll-snap | Shows real product UIs |
| Work | Horizontal gallery that scrolls with the page (pinned) on desktop, swipe on mobile | GSAP ScrollTrigger | Smooth, premium |
| Robotics | **Exploded robotic arm** that comes apart as you scroll | scroll-scrubbed all-keyframe video (or image sequence) | The memorable centrepiece |
| Everywhere | Lenis smooth scroll, instant prefetched navigation, 60 fps | already built | "Fast response" |

Restraint rule: no fade-up on every card. Reveals only on section headings and media.

## 3 · Imagery: real-life only

- **Photos** (people, offices, factories, labs, devices): generated photoreal by Codex, or licensed stock. Specs in `docs/IMAGE-BRIEF-v2.md`.
- **Product screens** (ERP/POS/…): *real HTML UIs* built by Codex in `showcase-ui/` with believable fictional data, then captured to AVIF by `npm run capture:ui` (Playwright). Pixel-sharp and honest ("sample system"), and Codex can update them any time.
- Coded schematics from v1 are retired (kept in git history).
- All images go through `astro:assets` → AVIF/WebP, responsive `srcset`, lazy below the fold.

## 4 · Exploded robotic arm: approach

Best realism for the lowest weight: a **pre-rendered sequence, scrubbed by scroll**, not live 3D.

| Option | Realism | Weight to visitor | Needs |
|---|---|---|---|
| **A · Blender render** of a licensed GLB robotic arm with an exploded animation → 90-frame all-keyframe WebM/MP4 (~2–4 MB, lazy) | ★★★ exact, loops cleanly | lazy, robotics page only | Blender installed + a model (Sketchfab CC-BY / CGTrader) |
| **B · AI image-to-video** (Higgsfield / Kling / Runway / Veo) from a photoreal arm still → 5 s clip, re-encoded for scrubbing | ★★☆ photoreal, geometry may drift | same | a video-gen account (MCP if available) |
| C · Live three.js + Draco GLB | ★★☆ interactive | +150 KB JS + 1–3 MB model, GPU cost | model |

Plan: build the scrubbing player now with a placeholder clip and poster, then drop in A or B.
Reduced motion → static exploded poster. Mobile → shorter, lower-res source.

## 5 · Budgets (unchanged, enforced in CI)

Home: LCP ≤ 2.0 s, CLS ≤ 0.02, JS ≤ 70 KB gz, Lighthouse Perf ≥ 0.95.
Service pages: same, except robotics may lazy-load its centrepiece media after first paint.

## 6 · Facts needed from XTS (nothing invented)

1. **Work:** 4–8 projects to show. For each: sector, country, what was built, and whether the client may be named. Anonymised is fine.
2. **Global reach:** countries/regions actually delivered to, and any quotes we may use.
3. Systems to list per service (default lists in §1).

## 7 · Ownership for v2

Claude: structure, pages, motion, transitions, media players, form, tests, perf.
Codex: photoreal image set + `showcase-ui/` sample system UIs (`docs/CODEX-BRIEF-v2.md`), then UI polish via PRs.
