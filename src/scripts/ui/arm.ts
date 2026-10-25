/** Native, viewport-triggered arm loop. No frame-by-frame video seeking or touch pin. */
export function initArmPreview() {
  const root = document.querySelector<HTMLElement>('[data-exploded]');
  const scene = root?.querySelector<HTMLElement>('.exploded-pair');
  const video = root?.querySelector<HTMLVideoElement>('[data-exploded-video]');
  const bar = root?.querySelector<HTMLElement>('.exploded-progress');
  const photo = root?.querySelector<HTMLElement>('.exploded-b');
  const replay = root?.querySelector<HTMLButtonElement>('[data-arm-replay]');
  const toggle = root?.querySelector<HTMLButtonElement>('[data-arm-toggle]');
  if (!root || !scene || !photo || !replay || !toggle) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width:800px), (pointer:coarse)');
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  type Phase = 'idle' | 'loading' | 'playing' | 'hold' | 'resetting' | 'dwell';
  let phase: Phase = 'idle',
    visible = false,
    armed = false,
    near = false,
    manual = false,
    failed = false,
    generation = 0;
  let timer: ReturnType<typeof setTimeout> | undefined,
    deadline = 0,
    remaining = 0,
    continuation: (() => void) | null = null;
  let fallbackAnimation: Animation | undefined,
    progressAnimation: Animation | undefined;
  const eligible = () =>
    visible &&
    armed &&
    !manual &&
    !document.hidden &&
    !motion.matches &&
    !document.querySelector('dialog[open]') &&
    !document.documentElement.hasAttribute('data-returning-top');
  const usePhotos = () =>
    !video ||
    failed ||
    connection?.saveData ||
    /(^|-)2g$/.test(connection?.effectiveType ?? '');
  const setPhase = (value: Phase) => {
    phase = value;
    root.dataset.armPhase = value;
  };
  const render = (value: number) => {
    bar?.style.setProperty('--p', String(value));
  };
  const controls = () => {
    replay.hidden = toggle.hidden = motion.matches;
    replay.disabled = false;
    toggle.setAttribute('aria-pressed', String(manual));
    toggle.textContent =
      (manual ? toggle.dataset.resumeLabel : toggle.dataset.pauseLabel) ?? '';
    toggle.setAttribute('aria-label', toggle.textContent);
  };
  const freezeTimer = () => {
    if (deadline) remaining = Math.max(0, deadline - Date.now());
    clearTimeout(timer);
    deadline = 0;
  };
  const resumeTimer = () => {
    if (!continuation || deadline || !eligible()) return;
    deadline = Date.now() + remaining;
    timer = setTimeout(() => {
      const next = continuation;
      continuation = null;
      deadline = 0;
      next?.();
    }, remaining);
  };
  const after = (delay: number, next: () => void) => {
    clearTimeout(timer);
    deadline = 0;
    remaining = delay;
    continuation = next;
    resumeTimer();
  };
  const clearClock = () => {
    clearTimeout(timer);
    deadline = 0;
    continuation = null;
  };
  const load = () => {
    if (!video || usePhotos() || motion.matches || document.hidden) return;
    if (video.hasAttribute('src') && (phase === 'playing' || phase === 'hold'))
      return;
    const small =
      compact.matches && scene.clientWidth * (devicePixelRatio || 1) <= 1280;
    const source =
      (small ? video.dataset.mobileSrc : undefined) || video.dataset.src;
    if (
      source &&
      video.getAttribute('src') !== source &&
      !(video.hasAttribute('src') && source === video.dataset.mobileSrc)
    ) {
      video.preload = 'auto';
      video.src = source;
      video.load();
      removeEventListener('scroll', preload);
    }
  };
  const reset = () => {
    ++generation;
    clearClock();
    video?.pause();
    fallbackAnimation?.cancel();
    progressAnimation?.cancel();
    fallbackAnimation = progressAnimation = undefined;
    root.classList.remove('has-arm-video');
    photo.style.opacity = '0';
    render(0);
    setPhase('idle');
    if (video?.readyState) video.currentTime = 0;
  };
  const resetLoop = () => {
    setPhase('resetting');
    fallbackAnimation = photo.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 320,
      easing: 'ease-in-out',
    });
    photo.style.opacity = '0';
    after(360, () => {
      fallbackAnimation?.cancel();
      fallbackAnimation = undefined;
      video?.pause();
      if (video?.readyState) video.currentTime = 0;
      render(0);
      setPhase('dwell');
      after(1200, begin);
    });
  };
  const finish = () => {
    render(1);
    photo.style.opacity = '1';
    fallbackAnimation?.cancel();
    progressAnimation?.cancel();
    fallbackAnimation = progressAnimation = undefined;
    setPhase('hold');
    after(2200, resetLoop);
  };
  const playNative = async () => {
    if (!video || !eligible() || video.seeking) return;
    const token = ++generation;
    setPhase('playing');
    video.muted = true;
    video.playbackRate = Number.isFinite(video.duration)
      ? Math.min(3, Math.max(1, video.duration / (compact.matches ? 3.2 : 2.5)))
      : 1.5;
    root.classList.add('has-arm-video');
    try {
      await video.play();
      if (token !== generation) return;
      if (!eligible()) {
        video.pause();
        return;
      }
      root.classList.add('has-arm-video');
    } catch {
      if (token !== generation || !eligible()) return;
      failed = true;
      root.classList.remove('has-arm-video');
      photoLoop();
    }
  };
  const photoLoop = () => {
    setPhase('playing');
    render(0);
    photo.style.opacity = '0';
    fallbackAnimation = photo.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1800,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
    if (bar)
      progressAnimation = bar
        .querySelector('i')
        ?.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
          duration: 1800,
          easing: 'linear',
          fill: 'forwards',
        });
    after(1800, finish);
  };
  const begin = () => {
    if (!eligible()) return;
    fallbackAnimation?.cancel();
    progressAnimation?.cancel();
    fallbackAnimation = progressAnimation = undefined;
    photo.style.opacity = '0';
    render(0);
    if (usePhotos()) {
      photoLoop();
      return;
    }
    load();
    if (video && video.readyState >= 2 && !video.seeking) void playNative();
    else setPhase('loading');
  };
  const activity = () => {
    controls();
    if (!eligible()) {
      ++generation;
      video?.pause();
      fallbackAnimation?.pause();
      progressAnimation?.pause();
      freezeTimer();
      return;
    }
    fallbackAnimation?.play();
    progressAnimation?.play();
    if (phase === 'idle') begin();
    else if (phase === 'loading') {
      load();
      if (video && video.readyState >= 2) void playNative();
    } else if (phase === 'playing') {
      if (fallbackAnimation) {
        fallbackAnimation.play();
        progressAnimation?.play();
      } else if (video?.paused) void playNative();
      resumeTimer();
    } else resumeTimer();
  };
  video?.addEventListener('loadeddata', () => {
    if (phase === 'loading' && eligible()) void playNative();
  });
  video?.addEventListener('seeked', () => {
    if (phase === 'loading' && eligible()) void playNative();
  });
  video?.addEventListener('canplay', () => {
    if (phase === 'loading' && eligible()) void playNative();
  });
  video?.addEventListener('timeupdate', () => {
    if (
      phase === 'playing' &&
      Number.isFinite(video.duration) &&
      video.duration
    )
      render(Math.min(1, video.currentTime / video.duration));
  });
  video?.addEventListener('ended', () => {
    if (phase === 'playing') finish();
  });
  video?.addEventListener('error', () => {
    failed = true;
    root.classList.remove('has-arm-video');
    if (eligible()) {
      clearClock();
      begin();
    }
  });
  const preload = () => {
    if (near && scrollY > 80) load();
  };
  new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting;
      preload();
    },
    { rootMargin: '450px 0px' },
  ).observe(scene);
  addEventListener('scroll', preload, { passive: true });
  new IntersectionObserver(
    ([entry]) => {
      const height = Math.min(
        scene.getBoundingClientRect().height,
        Math.max(1, innerHeight - 120),
      );
      visible =
        entry.isIntersecting && entry.intersectionRect.height >= height * 0.25;
      if (visible && entry.intersectionRect.height >= height * 0.6)
        armed = true;
      if (!entry.isIntersecting) armed = false;
      activity();
    },
    {
      threshold: [0, 0.15, 0.25, 0.4, 0.6, 0.8, 1],
      rootMargin: '-80px 0px -24px 0px',
    },
  ).observe(scene);
  replay.addEventListener('click', () => {
    manual = false;
    reset();
    if (visible) armed = true;
    controls();
    begin();
  });
  toggle.addEventListener('click', () => {
    manual = !manual;
    activity();
  });
  document.addEventListener('visibilitychange', activity);
  document.addEventListener('site:preview', activity);
  motion.addEventListener('change', () => {
    reset();
    if (motion.matches) {
      video?.removeAttribute('src');
      video?.load();
      photo.style.removeProperty('opacity');
      bar?.style.removeProperty('--p');
    }
    activity();
  });
  new MutationObserver(() => {
    if (document.documentElement.hasAttribute('data-returning-top')) reset();
    else activity();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-returning-top'],
  });
  addEventListener('pagehide', () => {
    reset();
    video?.removeAttribute('src');
    video?.load();
  });
  addEventListener('pageshow', activity);
  root.dataset.armNative = 'true';
  controls();
  render(0);
}
