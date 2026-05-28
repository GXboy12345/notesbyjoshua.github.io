import { frontendAuthor, notesAuthor } from './site-attribution';

// ─── Types (re-exported for credits.ts) ───────────────────────────────────────

export type ContributorLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ContributorData = {
  name: string;
  role: string;
  bio: string;
  variant: 'author' | 'maintainer';
  links?: ContributorLink[];
};

// ─── Credits page contributor objects (not used on About page directly) ───────

export const joshuaContributor: ContributorData = {
  name: notesAuthor.name,
  role: 'Notes author',
  variant: 'author',
  bio: 'Writes and maintains the study notes, practice problems, and course coverage on this site.',
  links: [
    { label: 'GitHub', href: notesAuthor.github, external: true },
    { label: 'Email', href: 'mailto:joshuabie2010@gmail.com', external: true },
  ],
};

export const garretContributor: ContributorData = {
  name: frontendAuthor.name,
  role: 'Frontend & site',
  variant: 'maintainer',
  bio: 'Built the Astro migration: routing, KaTeX math, interactive practice, GitHub Actions deploy, and site tooling.',
  links: [
    { label: 'GitHub', href: frontendAuthor.github, external: true },
    { label: 'LinkedIn', href: frontendAuthor.linkedin, external: true },
  ],
};

// ─── Joshua ───────────────────────────────────────────────────────────────────

export const joshuaMission =
  'To spread knowledge throughout the community and help the people who need it.';

export const joshuaExperience = {
  lead: 'I have done extensive work and studying in math and physics, as well as the other AP classes on this website.',
  qualifications: ['AIME and USAJMO', 'USAPhO', 'USNCO (national exam)'],
  closing:
    'I hope that you guys can also benefit from my study guides which I use to prepare for these!',
};

export type Plug = {
  id: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  external?: boolean;
};

export const joshuaPlugs: Plug[] = [
  {
    id: 'peer-tutoring',
    title: 'Peer Tutoring',
    description: 'Please sign up for peer tutoring no one signs up and I am sad.',
  },
  {
    id: 'go-gold',
    title: 'Go Gold Club',
    description:
      'Please follow us on instagram @hwgogold! Also it would be a splendid idea to come to club meetings on Day 3s at Lunch in the Drama Lab (Rugby 220)! To start your own Go Gold Club, please visit this link:',
    href: '#',
    cta: 'Start a Go Gold Club',
    external: true,
  },
  {
    id: 'photography',
    title: '10PenguinzPhotography',
    description: 'Uhhh photography ig',
  },
  {
    id: 'tutoring',
    title: 'Tutoring',
    description:
      'If you want tutoring first go to peer tutoring but if you want non-school tutoring feel free to email me at joshuabie2010@gmail.com',
    href: 'mailto:joshuabie2010@gmail.com',
    cta: 'Email Joshua',
  },
];

// ─── Garret ───────────────────────────────────────────────────────────────────

export const garretIntro =
  "Hi, I'm Garret. I built this site's frontend. Don't make the notes, though, lol.";

export type GarretThing = {
  name: string;
  note: string;
  href?: string;
  external?: boolean;
};

export const garretThings: GarretThing[] = [
  {
    name: 'Joy Market',
    note: 'food-rescue site for a school club. They rescue groceries and get them to people who need them.',
    href: 'https://joy-market.org/',
    external: true,
  },
  {
    name: 'Language Connect',
    note: 'free language-tutoring site for another club. HW students tutoring K–12 learners.',
  },
  {
    name: 'Project Vector',
    note: "computer-vision scouting system for my robotics team. Watches match footage and scores each robot automatically. It's private but we won some awards.",
  },
  {
    name: 'This site',
    note: "you're on it.",
  },
];

export const garretLinks = [
  { label: 'GitHub', href: frontendAuthor.github },
  { label: 'LinkedIn', href: frontendAuthor.linkedin },
];
