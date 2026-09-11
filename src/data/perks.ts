export type Perk = {
  title: string;
  category: 'Tools' | 'Cloud' | 'Learning' | 'Community';
  blurb: string;
  featured?: boolean;
};

export const PERKS: Perk[] = [
  {
    title: 'GitHub Student Developer Pack',
    category: 'Tools',
    blurb:
      'The ultimate development bundle for learners. Free access to GitHub Copilot, GitHub Pro accounts, and more than $15,000 in partner developer credits across major engineering services.',
    featured: true,
  },
  {
    title: 'GitHub Student Pack',
    category: 'Tools',
    blurb: 'Access to Copilot, hosting credits, developer tools and more.',
  },
  {
    title: 'JetBrains All Products',
    category: 'Tools',
    blurb: 'Free educational licenses for standard-setting IDEs like IntelliJ, GoLand, WebStorm.',
  },
  {
    title: 'Vercel Pro Credits',
    category: 'Cloud',
    blurb: 'Deploy serverless projects globally with developer-tier bandwidth and optimizations.',
  },
  {
    title: 'Frontend Masters',
    category: 'Learning',
    blurb: 'Complete training courses from React framework depths to network engineering.',
  },
  {
    title: 'Swag & Merch Pack',
    category: 'Community',
    blurb: 'Unlock custom open-source community hoodies, tees, stickers, and keycaps.',
  },
  {
    title: 'Figma Professional',
    category: 'Tools',
    blurb: 'Professional design and team collaboration workspace licenses.',
  },
];

export const PERK_CATEGORIES = ['All', 'Tools', 'Cloud', 'Learning', 'Community'];

export const PERK_STEPS = [
  { step: 'Step 1', title: 'Join the club', desc: 'Become an official member of the PESOS community.' },
  {
    step: 'Step 2',
    title: 'Make contribution',
    desc: 'Submit and merge a qualified code contribution to our core projects.',
  },
  {
    step: 'Step 3',
    title: 'Reach the threshold',
    desc: 'Earn at least 15 points in our contribution index leaderboard.',
  },
  {
    step: 'Step 4',
    title: 'Redeem your perk',
    desc: 'Request and claim your developer license code via our Discord bot.',
  },
];
