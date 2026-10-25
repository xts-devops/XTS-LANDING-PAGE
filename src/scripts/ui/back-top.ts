import type { AnchorRequest } from './anchors';

/** A short return journey, independent of page length; never an idle animation loop. */
export function initBackToTop() {
  const link = document.querySelector<HTMLAnchorElement>('[data-back-top]');
  if (!link) return;
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion:reduce)');
  let running = false;
  link.addEventListener('click', (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    if (running) return;
    running = true;
    root.setAttribute('data-returning-top', '');
    const input = new AbortController();
    let frame = 0,
      timeout = 0,
      done = false;
    const detail: AnchorRequest = { top: 0, fast: true, finish: () => {} };
    const clear = () => {
      done = true;
      running = false;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      input.abort();
      root.removeAttribute('data-returning-top');
    };
    const finish = () => {
      if (done) return;
      clear();
      history.replaceState(null, '', location.pathname + location.search);
      document
        .querySelector<HTMLElement>('.site-header .brand-link')
        ?.focus({ preventScroll: true });
    };
    const cancel = () => {
      if (done) return;
      detail.cancel?.();
      clear();
    };
    detail.finish = finish;
    for (const name of ['wheel', 'touchstart', 'pointerdown'] as const)
      addEventListener(name, cancel, {
        passive: true,
        once: true,
        signal: input.signal,
      });
    addEventListener(
      'keydown',
      (e) => {
        if (
          [
            'Escape',
            'ArrowUp',
            'ArrowDown',
            'PageUp',
            'PageDown',
            'Home',
            'End',
            ' ',
          ].includes(e.key)
        )
          cancel();
      },
      { signal: input.signal },
    );
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) cancel();
      },
      { signal: input.signal },
    );
    addEventListener('pagehide', cancel, { once: true, signal: input.signal });
    motion.addEventListener(
      'change',
      () => {
        cancel();
      },
      { once: true, signal: input.signal },
    );
    if (motion.matches || scrollY <= 1) {
      scrollTo({ top: 0, behavior: 'instant' });
      finish();
      return;
    }
    const request = new CustomEvent<AnchorRequest>('site:anchor', {
      detail,
      cancelable: true,
    });
    if (document.dispatchEvent(request)) {
      const from = scrollY,
        start = performance.now();
      const step = (now: number) => {
        if (done) return;
        const t = Math.min(1, (now - start) / 550);
        scrollTo({ top: from * Math.pow(1 - t, 3), behavior: 'instant' });
        if (t < 1) frame = requestAnimationFrame(step);
        else finish();
      };
      frame = requestAnimationFrame(step);
    }
    timeout = window.setTimeout(() => {
      if (scrollY <= 2) finish();
      else cancel();
    }, 850);
  });
}
