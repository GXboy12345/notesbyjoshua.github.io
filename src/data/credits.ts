import {
  garretContributor,
  joshuaContributor,
  type ContributorData,
  type ContributorLink,
} from './about';
import { frontendAuthor, notesAuthor } from './site-attribution';

export type { ContributorData, ContributorLink };

export const upstreamRepo = {
  label: 'notesbyjoshua/notesbyjoshua.github.io',
  href: 'https://github.com/notesbyjoshua/notesbyjoshua.github.io',
};

export const contributors: ContributorData[] = [joshuaContributor, garretContributor];

export const creditsLead = `Study notes by ${notesAuthor.short}; Astro frontend and deployment by ${frontendAuthor.name} on this fork.`;

export const techStack = [
  { name: 'Astro', detail: 'Static site generator and page routing', href: 'https://astro.build/' },
  { name: 'KaTeX', detail: 'Math rendering in notes', href: 'https://katex.org/' },
  { name: 'GitHub Pages', detail: 'Static hosting via GitHub Actions', href: 'https://pages.github.com/' },
];
