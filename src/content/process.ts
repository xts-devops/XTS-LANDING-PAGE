import type { Principle, Step } from './types';

export const principles: Principle[] = [
  {
    title: 'One partner, end to end',
    summary:
      'From the first conversation to implementation and ongoing support.',
    icon: 'layers',
  },
  {
    title: 'Industry-first thinking',
    summary:
      'We start with how your business works, then shape the technology around it.',
    icon: 'workflow',
  },
  {
    title: 'Built to last',
    summary: 'Practical systems and support that continue beyond go-live.',
    icon: 'shield-check',
  },
];
export const steps: Step[] = [
  {
    n: 1,
    title: 'Consult',
    summary: 'Understand your goals, challenges and opportunities.',
    icon: 'messages-square',
  },
  {
    n: 2,
    title: 'Design',
    summary: 'Create the strategy and solution architecture.',
    icon: 'pen-tool',
  },
  {
    n: 3,
    title: 'Build',
    summary: 'Develop, test and refine with a focus on quality.',
    icon: 'code',
  },
  {
    n: 4,
    title: 'Implement',
    summary: 'Deploy and integrate into your business.',
    icon: 'settings',
  },
  {
    n: 5,
    title: 'Support',
    summary: 'Help your team get the most from your systems.',
    icon: 'headphones',
  },
];
