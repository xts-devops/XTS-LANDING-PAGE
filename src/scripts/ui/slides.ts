/** Visible-only rotation; manual navigation gets a quiet six-second reading window. */
export function initSlides(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-slides]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-slides-track]');
    const prev = wrap.querySelector<HTMLButtonElement>('[data-prev]');
    const next = wrap.querySelector<HTMLButtonElement>('[data-next]');
    const label = wrap.querySelector<HTMLElement>('[data-count-label]');
    const rotation = wrap.querySelector<HTMLButtonElement>(
      '[data-slides-progress]',
    );
    if (!track) return;
    const slides = [...track.children] as HTMLElement[];
    if (slides.length < 2) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const interval = Math.max(6000, Number(wrap.dataset.interval) || 6000);
    const idleDelay = 6000;
    let current = 0,
      paused = false,
      keyboardFocused = false,
      pointerActive = false,
      pointerX = 0,
      pointerY = 0,
      visible = false,
      idleUntil = 0,
      advanceAt = 0,
      remaining = interval,
      progressIndex = 0;
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
    rotation?.style.setProperty('--interval', interval + 'ms');
    const freeze = () => {
      if (advanceAt) remaining = Math.max(0, advanceAt - Date.now());
      advanceAt = 0;
    };
    const restartFill = () => {
      if (!rotation) return;
      rotation.classList.remove('is-timing');
      rotation.style.setProperty('--elapsed', interval - remaining + 'ms');
      // One event-driven reflow; CSS owns every intermediate animation frame.
      void rotation.offsetWidth;
      rotation.classList.add('is-timing');
    };
    const resetProgress = (index: number) => {
      if (index === progressIndex) return;
      progressIndex = index;
      remaining = interval;
      advanceAt = 0;
      restartFill();
    };
    const syncRotation = () => {
      clearTimeout(timer);
      const idle = Math.max(0, idleUntil - Date.now());
      const running = eligible() && !idle;
      if (!running) freeze();
      else if (!advanceAt) {
        advanceAt = Date.now() + remaining;
        restartFill();
      }
      wrap.dataset.rotating = String(running);
      wrap.dataset.paused = String(
        paused || preference.matches || keyboardFocused,
      );
      wrap.dataset.idle = String(idle > 0);
      label?.setAttribute('aria-live', running ? 'off' : 'polite');
      if (rotation) {
        const copy = paused
          ? rotation.dataset.resumeLabel
          : rotation.dataset.pauseLabel;
        rotation.disabled = preference.matches;
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
          Math.max(0, advanceAt - Date.now()),
        );
      else if (idle && eligible()) timer = setTimeout(syncRotation, idle);
    };
    const override = () => {
      freeze();
      idleUntil = Date.now() + idleDelay;
      syncRotation();
    };
    const alignProgress = () => {
      const screen = slides[current].querySelector<HTMLElement>('.screen');
      if (!rotation || !screen) return;
      const padding =
        Number.parseFloat(getComputedStyle(track).paddingBottom) || 0;
      const offset =
        screen.getBoundingClientRect().bottom -
        track.getBoundingClientRect().bottom +
        padding;
      rotation.style.setProperty('--frame-offset', Math.min(0, offset) + 'px');
    };
    const update = () => {
      if (!track.clientWidth) return;
      const previous = current;
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
      if (current !== previous) {
        resetProgress(current);
        alignProgress();
      }
      rotation
        ?.querySelectorAll<HTMLElement>('[data-progress-segment]')
        .forEach((segment, i) => {
          segment.dataset.current = String(i === current);
        });
      const count = `${current + 1} ${label?.dataset.slideOf ?? 'of'} ${slides.length}`;
      if (label && label.textContent !== count) label.textContent = count;
      syncRotation();
    };
    const go = (index: number, instant = false) => {
      const target = slides[Math.min(slides.length - 1, Math.max(0, index))];
      resetProgress(Math.min(slides.length - 1, Math.max(0, index)));
      syncRotation();
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
      go((current - 1 + slides.length) % slides.length);
    });
    next?.addEventListener('click', () => {
      override();
      go((current + 1) % slides.length);
    });
    rotation?.addEventListener('click', () => {
      paused = !paused;
      keyboardFocused = false;
      idleUntil = 0;
      syncRotation();
    });
    wrap.addEventListener(
      'pointerdown',
      (event) => {
        pointerActive = true;
        pointerX = event.clientX;
        pointerY = event.clientY;
        keyboardFocused = false;
        if (event.target instanceof Node && rotation?.contains(event.target))
          syncRotation();
        else if (
          event.target instanceof Element &&
          event.target.closest('button')
        )
          override();
        else syncRotation();
      },
      { passive: true },
    );
    wrap.addEventListener(
      'pointermove',
      (event) => {
        if (
          pointerActive &&
          Math.abs(event.clientX - pointerX) >
            Math.max(6, Math.abs(event.clientY - pointerY))
        )
          override();
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
    track.addEventListener(
      'wheel',
      (event) => {
        // Vertical wheel input scrolls the page, not the slideshow.
        if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY))
          override();
      },
      { passive: true },
    );
    track.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      override();
      go(
        (current + (event.key === 'ArrowRight' ? 1 : -1) + slides.length) %
          slides.length,
      );
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
    track.addEventListener('scrollend', () => {
      cancelAnimationFrame(raf);
      raf = 0;
      update();
    });
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncRotation();
      },
      { threshold: 0, rootMargin: '-64px 0px -24px 0px' },
    ).observe(wrap.querySelector('.slides-stage') ?? track);
    new ResizeObserver(() => {
      go(current, true);
      update();
      alignProgress();
    }).observe(track);
    const panel = wrap.closest<HTMLElement>('[data-panel]');
    if (panel)
      new MutationObserver(syncRotation).observe(panel, {
        attributes: true,
        attributeFilter: ['hidden'],
      });
    addEventListener('blur', release);
    track.addEventListener('lostpointercapture', release);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pointerActive = false;
      syncRotation();
    });
    document.querySelectorAll('dialog').forEach((dialog) => {
      new MutationObserver(syncRotation).observe(dialog, {
        attributes: true,
        attributeFilter: ['open'],
      });
    });
    document.addEventListener('site:preview', syncRotation);
    preference.addEventListener('change', () => {
      idleUntil = 0;
      syncRotation();
    });
    update();
  });
}
