import { commerceBodies } from './commerce.mjs';
import { constructionBody } from './construction.mjs';
import { automationOverviews } from './automation-overviews.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const records = JSON.parse(
  fs.readFileSync(path.join(base, 'src/content/industry-demos.json'), 'utf8'),
);
const pill = (text, cls = '') => `<span class="pill ${cls}">${text}</span>`;
const metric = (label, value, sub) =>
  `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${sub}</small></article>`;
const head = (eyebrow, title, sub, extra = '') =>
  `<div class="page-head"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${sub}</p></div>${extra}</div>`;
const avatars = (names) =>
  names.map((n) => `<span class="avatar">${n}</span>`).join('');
const panel = (title, body, sub = '') =>
  `<section class="panel"><div class="panel-head"><h2>${title}</h2><small>${sub}</small></div>${body}</section>`;
const table = (headers, rows) =>
  `<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable roster table"><table><thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const segments = (group, values) =>
  `<div class="segments" role="group" aria-label="${group}">${values.map((v, i) => `<button type="button" data-segment="${group}" data-value="${v}" aria-pressed="${!i}">${v}</button>`).join('')}</div>`;
const bodies = {};
bodies.morrow = `${head('COUNTER / 01', 'A good day starts here.', 'Morning service · Main counter', pill('Register open', 'green'))}<div class="pos-layout"><section><div class="filter-row"><label class="search">Search products<input data-product-search placeholder="Coffee, pantry, produce…" type="search"></label>${segments('products', ['All', 'Coffee', 'Market'])}</div><div class="product-grid">${[
  ['Flat white', 'Coffee', 145, 'House blend · 8 oz'],
  ['Iced oat latte', 'Coffee', 175, 'Single origin · 12 oz'],
  ['Cold brew', 'Coffee', 155, 'Slow steeped · 12 oz'],
  ['Local rice · 1 kg', 'Market', 68, 'Pantry / grains'],
  ['Seasonal fruit box', 'Market', 220, 'Farm-to-market selection'],
  ['Garden greens', 'Market', 95, 'Fresh market / bunch'],
]
  .map(
    ([n, g, p, s], i) =>
      `<button class="product" type="button" data-product="${n}" data-price="${p}" data-category="${g}"><span class="product-art art-${i}"><img src="/demos/media/products/${['flat-white', 'iced-latte', 'cold-brew', 'rice', 'fruit-box', 'greens'][i]}.webp" alt="" width="480" height="480"></span><span><b>${n}</b><small>${s}</small></span><strong>₱${p}</strong><i aria-hidden="true">+</i></button>`,
  )
  .join(
    '',
  )}</div><p class="muted" data-product-count>6 products · Tap to add to the ticket</p><div class="daily-strip"><span>Today's specials</span><b>Good coffee. Fresh finds. One checkout.</b><small>Fictional retail concept</small></div></section><aside class="panel ticket"><div class="panel-head"><h2>Current ticket</h2>${pill('Walk-in')}</div><p class="ticket-meta">SAMPLE-0142 · Dine in / takeaway</p><div data-cart class="cart-lines"><p class="empty">Choose something from the menu.</p></div><div class="ticket-total"><span>Total</span><strong data-total>₱0.00</strong></div><p class="muted">Prices shown are demonstration prices. No payment is collected.</p><button class="primary" type="button" data-checkout disabled>Complete sample sale</button><div class="ticket-team">${avatars(['MT'])}<div><b>Maya Tan</b><small>Front-of-house team</small></div></div><button type="button" class="mobile-ticket" data-show-ticket hidden>View ticket</button></aside></div>`;
bodies.formafield = constructionBody;
bodies.brightlane = `${head('CAMPUS OPERATIONS', 'A clearer school day.', 'Attendance, schedules and people in one place.', pill('Friday, 23 October'))}<div class="metrics">${metric('Present today', '248 / 260', 'Demonstration attendance')}${metric('Scheduled classes', '18', 'Across 6 learning groups')}${metric('Staff on site', '24', 'Teaching and support')}${metric('Action items', '6', '2 need a follow-up')}</div><div class="campus-layout"><section class="panel"><div class="panel-head"><h2>People & attendance</h2>${segments('roster', ['Students', 'Staff'])}</div><div class="filter-row"><label class="search">Search roster<input type="search" data-roster-search placeholder="Name or group…"></label><label class="field">Attendance<select data-attendance><option>All</option><option>Present</option><option>Pending</option></select></label></div><div data-roster="Students">${table(
  ['Student', 'Learning group', 'Arrival', 'Status'],
  [
    ['L. Santos', 'Grade 8 · Mahogany', '07:42', pill('Present', 'green')],
    ['A. Tan', 'Grade 9 · Acacia', '07:48', pill('Present', 'green')],
    ['M. Cruz', 'Grade 8 · Mahogany', '—', pill('Pending', 'amber')],
    ['J. Lim', 'Grade 10 · Narra', '07:39', pill('Present', 'green')],
    ['S. Lee', 'Grade 9 · Acacia', '07:55', pill('Present', 'green')],
  ],
)}</div><div data-roster="Staff" hidden>${table(
  ['Team member', 'Role', 'Schedule', 'Status'],
  [
    [
      'Alex Tan',
      'Learning coordinator',
      '07:30–16:30',
      pill('Present', 'green'),
    ],
    ['Maya Reyes', 'Science educator', '08:00–17:00', pill('Present', 'green')],
    ['Sam Lee', 'Student support', '08:00–17:00', pill('Pending', 'amber')],
    ['Isabel Cruz', 'Operations lead', '07:30–16:30', pill('Present', 'green')],
  ],
)}</div><p class="muted" data-roster-status>Showing today's sample roster</p></section><aside>${panel('Today, at a glance', `<ol class="schedule"><li><time>08:00</time><div><b>Learning block 01</b><span>Classrooms · 6 groups</span></div></li><li><time>10:30</time><div><b>Science studio</b><span>Lab 02 · Maya Reyes</span></div></li><li><time>13:00</time><div><b>Student support hour</b><span>Learning centre</span></div></li><li><time>15:30</time><div><b>Staff coordination</b><span>Meeting room 01</span></div></li></ol>`)}<div class="feature-note"><span>ONE CAMPUS. ONE VIEW.</span><h2>Less admin.<br>More time for learning.</h2><p>Illustrative workflows, with fictional people and records.</p></div></aside></div>`;
bodies.kindred = `${head('CARE, AT YOUR PACE', 'Make room for your smile.', 'A simple booking experience, from your first visit to your next.', pill('Fictional clinic concept'))}<div class="booking-layout"><section class="care-story"><div class="care-emblem" aria-hidden="true">✳</div><p class="eyebrow">DENTAL BOOKING / APPOINTMENTS</p><h2>A little care.<br>A lot of clarity.</h2><p>Choose your clinician and a time that works for you. Review every detail before confirming.</p><div class="care-details"><span>01 / Select your clinician</span><span>02 / Find a time</span><span>03 / You're all set</span></div><div class="staff-mini">${avatars(['AT', 'MR'])}<p>Alex Tan & Maya Reyes<br><small>Fictional care team</small></p></div></section><section class="panel appointment"><div class="panel-head"><h2>Book a consultation</h2>${pill('30 minutes')}</div><label class="field">Choose a clinician<select data-clinician><option>Dr Alex Tan</option><option>Dr Maya Reyes</option></select></label><div class="calendar-head"><b>October 2026</b><span>Appointment times · GMT+8</span></div><div class="date-options" role="group" aria-label="Appointment date">${[
  ['23', 'Fri'],
  ['24', 'Sat'],
  ['26', 'Mon'],
  ['27', 'Tue'],
  ['28', 'Wed'],
]
  .map(
    ([d, n], i) =>
      `<button type="button" data-book-date="${n}, ${d} October" aria-pressed="${!i}"><small>${n}</small><b>${d}</b><i></i></button>`,
  )
  .join(
    '',
  )}</div><h3>Available times</h3><div class="time-options" role="group" aria-label="Appointment time">${['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM'].map((t, i) => `<button type="button" data-book-time="${t}" aria-pressed="${i === 1}">${t}</button>`).join('')}</div><div class="booking-review"><span>Your consultation</span><strong data-book-review>Dr Alex Tan · Fri, 23 October · 10:00 AM</strong><small>Online or at the clinic · Demonstration only</small></div><button type="button" class="primary" data-confirm-booking>Confirm sample appointment</button><p class="muted">No personal details or payments are collected in this demo.</p></section></div>`;
bodies.daybreak = `${head('HOTEL & COURT BOOKING / RESERVATIONS', 'More time for the good things.', 'A quiet stay. A great game. A plan that feels effortless.', pill('Concept reservation desk'))}<div class="club-intro"><div><p class="eyebrow">STAY A LITTLE. PLAY A LITTLE.</p><h2>Your next break,<br>beautifully simple.</h2><p>Sample rooms and pickleball courts in one reservation experience.</p></div><div class="court-art"><img src="/demos/media/pickleball-court.webp" alt="Illustrative indoor pickleball court" width="720" height="540"></div></div><div class="reservation-controls">${segments('reservation', ['Stays', 'Courts'])}<label class="field">Arrival / play date<input type="date" value="2026-10-23" min="2026-10-01" max="2026-12-31" data-reserve-date></label><p class="muted">Sample availability · GMT+8</p></div><div class="option-grid" data-reservation="Stays">${[
  ['Courtyard studio', '2 guests · Breakfast included', '4,200', 'warm'],
  ['Garden suite', '2–3 guests · Private terrace', '5,800', 'sage'],
  ['Family loft', '4 guests · Two sleeping areas', '7,600', 'blue'],
]
  .map(
    ([n, s, p, c], i) =>
      `<article class="stay-card"><div class="room-art ${c}"><img src="/demos/media/${['studio', 'garden-suite', 'family-loft'][i]}.webp" alt="Illustrative ${n.toLowerCase()} interior" width="720" height="540"></div><div><h3>${n}</h3><p>${s}</p><strong>₱${p}<small> / night</small></strong><button class="soft" type="button" data-reserve="${n}">Reserve sample stay ↗</button></div></article>`,
  )
  .join('')}</div><div class="option-grid" data-reservation="Courts" hidden>${[
  ['Court 01', 'Indoor · 2–4 players', '9:00–10:00 AM'],
  ['Court 02', 'Covered · 2–4 players', '4:00–5:00 PM'],
  ['Court 03', 'Outdoor · 2–4 players', '5:00–6:00 PM'],
]
  .map(
    ([n, s, t]) =>
      `<article class="stay-card court-card"><div class="small-court" aria-hidden="true"><i></i></div><div><h3>${n}</h3><p>${s}</p><strong>₱600<small> / hour · ${t}</small></strong><button class="soft" type="button" data-reserve="${n} · ${t}">Reserve sample court ↗</button></div></article>`,
  )
  .join('')}</div>`;
bodies.vista = `<div class="estate-head"><div><p class="eyebrow">PROPERTY DISCOVERY / ARCHITECTURAL CONCEPTS</p><h1>Space to live a little differently.</h1></div>${pill('Fictional property concept')}</div><div class="estate-layout"><section class="estate-tour"><div class="tour-image"><img src="/demos/media/vista-exterior.webp" data-tour-image width="1536" height="1024" alt="Generated exterior concept of a contemporary courtyard house"><span class="tour-tag" data-tour-label>01 / Courtyard arrival</span><button type="button" class="tour-hotspot" data-tour-next aria-label="Explore the next space">↗</button></div><div class="tour-controls" role="group" aria-label="Explore concept spaces"><button type="button" data-tour-view="exterior" aria-pressed="true"><span>01</span>Courtyard arrival</button><button type="button" data-tour-view="interior" aria-pressed="false"><span>02</span>Living & gathering</button></div><p class="muted">Generated architectural concepts. Views illustrate a design direction; they are not a surveyed property or a continuous filmed walkthrough.</p></section><aside class="estate-details"><p class="eyebrow">THE COURTYARD COLLECTION</p><h2>A calmer kind<br>of coming home.</h2><p>Light-filled spaces, warm natural materials and a little room for the everyday.</p><div class="property-facts"><span><b>3</b>Bedrooms</span><span><b>2</b>Levels</span><span><b>186 m²</b>Concept area</span></div><div class="floorplan"><svg viewBox="0 0 300 160" role="img" aria-label="Illustrative ground-floor concept plan"><path d="M15 15h270v130H15z" fill="#faf7f0" stroke="#8c978c" stroke-width="4"/><path d="M165 15v130M15 85h150M220 15v65h65" fill="none" stroke="#8c978c" stroke-width="3"/><rect x="175" y="91" width="100" height="42" fill="#cbd4bb"/><text x="40" y="56">Living</text><text x="38" y="118">Dining</text><text x="183" y="55">Entry</text><text x="191" y="118">Courtyard</text></svg><small>Illustrative layout · Not to scale</small></div><button type="button" class="primary" data-viewing>Arrange a sample viewing</button><p class="muted">No listing, price or availability is being offered.</p><div class="viewing-panel" data-viewing-panel hidden><label class="field">Preferred day<input type="date" value="2026-10-26" data-viewing-date></label><button type="button" class="soft" data-viewing-confirm>Request sample viewing</button></div></aside></div>`;
bodies.relaydock = `${head('ENVIRONMENTS / DEMO-STACK', 'From setup to a smooth handover.', 'Infrastructure, application delivery and team readiness.', pill('Sandbox · No live infrastructure', 'blue'))}<div class="metrics">${metric('Services healthy', '5 / 5', 'Sample stack telemetry')}${metric('Release candidate', 'v1.8.0', 'Ready for a dry run')}${metric('Latest backup', '09:00', 'Demo timestamp')}${metric('Enablement', '3 sessions', 'Planned, not delivered')}</div><div class="ops-layout"><section class="panel stack-panel"><div class="panel-head"><h2>Industry application stack</h2><span class="mono">DEMO / AP-SOUTHEAST</span></div><div class="stack-map">${[
  ['edge', 'Edge & routing', 'HTTPS / traffic policy'],
  ['app', 'Application', 'Web / booking / operations'],
  ['data', 'Data services', 'PostgreSQL / object storage'],
  ['jobs', 'Worker queue', 'Scheduled sync / notifications'],
]
  .map(
    ([id, n, s], i) =>
      `<button type="button" data-stack="${id}" aria-pressed="${!i}"><span class="node-icon">${['↗', '▦', '▤', '⇄'][i]}</span><b>${n}</b><small>${s}</small><i></i></button>`,
  )
  .join(
    '',
  )}</div><div class="stack-detail"><span class="eyebrow">SELECTED COMPONENT</span><h3 data-stack-title>Edge & routing</h3><p data-stack-description>Routes incoming requests to the application. Demo policies show HTTPS and basic health checks.</p></div><div class="terminal"><div><span>Deployment preview</span><small>DRY RUN</small></div><pre data-deploy-log>Ready. This simulation does not contact a server.
$ system deploy --preview
Waiting for your command…</pre></div></section><aside>${panel('Release checklist', `<ol class="release-list">${['Validate configuration', 'Check data backup', 'Verify application health', 'Prepare team handover'].map((x, i) => `<li data-release-step="${i}"><span>0${i + 1}</span><b>${x}</b><small>Ready</small></li>`).join('')}</ol><button type="button" class="primary" data-deploy>Run dry deployment</button>`)}${panel('Implementation & enablement', `<div class="enablement"><div><span>01</span><p><b>Discovery & environment plan</b><small>Map roles, integrations and rollout needs</small></p></div><div><span>02</span><p><b>Operator workshop</b><small>Hands-on workflows with sample records</small></p></div><div><span>03</span><p><b>Handover & support guide</b><small>Runbook, ownership and recovery paths</small></p></div></div>`, 'Sample delivery plan')}</aside></div>`;
export function buildIndustry() {
  Object.assign(bodies, automationOverviews({ head, pill }));
  Object.assign(bodies, commerceBodies({ head, metric, panel, pill }));
  const manifest = [];
  for (const d of records) {
    const nav =
      d.id === 'vista'
        ? ['Discover', 'Concept spaces', 'Viewing']
        : d.id === 'kindred'
          ? ['Appointments', 'Our approach', 'Your visit']
          : d.id === 'daybreak'
            ? ['Reservations', 'Club overview', 'Guest services']
            : ['Overview', 'Operations', 'Reports', 'Settings'];
    const title = `${d.title} — Interactive concept`;
    const shell = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><link rel="stylesheet" href="/demos/demo.css"><script defer src="/demos/demo.js"></script></head><body class="demo-${d.id}" data-demo="${d.id}"><div class="demo-banner" role="banner"><span>ILLUSTRATIVE SYSTEM / SAMPLE DATA</span><a href="/services/${d.service}#industry-demos" target="_top">XZEN system previews ↗</a></div><div class="demo-shell"><aside class="demo-sidebar" aria-label="${d.title} workspace"><div class="demo-brand"><span>▦</span><b>${d.title}</b></div><p class="nav-caption">WORKSPACE</p><nav aria-label="Demo overview">${nav.map((n, i) => `<span class="${!i ? 'active' : ''}"><i>${['▦', '◈', '▤', '⚙'][i]}</i>${n}</span>`).join('')}</nav><div class="sidebar-note"><span>BUILT AROUND PEOPLE</span><p>An illustrative system workflow.<br>Try the controls in the main view.</p><div class="profile">${avatars(['AR'])}<span>Alex Reyes<small>Demo workspace</small></span></div></div></aside><main class="demo-main"><header class="demo-topbar"><span>${d.industry}</span><div>${pill('Demo workspace')}<span class="avatar">AR</span></div></header><div class="demo-content">${bodies[d.id]}</div><p class="demo-footnote">Illustrative system and sample people · Demonstration data · No live transactions</p></main></div><div class="demo-toast" role="status" aria-live="polite" data-toast hidden></div></body></html>\n`;
    fs.mkdirSync(path.join(base, 'showcase-ui/industry'), { recursive: true });
    fs.mkdirSync(path.join(base, 'public/demos'), { recursive: true });
    fs.writeFileSync(
      path.join(base, `showcase-ui/industry/${d.id}.html`),
      shell,
    );
    fs.writeFileSync(path.join(base, `public/demos/${d.id}.html`), shell);
    manifest.push({
      key: `industry/${d.id}`,
      title: d.industry,
      product: d.title,
      width: 1440,
      height: 900,
    });
  }
  fs.copyFileSync(
    path.join(base, 'showcase-ui/industry.css'),
    path.join(base, 'public/demos/demo.css'),
  );
  fs.writeFileSync(
    path.join(base, 'public/demos/demo.js'),
    fs.readFileSync(
      path.join(base, 'showcase-ui/automation-actions.js'),
      'utf8',
    ) +
      '\n' +
      fs.readFileSync(
        path.join(base, 'showcase-ui/commerce-actions.js'),
        'utf8',
      ) +
      '\n' +
      fs.readFileSync(path.join(base, 'showcase-ui/industry.js'), 'utf8'),
  );
  fs.writeFileSync(
    path.join(base, 'showcase-ui/industry-contract.json'),
    JSON.stringify(
      manifest.map((x) => x.key),
      null,
      2,
    ) + '\n',
  );
  return manifest;
}
