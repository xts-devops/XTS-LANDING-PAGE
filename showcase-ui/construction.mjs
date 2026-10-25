/** One illustrative project, five coordinated snapshots; no real client/site claims. */
export const constructionPhases = [
  {
    id: 'foundation',
    name: 'Foundation',
    week: '04',
    progress: 15,
    open: 12,
    gate: 'Foundation inspection record',
    note: 'Earthworks and foundations · release the next work package after review.',
    document: 'Site survey · approved drawings · inspection request',
    tasks: [
      ['Survey and set-out record', 'Site engineer', true],
      ['Reinforcement inspection log', 'QA lead', true],
      ['Concrete test records', 'QA lead', false],
      ['Slab release review', 'Project lead', false],
    ],
  },
  {
    id: 'structure',
    name: 'Structure',
    week: '10',
    progress: 38,
    open: 9,
    gate: 'Structural work-package review',
    note: 'Columns, beams and slabs · track inspection evidence and drawing revisions.',
    document: 'Structural drawings · pour records · site observations',
    tasks: [
      ['Drawing revision issued', 'Design coordinator', true],
      ['Concrete pour records', 'Site engineer', true],
      ['Temporary works review', 'Site lead', false],
      ['Structural inspection closeout', 'QA lead', false],
    ],
  },
  {
    id: 'enclosure',
    name: 'Enclosure',
    week: '16',
    progress: 62,
    open: 7,
    gate: 'Roof and window inspection',
    note: 'Masonry, roofing and glazing · coordinate weatherproofing and deliveries.',
    document: 'Window schedule · delivery log · roof inspection',
    tasks: [
      ['Window schedule confirmed', 'Design coordinator', true],
      ['Masonry inspection logged', 'QA lead', true],
      ['Roof waterproofing review', 'Site engineer', false],
      ['Glazing delivery checked', 'Procurement lead', false],
    ],
  },
  {
    id: 'fitout',
    name: 'Fit-out',
    week: '22',
    progress: 84,
    open: 5,
    gate: 'Services testing and defect review',
    note: 'Services and finishes · record tests, resolve defects and prepare turnover.',
    document: 'Test reports · finishes schedule · defect register',
    tasks: [
      ['Finishes sample approved', 'Design coordinator', true],
      ['Services test records', 'MEP coordinator', true],
      ['Defect walk-through', 'Project lead', false],
      ['Turnover documents assembled', 'Document controller', false],
    ],
  },
  {
    id: 'handover',
    name: 'Handover',
    week: '26',
    progress: 100,
    open: 0,
    gate: 'Turnover pack complete',
    note: 'Final closeout · inspection records, owner orientation and documentation.',
    document: 'As-built records · manuals and warranties · acceptance log',
    tasks: [
      ['Testing records filed', 'MEP coordinator', true],
      ['Defect items closed', 'QA lead', true],
      ['Owner orientation recorded', 'Project lead', true],
      ['As-builts and manuals issued', 'Document controller', true],
    ],
  },
];
const initial = constructionPhases[2];
const tasks = initial.tasks
  .map(
    ([title, owner, done], i) =>
      `<label><input type="checkbox" data-site-task="${i}" ${done ? 'checked' : ''}><span><b data-site-task-title>${title}</b><small data-site-task-owner>${owner}</small></span></label>`,
  )
  .join('');
export const constructionBody = `
<div class="page-head"><div><p class="eyebrow">SAMPLE PROJECT / SC-024</p><h1>Residential build</h1><p>Two-storey house · Project phase snapshots</p></div><span class="pill green" data-build-status>Enclosure in progress</span></div>
<div class="metrics construction-metrics">
 <article class="metric"><span>Project progress</span><strong data-build-progress>62%</strong><small>Illustrative snapshot</small></article>
 <article class="metric"><span>Current phase</span><strong data-build-current>Enclosure</strong><small data-build-period>Week 16 · sample programme</small></article>
 <article class="metric"><span>Open coordination items</span><strong data-build-open>7</strong><small>Across the sample project</small></article>
 <article class="metric"><span>Next review gate</span><strong class="construction-gate" data-build-gate>Roof and window inspection</strong><small>Evidence and sign-off tracked</small></article>
</div>
<div class="build-layout construction-layout"><section class="panel build-panel">
 <div class="panel-head"><div><h2>One project. Every phase.</h2><small>Generated site illustrations · consistent camera view</small></div><button type="button" data-build-play class="soft" aria-pressed="false">Play sequence</button></div>
 <div class="build-scene construction-scene" data-build-scene data-phase="2" aria-busy="false">
  <img class="construction-photo is-current" data-construction-photo src="/demos/media/construction/enclosure.webp" width="1600" height="900" alt="Illustrative two-storey residential project during enclosure works">
  <img class="construction-photo" data-construction-photo src="/demos/media/construction/enclosure.webp" width="1600" height="900" alt="" aria-hidden="true">
  <span class="scene-tag" data-phase-label>03 / Enclosure</span><span class="construction-photo-note">Illustrative phase record</span>
  <p class="construction-photo-fallback" data-build-fallback hidden>Phase photograph unavailable. Project details remain available below.</p>
 </div>
 <div class="phase-buttons" role="group" aria-label="Build phase">${constructionPhases.map((p, i) => `<button type="button" data-phase-button="${i}" aria-pressed="${i === 2}"><span>0${i + 1} · WK ${p.week}</span>${p.name}</button>`).join('')}</div>
 <div class="construction-phase-summary"><p data-build-note>${initial.note}</p><div class="construction-completion" role="progressbar" aria-label="Sample project progress" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" data-build-completion style="--completion:0.62"><i></i></div></div>
 <div class="construction-document-strip"><b>Document register</b><span data-build-documents>${initial.document}</span></div>
 </section><aside>
 <section class="panel"><div class="panel-head"><h2>Phase coordination</h2><small>Local sample state</small></div><div class="construction-task-body"><div class="task-list">${tasks}</div><p class="muted" data-site-status aria-live="polite">2 of 4 coordination items recorded</p></div></section>
 <section class="panel"><div class="panel-head"><h2>Milestone timeline</h2><small>Sample weeks</small></div><ol class="timeline construction-timeline">${constructionPhases.map((p, i) => `<li class="${i === 2 ? 'current' : ''}" data-build-milestone="${i}"><b>${p.name}</b><span data-build-milestone-state>${i < 2 ? 'Complete' : i === 2 ? 'In progress' : 'Up next'}</span></li>`).join('')}</ol></section>
 </aside></div>
<p class="construction-disclaimer">Sample programme and progress only · Generated phase illustrations, not actual site evidence or engineering documentation.</p>
<script type="application/json" data-construction-phases>${JSON.stringify(constructionPhases)}</script>`;
