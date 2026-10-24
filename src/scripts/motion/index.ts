import { initPhotoGalleryMotion } from './gallery';
/** Motion is progressive: native navigation, readable content and swipe work before it loads. */
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const events = [
  'scroll',
  'pointermove',
  'keydown',
  'touchstart',
  'wheel',
] as const;
let started = false;
const start = () => {
  if (started || preference.matches) return;
  started = true;
  events.forEach((ev) => removeEventListener(ev, start));
  void boot().catch(() => {});
};
function schedule() {
  if (preference.matches || started) return;
  events.forEach((ev) =>
    addEventListener(ev, start, { passive: true, once: true }),
  );
}
preference.addEventListener('change', schedule);
schedule();
type Gsap = typeof import('gsap').gsap;
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type Lenis = InstanceType<typeof import('lenis').default>;

async function boot() {
  const [{ gsap }, { ScrollTrigger }, { DUR, EASE }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('./tokens'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  // The desktop-only dependency is never fetched for coarse pointers.
  const LenisClass = matchMedia('(pointer:fine)').matches
    ? (await import('lenis')).default
    : undefined;
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.defaults({ ease: EASE.out, duration: DUR[3] });
    const smooth = LenisClass
      ? initSmoothScroll(gsap, ScrollTrigger, LenisClass)
      : undefined;
    const belowFold = (el: Element) =>
      el.getBoundingClientRect().top > innerHeight * 0.95;
    const reveals = gsap.utils
      .toArray<HTMLElement>('[data-reveal]')
      .filter(belowFold);
    const states: Record<string, gsap.TweenVars> = {
      up: { opacity: 0, y: 20 },
      fade: { opacity: 0 },
      clip: { opacity: 0, clipPath: 'inset(8% 0 0 0)' },
    };
    reveals.forEach((el) =>
      gsap.set(el, states[el.dataset.reveal ?? 'up'] ?? states.up),
    );
    ScrollTrigger.batch(reveals, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) =>
        batch.forEach((el, i) =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            delay: Math.min(i, 3) * 0.06,
            clearProps: 'opacity,transform,clipPath',
          }),
        ),
    });
    // Already-visible proof remains stable when the first pointer movement boots the engine.
    const counters = gsap.utils.toArray<HTMLElement>('[data-count]');
    const finals = counters.map((el) => el.textContent ?? '');
    counters.filter(belowFold).forEach((el) => {
      const match = el.textContent?.trim().match(/^(\d+)(.*)$/);
      if (!match) return;
      const state = { n: 0 };
      gsap.to(state, {
        n: Number(match[1]),
        duration: 1.1,
        scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(state.n) + match[2];
        },
      });
    });
    const wide = gsap.matchMedia();
    wide.add(
      '(min-width:1024px) and (min-height:650px) and (hover:hover) and (pointer:fine)',
      () => {
        return initWorkGallery(gsap, ScrollTrigger, smooth?.lenis);
      },
    );
    const cleanExploded = initExploded(ScrollTrigger);
    const cleanGallery = initPhotoGalleryMotion(gsap, ScrollTrigger);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(() => {
      if (!preference.matches) refresh();
    });
    addEventListener('load', refresh, { once: true });
    return () => {
      cleanExploded?.();
      cleanGallery?.();
      wide.revert();
      smooth?.destroy();
      removeEventListener('load', refresh);
      const revealElements =
        document.querySelectorAll<HTMLElement>('[data-reveal]');
      gsap.killTweensOf(revealElements);
      revealElements.forEach((el) => {
        for (const prop of ['opacity', 'transform', 'clip-path'])
          el.style.removeProperty(prop);
      });
      counters.forEach((el, i) => {
        el.textContent = finals[i];
      });
      document
        .querySelectorAll<HTMLElement>('.exploded-a,.exploded-b')
        .forEach((el) => {
          el.style.removeProperty('opacity');
        });
    };
  });
}

/** Pin only where a whole card fits; matchMedia tears it down cleanly after a resize. */
function initWorkGallery(gsap: Gsap, ScrollTrigger: ST, lenis?: Lenis) {
  const section = document.querySelector<HTMLElement>('#work');
  const track = section?.querySelector<HTMLElement>('[data-work-track]');
  const list = track?.querySelector<HTMLElement>('.work-list');
  if (!section || !track || !list) return;
  const cards = [...list.querySelectorAll<HTMLElement>('.work-card')];
  track.scrollLeft = 0;
  track.classList.add('is-pinned');
  const distance = () => Math.max(0, list.scrollWidth - track.clientWidth);
  let last = -1;
  const tween = gsap.to(list, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: () =>
        `top top+=${(document.querySelector('.site-header')?.getBoundingClientRect().height ?? 76) + 12}`,
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.55,
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
        const index = Math.round(progress * (cards.length - 1));
        if (index !== last) {
          last = index;
          track.dispatchEvent(
            new CustomEvent('work:progress', { detail: { index } }),
          );
        }
      },
    },
  });
  const navigate = (index: number, immediate = false) => {
    const st = tween.scrollTrigger;
    if (!st) return;
    const ratio = Math.max(
      0,
      Math.min(1, index / Math.max(1, cards.length - 1)),
    );
    const y = st.start + ratio * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { immediate });
    else scrollTo({ top: y, behavior: immediate ? 'instant' : 'smooth' });
  };
  const onNavigate = (event: Event) => {
    event.preventDefault();
    navigate((event as CustomEvent<{ index: number }>).detail.index);
  };
  const onFocus = (event: FocusEvent) => {
    const card = (event.target as Element).closest<HTMLElement>('.work-card');
    if (card) navigate(cards.indexOf(card), true);
  };
  track.addEventListener('work:navigate', onNavigate);
  list.addEventListener('focusin', onFocus);
  ScrollTrigger.refresh();
  return () => {
    track.classList.remove('is-pinned');
    track.removeEventListener('work:navigate', onNavigate);
    list.removeEventListener('focusin', onFocus);
    track.dispatchEvent(new Event('scroll'));
  };
}

/** A registered pair crossfades without camera movement or per-frame blur rasterization. */
function initExploded(ScrollTrigger: ST) {
  const root = document.querySelector<HTMLElement>('[data-exploded]');
  const scroller = root?.querySelector<HTMLElement>('.exploded-scroll');
  if (!root || !scroller) return;
  const bar = root.querySelector<HTMLElement>('.exploded-progress');
  const video = root.querySelector<HTMLVideoElement>('[data-exploded-video]');
  const b = root.querySelector<HTMLElement>('.exploded-b');
  let progress = 0,
    frame = 0,
    disposed = false;
  const seek = () => {
    frame = 0;
    if (
      disposed ||
      document.hidden ||
      !video ||
      !root.classList.contains('has-arm-video') ||
      video.seeking ||
      !Number.isFinite(video.duration)
    )
      return;
    const time = progress * Math.max(0, video.duration - 0.05);
    if (Math.abs(video.currentTime - time) > 0.035) video.currentTime = time;
  };
  const schedule = () => {
    if (!frame && !disposed) frame = requestAnimationFrame(seek);
  };
  const ready = () => {
    if (!disposed) {
      root.classList.add('has-arm-video');
      schedule();
    }
  };
  const failed = () => root.classList.remove('has-arm-video');
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      video?.pause();
    } else schedule();
  };
  video?.addEventListener('loadeddata', ready);
  video?.addEventListener('seeked', schedule);
  video?.addEventListener('error', failed);
  document.addEventListener('visibilitychange', visibility);
  const saveData = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection?.saveData;
  if (video && !saveData)
    ScrollTrigger.create({
      trigger: scroller,
      start: 'top bottom+=400',
      once: true,
      onEnter: () => {
        if (disposed || !video.dataset.src) return;
        video.preload = 'auto';
        video.src = video.dataset.src;
        video.load();
      },
    });
  ScrollTrigger.create({
    trigger: scroller,
    start: 'top top+=104',
    end: 'bottom bottom',
    onUpdate: (state) => {
      progress = state.progress;
      bar?.style.setProperty('--p', progress.toFixed(3));
      const t = Math.min(1, Math.max(0, (progress - 0.12) / 0.7));
      if (b) b.style.opacity = String(t * t * (3 - 2 * t));
      schedule();
    },
  });
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    root.classList.remove('has-arm-video');
    document.removeEventListener('visibilitychange', visibility);
    video?.removeEventListener('loadeddata', ready);
    video?.removeEventListener('seeked', schedule);
    video?.removeEventListener('error', failed);
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  };
}

/** One ticker, cleaned up when motion is disabled. Modified clicks retain browser behavior. */
function initSmoothScroll(
  gsap: Gsap,
  ScrollTrigger: ST,
  LenisClass: typeof import('lenis').default,
) {
  const lenis = new LenisClass({ duration: 0.85, smoothWheel: true });
  const tick = (t: number) => lenis.raf(t * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  const onAnchor = (event: Event) => {
    event.preventDefault();
    const { top, finish } = (
      event as CustomEvent<import('../ui/anchors').AnchorRequest>
    ).detail;
    lenis.scrollTo(top, { onComplete: finish });
  };
  const onPreview = (event: Event) => {
    if ((event as CustomEvent<{ open: boolean }>).detail.open) lenis.stop();
    else lenis.start();
  };
  document.addEventListener('site:preview', onPreview);
  document.addEventListener('site:anchor', onAnchor);
  return {
    lenis,
    destroy: () => {
      document.removeEventListener('site:anchor', onAnchor);
      document.removeEventListener('site:preview', onPreview);
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
