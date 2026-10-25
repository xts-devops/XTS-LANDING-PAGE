export interface AnchorRequest {
  top: number;
  fast?: boolean;
  cancel?: () => void;
  finish: () => void;
}
/** Align section content, rather than an empty padded section boundary, below the header. */
export function initAnchors() {
  const position = (target: HTMLElement) => {
    if (target.id === 'page-top') return 0;
    const content =
      target.querySelector<HTMLElement>('[data-scroll-start]') ?? target;
    const transform = getComputedStyle(content).transform;
    const revealOffset =
      transform === 'none' ? 0 : new DOMMatrix(transform).m42;
    return Math.max(
      0,
      scrollY +
        content.getBoundingClientRect().top -
        revealOffset -
        (document.querySelector('.site-header')?.getBoundingClientRect()
          .height ?? 0) -
        24,
    );
  };
  const find = (hash: string) => {
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return null;
    }
  };
  document.addEventListener('click', (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    const link = (e.target as Element).closest<HTMLAnchorElement>(
      'a[href*="#"]',
    );
    if (
      !link ||
      link.origin !== location.origin ||
      link.pathname !== location.pathname ||
      link.search !== location.search ||
      link.target ||
      link.hasAttribute('download') ||
      link.hash.length < 2
    )
      return;
    const target = find(link.hash);
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', link.hash);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
        target.addEventListener(
          'blur',
          () => target.removeAttribute('tabindex'),
          { once: true },
        );
      }
      target.focus({ preventScroll: true });
    };
    const top = position(target);
    const request = new CustomEvent<AnchorRequest>('site:anchor', {
      detail: { top, finish },
      cancelable: true,
    });
    if (!document.dispatchEvent(request)) return;
    scrollTo({
      top,
      behavior: matchMedia('(prefers-reduced-motion:reduce)').matches
        ? 'instant'
        : 'smooth',
    });
    addEventListener('scrollend', finish, { once: true });
    setTimeout(finish, 1000);
  });
  if (location.hash && !location.hash.startsWith('#system-'))
    requestAnimationFrame(() => {
      const target = find(location.hash);
      if (target) scrollTo({ top: position(target), behavior: 'instant' });
    });
}
