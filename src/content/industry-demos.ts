import records from './industry-demos.json';
export const industryDemos = records;
export const industryCopy = {
  eyebrow: 'Software, in context',
  heading: 'See how the system works.',
  summary:
    'Short workflow previews, shaped around everyday business tasks. Films start in view; hover other samples or open a full-screen preview.',
  fullscreen: 'View full screen',
  pausePreview: 'Pause preview',
  resumePreview: 'Resume preview',
  pause: 'Pause',
  resume: 'Resume',
  close: 'Close',
  actual: 'Actual size',
  fit: 'Fit to screen',
  inspect: 'System preview; scroll to inspect at actual size',
  unavailable: 'Showing the sample screen',
  complete: 'Overview complete',
  fallback: 'View system screens',
  note: 'Illustrative systems · Sample data · No live transactions',
  modules: 'Explore system modules',
  previewLabel: 'Workflow overview',
  loading: 'Preparing preview…',
} as const;
