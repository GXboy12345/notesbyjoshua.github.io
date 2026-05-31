/**
 * Remove all id attributes from a cloned subtree so duplicate IDs don't
 * exist alongside the original in the live document.
 */
export function stripDuplicateIds(root: Element): void {
  if (root.hasAttribute('id')) root.removeAttribute('id');
  const all = root.querySelectorAll('[id]');
  for (let i = 0; i < all.length; i++) {
    all[i].removeAttribute('id');
  }
}
