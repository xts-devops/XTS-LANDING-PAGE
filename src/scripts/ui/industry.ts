/** One finite, lazy workflow frame, either in its card or in an accessible inspector. */
export function initIndustryDemos() {
  const cards = [...document.querySelectorAll<HTMLElement>('[data-overview]')];
  const dialog = document.querySelector<HTMLDialogElement>(
    '[data-overview-dialog]',
  );
  if (!cards.length || !dialog) return;
  const viewport = dialog.querySelector<HTMLElement>(
    '[data-overview-inspect]',
  )!;
  const expandedHost = dialog.querySelector<HTMLElement>(
    '[data-overview-expanded-live]',
  )!;
  const poster = dialog.querySelector<HTMLElement>(
    '[data-overview-expanded-poster]',
  )!;
  const sizing = dialog.querySelector<HTMLButtonElement>(
    '[data-overview-size]',
  )!;
  const close = dialog.querySelector<HTMLButtonElement>(
    '[data-overview-close]',
  )!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const connection = (
    navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const automaticBlocked = () =>
    connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '');
  type TourPosition = {
    chapter: number;
    time: number;
    sequence: boolean;
    playing: boolean;
    complete: boolean;
  };
  let tourPosition: TourPosition | null = null,
    resumePosition: TourPosition | null = null,
    readyHandled = false;
  let active: HTMLElement | null = null,
    expanded: HTMLElement | null = null,
    suppressed: HTMLElement | null = null,
    opener: HTMLButtonElement | null = null,
    frame: HTMLIFrameElement | null = null,
    actual = false,
    restoringFocus = false;
  let timer: ReturnType<typeof setTimeout> | undefined,
    failure: ReturnType<typeof setTimeout> | undefined;
  const journeyPositions = new WeakMap<HTMLElement, TourPosition>();
  const pausedJourneys = new WeakSet<HTMLElement>();
  const visibleJourneys = new Set<HTMLElement>();
  let interactionCard: HTMLElement | null = null;
  let autoTimer: ReturnType<typeof setTimeout> | undefined;
  const journeyToggle = (card: HTMLElement, playing: boolean, show = true) => {
    const control = card.querySelector<HTMLButtonElement>(
      '[data-journey-toggle]',
    );
    if (!control) return;
    control.hidden = !show;
    control.setAttribute('aria-pressed', String(!playing));
    control.setAttribute(
      'aria-label',
      (playing ? control.dataset.pauseLabel : control.dataset.resumeLabel) ??
        '',
    );
    control.querySelector('span')!.textContent =
      (playing ? control.dataset.pauseText : control.dataset.resumeText) ?? '';
  };
  const status = (card: HTMLElement, text: string) => {
    card.querySelector('[data-overview-status]')!.textContent = text;
    if (expanded === card)
      dialog.querySelector('[data-overview-dialog-status]')!.textContent = text;
  };
  const fit = () => {
    const scale = actual
      ? 1
      : Math.min(1, viewport.clientWidth / 1440, viewport.clientHeight / 900);
    dialog.style.setProperty('--expanded-scale', String(scale));
  };
  new ResizeObserver(fit).observe(viewport);
  const stop = () => {
    clearTimeout(timer);
    clearTimeout(failure);
    if (active) {
      if (tourPosition) journeyPositions.set(active, tourPosition);
      journeyToggle(active, false, pausedJourneys.has(active));
      active.dataset.preview = 'idle';
      status(active, active.dataset.idleLabel ?? '');
    }
    frame?.remove();
    frame = null;
    active = null;
    tourPosition = null;
    resumePosition = null;
    readyHandled = false;
    dialog.dataset.preview = 'idle';
  };
  const start = (
    card: HTMLElement,
    explicit = false,
    position: TourPosition | null = journeyPositions.get(card) ?? null,
  ) => {
    if (
      document.hidden ||
      (dialog.open && expanded !== card) ||
      (!explicit &&
        (motion.matches ||
          (card.dataset.journeyPreview !== 'true' && !fine.matches) ||
          automaticBlocked()))
    )
      return;
    if (active === card && frame) return;
    stop();
    active = card;
    resumePosition = position;
    tourPosition = position;
    card.dataset.preview = 'loading';
    const host =
      expanded === card && dialog.open
        ? expandedHost
        : card.querySelector<HTMLElement>('[data-overview-live]')!;
    frame = document.createElement('iframe');
    frame.title = `${card.dataset.title} workflow overview`;
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.referrerPolicy = 'no-referrer';
    const interactive =
      expanded === card && card.dataset.journeyPreview === 'true';
    frame.tabIndex = interactive ? 0 : -1;
    expandedHost.inert = !interactive;
    expandedHost.setAttribute('aria-hidden', String(!interactive));
    dialog.dataset.tourInteractive = String(interactive);
    frame.src =
      (card.dataset.overviewUrl ?? '') + (motion.matches ? '&still=1' : '');
    host.append(frame);
    status(card, card.dataset.loadingLabel ?? '');
    const requestedFrame = frame;
    const failed = () => {
      if (active !== card || frame !== requestedFrame) return;
      stop();
      status(card, card.dataset.failureLabel ?? '');
    };
    frame.addEventListener('error', failed, { once: true });
    failure = setTimeout(failed, 12000);
  };
  const scheduleJourney = () => {
    clearTimeout(autoTimer);
    if (
      dialog.open ||
      document.hidden ||
      motion.matches ||
      automaticBlocked() ||
      active ||
      interactionCard
    )
      return;
    autoTimer = setTimeout(() => {
      if (
        active ||
        interactionCard ||
        dialog.open ||
        document.hidden ||
        motion.matches ||
        automaticBlocked()
      )
        return;
      const candidates = cards
        .filter((card) => {
          if (
            card.dataset.journeyPreview !== 'true' ||
            suppressed === card ||
            pausedJourneys.has(card) ||
            journeyPositions.get(card)?.complete
          )
            return false;
          const rect = card
            .querySelector('[data-overview-stage]')!
            .getBoundingClientRect();
          const height = Math.max(
            0,
            Math.min(rect.bottom, innerHeight - 24) - Math.max(rect.top, 80),
          );
          const width = Math.max(
            0,
            Math.min(rect.right, innerWidth) - Math.max(rect.left, 0),
          );
          return height * width >= rect.height * rect.width * 0.7;
        })
        .sort((a, b) => {
          const distance = (card: HTMLElement) => {
            const rect = card.getBoundingClientRect();
            return Math.abs((rect.left + rect.right) / 2 - innerWidth / 2);
          };
          return distance(a) - distance(b);
        });
      if (candidates[0]) start(candidates[0]);
    }, 250);
  };

  const openViewer = (card: HTMLElement, button: HTMLButtonElement) => {
    const position =
      active === card ? tourPosition : (journeyPositions.get(card) ?? null);
    clearTimeout(autoTimer);
    stop();
    expanded = card;
    opener = button;
    actual = false;
    sizing.textContent = dialog.dataset.actualLabel ?? '';
    sizing.setAttribute('aria-pressed', 'false');
    dialog.querySelector('[data-overview-title]')!.textContent =
      card.dataset.title ?? '';
    const template = card.querySelector<HTMLTemplateElement>(
      '[data-overview-poster]',
    )!;
    poster.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    viewport.scrollTo(0, 0);
    fit();
    close.focus({ preventScroll: true });
    document.dispatchEvent(
      new CustomEvent('site:preview', { detail: { open: true } }),
    );
    start(card, true, position);
  };
  const closeViewer = () => {
    restoringFocus = true;
    suppressed = expanded;
    dialog.close();
  };
  close.addEventListener('click', closeViewer);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeViewer();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      closeViewer();
  });
  dialog.addEventListener('close', () => {
    stop();
    expanded = null;
    poster.replaceChildren();
    restoringFocus = true;
    opener?.focus({ preventScroll: true });
    queueMicrotask(() => {
      restoringFocus = false;
    });
    document.dispatchEvent(
      new CustomEvent('site:preview', { detail: { open: false } }),
    );
  });
  sizing.addEventListener('click', () => {
    actual = !actual;
    sizing.textContent =
      (actual ? dialog.dataset.fitLabel : dialog.dataset.actualLabel) ?? '';
    sizing.setAttribute('aria-pressed', String(actual));
    fit();
    viewport.scrollTo(0, 0);
  });
  cards.forEach((card) => {
    const button = card.querySelector<HTMLButtonElement>(
      '[data-overview-open]',
    )!;
    const stage = card.querySelector<HTMLElement>('[data-overview-stage]')!;
    const host = card.querySelector<HTMLElement>('[data-overview-live]')!;
    const resize = () =>
      stage.style.setProperty(
        '--overview-scale',
        String(host.clientWidth / 1440),
      );
    new ResizeObserver(resize).observe(stage);
    resize();
    const toggle = card.querySelector<HTMLButtonElement>(
      '[data-journey-toggle]',
    );
    toggle?.addEventListener('click', () => {
      if (active !== card || !frame) {
        pausedJourneys.delete(card);
        suppressed = null;
        const position = journeyPositions.get(card);
        start(
          card,
          true,
          position ? { ...position, playing: true, complete: false } : null,
        );
        return;
      }
      const paused = toggle.getAttribute('aria-pressed') !== 'true';
      if (paused) pausedJourneys.add(card);
      else pausedJourneys.delete(card);
      journeyToggle(card, !paused);
      frame.contentWindow?.postMessage(
        { type: 'xts:tour-control', action: paused ? 'pause' : 'resume' },
        '*',
      );
    });
    stage.addEventListener('pointerenter', (event) => {
      interactionCard = card;
      clearTimeout(autoTimer);
      if (
        event.pointerType !== 'mouse' ||
        motion.matches ||
        !fine.matches ||
        dialog.open ||
        suppressed === card
      )
        return;
      clearTimeout(timer);
      timer = setTimeout(() => start(card), 250);
    });
    stage.addEventListener('pointerleave', () => {
      if (interactionCard === card) interactionCard = null;
      clearTimeout(timer);
      if (dialog.open) return;
      if (suppressed === card) suppressed = null;
      if (active === card && !visibleJourneys.has(card)) stop();
      scheduleJourney();
    });
    button.addEventListener('click', () => openViewer(card, button));
    button.addEventListener('focus', () => {
      clearTimeout(autoTimer);
      if (
        !motion.matches &&
        !automaticBlocked() &&
        !dialog.open &&
        !restoringFocus &&
        suppressed !== card &&
        button.matches(':focus-visible')
      ) {
        clearTimeout(timer);
        timer = setTimeout(() => start(card, true), 250);
      }
    });
    card.addEventListener('focusout', (event) => {
      if (!card.contains(event.relatedTarget as Node) && !dialog.open) {
        clearTimeout(timer);
        if (suppressed === card) suppressed = null;
        if (active === card && !visibleJourneys.has(card)) {
          stop();
          scheduleJourney();
        }
      }
    });
    new IntersectionObserver(
      ([entry]) => {
        if (card.dataset.journeyPreview === 'true') {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7)
            visibleJourneys.add(card);
          else visibleJourneys.delete(card);
          if (!entry.isIntersecting) {
            if (suppressed === card) suppressed = null;
            if (!dialog.open && active === card) stop();
          }
          scheduleJourney();
        } else if (!entry.isIntersecting && !dialog.open && active === card) {
          stop();
          scheduleJourney();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.7, 1], rootMargin: '-80px 0px -24px 0px' },
    ).observe(stage);
  });
  addEventListener('message', (event) => {
    if (!active || !frame || event.source !== frame.contentWindow) return;
    if (event.data?.type === 'xts:overview-close' && dialog.open) {
      closeViewer();
      return;
    }
    if (
      event.data?.type === 'xts:tour-position' &&
      active.dataset.journeyPreview === 'true'
    ) {
      const data = event.data;
      if (
        Number.isInteger(data.chapter) &&
        data.chapter >= 0 &&
        data.chapter < 8 &&
        Number.isFinite(data.time) &&
        data.time >= 0 &&
        data.time <= 60 &&
        typeof data.sequence === 'boolean' &&
        typeof data.playing === 'boolean' &&
        typeof data.complete === 'boolean'
      )
        tourPosition = {
          chapter: data.chapter,
          time: data.time,
          sequence: data.sequence,
          playing: data.playing,
          complete: data.complete,
        };
    }
    if (
      event.data?.type === 'xts:tour-state' &&
      active.dataset.journeyPreview === 'true'
    ) {
      if (event.data.state === 'playing') {
        pausedJourneys.delete(active);
        journeyToggle(active, true);
        active.dataset.preview = 'playing';
        dialog.dataset.preview = 'playing';
      }
      if (event.data.state === 'error')
        status(active, active.dataset.failureLabel ?? '');
      if (event.data.state === 'paused') {
        if (event.data.manual === true) pausedJourneys.add(active);
        journeyToggle(active, false);
        status(active, 'Journey paused');
      }
    }
    if (event.data?.type === 'xts:overview-ready') {
      if (readyHandled) return;
      readyHandled = true;
      clearTimeout(failure);
      active.dataset.preview = 'playing';
      dialog.dataset.preview = 'playing';
      frame.contentWindow?.postMessage(
        {
          type: 'xts:overview-start',
          interaction: dialog.open ? 'expanded' : 'hover',
          position: resumePosition,
          pixelWidth: Math.ceil(
            frame.getBoundingClientRect().width * (devicePixelRatio || 1),
          ),
        },
        '*',
      );
    }
    if (
      event.data?.type === 'xts:overview-step' &&
      typeof event.data.label === 'string'
    )
      status(active, event.data.label.slice(0, 100));
    if (event.data?.type === 'xts:overview-ended') {
      status(
        active,
        event.data.still === true && active.dataset.journeyPreview === 'true'
          ? 'Ready to explore'
          : (active.dataset.completeLabel ?? ''),
      );
      journeyToggle(active, false, false);
      active.dataset.preview = 'complete';
      dialog.dataset.preview = 'complete';
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dialog.open) {
      suppressed = active;
      clearTimeout(autoTimer);
      stop();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(autoTimer);
      const position = tourPosition;
      stop();
      resumePosition = position;
    } else if (dialog.open && expanded) start(expanded, true, resumePosition);
    else scheduleJourney();
  });
  motion.addEventListener('change', () => {
    const position = tourPosition;
    stop();
    if (dialog.open && expanded) start(expanded, true, position);
  });
  fine.addEventListener('change', () => {
    if (!dialog.open) {
      stop();
      scheduleJourney();
    }
  });
  addEventListener('pagehide', () => {
    clearTimeout(autoTimer);
    stop();
    if (dialog.open) closeViewer();
  });
}
