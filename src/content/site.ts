import type { Contact, Proof } from './types';

export const contact: Contact = {
  email: 'info@xzentechsolutions.com',
  phoneDisplay: '0969 244 2557',
  phoneHref: 'tel:+639692442557',
  location: 'Philippines-based · serving clients nationwide',
};
export const proof: Proof[] = [
  {
    kind: 'count',
    value: 300,
    suffix: '+',
    label: 'Business systems delivered',
  },
  {
    kind: 'count',
    value: 200,
    suffix: '+',
    label: 'Robotics & automation projects',
  },
  { kind: 'text', value: 'End-to-end', label: 'Strategy → build → support' },
  {
    kind: 'text',
    value: 'PH-based',
    label: 'Serving clients across the Philippines',
  },
];
export const navigation = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Industries', href: '#industries' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
export const site = {
  title: 'XZEN TECH SOLUTIONS — Technology built for real growth',
  description:
    'Your Philippines-based technology partner for business platforms, custom software, automation and robotics. From strategy to implementation and support.',
  skipLink: 'Skip to content',
  homeLabel: 'XZEN TECH SOLUTIONS home',
  navLabel: 'Main navigation',
  footerNavLabel: 'Footer navigation',
  menuLabel: 'Menu',
  buildCta: 'Let’s Build',
  hero: {
    eyebrow: 'Technology · People · Real impact',
    heading: 'Technology solutions built for',
    emphasis: 'real growth',
    summary:
      'We engineer, build, and implement intelligent systems — from business platforms and custom software to automation and robotics.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'Explore Solutions',
    /** Illustrative operations console — decorative, no real client data or figures. */
    console: {
      title: 'Operations overview',
      status: 'All systems connected',
      hub: 'XTS',
      nodes: ['Platforms', 'Software', 'Automation', 'Robotics'],
      throughput: 'Orders processed',
      health: 'System health',
      checks: [
        ['POS · Branch network', 'Synced'],
        ['Warehouse system', 'Synced'],
        ['Production line 2', 'Running'],
      ],
      feed: [
        ['09:41', 'Inventory synced across branches'],
        ['09:42', 'New order routed to warehouse'],
        ['09:42', 'Pick path updated · Aisle C'],
        ['09:43', 'Robot cell 2 · cycle complete'],
        ['09:44', 'Daily sales report generated'],
        ['09:45', 'Supplier invoice matched to PO'],
      ],
    },
  },
  solutions: {
    eyebrow: 'Our solutions',
    heading: 'The right technology.\nBuilt around your business.',
    summary:
      'From the systems you run today to the possibilities you’re building next. Four connected capabilities, one technology partner.',
    support:
      'Implementation, training and long-term support included with every engagement.',
  },
  showcase: {
    eyebrow: 'Solution showcase',
    heading: 'What we build',
    summary:
      'Client engagements are confidential — these showcases illustrate the kind of systems we deliver.',
    cta: 'Discuss a similar project',
    label: 'Illustrative solution',
  },
  industries: {
    eyebrow: 'Industries we serve',
    heading: 'Real solutions.\nFor your world.',
    summary:
      'Different industries. Different challenges. Technology shaped around the way you work.',
    cta: 'Explore this industry',
    panelsLabel: 'Industry details',
  },
  process: {
    eyebrow: 'Our process',
    heading: 'From vision to\nreal-world impact',
    summary:
      'A clear path from your first question to a solution your team can rely on.',
  },
  contactSection: {
    eyebrow: 'Let’s build what’s next',
    heading: 'Your technology partner for a smarter tomorrow',
    summary:
      'Tell us what you’re working on. We’ll help you find the right next step.',
    formHeading: 'Start a conversation',
    formNote:
      'The inquiry form is being connected. Please email or call us in the meantime.',
    emailCta: 'Email our team',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    optional: 'optional',
    need: 'What do you need?',
    choose: 'Select a solution',
    other: 'Other',
    message: 'Tell us about your project',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@company.com',
    companyPlaceholder: 'Your company',
    messagePlaceholder: 'What would you like to build, connect or improve?',
    consent:
      'I agree to XTS using these details to reply to my inquiry, as described in the',
    privacyLink: 'privacy notice',
    honeypot: 'Leave this field empty',
    errors: {
      name: 'Enter your name.',
      email: 'Enter an email address like you@company.com.',
      need: 'Choose what you need help with.',
      message: 'Tell us a little more — at least 10 characters.',
      consent: 'Tick the box so we can reply to you.',
      company: 'Company name is too long.',
    },
    sending: 'Sending your inquiry…',
    success: 'Inquiry sent. We’ll reply to the email address you gave us.',
    invalid: 'Some details need fixing. Check the highlighted fields.',
    tooFast: 'That was quick — please check your details and send again.',
    failed:
      'Your inquiry didn’t send. Email info@xzentechsolutions.com or call 0969 244 2557 instead.',
    emailSubject: 'New inquiry from the XTS website',
    fromName: 'XTS Website',
    submit: 'Send inquiry',
    unavailable: 'Online inquiries are not enabled yet.',
  },
  footer: {
    summary: 'Technology. People. Real impact.',
    copyright: 'XZEN TECH SOLUTIONS. All rights reserved.',
    backTop: 'Back to top',
  },
};
