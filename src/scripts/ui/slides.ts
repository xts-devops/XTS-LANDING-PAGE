/**
 * Slideshows: native scroll-snap does swipe/drag/keyboard scrolling; this adds prev/next,
 * a live "n / total" counter, arrow-key paging and button disabling at the ends.
 */
export function initSlides(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-slides]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-slides-track]');
    const prev = wrap.querySelector<HTMLButtonElement>('[data-prev]');
    const next = wrap.querySelector<HTMLButtonElement>('[data-next]');
    const label = wrap.querySelector<HTMLElement>('[data-count-label]');
    if (!track) return;
    const slides = [...track.children] as HTMLElement[];
    if (slides.length < 2) return;

    let current = 0;
    const update = () => {
      const index = Math.round(
        track.scrollLeft /
          Math.max(1, slides[1].offsetLeft - slides[0].offsetLeft),
      );
      current = Math.min(slides.length - 1, Math.max(0, index));
      wrap
        .querySelectorAll<HTMLButtonElement>('[data-slide-index]')
        .forEach((button, i) =>
          button.setAttribute('aria-pressed', String(i === current)),
        );
      if (label) label.textContent = `${current + 1} / ${slides.length}`;
      if (prev) prev.disabled = current === 0;
      if (next) next.disabled = current === slides.length - 1;
    };
    const go = (index: number) => {
      const target = slides[Math.min(slides.length - 1, Math.max(0, index))];
      track.scrollTo({
        left: target.offsetLeft - track.offsetLeft,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    };

    wrap
      .querySelectorAll<HTMLButtonElement>('[data-slide-index]')
      .forEach((button) =>
        button.addEventListener('click', () =>
          go(Number(button.dataset.slideIndex)),
        ),
      );
    prev?.addEventListener('click', () => go(current - 1));
    next?.addEventListener('click', () => go(current + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      go(current + (e.key === 'ArrowRight' ? 1 : -1));
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
    // Hidden panels report 0 width; re-sync when a tab reveals this slideshow.
    new ResizeObserver(update).observe(track);
    update();
  });
}
