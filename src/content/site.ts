import type { Contact, Proof } from './types';

export const contact: Contact = {
  email: 'info@xzentechsolutions.com',
  phoneDisplay: '0969 244 2557',
  phoneHref: 'tel:+639692442557',
  location: 'Philippines-based · working with clients in the PH and abroad',
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
    label: 'Clients in the Philippines and abroad',
  },
];
export const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Global', href: '#reach' },
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
    heading: 'Technology built for',
    lines: ['Technology', 'built for'],
    emphasis: 'real growth',
    summary:
      'We engineer, build, and implement intelligent systems — from business platforms and custom software to automation and robotics.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'Explore services',
  },
  services: {
    eyebrow: 'What we do',
    heading: 'Four ways we help your business run better',
    summary: 'Pick a service to see the systems we build, as they look in use.',
    cta: 'See',
  },
  servicePage: {
    back: 'All services',
    systemsHeading: 'Systems we deliver',
    systemsLabel: 'Choose a system',
    sampleNote:
      'Sample system with fictional data, built to show our standard.',
    galleryHeading: 'From the bench to the factory floor',
    explodedHeading: 'Engineered down to every part',
    explodedSummary:
      'Scroll to take it apart. We design, source and assemble each component, then put it to work.',
    cta: 'Start a project like this',
    prev: 'Previous slide',
    next: 'Next slide',
    slideOf: 'of',
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
    legalLabel: 'Legal',
    privacy: 'Privacy notice',
    terms: 'Website terms',
  },
};
