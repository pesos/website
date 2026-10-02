import { LINKS, SITE } from './site';

export const SOCIALS = [
  { h: 'Slack', s: 'Our main channel — most members are here', href: LINKS.slack },
  { h: 'GitHub', s: 'github.com/pesos', href: LINKS.github },
  { h: 'Instagram', s: '@pes.opensource', href: LINKS.instagram },
  { h: 'Twitter / X', s: '@pesopensource', href: LINKS.twitter },
];

export const CONTACT_STATS = [
  { k: 'Founded', v: String(SITE.founded) },
  { k: 'Members', v: '30+' },
  { k: 'Public Repos', v: '27' },
];

// Options for the contact form's "subject" select (also offered by the
// terminal's `send` command).
export const CONTACT_SUBJECTS = ['General inquiry', 'Join the club', 'Project proposal', 'Code of Conduct concern'];

export const FAQS = [
  { q: 'What is the fastest way to reach you?', a: 'Slack — that\'s where the community actually lives and where most questions get answered fastest. The form on this page works too, and reaches the team directly.' },
  { q: 'Where and when are your meet-ups held?', a: 'On campus, twice a week during the semester. The exact day, time and room are announced on Slack each week — join to see what\'s next.' },
  { q: 'Can I attend a meeting before becoming a member?', a: 'Absolutely. Open work sessions are open to anyone curious. Bring a laptop and introduce yourself.' },
  { q: 'Do you accept partnership or project proposals?', a: 'Yes — use the form, or reach out on Slack. See the "start your own project" criteria on the Projects page.' },
];
