import type { WorkItem } from './types';

/**
 * Selected work. ⚠ PLACEHOLDER ENTRIES until XTS confirms real projects (PLAN-v2 §6):
 * sector-level and anonymised, no figures, no locations. Replace titles/summaries and fill
 * `location` once confirmed. Delete any entry XTS doesn't want shown.
 */
export const workIntro = {
  browseLabel: 'Browse capabilities',
  previous: 'Previous example',
  next: 'Next example',
  browseHint: 'Explore what we can build for your team',
  eyebrow: 'Applications, in context',
  heading: 'Built around the way you work',
  summary:
    'Client details stay confidential. These illustrative concepts explore the systems we can build, with generated imagery and no client results claimed.',
};

export const work: WorkItem[] = [
  {
    id: 'retail-chain',
    title: 'Multi-branch retail rollout',
    sector: 'Retail',
    summary:
      'POS across branches with live stock and daily sales in one dashboard.',
    service: 'business-systems',
    photo: 'work/retail-chain',
    photoAlt: 'Cashier using a point-of-sale terminal in a busy store',
  },
  {
    id: 'warehouse',
    title: 'Warehouse on handheld scanners',
    sector: 'Logistics',
    summary: 'WMS with guided picking, barcode receiving and bin-level stock.',
    service: 'business-systems',
    photo: 'work/warehouse',
    photoAlt: 'Warehouse worker scanning a barcode in a racked aisle',
  },
  {
    id: 'factory-line',
    title: 'Automated production cell',
    sector: 'Manufacturing',
    summary: 'Robotic handling with sensor monitoring and line dashboards.',
    service: 'robotics',
    photo: 'work/factory-line',
    photoAlt: 'Robotic arms working on an automated production line',
  },
  {
    id: 'office-erp',
    title: 'Finance and purchasing on ERP',
    sector: 'Corporate',
    summary: 'Purchase approvals, ledgers and reports moved off spreadsheets.',
    service: 'business-systems',
    photo: 'work/office-erp',
    photoAlt: 'Finance team reviewing reports on monitors',
  },
  {
    id: 'clinic',
    title: 'Clinic front-desk system',
    sector: 'Healthcare',
    summary: 'Appointments, records and supplies in one simple tool.',
    service: 'custom-software',
    photo: 'work/clinic',
    photoAlt: 'Clinic front desk with staff using a computer',
  },
  {
    id: 'field-team',
    title: 'Field team mobile app',
    sector: 'Services',
    summary: 'Offline-ready job app that syncs back to the office system.',
    service: 'custom-software',
    photo: 'work/field-team',
    photoAlt: 'Field technician using a rugged tablet outdoors',
  },
];

/**
 * Global reach. ⚠ Countries/regions are EMPTY until XTS confirms them. The section shows only
 * the statement while the list is empty, so nothing unconfirmed is ever displayed.
 */
export const reach = {
  eyebrow: 'Beyond the Philippines',
  heading: 'Built in the Philippines. Trusted by clients abroad.',
  summary:
    'We work remotely with teams in other time zones: same process, same standard, with overlap hours agreed up front.',
  regions: [] as { name: string; note?: string }[],
  quotes: [] as { text: string; who: string }[],
};
