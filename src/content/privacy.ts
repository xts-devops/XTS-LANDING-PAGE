/**
 * Privacy notice copy (Claude's lane). Plain-language draft for the PH Data Privacy Act
 * (RA 10173). Describes only what this site actually does. XTS should have it reviewed before launch.
 */
export const privacy = {
  title: 'Privacy Notice',
  description:
    'How XZEN TECH SOLUTIONS handles the details you send through this website’s inquiry form.',
  updated: '16 October 2026',
  intro:
    'This notice explains what personal information XZEN TECH SOLUTIONS (“XTS”, “we”) collects through this website, why, and the choices you have. It applies to this website only.',
  sections: [
    {
      heading: 'What we collect',
      body: [
        'When you send an inquiry, we receive the details you type into the form: your name, email address, company (optional), the type of solution you’re interested in, and your message.',
        'We don’t ask for sensitive personal information. Please don’t include it in your message.',
        'Like most websites, our hosting provider automatically processes technical data such as your IP address and browser type to deliver and secure the site.',
      ],
    },
    {
      heading: 'Why we use it',
      body: [
        'We use your inquiry details only to reply to you and to discuss the project or service you asked about. We don’t sell your information or use it for unrelated marketing.',
        'Our legal basis is your consent, which you give by ticking the consent box, and our legitimate interest in responding to business inquiries.',
      ],
    },
    {
      heading: 'Who handles it',
      body: [
        'Form submissions are relayed to our inbox by Web3Forms, an email-delivery service that acts on our behalf. The website is hosted by Vercel. These providers process data only to deliver their service to us.',
        'We don’t share your inquiry with anyone else unless the law requires it.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'We keep inquiry emails for as long as we need them to respond and, if we work together, for the duration of that business relationship and any period the law requires. After that we delete them.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      body: [
        'This website doesn’t use advertising or tracking cookies. If we measure visits, we use privacy-friendly, cookie-free analytics that count page views without identifying you.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Under the Data Privacy Act of 2012 (Republic Act No. 10173), you can ask to be informed about, access, correct, or delete your personal information, object to its processing, and withdraw your consent at any time.',
        'To make a request, email us at the address below. If you believe we haven’t handled your information properly, you can also file a complaint with the National Privacy Commission.',
      ],
    },
  ],
  contactHeading: 'Contact us',
  contactBody:
    'For privacy questions or requests, contact XZEN TECH SOLUTIONS:',
  back: 'Back to home',
} as const;
