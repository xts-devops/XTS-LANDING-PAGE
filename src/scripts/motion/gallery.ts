type Gsap = typeof import('gsap').gsap;
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger;

/** One section trigger: subtle image depth and honest scroll progress, never pinning. */
export function initPhotoGalleryMotion(gsap: Gsap, ScrollTrigger: ST) {
  const root = document.querySelector<HTMLElement>('[data-photo-gallery]');
  if (!root) return;
  const meter = root.querySelector<HTMLElement>('[data-gallery-progress]');
  const wide = gsap.matchMedia();
  wide.add('(min-width:901px) and (hover:hover) and (pointer:fine)', () => {
    const images = [
      ...root.querySelectorAll<HTMLImageElement>(
        '.gallery-item .photo > picture > img',
      ),
    ].filter((image) => !image.closest('.photo')?.querySelector('.on-photo'));
    gsap.fromTo(
      images,
      { yPercent: 3, scale: 1.08 },
      {
        yPercent: -3,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    );
  });
  root.classList.add('has-gallery-motion');
  ScrollTrigger.create({
    trigger: root,
    start: 'top 75%',
    end: 'bottom 65%',
    onUpdate: (state) => {
      if (meter)
        meter.style.transform = 'scaleX(' + state.progress.toFixed(3) + ')';
    },
  });
  return () => {
    wide.revert();
    root.classList.remove('has-gallery-motion');
    meter?.style.removeProperty('transform');
  };
}
