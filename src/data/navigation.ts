export type NavItem = { label: string; href: string; children?: NavItem[] };

/** Notes subject index—primary nav only, not duplicated in the library tree. */
export const notesHubPath = '/Notes/notes/';

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'How to use', href: '/how-to-use-these-notes/' },
  { label: 'Notes', href: notesHubPath },
  { label: 'Practice', href: '/practiceproblems/practice/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Resources', href: '/Resources/resources/' },
  { label: 'Feedback', href: '/feedback/' },
  { label: 'About', href: '/about/' },
];

/** Secondary links—footer, not primary nav. */
export const footerNav: NavItem[] = [{ label: 'Credits', href: '/credits/' }];

export const subjectHubs = [
  {
    title: 'AP courses',
    desc: 'Chem, Calc, Physics C, Precalc, Stats',
    href: '/notes/ap/',
    tone: 'ap',
  },
  {
    title: 'Math',
    desc: 'Algebra, competition prep',
    href: '/notes/math/',
    tone: 'math',
  },
  {
    title: 'Physics',
    desc: 'F=ma, USAPhO, AP Physics',
    href: '/notes/physics/',
    tone: 'physics',
  },
];
