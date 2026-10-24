/** Distinct fictional products, captured from HTML rather than generated UI lettering. */
export function applyFeatured(screens, h) {
  const badge = (t, c = '') => `<span class="ux-badge ${c}">${t}</span>`;
  const button = (t, primary = false) =>
    `<button class="ux-button ${primary ? 'is-primary' : ''}">${t}</button>`;
  const sample =
    '<div class="ux-sample">ILLUSTRATIVE SYSTEM · PHILIPPINE DEMONSTRATION DATA</div>';
  const avatar = (n, c = '') => `<span class="ux-avatar ${c}">${n}</span>`;
  const chart = (color = '#9ee3ae', area = true) =>
    `<svg viewBox="0 0 640 190" class="ux-chart" aria-label="Illustrative throughput over the last six hours"><defs><linearGradient id="ux-area" x2="0" y2="1"><stop stop-color="${color}" stop-opacity=".3"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>${[25, 65, 105, 145].map((y) => `<path d="M30 ${y}H625" stroke="currentColor" opacity=".1"/>`).join('')}${area ? `<path d="M30 140L80 115L130 120L180 80L230 100L280 60L330 75L380 38L430 58L480 35L530 50L580 20L625 30V160H30Z" fill="url(#ux-area)"/>` : ''}<path d="M30 140L80 115L130 120L180 80L230 100L280 60L330 75L380 38L430 58L480 35L530 50L580 20L625 30" stroke="${color}" fill="none" stroke-width="3" stroke-linejoin="round"/>${['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((t, i) => `<text x="${30 + i * 110}" y="185" fill="currentColor" opacity=".45" font-size="10">${t}</text>`).join('')}</svg>`;
  const portalNav = `<aside class="ux-side"><div class="ux-logo">◈<span>Customer<span>PORTAL</span></span></div><div class="ux-org">Retail supplier <span>⌄</span></div><small>YOUR WORKSPACE</small>${['Overview', 'Projects', 'Messages', 'Documents', 'Invoices'].map((t, i) => `<div class="ux-nav ${i === 0 ? 'active' : ''}"><span>${['◈', '▦', '◌', '▤', '▣'][i]}</span>${t}${i === 2 ? '<b>3</b>' : ''}</div>`).join('')}<div class="ux-side-bottom"><div class="ux-help"><b>A little help?</b><p>Your project team is a message away.</p><button>Talk to your team ↗</button></div><div class="ux-person">${avatar('MS')}<span>Maria Santos<small>Workspace admin</small></span><span>⌄</span></div></div></aside>`;
  const portal = `<main class="ux-app ux-portal">${portalNav}<div class="ux-shell"><header class="ux-top"><span>Workspace / <b>Overview</b></span><div><span>⌕ &nbsp; Search your workspace</span><span class="ux-notification">◉</span>${avatar('MS')}</div></header><div class="ux-content"><div class="ux-page-head"><div><p>Tuesday, October 20</p><h1>Good morning, Maria <span class="ux-wave">✦</span></h1><p>Here’s where your projects stand. Let’s keep things moving.</p></div>${button('＋ New request', true)}</div><div class="ux-portal-summary"><div><span class="ux-summary-icon">▦</span><p>Active projects<b>03</b></p></div><div><span class="ux-summary-icon purple">◷</span><p>Awaiting your review<b>02</b></p></div><div><span class="ux-summary-icon amber">▤</span><p>New documents<b>08</b></p></div><div class="ux-next"><small>NEXT CHECK-IN</small><b>Oct 24 · 10:00 AM</b><span>With Paolo Reyes ↗</span></div></div><div class="ux-section-title"><h2>Your projects <small>3 ongoing</small></h2><span>View all projects ↗</span></div><div class="ux-project-grid">${[
    [
      'Branch workspace',
      'Operations platform',
      '72',
      'User acceptance testing',
      '#a7c5ff',
    ],
    ['Customer portal', 'Web application', '48', 'In development', '#c8adff'],
    [
      'Reporting suite',
      'Business intelligence',
      '90',
      'Final review',
      '#f4c383',
    ],
  ]
    .map(
      ([t, s, p, state, c], i) =>
        `<article class="ux-project"><div class="ux-project-art art-${i}"><div></div><i></i><i></i><b>${['◈', '◌', '▥'][i]}</b></div><div class="ux-project-body"><div class="ux-row"><small>${s}</small><span>···</span></div><h3>${t}</h3>${badge(state)}<div class="ux-project-progress"><i style="width:${p}%;background:${c}"></i></div><div class="ux-row"><span>${p}% complete</span><div class="ux-avatars">${avatar('PR')}${avatar('AC', 'purple')}${avatar('+2', 'pale')}</div></div></div></article>`,
    )
    .join(
      '',
    )}</div><div class="ux-bottom-grid"><section class="ux-card"><div class="ux-section-title"><h2>Needs your attention</h2><span>View all ↗</span></div><div class="ux-approval"><span class="ux-file-icon purple">▤</span><div><b>Branch access permissions</b><p>Paolo shared a document for your approval</p></div>${button('Review →')}</div><div class="ux-approval"><span class="ux-file-icon amber">▥</span><div><b>October rollout schedule</b><p>Updated by Angela · 2 hours ago</p></div>${badge('New', 'amber')}</div></section><section class="ux-card"><div class="ux-section-title"><h2>Project team</h2><span>Message ↗</span></div>${[
    ['PR', 'Paolo Reyes', 'Your project lead'],
    ['AC', 'Angela Cruz', 'Product designer'],
  ]
    .map(
      ([a, n, r]) =>
        `<div class="ux-team-row">${avatar(a)}<div><b>${n}</b><p>${r}</p></div><span class="ux-online"></span></div>`,
    )
    .join('')}</section></div></div></div>${sample}</main>`;
  const booking = `<main class="ux-booking"><header class="ux-booking-nav"><div class="ux-booking-brand">◷<span>Booking<b>APPOINTMENTS</b></span></div><nav>Find a service <span>My bookings</span> Help</nav><div>${avatar('MS')} Maria Santos ⌄</div></header><div class="ux-booking-layout"><aside class="ux-booking-info"><p class="ux-kicker">A LITTLE TIME, WELL SPENT</p><h1>Make room<br>for your next<br><em>good idea.</em></h1><p>Book a one-to-one project consultation with the right specialist.</p><div class="ux-specialist"><div class="ux-portrait">PR<span>✦</span></div><h2>Paolo Reyes</h2><p>Project specialist · Makati</p>${badge('Available this week')}<div class="ux-specialist-meta"><span>◷ &nbsp; 30 minutes</span><span>▣ &nbsp; Online meeting</span></div></div></aside><section class="ux-booking-panel"><div class="ux-booking-steps"><b>1 <span>Choose a time</span></b><i></i><span>2 Your details</span><i></i><span>3 Confirm</span></div><div class="ux-booking-heading"><h2>Pick a day that works for you</h2><p>All times are shown in Asia/Manila (GMT+8).</p></div><div class="ux-calendar-heading"><b>October 2026</b><span>‹ &nbsp;&nbsp; ›</span></div><div class="ux-booking-calendar">${['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((x) => `<small>${x}</small>`).join('')}${Array.from(
    { length: 35 },
    (_, i) => {
      let d = i - 2;
      return `<span class="${d === 23 ? 'selected' : d < 20 ? 'past' : d === 24 || d === 25 ? 'weekend' : ''}">${d > 0 && d <= 31 ? d : ''}${[21, 22, 23, 27, 28, 29, 30].includes(d) ? '<i></i>' : ''}</span>`;
    },
  ).join(
    '',
  )}</div><div class="ux-time-heading"><b>Friday, October 23</b><small>4 available times</small></div><div class="ux-time-slots">${['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM'].map((x, i) => `<button class="${i === 1 ? 'selected' : ''}">${x}</button>`).join('')}</div><div class="ux-booking-footer"><span>Oct 23 · 10:00–10:30 AM</span>${button('Continue →', true)}</div></section></div>${sample}</main>`;
  const phone = (title, sub, body, active = 0) =>
    `<main class="ux-phone"><div class="ux-phone-status"><b>9:41</b><span>▮▮▮ &nbsp; ◉ &nbsp; ▰</span></div><header class="ux-phone-head"><div><small>${sub}</small><h1>${title}</h1></div>${avatar('MS')}</header><div class="ux-phone-content">${body}</div><nav class="ux-phone-nav">${['⌂ Home', '▣ Bookings', '◌ Updates', '◉ Account'].map((x, i) => `<span class="${i === active ? 'active' : ''}">${x}</span>`).join('')}</nav><div class="ux-phone-sample">Fictional product · Sample data</div></main>`;
  const mobile1 = phone(
    'Hello, Maria.',
    'MOBILE BOOKING',
    `<div class="ux-phone-welcome"><small>LET’S MAKE PROGRESS</small><h2>What’s next<br>for your project?</h2><span class="ux-phone-orbit">✦</span></div><div class="ux-phone-section"><h3>Your next appointment</h3><span>View all →</span></div><div class="ux-visit-card"><div class="ux-visit-date"><b>23</b><span>OCT</span></div><div><h3>Project consultation</h3><p>Friday · 10:00–10:30 AM</p>${badge('Confirmed')}</div></div><div class="ux-phone-person">${avatar('PR')}<div><b>Paolo Reyes</b><p>Your project specialist</p></div><span>◌</span></div><button class="ux-phone-primary">View appointment →</button><div class="ux-phone-section"><h3>A little preparation</h3><span>2 items</span></div><div class="ux-phone-task"><span>✓</span><div><b>Complete your project brief</b><p>Updated yesterday</p></div></div><div class="ux-phone-task"><span>○</span><div><b>Share your reference files</b><p>Optional · Before your appointment</p></div></div>`,
  );
  const mobile2 = phone(
    'Choose your time',
    'BOOK AN APPOINTMENT',
    `<div class="ux-phone-service"><span>◷</span><div><b>Project consultation</b><p>30 min · Online · With Paolo Reyes</p></div></div><div class="ux-phone-section"><h3>October 2026</h3><span>‹ &nbsp; ›</span></div><div class="ux-phone-dates">${[21, 22, 23, 24, 25].map((d, i) => `<div class="${i === 2 ? 'selected' : ''}"><small>${['WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}</small><b>${d}</b><i></i></div>`).join('')}</div><div class="ux-phone-section"><h3>Available times</h3><span>GMT+8</span></div><div class="ux-phone-times">${['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM'].map((t, i) => `<button class="${i === 1 ? 'selected' : i > 3 ? 'unavailable' : ''}">${t}</button>`).join('')}</div><div class="ux-phone-summary"><h3>Your appointment</h3><div><span>When</span><b>Fri, Oct 23 · 10:00 AM</b></div><div><span>Where</span><b>Online meeting</b></div><div><span>Duration</span><b>30 minutes</b></div></div><button class="ux-phone-primary">Continue to your details →</button><p class="ux-phone-muted">You can reschedule from your bookings.</p>`,
    1,
  );
  const mobile3 = phone(
    'You’re all set.',
    'APPOINTMENT #AP-0142',
    `<div class="ux-confirmed"><span>✓</span><h2>See you on Friday!</h2><p>Your consultation is confirmed.</p></div><div class="ux-phone-summary"><div><span>Service</span><b>Project consultation</b></div><div><span>Schedule</span><b>Oct 23 · 10:00 AM</b></div><div><span>Specialist</span><b>Paolo Reyes</b></div></div><div class="ux-journey"><h3>Before we meet</h3>${[
      ['✓', 'Booking confirmed', 'Just now'],
      ['✓', 'Meeting link ready', 'Available in your booking'],
      ['○', 'Share your brief', 'Tell us about your project'],
      ['○', 'Join your consultation', 'Friday, October 23'],
    ]
      .map(
        ([a, t, d]) =>
          `<div><i>${a}</i><p><b>${t}</b><small>${d}</small></p></div>`,
      )
      .join(
        '',
      )}</div><button class="ux-phone-primary">View booking details →</button><p class="ux-phone-muted">Need to make a change? <b>Reschedule</b></p>`,
    2,
  );
  Object.assign(screens['software/portal'], {
    body: portal,
    standalone: true,
    product: 'Customer portal',
  });
  Object.assign(screens['software/booking'], {
    body: booking,
    standalone: true,
    product: 'Appointment booking',
  });
  for (const [i, body] of [mobile1, mobile2, mobile3].entries())
    Object.assign(screens[`software/mobile-${i + 1}`], {
      body,
      standalone: true,
      product: 'Mobile booking',
    });
  const autoNav = (key) =>
    `<aside class="ux-auto-side"><div class="ux-auto-brand"><span>⌘</span>Automation<span class="ux-auto-dot">●</span></div><div class="ux-auto-workspace">Sample workspace <span>⌄</span></div><small>BUILD & OPERATE</small>${[
      ['flow-builder', '⌘', 'Workflows'],
      ['sync-log', '≡', 'Execution log'],
      ['ops-dashboard', '▥', 'Observability'],
    ]
      .map(
        ([k, i, t]) =>
          `<div class="ux-auto-nav ${k === key ? 'active' : ''}">${i}<span>${t}</span></div>`,
      )
      .join(
        '',
      )}<small>CONNECTIONS</small><div class="ux-auto-connection"><i></i>Business ERP<span>↗</span></div><div class="ux-auto-connection"><i></i>Warehouse management<span>↗</span></div><div class="ux-auto-connection"><i></i>Storefront API<span>↗</span></div><div class="ux-auto-side-bottom">${badge('Production', 'green')}<p>All connectors operational</p><div>${avatar('CM')}<span>Carlo Mendoza<br><small>Workspace owner</small></span></div></div></aside>`;
  const auto = (key, title, sub, body) =>
    `<main class="ux-auto">${autoNav(key)}<div class="ux-auto-shell"><header class="ux-auto-top"><span>Workspace / ${title}</span><div><span class="ux-live-dot"></span>Live environment <b>⌘ K</b>${avatar('CM')}</div></header><div class="ux-auto-heading"><div><p>${sub}</p><h1>${title}</h1></div><div>${button('History')}${button(key === 'flow-builder' ? 'Publish workflow' : 'Export report', true)}</div></div>${body}</div>${sample}</main>`;
  const node = (cls, icon, title, sub, status) =>
    `<div class="ux-flow-node ${cls}"><div><i>${icon}</i><span>···</span></div><h3>${title}</h3><p>${sub}</p><footer><span>●</span>${status}</footer></div>`;
  const flow = auto(
    'flow-builder',
    'Order fulfilment',
    'WORKFLOWS / COMMERCE TO WAREHOUSE',
    `<div class="ux-flow-toolbar"><div>${badge('Active', 'green')}<span>v2.4 · Published 2 hours ago</span></div><span>Saved just now &nbsp; ↶ &nbsp; ↷ &nbsp; <b>Test run ▶</b></span></div><div class="ux-flow-layout"><section class="ux-flow-canvas"><div class="ux-flow-path-label">SUCCESS PATH · 1,281 RUNS TODAY</div><svg viewBox="0 0 1000 410" preserveAspectRatio="none"><path d="M224 207H340M534 207H620V117H776M620 207V312H776" stroke="#587369" fill="none" stroke-width="2"/><circle cx="620" cy="207" r="5" fill="#9ee3ae"/><path d="M25 430H915" stroke="#20312d" stroke-dasharray="4 7"/></svg>${node('trigger', '↙', 'Order received', 'Storefront · Webhook', '1,284 events')}${node('validate', '◇', 'Validate & route', 'Stock + delivery address', '99.8% passed')}${node('dispatch', '▦', 'Create pick request', 'Warehouse management · API', '142 ms average')}${node('exception', '!', 'Notify operations', 'Exception route · Team inbox', '3 need review')}<div class="ux-canvas-controls">＋ Add step <span>− &nbsp; 100% &nbsp; ＋ &nbsp; ▧</span></div></section><aside class="ux-node-inspector"><small>STEP CONFIGURATION</small><h2>Validate & route</h2><p>Continue when all conditions pass.</p><label>Input source</label><div class="ux-code-field">trigger.order ⌄</div><label>Conditions <span>ALL / AND</span></label><div class="ux-condition"><b>inventory.available</b><span>is greater than <em>0</em></span></div><div class="ux-condition"><b>shipping.postcode</b><span>is not empty</span></div><button class="ux-button">＋ Add condition</button><div class="ux-inspector-note">✓ Schema validated<br><small>Last tested · 14:32:08</small></div></aside></div><section class="ux-auto-terminal"><header><b>Execution preview</b><span>EVT-8246 · 14:32:18 &nbsp; ${badge('Completed', 'green')}</span></header>${[
      ['14:32:18.024', 'RECEIVED', 'Order SO-2026-1048 · Makati'],
      ['14:32:18.082', 'VALIDATED', 'Stock available · Shipping address valid'],
      ['14:32:18.166', 'SYNCED', 'Pick request WMS-0248 created · HTTP 201'],
    ]
      .map(
        ([t, s, m]) =>
          `<div><time>${t}</time><b>${s}</b><span>${m}</span><small>✓</small></div>`,
      )
      .join('')}</section>`,
  );
  const log = auto(
    'sync-log',
    'Execution log',
    'OBSERVE / EVERY EVENT, END TO END',
    `<div class="ux-auto-kpis">${[
      ['Events today', '12,846', 'Across 3 connectors'],
      ['Succeeded', '12,801', '99.65% delivery'],
      ['Retrying', '42', 'Automatic backoff'],
      ['Needs attention', '3', 'Review exceptions'],
    ]
      .map(
        ([t, v, n], i) =>
          `<div><small>${t}</small><strong>${v}</strong><span class="${i > 1 ? 'amber' : ''}">${n}</span></div>`,
      )
      .join(
        '',
      )}</div><section class="ux-auto-log"><div class="ux-log-filters"><span>⌕ Search execution, order or event ID</span><b>All workflows ⌄</b><b>Status ⌄</b><b>Last 24 hours ⌄</b></div><table><thead><tr>${['TIME', 'EVENT / RECORD', 'CONNECTION', 'DURATION', 'RESPONSE', 'RESULT'].map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: 9 }, (_, i) => `<tr class="${i === 2 ? 'selected' : ''}"><td>14:${String(32 - i).padStart(2, '0')}:18<small>October 20, 2026</small></td><td><b>${['Order created', 'Stock reconciled', 'Contact updated'][i % 3]}</b><small>EVT-${8246 - i} / SO-${1048 - i}</small></td><td><span class="ux-connector-icon">${['↙', '▦', '◌'][i % 3]}</span>${['Storefront → WMS', 'WMS → ERP', 'Portal → CRM'][i % 3]}</td><td>${142 + i * 23} ms</td><td><code>${i === 4 ? '429' : i === 7 ? '422' : i % 3 === 0 ? '201' : '200'}</code></td><td>${badge(i === 4 ? 'Retrying' : i === 7 ? 'Validation error' : 'Success', i === 4 || i === 7 ? 'amber' : 'green')}</td></tr>`).join('')}</tbody></table><footer>Showing 9 of 12,846 events <span>‹ &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; … &nbsp; ›</span></footer></section><div class="ux-auto-audit-note"><i>⌁</i><div><b>Built for traceability</b><p>Every event keeps its source, destination, payload history and retry attempts.</p></div><span>Retention: 30 days</span></div>`,
  );
  const ops = auto(
    'ops-dashboard',
    'Operations monitor',
    'OBSERVABILITY / PRODUCTION',
    `<div class="ux-ops-status"><span class="ux-live-dot"></span><b>All systems operational</b><span>Last event received 2 seconds ago</span><small>Auto-refresh: 10s</small></div><div class="ux-auto-kpis">${[
      ['Events processed', '12,846', '↑ 12.4% today'],
      ['Success rate', '99.97%', 'SLO target ≥ 99.9%'],
      ['Queue depth', '24', 'Within normal range'],
      ['Median latency', '142 ms', '↓ 18 ms vs. yesterday'],
    ]
      .map(
        ([t, v, n]) =>
          `<div><small>${t}</small><strong>${v}</strong><span>${n}</span></div>`,
      )
      .join(
        '',
      )}</div><div class="ux-ops-grid"><section class="ux-auto-chart"><header><div><h2>Event throughput</h2><p>Processed events / minute</p></div><span>Last 6 hours ⌄</span></header>${chart()}<footer><span>● Events processed</span><span>Peak: 284 / min</span></footer></section><section class="ux-auto-health"><h2>Connector health</h2>${[
      ['Business ERP', '128 ms', 'Finance & inventory'],
      ['Warehouse management', '142 ms', 'Stock & fulfilment'],
      ['Storefront API', '96 ms', 'Orders & customers'],
    ]
      .map(
        ([n, t, d]) =>
          `<div><i>✓</i><p><b>${n}</b><small>${d}</small></p><span>${t}<small>Healthy</small></span></div>`,
      )
      .join(
        '',
      )}<p class="ux-auto-health-note">No connection issues detected.</p></section></div><section class="ux-auto-flow-list"><header><h2>Production workflows</h2><span>3 active</span></header>${[
      ['Order fulfilment sync', '1,284', '99.8%', '12s ago'],
      ['Inventory reconciliation', '288', '100%', '2m ago'],
      ['Customer record sync', '842', '100%', '34s ago'],
    ]
      .map(
        ([n, r, s, t]) =>
          `<div><span class="ux-flow-list-icon">⌘</span><b>${n}</b><span>${r} runs today</span><span>${s} success</span><span>${t}</span>${badge('Active', 'green')}</div>`,
      )
      .join('')}</section>`,
  );
  for (const [key, body] of [
    ['flow-builder', flow],
    ['sync-log', log],
    ['ops-dashboard', ops],
  ])
    Object.assign(screens['automation/' + key], {
      body,
      standalone: true,
      product: 'Workflow automation',
    });
  screens['erp/dashboard'].body =
    h.stats([
      ['Total revenue', '₱2,486,500', '↑ 12.4%'],
      ['Net profit', '₱684,200', '↑ 8.2%'],
      ['Open orders', '148', '36 ready to fulfil'],
      ['Receivables', '₱428,900', '12 invoices due'],
    ]) +
    `<div class="grid">${h.panel('Revenue & sales performance', h.chart(true), 'FY 2026 · Monthly ⌄')}${h.panel('Fulfilment overview', `<div class="pad erp-fulfil"><div class="erp-ring"><strong>87<span>%</span></strong></div><div><h3>On track for delivery</h3><p>128 of 148 open orders</p></div><div class="erp-fulfil-legend"><span>● Ready to fulfil <b>36</b></span><span>● In progress <b>92</b></span><span>● Needs review <b>20</b></span></div></div>`)}</div>` +
    h.panel(
      'Recent sales orders',
      h.table(
        ['ORDER', 'CUSTOMER / BRANCH', 'OWNER', 'DATE', 'TOTAL', 'STATUS'],
        h.rows().slice(0, 3),
        'Latest transactions · October 2026',
      ),
    );
  // Existing screen keys and viewport sizes remain the integration contract.
}
