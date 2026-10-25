(() => {
  const $ = (s) => document.querySelector(s);
  const write = (s, text) => {
    const node = $(s);
    if (node) node.textContent = text;
  };
  const click = (s, fn) => $(s)?.addEventListener('click', fn);
  if ($('[data-support-approve]')) {
    $('[data-support-approve]').disabled = true;
    click('[data-support-classify]', () => {
      write('[data-support-intent]', 'Order status · Fulfilment queue');
      write('[data-support-status]', 'Routed for review');
    });
    click('[data-support-draft]', () => {
      write(
        '[data-support-draft-text]',
        'Thanks for getting in touch. Order SAMPLE-1048 is prepared for dispatch. An agent can help if you need to update your delivery details.',
      );
      write('[data-support-status]', 'Draft ready · Review required');
      $('[data-support-approve]').disabled = false;
    });
    click('[data-support-approve]', () => {
      write('[data-support-status]', 'Sample reply queued');
      write(
        '[data-support-result]',
        'Reply approved in the sample workspace. No email or chat message was sent.',
      );
    });
    click('[data-support-handoff]', () => {
      write('[data-support-status]', 'Assigned to an agent');
      write(
        '[data-support-result]',
        'Sample handoff created with the conversation and order context attached.',
      );
    });
  }
  if ($('[data-doc-sync]')) {
    $('[data-doc-sync]').disabled = true;
    $('[data-doc-review]').disabled = true;
    click('[data-doc-index]', () => {
      write(
        '[data-doc-index-value]',
        'Invoice · Supplier correspondence · SAMPLE-0086',
      );
      write('[data-doc-status]', 'Indexed');
    });
    click('[data-doc-extract]', () => {
      write('[data-doc-supplier]', 'Sample materials supplier');
      write('[data-doc-reference]', 'SAMPLE-0086');
      write('[data-doc-total]', '₱9,000.00');
      write('[data-doc-status]', 'Fields extracted');
      write('[data-doc-review-value]', 'Needs human review');
      $('[data-doc-review]').disabled = false;
    });
    click('[data-doc-review]', () => {
      write('[data-doc-review-value]', 'Approved in sample workspace');
      write('[data-doc-status]', 'Approved');
      $('[data-doc-sync]').disabled = false;
    });
    click('[data-doc-sync]', () => {
      write('[data-doc-status]', 'Sample sync complete');
      $('[data-doc-status]').className = 'pill green';
      write(
        '[data-doc-result]',
        'Approved fields added to the sample ledger. No accounting API was contacted.',
      );
    });
  }
  if ($('[data-factory-sync]')) {
    $('[data-factory-sync]').disabled = true;
    const event = (text) => {
      const row = document.createElement('li'),
        stamp = document.createElement('span'),
        label = document.createElement('b');
      stamp.textContent = 'SAMPLE EVENT';
      label.textContent = text;
      row.append(stamp, label);
      $('[data-factory-events]').append(row);
      $('[data-factory-events]').scrollTop = $(
        '[data-factory-events]',
      ).scrollHeight;
    };
    click('[data-factory-read]', () => {
      write('[data-factory-sensor]', 'Signal received');
      write('[data-factory-controller]', 'Batch accepted');
      write('[data-factory-count]', '24 / 24 sample units');
      $('[data-factory-progress]').style.transform = 'scaleX(1)';
      write('[data-factory-status]', 'Batch ready');
      event('Sensor → edge controller: sample batch counted');
      $('[data-factory-sync]').disabled = false;
    });
    click('[data-factory-sync]', () => {
      write('[data-factory-connector]', 'Sample ERP sync complete');
      write('[data-factory-status]', 'Sample record synced');
      event('Edge gateway → ERP: batch record confirmed');
    });
    click('[data-factory-alert]', () => {
      write('[data-factory-status]', 'Sample exception flagged');
      $('[data-factory-status]').className = 'pill review';
      write(
        '[data-factory-result]',
        'A sample threshold alert was routed to the operations team. No equipment was controlled.',
      );
      event('Example exception → operations review queue');
    });
  }
})();

/* Local sample operations. No stock, payment or carrier mutations. */
(() => {
  const branch = document.querySelector('[data-retail-branch]');
  if (branch) {
    const transfer = document.querySelector('[data-retail-transfer]');
    const collect = document.querySelector('[data-retail-collect]');
    const stockByBranch = {
      Makati: [8, 42, 12, 24, 6, 36],
      'Quezon City': [20, 12, 26, 8, 20, 30],
      'Cebu City': [5, 60, 14, 19, 24, 14],
    };
    const targets = [16, 24, 20, 12, 18, 24];
    const names = [
      'Drill',
      'Measuring tape',
      'Safety helmet',
      'Extension cable',
      'Interior paint',
      'Work gloves',
    ];
    let suggested = 28;
    branch.addEventListener('change', () => {
      document.querySelector('[data-retail-store]').textContent = branch.value;
      document.querySelector('[data-retail-destination]').textContent =
        branch.value;
      document.querySelector('[data-retail-pickup]').textContent = branch.value;
      const stocks = stockByBranch[branch.value];
      const shortages = [];
      document.querySelectorAll('[data-retail-stock]').forEach((item, i) => {
        item.textContent = stocks[i];
        const badge = item.closest('.retail-product').querySelector('.pill');
        badge.className =
          'pill ' + (stocks[i] < targets[i] ? 'amber' : 'green');
        badge.textContent =
          stocks[i] < targets[i] ? 'Replenish soon' : 'In stock';
        if (stocks[i] < targets[i])
          shortages.push([names[i], targets[i] - stocks[i]]);
      });
      document.querySelector('[data-retail-low]').textContent =
        shortages.length;
      suggested = shortages.reduce((sum, item) => sum + item[1], 0);
      document.querySelector('[data-retail-suggestions]').replaceChildren(
        ...shortages.map(([name, count]) => {
          const li = document.createElement('li'),
            b = document.createElement('b');
          li.append(name + ' ');
          b.textContent = count + ' units';
          li.append(b);
          return li;
        }),
      );
      document.querySelector('[data-retail-transfer-status]').textContent =
        suggested + ' units suggested · Awaiting store review';
      document.querySelector('[data-retail-collect-status]').textContent =
        'Payment recorded · Store picking pending';
      transfer.disabled = false;
      collect.disabled = false;
    });
    transfer.addEventListener('click', () => {
      document.querySelector('[data-retail-transfer-status]').textContent =
        'TR-2026-042 drafted · ' +
        suggested +
        ' units to ' +
        branch.value +
        ' · Pending approval';
      transfer.disabled = true;
    });
    collect.addEventListener('click', () => {
      document.querySelector('[data-retail-collect-status]').textContent =
        'Ready for collection · Customer notification queued in this sample';
      collect.disabled = true;
    });
  }
  const action = document.querySelector('[data-warehouse-action]');
  if (!action) return;
  const stages = [
    {
      title: 'Verify the inbound shipment',
      detail:
        'Match the advance shipping notice, scan pallet labels and separate damaged cartons before putaway.',
      checks: [
        'ASN-2026-086 matched',
        '96 pallets counted',
        '12 cartons on quality hold',
      ],
      button: 'Confirm receipt checks',
      done: 'Receipt verified · Eligible stock ready for putaway',
      row: 'Awaiting release',
    },
    {
      title: 'Allocate the fulfilment wave',
      detail:
        'Group 1,248 orders by destination and storage zone. Held cartons remain unavailable for allocation.',
      checks: [
        'Available stock checked',
        'Zone A / B / C assigned',
        'Carrier cutoff reviewed',
      ],
      button: 'Release sample wave',
      done: 'W-1026-048 released · Zone tasks created',
      row: 'Allocated to wave',
    },
    {
      title: 'Pick, scan and consolidate',
      detail:
        'Follow zone tasks, confirm bin and item scans, then verify each order at the packing bench.',
      checks: [
        'Zone picking confirmed',
        'Pack verification recorded',
        'Parcel labels prepared',
      ],
      button: 'Confirm pick & pack checks',
      done: 'Packing verified · Sample parcels ready at outbound lanes',
      row: 'Packed & verified',
    },
    {
      title: 'Prepare the carrier handoff',
      detail:
        'Check the manifest against sealed parcels. Dispatch requires all previous checks; held stock stays in Zone D.',
      checks: [
        'Manifest quantities checked',
        'Seal reference recorded',
        'Outbound lane confirmed',
      ],
      button: 'Confirm sample dispatch',
      done: 'Sample dispatch confirmed · Manifest MF-2026-048 recorded',
      row: 'Dispatch confirmed',
    },
  ];
  const completed = new Set();
  let current = 0;
  const setText = (key, value) =>
    (document.querySelector('[data-warehouse-' + key + ']').textContent =
      value);
  function render() {
    const item = stages[current];
    document
      .querySelectorAll('[data-warehouse-stage]')
      .forEach((b, i) => b.setAttribute('aria-pressed', String(i === current)));
    setText(
      'pill',
      '0' +
        (current + 1) +
        ' / ' +
        ['Receiving', 'Wave allocation', 'Pick & pack', 'Dispatch'][current],
    );
    setText('title', item.title);
    setText('detail', item.detail);
    const list = document.querySelector('[data-warehouse-checks]');
    list.replaceChildren(
      ...item.checks.map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }),
    );
    const blocked = current > 0 && !completed.has(current - 1);
    action.disabled = completed.has(current) || blocked;
    action.textContent = completed.has(current)
      ? 'Checks recorded'
      : item.button;
    setText(
      'status',
      completed.has(current)
        ? item.done
        : blocked
          ? 'Complete the previous stage checks before this handoff.'
          : 'Waiting for operator review · Sample data only',
    );
    document
      .querySelectorAll('[data-zone]')
      .forEach((z) =>
        z.classList.toggle(
          'is-active',
          Number(z.dataset.zone) === (current === 0 ? 3 : current - 1),
        ),
      );
  }
  document.querySelectorAll('[data-warehouse-stage]').forEach((b) =>
    b.addEventListener('click', () => {
      current = Number(b.dataset.warehouseStage);
      render();
    }),
  );
  action.addEventListener('click', () => {
    if (action.disabled) return;
    completed.add(current);
    document
      .querySelectorAll('[data-wave-row]')
      .forEach((cell) => (cell.textContent = stages[current].row));
    setText(
      'audit',
      [
        'Receipt checks recorded',
        'Wave allocation approved',
        'Pack verification recorded',
        'Manifest ready for carrier',
      ][current],
    );
    render();
  });
  render();
})();

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
  const phaseData = JSON.parse(
    $('[data-construction-phases]')?.textContent || '[]',
  );
  let buildTimer,
    playing = false,
    phase = 2,
    phaseRequest = 0;
  const siteStatus = () => {
    const status = $('[data-site-status]');
    if (status)
      status.textContent = `${$$('[data-site-task]:checked').length} of 4 coordination items recorded`;
  };
  const setPhase = async (i) => {
    const scene = $('[data-build-scene]'),
      record = phaseData[i];
    if (!scene || !record) return;
    const request = ++phaseRequest;
    scene.setAttribute('aria-busy', 'true');
    const photos = $$('[data-construction-photo]');
    const next = photos.find(
      (image) => !image.classList.contains('is-current'),
    );
    let failed = false,
      timeout;
    if (next) {
      next.src = '/demos/media/construction/' + record.id + '.webp';
      try {
        await Promise.race([
          next.decode(),
          new Promise((_, reject) => {
            timeout = setTimeout(
              () => reject(new Error('Phase photograph unavailable')),
              4000,
            );
          }),
        ]);
      } catch {
        failed = true;
      } finally {
        clearTimeout(timeout);
      }
    }
    if (request !== phaseRequest) return;
    phase = i;
    scene.dataset.phase = String(i);
    scene.setAttribute('aria-busy', 'false');
    const fallback = $('[data-build-fallback]');
    if (fallback) fallback.hidden = !failed;
    if (failed)
      photos.forEach((image) => {
        image.setAttribute('aria-hidden', 'true');
        image.alt = '';
      });
    if (next && !failed) {
      photos.forEach((image) => {
        image.classList.toggle('is-current', image === next);
        image.setAttribute('aria-hidden', String(image !== next));
        image.alt =
          image === next
            ? 'Illustrative residential build: ' +
              record.name.toLowerCase() +
              ' stage'
            : '';
      });
    }
    $('[data-phase-label]').textContent = `0${i + 1} / ${record.name}`;
    pressed($$('[data-phase-button]'), $(`[data-phase-button="${i}"]`));
    $('[data-build-progress]').textContent = record.progress + '%';
    $('[data-build-current]').textContent = record.name;
    $('[data-build-period]').textContent =
      'Week ' + record.week + ' · sample programme';
    $('[data-build-open]').textContent = String(record.open);
    $('[data-build-gate]').textContent = record.gate;
    $('[data-build-note]').textContent = record.note;
    $('[data-build-documents]').textContent = record.document;
    $('[data-build-status]').textContent =
      i === phaseData.length - 1
        ? 'Sample closeout complete'
        : record.name + ' in progress';
    const completion = $('[data-build-completion]');
    completion.style.setProperty('--completion', record.progress / 100);
    completion.setAttribute('aria-valuenow', String(record.progress));
    $$('[data-site-task]').forEach((input, n) => {
      const [title, owner, done] = record.tasks[n];
      input.checked = done;
      input.parentElement.querySelector('[data-site-task-title]').textContent =
        title;
      input.parentElement.querySelector('[data-site-task-owner]').textContent =
        owner;
    });
    $$('[data-build-milestone]').forEach((item, n) => {
      item.classList.toggle('current', n === i && i < phaseData.length - 1);
      item.querySelector('[data-build-milestone-state]').textContent =
        n < i || i === phaseData.length - 1
          ? 'Complete'
          : n === i
            ? 'In progress'
            : 'Up next';
    });
    siteStatus();
    scene.dispatchEvent(new Event('construction:ready'));
  };
  const stopBuild = () => {
    clearTimeout(buildTimer);
    playing = false;
    const button = $('[data-build-play]');
    if (button) {
      button.textContent = 'Play sequence';
      button.setAttribute('aria-pressed', 'false');
    }
  };
  const stepBuild = async () => {
    if (!playing) return;
    if (phase >= phaseData.length - 1) {
      stopBuild();
      return;
    }
    await setPhase(phase + 1);
    if (playing) buildTimer = setTimeout(stepBuild, 2500);
  };
  $$('[data-phase-button]').forEach((button) =>
    button.addEventListener('click', () => {
      stopBuild();
      void setPhase(Number(button.dataset.phaseButton));
    }),
  );
  $('[data-build-play]')?.addEventListener('click', async () => {
    if (playing) {
      stopBuild();
      return;
    }
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
      await setPhase(phaseData.length - 1);
      return;
    }
    playing = true;
    $('[data-build-play]').textContent = 'Pause sequence';
    $('[data-build-play]').setAttribute('aria-pressed', 'true');
    await setPhase(0);
    if (playing) buildTimer = setTimeout(stepBuild, 2500);
  });
  $$('[data-site-task]').forEach((input, n) =>
    input.addEventListener('change', () => {
      phaseData[phase].tasks[n][2] = input.checked;
      siteStatus();
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
    if (!panel.hidden && !new URLSearchParams(location.search).has('preview'))
      $('[data-viewing-date]').focus();
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
      '$ system deploy --preview\nStarting local demonstration…';
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
/* Local, finite marketing choreography: real controls, no external requests. */
(() => {
  const query = new URLSearchParams(location.search);
  if (!query.has('preview')) return;
  document.documentElement.classList.add('is-overview');
  const reduced =
    query.has('still') || matchMedia('(prefers-reduced-motion:reduce)').matches;
  const workflows = {
    retail: [
      ['[data-retail-branch]', 'Choose the destination branch', 'Cebu City'],
      ['[data-retail-transfer]', 'Draft a stock replenishment transfer'],
      ['[data-retail-collect]', 'Prepare a collection handoff'],
    ],
    warehouse: [
      ['[data-warehouse-action]', 'Verify receiving checks'],
      ['[data-warehouse-stage="1"]', 'Allocate a multi-zone wave'],
      ['[data-warehouse-action]', 'Release eligible stock'],
      ['[data-warehouse-stage="2"]', 'Follow picking and packing'],
      ['[data-warehouse-action]', 'Verify packed orders'],
      ['[data-warehouse-stage="3"]', 'Prepare the carrier handoff'],
      ['[data-warehouse-action]', 'Record the sample dispatch'],
    ],
    support: [
      ['[data-support-classify]', 'Route the conversation'],
      ['[data-support-draft]', 'Prepare a reply'],
      ['[data-support-approve]', 'Review the sample response'],
      ['[data-support-handoff]', 'Hand off to an agent'],
    ],
    documents: [
      ['[data-doc-index]', 'Index the incoming email'],
      ['[data-doc-extract]', 'Extract invoice fields'],
      ['[data-doc-review]', 'Review extracted values'],
      ['[data-doc-sync]', 'Sync the approved sample record'],
    ],
    factory: [
      ['[data-factory-read]', 'Follow a sensor event'],
      ['[data-factory-sync]', 'Connect the batch to ERP'],
      ['[data-factory-alert]', 'Route an exception for review'],
    ],
    morrow: [
      ['[data-product="Flat white"]', 'Add a coffee'],
      ['[data-product="Local rice · 1 kg"]', 'Add a pantry item'],
      [
        '[data-segment="products"][data-value="Market"]',
        'Filter the catalogue',
      ],
      ['[data-checkout]', 'Complete the sample sale'],
    ],
    formafield: [
      ['[data-phase-button="0"]', 'Foundation'],
      ['[data-phase-button="1"]', 'Structural frame'],
      ['[data-phase-button="2"]', 'Enclosure and weatherproofing'],
      ['[data-phase-button="3"]', 'Services testing and finishes'],
      ['[data-phase-button="4"]', 'Closeout and handover records'],
    ],
    brightlane: [
      ['[data-segment="roster"][data-value="Staff"]', 'See the staff roster'],
      ['[data-attendance]', 'Filter attendance', 'Present'],
      [
        '[data-segment="roster"][data-value="Students"]',
        'Switch to student records',
      ],
      ['[data-attendance]', 'Find pending arrivals', 'Pending'],
    ],
    kindred: [
      ['[data-clinician]', 'Choose a clinician', 'Dr Maya Reyes'],
      ['[data-book-date="Mon, 26 October"]', 'Choose a day'],
      ['[data-book-time="2:00 PM"]', 'Select a time'],
      ['[data-confirm-booking]', 'Review the confirmation'],
    ],
    daybreak: [
      ['[data-reserve="Garden suite"]', 'Preview a stay reservation'],
      [
        '[data-segment="reservation"][data-value="Courts"]',
        'Switch to sports bookings',
      ],
      [
        '[data-reserve="Court 02 · 4:00–5:00 PM"]',
        'Preview a court reservation',
      ],
    ],
    vista: [
      ['[data-tour-view="interior"]', 'Explore the living space'],
      ['[data-tour-view="exterior"]', 'Return to the courtyard'],
      ['[data-viewing]', 'Arrange a viewing'],
      ['[data-viewing-confirm]', 'Review the viewing request'],
    ],
    relaydock: [
      ['[data-stack="data"]', 'Inspect data services'],
      ['[data-stack="jobs"]', 'Inspect the worker queue'],
      ['[data-deploy]', 'Run deployment checks'],
    ],
  };
  const sequence = workflows[document.body.dataset.demo] ?? [];
  const steps =
    reduced && document.body.dataset.demo === 'formafield'
      ? sequence.slice(-1)
      : sequence;
  const cursor = document.createElement('div');
  cursor.className = 'overview-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  const caption = document.createElement('div');
  caption.className = 'overview-caption';
  caption.setAttribute('aria-hidden', 'true');
  if (!reduced) document.body.append(cursor);
  document.body.append(caption);
  let timer,
    cancelled = false;
  const wait = (ms) =>
    new Promise((resolve) => {
      timer = setTimeout(resolve, ms);
    });
  const stop = () => {
    cancelled = true;
    clearTimeout(timer);
  };
  const run = async () => {
    for (const [selector, text, value] of steps) {
      if (cancelled) return;
      const target = document.querySelector(selector);
      if (!target) continue;
      caption.textContent = text;
      parent.postMessage({ type: 'xts:overview-step', label: text }, '*');
      const rect = target.getBoundingClientRect();
      cursor.style.transform = `translate(${rect.x + rect.width / 2}px,${rect.y + rect.height / 2}px)`;
      if (!reduced) await wait(420);
      if (cancelled) return;
      target.classList.add('overview-target');
      cursor.classList.add('is-clicking');
      if (value !== undefined) {
        target.value = value;
        target.dispatchEvent(new Event('change', { bubbles: true }));
      } else target.click();
      if (document.body.dataset.demo === 'formafield') {
        const scene = document.querySelector('[data-build-scene]');
        if (scene?.getAttribute('aria-busy') === 'true')
          await new Promise((resolve) =>
            scene.addEventListener('construction:ready', resolve, {
              once: true,
            }),
          );
      }
      if (!reduced)
        await wait(document.body.dataset.demo === 'formafield' ? 1300 : 900);
      if (cancelled) return;
      target.classList.remove('overview-target');
      cursor.classList.remove('is-clicking');
    }
    if (!reduced)
      await wait(document.body.dataset.demo === 'relaydock' ? 2800 : 500);
    if (cancelled) return;
    caption.textContent = 'Workflow overview complete';
    cursor.hidden = true;
    parent.postMessage({ type: 'xts:overview-ended' }, '*');
  };
  let started = false;
  addEventListener('message', (event) => {
    if (
      event.source !== parent ||
      event.data?.type !== 'xts:overview-start' ||
      started
    )
      return;
    started = true;
    void run();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener(
    'change',
    stop,
  );
  addEventListener('pagehide', stop);
  parent.postMessage({ type: 'xts:overview-ready' }, '*');
})();
