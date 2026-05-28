---
layout: default
title: How to use these notes
permalink: /how-to-use-these-notes/
---

# How to use these notes

## Navigation

Use the **sidebar** on the left to move between sections. Topics are grouped (for example **Notes** → **AP** → a specific course). Tap the arrows next to a heading to expand or collapse a group. On small screens, open the menu from the top bar. There is also a **search bar** at the top of the website if you need anything specific.

## What you will find

- **Notes** — Study pages organized by subject and, for AP courses, by unit.
- **Practice problems** — Extra exercises to work through after the notes.
- **Resources** — External references and tools worth bookmarking.
- **Blog** — Shorter posts and updates that do not fit a full note page.

## Using a note page

Scan the **headings** on the page to jump to a topic. Many pages build from definitions to examples; if something feels dense, try the examples first, then reread the theory.

## Feedback

Spot an error or want a topic added? Use the [Feedback and Requests](/feedback/) page so requests stay in one place.

## For authors

Note pages are plain Markdown with **container directives** (`:::name` … `:::`). Each block must be closed with `:::` on its own line. Run `npm run lint:notes` before you commit to catch unclosed directives and broken image paths.

### Callouts

Use these for definitions, worked problems, and cram highlights. An optional title goes in square brackets on the opening line.

```markdown
:::theorem[Rational Root Theorem]
If $\frac{p}{q}$ is a rational zero in lowest terms, then $p \mid a_0$ and $q \mid a_n$.
:::

:::example
Find the amplitude and period of $y = 3\sin(2x)$.
:::

:::tip
On the exam, write the rate law from the slow step only.
:::

:::warning
Do not confuse $K$ with $K_p$ when species are in different phases.
:::

:::note
Standard state for gases is $1\ \text{atm}$ unless the prompt says otherwise.
:::

:::exam
College Board often tests ICE tables with a small initial change.
:::

:::key
\boxed{F = 96485\ \text{C/mol e}^-}
:::
```

| Directive | Use for |
| --- | --- |
| `:::theorem` | Definitions, laws, named results |
| `:::example` | Worked problems |
| `:::tip` | Mnemonics and exam tactics |
| `:::warning` | Common mistakes and traps |
| `:::note` | Asides and conventions |
| `:::exam` | “On the test” / CB alignment |
| `:::key` | One formula or rule to memorize |

Legacy `<div class="theorem-box" markdown="1">` still renders during migration; prefer directives for new content.

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
(a) Sketch the Maxwell–Boltzmann distribution at two temperatures.
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

### Site chrome (readers)

- **Cram mode** — Toggle in the header (pill in the action bar). When on, long proofs and examples collapse so you can skim formulas and exam tips faster. Preference is stored in the browser (`notes-cram-mode`).
- **Reference sheet** — On AP Chem and AP Stats note pages, a **ref** handle appears in the navbar. It opens a drawer with the course cheat sheet without leaving the unit you are reading. The handle disappears when you leave that course’s URL prefix.

### Frontmatter

Each note file keeps YAML at the top (`title`, `permalink`, `parent`, `nav_order`, etc.). Do not put `layout:` in the body—only in frontmatter.

---

## Seeing a construction sign 🚧

If you see a construction sign, this means that the page is currently under development. Please check back later for updates! Note that all individual note pages will not have a 🚧 sign on it, so look in the *Available Notes* section for more details.

*This site is in active development; new notes and polish are added regularly.*
