/**
 * Motion engine (MOTION §7, D19). Markup declares motion with data-* attributes; this applies it.
 *
 * - Reduced motion → returns before downloading anything (0 KB of GSAP/Lenis).
 * - GSAP + plugins load lazily after first paint; the hero entrance is pure CSS and never waits.
 * - Nothing is hidden by CSS up front: from-states are set only on elements still below the
 *   viewport when the engine starts, so a slow or failed load never leaves content invisible.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  // Boot on first interaction (or after 3.5s): no JS cost for the first paint/LCP, and below-fold
  // elements are still below the fold when the first scroll arrives.
  const events = [
    'scroll',
    'pointermove',
    'keydown',
    'touchstart',
    'wheel',
  ] as const;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    events.forEach((ev) => removeEventListener(ev, start));
    void boot().catch(() => {});
  };
  events.forEach((ev) =>
    addEventListener(ev, start, { passive: true, once: true }),
  );
  setTimeout(start, 3500);
}

async function boot() {
  const [{ gsap }, { ScrollTrigger }, { DrawSVGPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/DrawSVGPlugin'),
  ]);
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  const { DUR, EASE } = await import('./tokens');
  gsap.defaults({ ease: EASE.out, duration: DUR[3] });

  const belowFold = (el: Element) =>
    el.getBoundingClientRect().top > innerHeight * 0.92;

  await initSmoothScroll(gsap, ScrollTrigger);

  // ---- data-reveal: up | fade | clip (batched, once) ----------------------------------------

  // opacity (not autoAlpha): visibility:hidden would drop headings from the accessibility tree.
  const reveals = gsap.utils
    .toArray<HTMLElement>('[data-reveal]')
    .filter(belowFold);
  const from: Record<string, gsap.TweenVars> = {
    up: { opacity: 0, y: 24 },
    fade: { opacity: 0 },
    clip: { clipPath: 'inset(0 0 100% 0)' },
  };
  const to: Record<string, gsap.TweenVars> = {
    up: { opacity: 1, y: 0 },
    fade: { opacity: 1 },
    clip: { clipPath: 'inset(0 0 0% 0)', duration: DUR[4], ease: EASE.inout },
  };
  for (const el of reveals)
    gsap.set(el, from[el.dataset.reveal ?? 'up'] ?? from.up);
  ScrollTrigger.batch(reveals, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      batch.forEach((el, i) =>
        gsap.to(el, {
          ...(to[(el as HTMLElement).dataset.reveal ?? 'up'] ?? to.up),
          delay: i * 0.08,
          clearProps: 'clipPath,transform',
        }),
      ),
  });

  // ---- data-draw inside schematics: lines draw in as the art reveals ----------------------
  gsap.utils.toArray<SVGPathElement>('.visual [data-draw]').forEach((path) => {
    if (!belowFold(path)) return;
    gsap.fromTo(
      path,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        duration: 1.4,
        ease: EASE.inout,
        delay: 0.3,
        scrollTrigger: { trigger: path, start: 'top 85%', once: true },
      },
    );
  });

  // ---- data-count: count up to the value already in the markup ("300+") -----------------
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const match = el.textContent?.trim().match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const state = { n: 0 };
    el.style.fontVariantNumeric = 'tabular-nums';
    gsap.to(state, {
      n: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onStart: () => void (el.textContent = `0${suffix}`),
      onUpdate: () => void (el.textContent = `${Math.round(state.n)}${suffix}`),
    });
  });

  // ---- Process: connectors fill with scroll, nodes light up as the line reaches them -------
  const timeline = document.querySelector<HTMLElement>('.process-timeline');
  if (timeline) {
    const steps = [...timeline.querySelectorAll<HTMLElement>(':scope > li')];
    const segments = steps.length - 1;
    ScrollTrigger.create({
      trigger: timeline,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: 0.6,
      onUpdate: ({ progress }) => {
        steps.forEach((li, i) => {
          const fill = Math.min(1, Math.max(0, progress * segments - i));
          li.style.setProperty('--fill', fill.toFixed(3));
          const reached = i === 0 ? progress > 0.02 : progress * segments >= i;
          li.classList.toggle('is-reached', reached);
        });
      },
    });
  }

  // ---- Hero console: gentle pointer + scroll parallax (desktop only) -----------------------
  const consoleEl = document.querySelector<HTMLElement>('.hero-parallax');
  if (
    consoleEl &&
    matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1051px)')
      .matches
  ) {
    const xTo = gsap.quickTo(consoleEl, 'x', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(consoleEl, 'y', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    hero?.addEventListener('pointermove', (e) => {
      xTo((e.clientX / innerWidth - 0.5) * 12);
      yTo((e.clientY / innerHeight - 0.5) * 10);
    });
    gsap.to('.console', {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-hero]',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Layout settles once fonts/images are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

/** Lenis smooth scrolling for fine pointers, synced to ScrollTrigger; anchors honour the header. */
async function initSmoothScroll(
  gsap: typeof import('gsap').gsap,
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger,
) {
  if (!matchMedia('(pointer: fine)').matches) return;
  const { default: Lenis } = await import('lenis');
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const headerOffset = () =>
    -(
      document.querySelector('.site-header')?.getBoundingClientRect().height ??
      0
    ) - 16;
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (!link || link.hash.length < 2 || link.closest('[role="tablist"]'))
      return;
    const target = document.querySelector(link.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: headerOffset() });
    history.pushState(null, '', link.hash);
    // Move focus for keyboard and screen-reader users once the scroll lands.
    setTimeout(() => {
      (target as HTMLElement).setAttribute('tabindex', '-1');
      (target as HTMLElement).focus({ preventScroll: true });
    }, 700);
  });
}
