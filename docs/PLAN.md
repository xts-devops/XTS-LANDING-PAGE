# XTS Landing Page — Plan v1.3

Source mockup: [`docs/reference/mockup-v1.webp`](reference/mockup-v1.webp). We keep its
look (black + warm gold, cinematic night-office photography, wide display type) and fix its
structure.

> **v1.3 (2026-10-16)** — UI-first dev flow ([`DEV-FLOW.md`](DEV-FLOW.md)), motion system ([`MOTION.md`](MOTION.md)), lanes swapped (D15). **v1.2** — stack switched to Astro (§5). **v1.1** — updated with XTS answers: only two public figures, no client
> projects disclosed, no partner logos, contact details confirmed, domain reserved for later.
> Result: one fewer section, a "Showcase" instead of case studies, shorter nav.

---

## 1. What changes vs. the mockup (and why)

| Mockup | Problem | Plan |
|---|---|---|
| 7 solution cards | 3 cards overlap (Business Systems ≈ POS/CRM/ERP/WMS ≈ Enterprise); "Implementation & Support" repeats Process. | **4 solution pillars**, 2×2 grid. Support lives in Process. |
| Hero badges **and** stats band (50+ / 20+ / 100% / 24/7) | Two trust strips back to back; vanity stats. | **One proof bar**: 2 real figures + 2 qualitative proofs (§3.1). |
| 6 industry cards incl. "Enterprise & Corporate" | Enterprise is a size, not an industry; image-heavy. | **5 industries** in a selector with one swapping image. |
| "Projects" nav + "View Our Work" | Nothing to show; client work stays confidential. | **Showcase**: 3 anonymised *solution* showcases with generated presentation visuals — no client names, no invented results. |
| Why-XTS badges + partner logos | No partner logos allowed; a section of 3 badges alone is thin. | **Merged into Process** as a 3-point intro row. Section removed. |
| Final CTA, no form | No conversion point. | CTA + **short inquiry form** + direct contact. |

Net: 8 content sections → **6**, ~22 tiles → ~11.

---

## 2. Final page structure

```
0  Header (sticky)      Logo · Solutions · Showcase · Industries · Process · Contact · [Let's Build]
1  Hero  #top           Eyebrow · H1 · sub · 2 CTAs · dashboard visual
   └ Proof bar          300+ business systems · 200+ robotics & automation · end-to-end · PH-based
2  Solutions  #solutions     4 pillars, 2×2 image cards
3  Showcase   #showcase      3 anonymised solution showcases (1 large + 2 stacked)
4  Industries #industries    5-item selector + swapping image panel
5  Process    #process       3 "why XTS" points + 5-step timeline
6  Contact    #contact       CTA headline · inquiry form · email / phone / location
7  Footer
```

---

## 3. Section specs

### 1 · Hero
- Eyebrow: `TECHNOLOGY · PEOPLE · REAL IMPACT`
- H1: `Technology solutions built for` **`real growth`** (gold gradient on last two words).
- Sub: *We engineer, build, and implement intelligent systems — from business platforms and custom software to automation and robotics.*
- CTAs: `Book a Consultation →` (solid gold → #contact) · `Explore Solutions` (outline → #solutions).
- Visual: **living dashboard** — coded SVG/HTML glass panels (KPIs, bar + line charts, world map) layered over a blurred night-city/desk photo (right 55%), fades into bg at bottom. Animated per MOTION.md §3.

### 3.1 · Proof bar (under hero)
| Value | Label | Type |
|---|---|---|
| **300+** | Business systems delivered | count-up |
| **200+** | Robotics & automation projects | count-up |
| **End-to-end** | Strategy → build → support | text |
| **PH-based** | Serving clients across the Philippines | text |

Only these two figures are public. Do not add other numbers without XTS approval.

### 2 · Solutions — 4 pillars
| Pillar | One-liner | Chips | Image |
|---|---|---|---|
| **Business Platforms** | Configured, integrated POS, CRM, ERP and WMS — for growing teams up to enterprise scale. | POS · CRM · ERP · WMS · Inventory | Tablet POS + dashboards on a counter |
| **Custom Software** | Web, mobile and internal tools built around how you actually work. | Web apps · Mobile · Portals · Internal tools | Developer monitors with code, city view |
| **Automation & Integration** | Connect your systems, automate processes, and remove manual work. | APIs · Workflows · Data pipelines · AI | Node/flow diagram on a screen |
| **Robotics, R&D & Prototyping** | Research, engineering and rapid prototyping for advanced technology. | Robotics · IoT · Hardware · PoC | Robotic arm in a lab |

Card: image top (16:10), icon + title + one-liner + chips. Hover: image zoom 1.04, gold border glow. Under grid: *"Implementation, training and long-term support included with every engagement."*

### 3 · Showcase (replaces case studies)
Eyebrow `SOLUTION SHOWCASE` · H2 `What we build` · note: *"Client engagements are confidential — these showcases illustrate the kind of systems we deliver."*

| Showcase | Tag | Capability bullets (no metrics) | Visual (generated) |
|---|---|---|---|
| **Unified Retail Operations** (large card) | Business Platforms · Retail | Multi-branch POS · Real-time inventory · Sales dashboards | POS + inventory dashboard UI mock on tablet & monitor |
| **Smart Warehouse Flow** | Automation · Logistics | WMS + barcode/RFID · Pick-path automation · Live stock visibility | Warehouse with handheld scanners + WMS screen |
| **Automated Production Cell** | Robotics · Manufacturing | Robotic handling · Sensor monitoring · Line dashboards | Robot arm cell with control-room screen |

Card: image, tag, title, 3 bullets, `Discuss a similar project →` (→ #contact, prefills the form's "need" field). **No client names, logos, or outcome numbers** — illustrative only.

### 4 · Industries — selector
Left: 5 rows (icon + name). Right: large image + 2-line description + 3 example solutions.
Retail & E-commerce · Manufacturing · Logistics & Supply Chain · Healthcare · Government & Public Sector.
Mobile: horizontal swipe carousel of image cards.

### 5 · Process (+ Why XTS)
- Eyebrow `OUR PROCESS` · H2 `From vision to real-world impact`.
- Intro row, 3 points: **One partner, end to end** · **Industry-first thinking** · **Built to last** (support after go-live).
- Timeline: Consult → Design → Build → Implement → Support. Gold-ring nodes joined by a line that draws in on scroll. Each: icon, title, 1-line description.

### 6 · Contact
Left: eyebrow `LET'S BUILD WHAT'S NEXT` · H2 `Your technology partner for a smarter tomorrow` · direct contact:
- ✉ `info@xzentechsolutions.com` (mailto)
- ☎ `0969 244 2557` (tel:`+639692442557`)
- ⌖ Philippines-based · serving clients nationwide

Right: form card — Name, Email, Company (optional), "What do you need?" (select: 4 pillars + Other), Message, `Send inquiry →`. States: idle / sending / success / error (error shows the email as fallback). Spam: honeypot + rate limit.

### 7 · Footer
Logo + one-liner · section links · contact block (same 3 lines) · © 2026 XZEN TECH SOLUTIONS · Privacy · Terms.

---

## 4. Design system

**Colour tokens**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0A0B` | page |
| `--surface` | `#131315` | cards |
| `--surface-2` | `#1B1B1E` | raised / inputs |
| `--line` | `#2A2A2E` | borders, dividers |
| `--text` | `#F3F0E8` | primary text (warm white) |
| `--muted` | `#9B978E` | body copy, captions |
| `--gold` | `#E9A944` | accent, CTAs |
| `--gold-hi` | `#F7C873` | gradient top / hover |
| `--gold-lo` | `#B97A24` | gradient bottom |

Dark-only. Gold on `--bg` for large text and accents; body text stays `--text`/`--muted`.

**Type**: Display **Michroma** (H1 + eyebrows, uppercase). Text/UI **Manrope** 400–700. Eyebrows 12px, tracking 0.32em, gold.

**Layout & motion**: 1200px container, 24px gutters (16px mobile), 120px section rhythm (72px mobile). Cards: 1px `--line`, 16px radius. Fade-up reveals via Motion, `prefers-reduced-motion` respected, no scroll-jacking.

**Imagery**: one grade — night interiors, tungsten + amber screen glow, deep shadows. All imagery is generated "presentation" visuals; see [`IMAGE-BRIEF.md`](IMAGE-BRIEF.md).

---

## 5. Stack & architecture

**Scope:** marketing site only (landing page, later maybe blog/careers/service pages) · English only · text edited in code by devs/agents (no CMS) · repo on GitHub.

```
Browser ──► Vercel CDN (static HTML/CSS, near-zero JS)
             ├─ index.html   — Astro-rendered sections
             │    └─ tiny vanilla-TS scripts: header blur, industries selector,
             │       count-up, reveals, form submit
             ├─ privacy/     — Privacy Notice (RA 10173)
             └─ form ──► email provider (no-DNS) ──► info@xzentechsolutions.com
                         + Cloudflare Turnstile (spam)
```

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Astro 7** + TypeScript (strict) | `output: 'static'`. Add `@astrojs/vercel` only if a server endpoint is needed. |
| Interactivity | Astro components + inline `<script>` (vanilla TS) | **No UI framework** (no React). Each interaction is a few dozen lines. |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite`, tokens in `@theme` | `src/styles/global.css` |
| Motion | **GSAP 3.15** (ScrollTrigger, SplitText, DrawSVG) + **Lenis** smooth scroll (desktop) + CSS micro-interactions | Full spec + budget: [`MOTION.md`](MOTION.md) |
| Icons | Lucide via `@lucide/astro` | Rendered as inline SVG, zero JS |
| Fonts | Fontsource, self-hosted: `@fontsource/michroma`, `@fontsource-variable/manrope` | Preload display font; `font-display: swap` |
| Images | `astro:assets` `<Image>/<Picture>` → AVIF + WebP, responsive `srcset` | Sources in `src/assets/images/**` (not `public/`) so they're optimised |
| Content | Typed TS modules `src/content/*.ts` | Plain modules; contract in §6 |
| Form | **Web3Forms** (free, 250/mo), JSON POST from the browser — D18, `docs/spikes/T07-form-provider.md` | Keeps the site 100% static. Swap to Resend at domain cutover (T40). |
| Spam | Honeypot + min fill time; hCaptcha (lazy) only if spam appears | |
| Privacy | Consent checkbox on form + `/privacy` page | PH Data Privacy Act (RA 10173) |
| Analytics | Vercel Web Analytics (cookie-free) | No cookie banner needed |
| SEO | `@astrojs/sitemap`, meta/OG in `Base.astro`, JSON-LD `Organization` | `site` from `PUBLIC_SITE_URL` |
| Quality gate | `npm run verify` = `astro check` + ESLint (`eslint-plugin-astro`) + Prettier check + `astro build` | |
| Tests | Playwright smoke; Lighthouse CI (Perf ≥ 95, A11y ≥ 95, SEO 100) | |
| CI/CD | GitHub Actions runs `verify` + Playwright on every push/PR; Vercel deploys a preview per branch, production from `main` | Production = Vercel URL until T40 |
| Node | 22 LTS+ (`.nvmrc`), npm | Local machine has Node 24 |

**Env vars** (`.env.example` committed, `.env` ignored): `PUBLIC_SITE_URL`, `PUBLIC_FORM_ACCESS_KEY`. All are public-by-design keys; anything secret means we need a server endpoint — flag it first.

### Source layout
Ownership per D15 — **codex** = UI/UX, **claude** = architecture/backend/quality.
```
astro.config.mjs, package.json, tsconfig.json   # SHARED (claude after T01; codex may add deps approved in MOTION.md)
eslint/prettier, .github/, lighthouserc, vercel # claude
src/
  pages/index.astro, privacy.astro              # codex
  layouts/Base.astro                            # codex (claude supplies <Seo/> + JSON-LD components)
  components/
    ui/        Container, Section, Eyebrow, Button, Card, Chip, Icon   # codex
    sections/  Header, Hero, HeroDashboard, ProofBar, Solutions, Showcase,
               Industries, Process, Contact, Footer                   # codex
    seo/       Seo.astro, JsonLd.astro                                # claude
  scripts/
    motion/    index.ts, tokens.ts, hero.ts, reveals.ts, process.ts, lenis.ts   # codex
    ui/        header.ts, industries.ts, countup.ts, pointer.ts                # codex
    form.ts                                     # claude — wires Contact form to src/lib/form
  styles/global.css, tokens.css                 # codex — Tailwind @theme + motion tokens
  content/
    types.ts                                    # SHARED contract
    site.ts, pillars.ts, showcase.ts, industries.ts, process.ts   # codex
    privacy.ts                                  # claude
  lib/form.ts, seo.ts                           # claude
  assets/images/**                              # codex
public/brand/**, favicons                       # codex
tests/**                                        # claude
```

---

## 6. Content model (shared contract)

All copy lives in `src/content/*.ts`, typed by `src/content/types.ts`. Components never hardcode copy.

```ts
import type { ImageMetadata } from 'astro';
export type Img       = { src: ImageMetadata; alt: string };   // import from src/assets/images
// `icon` fields are Lucide icon names (kebab-case), resolved by components/ui/Icon.astro
export type Pillar    = { id: string; title: string; summary: string; chips: string[]; icon: string; image: Img };
export type Showcase  = { id: string; title: string; tags: string[]; bullets: string[]; image: Img; need: Pillar['id'] };
export type Industry  = { id: string; name: string; icon: string; summary: string; examples: string[]; image: Img };
export type Step      = { n: number; title: string; summary: string; icon: string };
export type Principle = { title: string; summary: string; icon: string };
export type Proof     = { kind: 'count'; value: number; suffix: string; label: string }
                      | { kind: 'text'; value: string; label: string };
export type Contact   = { email: string; phoneDisplay: string; phoneHref: string; location: string };
```

Canonical values (Codex puts these in `src/content/site.ts`):
```ts
contact = { email: 'info@xzentechsolutions.com', phoneDisplay: '0969 244 2557',
            phoneHref: 'tel:+639692442557', location: 'Philippines-based · serving clients nationwide' }
proof   = [ {kind:'count', value:300, suffix:'+', label:'Business systems delivered'},
            {kind:'count', value:200, suffix:'+', label:'Robotics & automation projects'},
            {kind:'text',  value:'End-to-end', label:'Strategy → build → support'},
            {kind:'text',  value:'PH-based',   label:'Serving clients across the Philippines'} ]
```

---

## 7. Milestones
1. **M0 Setup** — GitHub repo + CI, Astro scaffold, tokens, fonts, content types, logo in place.
2. **M1 Skeleton** — all 6 sections with placeholder content + images.
3. **M2 Polish** — generated image set, motion, responsive + a11y pass.
4. **M3 Ship** — form live, SEO/OG, Lighthouse budget, Vercel preview.
5. **Later** — domain cutover to xzentechsolutions.com (DNS, email sender, canonical URL).

## 8. Status of open questions
| # | Question | Answer |
|---|---|---|
| Q1 | Proof numbers | 300+ business systems · 200+ robotics & automation. Nothing else public. ✅ |
| Q2 | Case studies | None disclosed → anonymised Showcase with generated visuals. ✅ |
| Q3 | Contact | info@xzentechsolutions.com · 0969 244 2557 · Philippines-based ✅ |
| Q4 | Logo | XTS sending to Codex → `public/brand/`. ⏳ |
| Q5 | Partner logos | None → logo strip removed. ✅ |
| Q6 | Domain | xzentechsolutions.com, **reference only** — no DNS/config changes until cutover. ✅ |
| Q7 | Social links | Not shown for now — no social icons on the site. ✅ |
