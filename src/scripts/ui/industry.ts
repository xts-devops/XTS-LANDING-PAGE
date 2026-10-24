/** One lazy, finite workflow overview. The screenshot remains the no-JS/failure fallback. */
export function initIndustryDemos() {
  const cards = [...document.querySelectorAll<HTMLElement>('[data-overview]')];
  if (!cards.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let active: HTMLElement | null = null,
    frame: HTMLIFrameElement | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined,
    failure: ReturnType<typeof setTimeout> | undefined;
  const control = (card: HTMLElement) =>
    card.querySelector<HTMLButtonElement>('[data-overview-play]')!;
  const label = (card: HTMLElement, state: 'play' | 'stop' | 'replay') => {
    const button = control(card);
    const text =
      state === 'play' && motion.matches
        ? button.dataset.stillLabel
        : state === 'play'
          ? button.dataset.playLabel
          : state === 'stop'
            ? button.dataset.stopLabel
            : button.dataset.replayLabel;
    button.setAttribute('aria-label', `${text}: ${button.dataset.title}`);
    button.setAttribute('aria-pressed', String(state === 'stop'));
    button.querySelector('[data-overview-label]')!.textContent = text ?? '';
    button.querySelector('.overview-symbol')!.textContent =
      state === 'stop' ? 'Ⅱ' : '▶';
  };
  const stop = () => {
    clearTimeout(timer);
    clearTimeout(failure);
    if (active) {
      active.dataset.preview = 'idle';
      label(active, 'play');
      active.querySelector('[data-overview-live]')?.replaceChildren();
    }
    frame = null;
    active = null;
  };
  const start = (card: HTMLElement, explicit = false) => {
    if (document.hidden || (!explicit && (motion.matches || !fine.matches)))
      return;
    if (active === card) return;
    stop();
    active = card;
    card.dataset.preview = 'loading';
    const button = control(card),
      host = card.querySelector<HTMLElement>('[data-overview-live]')!;
    frame = document.createElement('iframe');
    frame.title = `${button.dataset.title} workflow overview`;
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.referrerPolicy = 'no-referrer';
    frame.tabIndex = -1;
    frame.src = button.dataset.overviewUrl ?? '';
    if (motion.matches) frame.src += '&still=1';
    host.append(frame);
    label(card, 'stop');
    failure = setTimeout(() => {
      if (active === card) stop();
    }, 12000);
  };
  cards.forEach((card) => {
    const button = control(card),
      stage = card.querySelector<HTMLElement>('[data-overview-stage]')!;
    label(card, 'play');
    const resize = () =>
      stage.style.setProperty(
        '--overview-scale',
        String(
          card.querySelector<HTMLElement>('[data-overview-live]')!.clientWidth /
            1440,
        ),
      );
    new ResizeObserver(resize).observe(stage);
    resize();
    stage.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse' || motion.matches || !fine.matches)
        return;
      clearTimeout(timer);
      timer = setTimeout(() => start(card), 250);
    });
    stage.addEventListener('pointerleave', () => {
      clearTimeout(timer);
      if (active === card) stop();
    });
    button.addEventListener('click', () => {
      if (active === card && card.dataset.preview !== 'complete') stop();
      else {
        if (active === card) stop();
        start(card, true);
      }
    });
    card.addEventListener('focusout', (event) => {
      if (active === card && !card.contains(event.relatedTarget as Node))
        stop();
    });
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && active === card) stop();
    }).observe(stage);
  });
  addEventListener('message', (event) => {
    if (!active || !frame || event.source !== frame.contentWindow) return;
    if (event.data?.type === 'xts:overview-ready') {
      clearTimeout(failure);
      active.dataset.preview = 'playing';
      frame.contentWindow?.postMessage({ type: 'xts:overview-start' }, '*');
    }
    if (
      event.data?.type === 'xts:overview-step' &&
      typeof event.data.label === 'string'
    ) {
      active.querySelector('[data-overview-status]')!.textContent =
        event.data.label.slice(0, 100);
    }
    if (event.data?.type === 'xts:overview-ended') {
      active.querySelector('[data-overview-status]')!.textContent =
        control(active).dataset.completeLabel ?? '';
      active.dataset.preview = 'complete';
      label(active, 'replay');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') stop();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  motion.addEventListener('change', stop);
  fine.addEventListener('change', stop);
  addEventListener('pagehide', stop);
}
