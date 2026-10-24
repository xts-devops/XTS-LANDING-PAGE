/* Standalone demo logic. Local sample state only; no APIs, analytics or persisted data. */
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const status = $('[data-toast]');
  let toastTimer;
  const notify = (text) => {
    if (!status) return;
    clearTimeout(toastTimer);
    status.textContent = text;
    status.hidden = false;
    toastTimer = setTimeout(() => {
      status.hidden = true;
    }, 6000);
  };
  const pressed = (buttons, active) =>
    buttons.forEach((b) =>
      b.setAttribute('aria-pressed', String(b === active)),
    );
  const money = (n) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(n);
  const formatDate = (value) =>
    new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value + 'T12:00:00'));
  if (window.self !== window.top) {
    const link = $('.demo-banner a');
    if (link) link.hidden = true;
  }
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.self !== window.top) {
      parent.postMessage({ type: 'xts:demo-close' }, '*');
    }
  });
  const cart = new Map();
  let ticketVisible = false;
  const ticketElement = $('.ticket');
  if (ticketElement)
    new IntersectionObserver(([entry]) => {
      ticketVisible = entry.isIntersecting;
      const peek = $('[data-show-ticket]');
      if (peek) peek.hidden = !cart.size || ticketVisible;
    }).observe(ticketElement);
  const drawCart = () => {
    const holder = $('[data-cart]');
    if (!holder) return;
    holder.replaceChildren();
    let total = 0;
    for (const [name, item] of cart) {
      total += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-row';
      const info = document.createElement('div');
      const b = document.createElement('b');
      b.textContent = name;
      const small = document.createElement('small');
      small.textContent = `${item.qty} × ${money(item.price)}`;
      info.append(b, small);
      const amount = document.createElement('span');
      amount.textContent = money(item.price * item.qty);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = '−';
      remove.setAttribute('aria-label', `Remove one ${name}`);
      remove.addEventListener('click', () => {
        item.qty--;
        if (!item.qty) cart.delete(name);
        drawCart();
      });
      row.append(info, amount, remove);
      holder.append(row);
    }
    if (!cart.size) {
      const p = document.createElement('p');
      p.className = 'empty';
      p.textContent = 'Choose something from the menu.';
      holder.append(p);
    }
    $('[data-total]').textContent = money(total);
    $('[data-checkout]').disabled = !cart.size;
    const peek = $('[data-show-ticket]');
    if (peek) {
      peek.hidden = !cart.size || ticketVisible;
      peek.textContent = `View ticket · ${money(total)}`;
    }
  };
  $$('[data-product]').forEach((button) =>
    button.addEventListener('click', () => {
      const name = button.dataset.product;
      const item = cart.get(name) ?? {
        price: Number(button.dataset.price),
        qty: 0,
      };
      item.qty++;
      cart.set(name, item);
      drawCart();
      notify(`${name} added to the sample ticket.`);
    }),
  );
  $('[data-checkout]')?.addEventListener('click', () => {
    const total = $('[data-total]').textContent;
    cart.clear();
    drawCart();
    notify(`Sample sale complete · ${total}. No payment was collected.`);
  });
  $('[data-show-ticket]')?.addEventListener('click', () => {
    const ticket = $('.ticket');
    ticket.setAttribute('tabindex', '-1');
    ticket.focus({ preventScroll: true });
    ticket.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion:reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  });
  let category = 'All';
  const filterProducts = () => {
    const term = $('[data-product-search]').value.trim().toLowerCase();
    let count = 0;
    $$('[data-product]').forEach((b) => {
      b.hidden = !(
        b.dataset.product.toLowerCase().includes(term) &&
        (category === 'All' || b.dataset.category === category)
      );
      if (!b.hidden) count++;
    });
    $('[data-product-count]').textContent =
      `${count} ${count === 1 ? 'product' : 'products'} · Tap to add to the ticket`;
  };
  $('[data-product-search]')?.addEventListener('input', filterProducts);
  $$('[data-segment="products"]').forEach((b) =>
    b.addEventListener('click', () => {
      category = b.dataset.value;
      pressed($$('[data-segment="products"]'), b);
      filterProducts();
    }),
  );
  const phaseNames = ['Foundation', 'Frame', 'Envelope', 'Fit-out'];
  let buildTimer,
    playing = false,
    phase = 2;
  const setPhase = (i) => {
    phase = i;
    const scene = $('[data-build-scene]');
    if (!scene) return;
    scene.dataset.phase = String(i);
    $('[data-phase-label]').textContent = `0${i + 1} / ${phaseNames[i]}`;
    pressed($$('[data-phase-button]'), $(`[data-phase-button="${i}"]`));
  };
  const stopBuild = () => {
    clearTimeout(buildTimer);
    playing = false;
    const button = $('[data-build-play]');
    if (button) button.textContent = 'Play sequence';
  };
  const stepBuild = () => {
    if (!playing) return;
    if (phase >= 3) {
      stopBuild();
      return;
    }
    setPhase(phase + 1);
    buildTimer = setTimeout(stepBuild, 1300);
  };
  $$('[data-phase-button]').forEach((b) =>
    b.addEventListener('click', () => {
      stopBuild();
      setPhase(Number(b.dataset.phaseButton));
    }),
  );
  $('[data-build-play]')?.addEventListener('click', () => {
    if (playing) {
      stopBuild();
      return;
    }
    setPhase(0);
    playing = true;
    $('[data-build-play]').textContent = 'Pause sequence';
    buildTimer = setTimeout(stepBuild, 1300);
  });
  $$('[data-site-task]').forEach((i) =>
    i.addEventListener('change', () => {
      $('[data-site-status]').textContent =
        `${$$('[data-site-task]:checked').length} of 4 coordination tasks complete`;
    }),
  );
  let roster = 'Students';
  const filterRoster = () => {
    const term = $('[data-roster-search]').value.trim().toLowerCase(),
      state = $('[data-attendance]').value;
    let count = 0;
    $$('[data-roster]').forEach((t) => {
      t.hidden = t.dataset.roster !== roster;
      if (t.hidden) return;
      t.querySelectorAll('tbody tr').forEach((row) => {
        row.hidden = !(
          row.textContent.toLowerCase().includes(term) &&
          (state === 'All' || row.lastElementChild.textContent === state)
        );
        if (!row.hidden) count++;
      });
    });
    $('[data-roster-status]').textContent =
      `${count} sample ${roster.toLowerCase()} shown`;
  };
  $$('[data-segment="roster"]').forEach((b) =>
    b.addEventListener('click', () => {
      roster = b.dataset.value;
      pressed($$('[data-segment="roster"]'), b);
      filterRoster();
    }),
  );
  $('[data-roster-search]')?.addEventListener('input', filterRoster);
  $('[data-attendance]')?.addEventListener('change', filterRoster);
  let bookingDay = 'Fri, 23 October',
    bookingTime = '10:00 AM';
  const reviewBooking = () => {
    const r = $('[data-book-review]');
    if (r)
      r.textContent = `${$('[data-clinician]').value} · ${bookingDay} · ${bookingTime}`;
  };
  $('[data-clinician]')?.addEventListener('change', reviewBooking);
  $$('[data-book-date]').forEach((b) =>
    b.addEventListener('click', () => {
      bookingDay = b.dataset.bookDate;
      pressed($$('[data-book-date]'), b);
      reviewBooking();
    }),
  );
  $$('[data-book-time]').forEach((b) =>
    b.addEventListener('click', () => {
      bookingTime = b.dataset.bookTime;
      pressed($$('[data-book-time]'), b);
      reviewBooking();
    }),
  );
  $('[data-confirm-booking]')?.addEventListener('click', () =>
    notify(
      `Sample appointment confirmed: ${$('[data-book-review]').textContent}. No appointment was sent to a clinic.`,
    ),
  );
  $$('[data-segment="reservation"]').forEach((b) =>
    b.addEventListener('click', () => {
      pressed($$('[data-segment="reservation"]'), b);
      $$('[data-reservation]').forEach((p) => {
        p.hidden = p.dataset.reservation !== b.dataset.value;
      });
    }),
  );
  $$('[data-reserve]').forEach((b) =>
    b.addEventListener('click', () => {
      const date = $('[data-reserve-date]');
      if (!date.value || !date.checkValidity()) {
        date.reportValidity();
        return;
      }
      notify(
        `Sample reservation: ${b.dataset.reserve} · ${formatDate(date.value)}. Nothing was charged or reserved.`,
      );
    }),
  );
  const tour = {
    exterior: {
      label: '01 / Courtyard arrival',
      alt: 'Generated exterior concept of a contemporary courtyard house',
    },
    interior: {
      label: '02 / Living & gathering',
      alt: 'Generated interior concept with a living space opening onto a courtyard',
    },
  };
  let currentView = 'exterior';
  const showTour = (view) => {
    currentView = view;
    const img = $('[data-tour-image]');
    const frame = img.parentElement;
    frame.classList.remove('is-changing');
    img.onload = () => {
      frame.classList.add('is-changing');
    };
    img.src = `/demos/media/vista-${view}.webp`;
    img.alt = tour[view].alt;
    $('[data-tour-label]').textContent = tour[view].label;
    pressed($$('[data-tour-view]'), $(`[data-tour-view="${view}"]`));
  };
  $$('[data-tour-view]').forEach((b) =>
    b.addEventListener('click', () => showTour(b.dataset.tourView)),
  );
  $('[data-tour-next]')?.addEventListener('click', () =>
    showTour(currentView === 'exterior' ? 'interior' : 'exterior'),
  );
  $('[data-viewing]')?.addEventListener('click', () => {
    const panel = $('[data-viewing-panel]');
    panel.hidden = !panel.hidden;
    if (!panel.hidden) $('[data-viewing-date]').focus();
  });
  $('[data-viewing-confirm]')?.addEventListener('click', () => {
    const date = $('[data-viewing-date]');
    if (!date.value || !date.checkValidity()) {
      date.reportValidity();
      return;
    }
    notify(
      `Sample viewing request for ${formatDate(date.value)}. This is a fictional property, so no request was sent.`,
    );
  });
  const stackCopy = {
    edge: [
      'Edge & routing',
      'Routes incoming requests to the application. Demo policies show HTTPS and basic health checks.',
    ],
    app: [
      'Application',
      'A sample web application serves booking and operations screens, with role-based access and health checks.',
    ],
    data: [
      'Data services',
      'A relational database and object storage hold demonstration records. Backup and restore checks are part of the delivery plan.',
    ],
    jobs: [
      'Worker queue',
      'Background jobs handle scheduled sync, notifications and integration retries in this illustrative stack.',
    ],
  };
  $$('[data-stack]').forEach((b) =>
    b.addEventListener('click', () => {
      pressed($$('[data-stack]'), b);
      const [title, desc] = stackCopy[b.dataset.stack];
      $('[data-stack-title]').textContent = title;
      $('[data-stack-description]').textContent = desc;
    }),
  );
  let deployTimer,
    running = false;
  const stopDeploy = () => {
    clearTimeout(deployTimer);
    running = false;
    const b = $('[data-deploy]');
    if (b) {
      b.disabled = false;
      b.textContent = 'Run dry deployment';
    }
  };
  const deployStep = (i) => {
    if (!running) return;
    if (i >= 4) {
      stopDeploy();
      notify(
        'Dry deployment complete. Sample checks passed; no infrastructure was changed.',
      );
      return;
    }
    const row = $(`[data-release-step="${i}"]`);
    row.classList.add('complete');
    row.querySelector('small').textContent = 'Passed';
    $('[data-deploy-log]').textContent +=
      `\n[PASS] ${row.querySelector('b').textContent}`;
    deployTimer = setTimeout(
      () => deployStep(i + 1),
      matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 650,
    );
  };
  $('[data-deploy]')?.addEventListener('click', () => {
    running = true;
    $('[data-deploy]').disabled = true;
    $('[data-deploy]').textContent = 'Checking sample stack…';
    $$('[data-release-step]').forEach((r) => {
      r.classList.remove('complete');
      r.querySelector('small').textContent = 'Ready';
    });
    $('[data-deploy-log]').textContent =
      '$ relaydock deploy --preview\nStarting local demonstration…';
    deployStep(0);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopBuild();
      if (running) {
        stopDeploy();
        notify('Demo paused. Run the dry deployment again when you are ready.');
      }
    }
  });
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change', () =>
    stopBuild(),
  );
  addEventListener('pagehide', () => {
    stopBuild();
    stopDeploy();
    clearTimeout(toastTimer);
  });
})();
