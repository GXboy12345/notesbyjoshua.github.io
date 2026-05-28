export type CourseStatus = 'available' | 'in-progress' | 'draft';

export type ApCourse = {
  course: string;
  href: string;
  status: CourseStatus;
  units: string;
  detail?: string;
};

export type UnitLink = { label: string; href: string };

export type UnitGroup = {
  title: string;
  href: string;
  summary: string;
  status?: CourseStatus;
  units: UnitLink[];
};

export type SiteLink = {
  title: string;
  desc: string;
  href: string;
};

export type UpdateRow = { iso: string; date: string; text: string };

export const release = 'Alpha 3';

export const intro =
  'Free study notes for AP exams, competition math, and physics.';

export const statusLabel: Record<CourseStatus, string> = {
  available: 'Available',
  'in-progress': 'In progress',
  draft: 'Draft',
};

export const apCourses: ApCourse[] = [
  {
    course: 'AP Chemistry',
    href: '/notes/ap/chemistry/',
    status: 'available',
    units: 'Units 1–9',
  },
  {
    course: 'AP Statistics',
    href: '/notes/ap/statistics/',
    status: 'available',
    units: 'Units 1–9',
  },
  {
    course: 'AP Precalculus',
    href: '/notes/ap/precalculus/',
    status: 'in-progress',
    units: 'Units 1–14',
    detail: 'Unit 10 still being written',
  },
  {
    course: 'AP Physics C: Mechanics',
    href: '/notes/ap/ap-physics-c-mechanics/',
    status: 'in-progress',
    units: 'Unit 1',
    detail: 'More units on the way',
  },
  {
    course: 'AP Physics C: E&M',
    href: '/notes/ap/ap-physics-c-em/',
    status: 'in-progress',
    units: 'Units 1–2',
    detail: 'Units 3–6 planned',
  },
  {
    course: 'AP Calculus AB/BC',
    href: '/notes/ap/calculus/',
    status: 'draft',
    units: 'Units 1–10',
    detail: 'Revision ongoing',
  },
];

export const mathGroups: UnitGroup[] = [
  {
    title: 'AP Calculus AB/BC',
    href: '/notes/ap/calculus/',
    summary: 'Limits through series—aligned with the AP Calculus curriculum.',
    status: 'draft',
    units: [
      { label: 'Limits', href: '/notes/math/limits/' },
      { label: 'Derivatives—fundamentals', href: '/notes/math/diffdeffund/' },
      { label: 'Derivatives—complex', href: '/notes/math/diffcomplex/' },
      { label: 'Analytical applications', href: '/notes/math/analyticalappdiff/' },
      { label: 'Contextual applications', href: '/notes/math/contextappdiff/' },
      { label: 'Differential equations', href: '/notes/math/diffeq/' },
      { label: 'Integration', href: '/notes/math/integration/' },
      { label: 'Applications of integration', href: '/notes/math/appintegration/' },
      { label: 'Infinite sums and series', href: '/notes/math/infsumseries/' },
      { label: 'Parametric, polar, and vector', href: '/notes/math/ppvvfunc/' },
    ],
  },
  {
    title: 'Algebra',
    href: '/notes/math/',
    summary: 'Building blocks for competition math.',
    units: [
      { label: 'Summations', href: '/notes/math/algebra/summations/' },
      { label: 'Recursion', href: '/notes/math/algebra/recursion/' },
    ],
  },
];

export const physicsGroups: UnitGroup[] = [
  {
    title: 'AP Physics C: Mechanics',
    href: '/notes/ap/ap-physics-c-mechanics/',
    summary: 'Calculus-based mechanics for the AP exam.',
    status: 'in-progress',
    units: [
      { label: 'Kinematics', href: '/notes/physics/kinematics/' },
      { label: 'Forces', href: '/notes/physics/forces/' },
      { label: 'Work and energy', href: '/notes/physics/work/' },
      { label: 'Linear momentum', href: '/notes/physics/linearmomentum/' },
      { label: 'Torque', href: '/notes/physics/torque/' },
      { label: 'Oscillations', href: '/notes/physics/oscillations/' },
      { label: 'Rotational momentum', href: '/notes/physics/rotationalmomentum/' },
    ],
  },
  {
    title: 'AP Physics C: E&M',
    href: '/notes/ap/ap-physics-c-em/',
    summary: 'Electricity and magnetism for the AP exam.',
    status: 'in-progress',
    units: [
      { label: 'Electrostatics', href: '/notes/physics/electrostatics/' },
      { label: 'Electric potential', href: '/notes/physics/electricpot/' },
      { label: 'Conductors and capacitors', href: '/notes/physics/condcap/' },
      { label: 'Circuits', href: '/notes/physics/circuits/' },
      { label: 'Magnetism', href: '/notes/physics/magnetism/' },
      { label: 'EM induction', href: '/notes/physics/eminduction/' },
    ],
  },
  {
    title: 'F=ma prep',
    href: '/notes/physics/f-ma/',
    summary: 'Introductory competition physics.',
    units: [
      { label: 'Fluid dynamics', href: '/notes/physics/fluiddynamics/' },
      { label: 'Techniques', href: '/notes/physics/techniques/' },
      { label: 'Uncertainty', href: '/notes/physics/uncertainty/' },
    ],
  },
  {
    title: 'USAPhO prep',
    href: '/notes/physics/usapho/',
    summary: 'Advanced topics beyond the AP exam.',
    units: [
      { label: 'Advanced mechanics', href: '/notes/physics/advmech/' },
      { label: 'Waves', href: '/notes/physics/waves/' },
      { label: 'Relativity', href: '/notes/physics/relativity/' },
      { label: 'Thermodynamics', href: '/notes/physics/thermodynamics/' },
      { label: 'Quantum and nuclear', href: '/notes/physics/quantnucphys/' },
      { label: 'Stellar physics', href: '/notes/physics/stellarphys/' },
      { label: 'Math tricks', href: '/notes/physics/mathtricks/' },
    ],
  },
];

export const siteLinks: SiteLink[] = [
  {
    title: 'All notes',
    desc: 'Full index of every hub and unit.',
    href: '/Notes/notes/',
  },
  {
    title: 'How to use these notes',
    desc: 'Reading order, prerequisites, and conventions.',
    href: '/how-to-use-these-notes/',
  },
  {
    title: 'Practice problems',
    desc: 'Exercises paired with units where available.',
    href: '/practiceproblems/practice/',
  },
  {
    title: 'Resources',
    desc: 'Books, tools, and external references.',
    href: '/Resources/resources/',
  },
  {
    title: 'Feedback',
    desc: 'Request a unit or report an issue.',
    href: '/feedback/',
  },
  {
    title: 'About',
    desc: 'Joshua on the notes; Garret on the site.',
    href: '/about/',
  },
];

export const updates: UpdateRow[] = [
  { iso: '2026-05-19', date: 'May 19, 2026', text: 'AP Precalculus units added across the course map.' },
  { iso: '2026-04-02', date: 'April 2, 2026', text: 'AP Chemistry, Physics C E&M, and Statistics expanded.' },
  { iso: '2026-03-29', date: 'March 29, 2026', text: 'Site launch with hub navigation.' },
];

export const pageSections = [
  { id: 'ap-courses', label: 'AP courses' },
  { id: 'math', label: 'Math' },
  { id: 'physics', label: 'Physics' },
  { id: 'site', label: 'Site links' },
  { id: 'updates', label: 'Updates' },
];
