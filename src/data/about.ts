import { SITE } from './site';

// "Our Standards" — from the club's own Code of Conduct.
export const STANDARDS = [
  { n: '01', t: 'Welcoming, inclusive language', d: 'A positive environment starts with how we talk to each other, online and in person.' },
  { n: '02', t: 'Help each other grow', d: 'Broaden each other’s knowledge and perspective — no question is a stupid question here.' },
  { n: '03', t: 'Respect differing viewpoints', d: 'Gracefully accept constructive criticism, and show empathy towards other members.' },
  { n: '04', t: 'Safety over comfort', d: 'We prioritise the safety of the marginalised over the comfort of the privileged.' },
];

// Real activities, from the club's "What We Do" mission page.
export const MISSION_ACTIVITIES = [
  { t: 'Workshops', d: 'Hands-on sessions on the open-source movement, tools and technologies — from industry guests and community members alike.' },
  { t: 'Talks', d: 'Presentations from prominent open-source contributors around Bangalore, giving members a glimpse into real-world programming.' },
  { t: 'Community projects', d: 'Collaborative work on projects hosted under github.com/pesos, reviewed and selected based on community interest.' },
  { t: 'A Hacktoberfest-style PR challenge', d: 'Members hunt for help-wanted and low-hanging-fruit issues, with a dedicated event to hit a weekly pull-request target.' },
  { t: 'General meet-ups', d: 'Twice-weekly, casual sessions for coding, lightning talks, code review, elections and planning — our most important activity.' },
];

// Real organisational structure — from the club's handbook.
export const ROLES = [
  { r: 'Club Heads / Benevolent Dictators', d: 'Coordinate all activities and have final say in decisions — expected to be benevolent and serve the community’s needs.' },
  { r: 'Technical Heads', d: 'Manage technical aspects: the website, group projects, and technical arrangements at events.' },
  { r: 'Community Relations Head', d: 'Promotes events and reviews Code of Conduct violations and other grievances.' },
  { r: 'Event Coordinators', d: 'The backbone of every event — registrations, logistics and timing.' },
];

export const ABOUT_STATS = [
  { num: String(SITE.founded), label: 'Founded' },
  { num: '27', label: 'Public Repositories' },
  { num: '30+', label: 'Members' },
  { num: '3', label: 'Active Flagship Projects' },
];
