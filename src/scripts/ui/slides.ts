/** Native scroll-snap navigation with visible-only, user-controlled rotation. */
export function initSlides(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-slides]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-slides-track]');
    const prev = wrap.querySelector<HTMLButtonElement>('[data-prev]');
    const next = wrap.querySelector<HTMLButtonElement>('[data-next]');
    const label = wrap.querySelector<HTMLElement>('[data-count-label]');
    const rotation =
      wrap.querySelector<HTMLButtonElement>('[data-slides-play]');
    if (!track) return;
    const slides = [...track.children] as HTMLElement[];
    if (slides.length < 2) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const interval = Math.max(3000, Number(wrap.dataset.interval) || 3000);
    let current = 0;
    let paused = preference.matches;
    let hovering = false;
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const eligible = () =>
      !paused &&
      !hovering &&
      visible &&
      !document.hidden &&
      track.clientWidth > 0 &&
      !wrap.closest('[hidden]') &&
      !document.querySelector('dialog[open]');
    const syncRotation = () => {
      clearTimeout(timer);
      const running = eligible();
      wrap.dataset.rotating = String(running);
      wrap.dataset.paused = String(paused);
      label?.setAttribute('aria-live', running ? 'off' : 'polite');
      if (rotation) {
        const copy = paused
          ? rotation.dataset.playLabel
          : rotation.dataset.pauseLabel;
        rotation.setAttribute('aria-label', copy ?? '');
        const text = rotation.querySelector('[data-play-label]');
        if (text) text.textContent = copy ?? '';
      }
      if (running)
        timer = setTimeout(() => {
          if (eligible()) go((current + 1) % slides.length);
          syncRotation();
        }, interval);
    };
    const stop = () => {
      paused = true;
      syncRotation();
    };
    const update = () => {
      if (!track.clientWidth) return;
      const step = Math.max(1, slides[1].offsetLeft - slides[0].offsetLeft);
      current = Math.min(
        slides.length - 1,
        Math.max(0, Math.round(track.scrollLeft / step)),
      );
      wrap
        .querySelectorAll<HTMLButtonElement>('[data-slide-index]')
        .forEach((button, i) =>
          button.setAttribute('aria-pressed', String(i === current)),
        );
      slides.forEach((slide, i) => {
        slide.inert = i !== current;
      });
      if (label) label.textContent = `${current + 1} / ${slides.length}`;
      if (prev) prev.disabled = current === 0;
      if (next) next.disabled = current === slides.length - 1;
      syncRotation();
    };
    const go = (index: number, instant = false) => {
      const target = slides[Math.min(slides.length - 1, Math.max(0, index))];
      track.scrollTo({
        left: target.offsetLeft - slides[0].offsetLeft,
        behavior:
          instant || Math.abs(index - current) > 1 || preference.matches
            ? 'instant'
            : 'smooth',
      });
    };
    wrap
      .querySelectorAll<HTMLButtonElement>('[data-slide-index]')
      .forEach((button) =>
        button.addEventListener('click', () => {
          stop();
          go(Number(button.dataset.slideIndex));
        }),
      );
    prev?.addEventListener('click', () => {
      stop();
      go(current - 1);
    });
    next?.addEventListener('click', () => {
      stop();
      go(current + 1);
    });
    let pointerPaused: boolean | undefined;
    rotation?.addEventListener('pointerdown', () => {
      pointerPaused = paused;
    });
    rotation?.addEventListener('click', () => {
      paused = !(pointerPaused ?? paused);
      pointerPaused = undefined;
      hovering = false;
      syncRotation();
    });
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') {
        hovering = true;
        syncRotation();
      }
    });
    wrap.addEventListener('pointerleave', () => {
      hovering = false;
      syncRotation();
    });
    track.addEventListener('pointerdown', stop, { passive: true });
    track.addEventListener('wheel', stop, { passive: true });
    track.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      stop();
      go(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    let raf = 0;
    track.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      },
      { passive: true },
    );
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        syncRotation();
      },
      { threshold: [0, 0.35] },
    ).observe(wrap.querySelector('.slides-stage') ?? track);
    new ResizeObserver(() => {
      go(current, true);
      update();
    }).observe(track);
    const panel = wrap.closest<HTMLElement>('[data-panel]');
    if (panel)
      new MutationObserver(syncRotation).observe(panel, {
        attributes: true,
        attributeFilter: ['hidden'],
      });
    document.addEventListener('visibilitychange', syncRotation);
    document.addEventListener('site:preview', syncRotation);
    preference.addEventListener('change', () => {
      if (preference.matches) stop();
    });
    update();
  });
}
