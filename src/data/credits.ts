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

export const upstreamRepo = {
  label: 'notesbyjoshua/notesbyjoshua.github.io',
  href: 'https://github.com/notesbyjoshua/notesbyjoshua.github.io',
};

export const contributors: ContributorData[] = [
  {
    name: 'Joshua Bie',
    role: 'Author',
    variant: 'author',
    bio: 'Writes and maintains the study notes, practice problems, and course coverage on this site.',
    links: [
      { label: 'GitHub', href: 'https://github.com/notesbyjoshua', external: true },
      { label: 'About', href: '/about/' },
    ],
  },
  {
    name: 'Garret Morberg-Nguyen',
    role: 'Site maintainer',
    variant: 'maintainer',
    bio: 'Maintains the Astro frontend fork, GitHub Pages deployment, and site tooling.',
    links: [
      { label: 'GitHub', href: 'https://github.com/gxboy12345', external: true },
    ],
  },
];

export const techStack = [
  { name: 'Astro', detail: 'Static site generator and page routing', href: 'https://astro.build/' },
  { name: 'KaTeX', detail: 'Math rendering in notes', href: 'https://katex.org/' },
  { name: 'GitHub Pages', detail: 'Static hosting via GitHub Actions', href: 'https://pages.github.com/' },
];
