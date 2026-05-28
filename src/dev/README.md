# Component fixture (dev only)

Orphan page: **`/dev/components/`** (not linked from site nav or sidebar).

## Maintenance contract

When you add or change a **remark directive**, **callout**, **practice widget**, or **interactive behavior** handled by `remark-directives.ts` / `doc-practice.ts` / `doc-lightbox.ts`:

1. Add or update a representative example in **`component-fixture.md`** in this folder.
2. Open `/dev/components/` locally and verify render + interaction.
3. If the component needs new client script wiring, confirm `src/pages/dev/components.astro` still sets `interactive={true}`.

Directive inventory lives in `src/lib/markdown/remark-directives.ts` (`CALLOUT_NAMES`, `figure`, `practice`, `mcq`, `frq`, `under-construction`). Optional callout fields are defined in `src/lib/markdown/callout-fields.ts`.

Do not link this page from production navigation. It is excluded from the sitemap.
