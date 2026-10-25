# DECISIONS (ADR-lite)

Locked choices + why. Don't silently reverse — propose a task instead.
Append new decisions with a date + author.

### D1 · 2026-10-16 · claude · 4 solution pillars, not 7 cards
Business Platforms · Custom Software · Automation & Integration · Robotics/R&D. **Why:** three mockup cards overlapped (Business Systems / POS-CRM-ERP-WMS / Enterprise); Support duplicated the Process section.

### D2 · 2026-10-16 · claude · One proof bar; no vanity stats
Hero badges + stats band merged into one bar of real numbers. **Why:** duplicate trust strips; "100% commitment" isn't a metric.

### D3 · 2026-10-16 · claude · Add Featured Work + inquiry form
**Why:** nav and CTA promised "work" that didn't exist; page had no conversion point.

### D4 · 2026-10-16 · claude · Stack: Next.js 15 + TS + Tailwind v4 + Motion, deploy Vercel
**Why:** static-fast page with one server route for the form; both agents fluent in it.

### D5 · 2026-10-16 · claude · Content/UI seam = `src/content/types.ts`
All copy lives in typed content files (Codex); components only render (Claude). **Why:** lets both agents work in parallel without touching the same files.

### D6 · 2026-10-16 · claude · Dark-only brand, gold accent, Michroma + Manrope
Tokens in `docs/PLAN.md` §4. **Why:** matches the approved mockup look.

### D7 · 2026-10-16 · claude · Only two public figures
Proof bar shows **300+ business systems** and **200+ robotics & automation projects**; the other two slots are qualitative (End-to-end, PH-based). Supersedes the "3–4 real numbers" in D2. **Why:** XTS wants to disclose little. No new figures without XTS approval.

### D8 · 2026-10-16 · claude · "Showcase" instead of case studies
Three anonymised solution showcases with generated visuals, capability bullets only — no client names, logos, or outcome metrics. **Why:** client work is confidential; invented results would mislead.

### D9 · 2026-10-16 · claude · Why-XTS merged into Process; no partner logos
6 content sections total. Nav: Solutions · Showcase · Industries · Process · Contact. **Why:** no partner logos may be shown, leaving the section too thin to stand alone.

### D10 · 2026-10-16 · claude · Domain is reference-only for now
xzentechsolutions.com is live elsewhere. Don't change its DNS or hardcode it: site URL via `NEXT_PUBLIC_SITE_URL`, deploy to a Vercel preview URL, form delivery must work without domain verification. **Why:** user instruction; cutover is task T40.

### D11 · 2026-10-16 · claude · No social links for now
Footer and contact show no social icons; no `Social` content type. **Why:** user decision; add later as a task if XTS wants them.

### D12 · 2026-10-16 · claude + user · Astro 7, static, no UI framework (supersedes D4)
Marketing-only site, English only, text edited in code (no CMS), repo on GitHub. Astro + TS strict + Tailwind v4, vanilla-TS interactions, `astro:assets` images, Vercel hosting. Full stack in PLAN §5. **Why:** ~95% static content; Astro ships near-zero JS for the best speed. No portal/app planned, so Next.js's strengths aren't needed.

### D13 · 2026-10-16 · claude · Form = client-side POST to a no-DNS provider
Keeps the site fully static; no secrets. Provider (Web3Forms vs Formspree) picked in T07. Switch to Resend at domain cutover (T40). **Why:** D10 forbids DNS changes for now.

### D14 · 2026-10-16 · claude · Privacy compliance: consent + /privacy, cookie-free analytics
Form has a consent checkbox linking to `/privacy` (PH Data Privacy Act, RA 10173). Vercel Web Analytics only, so no cookie banner. **Why:** the form collects personal data.

### D15 · 2026-10-16 · user + claude · Lanes swapped: Codex = UI/UX lead, Claude = architecture/backend/quality (supersedes lane split in D5)
Codex builds all UI (pages, layouts, components, styles, motion, images, copy). Claude owns form, SEO, tests, CI, perf, deploy, specs, and reviews every UI PR. Content/UI seam from D5 stays (`src/content/types.ts` shared). **Why:** user wants top-down, UI-first development; the backend is small.

### D16 · 2026-10-16 · claude · Top-down flow with gates; one folder per agent; PR reviews
Phases P0–P5 with gates G1 (composition), G2 (visual), G3 (motion) — `docs/DEV-FLOW.md`. Codex works in the main folder, Claude in worktree `XTS LadingPage-claude`. Work lands via small PRs reviewed with `gh pr review`; `PROGRESS.md` uses union merge. **Why:** two agents in one checkout switch branches under each other; gates stop polishing a layout that will change.

### D17 · 2026-10-16 · claude · Motion stack: GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG) + Lenis; coded hero dashboard
Spec + budget in `docs/MOTION.md` (JS ≤ 70 KB gz, Perf ≥ 95, reduced-motion branch). Hero dashboard is coded SVG/HTML over a photo backdrop, not a flat image. No WebGL in v1. **Why:** top-tier, controllable motion at a small, predictable cost; a coded dashboard stays crisp and can animate.

### D18 · 2026-10-16 · claude · Form provider: Web3Forms (free), browser-side submit (resolves D13)
250 submissions/mo, JSON POST from the browser, public access key. Spam: honeypot + minimum fill time; hCaptcha (free, zero-config) only if spam appears, lazy-loaded. No captcha site key env var needed. Details + upgrade paths: `docs/spikes/T07-form-provider.md`. **Why:** 5× Formspree's free volume, built for static sites, nothing secret to hold.

### D19 · 2026-10-16 · user + claude · Optimized Codex delivery: merge train, 5 PRs, declarative motion
Remaining UI work ships as P1 (one PR) → P2-a imagery → P2-b interaction/detail (G2) → P3-a engine + reveals → P3-b signature moments (G3), after a merge train #5 → #2 → #3 → #4. Motion is declared with `data-*` attributes (MOTION §7) and applied by one engine that lazy-loads GSAP and skips it under reduced motion. Gate-independent work (images, favicon/OG from the raster mark, motion engine) runs during reviews. **Why:** merges/reviews were the bottleneck (11 stacked branches, nothing on `main`); declarative motion cuts P3 edits across 9 sections to one module and saves the whole JS budget for reduced-motion users.

### D20 · 2026-10-16 · user · Claude takes over UI/UX to finish the MVP (temporary lane override of D15)
User asked Claude to continue UI/UX until a best-possible MVP. Claude integrates #5 + #2–#4 + Codex's P1 draft on `claude/mvp-ui`, builds on Codex's components (no rewrite), and ships one MVP PR. **Codex: hold UI edits** (pages, layouts, components, styles, scripts) until that PR merges; non-UI help is welcome (T09 audit). D15 lanes resume after the MVP PR unless the user says otherwise.

### D21 · 2026-10-16 · claude · MVP visual + performance choices
- **Coded gold-line schematics instead of stock/generated photos** (`components/art/Schematic.astro`): crisp at any size, animatable, ~0 KB of images, on-brand. Content keeps an optional `image` per item; a supplied photo replaces the schematic with no component change.
- **Hero = coded "living console"** (four capabilities wired to one hub, data flows, event feed). Decorative and aria-hidden; illustrative copy only, no figures or client data.
- **Hero entrance is pure CSS** (never waits for JS). **GSAP boots on first interaction** (3.5s fallback) and never loads under reduced motion. **CSS is inlined.** These keep LCP ≤ 2.0s and CLS at 0 with motion on.
- Reveals use `opacity` (not `autoAlpha`) so off-screen headings stay in the accessibility tree.
**Why:** hit MOTION §6 budgets (measured: Perf 0.95, A11y 1, LCP 1.6–1.9s, CLS 0, JS 58 KB) without giving up the motion.

### D22 · 2026-10-19 · user + claude · v2: photo-led, simpler story, service pages, real imagery
Home = Hero → Services → Work → Global reach → Start a project (Industries/Process sections cut). Each service opens `/services/<slug>`: business systems get a system switcher with slides of realistic MVP screens; robotics gets real photos + an exploded robotic-arm centrepiece. Real-life photos replace coded schematics and the hero console. Native cross-document view transitions (zero JS) + speculation-rules prerender for instant, morphing navigation. Photos/screens auto-wire from `src/assets/photos|showcase/**` with graceful placeholders. Codex produces images + `showcase-ui/` sample apps (`docs/CODEX-BRIEF-v2.md`); Claude builds the site. Plan: `docs/PLAN-v2.md`. **Why:** user wants a straightforward, enticing site whose own polish demonstrates the build standard.

### D23 · 2026-10-25 · user · One project folder; agents take turns (supersedes the folder part of D16)
Removed Claude's worktree `XTS LadingPage-claude`. Codex and Claude both work in `XTS LadingPage`, one at a time, each on its own branch, and leave the folder clean on `main`. **Why:** user wants a single local copy; the agents don't run at the same moment.

### D24 · 2026-10-25 · user · Agents work at the same time on separate tasks (supersedes D23)
Codex keeps `XTS LadingPage`; Claude works in a hidden worktree `D:/DEV WORKS/.worktrees/xts-landing-claude` (outside the project folder, so tools in Codex's folder never scan it). Tasks are split by lane and by files; no file is edited by both agents in open work. **Why:** user wants one visible project folder but both agents working simultaneously.

### D25 · 2026-10-25 · user + codex · Brief session-only XTS brand entrance
User explicitly requests a first-entry XTS website boot and a different hero direction. This overrides MOTION §3's blanket no-full-screen-preloader instruction for a short branded introduction only: approximately 1.1s, skippable, session-only, no fake progress percentages, suppressed under reduced motion/direct hashes/no JS, fail-open by 1.4s, and independent of all downloads. The page remains rendered and navigable. Hero becomes a sharp studio-led composition with capability links; international/global wording follows the user's confirmation. Design and acceptance plan: docs/HERO-ENTRANCE.md.

### D26 · 2026-10-25 · user + codex · Controlled service-preview rotation
User explicitly requests automatic sample-screen previews and image-side arrows. Multi-screen service galleries rotate at a 3s cadence only while visible, with a Play/Pause control, hover pause, persistent stop on focus/manual/touch interaction, reduced-motion suppression and hidden-panel/document/modal suspension. Native swipe/keyboard controls and full-screen inspection remain. This applies to service screenshots only; homepage and live industry demos retain their manual behavior. Layout, source media and acceptance: docs/CAROUSEL-UX.md.


### D27 · 2026-10-25 · user + codex · Descriptive systems and finite workflow overviews
User replaces fictional company/product branding with system-purpose names, including core sample UIs. Industry cards replace Try-the-demo CTAs and full-screen sandboxes with compact hover/tap overviews: one lazy iframe, finite cursor actions on real local controls, explicit stop/replay, static reduced-motion output and cleanup on exit/offscreen/hidden. Existing internal screen keys remain stable; no fake client or company claims. Current direction: docs/INDUSTRY-DEMOS.md.

### D28 · 2026-10-25 · user + codex · Longer finite XTS brand entrance
User explicitly requests a longer entrance with more suspense and richer motion. Supersedes D25 timing only: about 2.9s with an independent 3.4s fail-open guard. Keep the same supplied mark, no fake progress percentages/system checks, no network dependency or continuous loops. Logo/letter reveals, a decorative orbit/grid and one light sweep resolve into an aperture exit. Preserve Skip, input interruption, reduced-motion, direct-hash/service-page/no-JS/storage bypass and a versioned once-per-tab session flag.

### D29 · 2026-10-25 · user + codex · Signal-based entrance visual revision
User requests another smoother, more futuristic direction. Replace D28 orbit/grid/progress-like line and aperture styling with three-region supplied-logo assembly, decorative connection traces, horizon light and a unified wordmark reveal, followed by a dissolve into the hero. Retain D28 duration, independent guard, bypass and input behavior. Functional session key v3 lets existing tabs see the revised composition once. No new bitmap source, continuous loop or actual system-status claim.

### D30 · 2026-10-25 · user + codex · Full-HD arm with finite viewport transition
User requests a sharper 1080p regeneration after checking cost and a faster arm transition with much less scrolling. Replace the continuous 200–260vh arm scrub with a normal-flow scene and about 1.8s viewport-triggered explosion, reverse on upward exit, and explicit Replay. Preserve the supplied 5:3 shot at native 1800×1080; optimize with short-GOP H.264 and no audio. Lazy load near the stage, wait for a ready buffered clip, suspend unfinished work offscreen/hidden, and retain static reduced-motion/no-JS plus photo failure/data-saver fallbacks. One quoted 10-credit generation, not an upscaled 768p export. Supersedes only the arm interaction/delivery details of PLAN-v2 and its media handoff.

### D31 · 2026-10-25 · user · Higgsfield disabled for subsequent work
User explicitly says not to use Higgsfield starting now. Do not call its generation, processing, discovery or other MCP tools unless the user explicitly re-enables it. Existing locally saved assets can remain in the site. The hero display correction uses native SVG/CSS only.

### D32 · 2026-10-25 · user + codex · Showcase automatic idle resumption
User requests removal of the large Play slideshow/cadence block, automatic 3s views, manual navigation override and automatic return after inactivity. Supersede D26 persistent stop after pointer/manual navigation: resume after 6s without further input. Keep a compact persistent Pause/Resume icon beside the count, keyboard-focus suspension, reduced-motion suppression and hidden/offscreen/dialog suspension. Image-side arrows, native swipe, count and named-view selection remain.

### D33 · 2026-10-25 · user + codex · Hover workflows with fullscreen inspection
User removes industry-card play/stop preview toggles and requests automatic hover initiation plus View full screen. Keep finite hover/focus playback and one lazy inert sandbox at a time. A native modal offers enlarged fit/actual-size inspection with Close/Escape, focus return and static reduced-motion/failure fallback. Supersedes only D27’s explicit inline playback control and no-modal choice; system-gallery controls and actual sample-app behavior remain unchanged.

### D34 · 2026-10-25 · user + codex · Brief desktop arm showcase hold
User requests a scroll-triggered stop for viewing the arm. Add a short native sticky runway (55svh, capped at 32rem) only on fine-pointer hover desktops at least 1024×650. The entire media/control stage fits below the header. Preserve D30's finite 1.8s viewport-triggered animation, independent of scroll progress; scrolling is never locked or intercepted. Mobile, short screens, reduced motion and no-JS retain normal flow. Supersedes only D30's desktop normal-flow framing; no media regeneration or Higgsfield use.

### D35 · 2026-10-25 · user via Claude · Thin slideshow progress control
Replace D32's icon-only pause and visible count with a 2px CSS progress line in a minimum 24px button below the image, with accessible Pause/Resume and hidden “n of total” announcements. Freeze CSS progress during manual grace, explicit pause and inactive states; resume its remaining time against a stable deadline. A new slide resets fill to zero, so manual selection receives 6s grace then its 3s fill. Reduced motion shows static current-view segments; single views omit the line. No per-frame JS or layout shift. Details: docs/CAROUSEL-UX.md.
