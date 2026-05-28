export const profile = {
  intro: "Hi, I'm Joshua. This site is where I document what I learn.",
};

export const mission =
  'To spread knowledge throughout the community and help the people who need it.';

export const experience = {
  lead: 'I have done extensive work and studying in math and physics, as well as the other AP classes on this website.',
  qualifications: [
    'AIME and USAJMO',
    'USAPhO',
    'USNCO (national exam)',
  ],
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

export const plugs: Plug[] = [
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

export const aboutHeadings = [
  { depth: 2, slug: 'my-mission', text: 'My Mission' },
  { depth: 2, slug: 'my-experience', text: 'My Experience' },
  { depth: 2, slug: 'shameless-plugs', text: 'Shameless Plugs' },
];
