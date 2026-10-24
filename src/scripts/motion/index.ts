/**
 * Motion engine v2 (MOTION §7, D19, D22). Markup declares motion with data-*; this applies it.
 *
 * - Reduced motion → returns before downloading anything (0 KB of GSAP/Lenis).
 * - GSAP + ScrollTrigger + Lenis load on first interaction (3.5s fallback); the hero entrance is
 *   pure CSS and never waits for JS.
 * - Nothing is hidden by CSS up front: from-states are set only on elements still below the fold.
 * - Layout-changing modes (exploded view) are decided in CSS before first paint, never here (CLS).
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
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

type Gsap = typeof import('gsap').gsap;
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type Lenis = InstanceType<typeof import('lenis').default>;

async function boot() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  const { DUR, EASE } = await import('./tokens');
  gsap.defaults({ ease: EASE.out, duration: DUR[3] });

  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lenis = await initSmoothScroll(gsap, ScrollTrigger);
  const belowFold = (el: Element) =>
    el.getBoundingClientRect().top > innerHeight * 0.92;

  // ---- data-reveal: section heads + media only (restraint), batched, once --------------------
  // opacity (not autoAlpha): visibility:hidden would drop headings from the accessibility tree.
  const reveals = gsap.utils
    .toArray<HTMLElement>('[data-reveal]')
    .filter(belowFold);
  const from: Record<string, gsap.TweenVars> = {
    up: { opacity: 0, y: 28 },
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

  // ---- data-count: count up to the value already in the markup ("300+") ------------------------
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const match = el.textContent?.trim().match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const state = { n: 0 };
    gsap.to(state, {
      n: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      onStart: () => void (el.textContent = `0${suffix}`),
      onUpdate: () => void (el.textContent = `${Math.round(state.n)}${suffix}`),
    });
  });

  // ---- Hero: photo drifts slower than the page ------------------------------------------------
  const backdrop = document.querySelector<HTMLElement>(
    '.hero-backdrop, .svc-hero-photo',
  );
  if (backdrop) {
    gsap.to(backdrop, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: backdrop.parentElement!,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  initWorkGallery(gsap, ScrollTrigger, lenis, fine);
  initExploded(ScrollTrigger);

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

/** Work: pinned section whose vertical scroll moves the track sideways (wide screens, fine pointer). */
function initWorkGallery(
  gsap: Gsap,
  ScrollTrigger: ST,
  lenis: Lenis | undefined,
  fine: boolean,
) {
  const section = document.querySelector<HTMLElement>('#work');
  const track = section?.querySelector<HTMLElement>('[data-work-track]');
  const list = track?.querySelector<HTMLElement>('.work-list');
  if (!section || !track || !list || !fine || innerWidth < 1024) return;

  track.classList.add('is-pinned');
  const distance = () => Math.max(0, list.scrollWidth - track.clientWidth);
  const tween = gsap.to(list, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top+=72',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });
  // Keyboard users: focusing something in an off-screen card scrolls the page to reveal it.
  list.addEventListener('focusin', (e) => {
    const card = (e.target as Element).closest<HTMLElement>('.work-card');
    const st = tween.scrollTrigger;
    if (!card || !st) return;
    const ratio = Math.min(
      1,
      card.offsetLeft / Math.max(1, list.scrollWidth - card.offsetWidth),
    );
    const y = st.start + ratio * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else scrollTo({ top: y });
  });
  ScrollTrigger.refresh();
}

/** Robotics exploded view: scroll position drives the video, or the separation between photos. */
function initExploded(ScrollTrigger: ST) {
  const root = document.querySelector<HTMLElement>('[data-exploded]');
  if (!root) return;
  const scroller = root.querySelector<HTMLElement>('.exploded-scroll');
  const bar = root.querySelector<HTMLElement>('.exploded-progress');
  const video = root.querySelector<HTMLVideoElement>('[data-exploded-video]');
  const a = root.querySelector<HTMLElement>('.exploded-a');
  const b = root.querySelector<HTMLElement>('.exploded-b');
  if (!scroller) return;

  if (video) {
    video.preload = 'auto';
    video.load();
  }
  const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep
  ScrollTrigger.create({
    trigger: scroller,
    start: 'top top+=104',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: ({ progress }) => {
      bar?.style.setProperty('--p', progress.toFixed(3));
      if (video && video.duration) {
        video.currentTime = progress * (video.duration - 0.05);
        return;
      }
      if (!a || !b) return;
      const t = ease(Math.min(1, Math.max(0, (progress - 0.12) / 0.7)));
      a.style.opacity = String(1 - t);
      a.style.transform = `scale(${1 + t * 0.05})`;
      a.style.filter = `blur(${(t * 6).toFixed(2)}px)`;
      b.style.opacity = String(t);
      b.style.transform = `scale(${0.94 + t * 0.06})`;
      b.style.filter = `blur(${((1 - t) * 6).toFixed(2)}px)`;
    },
  });
}

/** Lenis smooth scrolling for fine pointers, synced to ScrollTrigger; anchors honour the header. */
async function initSmoothScroll(
  gsap: Gsap,
  ScrollTrigger: ST,
): Promise<Lenis | undefined> {
  if (!matchMedia('(pointer: fine)').matches) return undefined;
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
      'a[href*="#"]',
    );
    if (!link || link.pathname !== location.pathname || link.hash.length < 2)
      return;
    if (link.closest('[role="tablist"]')) return;
    const target = document.querySelector<HTMLElement>(link.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: headerOffset() });
    history.pushState(null, '', link.hash);
    setTimeout(() => {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, 700);
  });
  return lenis;
}
