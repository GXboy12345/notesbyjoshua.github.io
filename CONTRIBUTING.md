# Contributing

Author and maintainer guide for note content and site markup. For readers: [how-to-use-these-notes.md](./how-to-use-these-notes.md) (published at `/how-to-use-these-notes/`).

## Content layout

Markdown lives under `Notes/`, `blog/`, `Practice Problems/`, `Resources/`, and `feedback/`. Each note sets `permalink:` in frontmatter for the canonical URL.

Scaffold a new unit:

```bash
npm run note:new
```

Before commit:

```bash
npm run lint:notes
```

Catches unclosed directives and broken image paths.

## Markdown directives

Note pages are plain Markdown with **container directives** (`:::name` … `:::`). Each block must be closed with `:::` on its own line.

Live examples: open `/dev/components/` locally after `npm run dev` (orphan page; see `src/dev/README.md`).

### Callouts

Use these for definitions, worked problems, and exam tips. Several callout types accept an **optional named field** on the opening line (attribute syntax). Omit the attribute when there is no name or title to show. Quote values that contain spaces: `{name="Rational Root Theorem"}`.

```markdown
:::theorem{name="Rational Root Theorem"}
If $\frac{p}{q}$ is a rational zero in lowest terms, then $p \mid a_0$ and $q \mid a_n$.
:::

:::theorem
Statement without a named theorem—renders the default "Theorem" label.
:::

:::example{title="Amplitude and period"}
Find the amplitude and period of $y = 3\sin(2x)$.
:::

:::tip
On the exam, write the rate law from the slow step only.
:::

:::tip{title="Strategy"}
1. Draw and label a diagram.
2. Write an equation relating the variables.
:::

:::warning
Do not confuse $K$ with $K_p$ when species are in different phases.
:::

:::mistakes
- Using initial concentrations instead of equilibrium values in $K$.
- Forgetting to omit pure solids and liquids from $K_c$.
:::

:::checklist
1. Balance the equation and identify phase of each species.
2. Write $K_c$ omitting pure solids and liquids.
3. Build an ICE table when solving for equilibrium concentrations.
:::

:::conditions
1. Random sample or random assignment.
2. Independence: if sampling without replacement, $n \le 0.10N$.
3. Large counts: $n\hat{p} \ge 10$ and $n(1-\hat{p}) \ge 10$.
:::

:::equations
| Idea | Equation |
| --- | --- |
| Equilibrium constant | $K_c = \dfrac{[\text{C}]^l [\text{D}]^m}{[\text{A}]^j [\text{B}]^k}$ |
:::

:::placeholder
Slope field with equilibrium solution and sample integral curves.
:::

:::note
Standard state for gases is $1\ \text{atm}$ unless the prompt says otherwise.
:::

:::exam{topic="ICE tables"}
College Board often tests ICE tables with a small initial change.
:::

:::key{name="Faraday constant"}
\boxed{F = 96485\ \text{C/mol e}^-}
:::
```

| Directive | Use for | Optional field |
| --- | --- | --- |
| `:::theorem` | Definitions, laws, named results | `name=` theorem name |
| `:::example` | Worked problems | `title=` example title |
| `:::proof` | Proofs | `of=` result being proved |
| `:::tip` | Mnemonics and exam tactics | `title=` tip title (e.g. strategy name) |
| `:::warning` | Single trap or caution | — |
| `:::mistakes` | Collected common-mistakes lists | — |
| `:::checklist` | Numbered problem-solving steps | — |
| `:::conditions` | Inference or procedure prerequisites | — |
| `:::equations` | Reference formula tables | — |
| `:::placeholder` | Missing figure or diagram stub | — |
| `:::note` | Asides and conventions | — |
| `:::exam` | "On the test" / CB alignment | `topic=` exam focus |
| `:::key` | One formula or rule to memorize | `name=` formula name |
| `:::summary` | Section recap | `title=` summary title |

Legacy `<div class="theorem-box" markdown="1">` still renders during migration; prefer directives for new content.

### Under construction

Mark draft hubs or headings without emoji:

```markdown
### AP Biology :under-construction

:::under-construction
This course is not published yet. Check the home page for status.
:::
```

| Form | Use for |
| --- | --- |
| `:under-construction` | Inline badge beside a heading or in a sentence |
| `:under-construction[Draft]` | Inline badge with a custom short label |
| `:::under-construction` | Full-width banner with optional body text |

Preview at `/dev/components/` after `npm run dev`.

### Figures

Replace Jekyll `<img class="note-img" …>` tags with a figure directive. Put the image on the next line as standard Markdown. A line of caption text after the image is optional.

```markdown
:::figure{width=480}
![Periodic trends](/assets/APs/AP%20Chem/atomicstrucprop/periodictrends.png)
Summary of atomic radius and ionization energy across a period.
:::
```

`width=480` sets max width in pixels (480 or 640 are common). Paths start at `/assets/…` from the site root.

### Interactive practice

Wrap each question set in `:::practice`. MCQs use letter keys `A`–`D` via `correct=` on the opening line. Nest `:::solution` inside the MCQ; it stays hidden until the reader chooses **Show solution**.

```markdown
:::practice
:::mcq{id=kin-1 correct=B}
For $2A \to B$, which rate law matches the data?

- [ ] $\text{rate} = k[A]$
- [ ] $\text{rate} = k[A]^2$
- [ ] $\text{rate} = k[A][B]$
- [ ] $\text{rate} = k[B]^2$

:::solution
Compare trials 1 and 2: doubling $[A]$ quadruples rate, so order in $A$ is 2.

$$\boxed{\text{rate} = k[A]^2}$$
:::
:::

:::frq{id=kin-frq-1}
(a) Sketch the Maxwell-Boltzmann distribution at two temperatures.
(b) Explain why a higher temperature increases the reaction rate.
:::

:::solution
(a) Higher $T$ shifts the curve right and flattens the peak.
(b) More molecules exceed $E_a$ at higher $T$.
:::
:::
```

| Directive | Use for |
| --- | --- |
| `:::practice` | Groups MCQs and FRQs on a unit page |
| `:::mcq` | Multiple choice with **Check** and **Show solution** |
| `:::frq` | Free-response parts; optional `source=` URL to the CB PDF |
| `:::solution` | Answer or rubric; hidden until revealed |

Chem-style pages can keep `## Practice`, `## MCQ`, `## FRQ`, and `## Solutions` headings; put directive blocks under those sections.

### Math

- Inline math: `$…$` or `$$…$$` on one line in running text.
- Display math: a line with only `$$`, the equation, then a line with only `$$`.
- Final answers: `\boxed{…}` inside a solution or `:::key` block.

## Frontmatter

Each note file keeps YAML at the top:

| Field | Purpose |
| --- | --- |
| `title` | Page and sidebar label |
| `permalink` | Canonical URL path (stable for links and search) |
| `parent` | Human-readable course name (legacy; not used for sidebar tree) |
| `nav_order` | Sort order among siblings in the sidebar |
| `nav_path` | Optional sidebar segments under `/notes/` when placement should differ from `permalink` |

Do not put `layout:` in the body—only in frontmatter.

## Sidebar placement

The library tree is built from `permalink` by default. **Prefer permalinks that match the nav hierarchy** so units nest under the right hub without extra config:

| Course | Unit permalink pattern |
| --- | --- |
| AP Chemistry, Stats, Precalc | `/notes/ap/{course}/{unit}/` |
| AP Physics C Mechanics / E&M | `/notes/ap/ap-physics-c-mechanics/{unit}/`, `/notes/ap/ap-physics-c-em/{unit}/` |
| F=ma, USAPhO | `/notes/physics/{unit}/` |
| AP Calculus (legacy URLs) | `/notes/math/{unit}/` — sidebar mount in `NOTES_SIDEBAR_MOUNTS` until migrated |

When a source folder's units must keep old URLs, add one row to `NOTES_SIDEBAR_MOUNTS` in `src/data/notes-library.ts` and register redirects in `src/data/legacy-redirects.ts`. `sourcePrefix` is the Astro collection entry id prefix (lowercase slug, e.g. `aps/ap-calc/`), not the on-disk folder name. Per-file override: `nav_path` in frontmatter.

## Local dev

```bash
npm ci
npm run dev
```

Component fixture: `/dev/components/` (`src/dev/component-fixture.md`). FRQ grading uses a Cloudflare Worker; see `.env.example` and `npm run worker:dev`.
