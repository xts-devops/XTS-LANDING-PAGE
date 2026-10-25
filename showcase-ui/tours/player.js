/* Native, finite journey playback. Video bytes are requested only on intent. */
(() => {
  const root = document.querySelector('[data-journey]');
  const configNode = document.querySelector('[data-journey-config]');
  if (!root || !configNode) return;
  document.documentElement.classList.replace('no-js', 'js');
  const config = JSON.parse(configNode.textContent);
  const stage = root.querySelector('[data-tour-stage]');
  const video = root.querySelector('[data-journey-video]');
  const play = root.querySelector('[data-tour-play]');
  const status = root.querySelector('[data-tour-status]');
  const expand = root.querySelector('[data-tour-expand]');
  const motion = matchMedia('(prefers-reduced-motion:reduce)');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const chapters = [...root.querySelectorAll('[data-tour-chapter]')];
  let index = 0,
    token = 0,
    mode = 'idle',
    running = false,
    visible = true;
  let hoverTimer,
    cancelLoad,
    savedTime = 0;
  const localVideo = (url) =>
    typeof url === 'string' &&
    /^\/demos\/media\/tours\/[a-z0-9-]+\.mp4$/.test(url);
  const sourceFor = (chapter) => {
    const mobile =
      (innerWidth < 768 &&
        stage.clientWidth * (devicePixelRatio || 1) <= 1280) ||
      navigator.connection?.saveData;
    const source =
      mobile && chapter.mobileSrc ? chapter.mobileSrc : chapter.src;
    return localVideo(source) ? source : null;
  };
  const setStatus = (text) => {
    status.textContent = text;
  };
  const sync = () => {
    const chapter = config.chapters[index];
    chapters.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === index)),
    );
    root
      .querySelectorAll('[data-route-step]')
      .forEach((step, i) =>
        step.setAttribute('aria-current', i === index ? 'step' : 'false'),
      );
    root.querySelector('[data-tour-title]').textContent = chapter.title;
    root.querySelector('[data-tour-location]').textContent = chapter.location;
    root.querySelector('[data-tour-detail-title]').textContent = chapter.title;
    root.querySelector('[data-tour-summary]').textContent = chapter.summary;
    play.disabled = !sourceFor(chapter);
    play.textContent = play.disabled
      ? 'Footage pending'
      : running
        ? 'Pause journey'
        : root.dataset.state === 'complete'
          ? 'Replay journey'
          : savedTime > 0
            ? 'Resume journey'
            : 'Play journey';
    play.setAttribute('aria-pressed', String(running));
  };
  const release = () => {
    ++token;
    cancelLoad?.();
    cancelLoad = undefined;
    running = false;
    root.dataset.frame = 'false';
    video.pause();
    if (video.hasAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
  };
  const pause = (detach = false) => {
    clearTimeout(hoverTimer);
    if (Number.isFinite(video.currentTime) && video.currentTime > 0)
      savedTime = video.currentTime;
    running = false;
    video.pause();
    if (detach) release();
    root.dataset.state = 'paused';
    sync();
  };
  const ready = () =>
    new Promise((resolve) => {
      let timer;
      const done = (success) => {
        clearTimeout(timer);
        video.removeEventListener('loadeddata', loaded);
        video.removeEventListener('error', failed);
        cancelLoad = undefined;
        resolve(success);
      };
      const loaded = () => done(true);
      const failed = () => done(false);
      cancelLoad = () => done(false);
      video.addEventListener('loadeddata', loaded, { once: true });
      video.addEventListener('error', failed, { once: true });
      timer = setTimeout(failed, 8000);
    });
  const begin = async () => {
    clearTimeout(hoverTimer);
    if (document.hidden || !visible) return;
    const source = sourceFor(config.chapters[index]);
    if (!source) {
      root.dataset.state = 'draft';
      setStatus(
        'This chapter is planned. Footage is not connected; the image is a concept cover.',
      );
      sync();
      return;
    }
    if (!video.hasAttribute('src') || video.getAttribute('src') !== source) {
      release();
      const request = token;
      root.dataset.state = 'loading';
      setStatus(
        'Preparing ' + config.chapters[index].title.toLowerCase() + '…',
      );
      const loading = ready();
      video.preload = 'auto';
      video.muted = true;
      video.src = source;
      video.load();
      const loaded = await loading;
      if (request !== token) return;
      if (!loaded) {
        release();
        root.dataset.state = 'error';
        setStatus(
          'The film could not load. The concept cover and chapter descriptions remain available.',
        );
        sync();
        return;
      }
      root.querySelector('[data-tour-quality]').textContent =
        video.videoHeight >= 1080
          ? '1080p'
          : video.videoHeight >= 720
            ? '720p'
            : 'Preview';
      if (savedTime > 0 && Number.isFinite(video.duration))
        video.currentTime = Math.min(
          savedTime,
          Math.max(0, video.duration - 0.1),
        );
    }
    const request = token;
    try {
      await video.play();
      if (request !== token || document.hidden || !visible) {
        video.pause();
        return;
      }
      running = true;
      root.dataset.frame = 'true';
      root.dataset.state = 'playing';
      setStatus('Playing ' + config.chapters[index].title.toLowerCase() + '.');
      sync();
    } catch {
      running = false;
      root.dataset.state = 'paused';
      setStatus('Press Play to start this chapter.');
      sync();
    }
  };
  const select = async (next, autoplay = false) => {
    release();
    index = (next + chapters.length) % chapters.length;
    savedTime = 0;
    root.dataset.state = 'idle';
    chapters.forEach((button) => button.style.setProperty('--played', '0'));
    sync();
    parent.postMessage(
      { type: 'xts:overview-step', label: config.chapters[index].title },
      '*',
    );
    if (autoplay) await begin();
    else
      setStatus(
        sourceFor(config.chapters[index])
          ? 'Selected ' +
              config.chapters[index].title +
              '. Press Play to explore.'
          : 'Planned chapter: ' +
              config.chapters[index].title +
              '. Concept cover only; footage is pending.',
      );
  };
  play.addEventListener('click', () => {
    if (running) {
      pause();
      return;
    }
    mode = 'explicit';
    if (root.dataset.state === 'complete') void select(0, true);
    else void begin();
  });
  chapters.forEach((button, i) =>
    button.addEventListener('click', () => {
      const autoplay = running;
      mode = 'selected';
      clearTimeout(hoverTimer);
      void select(i, autoplay);
    }),
  );
  root.querySelector('[data-tour-prev]').addEventListener('click', () => {
    mode = 'selected';
    void select(index - 1, running);
  });
  root.querySelector('[data-tour-next]').addEventListener('click', () => {
    mode = 'selected';
    void select(index + 1, running);
  });
  video.addEventListener('waiting', () => {
    if (running) setStatus('Buffering this chapter…');
  });
  video.addEventListener('playing', () =>
    setStatus('Playing ' + config.chapters[index].title.toLowerCase() + '.'),
  );
  video.addEventListener('error', () => {
    if (root.dataset.state === 'loading') return;
    release();
    root.dataset.state = 'error';
    setStatus(
      'The film could not load. The concept cover and chapter descriptions remain available.',
    );
    sync();
  });
  video.addEventListener('timeupdate', () => {
    if (!Number.isFinite(video.duration) || !video.duration) return;
    chapters[index].style.setProperty(
      '--played',
      String(Math.min(1, video.currentTime / video.duration)),
    );
  });
  video.addEventListener('ended', () => {
    running = false;
    savedTime = 0;
    chapters[index].style.setProperty('--played', '1');
    if (index + 1 < chapters.length && mode !== 'selected')
      void select(index + 1, true);
    else {
      root.dataset.state = 'complete';
      setStatus(
        mode === 'selected'
          ? 'Chapter complete. Choose another space or replay the journey.'
          : 'Journey complete. Replay or explore a chapter.',
      );
      sync();
      parent.postMessage({ type: 'xts:overview-ended' }, '*');
    }
  });
  stage.addEventListener('pointerenter', () => {
    if (
      !fine.matches ||
      motion.matches ||
      navigator.connection?.saveData ||
      mode === 'explicit' ||
      !config.chapters.every((c) => sourceFor(c))
    )
      return;
    hoverTimer = setTimeout(() => {
      mode = 'hover';
      void select(0, true);
    }, 250);
  });
  stage.addEventListener('pointerleave', () => {
    clearTimeout(hoverTimer);
    if (mode === 'hover') {
      pause(true);
      savedTime = 0;
      mode = 'idle';
      void select(0);
    }
  });
  stage.addEventListener('keydown', (event) => {
    if (event.target !== stage) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      mode = 'selected';
      void select(index + (event.key === 'ArrowRight' ? 1 : -1), running);
    } else if (event.key === ' ') {
      event.preventDefault();
      play.click();
    }
  });
  expand.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await stage.requestFullscreen();
    } catch {
      setStatus('Use your browser full-screen command to expand this view.');
    }
  });
  document.addEventListener('fullscreenchange', () => {
    expand.setAttribute(
      'aria-label',
      document.fullscreenElement
        ? 'Exit expanded viewer'
        : 'Expand journey viewer',
    );
    if (!document.fullscreenElement) expand.focus({ preventScroll: true });
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) pause(true);
  }).observe(stage);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause(true);
  });
  motion.addEventListener('change', () => {
    pause(true);
    mode = 'idle';
  });
  addEventListener('pagehide', () => {
    clearTimeout(hoverTimer);
    release();
  });
  addEventListener('message', (event) => {
    if (event.source !== parent || event.data?.type !== 'xts:overview-start')
      return;
    if (motion.matches || new URLSearchParams(location.search).has('still')) {
      void select(chapters.length - 1);
      parent.postMessage({ type: 'xts:overview-ended' }, '*');
    } else {
      mode = 'hover';
      void select(0, true);
    }
  });
  root.dataset.state = 'idle';
  sync();
  parent.postMessage({ type: 'xts:overview-ready' }, '*');
})();
