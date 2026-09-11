// Real projects maintained under github.com/pesos. Stats pulled from the
// GitHub API on 2026-09-11 — re-check before relying on them long-term.
export type Project = {
  slug: string;
  name: string;
  category: string;
  status: 'Active' | 'Completed' | 'Looking for Contributors' | 'Archived';
  blurb: string;
  stack: string[];
  contributors: number;
  repo: string;
  branch: string;
  featured?: boolean;
  stats?: { label: string; value: string }[];
  info?: { label: string; value: string }[];
  goodFirstIssues?: { id: string; title: string }[];
  features?: { title: string; desc: string }[];
  about?: string;
  install?: string[];
  learningPath?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'grofer',
    name: 'Grofer',
    category: 'CLI',
    status: 'Looking for Contributors',
    blurb: 'A system and resource monitoring tool that runs from your terminal, written in Go.',
    stack: ['Go', 'CLI', 'Linux', 'Systems'],
    contributors: 24,
    repo: 'https://github.com/pesos/grofer',
    branch: 'main',
    featured: true,
    stats: [
      { label: 'Stars', value: '374' },
      { label: 'Forks', value: '53' },
      { label: 'Open Issues', value: '18' },
      { label: 'Contributors', value: '24' },
    ],
    info: [
      { label: 'Language', value: 'Go' },
      { label: 'Slack Channel', value: '#grofer-help' },
      { label: 'Status', value: 'Looking for contributors' },
    ],
    goodFirstIssues: [
      { id: 'good first issue', title: 'Labelled first-timers-only on the issues page' },
    ],
    features: [
      {
        title: 'Terminal dashboards',
        desc: 'Live CPU, memory, disk and network visualizations rendered directly in your terminal with termui.',
      },
      {
        title: 'Process management',
        desc: 'Inspect and manage running processes without leaving the terminal.',
      },
    ],
    about:
      'Grofer is a system and resource monitoring tool that runs from your terminal, written in Go. To those unfamiliar with Go and its concurrency model, the project maintains a learning path to get you up to speed — you don’t need to understand everything to start contributing.',
    learningPath: [
      'The basic syntax, features and constructs of Go — try Learn Go in Y Minutes',
      'Goroutines, channels and WaitGroups — A Tour of Go, Go by Example',
      'The libraries used: gopsutil, termui and cobra/viper',
      'Ask in #grofer-help — someone will point you in the right direction',
    ],
    install: [
      '# Clone and build',
      '$ git clone https://github.com/pesos/grofer',
      '$ cd grofer && go build',
    ],
  },
  {
    slug: 'rshark',
    name: 'Rshark',
    category: 'CLI',
    status: 'Looking for Contributors',
    blurb: 'A network packet monitoring tool that runs from your terminal, written in Rust.',
    stack: ['Rust', 'CLI', 'Networking'],
    contributors: 8,
    repo: 'https://github.com/pesos/rshark',
    branch: 'master',
    stats: [
      { label: 'Stars', value: '41' },
      { label: 'Forks', value: '7' },
      { label: 'Open Issues', value: '5' },
      { label: 'Contributors', value: '8' },
    ],
    info: [
      { label: 'Language', value: 'Rust' },
      { label: 'Slack Channel', value: '#rshark-help' },
      { label: 'Status', value: 'Looking for contributors' },
    ],
    features: [
      {
        title: 'Live packet capture',
        desc: 'Monitors network packets in real time straight from the terminal.',
      },
      {
        title: 'Protocol breakdown',
        desc: 'Understands IPv4, IPv6, ARP, TCP, UDP and more, built on libpnet.',
      },
    ],
    about:
      'Rshark is a network packet monitoring tool written in Rust. Contributing touches Rust’s ownership and borrowing model, its concurrency features, and core computer networking concepts.',
    learningPath: [
      "Rust's ownership, borrowing and lifetimes",
      'Structs, enums and pattern matching',
      'Concurrency: threads, locks, smart pointers, atomic reference counters',
      'Networking protocols: IPv4, IPv6, ARP, TCP, UDP and their packet formats',
      'The libraries used: tui-rs and libpnet',
      'Ask in #rshark-help',
    ],
    install: [
      '# Clone and build',
      '$ git clone https://github.com/pesos/rshark',
      '$ cd rshark && cargo build --release',
    ],
  },
  {
    slug: 'browser-history',
    name: 'browser-history',
    category: 'Library',
    status: 'Looking for Contributors',
    blurb:
      'A simple, zero-dependencies, developer-friendly Python package to retrieve (almost) any browser’s history and bookmarks on (almost) any platform.',
    stack: ['Python', 'Library'],
    contributors: 30,
    repo: 'https://github.com/pesos/browser-history',
    branch: 'master',
    stats: [
      { label: 'Stars', value: '218' },
      { label: 'Forks', value: '66' },
      { label: 'Open Issues', value: '28' },
      { label: 'Contributors', value: '30' },
    ],
    info: [
      { label: 'Language', value: 'Python' },
      { label: 'Slack Channel', value: '#browser-history-help' },
      { label: 'Status', value: 'Looking for contributors' },
    ],
    features: [
      {
        title: 'Zero dependencies',
        desc: 'Pure standard-library Python — nothing extra to install.',
      },
      {
        title: 'Cross-browser, cross-platform',
        desc: 'Reads history and bookmarks from most major browsers on most major platforms.',
      },
    ],
    about:
      'browser-history is a simple, zero-dependencies, developer-friendly Python package to retrieve (almost) any browser’s history on (almost) any platform. The best way to learn what you need to contribute is the project’s own docs, which cover its internals, API and contribution process in detail.',
    install: [
      '# Install from PyPI',
      '$ pip install browser-history',
      '# Or clone and install from source',
      '$ git clone https://github.com/pesos/browser-history',
    ],
  },
];

export const OTHER_PROJECTS = [
  {
    name: 'contributor-playground',
    repo: 'https://github.com/pesos/contributor-playground',
    blurb: 'A low-stakes sandbox repo for practicing your very first fork → branch → PR → merge flow.',
  },
  {
    name: 'watermelone',
    repo: 'https://github.com/pesos/watermelone',
    blurb: 'The Slack bot that onboards new members into PES Open Source.',
  },
  {
    name: 'members-list',
    repo: 'https://github.com/pesos/members-list',
    blurb: 'The official members (and alumni) list — this is the repo you open a PR against to join.',
  },
];

export const PROJECT_STATS = [
  { num: '27', label: 'Public Repositories' },
  { num: '633+', label: 'GitHub Stars' },
  { num: '30+', label: 'Contributors' },
  { num: '2012', label: 'Founded' },
];

export const PROJECT_FILTERS = {
  status: ['All', 'Looking for Contributors', 'Active', 'Completed', 'Archived'],
  stack: ['Tech Stack', 'Go', 'Rust', 'Python'],
  category: ['Category', 'CLI', 'Library'],
};
