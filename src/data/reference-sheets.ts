export type ReferenceSheetDef = {
  /** Path prefix (no base); trailing slash required. */
  prefix: string;
  label: string;
  /** Doc slug from frontmatter permalink (no leading/trailing slashes). */
  slug: string;
};

/** AP section prefixes → prerendered cheatsheet drawer content. */
export const referenceSheets: ReferenceSheetDef[] = [
  {
    prefix: '/notes/ap/chem/',
    label: 'Chem cheatsheet',
    slug: 'notes/ap/chem/cheatsheet',
  },
  {
    prefix: '/notes/ap/stats/',
    label: 'Stats cheatsheet',
    slug: 'notes/ap/stats/cheatsheet',
  },
];
