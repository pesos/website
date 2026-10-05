/**
 * Third-party programs PESOS members may find useful. These offers are run by
 * their providers; eligibility and availability are set by each provider.
 */
export type Perk = {
  title: string;
  category: 'Tools' | 'Cloud' | 'Learning';
  blurb: string;
  applyUrl: string;
  detailsUrl: string;
  applyLabel: string;
  featured?: boolean;
};

export const PERKS: Perk[] = [
  {
    title: 'GitHub Student Developer Pack',
    category: 'Tools',
    blurb:
      'A collection of developer tools and partner offers for students verified by GitHub Education. Browse the current offers and eligibility requirements on GitHub.',
    applyUrl: 'https://education.github.com/pack/join',
    detailsUrl: 'https://education.github.com/pack',
    applyLabel: 'Apply with GitHub',
    featured: true,
  },
  {
    title: 'JetBrains Student Pack',
    category: 'Tools',
    blurb:
      'Eligible students can request a free educational license for JetBrains tools. JetBrains verifies applications and sets license terms.',
    applyUrl: 'https://www.jetbrains.com/academy/student-pack/',
    detailsUrl: 'https://www.jetbrains.com/academy/student-pack/',
    applyLabel: 'Check eligibility',
  },
  {
    title: 'Vercel Open Source Program',
    category: 'Cloud',
    blurb:
      'Vercel’s open-source program offers platform credits to selected projects. Applications are currently closed, and this is a project program rather than a personal student credit.',
    applyUrl: 'https://vercel.com/open-source-program',
    detailsUrl: 'https://vercel.com/open-source-program',
    applyLabel: 'View program',
  },
  {
    title: 'Frontend Masters Student Offer',
    category: 'Learning',
    blurb:
      'The GitHub Student Developer Pack currently includes six months of Frontend Masters access for eligible students. Redeem through the provider offer.',
    applyUrl: 'https://frontendmasters.com/welcome/github-student-developers/',
    detailsUrl: 'https://education.github.com/pack',
    applyLabel: 'Redeem offer',
  },
  {
    title: 'Figma for Education',
    category: 'Tools',
    blurb:
      'Eligible students can apply for Figma’s Education plan. Figma verifies education status and sets regional and plan requirements.',
    applyUrl: 'https://www.figma.com/education/apply',
    detailsUrl: 'https://www.figma.com/education/',
    applyLabel: 'Apply to Figma',
  },
];

export const PERK_CATEGORIES = ['All', 'Tools', 'Cloud', 'Learning'];

export const PERK_STEPS = [
  { step: 'Step 1', title: 'Choose an offer', desc: 'Open the provider’s application or program page from the card above.' },
  {
    step: 'Step 2',
    title: 'Check eligibility',
    desc: 'Read the provider’s current student, educator, or project requirements. Offers are managed by each provider, not issued by PESOS.',
  },
  {
    step: 'Step 3',
    title: 'Apply with the provider',
    desc: 'Submit any required student or project verification directly to the provider.',
  },
  {
    step: 'Step 4',
    title: 'Follow provider instructions',
    desc: 'The provider will confirm approval, access, renewals, and any limits for your offer.',
  },
];
