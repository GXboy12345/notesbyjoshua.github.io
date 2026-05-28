/**
 * Sidebar tree placement for notes. Permalinks stay independent of nav hierarchy.
 *
 * Add a row when a source folder's units should appear under a different sidebar branch
 * than their permalink implies (legacy URLs). `sourcePrefix` is the Astro collection entry
 * id prefix (lowercase slug, e.g. `aps/ap-calc/`), not the on-disk folder name.
 *
 * Per-note override: `nav_path` frontmatter—segments under /notes/, e.g.
 * `ap/calculus/diffdeffund`.
 */
export type NotesSidebarMount = {
  /** Collection entry id prefix (Astro slug, e.g. `aps/ap-calc/`). */
  sourcePrefix: string;
  /** Sidebar segments after /notes/, e.g. `ap/calculus`. */
  treePath: string;
};

export const NOTES_SIDEBAR_MOUNTS: readonly NotesSidebarMount[] = [
  { sourcePrefix: 'aps/ap-calc/', treePath: 'ap/calculus' },
];
