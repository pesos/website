// A real record of PES Open Source's history — past events, legacy/archived
// repos under github.com/pesos, and a few historical milestones.
export type ArchiveEntry = {
  title: string;
  type: 'Past Events' | 'Legacy Projects' | 'Historical Records';
  category: string;
  semester: 'Fall' | 'Spring';
  year: string;
  date: string;
  blurb: string;
  href?: string;
};

export const ARCHIVE_ENTRIES: ArchiveEntry[] = [
  {
    title: 'Git Workshop',
    type: 'Past Events',
    category: 'Workshop',
    semester: 'Fall',
    year: '2019',
    date: 'Oct 16, 2019',
    blurb:
      'PESOS’s first workshop — a hands-on session to learn git and get started using version control effectively.',
    href: 'https://github.com/pesos/pesos.github.io/blob/master/_posts/2019-10-27-git-workshop.md',
  },
  {
    title: 'Hacktoberfest at PES University',
    type: 'Past Events',
    category: 'Hackathon',
    semester: 'Fall',
    year: '2020',
    date: '23 & 28 Oct, 2020',
    blurb:
      'An introduction to open source, followed by a Hack Day where members registered for Hacktoberfest and shipped their first PRs.',
  },
  {
    title: 'PESOS Recruitment Drive 2020',
    type: 'Past Events',
    category: 'Recruitment',
    semester: 'Fall',
    year: '2020',
    date: 'Nov 1, 2020',
    blurb:
      'A leadership-team recruitment cycle for the batch of 2023 and over, designed for a smooth generational hand-off.',
    href: 'https://github.com/pesos/pesos.github.io/blob/master/_posts/2020-11-01-recruitments-2020.md',
  },
  {
    title: 'Optimus',
    type: 'Legacy Projects',
    category: 'Bot',
    semester: 'Fall',
    year: '2016',
    date: 'Archived',
    blurb: 'Optimus Prime — PES Open Source’s IRC bot for the community’s online presence.',
    href: 'https://github.com/pesos/optimus',
  },
  {
    title: 'Heiko',
    type: 'Legacy Projects',
    category: 'Systems',
    semester: 'Spring',
    year: '2021',
    date: 'Archived',
    blurb: 'A fancy load balancer for lightweight devices, written in Python.',
    href: 'https://github.com/pesos/heiko',
  },
  {
    title: 'Sticky Notes',
    type: 'Legacy Projects',
    category: 'Web App',
    semester: 'Fall',
    year: '2012',
    date: 'Archived',
    blurb: 'A free and open-source pastebin application, written in PHP.',
    href: 'https://github.com/pesos/sticky-notes',
  },
  {
    title: 'PES Open Source, Founded',
    type: 'Historical Records',
    category: 'Milestone',
    semester: 'Spring',
    year: '2012',
    date: 'Apr 2012',
    blurb: 'The github.com/pesos organisation is created — the start of the community’s public history.',
    href: 'https://github.com/pesos',
  },
  {
    title: 'PES Summer of Code',
    type: 'Historical Records',
    category: 'Program',
    semester: 'Spring',
    year: '2014',
    date: '2014',
    blurb: 'An internal summer-of-code style program for PES students to build projects over the break.',
    href: 'https://github.com/pesos/PES-SoC-14',
  },
  {
    title: 'The OSIRIS Revamp',
    type: 'Historical Records',
    category: 'Rebrand',
    semester: 'Spring',
    year: '2026',
    date: 'Feb 6, 2026',
    blurb: 'PESOS is newly revamped — the community now also goes by the nickname "OSIRIS."',
    href: 'https://github.com/pesos/members-list',
  },
];

export const ARCHIVE_STATS = [
  { k: 'Total Entries', v: String(ARCHIVE_ENTRIES.length) },
  { k: 'Years Spanned', v: '2012–2026' },
  { k: 'Contributors', v: '30+' },
];

export const ARCHIVE_YEARS = ['2026', '2021', '2020', '2019', '2016', '2014', '2012'];
export const ARCHIVE_SEMESTERS = ['All Semesters', 'Fall', 'Spring'];
export const ARCHIVE_TABS = ['Past Events', 'Legacy Projects', 'Historical Records'];
