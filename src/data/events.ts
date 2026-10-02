// The kinds of events PESOS hosts. Specific dates and venues are announced on
// Slack and Discord, so this lists the events themselves rather than a
// calendar. `cadence` is only set where the schedule is actually fixed.
export type ActivityItem = {
  title: string;
  type: 'Meetup' | 'Hackathon' | 'Hacktoberfest' | 'CTF' | 'Fireside Talk' | 'Contribution Spree';
  blurb: string;
  cadence?: string;
  featured?: boolean;
};

export const ACTIVITIES: ActivityItem[] = [
  {
    title: 'Meetups',
    type: 'Meetup',
    blurb:
      'Our most important activity. Casual coding, lightning talks, code review, question time, and planning for everything else we do.',
    cadence: 'Twice a week during the semester',
  },
  {
    title: 'Hackathons',
    type: 'Hackathon',
    blurb:
      'Team up, pick a problem and build something from scratch against the clock. A fast way to learn a new stack and ship a working project in the open.',
  },
  {
    title: 'Hacktoberfest',
    type: 'Hacktoberfest',
    blurb:
      'We celebrate the month-long open-source event with an intro session and a hack day where members register, find issues and ship their first pull requests together.',
    cadence: 'Every October',
  },
  {
    title: 'CTFs',
    type: 'CTF',
    blurb:
      'Capture-the-flag security challenges: crack, reverse and exploit your way through puzzles, solo or as a team, and learn how systems really break.',
  },
  {
    title: 'Fireside Talks',
    type: 'Fireside Talk',
    blurb:
      'Informal conversations with open-source contributors and developers from around Bangalore about their work, their projects and how they got started.',
  },
  {
    title: 'Contribution Sprees',
    type: 'Contribution Spree',
    blurb:
      'The community sets a pull-request target and works together to hit it within a week, hunting for help-wanted and good-first issues across open-source projects.',
  },
];

export const ACTIVITY_TYPES = ['All', ...ACTIVITIES.map((a) => a.type)];
