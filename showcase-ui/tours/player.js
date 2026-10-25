/* One active film plus one bounded, intent-only next-chapter buffer. */
(() => {
  const root = document.querySelector('[data-journey]');
  const configNode = document.querySelector('[data-journey-config]');
  if (!root || !configNode) return;
  document.documentElement.classList.replace('no-js', 'js');
  const config = JSON.parse(configNode.textContent);
  const stage = root.querySelector('[data-tour-stage]');
  const play = root.querySelector('[data-tour-play]');
  const playLabel = root.querySelector('[data-tour-play-label]');
  const detail = root.querySelector('.route-description');
  let renderedIndex = -1;
  const status = root.querySelector('[data-tour-status]');
  const expand = root.querySelector('[data-tour-expand]');
  const cover = root.querySelector('.tour-cover');
  const hold = root.querySelector('[data-tour-hold]');
  const chapters = [...root.querySelectorAll('[data-tour-chapter]')];
  const motion = matchMedia('(prefers-reduced-motion:reduce)');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const embedded = parent !== window;
  const connection = navigator.connection;
  let video = root.querySelector('[data-journey-video]');
  let prepared = null,
    index = 0,
    operation = 0,
    mode = 'idle',
    running = false,
    wantPlay = false,
    visible = true,
    displayPixels = 0,
    savedTime = 0,
    hoverTimer,
    warmTimer,
    cancelLoad,
    checkpointAt = 0;
  const bindings = new WeakMap();
  const sourceFor = (chapter) => {
    const small =
      (displayPixels > 0
        ? displayPixels <= 1280
        : innerWidth < 768 &&
          stage.clientWidth * (devicePixelRatio || 1) <= 1280) ||
      connection?.saveData;
    const url = small && chapter.mobileSrc ? chapter.mobileSrc : chapter.src;
    return typeof url === 'string' &&
      /^\/demos\/media\/tours\/[a-z0-9-]+\.mp4$/.test(url)
      ? url
      : null;
  };
  const send = (data) => {
    if (embedded) parent.postMessage(data, '*');
  };
  const setStatus = (text) => {
    if (status.textContent !== text) status.textContent = text;
  };
  const sync = () => {
    const chapter = config.chapters[index];
    root.querySelector('[data-tour-index]').textContent =
      'CHAPTER / ' + String(index + 1).padStart(2, '0');
    const poster = chapter.poster || config.cover;
    if (cover.getAttribute('src') !== poster) cover.src = poster;
    chapters.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === index)),
    );
    root.querySelector('[data-tour-title]').textContent = chapter.title;
    root.querySelector('[data-tour-location]').textContent = chapter.location;
    root.querySelector('[data-tour-detail-title]').textContent = chapter.title;
    root.querySelector('[data-tour-summary]').textContent = chapter.summary;
    stage.setAttribute('aria-busy', String(root.dataset.state === 'loading'));
    play.disabled = !sourceFor(chapter);
    playLabel.textContent = play.disabled
      ? 'Footage pending'
      : wantPlay
        ? 'Pause journey'
        : root.dataset.state === 'complete'
          ? 'Replay journey'
          : savedTime > 0
            ? 'Resume journey'
            : 'Play journey';
    play.dataset.playMode = wantPlay
      ? 'pause'
      : root.dataset.state === 'complete'
        ? 'replay'
        : 'play';
    play.setAttribute('aria-pressed', String(wantPlay));
    if (renderedIndex >= 0 && renderedIndex !== index && !motion.matches) {
      detail.getAnimations().forEach((animation) => animation.cancel());
      detail.animate?.(
        [
          { opacity: 0.55, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' },
      );
    }
    renderedIndex = index;
  };
  const clearVideo = (target) => {
    bindings.get(target)?.abort();
    target.pause();
    if (target.hasAttribute('src')) {
      target.removeAttribute('src');
      target.load();
    }
  };
  const clearBuffer = () => {
    clearTimeout(warmTimer);
    warmTimer = undefined;
    if (prepared) clearVideo(prepared);
    prepared = null;
  };
  const cancel = () => {
    ++operation;
    cancelLoad?.();
    cancelLoad = undefined;
    clearTimeout(hoverTimer);
    clearTimeout(warmTimer);
    warmTimer = undefined;
  };
  const release = () => {
    cancel();
    clearBuffer();
    clearVideo(video);
    running = false;
    wantPlay = false;
    root.dataset.frame = 'false';
    root.dataset.held = 'false';
    hold.width = hold.height = 0;
  };
  const checkpoint = () =>
    send({
      type: 'xts:tour-position',
      chapter: index,
      time:
        video.hasAttribute('src') && Number.isFinite(video.currentTime)
          ? video.currentTime
          : savedTime,
      sequence: mode !== 'selected',
      playing: wantPlay,
      complete: root.dataset.state === 'complete',
    });
  const pause = (detach = false) => {
    const complete = root.dataset.state === 'complete';
    savedTime = Number.isFinite(video.currentTime)
      ? video.currentTime
      : savedTime;
    cancel();
    clearBuffer();
    running = false;
    wantPlay = false;
    video.pause();
    if (detach) release();
    else if (video.readyState < 2) clearVideo(video);
    root.dataset.state = complete ? 'complete' : 'paused';
    setStatus(
      complete
        ? 'Journey complete. Replay or explore a chapter.'
        : 'Journey paused. Resume whenever you are ready.',
    );
    sync();
    checkpoint();
    send({ type: 'xts:tour-state', state: 'paused' });
  };
  const snapshot = () => {
    if (
      video.readyState < 2 ||
      !video.videoWidth ||
      root.dataset.frame !== 'true'
    )
      return;
    try {
      hold.width = video.videoWidth;
      hold.height = video.videoHeight;
      hold.getContext('2d').drawImage(video, 0, 0);
      root.dataset.held = 'true';
    } catch {
      root.dataset.held = 'false';
    }
  };
  const createVideo = () => {
    const target = document.createElement('video');
    target.muted = true;
    target.setAttribute('muted', '');
    target.setAttribute('playsinline', '');
    target.preload = 'none';
    target.setAttribute(
      'aria-label',
      config.id === 'hotel' ? 'Hotel journey film' : 'Property journey film',
    );
    return target;
  };
  const waitReady = (target) => {
    if (target.readyState >= 2) return Promise.resolve(true);
    if (target.error) return Promise.resolve(false);
    return new Promise((resolve) => {
      let timer;
      const done = (success) => {
        clearTimeout(timer);
        target.removeEventListener('loadeddata', loaded);
        target.removeEventListener('error', failed);
        if (cancelLoad === stop) cancelLoad = undefined;
        resolve(success);
      };
      const loaded = () => done(true),
        failed = () => done(false),
        stop = () => done(false);
      cancelLoad = stop;
      target.addEventListener('loadeddata', loaded, { once: true });
      target.addEventListener('error', failed, { once: true });
      timer = setTimeout(failed, 10000);
    });
  };
  const warmNext = () => {
    if (warmTimer) return;
    if (
      !running ||
      mode === 'selected' ||
      motion.matches ||
      connection?.saveData ||
      /(^|-)2g$/.test(connection?.effectiveType || '') ||
      document.hidden ||
      !visible ||
      index + 1 >= chapters.length
    )
      return;
    const next = sourceFor(config.chapters[index + 1]);
    if (!next || prepared?.getAttribute('src') === next) return;
    const request = operation;
    warmTimer = setTimeout(() => {
      warmTimer = undefined;
      if (request !== operation || !running || document.hidden || !visible)
        return;
      let safeAhead = false;
      for (let range = 0; range < video.buffered.length; range++) {
        if (
          video.buffered.start(range) <= video.currentTime + 0.1 &&
          video.buffered.end(range) >=
            Math.min(video.duration - 0.1, video.currentTime + 2)
        )
          safeAhead = true;
      }
      if (!safeAhead) return;
      clearBuffer();
      prepared = createVideo();
      prepared.preload = 'auto';
      prepared.src = next;
      prepared.load();
    }, 500);
  };
  const fail = () => {
    release();
    root.dataset.state = 'error';
    setStatus(
      'The film could not load. Choose a chapter to try again; the still preview remains available.',
    );
    sync();
    send({ type: 'xts:tour-state', state: 'error' });
  };
  const bind = (target) => {
    bindings.get(target)?.abort();
    const controller = new AbortController();
    bindings.set(target, controller);
    const on = (name, callback) =>
      target.addEventListener(name, callback, { signal: controller.signal });
    on('transitionend', (event) => {
      if (
        event.propertyName === 'opacity' &&
        target === video &&
        root.dataset.frame === 'true'
      ) {
        root.dataset.held = 'false';
        hold.width = hold.height = 0;
      }
    });
    on('progress', warmNext);
    on('waiting', () => {
      if (wantPlay) setStatus('Preparing this chapter…');
    });
    on('playing', () => {
      if (wantPlay)
        setStatus(
          'Playing ' + config.chapters[index].title.toLowerCase() + '.',
        );
    });
    on('error', () => {
      if (wantPlay && root.dataset.state !== 'loading') fail();
    });
    on('timeupdate', () => {
      if (!Number.isFinite(target.duration) || !target.duration) return;
      chapters[index].style.setProperty(
        '--played',
        String(Math.min(1, target.currentTime / target.duration)),
      );
      if (performance.now() - checkpointAt > 400) {
        checkpointAt = performance.now();
        checkpoint();
      }
    });
    on('ended', () => {
      running = false;
      wantPlay = false;
      savedTime = 0;
      chapters[index].style.setProperty('--played', '1');
      if (index + 1 < chapters.length && mode !== 'selected')
        void select(index + 1, true);
      else {
        clearBuffer();
        root.dataset.state = 'complete';
        setStatus(
          mode === 'selected'
            ? 'Chapter complete. Choose another space or replay the journey.'
            : 'Journey complete. Replay or explore a chapter.',
        );
        sync();
        checkpoint();
        send({ type: 'xts:overview-ended' });
      }
    });
  };
  const begin = async () => {
    cancel();
    if (document.hidden || !visible) return;
    const source = sourceFor(config.chapters[index]);
    if (!source) {
      root.dataset.state = 'draft';
      setStatus(
        'This chapter is planned. Its still preview remains available.',
      );
      sync();
      return;
    }
    const request = operation;
    wantPlay = true;
    running = false;
    root.dataset.state = 'loading';
    setStatus('Preparing ' + config.chapters[index].title.toLowerCase() + '…');
    if (video.getAttribute('src') !== source) {
      snapshot();
      root.dataset.frame = 'false';
      const incoming =
        prepared?.getAttribute('src') === source ? prepared : createVideo();
      if (incoming === prepared) prepared = null;
      clearBuffer();
      incoming.setAttribute('data-journey-video', '');
      const previous = video;
      incoming.playbackRate = previous.playbackRate;
      previous.replaceWith(incoming);
      video = incoming;
      clearVideo(previous);
      bind(video);
      if (!video.hasAttribute('src')) {
        video.preload = 'auto';
        video.src = source;
        video.load();
      }
    } else bind(video);
    const target = video;
    sync();
    const loaded = await waitReady(target);
    if (request !== operation || !wantPlay) return;
    if (!loaded) {
      fail();
      return;
    }
    root.querySelector('[data-tour-quality]').textContent =
      target.videoHeight >= 1080
        ? '1080p'
        : target.videoHeight >= 720
          ? '720p'
          : 'Preview';
    if (savedTime > 0 && Number.isFinite(target.duration))
      target.currentTime = Math.min(
        savedTime,
        Math.max(0, target.duration - 0.1),
      );
    try {
      await target.play();
      if (request !== operation || !wantPlay || document.hidden || !visible) {
        target.pause();
        return;
      }
      running = true;
      root.dataset.frame = 'true';
      if (motion.matches) {
        root.dataset.held = 'false';
        hold.width = hold.height = 0;
      }
      root.dataset.state = 'playing';
      setStatus('Playing ' + config.chapters[index].title.toLowerCase() + '.');
      sync();
      checkpoint();
      warmNext();
      send({ type: 'xts:tour-state', state: 'playing' });
    } catch {
      if (request !== operation) return;
      running = false;
      wantPlay = false;
      root.dataset.state = 'paused';
      setStatus('Press Play to start this chapter.');
      sync();
    }
  };
  const select = async (next, autoplay = false, resumeTime = 0) => {
    cancel();
    video.pause();
    running = false;
    wantPlay = false;
    index = (next + chapters.length) % chapters.length;
    savedTime = resumeTime;
    root.dataset.state = 'idle';
    chapters.forEach((button) => button.style.setProperty('--played', '0'));
    sync();
    send({ type: 'xts:overview-step', label: config.chapters[index].title });
    if (autoplay) await begin();
    else {
      release();
      sync();
      setStatus(
        sourceFor(config.chapters[index])
          ? 'Selected ' +
              config.chapters[index].title +
              '. Press Play to explore.'
          : 'Planned chapter. Concept cover only; footage is pending.',
      );
    }
  };
  const choose = (next) => {
    const autoplay = wantPlay || (!motion.matches && !connection?.saveData);
    mode = 'selected';
    if (next === index && wantPlay) {
      clearBuffer();
      return;
    }
    void select(next, autoplay);
  };
  play.addEventListener('click', () => {
    if (wantPlay) {
      if (mode === 'hover') mode = 'explicit';
      pause();
      return;
    }
    if (root.dataset.state === 'complete') {
      mode = 'explicit';
      void select(0, true);
    } else {
      if (mode !== 'selected') mode = 'explicit';
      void begin();
    }
  });
  chapters.forEach((button, i) =>
    button.addEventListener('click', () => choose(i)),
  );
  if (embedded) {
    root.classList.add('journey-embedded');
    root.querySelector('.journey-brand').removeAttribute('href');
    expand.hidden = true;
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') send({ type: 'xts:overview-close' });
    });
  }
  stage.addEventListener('pointerenter', () => {
    if (
      embedded ||
      !fine.matches ||
      motion.matches ||
      connection?.saveData ||
      mode !== 'idle' ||
      !config.chapters.every((c) => sourceFor(c))
    )
      return;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      mode = 'hover';
      void select(0, true);
    }, 250);
  });
  stage.addEventListener('pointerleave', () => {
    clearTimeout(hoverTimer);
    if (!embedded && mode === 'hover') {
      release();
      savedTime = 0;
      mode = 'idle';
      void select(0);
    }
  });
  stage.addEventListener('keydown', (event) => {
    if (event.target !== stage) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      choose(
        (index + (event.key === 'ArrowRight' ? 1 : chapters.length - 1)) %
          chapters.length,
      );
    } else if (event.key === ' ') {
      event.preventDefault();
      play.click();
    }
  });
  expand.addEventListener('click', async () => {
    clearTimeout(hoverTimer);
    mode = 'explicit';
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
    detail.getAnimations().forEach((animation) => animation.cancel());
    pause(true);
    mode = 'idle';
  });
  connection?.addEventListener?.('change', () => {
    if (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ''))
      clearBuffer();
  });
  addEventListener('pagehide', release);
  addEventListener('message', (event) => {
    if (
      !embedded ||
      event.source !== parent ||
      event.data?.type !== 'xts:overview-start'
    )
      return;
    const data = event.data;
    if (
      typeof data.pixelWidth === 'number' &&
      data.pixelWidth > 0 &&
      data.pixelWidth <= 20000
    )
      displayPixels = data.pixelWidth;
    const position = data.position;
    const valid =
      position &&
      Number.isInteger(position.chapter) &&
      position.chapter >= 0 &&
      position.chapter < chapters.length &&
      Number.isFinite(position.time) &&
      position.time >= 0 &&
      position.time <= 60;
    if (valid && position.complete === true) {
      void select(position.chapter);
      root.dataset.state = 'complete';
      setStatus('Journey complete. Replay or explore a chapter.');
      sync();
      send({ type: 'xts:overview-ended' });
    } else if (
      connection?.saveData ||
      motion.matches ||
      new URLSearchParams(location.search).has('still')
    ) {
      void select(
        valid ? position.chapter : 0,
        false,
        valid ? position.time : 0,
      );
      send({ type: 'xts:overview-ended', still: true });
    } else {
      mode =
        valid && position.sequence === false
          ? 'selected'
          : data.interaction === 'expanded'
            ? 'explicit'
            : 'hover';
      void select(
        valid ? position.chapter : 0,
        !valid || position.playing !== false,
        valid ? position.time : 0,
      );
    }
  });
  bind(video);
  root.dataset.state = 'idle';
  sync();
  send({ type: 'xts:overview-ready' });
})();
