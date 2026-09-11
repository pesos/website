// We don't have a live events calendar to pull from (specific dates/venues
// are announced on Slack, not published anywhere we can source honestly),
// so this page describes the real recurring activities instead of inventing
// a fake calendar. See the "What We Do" section on /about/ for the source.
export type ActivityItem = {
  title: string;
  type: 'Workshop' | 'Talk' | 'Project Session' | 'PR Challenge' | 'Meetup';
  blurb: string;
  cadence: string;
  featured?: boolean;
};

export const ACTIVITIES: ActivityItem[] = [
  {
    title: 'General Meet-ups',
    type: 'Meetup',
    blurb:
      'Our most important activity. Casual coding, lightning talks, code review, question time, and planning for everything else we do.',
    cadence: 'Twice a week, without fail',
    featured: true,
  },
  {
    title: 'Workshops',
    type: 'Workshop',
    blurb: 'Hands-on sessions on current tools and technologies, run by industry guests or by community members sharing something they discovered.',
    cadence: 'At least once a semester (major) · twice a semester (community-run)',
  },
  {
    title: 'Talks',
    type: 'Talk',
    blurb: 'Presentations from prominent open-source contributors around Bangalore, giving members a glimpse into real-world programming.',
    cadence: 'As scheduled',
  },
  {
    title: 'Community Project Sessions',
    type: 'Project Session',
    blurb: 'Coordinated work on Grofer, Rshark, browser-history and the rest of github.com/pesos — plus supporting other open-source projects on campus.',
    cadence: 'Ongoing, in #projects',
  },
  {
    title: 'PR Challenge',
    type: 'PR Challenge',
    blurb: 'A Hacktoberfest-style event where the community sets a pull-request target and tries to hit it within a week.',
    cadence: 'Dedicated event, plus ongoing pushes during general meet-ups',
  },
];

export const ACTIVITY_TYPES = ['All', 'Meetup', 'Workshop', 'Talk', 'Project Session', 'PR Challenge'];
