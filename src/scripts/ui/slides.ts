/** Visible-only rotation; manual navigation gets a quiet six-second reading window. */
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
    const idleDelay = 6000;
    let current = 0,
      paused = false,
      keyboardFocused = false,
      pointerActive = false,
      visible = false,
      idleUntil = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const eligible = () =>
      !paused &&
      !preference.matches &&
      !keyboardFocused &&
      !pointerActive &&
      visible &&
      !document.hidden &&
      track.clientWidth > 0 &&
      !wrap.closest('[hidden]') &&
      !document.querySelector('dialog[open]');
    const syncRotation = () => {
      clearTimeout(timer);
      const idle = Math.max(0, idleUntil - Date.now());
      const running = eligible();
      wrap.dataset.rotating = String(running && !idle);
      wrap.dataset.paused = String(
        paused || preference.matches || keyboardFocused,
      );
      wrap.dataset.idle = String(idle > 0);
      label?.setAttribute('aria-live', running && !idle ? 'off' : 'polite');
      if (rotation) {
        const copy = paused
          ? rotation.dataset.playLabel
          : rotation.dataset.pauseLabel;
        rotation.hidden = preference.matches;
        rotation.setAttribute('aria-label', copy ?? '');
        rotation.setAttribute('aria-pressed', String(paused));
        rotation.title = copy ?? '';
      }
      if (running)
        timer = setTimeout(
          () => {
            if (eligible()) {
              idleUntil = 0;
              label?.setAttribute('aria-live', 'off');
              go((current + 1) % slides.length);
            }
            syncRotation();
          },
          Math.max(interval, idle),
        );
    };
    const override = () => {
      idleUntil = Date.now() + idleDelay;
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
          override();
          go(Number(button.dataset.slideIndex));
        }),
      );
    prev?.addEventListener('click', () => {
      override();
      go(current - 1);
    });
    next?.addEventListener('click', () => {
      override();
      go(current + 1);
    });
    rotation?.addEventListener('click', () => {
      paused = !paused;
      keyboardFocused = false;
      idleUntil = 0;
      syncRotation();
    });
    wrap.addEventListener(
      'pointerdown',
      () => {
        pointerActive = true;
        keyboardFocused = false;
        override();
      },
      { passive: true },
    );
    wrap.addEventListener(
      'pointermove',
      () => {
        if (pointerActive) override();
      },
      { passive: true },
    );
    const release = () => {
      if (!pointerActive) return;
      pointerActive = false;
      syncRotation();
    };
    addEventListener('pointerup', release, { passive: true });
    addEventListener('pointercancel', release, { passive: true });
    wrap.addEventListener('focusin', () => {
      keyboardFocused =
        !pointerActive &&
        Boolean(document.activeElement?.matches(':focus-visible'));
      syncRotation();
    });
    wrap.addEventListener('focusout', () =>
      queueMicrotask(() => {
        if (!wrap.contains(document.activeElement)) {
          keyboardFocused = false;
          syncRotation();
        }
      }),
    );
    track.addEventListener('wheel', override, { passive: true });
    track.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      override();
      go(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    let raf = 0;
    track.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          if (idleUntil > Date.now()) idleUntil = Date.now() + idleDelay;
          update();
        });
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
      idleUntil = 0;
      syncRotation();
    });
    update();
  });
}
